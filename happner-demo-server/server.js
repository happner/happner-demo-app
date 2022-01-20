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
    console.warn(
      `stopping system before the application had finished starting`
    );
    return process.exit(reason);
  }
}

const start = async () => {
  process.on("exit", onExit);

  system.mesh = new Mesh();
  system.container = new Container(system.mesh);
  system.app = new App();

  return system.mesh.initialize(config, async (err) => {
    if (err) {
      console.error(err.stack || err.toString());
      process.exit(1);
    }

    // set up dependencies - assign to global variable to remain in scope for application lifetime
    system.deps = system.container.registerDependencies();

    try {
      //start the mesh
      await system.mesh.start();

      // start the main app
      await system.app.start(system.deps);
      system.appStarted = true;

      // initialise the client facade
      await system.mesh.exchange.clientFacade.initialise(system.deps);
    } catch (err) {
      console.error(err.stack || err.toString());
      process.exit(2);
    }
  });
};

server();
