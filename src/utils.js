import { MyReadableStream, MyWritableStream } from "./streams.js";
// import { options } from "./options.js";

export const checkOptions = (options) => {
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

export const defineInputAndOutputSource = (
  options,
  inputOption,
  outputOption
) => {
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
