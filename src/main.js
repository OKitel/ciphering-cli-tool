import { pipeline } from "stream";
import { addTransformStream } from "./streams.js";
import {
  checkConfigOption,
  checkInputOutputValue,
  checkDuplicatedFunctions,
} from "./validation.js";

import { checkOptions, defineInputAndOutputSource } from "./utils.js";

export const mainFunc = (options) => {
  const { stderr, exit } = process;
  try {
    const { configIndex } = checkConfigOption(options);
    checkDuplicatedFunctions(options);
    const { inputOption, outputOption } = checkOptions(options);
    checkInputOutputValue(inputOption, outputOption, options);
    const { input, output } = defineInputAndOutputSource(
      options,
      inputOption,
      outputOption
    );
    const cipherSequence = options[configIndex + 1].split("-");
    const transformStreamsSequence = addTransformStream(cipherSequence);

    pipeline(input, ...transformStreamsSequence, output, (err) => {
      if (err) {
        stderr.write(`There is an error: ${err}`);
        exit(5);
      }
    });
  } catch (e) {
    stderr.write(e.message);
    exit(9);
  }
};
