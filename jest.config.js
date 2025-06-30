module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/packages/core/src/services/__tests__/**/*.test.ts'
  ],
  roots: ['<rootDir>/packages/core/src/services/__tests__'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
