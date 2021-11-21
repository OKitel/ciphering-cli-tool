import { addTransformStream } from "../src/streams";

test("should create transform streams for all ciphers", () => {
  const cipherSequence = ["C0", "C1", "A", "R0", "R1"];
  const result = addTransformStream(cipherSequence);
  expect(result.length).toBe(5);
});
