import { pipeline } from "stream";
import {
  addTransformStream,
  MyWritableStream,
  MyReadableStream,
} from "./streams.js";
import {
  checkConfigOption,
  checkInputOutputValue,
  checkDuplicatedFunctions,
} from "./validation.js";
import { options } from "./options.js";

const checkOptions = (options) => {
  let inputOption;
  let outputOption;
  if (options.indexOf("-i") === -1 && options.indexOf("--input") === -1) {
    inputOption = undefined;
  } else if (options.indexOf("-i") === -1) {
    inputOption = "--input";
  } else {
    inputOption = "-i";
  }

  if (options.indexOf("-o") === -1 && options.indexOf("--output") === -1) {
    outputOption = undefined;
  } else if (options.indexOf("-o") === -1) {
    outputOption = "--output";
  } else {
    outputOption = "-o";
  }

  return { inputOption, outputOption };
};

const defineInputAndOutputSource = (inputOption, outputOption) => {
  const { stdin, stdout } = process;
  let input;
  let output;
  let inputFile;
  let outputFile;
  if (inputOption === undefined) {
    input = stdin;
  } else {
    inputFile = options[options.indexOf(inputOption) + 1];
    input = new MyReadableStream(inputFile);
  }
  if (outputOption === undefined) {
    output = stdout;
  } else {
    outputFile = options[options.indexOf(outputOption) + 1];
    output = new MyWritableStream(outputFile, { flags: "a" });
  }
  return { input, output };
};

export const mainFunc = () => {
  const { stderr, exit } = process;
  try {
    checkConfigOption(options);
    checkDuplicatedFunctions(options);
    const { inputOption, outputOption } = checkOptions(options);
    checkInputOutputValue(inputOption, outputOption, options);
    const { input, output } = defineInputAndOutputSource(
      inputOption,
      outputOption
    );
    const cipherSequence = options[3].split("-");
    const transformStreamsSequence = addTransformStream(cipherSequence);

    pipeline(input, ...transformStreamsSequence, output, (err) => {
      if (err) {
        stderr.write(`There is an error: ${err}`);
        exit(5);
      }
    });
  } catch (e) {
    stderr.write(e.message);
    exit(9);
  }
};

mainFunc();
