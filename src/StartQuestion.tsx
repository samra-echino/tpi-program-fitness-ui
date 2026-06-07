import React from "react";
import type { NavigateFunction } from "react-router-dom";

interface IStartQuestionProps {
	navigate: NavigateFunction;
}

interface IStartQuestionState {
	currentQuestionIndex: number;
	selectedChoice: string;
	selectedProgram: string;
	isLoading: boolean;
}

interface IChoice {
	title: string;
	description: string;
}

interface IQuestion {
	id: number;
	stepTitle: string;
	question: string;
	description: string;
	choices: IChoice[];
}

export class StartQuestion extends React.Component<IStartQuestionProps, IStartQuestionState> {
	questions: IQuestion[] = [
		{
			id: 1,
			stepTitle: "APPRENONS À NOUS CONNAÎTRE",
			question: "Quel est ton objectif principal ?",
			description: "Cela nous aide à construire un programme qui te ressemble.",
			choices: [
				{ title: "Perdre du poids", description: "Réduire la masse grasse, garder le muscle" },
				{ title: "Prendre du muscle", description: "Hypertrophie, force progressive" },
				{ title: "Améliorer mon endurance", description: "Cardio, récupération, souffle" },
				{ title: "Rester en forme", description: "Maintenir, bouger régulièrement" }
			]
		},
		{
			id: 2,
			stepTitle: "TON NIVEAU",
			question: "Quel est ton niveau actuel ?",
			description: "Cela permet d’adapter l’intensité des séances.",
			choices: [
				{ title: "Débutant", description: "Je reprends ou je commence le sport" },
				{ title: "Intermédiaire", description: "Je m’entraîne déjà parfois" },
				{ title: "Avancé", description: "Je suis régulier et autonome" },
				{ title: "Je ne sais pas", description: "L’application m’aidera à choisir" }
			]
		},
		{
			id: 3,
			stepTitle: "TON STYLE DE VIE",
			question: "Comment décrirais-tu ton style de vie ?",
			description: "Cela nous aide à construire un programme qui s’intègre à ta vie.",
			choices: [
				{ title: "Sédentaire", description: "Peu ou pas d’activité physique régulière" },
				{ title: "Actif", description: "Je bouge régulièrement (marche, vélo, etc.)" },
				{ title: "Sportif", description: "Je pratique un sport régulièrement" },
				{ title: "Très sportif", description: "Je m’entraîne intensément plusieurs fois par semaine" }
			]
		},
		{
			id: 4,
			stepTitle: "TES PRÉFÉRENCES",
			question: "Quels types d’exercices préfères-tu ?",
			description: "On peut ajuster ton programme selon tes préférences.",
			choices: [
				{ title: "Musculation", description: "Poids du corps, haltères, machines" },
				{ title: "Cardio", description: "Course, vélo, HIIT, corde à sauter" },
				{ title: "Yoga/Pilates", description: "Souplesse, gainage, équilibre" },
				{ title: "Mixte", description: "J’aime varier les plaisirs" }
			]
		},
		{
			id: 5,
			stepTitle: "DISPONIBILITÉ",
			question: "Combien de séances peux-tu faire par semaine ?",
			description: "On adapte ton programme à ton emploi du temps.",
			choices: [
				{ title: "1-2 séances", description: "Je suis très occupé(e)" },
				{ title: "3-4 séances", description: "J’ai du temps pour moi" },
				{ title: "5-6 séances", description: "Je veux m’entraîner régulièrement" },
				{ title: "7 séances", description: "Je veux m’entraîner tous les jours" }
			]
		},
		{
			id: 6,
			stepTitle: "MOTIVATION",
			question: "Qu’est-ce qui te motive le plus ?",
			description: "On peut personnaliser ton programme pour qu’il reste motivant.",
			choices: [
				{ title: "Atteindre un objectif précis", description: "Perte de poids, prise de muscle, etc." },
				{ title: "Améliorer ma santé", description: "Me sentir mieux au quotidien" },
				{ title: "Garder la forme", description: "Rester actif et en bonne santé" },
				{ title: "Me défouler", description: "Libérer le stress et l’énergie accumulés" }
			]
		},
		{
			id: 7,
			stepTitle: "TON ENVIRONNEMENT",
			question: "Où préfères-tu t’entraîner ?",
			description: "On peut adapter les séances à ton environnement.",
			choices: [
				{ title: "À la maison", description: "Avec peu ou pas de matériel" },
				{ title: "En salle de sport", description: "Accès à des machines et poids libres" },
				{ title: "En extérieur", description: "Parcs, rues, terrains de sport" },
				{ title: "Peu importe", description: "Je m’adapte à ce que j’ai" }
			]
		},
		{
			id: 8,
			stepTitle: "BESOINS SPÉCIFIQUES",
			question: "As-tu des besoins spécifiques ?",
			description: "On peut adapter ton programme à tes besoins particuliers.",
			choices: [
				{ title: "Pas de besoin spécifique", description: "Je veux un programme général" },
				{ title: "Problèmes de santé", description: "J’ai des contraintes liées à ma santé" },
				{ title: "Objectifs particuliers", description: "Je veux atteindre des objectifs spécifiques" }
			]
		},
		{
			id: 9,
			stepTitle: "ACCOMPAGNEMENT",
			question: "Souhaites-tu un accompagnement personnalisé ?",
			description: "Un coach peut t’aider à rester motivé et à atteindre tes objectifs.",
			choices: [
				{ title: "Oui, j’aimerais un accompagnement", description: "J’ai besoin de guidance et de motivation" },
				{ title: "Non, je préfère me débrouiller seul", description: "Je préfère suivre le programme seul" }
			]
		}
	];

	constructor(props: IStartQuestionProps) {
		super(props);

		this.state = {
			currentQuestionIndex: 0,
			selectedChoice: "",
			selectedProgram: "",
			isLoading: false
		};
	}

	NextQuestion() {
		if (!this.state.selectedChoice) return;

		if (this.state.currentQuestionIndex < 8) {
			this.setState({
				currentQuestionIndex: this.state.currentQuestionIndex + 1,
				selectedChoice: ""
			});
		}
	}

	PreviousQuestion() {
		if (this.state.currentQuestionIndex > 0) {
			this.setState({
				currentQuestionIndex: this.state.currentQuestionIndex - 1,
				selectedChoice: ""
			});
		}
	}

	FinishQuestionnaire() {
		if (!this.state.selectedProgram) return;

		localStorage.setItem("firstConnexionDone", "true");
		localStorage.setItem("programType", this.state.selectedProgram);

		this.setState({ isLoading: true });

		setTimeout(() => {
			this.props.navigate("/");
			window.location.reload();
		}, 2000);
	}

	renderProgress() {
		const step = this.state.currentQuestionIndex + 1;

		return (
			<div className="grid grid-cols-9 gap-1 mt-5">
				{Array.from({ length: 9 }).map((_, index) => (
					<div
						key={index}
						className={`h-[3px] rounded-full ${index < step ? "bg-[#e9653f]" : "bg-[#ded8cf]"
							}`}
					></div>
				))}
			</div>
		);
	}

	renderHeader() {
		const step = this.state.currentQuestionIndex + 1;

		return (
			<header className="shrink-0 px-5 pt-4">
				<div className="flex justify-between items-center">
					<button
						onClick={() => this.PreviousQuestion()}
						className="w-10 h-10 rounded-full border border-[#e2dacf] flex items-center justify-center shrink-0"
					>
						‹
					</button>

					<p className="text-sm text-[#8d8378] font-bold">
						Étape {step} sur 9
					</p>

					<button
						onClick={() => this.props.navigate("/")}
						className="text-sm text-[#8d8378] font-bold"
					>
						Passer
					</button>
				</div>

				{this.renderProgress()}
			</header>
		);
	}

	renderQuestion() {
		const question =
			this.questions[this.state.currentQuestionIndex] || this.questions[0];
		const canContinue = Boolean(this.state.selectedChoice);

		return (
			<>
				{this.renderHeader()}

				<main className="flex-1 overflow-y-auto px-4 sm:px-5 pt-5 pb-4">
					<p className="text-xs text-[#8d8378] font-bold tracking-widest">
						{question.stepTitle}
					</p>

					<h1 className="font-serif text-[30px] leading-[34px] font-bold mt-2 text-black">
						{question.question}
					</h1>

					<p className="text-[#2d2d2d] text-[15px] mt-3 leading-6">
						{question.description}
					</p>

					<div className="mt-5 space-y-2">
						{question.choices.map((choice) => {
							const isSelected = this.state.selectedChoice === choice.title;

							return (
								<button
									key={choice.title}
									onClick={() => this.setState({ selectedChoice: choice.title })}
									className={`w-full rounded-2xl border px-4 py-3.5 flex justify-between items-center gap-3 text-left ${isSelected
											? "bg-[#11100d] text-white border-[#11100d]"
											: "bg-white text-black border-[#ded8cf]"
										}`}
								>
									<div className="min-w-0">
										<p className="font-bold text-base">{choice.title}</p>
										<p
											className={`text-sm mt-1 ${isSelected ? "text-gray-300" : "text-[#8d8378]"
												}`}
										>
											{choice.description}
										</p>
									</div>

									<div
										className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? "border-white" : "border-[#d6cec4]"
											}`}
									>
										{isSelected && (
											<div className="w-3 h-3 rounded-full bg-[#e9653f]"></div>
										)}
									</div>
								</button>
							);
						})}
					</div>
				</main>

				<footer className="sticky bottom-0 shrink-0 bg-[#f7f4ee] border-t border-[#ded8cf] px-4 sm:px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
					<button
						disabled={!canContinue}
						onClick={() => this.NextQuestion()}
						className={`w-full rounded-full py-4 font-bold transition ${
							canContinue
								? "bg-[#e9653f] text-white"
								: "bg-[#ded8cf] text-[#8d8378] cursor-not-allowed"
						}`}
					>
						Continuer <span className="ml-3">→</span>
					</button>
				</footer>
			</>
		);
	}

	renderProgramChoice() {
		const isGeneratedSelected = this.state.selectedProgram === "generated";
		const isCoachSelected = this.state.selectedProgram === "coach";
		const canCreateProgram = Boolean(this.state.selectedProgram);

		return (
			<>
				<header className="shrink-0 px-5 pt-4">
					<div className="flex justify-between items-center">
						<button
							onClick={() => this.PreviousQuestion()}
							className="w-10 h-10 rounded-full border border-[#e2dacf] flex items-center justify-center shrink-0"
						>
							‹
						</button>

						<p className="text-sm text-[#8d8378] font-bold">Étape 9 sur 9</p>

						<div className="w-10"></div>
					</div>

					{this.renderProgress()}
				</header>

				<main className="flex-1 overflow-y-auto px-4 sm:px-5 pt-5 pb-4">
					<p className="text-xs text-[#8d8378] font-bold tracking-widest">
						DERNIÈRE ÉTAPE
					</p>

					<h1 className="font-serif text-[30px] leading-[34px] font-bold mt-2 text-black">
						Comment veux-tu être accompagné ?
					</h1>

					<p className="text-[#2d2d2d] text-[15px] mt-3">
						Tu pourras changer plus tard depuis ton profil.
					</p>

					<div className="mt-5 space-y-2">
						<button
							onClick={() => this.setState({ selectedProgram: "generated" })}
							className={`w-full rounded-2xl border px-4 py-3.5 text-left ${isGeneratedSelected
									? "bg-[#11100d] text-white border-[#11100d]"
									: "bg-white text-black border-[#ded8cf]"
								}`}
						>
							<div className="flex justify-between">
								<p className={`text-xs font-bold tracking-widest ${isGeneratedSelected ? "text-[#e9653f]" : "text-[#8d8378]"}`}>
									RECOMMANDÉ
								</p>

								<div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isGeneratedSelected ? "border-white" : "border-[#d6cec4]"}`}>
									{isGeneratedSelected && (
										<div className="w-3 h-3 rounded-full bg-[#e9653f]"></div>
									)}
								</div>
							</div>

							<h2 className="font-serif text-[23px] leading-7 font-bold mt-3">
								Programme généré
							</h2>

							<p className={`text-sm mt-2 ${isGeneratedSelected ? "text-gray-300" : "text-[#2d2d2d]"}`}>
								Construit automatiquement à partir de tes réponses.
								Adaptable à tout moment.
							</p>

							<div className="flex flex-wrap gap-2 mt-4">
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isGeneratedSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									Personnalisé
								</span>
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isGeneratedSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									6 séances/sem. max
								</span>
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isGeneratedSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									Évolue avec toi
								</span>
							</div>
						</button>

						<button
							onClick={() => this.setState({ selectedProgram: "coach" })}
							className={`w-full rounded-2xl border px-4 py-3.5 text-left ${isCoachSelected
									? "bg-[#11100d] text-white border-[#11100d]"
									: "bg-white text-black border-[#ded8cf]"
								}`}
						>
							<div className="flex justify-between">
								<p className={`text-xs font-bold tracking-widest ${isCoachSelected ? "text-[#e9653f]" : "text-[#8d8378]"}`}>
									PREMIUM
								</p>

								<div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isCoachSelected ? "border-white" : "border-[#d6cec4]"}`}>
									{isCoachSelected && (
										<div className="w-3 h-3 rounded-full bg-[#e9653f]"></div>
									)}
								</div>
							</div>

							<h2 className="font-serif text-[23px] leading-7 font-bold mt-3">
								Coach dédié
							</h2>

							<p className={`text-sm mt-2 ${isCoachSelected ? "text-gray-300" : "text-[#2d2d2d]"}`}>
								Un coach humain construit et ajuste ton programme chaque semaine.
							</p>

							<div className="flex flex-wrap gap-2 mt-4">
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isCoachSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									Suivi individuel
								</span>
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isCoachSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									Messages illimités
								</span>
								<span className={`rounded-full px-3 py-1 text-xs font-bold ${isCoachSelected ? "bg-[#292722]" : "bg-[#efebe3]"}`}>
									Plans sur-mesure
								</span>
							</div>
						</button>
					</div>
				</main>

				<footer className="sticky bottom-0 shrink-0 bg-[#f7f4ee] border-t border-[#ded8cf] px-4 sm:px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
					<button
						disabled={!canCreateProgram}
						onClick={() => this.FinishQuestionnaire()}
						className={`w-full rounded-full py-4 font-bold transition ${
							canCreateProgram
								? "bg-[#e9653f] text-white"
								: "bg-[#ded8cf] text-[#8d8378] cursor-not-allowed"
						}`}
					>
						Créer mon programme <span className="ml-3">→</span>
					</button>
				</footer>
			</>
		);
	}

	renderLoading() {
		return (
			<div className="min-h-screen bg-[#f7f4ee] flex flex-col items-center justify-center px-8 text-center">
				<div className="w-16 h-16 border-4 border-[#ded8cf] border-t-[#e9653f] rounded-full animate-spin"></div>

				<h1 className="font-serif text-3xl font-bold mt-8">
					Création de ton programme
				</h1>

				<p className="text-[#8d8378] mt-4 leading-6">
					On prépare ton planning personnalisé selon tes réponses.
				</p>
			</div>
		);
	}

	render() {
		if (this.state.isLoading) {
			return this.renderLoading();
		}
		return (
			<div className="min-h-[100dvh] bg-[#f7f4ee] flex flex-col">
				{this.state.currentQuestionIndex === 8
					? this.renderProgramChoice()
					: this.renderQuestion()}
			</div>
		);
	}
}
