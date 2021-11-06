import { alphabet, alphabetLength } from "./alphabet.js";

export const rot8Encode = (message) => {
  return cipherInternal(+8, message);
};

export const rot8Decode = (message) => {
  return cipherInternal(-8, message);
};

const cipherInternal = (shift, message) => {
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
  const encodedMessage = rot8Encode(dataStringified);
  stdout.write(encodedMessage);
  stdout.write(rot8Decode(encodedMessage));
  process.exit();
});
