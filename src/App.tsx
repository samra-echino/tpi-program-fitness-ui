import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

import { Accueil } from "./Accueil";
import { StartQuestion } from "./StartQuestion";
import { Planning } from "./Planning";
import { Seance } from "./Seance";
import { Profil } from "./Profil";
import { Progress } from "./Progress";

import { ChatCoach } from "./ChatCoach";
import { Feedback } from "./Feedback";
import { Historique } from "./Historique";
import { WatchSync } from "./WatchSync";
import { RecapSeance } from "./RecapSeance";
import { RecapCourse } from "./RecapCourse";

interface IAppProps {}
interface IAppState {}

interface IAppLayoutProps {
	locationPath: string;
	navigate: NavigateFunction;
}

class AppLayout extends React.Component<IAppLayoutProps, IAppState> {
	NavItem(to: string, icon: string, label: string, end: boolean = false) {
		return (
			<NavLink
				to={to}
				end={end}
				className={({ isActive }) =>
					`flex items-center justify-center h-11 rounded-full ${
						isActive
							? "bg-[#e9653f] text-white px-4"
							: "text-black"
					}`
				}
			>
				<i className={`${icon} text-base`}></i>
				<span className="hidden nav-label text-sm font-bold ml-2">
					{label}
				</span>
			</NavLink>
		);
	}

	renderNav(locationPath: string) {
		const hiddenRoutes = [
			"/start",
			"/seance",
			"/feedback",
			"/chat",
			"/watch-sync",
			"/recap-seance",
			"/recap-course"
		];

		if (hiddenRoutes.includes(locationPath)) {
			return null;
		}

		return (
			<nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[310px] h-14 bg-white border border-[#ded8cf] rounded-full shadow-lg grid grid-cols-5 items-center px-2 z-20">
				{this.NavItem("/", "fas fa-home", "Home", true)}
				{this.NavItem("/planning", "far fa-calendar", "Plan")}
				{this.NavItem("/seance", "fas fa-dumbbell", "Workout")}
				{this.NavItem("/progress", "fas fa-chart-bar", "Progress")}
				{this.NavItem("/profil", "far fa-user", "Profile")}
			</nav>
		);
	}

	render() {
		const firstConnexionDone =
			localStorage.getItem("firstConnexionDone") === "true";

		const locationPath = this.props.locationPath;

		return (
			<div className="relative w-full max-w-[390px] min-h-screen bg-[#f7f4ee] border-x border-[#d8d0c5] overflow-y-auto pb-28">
				<Routes>
					<Route
						path="/"
						element={
							firstConnexionDone ? (
								<Accueil />
							) : (
								<Navigate to="/start" replace />
							)
						}
					/>

					<Route
						path="/start"
						element={
							firstConnexionDone ? (
								<Navigate to="/" replace />
							) : (
								<StartQuestion navigate={this.props.navigate} />
							)
						}
					/>

					<Route path="/planning" element={<Planning />} />
					<Route path="/seance" element={<Seance navigate={this.props.navigate} />} />
					<Route path="/feedback" element={<Feedback navigate={this.props.navigate} />} />
					<Route path="/progress" element={<Progress />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/chat" element={<ChatCoach />} />
					<Route path="/historique" element={<Historique />} />
					<Route path="/watch-sync" element={<WatchSync />} />
					<Route path="/recap-seance" element={<RecapSeance navigate={this.props.navigate} />} />
					<Route path="/recap-course" element={<RecapCourse navigate={this.props.navigate} />} />
				</Routes>

				{this.renderNav(locationPath)}
			</div>
		);
	}
}

function AppRouter() {
	const location = useLocation();
	const navigate = useNavigate();

	return <AppLayout locationPath={location.pathname} navigate={navigate} />;
}

export class App extends React.Component<IAppProps, IAppState> {
	render() {
		return (
			<div className="min-h-screen bg-[#f3f0ea] flex justify-center">
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</div>
		);
	}
}
