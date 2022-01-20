module.exports = {
	env: {
		es2021: true,
		node: true,
		browser: true,
		mocha: true,
	},
	extends: ["eslint:recommended", "prettier"],
	plugins: ["prettier"],
	ignorePatterns: ["docs", "node_modules/"],
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		"prettier/prettier": ["error"],
		"no-console": 0,
	},
};
