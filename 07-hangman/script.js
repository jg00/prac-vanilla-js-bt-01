const wordEl = document.getElementById("word"); // represents correct letter guesses
const wrongLettersEl = document.getElementById("wrong-letters"); // represents incorrect letter guesses
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];
// const words = ["wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)]; // returns 0 - 3

const correctLetters = ["w", "z", "i", "a", "r", "d"]; // if we guess correctly place letter here
const wrongLetters = []; // if we guess incorrectly place letter here

// Show hidden word.  Run this function initially and after every guess to check and redisplay
function displayWord() {
  console.log(selectedWord);

  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
          ${correctLetters.indexOf(letter) > -1 ? letter : ""}
        </span>
      `
      )
      .join("")}
  `;

  // We need the current innerText combined but first need to remove any new line characters.
  // These innerText characters will be in ordred.
  const innerWord = wordEl.innerText.replace(/\n/g, ""); // replace \n (new line character) with an empty string.  'g' in the expression means global (ie whereever it is found).
  // console.log(wordEl.innerText); // Notice that there is a new line character after each and we have to remove that.
  console.log(innerWord);

  // Now we can check if we won or not
  // Display pop up message
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratuations! You won! 😀`;
    popup.style.display = "flex";
  }
}

displayWord();
