import fs from "fs";
import path from "path";
import {
  DuplicatedOptionsError,
  EmptyCipherConfig,
  MissingConfigError,
  UnknownCipherError,
} from "./errors.js";
const { stderr, exit } = process;
export const options = process.argv;
const possibleCipher = ["C0", "C1", "R0", "R1", "A"];
const possibleOptions = ["-c", "--config", "-i", "--input", "-o", "--output"];

const checkCipherSequence = (config) => {
  let isOk = true;
  if (config === "" || config === undefined) {
    throw new EmptyCipherConfig();
  }
  const configArr = config.split("-");
  for (let i = 0; i < configArr.length; i++) {
    if (!possibleCipher.includes(configArr[i])) {
      isOk = false;
      throw new UnknownCipherError(configArr[i]);
    }
  }
  if (!isOk) {
    stderr.write("Please enter correct cipher name.");
    exit(3);
  }
};

export const checkConfigOption = () => {
  if (options[2] === "-c" || options[2] === "--config") {
    checkCipherSequence(options[3]);
  } else {
    throw new MissingConfigError();
  }
};

export const checkDuplicatedFunctions = () => {
  for (let i = 0; i < possibleOptions.length; i++) {
    if (
      options.indexOf(possibleOptions[i]) !==
      options.lastIndexOf(possibleOptions[i])
    ) {
      throw new DuplicatedOptionsError(possibleOptions[i], possibleOptions[i]);
    }
  }
  if (options.includes("-i") && options.includes("--input")) {
    throw new DuplicatedOptionsError("-i", "--input");
  }
  if (options.includes("-o") && options.includes("--output")) {
    throw new DuplicatedOptionsError("-o", "--output");
  }
  if (options.includes("-c") && options.includes("--config")) {
    throw new DuplicatedOptionsError("-c", "--config");
  }
};

export const checkInputOutputValue = (inputOption, outputOption) => {
  const iFile = options[options.indexOf(inputOption) + 1];
  const oFile = options[options.indexOf(outputOption) + 1];
  if (iFile === undefined) {
    stderr.write("Please enter input value.");
    exit(3);
  }

  if (oFile === undefined) {
    stderr.write("Please enter output value.");
    exit(3);
  }

  if (!fs.existsSync(iFile)) {
    stderr.write(
      `File ${iFile} doesn't exist. Please enter correct input value.`
    );
    exit(3);
  }
  if (!fs.existsSync(oFile)) {
    stderr.write(
      `File ${oFile} doesn't exist. Please enter correct output value.`
    );
    exit(3);
  }
  if (inputOption !== undefined && outputOption !== undefined) {
    if (path.resolve(iFile) === path.resolve(oFile)) {
      stderr.write("Input and output files should be different.");
      exit(7);
    }
  }
};
