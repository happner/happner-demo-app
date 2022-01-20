const Mesh = require("happner-2");

module.exports = class ClientFactory {
    constructor() {}

    /***
     *
     * @returns {MeshClient|Promise<unknown>}
     */
    createMeshClient(isSecure, ipAddress, port) {
        return new Mesh.MeshClient({
            secure: isSecure,
            host: ipAddress,
            port: port,
        });
    }
};