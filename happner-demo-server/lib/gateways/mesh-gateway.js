const ServiceTypes = require("../constants/service-type");

/***
 * This class is used as a gateway/abstraction to the Happner mesh. The intention is to shield
 * developers from having to understand how the mesh works
 * @type {MeshGateway}
 */

module.exports = class MeshGateway {
  #meshApi;
  #clientFactory;
  #logger;

  constructor(logger, meshApi, clientFactory) {
    this.#logger = logger;
    this.#meshApi = meshApi; // the local mesh ($happn)
    this.#clientFactory = clientFactory;
  }

  //events across the mesh:
  emitToEventBus(source, path, data) {
    return this.callLocalExchangeMethod(
      "eventBus",
      "emitMeshEvent",
      `${source}/${path}`,
      data
    );
  }

  async subscribeToEventBus(source, path, eventHandler) {
    return this.subscribeToMeshEvent(
      "eventBus",
      `${source}/${path}`,
      eventHandler
    );
  }

  async unsubscribeFromEventBus(subscriptionId) {
    return this.unsubscribeFromMeshEvent("eventBus", subscriptionId);
  }

  async subscribeToMeshEvent(componentName, path, eventHandler) {
    return this.#meshApi.event[componentName].on(path, eventHandler);
  }

  async unsubscribeFromMeshEvent(componentName, subscriptionId) {
    return this.#meshApi.event[componentName].off(subscriptionId);
  }

  #getExternalMeshService(meshClient, componentName, serviceType) {
    if (serviceType === ServiceTypes.EVENT)
      return meshClient.event[componentName];
    return meshClient.exchange[componentName];
  }

  // mesh calls to components and methods
  async callExchangeMethod(mesh, component, method, ...args) {
    return this.#meshApi.exchange.$call({
      mesh,
      component,
      method,
      arguments: args,
    });
  }

  async tryCallRemoteExchange(
    host,
    port,
    username,
    password,
    mesh,
    component,
    method,
    ...args
  ) {
    let client;
    try {
      client = this.#clientFactory.createMeshClient(
        username != null,
        host,
        port
      );
      await client.login({ username, password });
      return await client.exchange.$call({
        mesh,
        component,
        method,
        arguments: args,
      });
    } catch (error) {
      this.#logger.error(`failed calling remote exchange`, error);
      throw error;
    } finally {
      if (client != null) {
        await client.disconnect();
      }
    }
  }

  callLocalExchangeMethod(componentName, methodName, ...args) {
    return this.#meshApi.exchange.$call({
      component: componentName,
      method: methodName,
      arguments: args,
    });
  }

  // mesh data layer
  async setMeshData(path, data, parameters) {
    return this.#meshApi.exchange.data.set(path, data, parameters);
  }

  async getMeshData(path, parameters) {
    return await this.#meshApi.exchange.data.get(path, parameters);
  }

  async deleteMeshData(path, parameters) {
    return this.#meshApi.exchange.data.remove(path, parameters);
  }
};
