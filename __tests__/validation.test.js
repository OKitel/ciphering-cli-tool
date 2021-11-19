import {
  checkConfigOption,
  checkDuplicatedFunctions,
  checkInputOutputValue,
} from "../src/validation";

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
      expect(() =>
        checkConfigOption(["node", "pathToFile", "--config"])
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

  test("should not throw errors if everything is ok", () => {
    expect(() => {
      checkDuplicatedFunctions([
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
      ]);
    }).not.toThrowError();
  });
});

describe("check for input and output values", () => {
  test("should not throw error if input and output values are correct", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/output.txt",
      ])
    ).not.toThrowError();
  });
  test("should not throw error if output option is undefined", () => {
    expect(() =>
      checkInputOutputValue("-i", undefined, [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
      ])
    ).not.toThrowError();
  });
  test("should not throw error if input option is undefined", () => {
    expect(() =>
      checkInputOutputValue(undefined, "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-o",
        "./src/output.txt",
      ])
    ).not.toThrowError();
  });
  test("should throw error if input file doesn't exist", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "-o",
        "./src/output.txt",
      ])
    ).toThrowError();
  });
  test("should throw error if output file doesn't exist", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/1.txt",
      ])
    ).toThrowError();
  });
  test("should throw error if input value is undefined", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-o",
        "./src/output.txt",
        "-i",
      ])
    ).toThrowError();
  });

  test("should throw error if output value is undefined", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
      ])
    ).toThrowError();
  });

  test("should throw error if output file and input file are the same", () => {
    expect(() =>
      checkInputOutputValue("-i", "-o", [
        "node",
        "pathToFile",
        "-c",
        "C1-R1-A",
        "-i",
        "./src/input.txt",
        "-o",
        "./src/input.txt",
      ])
    ).toThrowError();
  });
});
