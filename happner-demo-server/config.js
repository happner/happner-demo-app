const MessageDb = process.env.MESSAGES_DB || `${__dirname}/db/messages.db`;

module.exports = {
	name: "DEMO-SERVER",
	authorityDelegationOn: true,
	happn: {
		//host: "0.0.0.0",
		port: 55000,
		setOptions: {
			timeout: 30000,
		},
		compactInterval: 180000,
		secure: true,
		adminPassword: "happn",
		services: {
			security: {
				config: {
					pbkdf2Iterations: 1000,
				},
			},
			data: {
				config: {
					datastores: [
						{
							name: "messages",
							settings: {
								filename: MessageDb,
							},
							patterns: ["/_data/data/persist/messages/*"],
						},
					],
				},
			},
		},
		endpoints: {},
		modules: {
			clientFacade: {
				path: `${__dirname}/lib/facades/client-facade.js`,
			},
		},
		components: {
			clientFacade: {},
			data: {},
		},
	},
};
