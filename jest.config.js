module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/config/',
      '/src/index.ts'
    ],
    setupFiles: ['dotenv/config'],
  };
  