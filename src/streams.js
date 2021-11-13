import { Transform } from "stream";
import { ceasarEncode, ceasarDecode } from "./ciphers/ceasar.js";
import { rot8Encode, rot8Decode } from "./ciphers/rot-8.js";
import { atbashEncode } from "./ciphers/atbash.js";

class CeasarEncoder extends Transform {
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

class CeasarDecoder extends Transform {
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

class Rot8Encoder extends Transform {
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

class Rot8Decoder extends Transform {
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

class AtbashEncoderDecoder extends Transform {
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

export const addTransformStream = (sequence) => {
  const result = [];
  for (let i = 0; i < sequence.length; i++) {
    switch (sequence[i]) {
      case "C1":
        result.push(new CeasarEncoder());
        break;
      case "C0":
        result.push(new CeasarDecoder());
        break;
      case "R1":
        result.push(new Rot8Encoder());
        break;
      case "R0":
        result.push(new Rot8Decoder());
        break;
      case "A":
        result.push(new AtbashEncoderDecoder());
        break;
    }
  }
  return result;
};
