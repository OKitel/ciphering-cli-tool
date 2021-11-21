import { rot8Encode, rot8Decode } from "../src/ciphers/rot-8";

test("should encode message using ROT-8 cipher", () => {
  const message = 'This is secret. Message about "_" symbol!';
  expect(rot8Encode(message)).toEqual(
    'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!'
  );
});

test("should decode message using ROT-8 cipher", () => {
  const message = 'Bpqa qa amkzmb. Umaaiom ijwcb "_" agujwt!';
  expect(rot8Decode(message)).toEqual(
    'This is secret. Message about "_" symbol!'
  );
});
