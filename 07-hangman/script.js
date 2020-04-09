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

// State of game
const correctLetters = []; // if we guess correctly place letter here
const wrongLetters = []; // if we guess incorrectly place letter here

// Show hidden word by checking and displaying each letter.  Run this function initially and after every guess to check and redisplay
function displayWord() {
  console.log(selectedWord);

  // 1 Check each letter
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

  // 2 Check current built word against selected word.
  // We need the current innerText combined but first need to remove any new line characters.
  // These innerText characters will be in ordred.
  const innerWord = wordEl.innerText.replace(/\n/g, ""); // replace \n (new line character) with an empty string.  'g' in the expression means global (ie whereever it is found).
  // console.log(wordEl.innerText); // Notice that there is a new line character after each and we have to remove that.
  // console.log(innerWord); // returns current word built from current letters displayed ex: "aiai" which we compare to the word "application".

  // Now we can check if we won or not
  // Display pop up message
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratuations! You won! 😀`;
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // 1 Display letters that are wrong
  // 2 Add the figure as we get letter wrong (if letter was not already previously selected then count toward chances)
  // 3 See if we lost the game

  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  const figureParts = document.querySelectorAll(".figure-part");
  // Iterate every part and display based on condition index < errors
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    // Remeber each part has an index starting at zero
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost. 😓`;
    popup.style.display = "flex";
  }
}

// Show notification that only indicates if the letter was already entered previously.
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        // If the letter is already in correctedLetters array then show notification
        showNotification();
      }
    } else {
      // If letter is not in selectedWord then push to the wrong letters array
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        // If the letter is already in wrongLetters array then show notification
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", (e) => {
  // Empty array state
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Get new random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // // Display word placeholders
  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
