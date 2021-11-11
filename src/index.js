const { stderr, exit } = process;
let flags = process.argv;
const possibleCipher = ["C0", "C1", "R0", "R1", "A", "A0", "A1"];
const possibleOptions = ["-c", "--config", "-i", "--input", "-o", "--output"];
const includesInputOption = flags.includes("-i") || flags.includes("--input");
const includesOutputOption = flags.includes("-o") || flags.includes("--output");
console.log(includesInputOption, includesOutputOption);

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

if (flags[2] === "-c" || flags[2] === "--config") {
  checkCipherSequence(flags[3]);
} else {
  stderr.write("Please enter config flag: index.js -c");
  exit(1);
}

for (let i = 0; i < possibleOptions.length; i++) {
  if (
    flags.indexOf(possibleOptions[i]) !== flags.lastIndexOf(possibleOptions[i])
  ) {
    stderr.write(`Please, do not duplicate option ${possibleOptions[i]}.`);
    exit(4);
  }
}
