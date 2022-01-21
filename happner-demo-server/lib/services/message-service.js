const EventSources = require("../constants/event-sources");

module.exports = class MessageService {
	#meshGateway;
	#messageBuilder;
	#messageRepository;

	constructor(meshGateway, messageBuilder, messageRepository) {
		this.#meshGateway = meshGateway;
		this.#messageBuilder = messageBuilder;
		this.#messageRepository = messageRepository;
	}

	async sendMessage(userName, message) {
		let msgObj = this.#messageBuilder.withMessageText(message).withUsername(userName).build();
		let path = `users/${userName}/messages/${msgObj.createdAt}`;

		await this.#messageRepository.set(msgObj);
		await this.#meshGateway.emitToEventBus(EventSources.MESSAGE_EVENT, path, msgObj);
	}
};
