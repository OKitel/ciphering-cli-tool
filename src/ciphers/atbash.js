import { alphabet, alphabetLength } from "./alphabet.js";

export const atbashEncode = (message) => {
  const mesArr = message.split("");
  let result = [];
  for (let i = 0; i < mesArr.length; i++) {
    let letter = mesArr[i];
    let letterInUpperCase = letter.toUpperCase();
    let letterIndex = alphabet.indexOf(letterInUpperCase);
    if (letterIndex !== -1) {
      const newLetter = alphabet[-(letterIndex - alphabetLength) - 1];
      if (letter === letterInUpperCase) {
        result.push(newLetter);
      } else {
        result.push(newLetter.toLowerCase());
      }
    } else {
      result.push(letter);
    }
  }
  return result.join("");
};

export const atbashDecode = atbashEncode;

const { stdin, stdout } = process;
stdin.on("data", (data) => {
  const dataStringified = data.toString();
  const encodedMessage = atbashEncode(dataStringified);
  stdout.write(encodedMessage);
  stdout.write(atbashDecode(encodedMessage));
  process.exit();
});
