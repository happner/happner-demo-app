module.exports = class BaseRepository {
	#schemaName;
	#log;
	#meshGateway;

	constructor(log, meshGateway, schemaName) {
		this.#schemaName = schemaName;
		this.#log = log;
		this.#log.info(`Repository ${this.#schemaName} created.`);
		this.#meshGateway = meshGateway;
	}

	async setInternal(obj, ...segments) {
		let path = `persist/${this.#schemaName}/${segments.join("/")}`;
		try {
			return await this.#meshGateway.setMeshData(path, obj);
		} catch (e) {
			this.throwError(e, "set", path);
		}
	}

	getHappnerParameters(parameters = {}) {
		let happnerParameters = {};
		if (parameters.criteria) {
			happnerParameters.criteria = parameters.criteria;
		}
		if (parameters.options) {
			happnerParameters.options = parameters.options;
		} else {
			happnerParameters.options = {};
		}
		if (parameters.sort) {
			happnerParameters.options.sort = parameters.sort;
		} else {
			happnerParameters.options.sort = {
				"_meta.created": 1,
			};
		}
		if (parameters.limit) {
			happnerParameters.options.limit = parameters.limit;
		}
		if (parameters.skip) {
			happnerParameters.options.skip = parameters.skip;
		}
		if (parameters.fields) {
			happnerParameters.options.fields = parameters.fields;
		}
		return happnerParameters;
	}

	async getInternal(parameters = {}, ...segments) {
		let path = `persist/${this.#schemaName}/${segments.join("/")}`;
		try {
			return await this.#meshGateway.getMeshData(path, this.getHappnerParameters(parameters));
		} catch (e) {
			this.throwError(e, "get", path);
		}
	}

	async deleteInternal(...segments) {
		let path = `persist/${this.#schemaName}/${segments.join("/")}`;
		try {
			return await this.#meshGateway.deleteMeshData(path);
		} catch (e) {
			this.throwError(e, "delete", path);
		}
	}

	async getBetween(path, from, to, parameters = {}) {
		if (from || to) {
			parameters.criteria = { createdAt: {} };
			if (from) {
				parameters.criteria.createdAt.$gte = from;
			}
			if (to) {
				parameters.criteria.createdAt.$lte = to;
			}
		}
		return this.getInternal(parameters, path);
	}

	async getAll(path, sort, limit, skip, fields, criteria) {
		path = path || "*";
		return this.getInternal(
			{
				criteria,
				sort,
				limit,
				skip,
				fields,
			},
			path,
		);
	}

	async deleteAll() {
		return this.deleteInternal("*");
	}

	throwError(e, action, path) {
		this.logError(e, action, path);
		throw e;
	}

	logError(e, action, path) {
		this.#log.error(
			[action, path, this.#schemaName, e.message].filter((item) => item != null).join(":"),
		);
	}

	logInfo(msg) {
		this.#log.info(msg);
	}

	stripMetaFromResponse(response) {
		if (response !== null) delete response._meta;
		return response;
	}
};
