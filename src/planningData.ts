export interface IDay {
	id: string;
	label: string;
	number: string;
	index: number;
}

export interface IWorkout {
	id: number;
	dayId: string;
	title: string;
	time: string;
	duration: string;
	rpe: string;
	exercises?: string;
	distance?: string;
	icon: string;
	status?: "done" | "today" | "locked";
}

export interface IPlanningStats {
	totalWorkouts: number;
	doneWorkouts: number;
	totalMinutes: number;
	calories: number;
	progressPercent: number;
	lastRunDistance: string;
	lastRunLabel: string;
}

const DAY_IDS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function getTodayDayId(date = new Date()) {
	const mondayBasedIndex = (date.getDay() + 6) % 7;

	return DAY_IDS[mondayBasedIndex];
}

export function getWeekDays(date = new Date()): IDay[] {
	const monday = new Date(date);
	const mondayBasedIndex = (date.getDay() + 6) % 7;

	monday.setHours(12, 0, 0, 0);
	monday.setDate(date.getDate() - mondayBasedIndex);

	return DAY_IDS.map((id, index) => {
		const day = new Date(monday);
		day.setDate(monday.getDate() + index);

		return {
			id,
			index,
			label: DAY_LABELS[index],
			number: String(day.getDate())
		};
	});
}

export function getFormattedToday(date = new Date()) {
	return new Intl.DateTimeFormat("fr-CH", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(date);
}

export function getWeekRangeLabel(date = new Date()) {
	const weekDays = getWeekDays(date);
	const monday = weekDays[0];
	const sunday = weekDays[6];
	const month = new Intl.DateTimeFormat("fr-CH", { month: "long" }).format(date);

	return `${monday.number} - ${sunday.number} ${month} ${date.getFullYear()}`;
}

export function getWeekNumber(date = new Date()) {
	const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNumber = target.getUTCDay() || 7;

	target.setUTCDate(target.getUTCDate() + 4 - dayNumber);

	const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));

	return Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getDefaultWorkouts(): IWorkout[] {
	const todayDayId = getTodayDayId();

	return [
	{
		id: 1,
		dayId: "mar",
		title: "Renforcement",
		time: "18h00",
		duration: "55 min",
		rpe: "RPE 5",
		exercises: "6 exercices",
		icon: "fas fa-dumbbell",
		status: "done"
	},
	{
		id: 2,
		dayId: todayDayId,
		title: "Renforcement",
		time: "18h00",
		duration: "55 min",
		rpe: "RPE 5",
		exercises: "6 exercices",
		icon: "fas fa-dumbbell",
		status: "today"
	},
	{
		id: 3,
		dayId: "sam",
		title: "Course",
		time: "09h00",
		duration: "30 min",
		rpe: "RPE 4",
		distance: "5km",
		icon: "fas fa-route",
		status: "locked"
	},
	{
		id: 4,
		dayId: "sam",
		title: "Yoga",
		time: "18h00",
		duration: "45 min",
		rpe: "RPE 2",
		icon: "far fa-heart",
		status: "locked"
	}
	];
}

const WORKOUTS_STORAGE_KEY = "planningWorkouts";

export function loadWorkouts(): IWorkout[] {
	const defaultWorkouts = getDefaultWorkouts();

	try {
		const saved = localStorage.getItem(WORKOUTS_STORAGE_KEY);

		if (!saved) {
			return defaultWorkouts;
		}

		const parsed = JSON.parse(saved);

		if (!Array.isArray(parsed)) {
			return defaultWorkouts;
		}

		return defaultWorkouts.map((fallbackWorkout) => {
			const savedWorkout = parsed.find(
				(workout) => workout && workout.id === fallbackWorkout.id
			);

			return {
				...fallbackWorkout,
				dayId:
					typeof savedWorkout?.dayId === "string"
						? savedWorkout.dayId
						: fallbackWorkout.dayId,
				status:
					savedWorkout?.status === "done" ||
					savedWorkout?.status === "today" ||
					savedWorkout?.status === "locked"
						? savedWorkout.status
						: fallbackWorkout.status
			};
		});
	} catch {
		return defaultWorkouts;
	}
}

export function saveWorkouts(workouts: IWorkout[]) {
	localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
}

export function getWorkoutRecapPath(workout: IWorkout) {
	return workout.distance ? "/recap-course" : "/recap-seance";
}

export function getWorkoutMinutes(workout: IWorkout) {
	const match = workout.duration.match(/\d+/);

	return match ? Number(match[0]) : 0;
}

export function getWorkoutCalories(workout: IWorkout) {
	const minutes = getWorkoutMinutes(workout);

	if (workout.distance) {
		return minutes * 11;
	}

	if (workout.title.toLowerCase().includes("yoga")) {
		return minutes * 4;
	}

	return minutes * 7;
}

export function getPlanningStats(workouts: IWorkout[]): IPlanningStats {
	const totalWorkouts = workouts.length;
	const doneWorkouts = workouts.filter((workout) => workout.status === "done").length;
	const totalMinutes = workouts.reduce((total, workout) => total + getWorkoutMinutes(workout), 0);
	const calories = workouts.reduce((total, workout) => total + getWorkoutCalories(workout), 0);
	const progressPercent = totalWorkouts > 0 ? Math.round((doneWorkouts / totalWorkouts) * 100) : 0;
	const lastRun = workouts.find((workout) => workout.distance);

	return {
		totalWorkouts,
		doneWorkouts,
		totalMinutes,
		calories,
		progressPercent,
		lastRunDistance: lastRun?.distance ?? "0 km",
		lastRunLabel: lastRun ? lastRun.dayId.toUpperCase() : "aucune course"
	};
}
