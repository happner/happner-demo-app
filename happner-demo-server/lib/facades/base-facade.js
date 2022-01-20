module.exports = class BaseFacade {
    #meshGateway;
    #logger;
    #eventSource;

    constructor(eventSource) {
        this.#eventSource = eventSource;
    }

    async initialise(config, dependencies, $happn) {
        const {meshGateway, logger} = dependencies;
        this.#meshGateway = meshGateway;
        this.#logger = logger;
        await this.#meshGateway.subscribeToEventBus(
            "*",
            "*",
            this.createEventBusEventHandler(config, $happn).bind(this),
        );
        this.#logger.info(`${this.#eventSource} facade listening on meshName: ${config.name}`);
    }

    createEventBusEventHandler(config, happnerComponent) {
        return async (data, meta) => {
            try {
                this.#logger.trace(`${this.#eventSource} facade caught happner event: ${meta.path}`);
                const path = this.getForwardingPath(config.name, meta.path);
                if (path == null) return;
                this.#logger.trace(`${this.#eventSource} facade forwarding happner event: ${path}`);
                await happnerComponent.emit(path, data);
            } catch (error) {
                this.#logger.error(
                    `${this.#eventSource} facade error forwarding mesh event with path: [${meta.path}], error: ${
                        error.message
                    }`,
                );
            }
        };
    }

    getForwardingPath(meshName, eventBusPath) {
        if (eventBusPath.indexOf(`/_events/${meshName}/eventBus/${this.#eventSource}`) === 0) {
            return eventBusPath.split("/").slice(5).join("/");
        }
        return null;
    }
};