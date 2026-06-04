import React from "react";
import { Link } from "react-router-dom";
import {
	getFormattedToday,
	getTodayDayId,
	getWeekDays,
	loadWorkouts,
	type IDay,
	type IWorkout
} from "./planningData";

interface IAccueilState {
	workouts: IWorkout[];
}

export class Accueil extends React.Component<Record<string, never>, IAccueilState> {
	days: IDay[] = getWeekDays();
	todayDayId = getTodayDayId();
	formattedToday = getFormattedToday();

	constructor(props: Record<string, never>) {
		super(props);

		this.state = {
			workouts: loadWorkouts()
		};
	}

	getWorkoutsForDay(dayId: string) {
		return this.state.workouts.filter((workout) => workout.dayId === dayId);
	}

	getTodayWorkout() {
		return this.getWorkoutsForDay(this.todayDayId)[0];
	}

	renderWeekDay(day: IDay) {
		const workouts = this.getWorkoutsForDay(day.id);
		const primaryWorkout = workouts[0];
		const isDone = primaryWorkout?.status === "done";
		const isToday = day.id === this.todayDayId;
		const isEmpty = workouts.length === 0;

		if (isToday && primaryWorkout) {
			return (
				<Link
					to="/seance"
					aria-label={`Démarrer ${primaryWorkout.title}`}
					className="h-9 rounded-xl flex items-center justify-center text-sm bg-[#ef623e] text-white"
				>
					<i className="fas fa-play text-xs ml-[2px]"></i>
				</Link>
			);
		}

		return (
			<div
				className={
					"h-9 rounded-xl flex items-center justify-center text-sm " +
					(isDone
						? "bg-[#12110d] text-white"
						: "bg-[#f7f4ee] border border-[#e5ddd2] text-[#9b9186]")
				}
			>
				{isDone ? (
					"✓"
				) : isEmpty ? (
					"—"
				) : primaryWorkout ? (
					<i className={`${primaryWorkout.icon} text-xs`}></i>
				) : (
					"•"
				)}
			</div>
		);
	}

	render() {
		const todayWorkout = this.getTodayWorkout();

		return (
			<main className="px-5 pt-14 space-y-4">
				<header className="flex justify-between items-start">
					<div>
						<p className="text-xs text-[#9b9186] font-bold capitalize">
							{this.formattedToday}
						</p>
						<h1 className="text-3xl font-serif font-bold text-[#171510]">
							Bonjour, Sara
						</h1>
					</div>

					<Link
						to="/profil"
						className="w-11 h-11 rounded-full border border-[#e1d8cd] bg-[#f4efe7] flex items-center justify-center font-bold"
					>
						SP
					</Link>
				</header>

				<section className="rounded-[24px] bg-[#12110d] text-white p-5 min-h-[275px] flex flex-col justify-end overflow-hidden">
					<p className="text-xs uppercase tracking-widest text-[#b8aaa0] font-bold mb-16">
						Séance du jour
					</p>

					<h2 className="text-3xl font-serif font-bold">
						{todayWorkout?.title ?? "Repos"}
					</h2>

					<p className="text-sm text-[#b8aaa0] mt-2">
						{todayWorkout ? (
							<>
								<i className="far fa-clock mr-1"></i> {todayWorkout.duration}
								<span className="mx-2">•</span>
								{todayWorkout.exercises ?? todayWorkout.distance}
								<span className="mx-2">•</span>
								{todayWorkout.rpe}
							</>
						) : (
							"Aucune séance planifiée aujourd'hui"
						)}
					</p>

					<Link
						to={todayWorkout ? "/seance" : "/planning"}
						className="mt-5 bg-[#ef623e] text-white rounded-full py-4 text-center font-bold"
					>
						{todayWorkout ? "Démarrer la séance ▶" : "Voir le planning"}
					</Link>
				</section>

				<section className="bg-white border border-[#e5ddd2] rounded-[20px] p-4">
					<div className="flex justify-between items-center mb-3">
						<p className="text-xs uppercase tracking-widest text-[#9b9186] font-bold">
							Cette semaine
						</p>
						<Link to="/planning" className="text-xs text-[#9b9186] font-bold">
							Voir le plan ›
						</Link>
					</div>

					<div className="grid grid-cols-7 gap-2 text-center">
						{this.days.map((day) => (
							<div key={day.id}>
								<p className="text-xs text-[#9b9186] font-bold mb-1">
									{day.label.charAt(0)}
								</p>
								{this.renderWeekDay(day)}
							</div>
						))}
					</div>
				</section>

				<section className="grid grid-cols-2 gap-3">
					<Stat title="Séances" value="2/3" small="cette semaine" />
					<Stat title="Volume" value="18h30" small="↗ +10%" green />
					<Stat title="Dernière course" value="3,5 km" small="il y a 2 jours" />
					<Stat title="Calories" value="2 840" small="cette semaine" />
				</section>

				<section className="bg-white border border-[#e5ddd2] rounded-[20px] p-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-11 h-11 rounded-full bg-[#f1eadf] flex items-center justify-center font-bold text-xl">
							GM
						</div>
						<div>
							<p className="text-xs uppercase tracking-widest text-[#9b9186] font-bold">
								Mon coach
							</p>
							<p className="font-bold">Garfield Michael</p>
						</div>
					</div>

					<Link
						to="/chat"
						className="w-11 h-11 rounded-full bg-[#ef623e] text-white flex items-center justify-center"
					>
						<i className="far fa-comment"></i>
					</Link>
				</section>

				<section className="bg-white border border-[#e5ddd2] rounded-[20px] p-4">
					<div className="flex justify-between">
						<p className="text-xs uppercase tracking-widest text-[#9b9186] font-bold">
							Progression du plan
						</p>
						<p className="text-sm font-bold">60%</p>
					</div>

					<div className="h-2 bg-[#eee7dd] rounded-full mt-4 overflow-hidden">
						<div className="h-full bg-[#ef623e] rounded-full w-[60%]"></div>
					</div>

					<p className="text-xs text-[#9b9186] mt-2">
						Semaine 6 sur 10 · objectif perte de poids
					</p>
				</section>
			</main>
		);
	}
}

function Stat(props: { title: string; value: string; small: string; green?: boolean }) {
	return (
		<div className="bg-white border border-[#e5ddd2] rounded-[18px] p-4 min-h-[95px]">
			<p className="text-xs uppercase tracking-widest text-[#9b9186] font-bold">
				{props.title}
			</p>
			<p className="text-3xl font-serif font-bold mt-2 text-[#171510]">
				{props.value}
			</p>
			<p className={"text-xs mt-1 " + (props.green ? "text-green-600" : "text-[#9b9186]")}>
				{props.small}
			</p>
		</div>
	);
}
