import React from "react";
import type { NavigateFunction } from "react-router-dom";
import {
	getTodayDayId,
	getWorkoutMinutes,
	loadWorkouts,
	saveWorkouts,
	type IWorkout
} from "./planningData";

interface IFeedbackProps {
	navigate: NavigateFunction;
}

interface IExerciseChange {
	id: number;
	exercise: string;
	change: string;
	reason: string;
}

interface IFeedbackState {
	difficulty: number | null;
	energy: string;
	pain: string;
	note: string;
	changes: IExerciseChange[];
}

interface ISessionSummary {
	title: string;
	durationSeconds: number;
	startedExerciseCount: number;
	completedExerciseCount: number;
	currentExercise: string;
	exercises: string[];
	rpe: string;
	type: "training" | "run";
	updatedAt: string;
}

function loadSessionChanges(): IExerciseChange[] {
	try {
		const saved = localStorage.getItem("pendingSessionChanges");

		if (!saved) return [];

		const parsed = JSON.parse(saved);

		if (!Array.isArray(parsed)) return [];

		return parsed.filter(
			(change): change is IExerciseChange =>
				typeof change?.id === "number" &&
				typeof change.exercise === "string" &&
				typeof change.change === "string" &&
				typeof change.reason === "string"
		);
	} catch {
		return [];
	}
}

function getTodayWorkout() {
	const todayDayId = getTodayDayId();

	return loadWorkouts().find((workout) => workout.dayId === todayDayId);
}

function loadCurrentSessionSummary(): ISessionSummary | null {
	try {
		const saved = localStorage.getItem("currentSessionSummary");

		if (!saved) return null;

		const parsed = JSON.parse(saved);

		if (
			typeof parsed?.title !== "string" ||
			typeof parsed.durationSeconds !== "number" ||
			typeof parsed.startedExerciseCount !== "number" ||
			typeof parsed.rpe !== "string" ||
			!Array.isArray(parsed.exercises)
		) {
			return null;
		}

		return {
			title: parsed.title,
			durationSeconds: parsed.durationSeconds,
			startedExerciseCount: parsed.startedExerciseCount,
			completedExerciseCount:
				typeof parsed.completedExerciseCount === "number"
					? parsed.completedExerciseCount
					: 0,
			currentExercise:
				typeof parsed.currentExercise === "string"
					? parsed.currentExercise
					: "",
			exercises: parsed.exercises.filter((exercise: unknown) => typeof exercise === "string"),
			rpe: parsed.rpe,
			type: parsed.type === "run" ? "run" : "training",
			updatedAt:
				typeof parsed.updatedAt === "string"
					? parsed.updatedAt
					: new Date().toISOString()
		};
	} catch {
		return null;
	}
}

function formatDurationFromSeconds(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	if (minutes === 0) {
		return `${remainingSeconds} sec`;
	}

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function getWorkoutExerciseCount(workout?: IWorkout) {
	if (!workout?.exercises) return workout?.distance ? workout.distance : "0 exercice";

	return workout.exercises;
}

function getWorkoutVolume(workout?: IWorkout) {
	if (!workout) return "0 kg";
	if (workout.distance) return workout.distance;

	const minutes = getWorkoutMinutes(workout);
	const estimatedVolume = minutes * 45;

	return `${estimatedVolume.toLocaleString("fr-CH")} kg`;
}

export class Feedback extends React.Component<IFeedbackProps, IFeedbackState> {
	workout = getTodayWorkout();
	sessionSummary = loadCurrentSessionSummary();

	constructor(props: IFeedbackProps) {
		super(props);

		this.state = {
			difficulty: null,
			energy: "",
			pain: "",
			note: "",
			changes: loadSessionChanges()
		};
	}

	removeChange(id: number) {
		this.setState({
			changes: this.state.changes.filter((change) => change.id !== id)
		});
	}

	acceptChanges() {
		localStorage.setItem("acceptedSessionChanges", JSON.stringify(this.state.changes));
		localStorage.removeItem("pendingSessionChanges");
		this.setState({ changes: [] });
	}

	saveSession() {
		const workout = this.workout;
		const summary = this.sessionSummary;
		const todayDayId = getTodayDayId();
		const workouts = loadWorkouts();
		const updatedWorkouts = workouts.map((item) =>
			item.dayId === todayDayId && item.id === workout?.id
				? { ...item, status: "done" as const }
				: item
		);
		const session = {
			id: Date.now(),
			type: summary?.type ?? (workout?.distance ? "run" : "training"),
			title: summary?.title ?? workout?.title ?? "Séance",
			date: new Date().toISOString(),
			duration: summary
				? formatDurationFromSeconds(summary.durationSeconds)
				: workout?.duration ?? "0 min",
			exercises:
				summary?.startedExerciseCount ??
				(workout?.exercises ? Number.parseInt(workout.exercises, 10) : undefined),
			distance: workout?.distance,
			volume: getWorkoutVolume(workout),
			difficulty: this.state.difficulty,
			energy: this.state.energy,
			pain: this.state.pain,
			note: this.state.note,
			acceptedChanges: this.state.changes
		};

		const oldSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
		localStorage.setItem("sessions", JSON.stringify([session, ...oldSessions]));
		localStorage.removeItem("currentSessionSummary");
		saveWorkouts(updatedWorkouts);

		this.props.navigate("/");
	}

	renderDifficulty() {
		return (
			<section className="mt-6">
				<div className="flex justify-between">
					<p className="uppercase text-xs text-[#8d8378] font-bold">
						Difficulté ressentie
					</p>
					<p className="font-bold">
						{this.state.difficulty ? `${this.state.difficulty}/10` : "Non renseignée"}
					</p>
				</div>

				<div className="grid grid-cols-10 gap-1 mt-3">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
						<button
							key={n}
							onClick={() => this.setState({ difficulty: n })}
							className={`h-8 rounded-md text-sm font-bold ${
								this.state.difficulty && n <= this.state.difficulty
									? "bg-[#ef623e] text-white"
									: "bg-white border border-[#ded8cf]"
							}`}
						>
							{n}
						</button>
					))}
				</div>

				<div className="flex justify-between text-xs text-[#8d8378] mt-1">
					<p>Trop facile</p>
					<p>Trop dur</p>
				</div>
			</section>
		);
	}

	renderChanges() {
		if (this.state.changes.length === 0) {
			return null;
		}

		return (
			<section className="mt-4 bg-white border border-[#ded8cf] rounded-2xl p-4">
				<p className="uppercase text-xs text-[#8d8378] font-bold">
					Modifications proposées
				</p>

				<p className="text-sm text-[#5f564f] mt-2 leading-5">
					Si des modifications ont été faites pendant la séance, tu peux les garder pour adapter le programme ou les supprimer une par une.
				</p>

				<div className="mt-4 space-y-3">
					{this.state.changes.map((change) => (
						<div
							key={change.id}
							className="border border-[#ded8cf] rounded-xl p-3 flex gap-3"
						>
							<div className="flex-1 min-w-0">
								<p className="font-bold text-sm">{change.exercise}</p>
								<p className="text-sm text-black mt-1">{change.change}</p>
								<p className="text-xs text-[#8d8378] mt-1">{change.reason}</p>
							</div>

							<button
								onClick={() => this.removeChange(change.id)}
								aria-label={`Supprimer la modification ${change.exercise}`}
								className="w-9 h-9 rounded-full bg-[#f7f4ee] border border-[#ded8cf] text-[#8d8378]"
							>
								<i className="far fa-trash-alt"></i>
							</button>
						</div>
					))}
				</div>

				<button
					onClick={() => this.acceptChanges()}
					className="w-full rounded-full py-3 font-bold mt-4 bg-black text-white"
				>
					Valider les modifications
				</button>
			</section>
		);
	}

	render() {
		const workout = this.workout;
		const summary = this.sessionSummary;
		const isRun = Boolean(workout?.distance);
		const durationLabel = summary
			? formatDurationFromSeconds(summary.durationSeconds)
			: workout?.duration ?? "0 min";
		const contentLabel = summary
			? `${summary.startedExerciseCount} exercice${summary.startedExerciseCount > 1 ? "s" : ""}`
			: getWorkoutExerciseCount(workout);
		const rpeLabel = summary?.rpe ?? workout?.rpe ?? "RPE -";

		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-24">
				<button
					onClick={() => this.props.navigate(-1)}
					className="w-10 h-10 rounded-full border border-[#ded8cf]"
				>
					‹
				</button>

				<section className="bg-gradient-to-br from-[#11100d] to-[#4a1f0d] text-white rounded-3xl p-5 mt-5">
					<p className="uppercase text-xs text-[#b8aaa0] font-bold">
						{summary ? "Retour séance" : workout ? "Séance terminée" : "Retour séance"}
					</p>

					<h1 className="font-serif text-3xl font-bold mt-2">
						{summary?.title ?? workout?.title ?? "Séance"}
					</h1>

					<div className="grid grid-cols-3 gap-5 mt-6">
						<div className="min-w-0">
							<p className="font-serif text-2xl font-bold whitespace-nowrap leading-none">
								{durationLabel}
							</p>
							<p className="text-xs text-[#b8aaa0]">durée</p>
						</div>
						<div className="min-w-0 text-center">
							<p className="font-serif text-[1.45rem] font-bold whitespace-nowrap leading-none">
								{contentLabel}
							</p>
							<p className="text-xs text-[#b8aaa0]">{isRun ? "distance" : "contenu"}</p>
						</div>
						<div className="min-w-0 text-right">
							<p className="font-serif text-2xl font-bold whitespace-nowrap leading-none">{rpeLabel}</p>
							<p className="text-xs text-[#b8aaa0]">intensité</p>
						</div>
					</div>
				</section>

				{summary && summary.exercises.length > 0 && (
					<section className="mt-4 bg-white border border-[#ded8cf] rounded-2xl p-4">
						<p className="uppercase text-xs text-[#8d8378] font-bold mb-3">
							Exercices réalisés
						</p>
						<div className="space-y-2">
							{summary.exercises.map((exercise, index) => (
								<div key={exercise} className="flex justify-between gap-3 text-sm">
									<p className="font-bold min-w-0">
										{index + 1}. {exercise}
									</p>
									<p className="text-[#8d8378] shrink-0">{summary.rpe}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{this.renderDifficulty()}

				<section className="mt-6">
					<p className="uppercase text-xs text-[#8d8378] font-bold mb-3">
						Sensation / énergie
					</p>

					<div className="grid grid-cols-5 gap-2">
						{["Vidée", "Bof", "Bien", "Forte", "Au top"].map((item, index) => (
							<button
								key={item}
								onClick={() => this.setState({ energy: item })}
								className={`rounded-xl py-3 text-xs font-bold ${
									this.state.energy === item
										? "bg-black text-white"
										: "bg-white border border-[#ded8cf]"
								}`}
							>
								<p className="text-xl">{["😴", "😐", "🙂", "💪", "🔥"][index]}</p>
								{item}
							</button>
						))}
					</div>
				</section>

				<section className="mt-6">
					<p className="uppercase text-xs text-[#8d8378] font-bold mb-3">
						Douleur / inconfort
					</p>

					<div className="bg-[#efebe3] rounded-full p-1 grid grid-cols-3">
						{["Rien", "Moyennement", "Beaucoup"].map((item) => (
							<button
								key={item}
								onClick={() => this.setState({ pain: item })}
								className={`py-2 rounded-full text-sm font-bold ${
									this.state.pain === item ? "bg-white text-black" : "text-[#8d8378]"
								}`}
							>
								{item}
							</button>
						))}
					</div>
				</section>

				<section className="mt-6">
					<p className="uppercase text-xs text-[#8d8378] font-bold mb-3">
						Note pour le coach
					</p>

					<textarea
						value={this.state.note}
						onChange={(e) => this.setState({ note: e.target.value })}
						placeholder="Une question, une remarque... (facultatif)"
						className="w-full h-24 rounded-2xl border border-[#ded8cf] p-4 outline-none bg-white resize-none"
					/>
				</section>

				{this.renderChanges()}

				<button
					onClick={() => this.saveSession()}
					className="w-full bg-[#ef623e] text-white rounded-full py-4 font-bold mt-6"
				>
					Enregistrer la séance ✓
				</button>
			</main>
		);
	}
}
