import { exit, stderr } from "process";
import { pipeline } from "stream";
import {
  addTransformStream,
  MyWritableStream,
  MyReadableStream,
} from "./streams.js";
import {
  options,
  checkConfigOption,
  checkInputOutputValue,
  checkDuplicatedFunctions,
} from "./validation.js";
const { stdin, stdout } = process;

let inputOption;
let outputOption;
let inputFile;
let outputFile;

const checkOptions = (options) => {
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
};

let input;
let output;

const defineInputAndOutputSource = () => {
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
};

checkConfigOption();
checkDuplicatedFunctions();
checkOptions(options);
checkInputOutputValue(inputOption, outputOption);
defineInputAndOutputSource();

const cipherSequence = options[3].split("-");
const transformStreamsSequence = addTransformStream(cipherSequence);

pipeline(input, ...transformStreamsSequence, output, (err) => {
  if (err) {
    stderr.write(`There is an error: ${err}`);
    exit(5);
  }
});
