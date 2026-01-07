import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.test",
});

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
