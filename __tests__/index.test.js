import { spawn } from "child_process";

describe("testing all cli with child process", () => {
  test("should return correct answer when all arguments are valid", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-c",
      "C0-R1-A",
      "-i",
      "./src/input.txt",
    ];
    const EXPECTED_OUTPUT = 'Zlka ka aoqboz. Goaasmo sreyz "_" augreh!';

    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return correct answer when all arguments are valid with options rearangement", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-i",
      "./src/input.txt",
      "-c",
      "C0-R1-A",
    ];
    const EXPECTED_OUTPUT = 'Zlka ka aoqboz. Goaasmo sreyz "_" augreh!';

    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return correct answer fro usage example #1", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-c",
      "C1-C1-R0-A",
      "-i",
      "./src/input.txt",
    ];
    const EXPECTED_OUTPUT = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';
    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return correct answer fro usage example #2", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./src/input.txt",
    ];
    const EXPECTED_OUTPUT = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!';
    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return correct answer fro usage example #3", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-c",
      "A-A-A-R1-R0-R0-R0-C1-C1-A",
      "-i",
      "./src/input.txt",
    ];
    const EXPECTED_OUTPUT = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!';
    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return correct answer fro usage example #4", (done) => {
    const INPUT_TO_CLI = [
      "./src/index.js",
      "-c",
      "C1-R1-C0-C0-A-R0-R1-R1-A-C1",
      "-i",
      "./src/input.txt",
    ];
    const EXPECTED_OUTPUT = 'This is secret. Message about "_" symbol!';
    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("should return error when there is no config option", (done) => {
    const INPUT_TO_CLI = ["./src/index.js", "-i", "./src/input.txt"];
    const EXPECTED_OUTPUT = "Please enter config option: -c or --config.";

    const cp = spawn("node", INPUT_TO_CLI);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      try {
        expect(res).toBe(EXPECTED_OUTPUT);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
