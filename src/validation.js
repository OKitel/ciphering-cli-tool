import fs from "fs";
const { stderr, exit } = process;
export const options = process.argv;
const possibleCipher = ["C0", "C1", "R0", "R1", "A"];
const possibleOptions = ["-c", "--config", "-i", "--input", "-o", "--output"];

const checkCipherSequence = (config) => {
  let isOk = true;
  if (config === "" || config === undefined) {
    stderr.write("Please enter cipher config.");
    exit(2);
  }
  const configArr = config.split("-");
  for (let i = 0; i < configArr.length; i++) {
    if (!possibleCipher.includes(configArr[i])) {
      isOk = false;
      stderr.write(`Unknown cipher ${configArr[i]}.\n`);
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
    stderr.write("Please enter config flag: index.js -c");
    exit(1);
  }
};

export const checkDuplicatedFunctions = () => {
  for (let i = 0; i < possibleOptions.length; i++) {
    if (
      options.indexOf(possibleOptions[i]) !==
      options.lastIndexOf(possibleOptions[i])
    ) {
      stderr.write(`Please, do not duplicate option ${possibleOptions[i]}.`);
      exit(4);
    }
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
};
