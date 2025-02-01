const userscripts = require('eslint-plugin-userscripts');

module.exports = [
  // other configs
  {
    files: ['**/*.user.js'],
    plugins: {
      userscripts: {
        rules: userscripts.rules
      }
    },
    rules: {
      ...userscripts.configs.recommended.rules
    }
  }
]