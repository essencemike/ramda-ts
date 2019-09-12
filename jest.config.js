module.exports = {
  // 是否让Jest在第一次失败之后停止运行测试
  bail: false,

  // 在每一个测试之前自动清除mock以及实例
  clearMocks: true,

  // 在执行测试时是否应收集覆盖率信息
  collectCoverage: false,

  // 覆盖率的输出目录
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/@ramda/$1'
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>"
  ],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  timers: "fake",

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/"
  ],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // 是否应在运行期间报告每个单独的测试
  verbose: false,
};
