import React from "react";
import type { NavigateFunction } from "react-router-dom";

interface IRecapSeanceProps {
	navigate: NavigateFunction;
}

const recapExercises = [
	{
		number: 1,
		title: "Goblet squat",
		muscles: "Quadriceps · Fessiers · Gainage",
		sets: "4 séries",
		reps: "8-10 reps",
		weight: "18-24 kg",
		image: "https://images.unsplash.com/photo-1770664612843-b44e26070024?auto=format&fit=crop&w=500&q=80",
		description: "Garde le buste haut, descends contrôlé, puis remonte en poussant fort dans les talons."
	},
	{
		number: 2,
		title: "Développé haltères",
		muscles: "Pectoraux · Épaules · Triceps",
		sets: "4 séries",
		reps: "8-10 reps",
		weight: "14-20 kg",
		image: "https://images.unsplash.com/photo-1692372372344-41aed374b848?auto=format&fit=crop&w=500&q=80",
		description: "Omoplates serrées sur le banc, descente lente, poussée verticale sans cogner les haltères."
	},
	{
		number: 3,
		title: "Rowing haltère",
		muscles: "Dos · Biceps · Arrière d'épaule",
		sets: "4 séries",
		reps: "10-12 reps",
		weight: "16-24 kg",
		image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=500&q=80",
		description: "Tire le coude vers la hanche, garde l'épaule basse et évite de tourner le buste."
	},
	{
		number: 4,
		title: "Soulevé de terre roumain",
		muscles: "Ischios · Fessiers · Lombaires",
		sets: "3 séries",
		reps: "8-10 reps",
		weight: "30-40 kg",
		image: "https://images.unsplash.com/photo-1683279510373-06d83b537ba9?auto=format&fit=crop&w=500&q=80",
		description: "Hanches vers l'arrière, dos long, haltères proches des jambes et remontée par les fessiers."
	},
	{
		number: 5,
		title: "Développé épaules",
		muscles: "Épaules · Triceps · Gainage",
		sets: "3 séries",
		reps: "8-10 reps",
		weight: "8-14 kg",
		image: "https://images.unsplash.com/photo-1704223523449-ca3925f89dcc?auto=format&fit=crop&w=500&q=80",
		description: "Côtes rentrées, pousse au-dessus de la tête, puis reviens lentement aux épaules."
	},
	{
		number: 6,
		title: "Planche",
		muscles: "Abdos · Gainage · Épaules",
		sets: "3 séries",
		reps: "35-45 sec",
		weight: "Poids du corps",
		image: "https://images.unsplash.com/photo-1765302741884-e846c7a178df?auto=format&fit=crop&w=500&q=80",
		description: "Coudes sous les épaules, bassin légèrement rentré, respiration lente sans cambrer."
	}
];

export class RecapSeance extends React.Component<IRecapSeanceProps> {
	renderExercise(exercise: (typeof recapExercises)[number]) {
		return (
			<section className="bg-white border border-[#ded8cf] rounded-2xl overflow-hidden mb-3">
				<div className="p-3 flex gap-3">
					<img
						src={exercise.image}
						alt={exercise.title}
						className="w-20 h-20 rounded-xl object-cover bg-[#f1eadf]"
					/>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<span className="w-5 h-5 rounded-md bg-black text-white text-xs flex items-center justify-center font-bold">
								{exercise.number}
							</span>
							<h3 className="font-bold text-sm truncate">{exercise.title}</h3>
						</div>

						<p className="text-xs text-[#8d8378] mt-1">{exercise.muscles}</p>

						<div className="flex gap-2 mt-3 flex-wrap">
							<span className="bg-[#efebe3] rounded-full px-3 py-1 text-xs">{exercise.sets}</span>
							<span className="bg-[#efebe3] rounded-full px-3 py-1 text-xs">{exercise.reps}</span>
							<span className="bg-orange-100 text-[#ef623e] rounded-full px-3 py-1 text-xs font-bold">{exercise.weight}</span>
						</div>
					</div>
				</div>

				<div className="border-t border-[#ded8cf] p-3 text-xs text-[#2d2d2d]">
					{exercise.description}
				</div>
			</section>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-10">
				<header className="flex justify-between items-center mb-5">
					<button
						onClick={() => this.props.navigate(-1)}
						className="w-10 h-10 rounded-full border border-[#ded8cf]"
					>
						‹
					</button>
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">Séance renfo</p>
					<div className="w-10"></div>
				</header>

				<section className="bg-[#11100d] text-white rounded-3xl p-5">
					<div className="flex justify-between">
						<p className="uppercase text-xs tracking-widest text-[#b8aaa0] font-bold">Full body</p>
						<span className="bg-[#ef623e] rounded-full px-4 py-1 text-xs font-bold">55 min</span>
					</div>

					<h1 className="font-serif text-3xl font-bold mt-2">Renforcement musculaire</h1>
					<p className="text-sm text-[#b8aaa0] mt-2">
						Séance complète pour jambes, poussée, tirage et gainage. RPE cible 6/10.
					</p>

					<div className="grid grid-cols-4 gap-2 mt-5">
						<div><p className="font-serif text-2xl font-bold">6</p><p className="text-xs text-[#b8aaa0]">exos</p></div>
						<div><p className="font-serif text-2xl font-bold">21</p><p className="text-xs text-[#b8aaa0]">séries</p></div>
						<div><p className="font-serif text-2xl font-bold">75<span className="text-xs">s</span></p><p className="text-xs text-[#b8aaa0]">repos moy.</p></div>
						<div><p className="font-serif text-2xl font-bold">RPE 6</p><p className="text-xs text-[#b8aaa0]">cible</p></div>
					</div>
				</section>

				<div className="flex justify-between mt-6 mb-3">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">Exercices</p>
					<p className="text-sm text-[#8d8378] font-bold">{recapExercises.length}</p>
				</div>

				{recapExercises.map((exercise) => (
					<React.Fragment key={exercise.number}>
						{this.renderExercise(exercise)}
					</React.Fragment>
				))}
			</main>
		);
	}
}
