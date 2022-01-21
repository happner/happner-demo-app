module.exports = class MessageService {
	#meshGateway;
	#messageRepository;

	constructor(meshGateway, messageRepository) {
		this.#meshGateway = meshGateway;
		this.#messageRepository = messageRepository;
	}

	async sendMessage(user, msg) {
		let msgObj = { user: user, msg: msg, createdAt: Date.now() };
		let path = `users/${user}/messages/${msgObj.timeStamp}`;

		await this.#messageRepository.set(msgObj);

		console.log(`Emitting message: ${JSON.stringify(msgObj)}; path: ${path}`);
		await this.#meshGateway.emitToEventBus("MESSAGE_EVENT", path, msgObj);
	}
};
