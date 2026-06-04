import React from "react";

interface IDataToggle {
	id: number;
	title: string;
	subtitle: string;
	enabled: boolean;
}

interface IDevice {
	id: number;
	name: string;
	connected: boolean;
}

interface IWatchSyncProps {}

interface IWatchSyncState {
	toggles: IDataToggle[];
	devices: IDevice[];
	isConnected: boolean;
}

export class WatchSync extends React.Component<
	IWatchSyncProps,
	IWatchSyncState
> {
	constructor(props: IWatchSyncProps) {
		super(props);

		this.state = {
			isConnected: true,

			toggles: [
				{
					id: 1,
					title: "Fréquence cardiaque",
					subtitle: "En temps réel",
					enabled: true
				},
				{
					id: 2,
					title: "Activité (pas, calories)",
					subtitle: "Quotidien",
					enabled: true
				},
				{
					id: 3,
					title: "Sommeil",
					subtitle: "Nuit",
					enabled: true
				},
				{
					id: 4,
					title: "Saturation O₂",
					subtitle: "Périodique",
					enabled: false
				},
				{
					id: 5,
					title: "Température",
					subtitle: "Périodique",
					enabled: false
				}
			],

			devices: [
				{
					id: 1,
					name: "Garmin Forerunner 265",
					connected: false
				},
				{
					id: 2,
					name: "Fitbit Charge 6",
					connected: false
				}
			]
		};
	}

	toggleData(id: number) {
		this.setState({
			toggles: this.state.toggles.map((toggle) =>
				toggle.id === id
					? {
							...toggle,
							enabled: !toggle.enabled
					  }
					: toggle
			)
		});
	}

	connectDevice(id: number) {
		this.setState({
			devices: this.state.devices.map((device) =>
				device.id === id
					? {
							...device,
							connected: true
					  }
					: device
			)
		});
	}

	renderToggle(toggle: IDataToggle, isLast?: boolean) {
		return (
			<div
				className={`flex items-center justify-between px-4 py-4 ${
					!isLast ? "border-b border-[#ded8cf]" : ""
				}`}
			>
				<div>
					<h3 className="font-bold text-[15px]">{toggle.title}</h3>

					<p className="text-xs text-[#8d8378] mt-1">
						{toggle.subtitle}
					</p>
				</div>

				<button
					onClick={() => this.toggleData(toggle.id)}
					className={`w-12 h-7 rounded-full relative transition ${
						toggle.enabled
							? "bg-[#e56a3f]"
							: "bg-[#ebe6de]"
					}`}
				>
					<div
						className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
							toggle.enabled ? "right-1" : "left-1"
						}`}
					></div>
				</button>
			</div>
		);
	}

	renderDevice(device: IDevice, isLast?: boolean) {
		return (
			<div
				className={`flex justify-between items-center px-4 py-4 ${
					!isLast ? "border-b border-[#ded8cf]" : ""
				}`}
			>
				<div>
					<h3 className="font-bold text-[15px]">
						{device.name}
					</h3>

					<p className="text-xs text-[#8d8378] mt-1">
						{device.connected
							? "Connectée"
							: "Non connectée"}
					</p>
				</div>

				<button
					onClick={() => this.connectDevice(device.id)}
					className={`px-4 h-9 rounded-full border text-sm font-bold ${
						device.connected
							? "bg-[#11100d] text-white border-[#11100d]"
							: "bg-white border-[#ded8cf]"
					}`}
				>
					{device.connected ? "Connectée" : "Connecter"}
				</button>
			</div>
		);
	}

	render() {
		return (
			<main className="min-h-screen bg-[#f7f4ee] px-5 pt-6 pb-28">
				<header className="flex items-center justify-between">
					<button
						onClick={() => window.history.back()}
						className="w-10 h-10 rounded-full border border-[#ded8cf] bg-[#f7f4ee]"
					>
						‹
					</button>

					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
						Synchronisation
					</p>

					<div className="w-10"></div>
				</header>

				<section className="bg-[#11100d] rounded-3xl p-5 text-white mt-5 overflow-hidden relative">
					<div className="absolute inset-0 bg-gradient-to-r from-[#0b1d26] via-[#11100d] to-[#5c1d00] opacity-90"></div>

					<div className="relative z-10">
						<p className="uppercase text-xs tracking-widest text-[#d4b7a6] font-bold">
							Montre connectée
						</p>

						<h1 className="font-serif text-4xl font-bold mt-2">
							Apple Watch S9
						</h1>

						<div className="flex items-center gap-2 mt-4">
							<div className="w-2 h-2 rounded-full bg-green-500"></div>

							<p className="text-sm text-[#f2e6de]">
								Connectée · dernière sync il y a 4 min
							</p>
						</div>

						<button className="w-full bg-[#e56a3f] rounded-full py-4 font-bold mt-5">
							<i className="fas fa-sync-alt mr-2"></i>
							Synchroniser maintenant
						</button>
					</div>
				</section>

				<section className="mt-6">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
						Données récentes
					</p>

					<div className="grid grid-cols-2 gap-3">
						<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								FC repos
							</p>

							<p className="font-serif text-4xl font-bold mt-2">
								65
								<span className="text-base text-[#8d8378] ml-1">
									bpm
								</span>
							</p>
						</div>

						<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								FC max
							</p>

							<p className="font-serif text-4xl font-bold mt-2">
								190
								<span className="text-base text-[#8d8378] ml-1">
									bpm
								</span>
							</p>
						</div>

						<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								Pas
							</p>

							<p className="font-serif text-4xl font-bold mt-2">
								8 240
							</p>
						</div>

						<div className="bg-white border border-[#ded8cf] rounded-2xl p-4">
							<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold">
								Sommeil
							</p>

							<p className="font-serif text-4xl font-bold mt-2">
								7h15
							</p>
						</div>
					</div>
				</section>

				<section className="mt-6">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
						Données à synchroniser
					</p>

					<div className="bg-white border border-[#ded8cf] rounded-2xl overflow-hidden">
						{this.state.toggles.map((toggle, index) =>
							this.renderToggle(
								toggle,
								index === this.state.toggles.length - 1
							)
						)}
					</div>
				</section>

				<section className="mt-6">
					<p className="uppercase text-xs tracking-widest text-[#8d8378] font-bold mb-3">
						Autres appareils
					</p>

					<div className="bg-white border border-[#ded8cf] rounded-2xl overflow-hidden">
						{this.state.devices.map((device, index) =>
							this.renderDevice(
								device,
								index === this.state.devices.length - 1
							)
						)}
					</div>
				</section>
			</main>
		);
	}
}