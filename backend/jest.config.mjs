import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.test",
});

// export default {
//   preset: "ts-jest/presets/default-esm",
//   testEnvironment: "node",
//   setupFilesAfterEnv: ["<rootDir>/tests/setup.mts"],
//   testMatch: ["**/tests/**/*.test.ts"],
//   globals: {
//     "ts-jest": {
//       useESM: true,
//       tsconfig: "tsconfig.json",
//     },
//   },
//   // ensure ts-jest transforms .ts files as ESM
//   transform: {
//     "^.+\\.ts$": ["ts-jest", { useESM: true }],
//   },
//   extensionsToTreatAsEsm: [".ts", ".mts"],

//   transformIgnorePatterns: [
//     "/node_modules/(?!@prisma/.*)",
//     "<rootDir>/generated/prisma/",
//   ],
// };

export default {
  // preset: "ts-jest",
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  // globalSetup: "./tests/setup.ts",
  globalSetup: "<rootDir>/tests/setup.ts",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".mts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
