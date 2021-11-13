import { Transform } from "stream";
import { ceasarEncode, ceasarDecode } from "./ciphers/ceasar.js";
// import { rot8Encode, rot8Decode } from "./ciphers/rot-8";
// import { atbashEncode, atbashDecode } from "./ciphers/atbash";

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
