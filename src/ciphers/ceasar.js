import { alphabet, alphabetLength } from "./alphabet.js";

export const ceasarEncode = (message) => {
  return cipherInternal(+1, message);
};

export const ceasarDecode = (message) => {
  return cipherInternal(-1, message);
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
