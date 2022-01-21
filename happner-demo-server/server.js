const Mesh = require("happner-2");

const config = require("./config.js");
const Container = require("./container");
const App = require("./app");
const system = {};

const server = async () => {
	await start();
};

async function onExit(reason) {
	if (!system.appStarted) {
		console.warn(`stopping system before the application had finished starting`);
		return process.exit(reason);
	}
}

const start = async () => {
	process.on("exit", onExit);

	system.mesh = new Mesh();
	system.container = new Container(system.mesh);
	system.app = new App();

	try {
		await system.mesh.initialize(config);

		//start the mesh
		await system.mesh.start();

		// set up dependencies - assign to global variable to remain in scope for application lifetime
		system.deps = system.container.registerDependencies();

		// start the main app
		await system.app.start(system.deps);
		system.appStarted = true;

		// initialise facades
		await system.mesh.exchange.clientFacade.initialise(system.deps);
	} catch (err) {
		console.error(err.stack || err.toString());
		process.exit(1);
	}
};

server();
