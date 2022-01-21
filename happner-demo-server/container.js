const MeshGateway = require("./lib/gateways/mesh-gateway");
const ClientFactory = require("./lib/factories/client-factory");
const MessageBuilder = require("./lib/builders/message-builder");
const MessageService = require("./lib/services/message-service");
const MessageRepository = require("./lib/repositories/message-repository");

module.exports = class Container {
	#meshApi;
	#dependencies;

	constructor(meshApi) {
		this.#meshApi = meshApi;
		this.#dependencies = {};
	}

	registerDependencies() {
		const { log } = this.#meshApi;

		let clientFactory = new ClientFactory();
		let meshGateway = new MeshGateway(log, this.#meshApi, clientFactory);
		let messageBuilder = new MessageBuilder();
		let messageRepository = new MessageRepository(log, meshGateway);
		let messageService = new MessageService(meshGateway, messageBuilder, messageRepository);

		this.#dependencies["logger"] = log;
		this.#dependencies["meshGateway"] = meshGateway;
		this.#dependencies["messageService"] = messageService;

		return this.#dependencies;
	}
};
