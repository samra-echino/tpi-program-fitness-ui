import React from "react";

interface IMessage {
	id: number;
	text: string;
	from: "user" | "coach";
}

interface IChatState {
	messages: IMessage[];
	input: string;
}

export class ChatCoach extends React.Component<{}, IChatState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			input: "",
			messages: [
				{ id: 1, text: "Salut Sara 💪 prêt pour ta séance ?", from: "coach" },
				{ id: 2, text: "Oui let's go 🔥", from: "user" }
			]
		};
	}

	sendMessage() {
		if (!this.state.input.trim()) return;

		const newMessage: IMessage = {
			id: Date.now(),
			text: this.state.input,
			from: "user"
		};

		this.setState({
			messages: [...this.state.messages, newMessage],
			input: ""
		});

		// fake réponse coach
		setTimeout(() => {
			this.setState({
				messages: [
					...this.state.messages,
					newMessage,
					{
						id: Date.now() + 1,
						text: "Parfait 🔥 donne tout !",
						from: "coach"
					}
				]
			});
		}, 800);
	}

	render() {
		return (
			<div className="min-h-screen flex flex-col bg-[#f7f4ee]">
				{/* HEADER */}
				<div className="px-5 pt-6 pb-3 border-b border-[#ded8cf] bg-white">
					<h1 className="font-serif text-xl font-bold">Coach</h1>
				</div>

				{/* MESSAGES */}
				<div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
					{this.state.messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex ${
								msg.from === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`px-4 py-2 rounded-2xl max-w-[70%] ${
									msg.from === "user"
										? "bg-[#e9653f] text-white"
										: "bg-white border border-[#ded8cf]"
								}`}
							>
								{msg.text}
							</div>
						</div>
					))}
				</div>

				{/* INPUT */}
				<div className="p-4 border-t border-[#ded8cf] bg-white flex gap-2">
					<input
						value={this.state.input}
						onChange={(e) => this.setState({ input: e.target.value })}
						placeholder="Écrire un message..."
						className="flex-1 border border-[#ded8cf] rounded-full px-4 py-2 outline-none"
					/>

					<button
						onClick={() => this.sendMessage()}
						className="bg-[#e9653f] text-white px-4 rounded-full font-bold"
					>
						➤
					</button>
				</div>
			</div>
		);
	}
}