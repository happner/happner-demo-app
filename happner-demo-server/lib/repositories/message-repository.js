const BaseRepository = require("./base-repository");

module.exports = class MessageRepository extends BaseRepository {
	constructor(log, meshGateway) {
		super(log, meshGateway, "message");
	}

	async set(message) {
		return this.setInternal(message, message.createdAt);
	}

	async get(path, from, to, sort = { createdAt: 1 }, limit, skip, fields, criteria) {
		return this.getBetween(path, from, to, {
			fields,
			sort,
			skip,
			limit,
			criteria,
		});
	}
};
