import { logger } from "../helper/logger";
import {
  describe,
  test,
  jest,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";

describe("logger utility", () => {
  let errorSpy;
  let warnSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("logs error message", () => {
    logger("error", "Something went wrong", { id: 1 });

    expect(errorSpy).toHaveBeenCalledWith("Something went wrong", { id: 1 });
  });

  test("logs warning message", () => {
    logger("warn", "This is warning", { name: "test" });

    expect(warnSpy).toHaveBeenCalledWith("This is warning", { name: "test" });
  });

  test("does not log for unknown type", () => {
    logger("info", "Info message");

    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("logs without data", () => {
    logger("error", "Only message");

    expect(errorSpy).toHaveBeenCalledWith("Only message", undefined);
  });

  test("matches snapshot", () => {
    logger("error", "Snapshot Error", {
      test: true,
    });

    expect(errorSpy.mock.calls).toMatchSnapshot();
  });
});
