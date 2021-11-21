export class DuplicatedOptionsError extends Error {
  constructor(msg, message) {
    super(`Please, do not duplicate options ${msg} and ${message}`);
  }
}

export class MissingConfigError extends Error {
  constructor() {
    super("Please enter config option: -c or --config.");
  }
}

export class UnknownCipherError extends Error {
  constructor(msg) {
    super(`Unknown cipher ${msg}.`);
  }
}

export class MissingOptionValueError extends Error {
  constructor(msg) {
    super(`Please enter ${msg} value.`);
  }
}

export class FileNotFoundError extends Error {
  constructor(file, msg) {
    super(`File ${file} doesn't exist. Please enter correct ${msg} value.`);
  }
}

export class InputAndOutputSameFilesError extends Error {
  constructor() {
    super("Input and output files should be different.");
  }
}

export class RequiredParameterisNullError extends Error {
  constructor(param) {
    super(`Required ${param} is null.`);
  }
}
