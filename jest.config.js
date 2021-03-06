const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  setupFiles: ['<rootDir>/test.env.setup'],
  setupTestFrameworkScriptFile: '<rootDir>/td.setup',
  coverageDirectory: '<rootDir>/.test/unit/coverage',
  collectCoverageFrom: ['**/*.js']
}
