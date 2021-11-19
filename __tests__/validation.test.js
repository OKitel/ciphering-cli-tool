import { checkConfigOption, checkDuplicatedFunctions } from "../src/validation";

describe("check config options", () => {
  {
    test("should not throw error if config option exist and it is valid", () => {
      expect(() =>
        checkConfigOption(["node", "pathToFile", "-c", "C1-C1-R1-A"])
      ).not.toThrowError();
    });

    test("should throw error if config is undefined", () => {
      expect(() =>
        checkConfigOption(["node", "pathToFile", "-c"])
      ).toThrowError();
    });

    test("should throw error if cipher config incorrect", () => {
      expect(() =>
        checkConfigOption(["node", "pathToFile", "-c", "C1-R1-A1"])
      ).toThrowError();
    });

    test("should throw error without config option", () => {
      expect(() => checkConfigOption(["node", "pathToFile"])).toThrowError();
    });
  }
});

describe("check duplicated options", () => {
  test("should throw error if options are duplicated", () => {
    expect(() =>
      checkDuplicatedFunctions([
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
        "--input",
        "./src/input1.txt",
      ])
    ).toThrowError();
    expect(() =>
      checkDuplicatedFunctions([
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
        "--output",
        "./src/output1.txt",
      ])
    ).toThrowError();
    expect(() =>
      checkDuplicatedFunctions([
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
        "--config",
        "A-R0",
      ])
    ).toThrowError();
    expect(() =>
      checkDuplicatedFunctions([
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
        "-c",
        "A-R0",
      ])
    ).toThrowError();
  });
});
