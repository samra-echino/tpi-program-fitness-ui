import React from "react";
import type { NavigateFunction } from "react-router-dom";

interface IRecapCourseProps {
	navigate: NavigateFunction;
}

export class RecapCourse extends React.Component<IRecapCourseProps> {
	renderMetric(title: string, value: string, unit: string) {
		return (
			<div className="bg-white border border-[#ded8cf] rounded-2xl p-3">
				<p className="uppercase text-[10px] text-[#8d8378] font-bold">{title}</p>
				<p className="font-serif text-xl font-bold">
					{value}<span className="font-sans text-xs text-[#8d8378] ml-1">{unit}</span>
				</p>
			</div>
		);
	}

	renderZone(name: string, label: string, percent: string, width: string, color: string) {
		return (
			<div className="grid grid-cols-[35px_1fr_30px] gap-2 items-center text-xs mb-2">
				<div>
					<p className="font-bold">{name}</p>
					<p className="text-[#8d8378]">{label}</p>
				</div>
				<div className="h-1.5 bg-[#efebe3] rounded-full overflow-hidden">
					<div className={`h-full rounded-full ${color}`} style={{ width }}></div>
				</div>
				<p className="font-bold text-right">{percent}</p>
			</div>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-10">
				<header className="flex justify-between items-center mb-5">
					<button onClick={() => this.props.navigate(-1)} className="w-10 h-10 rounded-full border border-[#ded8cf]">‹</button>
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">Course terminée</p>
					<div className="w-10"></div>
				</header>

				<section className="bg-[#11100d] text-white rounded-3xl p-5">
					<p className="uppercase text-xs tracking-widest text-[#b8aaa0] font-bold">Jeudi 23 avril</p>
					<h1 className="font-serif text-3xl font-bold mt-2">Course matinale</h1>
					<p className="font-serif text-5xl font-bold mt-4">5,2 <span className="font-sans text-base">km</span></p>
				</section>

				<section className="bg-green-50 border border-green-100 rounded-2xl h-40 mt-4 relative overflow-hidden">
					<svg width="100%" height="160" viewBox="0 0 300 160" preserveAspectRatio="none">
						<path d="M10 130 L55 115 L80 110 L115 85 L145 78 L175 60 L210 52 L245 35 L285 22" fill="none" stroke="#ef623e" strokeWidth="3" />
						<circle cx="10" cy="130" r="5" fill="#34a853" />
					</svg>
					<span className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-bold">5,2 km</span>
				</section>

				<section className="grid grid-cols-3 gap-2 mt-3">
					{this.renderMetric("Allure", "5:49", "min/km")}
					{this.renderMetric("Temps", "30:14", "")}
					{this.renderMetric("Dénivelé", "+45", "m")}
					{this.renderMetric("BPM moy.", "152", "bpm")}
					{this.renderMetric("Calories", "320", "kcal")}
					{this.renderMetric("Cadence", "168", "spm")}
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-2xl p-4 mt-4">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-4">Zones cardiaques</p>
					{this.renderZone("Z1", "Récupération", "5%", "5%", "bg-blue-300")}
					{this.renderZone("Z2", "Endurance", "18%", "18%", "bg-green-400")}
					{this.renderZone("Z3", "Tempo", "52%", "52%", "bg-yellow-400")}
					{this.renderZone("Z4", "Seuil", "20%", "20%", "bg-orange-400")}
					{this.renderZone("Z5", "VO2 max", "5%", "5%", "bg-red-600")}
				</section>

				<button className="w-full bg-[#ef623e] text-white rounded-full py-4 font-bold mt-4">
					Enregistrer la course ✓
				</button>

				<button className="w-full text-[#8d8378] py-4 text-sm">
					Supprimer
				</button>
			</main>
		);
	}
}
