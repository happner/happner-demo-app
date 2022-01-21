module.exports = class MessageBuilder {
	#messageText;
	#userName;

	constructor() {}

	withMessageText(messageText) {
		this.#messageText = messageText;
		return this;
	}

	withUsername(userName) {
		this.#userName = userName;
		return this;
	}

	build() {
		let result = {
			user: this.#userName,
			msg: this.#messageText,
			createdAt: Date.now(),
		};

		this.#reset();

		return result;
	}

	#reset() {
		this.#messageText = undefined;
		this.#userName = undefined;
	}
};
