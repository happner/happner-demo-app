/* eslint-disable no-unused-vars */
// const BaseFacade = require("./base-facade");

module.exports = class ClientFacade {
	//extends BaseFacade {

	constructor() {
		// super();
	}

	static create() {
		return new ClientFacade();
	}

	async initialise(dependencies) {
		this.dependencies = dependencies;
	}

	/* Methods exposed to the outside world... */
	async sendMessage(user, msg) {
		console.log(`Message ${msg} received for ${user}!`);
	}
};
