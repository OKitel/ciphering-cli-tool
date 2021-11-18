import { ceasarEncode, ceasarDecode } from "../src/ciphers/ceasar.js";

test("should encode message using Ceasar cipher", () => {
  const message = 'This is secret. Message about "_" symbol!';
  expect(ceasarEncode(message)).toEqual(
    'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!'
  );
});

test("should decode message using Ceasar cipher", () => {
  const message = 'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!';
  expect(ceasarDecode(message)).toEqual(
    'This is secret. Message about "_" symbol!'
  );
});
