import * as mockUtils from "../src/utils.js";
import * as mockValidation from "../src/validation.js";
import * as mockAddTransformStreams from "../src/streams.js";
import * as mockStream from "stream";
import { mainFunc } from "../src/main.js";

const mockReadableStream = jest.fn();
const mockWriteableStream = jest.fn();

jest.mock("../src/utils.js", () => ({
  checkOptions: jest.fn(() => {
    return {
      inputOption: undefined,
      outputOption: undefined,
    };
  }),
  defineInputAndOutputSource: jest.fn(() => {
    return {
      input: mockReadableStream,
      output: mockWriteableStream,
    };
  }),
}));
jest.mock("../src/validation.js", () => ({
  checkConfigOption: jest.fn(() => ({ configIndex: 2 })),
  checkDuplicatedFunctions: jest.fn(),
  checkInputOutputValue: jest.fn(),
}));
jest.mock("../src/streams.js", () => ({
  addTransformStream: jest.fn(() => []),
}));
jest.mock("stream", () => ({
  pipeline: jest.fn((...args) => args[args.length - 1]()),
}));

beforeEach(() => jest.clearAllMocks());
test("check main function with mocks", () => {
  const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
  mainFunc(["node", "./src/index.js", "-c", "C0-R1-A"]);
  expect(mockUtils.defineInputAndOutputSource).toHaveBeenCalled();
  expect(mockUtils.checkOptions).toHaveBeenCalled();
  expect(mockValidation.checkConfigOption).toHaveBeenCalled();
  expect(mockValidation.checkDuplicatedFunctions).toHaveBeenCalled();
  expect(mockValidation.checkInputOutputValue).toHaveBeenCalled();
  expect(mockAddTransformStreams.addTransformStream).toHaveBeenCalled();
  expect(mockStream.pipeline).toHaveBeenCalled();
  expect(spyExit).not.toHaveBeenCalled();
  spyExit.mockRestore();
});

test("check pipeline", () => {
  const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
  mockValidation.checkConfigOption.mockImplementation(() => {
    throw new Error();
  });
  mainFunc(["node", "./src/index.js"]);
  expect(mockValidation.checkConfigOption).toThrow();
  expect(spyExit).toHaveBeenCalledWith(9);
  spyExit.mockRestore();
});

test("check pipeline with error", () => {
  const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
  jest.mock("stream", () => ({
    pipeline: jest.fn((...args) => args[args.length - 1]()),
  }));
  mockStream.pipeline.mockImplementation((...args) =>
    args[args.length - 1]("Some error")
  );
  mockValidation.checkConfigOption.mockImplementation(() => ({
    configIndex: 2,
  }));
  mainFunc(["node", "./src/index.js", "-c", "C0-C1", "-i", "./src/input.txt"]);
  expect(spyExit).toHaveBeenCalledWith(5);
  spyExit.mockRestore();
});
