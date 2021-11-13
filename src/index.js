import fs from "fs";
import { stderr } from "process";
import { pipeline } from "stream";
import { CeasarDecoder, CeasarEncoder } from "./streams.js";
import {
  options,
  checkConfigOption,
  checkDuplicatedFunctions,
} from "./validation.js";
const { stdin, stdout } = process;

// import { ceasarEncode, ceasarDecode } from "./ciphers/ceasar";
// import { rot8Encode, rot8Decode } from "./ciphers/rot-8";
// import { atbashEncode, atbashDecode } from "./ciphers/atbash";

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
    output = fs.createWriteStream(outputFile, { flags: "a" });
  }
};

checkConfigOption();
checkDuplicatedFunctions();
checkOptions(options);
defineInputAndOutputSource();

pipeline(input, new CeasarEncoder(), new CeasarDecoder(), output, (err) => {
  if (err) {
    stderr.write("There is an error");
  }
});
