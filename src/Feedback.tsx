import React from "react";
import type { NavigateFunction } from "react-router-dom";

interface IFeedbackProps {
	navigate: NavigateFunction;
}

interface IFeedbackState {
	difficulty: number;
	energy: string;
	pain: string;
	note: string;
}

export class Feedback extends React.Component<IFeedbackProps, IFeedbackState> {
	constructor(props: IFeedbackProps) {
		super(props);

		this.state = {
			difficulty: 4,
			energy: "Bien",
			pain: "Rien",
			note: ""
		};
	}

	saveSession() {
		const session = {
			id: Date.now(),
			type: "training",
			title: "Renforcement",
			date: new Date().toISOString(),
			duration: "55 min",
			exercises: 6,
			volume: "2 450 kg",
			difficulty: this.state.difficulty,
			energy: this.state.energy,
			pain: this.state.pain,
			note: this.state.note
		};

		const oldSessions = JSON.parse(localStorage.getItem("sessions") || "[]");
		localStorage.setItem("sessions", JSON.stringify([session, ...oldSessions]));

		this.props.navigate("/");
	}

	render() {
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
						Séance terminée
					</p>

					<h1 className="font-serif text-3xl font-bold mt-2">Bien joué.</h1>

					<div className="grid grid-cols-3 mt-6">
						<div>
							<p className="font-serif text-2xl font-bold">55<span className="text-xs">min</span></p>
							<p className="text-xs text-[#b8aaa0]">durée</p>
						</div>
						<div>
							<p className="font-serif text-2xl font-bold">6</p>
							<p className="text-xs text-[#b8aaa0]">exercices</p>
						</div>
						<div>
							<p className="font-serif text-2xl font-bold">2 450<span className="text-xs">kg</span></p>
							<p className="text-xs text-[#b8aaa0]">volume</p>
						</div>
					</div>
				</section>

				<section className="mt-6">
					<div className="flex justify-between">
						<p className="uppercase text-xs text-[#8d8378] font-bold">
							Difficulté ressentie
						</p>
						<p className="font-bold">{this.state.difficulty}/10</p>
					</div>

					<div className="grid grid-cols-10 gap-1 mt-3">
						{[1,2,3,4,5,6,7,8,9,10].map((n) => (
							<button
								key={n}
								onClick={() => this.setState({ difficulty: n })}
								className={`h-8 rounded-md text-sm font-bold ${
									n <= this.state.difficulty
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
