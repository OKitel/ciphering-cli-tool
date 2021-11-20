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
