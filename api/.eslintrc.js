module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2017,
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		"eslint:recommended"
	],
	plugins: [],
	// add your custom rules here
	rules: {
		"no-console": "off"
	},
	ignorePatterns: ["/node_modules/", "/dist/"],
}
