import fs from "fs";
import path from "path";
import {
  DuplicatedOptionsError,
  MissingConfigError,
  MissingOptionValueError,
  UnknownCipherError,
  FileNotFoundError,
  InputAndOutputSameFilesError,
} from "./errors.js";
export const options = process.argv;
const possibleCipher = ["C0", "C1", "R0", "R1", "A"];
const possibleOptions = ["-c", "--config", "-i", "--input", "-o", "--output"];

const checkCipherSequence = (config) => {
  if (config === "" || config === undefined) {
    throw new MissingOptionValueError("config");
  }
  const configArr = config.split("-");
  for (let i = 0; i < configArr.length; i++) {
    if (!possibleCipher.includes(configArr[i])) {
      throw new UnknownCipherError(configArr[i]);
    }
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
    throw new MissingOptionValueError("input");
  }

  if (oFile === undefined) {
    throw new MissingOptionValueError("output");
  }

  if (!fs.existsSync(iFile)) {
    throw new FileNotFoundError(iFile, "input");
  }
  if (!fs.existsSync(oFile)) {
    throw new FileNotFoundError(oFile, "output");
  }
  if (inputOption !== undefined && outputOption !== undefined) {
    if (path.resolve(iFile) === path.resolve(oFile)) {
      throw new InputAndOutputSameFilesError();
    }
  }
};
