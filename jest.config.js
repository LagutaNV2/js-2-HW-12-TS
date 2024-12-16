module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/ts/domain/**/*.{ts,tsx}",
    "src/ts/service/**/*.{ts,tsx}",
    "!src/ts/tests/**",
    // "src/ts/__tests__/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json"],
  testEnvironment: 'node',
};
