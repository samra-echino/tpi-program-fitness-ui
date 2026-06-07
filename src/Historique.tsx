import React from "react";
import { Link } from "react-router-dom";

interface ISession {
	id: number;
	date: string;
	title: string;
	duration: string;
	exercises?: number;
	volume?: string;
	distance?: string;
	bpm?: string;
	type: "training" | "run";
}

interface IState {
	filter: "all" | "training" | "run" | "feedback";
	sessions: ISession[];
}

interface ISavedSession {
	id?: number;
	date?: string;
	title?: string;
	duration?: string | number;
	exercises?: number;
	volume?: string;
	type?: string;
}

export class Historique extends React.Component<Record<string, never>, IState> {
	constructor(props: Record<string, never>) {
		super(props);

		this.state = {
			filter: "all",
			sessions: []
		};
	}

	componentDidMount() {
		const savedRaw = JSON.parse(localStorage.getItem("sessions") || "[]") as ISavedSession[];

		const saved: ISession[] = savedRaw.map((session) => ({
			id: session.id || Date.now(),
			date: session.date || new Date().toISOString(),
			title: session.title || "Renforcement",
			duration:
				typeof session.duration === "number"
					? `${session.duration} min`
					: session.duration || "55 min",
			exercises: session.exercises || 6,
			volume: session.volume || "32 450 kg",
			type: session.type === "run" ? "run" : "training"
		}));

		const mockSessions: ISession[] = [
			{
				id: 1001,
				date: "2024-04-23",
				title: "Renforcement",
				duration: "55 min",
				exercises: 6,
				volume: "32 450 kg",
				type: "training"
			},
			{
				id: 1002,
				date: "2024-04-22",
				title: "Course à pied",
				duration: "30:14",
				distance: "5,2 km",
				bpm: "152 bpm",
				type: "run"
			},
			{
				id: 1003,
				date: "2024-04-20",
				title: "Renforcement",
				duration: "48 min",
				exercises: 5,
				volume: "28 100 kg",
				type: "training"
			},
			{
				id: 1004,
				date: "2024-04-18",
				title: "Course à pied",
				duration: "42:30",
				distance: "7,8 km",
				bpm: "148 bpm",
				type: "run"
			},
			{
				id: 1005,
				date: "2024-04-16",
				title: "Renforcement",
				duration: "52 min",
				exercises: 6,
				volume: "30 800 kg",
				type: "training"
			}
		];

		this.setState({
			sessions: [...saved, ...mockSessions]
		});
	}

	formatDate(date: string) {
		const d = new Date(date);

		return d.toLocaleDateString("fr-FR", {
			weekday: "short",
			day: "numeric",
			month: "short"
		});
	}

	renderFilter(label: string, value: IState["filter"]) {
		const active = this.state.filter === value;

		return (
			<button
				onClick={() => this.setState({ filter: value })}
				className={`px-3 py-2 rounded-full text-[11px] font-bold border whitespace-nowrap ${
					active
						? "bg-black text-white border-black"
						: "bg-white text-black border-[#ded8cf]"
				}`}
			>
				{label}
			</button>
		);
	}

	renderSummary() {
		return (
			<section className="bg-white border border-[#ded8cf] rounded-2xl p-4 mt-4">
				<div className="flex justify-between">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
						Avril 2024
					</p>
					<p className="text-xs text-[#8d8378]">ce mois-ci</p>
				</div>

				<div className="grid grid-cols-4 text-center mt-4">
					<div>
						<p className="font-serif text-2xl font-bold">24</p>
						<p className="text-xs text-[#8d8378]">séances</p>
					</div>

					<div>
						<p className="font-serif text-2xl font-bold">48k</p>
						<p className="text-xs text-[#8d8378]">kg</p>
					</div>

					<div>
						<p className="font-serif text-2xl font-bold">18h</p>
						<p className="text-xs text-[#8d8378]">durée</p>
					</div>

					<div>
						<p className="font-serif text-2xl font-bold">8 450</p>
						<p className="text-xs text-[#8d8378]">kcal</p>
					</div>
				</div>
			</section>
		);
	}

	renderSession(session: ISession) {
		const isRun = session.type === "run";

		return (
			<Link
				key={session.id}
				to={isRun ? "/recap-course" : "/recap-seance"}
				className="bg-white border border-[#ded8cf] rounded-2xl p-4 flex items-center gap-4"
			>
				<div
					className={`w-12 h-12 rounded-xl flex items-center justify-center ${
						isRun ? "bg-[#efebe3]" : "bg-orange-100"
					}`}
				>
					<i
						className={`${
							isRun ? "fas fa-route" : "fas fa-dumbbell"
						} text-[#ef623e]`}
					></i>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex justify-between gap-2">
						<h3 className="font-bold truncate">{session.title}</h3>
						<p className="text-xs text-[#8d8378] whitespace-nowrap">
							{this.formatDate(session.date)}
						</p>
					</div>

					<p className="text-xs text-[#8d8378] mt-1 truncate">
						{session.duration}
						<span className="mx-2">·</span>
						{isRun ? session.distance : `${session.exercises} exos`}
						<span className="mx-2">·</span>
						<span className="text-black font-bold">
							{isRun ? session.bpm : session.volume}
						</span>
					</p>
				</div>

				<p className="text-[#8d8378]">›</p>
			</Link>
		);
	}

	render() {
		const filteredSessions = this.state.sessions.filter((session) => {
			if (this.state.filter === "all") return true;
			if (this.state.filter === "feedback") return true;

			return session.type === this.state.filter;
		});

		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-28 overflow-hidden">
				<header className="flex justify-between items-center">
					<div>
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
							Mes séances
						</p>
						<h1 className="font-serif text-4xl font-bold">Historique</h1>
					</div>

					<button className="w-10 h-10 rounded-full border border-[#ded8cf] bg-white">
						<i className="fas fa-filter text-sm text-[#8d8378]"></i>
					</button>
				</header>

				<section className="grid grid-cols-4 gap-2 mt-4">
					{this.renderFilter("Toutes", "all")}
					{this.renderFilter("Renforcement", "training")}
					{this.renderFilter("Course", "run")}
					{this.renderFilter("Évaluations", "feedback")}
				</section>

				{this.renderSummary()}

				<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mt-5 mb-3">
					Avril 2024
				</p>

				<div className="space-y-3">
					{filteredSessions.map((session) => this.renderSession(session))}
				</div>
			</main>
		);
	}
}
