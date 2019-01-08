module.exports = {
    root: true,
    "parser": 'plugin:vue/recommended',

    "parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"globalReturn": false,
			"impliedStrict": false,
			"jsx": false
		}
	},

    env: {
		browser: true
	},

    plugins: [
		'html'
	],

    rules: {
		'generator-star-spacing': 'off',
		'no-debugger': 'off'
	},

    'extends': 'plugin:vue/recommended',
    parser: 'vue-eslint-parser',

    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2018,
      ecmaFeatures: {
        globalReturn: false,
        impliedStrict: false,
        jsx: false
      }
    }
}
