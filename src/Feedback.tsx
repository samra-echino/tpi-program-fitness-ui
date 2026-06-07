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

const DEFAULT_CHANGES: IExerciseChange[] = [
	{
		id: 1,
		exercise: "Goblet squat",
		change: "Charge proposée : 18-24 kg vers 20-26 kg",
		reason: "La série est restée stable, on peut progresser légèrement."
	},
	{
		id: 2,
		exercise: "Développé haltères",
		change: "Repos proposé : 90 sec vers 105 sec",
		reason: "Plus de récupération pour garder une bonne technique."
	},
	{
		id: 3,
		exercise: "Planche",
		change: "Durée proposée : 35-45 sec vers 40-50 sec",
		reason: "Progression douce sur le gainage."
	}
];

function getTodayWorkout() {
	const todayDayId = getTodayDayId();

	return loadWorkouts().find((workout) => workout.dayId === todayDayId);
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

	constructor(props: IFeedbackProps) {
		super(props);

		this.state = {
			difficulty: null,
			energy: "",
			pain: "",
			note: "",
			changes: DEFAULT_CHANGES
		};
	}

	removeChange(id: number) {
		this.setState({
			changes: this.state.changes.filter((change) => change.id !== id)
		});
	}

	acceptChanges() {
		localStorage.setItem("acceptedSessionChanges", JSON.stringify(this.state.changes));
		this.setState({ changes: [] });
	}

	saveSession() {
		const workout = this.workout;
		const todayDayId = getTodayDayId();
		const workouts = loadWorkouts();
		const updatedWorkouts = workouts.map((item) =>
			item.dayId === todayDayId && item.id === workout?.id
				? { ...item, status: "done" as const }
				: item
		);
		const session = {
			id: Date.now(),
			type: workout?.distance ? "run" : "training",
			title: workout?.title ?? "Séance",
			date: new Date().toISOString(),
			duration: workout?.duration ?? "0 min",
			exercises: workout?.exercises ? Number.parseInt(workout.exercises, 10) : undefined,
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
		return (
			<section className="mt-4 bg-white border border-[#ded8cf] rounded-2xl p-4">
				<p className="uppercase text-xs text-[#8d8378] font-bold">
					Modifications proposées
				</p>

				<p className="text-sm text-[#5f564f] mt-2 leading-5">
					Si des modifications ont été faites pendant la séance, tu peux les garder pour adapter le programme ou les supprimer une par une.
				</p>

				<div className="mt-4 space-y-3">
					{this.state.changes.length === 0 ? (
						<p className="text-sm text-[#8d8378]">Aucune modification à valider.</p>
					) : (
						this.state.changes.map((change) => (
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
						))
					)}
				</div>

				<button
					onClick={() => this.acceptChanges()}
					disabled={this.state.changes.length === 0}
					className={`w-full rounded-full py-3 font-bold mt-4 ${
						this.state.changes.length > 0
							? "bg-black text-white"
							: "bg-[#ded8cf] text-[#8d8378]"
					}`}
				>
					Valider les modifications
				</button>
			</section>
		);
	}

	render() {
		const workout = this.workout;
		const isRun = Boolean(workout?.distance);

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
						{workout ? "Séance terminée" : "Retour séance"}
					</p>

					<h1 className="font-serif text-3xl font-bold mt-2">
						{workout?.title ?? "Séance"}
					</h1>

					<div className="grid grid-cols-3 mt-6">
						<div>
							<p className="font-serif text-2xl font-bold">
								{workout?.duration ?? "0 min"}
							</p>
							<p className="text-xs text-[#b8aaa0]">durée</p>
						</div>
						<div>
							<p className="font-serif text-2xl font-bold">
								{getWorkoutExerciseCount(workout)}
							</p>
							<p className="text-xs text-[#b8aaa0]">{isRun ? "distance" : "contenu"}</p>
						</div>
						<div>
							<p className="font-serif text-2xl font-bold">{workout?.rpe ?? "RPE -"}</p>
							<p className="text-xs text-[#b8aaa0]">intensité</p>
						</div>
					</div>
				</section>

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
