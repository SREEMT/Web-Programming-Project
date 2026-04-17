module.exports = {
  testEnvironment: "node",
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: ["dao/watchlist.dao.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};
