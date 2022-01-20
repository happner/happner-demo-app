module.exports = class App {
	#dependencies;

	async start(dependencies) {
		this.#dependencies = dependencies;
		await this.startServices();
	}

	async stop() {
		await this.stopServices();
	}

	async startServices() {
		// await this.#dependencies.myService.start();
		return true;
	}

	async stopServices(exitReason) {
		try {
			// await this.#dependencies.myService.stop();
		} catch (e) {
			console.error(`failed stopping services: ${e.message}`);
		} finally {
			process.exit(exitReason);
		}
	}
};
