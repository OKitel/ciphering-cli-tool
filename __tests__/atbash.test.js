import { atbashEncode } from "../src/ciphers/atbash";

test("should encode message using Atbash cipher", () => {
  const message = 'This is secret. Message about "_" symbol!';
  expect(atbashEncode(message)).toEqual(
    'Gsrh rh hvxivg. Nvhhztv zylfg "_" hbnylo!'
  );
});
