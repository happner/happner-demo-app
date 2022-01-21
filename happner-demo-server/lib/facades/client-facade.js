module.exports = class ClientFacade {
	#dependencies;

	constructor() {}

	async initialise(dependencies) {
		this.#dependencies = dependencies;
	}

	/* Methods exposed to the outside world... */
	async sendMessage(user, msg) {
		await this.#dependencies.messageService.sendMessage(user, msg);
	}
};
