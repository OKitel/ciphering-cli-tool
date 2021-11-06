import { alphabet, alphabetLength } from "./alphabet.js";

export const ceasarEncode = (message) => {
  const mesArr = message.split("");
  let result = [];
  for (let i = 0; i < mesArr.length; i++) {
    let letter = mesArr[i];
    let letterInUpperCase = letter.toUpperCase();
    let letterIndex = alphabet.indexOf(letterInUpperCase);
    if (letterIndex !== -1) {
      if (letter === letterInUpperCase) {
        result.push(alphabet[(letterIndex + 1) % alphabetLength]);
      } else {
        result.push(alphabet[(letterIndex + 1) % alphabetLength].toLowerCase());
      }
    } else {
      result.push(mesArr[i]);
    }
  }
  return result.join("");
};

const { stdin, stdout } = process;
stdin.on("data", (data) => {
  const dataStringified = data.toString();
  stdout.write(ceasarEncode(dataStringified));
  process.exit();
});
