import React from "react";
import type { NavigateFunction } from "react-router-dom";

interface ISeanceProps {
	navigate: NavigateFunction;
}

interface IExercise {
	id: number;
	title: string;
	muscles: string;
	description: string;
	sets: number;
	repsMin: number;
	repsMax: number;
	weightMin: number;
	weightMax: number;
	unit: string;
	restSeconds: number;
	image: string;
	cues: string[];
}

interface ISeanceState {
	phase: "exercise" | "rest";
	exerciseIdx: number;
	lastSerieIdx: boolean;
	setIdx: number;
	secs: number;
	restTotal: number;
	restRunning: boolean;
	repsMin: number;
	repsMax: number;
	weightMin: number;
	weightMax: number;
}

const STRENGTH_SESSION: IExercise[] = [
	{
		id: 1,
		title: "Goblet squat",
		muscles: "Quadriceps · Fessiers · Gainage",
		description: "Un mouvement de base pour construire les jambes en gardant une posture stable.",
		sets: 4,
		repsMin: 8,
		repsMax: 10,
		weightMin: 18,
		weightMax: 24,
		unit: "kg",
		restSeconds: 90,
		image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?q=80&w=900&auto=format&fit=crop",
		cues: ["Pieds largeur épaules", "Genoux dans l'axe des pointes", "Buste grand, descente contrôlée"]
	},
	{
		id: 2,
		title: "Développé haltères",
		muscles: "Pectoraux · Épaules · Triceps",
		description: "Poussée horizontale pour développer le haut du corps sans bloquer les épaules.",
		sets: 4,
		repsMin: 8,
		repsMax: 10,
		weightMin: 14,
		weightMax: 20,
		unit: "kg",
		restSeconds: 90,
		image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=900&auto=format&fit=crop",
		cues: ["Omoplates serrées sur le banc", "Poignets au-dessus des coudes", "Contrôle la descente"]
	},
	{
		id: 3,
		title: "Rowing haltère",
		muscles: "Dos · Biceps · Arrière d'épaule",
		description: "Tirage unilatéral pour renforcer le dos et équilibrer le travail de poussée.",
		sets: 4,
		repsMin: 10,
		repsMax: 12,
		weightMin: 16,
		weightMax: 24,
		unit: "kg",
		restSeconds: 75,
		image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=900&auto=format&fit=crop",
		cues: ["Dos long, nuque neutre", "Tire le coude vers la hanche", "Épaule basse, sans rotation"]
	},
	{
		id: 4,
		title: "Soulevé de terre roumain",
		muscles: "Ischios · Fessiers · Lombaires",
		description: "Charnière de hanche pour travailler la chaîne postérieure avec une tension continue.",
		sets: 3,
		repsMin: 8,
		repsMax: 10,
		weightMin: 30,
		weightMax: 40,
		unit: "kg",
		restSeconds: 90,
		image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop",
		cues: ["Hanches vers l'arrière", "Barre ou haltères proches des jambes", "Remonte en serrant les fessiers"]
	},
	{
		id: 5,
		title: "Développé épaules",
		muscles: "Épaules · Triceps · Gainage",
		description: "Poussée verticale pour renforcer les épaules avec un tronc solide.",
		sets: 3,
		repsMin: 8,
		repsMax: 10,
		weightMin: 8,
		weightMax: 14,
		unit: "kg",
		restSeconds: 75,
		image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop",
		cues: ["Côtes rentrées", "Pousse au-dessus de la tête", "Redescends lentement jusqu'aux épaules"]
	},
	{
		id: 6,
		title: "Planche",
		muscles: "Abdos · Gainage · Épaules",
		description: "Finisher de stabilité pour garder une posture forte sous fatigue.",
		sets: 3,
		repsMin: 35,
		repsMax: 45,
		weightMin: 0,
		weightMax: 0,
		unit: "sec",
		restSeconds: 60,
		image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=900&auto=format&fit=crop",
		cues: ["Coudes sous les épaules", "Bassin légèrement rentré", "Respiration lente, sans cambrer"]
	}
];

export class Seance extends React.Component<ISeanceProps, ISeanceState> {
	timer?: number;

	constructor(props: ISeanceProps) {
		super(props);

		const firstExercise = STRENGTH_SESSION[0];

		this.state = {
			phase: "exercise",
			exerciseIdx: 0,
			lastSerieIdx: false,
			setIdx: 1,
			secs: firstExercise.restSeconds,
			restTotal: firstExercise.restSeconds,
			restRunning: false,
			repsMin: firstExercise.repsMin,
			repsMax: firstExercise.repsMax,
			weightMin: firstExercise.weightMin,
			weightMax: firstExercise.weightMax
		};
	}

	componentWillUnmount() {
		this.stopTimer();
	}

	getCurrentExercise() {
		return STRENGTH_SESSION[this.state.exerciseIdx];
	}

	getNextExercise() {
		return STRENGTH_SESSION[this.state.exerciseIdx + 1];
	}

	syncExercise(exerciseIdx: number, phase: ISeanceState["phase"] = "exercise") {
		const exercise = STRENGTH_SESSION[exerciseIdx];

		this.setState({
			phase,
			exerciseIdx,
			lastSerieIdx: false,
			setIdx: 1,
			secs: exercise.restSeconds,
			restTotal: exercise.restSeconds,
			restRunning: false,
			repsMin: exercise.repsMin,
			repsMax: exercise.repsMax,
			weightMin: exercise.weightMin,
			weightMax: exercise.weightMax
		});
	}

	stopTimer() {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = undefined;
		}
	}

	startTimer() {
		this.stopTimer();

		if (this.state.secs <= 0) {
			this.skipRest();
			return;
		}

		this.timer = window.setInterval(() => {
			if (this.state.secs <= 1) {
				this.stopTimer();
				this.skipRest();
				return;
			}

			this.setState({ secs: this.state.secs - 1 });
		}, 1000);

		this.setState({ restRunning: true });
	}

	startRest() {
		this.stopTimer();

		const exercise = this.getCurrentExercise();

		this.setState(
			{
				phase: "rest",
				lastSerieIdx: false,
				secs: exercise.restSeconds,
				restTotal: exercise.restSeconds,
				restRunning: true
			},
			() => this.startTimer()
		);
	}

	skipRest() {
		this.stopTimer();

		this.setState({
			phase: "exercise",
			restRunning: false
		});
	}

	toggleTimer() {
		if (this.state.restRunning) {
			this.stopTimer();
			this.setState({ restRunning: false });
		} else {
			this.startTimer();
		}
	}

	updateSeconds(value: number) {
		this.setState({
			secs: Math.max(0, this.state.secs + value)
		});
	}

	completeSet() {
		const exercise = this.getCurrentExercise();

		if (this.state.setIdx < exercise.sets) {
			const nextSetIdx = this.state.setIdx + 1;

			this.stopTimer();
			this.setState(
				{
					phase: "rest",
					lastSerieIdx: false,
					setIdx: nextSetIdx,
					secs: exercise.restSeconds,
					restTotal: exercise.restSeconds,
					restRunning: true
				},
				() => this.startTimer()
			);
			return;
		}

		if (this.state.exerciseIdx < STRENGTH_SESSION.length - 1) {
			const nextExerciseIdx = this.state.exerciseIdx + 1;
			const nextExercise = STRENGTH_SESSION[nextExerciseIdx];

			this.stopTimer();
			this.setState(
				{
					phase: "rest",
					exerciseIdx: nextExerciseIdx,
					lastSerieIdx: true,
					setIdx: 1,
					secs: nextExercise.restSeconds,
					restTotal: nextExercise.restSeconds,
					restRunning: true,
					repsMin: nextExercise.repsMin,
					repsMax: nextExercise.repsMax,
					weightMin: nextExercise.weightMin,
					weightMax: nextExercise.weightMax
				},
				() => this.startTimer()
			);
			return;
		}

		this.props.navigate("/feedback");
	}

	formatTime(seconds: number) {
		const min = Math.floor(seconds / 60);
		const sec = seconds % 60;

		return `${min}:${sec < 10 ? "0" : ""}${sec}`;
	}

	renderHeader() {
		const exercise = this.getCurrentExercise();

		return (
			<header className="bg-[#11100d] text-white">
				<div className="px-4 pt-4 pb-3">
					<p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
						Renforcement musculaire
					</p>

					<div className="flex justify-between items-center mt-1">
						<p className="text-base font-bold text-gray-400">
							Exercice{" "}
							<span className="text-white">
								{this.state.exerciseIdx + 1} / {STRENGTH_SESSION.length}
							</span>{" "}
							• Série{" "}
							<span className="text-white">
								{this.state.setIdx} / {exercise.sets}
							</span>
						</p>

						<button
							onClick={() => this.props.navigate("/feedback")}
							className="text-gray-300 font-bold"
						>
							Fin
						</button>
					</div>

					<div className="grid grid-cols-6 gap-2 mt-3">
						{STRENGTH_SESSION.map((item, index) => (
							<div
								key={item.id}
								className={`h-1 rounded-full ${index < this.state.exerciseIdx
										? "bg-[#ef623e]"
										: index === this.state.exerciseIdx
											? "bg-white"
											: "bg-white/25"
									}`}
							></div>
						))}
					</div>
				</div>
			</header>
		);
	}

	renderSerieButton(value: number) {
		const done = value < this.state.setIdx;
		const active = value === this.state.setIdx;

		return (
			<button
				key={value}
				onClick={() => this.setState({ setIdx: value })}
				className={`h-9 rounded-lg border text-sm font-bold ${done
						? "bg-black text-white border-black"
						: active
							? "bg-[#ef623e] text-white border-[#ef623e]"
							: "bg-white text-black border-[#ded8cf]"
					}`}
			>
				{done ? <i className="fas fa-check text-xs"></i> : value}
			</button>
		);
	}

	renderRangeControl(
		title: string,
		leftValue: number,
		rightValue: number,
		unit: string,
		updateLeft: (value: number) => void,
		updateRight: (value: number) => void
	) {
		return (
			<section className="border border-[#ded8cf] rounded-2xl px-4 py-3 bg-white">
				<p className="text-xs uppercase tracking-widest text-[#8d8378] font-bold mb-2">
					{title}
				</p>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center justify-center gap-3">
						<button
							onClick={() => updateLeft(-1)}
							className="w-7 h-7 rounded-full border border-[#ded8cf] text-sm"
						>
							-
						</button>

						<p className="text-xl font-bold">
							{leftValue}
							<span className="text-xs text-[#8d8378] ml-1">{unit}</span>
						</p>

						<button
							onClick={() => updateLeft(1)}
							className="w-7 h-7 rounded-full border border-[#ded8cf] text-sm"
						>
							+
						</button>
					</div>

					<div className="flex items-center justify-center gap-3">
						<button
							onClick={() => updateRight(-1)}
							className="w-7 h-7 rounded-full border border-[#ded8cf] text-sm"
						>
							-
						</button>

						<p className="text-xl font-bold">
							{rightValue}
							<span className="text-xs text-[#8d8378] ml-1">{unit}</span>
						</p>

						<button
							onClick={() => updateRight(1)}
							className="w-7 h-7 rounded-full border border-[#ded8cf] text-sm"
						>
							+
						</button>
					</div>
				</div>
			</section>
		);
	}

	renderExercise() {
		const exercise = this.getCurrentExercise();

		return (
			<>
				{this.renderHeader()}

				<section className="relative h-56 bg-black overflow-hidden">
					<img
						src={exercise.image}
						alt={exercise.title}
						className="w-full h-full object-cover opacity-75"
					/>
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 text-white">
						<p className="text-xs uppercase tracking-widest text-[#ef623e] font-bold">
							{exercise.muscles}
						</p>
						<h1 className="font-serif text-3xl font-bold mt-1">{exercise.title}</h1>
						<p className="text-sm text-gray-300 mt-2">{exercise.description}</p>
					</div>
				</section>

				<section className="px-4 pt-4">
					<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
						<p className="text-xs uppercase tracking-widest text-[#8d8378] font-bold mb-3">
							Points techniques
						</p>
						<div className="space-y-2">
							{exercise.cues.map((cue) => (
								<div key={cue} className="flex items-start gap-3 text-sm">
									<span className="mt-0.5 w-5 h-5 rounded-full bg-[#ef623e] text-white flex items-center justify-center text-[10px]">
										<i className="fas fa-check"></i>
									</span>
									<p>{cue}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="px-4 mt-4">
					<div className="flex justify-between mb-2">
						<p className="text-xs uppercase tracking-widest text-[#8d8378] font-bold">
							Séries
						</p>
						<p className="text-xs text-[#8d8378] font-bold">
							{this.state.setIdx - 1}/{exercise.sets} faites
						</p>
					</div>

					<div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${exercise.sets}, minmax(0, 1fr))` }}>
						{Array.from({ length: exercise.sets }).map((_, index) =>
							this.renderSerieButton(index + 1)
						)}
					</div>
				</section>

				<div className="px-4 mt-4 space-y-3">
					{this.renderRangeControl(
						exercise.unit === "sec" ? "Temps" : "Répétitions",
						this.state.repsMin,
						this.state.repsMax,
						exercise.unit === "sec" ? "s" : "",
						(value) =>
							this.setState({
								repsMin: Math.max(1, this.state.repsMin + value)
							}),
						(value) =>
							this.setState({
								repsMax: Math.max(this.state.repsMin, this.state.repsMax + value)
							})
					)}

					{exercise.unit !== "sec" &&
						this.renderRangeControl(
							"Charge",
							this.state.weightMin,
							this.state.weightMax,
							exercise.unit,
							(value) =>
								this.setState({
									weightMin: Math.max(0, this.state.weightMin + value)
								}),
							(value) =>
								this.setState({
									weightMax: Math.max(this.state.weightMin, this.state.weightMax + value)
								})
						)}

					<section className="border border-[#ded8cf] rounded-2xl px-4 py-3 bg-white">
						<p className="text-xs uppercase tracking-widest text-[#8d8378] font-bold">
							Repos conseillé
						</p>

						<div className="flex items-center justify-between mt-2">
							<p className="text-2xl font-serif font-bold">{this.formatTime(this.state.secs)}</p>

							<div className="flex gap-4 text-[#8d8378] text-sm">
								<button onClick={() => this.updateSeconds(-10)}>-10s</button>
								<button onClick={() => this.updateSeconds(10)}>+10s</button>
							</div>

							<button
								onClick={() => this.toggleTimer()}
								className="w-10 h-10 rounded-full bg-[#ef623e] text-white text-sm"
							>
								<i className={`fas ${this.state.restRunning ? "fa-pause" : "fa-play"} ml-[1px]`}></i>
							</button>
						</div>
					</section>
				</div>

				<section className="px-4 mt-4 space-y-3">
					<button
						onClick={() => this.completeSet()}
						className="w-full bg-[#ef623e] text-white rounded-full py-4 font-bold"
					>
						{this.state.exerciseIdx === STRENGTH_SESSION.length - 1 &&
							this.state.setIdx >= exercise.sets
							? "Terminer la séance"
							: "Série terminée"}
					</button>

					<button
						onClick={() => this.startRest()}
						className="w-full border border-[#ded8cf] text-[#8d8378] rounded-full py-3 text-sm font-bold"
					>
						Passer au repos
					</button>
				</section>
			</>
		);
	}

	renderRest() {
		const exercise = this.getCurrentExercise();
		const isPreparingNextExercise = this.state.lastSerieIdx;
		const previewExercise = exercise;
		const circle = 2 * Math.PI * 62;
		const percent = this.state.secs / this.state.restTotal;
		const offset = circle * (1 - percent);

		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-4 pb-24">
				<div className="flex justify-between items-center">
					<button
						onClick={() => this.setState({ phase: "exercise" })}
						className="w-10 h-10 rounded-full border border-[#ded8cf]"
					>
						‹
					</button>

					<div className="text-center">
						<p className="uppercase text-xs text-[#8d8378] font-bold">
							Repos
						</p>
						<p className="text-sm font-bold">
							{exercise.title} · série {this.state.setIdx}/{exercise.sets}
						</p>
					</div>

					<button
						onClick={() => this.props.navigate("/feedback")}
						className="px-4 h-9 bg-white rounded-full text-sm font-bold"
					>
						Fin
					</button>
				</div>

				<section className="bg-[#11100d] text-white rounded-3xl p-5 mt-5 text-center">
					<p className="inline-block bg-white/10 rounded-full px-4 py-2 text-xs font-bold">
						PAUSE RÉCUP
					</p>

					<h1 className="font-serif text-2xl font-bold mt-5">
						Respire, relâche les épaules
					</h1>

					{isPreparingNextExercise ? (
						<p className="text-sm text-gray-300 mt-2">
							Prépare-toi pour {exercise.title}.
						</p>
					) : (
						<p className="text-sm text-gray-300 mt-2">
							Prochaine série : {this.state.repsMin}-{this.state.repsMax}
							{exercise.unit === "sec" ? " sec" : ` reps - ${this.state.weightMax} ${exercise.unit}`}
						</p>
					)}

					<div className="flex items-center justify-center gap-5 mt-8">
						<button onClick={() => this.updateSeconds(-10)} className="w-10 h-10 rounded-full border border-white/20 text-xs font-bold">
							-10s
						</button>

						<div className="relative w-36 h-36">
							<svg width="144" height="144">
								<circle cx="72" cy="72" r="62" stroke="#292722" strokeWidth="6" fill="none" />
								<circle cx="72" cy="72" r="62" stroke="#ef623e" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={circle} strokeDashoffset={offset} transform="rotate(-90 72 72)" />
							</svg>

							<div className="absolute inset-0 flex flex-col items-center justify-center">
								<p className="font-serif text-4xl font-bold">{this.formatTime(this.state.secs)}</p>
								<p className="text-xs uppercase text-gray-400">Repos</p>
							</div>
						</div>

						<button onClick={() => this.updateSeconds(10)} className="w-10 h-10 rounded-full border border-white/20 text-xs font-bold">
							+10s
						</button>
					</div>

					<button onClick={() => this.skipRest()} className="w-full bg-[#ef623e] text-white rounded-full py-4 mt-6 font-bold">
						Reprendre →
					</button>
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-2xl p-4 mt-3">
					<p className="uppercase text-xs text-[#8d8378] font-bold mb-3">
						{isPreparingNextExercise ? "Prépare le prochain exercice" : "Prochaine série"}
					</p>

					<div className="flex items-center gap-4">
						<img src={previewExercise?.image ?? exercise.image} alt={previewExercise?.title ?? exercise.title} className="w-14 h-14 rounded-xl object-cover" />

						<div>
							<p className="font-bold">{previewExercise?.title ?? exercise.title}</p>
							<p className="text-sm text-[#8d8378]">
								{previewExercise
									? isPreparingNextExercise
										? `${previewExercise.sets} séries - ${previewExercise.repsMin}-${previewExercise.repsMax}${previewExercise.unit === "sec" ? " sec" : " reps"}`
										: `Série ${this.state.setIdx}/${exercise.sets} - ${this.state.repsMin}-${this.state.repsMax}${exercise.unit === "sec" ? " sec" : " reps"}`
									: "Dernier exercice de la séance"}
							</p>
						</div>
					</div>
				</section>
			</main>
		);
	}
	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] pb-24">
				{this.state.phase === "exercise"
					? this.renderExercise()
					: this.renderRest()}
			</main>
		);
	}
}
