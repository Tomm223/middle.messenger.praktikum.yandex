const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.paths')

const config = {
  coverageDirectory: 'coverage/jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  rootDir: '.',
  detectOpenHandles: true,
  errorOnDeprecated: false,
  transform: {
    '^.+\\.test.(ts|js)x?$': [
      'ts-jest',
      {
        rootDir: '.',
        isolatedModules: false,
        moduleNameMapper: {
          '~/(.*)': '<rootDir>/src/$1',
        },
      },
    ],
  },
}

module.exports = config
