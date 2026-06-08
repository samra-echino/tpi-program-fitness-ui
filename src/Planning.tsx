import React from "react";
import { Link } from "react-router-dom";
import {
	getWeekDays,
	getWeekNumber,
	getWeekRangeLabel,
	getWorkoutRecapPath,
	getTodayDayId,
	loadWorkouts,
	saveWorkouts,
	type IDay,
	type IWorkout
} from "./planningData";

type IPlanningProps = Record<string, never>;

interface IPlanningState {
	workouts: IWorkout[];
	draggedWorkoutId: number | null;
}

export class Planning extends React.Component<IPlanningProps, IPlanningState> {
	days: IDay[] = getWeekDays();
	todayDayId = getTodayDayId();
	todayIndex = this.days.find((day) => day.id === this.todayDayId)?.index ?? 0;

	constructor(props: IPlanningProps) {
		super(props);

		this.state = {
			draggedWorkoutId: null,
			workouts: loadWorkouts()
		};
	}

	onDragStart(id: number) {
		this.setState({ draggedWorkoutId: id });
	}

	onDragEnd() {
		this.setState({ draggedWorkoutId: null });
	}

	onDragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	onDrop(dayId: string) {
		if (this.state.draggedWorkoutId === null || this.isPastDay(dayId)) return;

		const workouts = this.state.workouts.map((workout) =>
			workout.id === this.state.draggedWorkoutId
				? { ...workout, dayId }
				: workout
		);

		saveWorkouts(workouts);

		this.setState({
			workouts,
			draggedWorkoutId: null
		});
	}

	isToday(dayId: string) {
		return dayId === this.todayDayId;
	}

	isPastDay(dayId: string) {
		const day = this.days.find((item) => item.id === dayId);

		return Boolean(day && day.index < this.todayIndex);
	}

	renderAction(workout: IWorkout, isToday: boolean) {
		if (isToday) {
			return (
				<Link
					to="/seance"
					className="w-9 h-9 rounded-full bg-[#ef623e] text-white flex items-center justify-center"
				>
					<i className="fas fa-play text-sm ml-[2px]"></i>
				</Link>
			);
		}

		if (workout.status === "done") {
			return (
				<div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
					<i className="fas fa-check text-sm"></i>
				</div>
			);
		}

		return (
			<div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
				<i className="fas fa-hourglass-half text-xs"></i>
			</div>
		);
	}

	renderWorkout(workout: IWorkout) {
		const isToday = this.isToday(workout.dayId);
		const recapPath = getWorkoutRecapPath(workout);

		return (
			<div
				key={workout.id}
				className={`relative h-[52px] rounded-lg border flex items-center px-3 gap-3 ${isToday
						? "bg-black text-white border-black"
						: "bg-white text-black border-gray-400"
					}`}
			>
				<button
					type="button"
					aria-label={`Déplacer ${workout.title}`}
					draggable
					onDragStart={() => this.onDragStart(workout.id)}
					onDragEnd={() => this.onDragEnd()}
					className={`grid h-8 w-5 shrink-0 cursor-grab place-items-center active:cursor-grabbing ${
						isToday ? "text-white/55" : "text-gray-300"
					}`}
				>
					<i className="fas fa-grip-vertical text-sm"></i>
				</button>

				<div
					className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${
						isToday ? "bg-white/10 text-white" : "bg-[#f7f4ee] text-[#8d8378]"
					}`}
				>
					<i className={`${workout.icon} text-sm`}></i>
				</div>

				<Link to={recapPath} className="flex-1 min-w-0">
					<div className="flex justify-between items-start">
						<h3 className="font-bold text-lg leading-5 truncate">
							{workout.title}
						</h3>
						<p className={`text-xs ${isToday ? "text-gray-300" : "text-gray-500"}`}>
							{workout.time}
						</p>
					</div>

					<p className={`text-xs flex gap-3 ${isToday ? "text-gray-300" : "text-gray-500"}`}>
						<span>{workout.duration}</span>
						<span>{workout.rpe}</span>
						{workout.exercises && <span>{workout.exercises}</span>}
						{workout.distance && <span>{workout.distance}</span>}
					</p>
				</Link>

				{this.renderAction(workout, isToday)}
			</div>
		);
	}

	renderDay(day: IDay) {
		const workouts = this.state.workouts.filter((workout) => workout.dayId === day.id);
		const isPast = this.isPastDay(day.id);

		return (
			<div
				key={day.id}
				onDragOver={(event) => {
					if (!isPast) this.onDragOver(event);
				}}
				onDrop={() => this.onDrop(day.id)}
				className={`grid grid-cols-[42px_1fr] gap-2 min-h-[58px] ${
					isPast ? "opacity-60" : ""
				}`}
			>
				<div className="pt-1">
					<p className="text-xs text-gray-400 font-bold">{day.label}</p>
					<p className="text-xl font-bold text-gray-500">{day.number}</p>
				</div>

				<div className="space-y-2">
					{workouts.map((workout) => this.renderWorkout(workout))}
				</div>
			</div>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-white pt-0 pb-24">

				<section className="px-3 pt-1">
					<p className="text-sm text-gray-400 font-bold">Mon planning</p>
					<h1 className="text-2xl font-serif font-bold leading-7">
						Semaine {getWeekNumber()}
					</h1>
					<p className="text-sm text-gray-400">{getWeekRangeLabel()}</p>
				</section>

				<section className="px-3 mt-4 grid grid-cols-[32px_1fr_32px] gap-6 items-center">
					<button className="h-8 border border-gray-400 rounded-md text-gray-500">
						&lt;
					</button>

					<button className="h-8 border border-gray-400 rounded-md font-bold text-sm">
						Cette semaine
					</button>

					<button className="h-8 border border-gray-400 rounded-md text-gray-500">
						&gt;
					</button>
				</section>

				<section className="px-2 mt-4 space-y-2">
					{this.days.map((day) => this.renderDay(day))}
				</section>

				<section className="mx-3 mt-5 bg-white border border-[#ded8cf] rounded-2xl p-5">
					<p className="uppercase text-xs text-[#8d8378] font-bold mb-4">
						Récap semaine
					</p>

					<div className="grid grid-cols-3 text-center">
						<div>
							<p className="font-serif text-2xl font-bold">6</p>
							<p className="text-xs text-[#8d8378]">séances</p>
						</div>

						<div>
							<p className="font-serif text-2xl font-bold">4h05</p>
							<p className="text-xs text-[#8d8378]">durée</p>
						</div>

						<div>
							<p className="font-serif text-2xl font-bold">2 jours</p>
							<p className="text-xs text-[#8d8378]">repos</p>
						</div>
					</div>
				</section>
			</main>
		);
	}
}
