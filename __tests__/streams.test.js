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

  test("should throw error if writable stream is creating without file path", () => {
    expect(() => new MyWritableStream()).toThrowError();
  });
});

describe("check MyReadableStream", () => {
  test("defines read()", () => {
    const myReadableStream = new MyReadableStream("./src/input.txt");
    expect(typeof myReadableStream.read).toBe("function");
  });

  test("should return readable stream", () => {
    const myReadableStream = new MyReadableStream("./src/input.txt");
    expect(myReadableStream).toBeInstanceOf(Readable);
  });

  test("should call _construct method in readable stream", (done) => {
    const myReadableStream = new MyReadableStream("./src/input.txt");
    myReadableStream._construct((err) => {
      expect(err).toBe(undefined);
      done();
    });
  });
  test("should call _read method in readable stream", () => {
    const myReadableStream = new MyReadableStream("./src/input.txt");
    myReadableStream._construct(() => {
      myReadableStream.read(14);
    });
  });

  // test("should throw error if readable stream is creating without file path", () => {
  //   expect(() => new MyReadableStream()).toThrowError();
  // });
});

describe("test all transform streams", () => {
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

  test("should throw error if CeasarEncoder receive \u0003", () => {
    const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const ceasarEncoderTransform = new CeasarEncoder();
    ceasarEncoderTransform.write("\u0003");
    expect(spyExit).toHaveBeenCalled();
    spyExit.mockRestore();
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

  test("should throw error if CeasarDecoder receive \u0003", () => {
    const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const ceasarDecoderTransform = new CeasarDecoder();
    ceasarDecoderTransform.write("\u0003");
    expect(spyExit).toHaveBeenCalled();
    spyExit.mockRestore();
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

  test("should throw error if Rot8Encoder receive \u0003", () => {
    const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const rot8EncoderTransform = new Rot8Encoder();
    rot8EncoderTransform.write("\u0003");
    expect(spyExit).toHaveBeenCalled();
    spyExit.mockRestore();
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

  test("should throw error if Rot8Decoder receive \u0003", () => {
    const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const rot8DecoderTransform = new Rot8Decoder();
    rot8DecoderTransform.write("\u0003");
    expect(spyExit).toHaveBeenCalled();
    spyExit.mockRestore();
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

  test("should throw error if AtbashEncoderDecoder receive \u0003", () => {
    const spyExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const atbashTransform = new AtbashEncoderDecoder();
    atbashTransform.write("\u0003");
    expect(spyExit).toHaveBeenCalled();
    spyExit.mockRestore();
  });
});
