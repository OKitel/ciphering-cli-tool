import { alphabet, alphabetLength } from "./alphabet.js";

export const ceasarEncode = (message) => {
  return cyperInternal(+1, message);
};

export const ceasarDecode = (message) => {
  return cyperInternal(-1, message);
};

const cyperInternal = (shift, message) => {
  const mesArr = message.split("");
  let result = [];
  for (let i = 0; i < mesArr.length; i++) {
    let letter = mesArr[i];
    let letterInUpperCase = letter.toUpperCase();
    let letterIndex = alphabet.indexOf(letterInUpperCase);
    if (letterIndex !== -1) {
      const newLetter =
        alphabet[(letterIndex + shift + alphabetLength) % alphabetLength];
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

const { stdin, stdout } = process;
stdin.on("data", (data) => {
  const dataStringified = data.toString();
  const encodedMessage = ceasarEncode(dataStringified);
  stdout.write(encodedMessage);
  stdout.write(ceasarDecode(encodedMessage));
  process.exit();
});
