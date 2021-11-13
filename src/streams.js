import { Transform } from "stream";
import { ceasarEncode, ceasarDecode } from "./ciphers/ceasar.js";
import { rot8Encode, rot8Decode } from "./ciphers/rot-8.js";
import { atbashEncode } from "./ciphers/atbash.js";

export const addTransformStream = () => {
  //TODO
};

export class CeasarEncoder extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkStringified = chunk.toString();

    if (chunkStringified === "\u0003") {
      process.exit();
    }

    const encodedMessage = ceasarEncode(chunkStringified);

    callback(null, encodedMessage);
  }
}

export class CeasarDecoder extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkStringified = chunk.toString();

    if (chunkStringified === "\u0003") {
      process.exit();
    }

    const decodedMessage = ceasarDecode(chunkStringified);

    callback(null, decodedMessage);
  }
}

export class Rot8Encoder extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkStringified = chunk.toString();

    if (chunkStringified === "\u0003") {
      process.exit();
    }

    const decodedMessage = rot8Encode(chunkStringified);

    callback(null, decodedMessage);
  }
}

export class Rot8Decoder extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkStringified = chunk.toString();

    if (chunkStringified === "\u0003") {
      process.exit();
    }

    const decodedMessage = rot8Decode(chunkStringified);

    callback(null, decodedMessage);
  }
}

export class AtbashEncoderDecoder extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const chunkStringified = chunk.toString();

    if (chunkStringified === "\u0003") {
      process.exit();
    }

    const decodedMessage = atbashEncode(chunkStringified);

    callback(null, decodedMessage);
  }
}
