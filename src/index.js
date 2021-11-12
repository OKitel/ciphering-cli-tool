import fs from "fs";
import { pipeline } from "stream";
import {
  options,
  checkConfigOption,
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
    input = fs.createReadStream(inputFile, "utf-8");
  }
  if (outputOption === undefined) {
    output = stdout;
  } else {
    outputFile = options[options.indexOf(outputOption) + 1];
    output = fs.createWriteStream(outputFile);
  }
};

checkConfigOption();
checkDuplicatedFunctions();
checkOptions(options);
defineInputAndOutputSource();
console.log(inputFile, outputFile);

pipeline(input, output, (err) => {
  if (err) {
    input,
      // TODO
      output;
  }
});
