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

export class EmptyCipherConfig extends Error {
  constructor() {
    super("Please enter cipher config");
  }
}

export class UnknownCipherError extends Error {
  constructor(msg) {
    super(`Unknown cipher ${msg}.`);
  }
}
