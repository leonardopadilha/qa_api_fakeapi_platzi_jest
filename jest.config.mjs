/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  reporters: [
    "default",
    [
      "jest-stare",
      {
        "resultDir": "results/jest-stare",
        "reportTitle": "jest-stare!",
        "additionalResultsProcessors": [
          "jest-junit"
        ],
        "coverageLink": "../../coverage/lcov-report/index.html",
        "jestStareConfigJson": "jest-stare.json",
        "jestGlobalConfigJson": "globalStuff.json"
      }
    ]
  ]
};

export default config;
