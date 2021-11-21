import { jest } from "@jest/globals";
import { Writable, Readable } from "stream";
import {
  addTransformStream,
  CeasarEncoder,
  CeasarDecoder,
  Rot8Encoder,
  Rot8Decoder,
  AtbashEncoderDecoder,
  MyWritableStream,
  MyReadableStream,
} from "../src/streams";

test("should create transform streams for all ciphers", () => {
  const cipherSequence = ["C0", "C1", "A", "R0", "R1"];
  const result = addTransformStream(cipherSequence);
  expect(result.length).toBe(5);
});

test("should create transform stream CeasarEncoder", () => {
  const cipherSequence = ["C0"];
  const result = addTransformStream(cipherSequence);
  expect(typeof result[0]._transform).toBe("function");
});

describe("check MyWritableStream", () => {
  test("defines write()", () => {
    const myWritableStream = new MyWritableStream("./src/output.txt");
    expect(typeof myWritableStream.write).toBe("function");
  });

  test("should return writable stream", () => {
    const myWritableStream = new MyWritableStream("./src/output.txt");
    expect(myWritableStream).toBeInstanceOf(Writable);
  });
});

describe("check MyReadableStream", () => {
  test("defines read()", () => {
    const myReadableStream = new MyReadableStream("./src/intput.txt");
    expect(typeof myReadableStream.read).toBe("function");
  });

  test("should return readable stream", () => {
    const myReadableStream = new MyReadableStream("./src/intput.txt");
    expect(myReadableStream).toBeInstanceOf(Readable);
  });
});

test("check MyReadableStream", () => {
  const myReadableStream = jest.fn();
  const mMock = jest.fn();

  myReadableStream.mockImplementation(() => {
    return {
      m: mMock,
    };
  });

  const some = new myReadableStream();
  some.m("a", "b");
  expect(mMock.mock.calls).toEqual([["a", "b"]]);
});

test("should transform data by CeasarEncoder", async () => {
  const ceasarEncoderTransform = new CeasarEncoder();
  ceasarEncoderTransform.write("Hello!");
  await expect(
    new Promise((resolve) => {
      ceasarEncoderTransform.on("data", (data) => {
        resolve(data.toString("utf8"));
      });
    })
  ).resolves.toBe("Ifmmp!");
});

test("should transform data by CeasarDecoder", async () => {
  const ceasarDecoderTransform = new CeasarDecoder();
  ceasarDecoderTransform.write("Ifmmp!");
  await expect(
    new Promise((resolve) => {
      ceasarDecoderTransform.on("data", (data) => {
        resolve(data.toString("utf8"));
      });
    })
  ).resolves.toBe("Hello!");
});

test("should transform data by Rot8Encoder", async () => {
  const rot8EncoderTransform = new Rot8Encoder();
  rot8EncoderTransform.write("Hello!");
  await expect(
    new Promise((resolve) => {
      rot8EncoderTransform.on("data", (data) => {
        resolve(data.toString("utf8"));
      });
    })
  ).resolves.toBe("Pmttw!");
});

test("should transform data by Rot8Decoder", async () => {
  const rot8DecoderTransform = new Rot8Decoder();
  rot8DecoderTransform.write("Pmttw!");
  await expect(
    new Promise((resolve) => {
      rot8DecoderTransform.on("data", (data) => {
        resolve(data.toString("utf8"));
      });
    })
  ).resolves.toBe("Hello!");
});

test("should transform data by AtbashEncoderDecoder", async () => {
  const atbashTransform = new AtbashEncoderDecoder();
  atbashTransform.write("Pmttw!");
  await expect(
    new Promise((resolve) => {
      atbashTransform.on("data", (data) => {
        resolve(data.toString("utf8"));
      });
    })
  ).resolves.toBe("Knggd!");
});
