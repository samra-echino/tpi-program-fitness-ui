import React from "react";

type ProgressTab = "training" | "run";
type ProgressPeriod = "7j" | "30j" | "3M" | "1A";

interface IProgressState {
	selectedTab: ProgressTab;
	selectedPeriod: ProgressPeriod;
}

interface IMetric {
	title: string;
	value: string;
	sub: string;
	icon: string;
}

interface IPerformanceRow {
	label: string;
	value: string;
	unit: string;
	delta: string;
	colorClass: string;
}

interface IRecord {
	label: string;
	value: string;
}

interface IZone {
	label: string;
	range: string;
	share: string;
	colorClass: string;
}

interface IProgressDataset {
	objectiveTitle: string;
	objectiveDetail: string;
	progress: number;
	rangeStart: string;
	rangeEnd: string;
	stats: IMetric[];
	performanceTitle: string;
	performanceRows: IPerformanceRow[];
	zonesTotal: string;
	zones: IZone[];
	records: IRecord[];
	streak: number;
}

const PERIODS: ProgressPeriod[] = ["7j", "30j", "3M", "1A"];

const TRAINING_ZONES: IZone[] = [
	{ label: "Z1", range: "50-60%", share: "8%", colorClass: "bg-blue-400" },
	{ label: "Z2", range: "60-70%", share: "22%", colorClass: "bg-emerald-300" },
	{ label: "Z3", range: "70-80%", share: "46%", colorClass: "bg-yellow-400" },
	{ label: "Z4", range: "80-90%", share: "19%", colorClass: "bg-orange-400" },
	{ label: "Z5", range: "90-100%", share: "5%", colorClass: "bg-rose-700" }
];

const RUN_ZONES: IZone[] = [
	{ label: "Z1", range: "50-60%", share: "14%", colorClass: "bg-blue-400" },
	{ label: "Z2", range: "60-70%", share: "41%", colorClass: "bg-emerald-300" },
	{ label: "Z3", range: "70-80%", share: "31%", colorClass: "bg-yellow-400" },
	{ label: "Z4", range: "80-90%", share: "12%", colorClass: "bg-orange-400" },
	{ label: "Z5", range: "90-100%", share: "2%", colorClass: "bg-rose-700" }
];

const PROGRESS_DATA: Record<ProgressTab, Record<ProgressPeriod, IProgressDataset>> = {
	training: {
		"7j": {
			objectiveTitle: "Renforcement",
			objectiveDetail: "3 séances réalisées cette semaine",
			progress: 18,
			rangeStart: "2 juin",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Séances", value: "3", sub: "+1 vs sem.", icon: "fas fa-dumbbell" },
				{ title: "Volume", value: "5,8k kg", sub: "+6%", icon: "fas fa-weight-hanging" },
				{ title: "Durée", value: "2h45", sub: "+12%", icon: "far fa-clock" },
				{ title: "Calories", value: "1 120", sub: "+9%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution musculation",
			performanceRows: [
				{ label: "Volume soulevé", value: "5 800", unit: "kg", delta: "+6%", colorClass: "border-[#e9653f]" },
				{ label: "Développé haltères", value: "20", unit: "kg", delta: "+2 kg", colorClass: "border-blue-500" },
				{ label: "Goblet squat", value: "24", unit: "kg", delta: "+2 kg", colorClass: "border-green-600" }
			],
			zonesTotal: "2h45",
			zones: TRAINING_ZONES,
			records: [
				{ label: "Squat", value: "24 kg" },
				{ label: "Rowing", value: "24 kg" },
				{ label: "Planche", value: "45 s" }
			],
			streak: 4
		},
		"30j": {
			objectiveTitle: "Perte de poids",
			objectiveDetail: "-4,2 kg sur 8 kg visés",
			progress: 52,
			rangeStart: "15 mai",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Séances", value: "24", sub: "+14%", icon: "fas fa-dumbbell" },
				{ title: "Volume", value: "48k kg", sub: "+18%", icon: "fas fa-weight-hanging" },
				{ title: "Durée", value: "18h24", sub: "+10%", icon: "far fa-clock" },
				{ title: "Calories", value: "8 450", sub: "+12%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution musculation",
			performanceRows: [
				{ label: "Volume soulevé", value: "48 000", unit: "kg", delta: "+18%", colorClass: "border-[#e9653f]" },
				{ label: "Développé haltères", value: "24", unit: "kg", delta: "+5 kg", colorClass: "border-blue-500" },
				{ label: "Goblet squat", value: "30", unit: "kg", delta: "+6 kg", colorClass: "border-green-600" }
			],
			zonesTotal: "18h24",
			zones: TRAINING_ZONES,
			records: [
				{ label: "Squat", value: "30 kg" },
				{ label: "Rowing", value: "26 kg" },
				{ label: "Planche", value: "55 s" }
			],
			streak: 12
		},
		"3M": {
			objectiveTitle: "Perte de poids",
			objectiveDetail: "-5,4 kg depuis le début du plan",
			progress: 68,
			rangeStart: "8 mars",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Séances", value: "58", sub: "+21%", icon: "fas fa-dumbbell" },
				{ title: "Volume", value: "124k kg", sub: "+31%", icon: "fas fa-weight-hanging" },
				{ title: "Durée", value: "46h10", sub: "+24%", icon: "far fa-clock" },
				{ title: "Calories", value: "21 900", sub: "+19%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution musculation",
			performanceRows: [
				{ label: "Volume soulevé", value: "124 000", unit: "kg", delta: "+31%", colorClass: "border-[#e9653f]" },
				{ label: "Développé haltères", value: "28", unit: "kg", delta: "+9 kg", colorClass: "border-blue-500" },
				{ label: "Goblet squat", value: "36", unit: "kg", delta: "+12 kg", colorClass: "border-green-600" }
			],
			zonesTotal: "46h10",
			zones: TRAINING_ZONES,
			records: [
				{ label: "Squat", value: "36 kg" },
				{ label: "Rowing", value: "30 kg" },
				{ label: "Planche", value: "70 s" }
			],
			streak: 18
		},
		"1A": {
			objectiveTitle: "Régularité",
			objectiveDetail: "182 séances enregistrées",
			progress: 86,
			rangeStart: "juin 2025",
			rangeEnd: "juin 2026",
			stats: [
				{ title: "Séances", value: "182", sub: "+38%", icon: "fas fa-dumbbell" },
				{ title: "Volume", value: "410k kg", sub: "+54%", icon: "fas fa-weight-hanging" },
				{ title: "Durée", value: "148h", sub: "+42%", icon: "far fa-clock" },
				{ title: "Calories", value: "68 400", sub: "+36%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution musculation",
			performanceRows: [
				{ label: "Volume soulevé", value: "410 000", unit: "kg", delta: "+54%", colorClass: "border-[#e9653f]" },
				{ label: "Développé haltères", value: "32", unit: "kg", delta: "+13 kg", colorClass: "border-blue-500" },
				{ label: "Goblet squat", value: "42", unit: "kg", delta: "+18 kg", colorClass: "border-green-600" }
			],
			zonesTotal: "148h",
			zones: TRAINING_ZONES,
			records: [
				{ label: "Squat", value: "42 kg" },
				{ label: "Rowing", value: "36 kg" },
				{ label: "Planche", value: "90 s" }
			],
			streak: 24
		}
	},
	run: {
		"7j": {
			objectiveTitle: "Endurance",
			objectiveDetail: "12,4 km courus cette semaine",
			progress: 24,
			rangeStart: "2 juin",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Courses", value: "2", sub: "+1 vs sem.", icon: "fas fa-person-running" },
				{ title: "Distance", value: "12,4 km", sub: "+8%", icon: "fas fa-route" },
				{ title: "Durée", value: "1h18", sub: "+5%", icon: "far fa-clock" },
				{ title: "Calories", value: "870", sub: "+7%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution course",
			performanceRows: [
				{ label: "Distance totale", value: "12,4", unit: "km", delta: "+8%", colorClass: "border-[#e9653f]" },
				{ label: "Allure moyenne", value: "5:48", unit: "/km", delta: "-0:12", colorClass: "border-blue-500" },
				{ label: "FC moyenne", value: "151", unit: "bpm", delta: "-3 bpm", colorClass: "border-green-600" }
			],
			zonesTotal: "1h18",
			zones: RUN_ZONES,
			records: [
				{ label: "5 km", value: "28:40" },
				{ label: "10 km", value: "59:10" },
				{ label: "Longue", value: "7,1 km" }
			],
			streak: 3
		},
		"30j": {
			objectiveTitle: "Endurance",
			objectiveDetail: "42,6 km sur 60 km visés",
			progress: 71,
			rangeStart: "15 mai",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Courses", value: "7", sub: "+16%", icon: "fas fa-person-running" },
				{ title: "Distance", value: "42,6 km", sub: "+15%", icon: "fas fa-route" },
				{ title: "Durée", value: "4h22", sub: "+11%", icon: "far fa-clock" },
				{ title: "Calories", value: "3 180", sub: "+13%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution course",
			performanceRows: [
				{ label: "Distance totale", value: "42,6", unit: "km", delta: "+15%", colorClass: "border-[#e9653f]" },
				{ label: "Allure moyenne", value: "5:42", unit: "/km", delta: "-0:18", colorClass: "border-blue-500" },
				{ label: "FC moyenne", value: "149", unit: "bpm", delta: "-5 bpm", colorClass: "border-green-600" }
			],
			zonesTotal: "4h22",
			zones: RUN_ZONES,
			records: [
				{ label: "5 km", value: "27:55" },
				{ label: "10 km", value: "58:20" },
				{ label: "Longue", value: "9,4 km" }
			],
			streak: 6
		},
		"3M": {
			objectiveTitle: "Endurance",
			objectiveDetail: "126 km depuis mars",
			progress: 64,
			rangeStart: "8 mars",
			rangeEnd: "8 juin",
			stats: [
				{ title: "Courses", value: "23", sub: "+27%", icon: "fas fa-person-running" },
				{ title: "Distance", value: "126 km", sub: "+34%", icon: "fas fa-route" },
				{ title: "Durée", value: "13h05", sub: "+28%", icon: "far fa-clock" },
				{ title: "Calories", value: "9 680", sub: "+25%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution course",
			performanceRows: [
				{ label: "Distance totale", value: "126", unit: "km", delta: "+34%", colorClass: "border-[#e9653f]" },
				{ label: "Allure moyenne", value: "5:31", unit: "/km", delta: "-0:36", colorClass: "border-blue-500" },
				{ label: "FC moyenne", value: "146", unit: "bpm", delta: "-8 bpm", colorClass: "border-green-600" }
			],
			zonesTotal: "13h05",
			zones: RUN_ZONES,
			records: [
				{ label: "5 km", value: "26:40" },
				{ label: "10 km", value: "56:30" },
				{ label: "Longue", value: "12,8 km" }
			],
			streak: 9
		},
		"1A": {
			objectiveTitle: "Endurance",
			objectiveDetail: "438 km enregistrés",
			progress: 82,
			rangeStart: "juin 2025",
			rangeEnd: "juin 2026",
			stats: [
				{ title: "Courses", value: "96", sub: "+44%", icon: "fas fa-person-running" },
				{ title: "Distance", value: "438 km", sub: "+61%", icon: "fas fa-route" },
				{ title: "Durée", value: "47h20", sub: "+53%", icon: "far fa-clock" },
				{ title: "Calories", value: "34 600", sub: "+49%", icon: "fas fa-fire" }
			],
			performanceTitle: "Évolution course",
			performanceRows: [
				{ label: "Distance totale", value: "438", unit: "km", delta: "+61%", colorClass: "border-[#e9653f]" },
				{ label: "Allure moyenne", value: "5:18", unit: "/km", delta: "-0:58", colorClass: "border-blue-500" },
				{ label: "FC moyenne", value: "143", unit: "bpm", delta: "-11 bpm", colorClass: "border-green-600" }
			],
			zonesTotal: "47h20",
			zones: RUN_ZONES,
			records: [
				{ label: "5 km", value: "25:50" },
				{ label: "10 km", value: "54:45" },
				{ label: "Longue", value: "16,2 km" }
			],
			streak: 15
		}
	}
};

export class Progress extends React.Component<Record<string, never>, IProgressState> {
	constructor(props: Record<string, never>) {
		super(props);

		this.state = {
			selectedTab: "training",
			selectedPeriod: "30j"
		};
	}

	renderStatCard(metric: IMetric) {
		return (
			<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
				<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
					<i className={`${metric.icon} mr-2`}></i>
					{metric.title}
				</p>
				<p className="font-serif text-3xl font-bold mt-2">{metric.value}</p>
				<p className="text-green-600 text-xs font-bold">{metric.sub}</p>
			</div>
		);
	}

	renderPeriodButton(label: ProgressPeriod) {
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

	renderTabButton(tab: ProgressTab, label: string) {
		const active = this.state.selectedTab === tab;

		return (
			<button
				onClick={() => this.setState({ selectedTab: tab })}
				className={`px-5 py-3 rounded-full text-sm font-bold ${
					active ? "bg-black text-white" : "bg-white border border-[#ded8cf]"
				}`}
			>
				{label}
			</button>
		);
	}

	render() {
		const data = PROGRESS_DATA[this.state.selectedTab][this.state.selectedPeriod];
		const circleOffset = 151 * (1 - data.progress / 100);

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
					{this.renderTabButton("training", "Entraînement")}
					{this.renderTabButton("run", "Course")}
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-5">
					<div className="flex justify-between gap-4">
						<div>
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								Objectif actuel
							</p>
							<h2 className="font-serif text-2xl font-bold">{data.objectiveTitle}</h2>
							<p className="text-sm text-[#8d8378]">{data.objectiveDetail}</p>
						</div>

						<div className="relative w-16 h-16 shrink-0">
							<svg width="64" height="64">
								<circle cx="32" cy="32" r="24" stroke="#ded8cf" strokeWidth="6" fill="none" />
								<circle
									cx="32"
									cy="32"
									r="24"
									stroke="#e9653f"
									strokeWidth="6"
									fill="none"
									strokeLinecap="round"
									strokeDasharray={151}
									strokeDashoffset={circleOffset}
									transform="rotate(-90 32 32)"
								/>
							</svg>
							<p className="absolute inset-0 flex items-center justify-center text-sm font-bold">
								{data.progress}%
							</p>
						</div>
					</div>

					<div className="mt-6 h-24 relative">
						<svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
							<path
								d="M0 20 C40 24, 62 32, 96 34 C134 36, 154 50, 190 46 C230 42, 248 60, 300 58"
								fill="none"
								stroke="#e9653f"
								strokeWidth="2"
							/>
							<path
								d="M0 20 C40 24, 62 32, 96 34 C134 36, 154 50, 190 46 C230 42, 248 60, 300 58 L300 80 L0 80 Z"
								fill="#e9653f"
								opacity="0.08"
							/>
						</svg>

						<div className="flex justify-between text-xs text-[#8d8378]">
							<p>{data.rangeStart}</p>
							<p>{data.rangeEnd}</p>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-2 gap-3 mt-4">
					{data.stats.map((metric) => (
						<React.Fragment key={metric.title}>{this.renderStatCard(metric)}</React.Fragment>
					))}
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-4">
					<div className="flex justify-between items-start gap-3">
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
							{data.performanceTitle}
						</p>

						<div className="flex gap-1 shrink-0">
							{PERIODS.map((period) => this.renderPeriodButton(period))}
						</div>
					</div>

					<div className="mt-5 space-y-4">
						{data.performanceRows.map((row, index) => (
							<div
								key={row.label}
								className={`flex justify-between items-center ${
									index < data.performanceRows.length - 1
										? "border-b border-[#ded8cf] pb-3"
										: ""
								}`}
							>
								<div>
									<p className="text-sm text-[#8d8378]">{row.label}</p>
									<p className="font-serif text-3xl font-bold">
										{row.value}{" "}
										<span className="font-sans text-sm text-[#8d8378]">{row.unit}</span>
										<span className="font-sans text-xs text-green-600 ml-2">{row.delta}</span>
									</p>
								</div>
								{this.renderMiniLine(row.colorClass)}
							</div>
						))}
					</div>
				</section>

				<section className="bg-white border border-[#ded8cf] rounded-3xl p-5 mt-4">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-4">
						Zones cardiaques
					</p>

					<div className="flex items-center gap-5">
						<div className="relative w-24 h-24 shrink-0">
							<svg width="96" height="96">
								<circle cx="48" cy="48" r="34" stroke="#60a5fa" strokeWidth="8" fill="none" />
								<circle cx="48" cy="48" r="34" stroke="#6ee7b7" strokeWidth="8" fill="none" strokeDasharray="40 220" />
								<circle cx="48" cy="48" r="34" stroke="#facc15" strokeWidth="8" fill="none" strokeDasharray="110 220" />
								<circle cx="48" cy="48" r="34" stroke="#fb923c" strokeWidth="8" fill="none" strokeDasharray="70 220" />
								<circle cx="48" cy="48" r="34" stroke="#be123c" strokeWidth="8" fill="none" strokeDasharray="25 220" />
							</svg>
							<p className="absolute inset-0 flex items-center justify-center font-serif font-bold">
								{data.zonesTotal}
							</p>
						</div>

						<div className="flex-1 space-y-1 text-xs">
							{data.zones.map((row) => (
								<div key={row.label} className="flex justify-between">
									<p>
										<span className={`inline-block w-2 h-2 ${row.colorClass} rounded-sm mr-2`}></span>
										{row.label} <span className="text-[#8d8378] ml-2">{row.range}</span>
									</p>
									<p className="font-bold">{row.share}</p>
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
							{data.records.map((record) => (
								<p key={record.label} className="flex justify-between">
									{record.label} <b>{record.value}</b>
								</p>
							))}
						</div>
					</div>

					<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
						<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
							Streak
						</p>
						<p className="font-serif text-4xl font-bold">
							{data.streak} <span className="font-sans text-sm text-[#8d8378]">jours</span>
						</p>
						<div className="flex gap-1 mt-3">
							{Array.from({ length: 7 }).map((_, index) => (
								<div
									key={index}
									className={`w-4 h-4 rounded ${
										index < Math.min(data.streak, 7) ? "bg-[#e9653f]" : "bg-[#ded8cf]"
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
