import React from "react";

interface IProgressProps {}

interface IProgressState {
	selectedTab: "training" | "run";
	selectedPeriod: string;
}

export class Progress extends React.Component<IProgressProps, IProgressState> {
	constructor(props: IProgressProps) {
		super(props);

		this.state = {
			selectedTab: "training",
			selectedPeriod: "30j"
		};
	}

	renderStatCard(title: string, value: string, sub: string, icon: string) {
		return (
			<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
				<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
					<i className={`${icon} mr-2`}></i>
					{title}
				</p>
				<p className="font-serif text-3xl font-bold mt-2">{value}</p>
				<p className="text-green-600 text-xs font-bold">{sub}</p>
			</div>
		);
	}

	renderPeriodButton(label: string) {
		const active = this.state.selectedPeriod === label;

		return (
			<button
				onClick={() => this.setState({ selectedPeriod: label })}
				className={`px-3 py-2 rounded-full text-xs font-bold ${
					active ? "bg-black text-white" : "text-[#8d8378]"
				}`}
			>
				{label}
			</button>
		);
	}

	renderMiniLine(colorClass: string) {
		return (
			<div className="w-16 h-8 flex items-end gap-1">
				<div className={`h-2 w-4 border-t-2 ${colorClass}`}></div>
				<div className={`h-3 w-4 border-t-2 ${colorClass}`}></div>
				<div className={`h-5 w-4 border-t-2 ${colorClass}`}></div>
			</div>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-28">
				<header className="flex justify-between items-start">
					<div>
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
							Mes progrès
						</p>
						<h1 className="font-serif text-4xl font-bold">Statistiques</h1>
					</div>

					<button className="w-10 h-10 bg-white border border-[#ded8cf] rounded-full">
						<i className="far fa-calendar"></i>
					</button>
				</header>

				<section className="flex gap-2 mt-5">
					<button
						onClick={() => this.setState({ selectedTab: "training" })}
						className={`px-5 py-3 rounded-full text-sm font-bold ${
							this.state.selectedTab === "training"
								? "bg-black text-white"
								: "bg-white border border-[#ded8cf]"
						}`}
					>
						Entraînement
					</button>

					<button
						onClick={() => this.setState({ selectedTab: "run" })}
						className={`px-5 py-3 rounded-full text-sm font-bold ${
							this.state.selectedTab === "run"
								? "bg-black text-white"
								: "bg-white border border-[#ded8cf]"
						}`}
					>
						Course
					</button>
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-5">
					<div className="flex justify-between">
						<div>
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								Objectif actuel
							</p>
							<h2 className="font-serif text-2xl font-bold">Perte de poids</h2>
							<p className="text-sm text-[#8d8378]">−4,2 kg sur 8 kg visés</p>
						</div>

						<div className="relative w-16 h-16">
							<svg width="64" height="64">
								<circle
									cx="32"
									cy="32"
									r="24"
									stroke="#ded8cf"
									strokeWidth="6"
									fill="none"
								/>
								<circle
									cx="32"
									cy="32"
									r="24"
									stroke="#e9653f"
									strokeWidth="6"
									fill="none"
									strokeLinecap="round"
									strokeDasharray={151}
									strokeDashoffset={72}
									transform="rotate(-90 32 32)"
								/>
							</svg>
							<p className="absolute inset-0 flex items-center justify-center text-sm font-bold">
								52%
							</p>
						</div>
					</div>

					<div className="mt-6 h-24 relative">
						<svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
							<path
								d="M0 20 C50 28, 60 32, 100 36 C150 42, 190 48, 230 52 C255 56, 275 62, 300 58"
								fill="none"
								stroke="#e9653f"
								strokeWidth="2"
							/>
							<path
								d="M0 20 C50 28, 60 32, 100 36 C150 42, 190 48, 230 52 C255 56, 275 62, 300 58 L300 80 L0 80 Z"
								fill="#e9653f"
								opacity="0.08"
							/>
						</svg>

						<div className="flex justify-between text-xs text-[#8d8378]">
							<p>15 avr.</p>
							<p>12 mai</p>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-2 gap-3 mt-4">
					{this.renderStatCard("Séances", "24", "↗ +14%", "fas fa-dumbbell")}
					{this.renderStatCard("Volume", "48k kg", "↗ +18%", "fas fa-weight")}
					{this.renderStatCard("Durée", "18h24", "↗ +10%", "far fa-clock")}
					{this.renderStatCard("Calories", "8 450", "↗ +12%", "fas fa-fire")}
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-4">
					<div className="flex justify-between items-start">
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
							Évolution des performances
						</p>

						<div className="flex gap-1">
							{["7j", "30j", "3M", "1A"].map((period) =>
								this.renderPeriodButton(period)
							)}
						</div>
					</div>

					<div className="mt-5 space-y-4">
						<div className="flex justify-between items-center border-b border-[#ded8cf] pb-3">
							<div>
								<p className="text-sm text-[#8d8378]">Volume soulevé</p>
								<p className="font-serif text-3xl font-bold">
									48 000 <span className="font-sans text-sm text-[#8d8378]">kg</span>
									<span className="font-sans text-xs text-green-600 ml-2">+18%</span>
								</p>
							</div>
							{this.renderMiniLine("border-[#e9653f]")}
						</div>

						<div className="flex justify-between items-center border-b border-[#ded8cf] pb-3">
							<div>
								<p className="text-sm text-[#8d8378]">Bench (1RM)</p>
								<p className="font-serif text-3xl font-bold">
									75 <span className="font-sans text-sm text-[#8d8378]">kg</span>
									<span className="font-sans text-xs text-green-600 ml-2">+5 kg</span>
								</p>
							</div>
							{this.renderMiniLine("border-blue-500")}
						</div>

						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm text-[#8d8378]">Squat (1RM)</p>
								<p className="font-serif text-3xl font-bold">
									100 <span className="font-sans text-sm text-[#8d8378]">kg</span>
									<span className="font-sans text-xs text-green-600 ml-2">+10 kg</span>
								</p>
							</div>
							{this.renderMiniLine("border-green-600")}
						</div>
					</div>
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-4">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-4">
						Zones cardiaques
					</p>

					<div className="flex items-center gap-5">
						<div className="relative w-24 h-24">
							<svg width="96" height="96">
								<circle cx="48" cy="48" r="34" stroke="#60a5fa" strokeWidth="8" fill="none" />
								<circle cx="48" cy="48" r="34" stroke="#6ee7b7" strokeWidth="8" fill="none" strokeDasharray="40 220" />
								<circle cx="48" cy="48" r="34" stroke="#facc15" strokeWidth="8" fill="none" strokeDasharray="110 220" />
								<circle cx="48" cy="48" r="34" stroke="#fb923c" strokeWidth="8" fill="none" strokeDasharray="70 220" />
								<circle cx="48" cy="48" r="34" stroke="#be123c" strokeWidth="8" fill="none" strokeDasharray="25 220" />
							</svg>
							<p className="absolute inset-0 flex items-center justify-center font-serif  font-bold">
								18h24
							</p>
						</div>

						<div className="flex-1 space-y-1 text-xs">
							{[
								["Z1", "50–60%", "5%"],
								["Z2", "60–70%", "18%"],
								["Z3", "70–80%", "52%"],
								["Z4", "80–90%", "20%"],
								["Z5", "90–100%", "5%"]
							].map((row) => (
								<div key={row[0]} className="flex justify-between">
									<p>
										<span className="inline-block w-2 h-2 bg-[#e9653f] rounded-sm mr-2"></span>
										{row[0]} <span className="text-[#8d8378] ml-2">{row[1]}</span>
									</p>
									<p className="font-bold">{row[2]}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="grid grid-cols-2 gap-3 mt-4">
					<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
							Records
						</p>
						<div className="text-sm space-y-1">
							<p className="flex justify-between">Bench <b>75 kg</b></p>
							<p className="flex justify-between">Squat <b>100 kg</b></p>
							<p className="flex justify-between">DL <b>120 kg</b></p>
						</div>
					</div>

					<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
							Streak
						</p>
						<p className="font-serif text-4xl font-bold">
							12 <span className="font-sans text-sm text-[#8d8378]">jours</span>
						</p>
						<div className="flex gap-1 mt-3">
							{Array.from({ length: 7 }).map((_, index) => (
								<div
									key={index}
									className={`w-4 h-4 rounded ${
										index < 6 ? "bg-[#e9653f]" : "bg-[#ded8cf]"
									}`}
								></div>
							))}
						</div>
					</div>
				</section>
			</main>
		);
	}
}