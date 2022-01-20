/* eslint-disable no-unused-vars */
const config = require("./config");
const MeshGateway = require("./lib/gateways/mesh-gateway");
const ClientFactory = require("./lib/factories/client-factory");

module.exports = class Container {
	#meshApi;
	#dependencies;

	constructor(meshApi) {
		this.#meshApi = meshApi;
		this.#dependencies = {};
	}

	registerDependencies() {
		const { log } = this.#meshApi;

		// let clientFactory = new ClientFactory();
		// let meshGateway = new MeshGateway(log, this.#meshApi, clientFactory);

		// this.#dependencies["logger"] = log;
		// this.#dependencies["meshGateway"] = meshGateway;

		return this.#dependencies;
	}
};
