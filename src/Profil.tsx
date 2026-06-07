import React from "react";
import { Link } from "react-router-dom";

export class Profil extends React.Component<Record<string, never>, Record<string, never>> {
	renderInfoRow(label: string, value: string, isLast?: boolean) {
		return (
			<div
				className={`flex justify-between items-center px-4 py-3 ${isLast ? "" : "border-b border-[#ded8cf]"
					}`}
			>
				<p className="text-[#8d8378]">{label}</p>
				<p className="font-bold text-black">{value}</p>
			</div>
		);
	}

	renderSection(title: string, rows: { label: string; value: string }[]) {
		return (
			<section className="mt-5">
				<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-2 px-1">
					{title}
				</p>

				<div className="bg-white border border-[#ded8cf] rounded-2xl overflow-hidden">
					{rows.map((row, index) => (
						<React.Fragment key={row.label}>
							{this.renderInfoRow(row.label, row.value, index === rows.length - 1)}
						</React.Fragment>
					))}
				</div>
			</section>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-28">
				<section className="bg-[#11100d] text-white rounded-3xl p-5">
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold">
							SP
						</div>

						<div className="flex-1">
							<h1 className="font-serif text-2xl font-bold">Sara Preston</h1>
							<p className="text-sm text-[#ded8cf]">
								Perte de poids · Intermédiaire
							</p>
						</div>

						<button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
							<i className="fas fa-pencil-alt text-sm"></i>
						</button>
					</div>

					<div className="h-px bg-white/15 my-5"></div>

					<div className="grid grid-cols-3 text-center">
						<div>
							<p className="font-serif text-2xl font-bold">24</p>
							<p className="text-xs text-[#ded8cf]">séances</p>
						</div>

						<div>
							<p className="font-serif text-2xl font-bold">12j</p>
							<p className="text-xs text-[#ded8cf]">streak</p>
						</div>

						<div>
							<p className="font-serif text-2xl font-bold">−4,2 kg</p>
							<p className="text-xs text-[#ded8cf]">perte</p>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-3 gap-2 mt-5">
					<Link
						to="/watch-sync"
						className="bg-white border border-[#ded8cf] rounded-2xl py-4 flex flex-col items-center gap-2"
					>
						<i className="fas fa-sync-alt text-sm"></i>
						<p className="text-xs font-bold">Sync. montre</p>
					</Link>

					<Link
						to="/historique"
						className="bg-white border border-[#ded8cf] rounded-2xl py-4 flex flex-col items-center gap-2"
					>
						<i className="fas fa-chart-bar text-sm"></i>
						<p className="text-xs font-bold">Historique</p>
					</Link>

					<Link
						to="/chat"
						className="bg-white border border-[#ded8cf] rounded-2xl py-4 flex flex-col items-center gap-2"
					>
						<i className="far fa-comment text-sm"></i>
						<p className="text-xs font-bold">Coach</p>
					</Link>
				</section>

				{this.renderSection("Informations", [
					{ label: "Âge", value: "25 ans" },
					{ label: "Taille", value: "170 cm" },
					{ label: "Poids", value: "78 kg" }
				])}

				{this.renderSection("Entraînement", [
					{ label: "Objectif", value: "Perte de poids" },
					{ label: "Niveau", value: "Intermédiaire" },
					{ label: "Fréquence", value: "3×/sem." },
					{ label: "Équipement", value: "Salle de sport" }
				])}

				{this.renderSection("Métriques", [
					{ label: "FC max", value: "190 bpm" },
					{ label: "FC repos", value: "65 bpm" },
					{ label: "Sommeil", value: "7h15 / nuit" },
					{ label: "Calories", value: "2 100 kcal/jour" }
				])}

				{this.renderSection("Santé & contraintes", [
					{ label: "Blessures", value: "Ménisque fissuré" },
					{ label: "Maladies", value: "Diabète" }
				])}

				<button className="w-full border border-[#ded8cf] rounded-full py-4 mt-6 text-[#8d8378] font-bold bg-[#f7f4ee]">
					Se déconnecter
				</button>
			</main>
		);
	}
}
