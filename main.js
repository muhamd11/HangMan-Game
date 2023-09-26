//  Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = letters.split("");

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // create letter text node
  let theLetter = document.createTextNode(letter);

  // append the  letter to span
  span.appendChild(theLetter);

  // add class on span
  span.className = "letter-box";

  // append span to the letters container
  lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property
let allKeys = Object.keys(words);

// random number depends on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// category word
let randomPropValue = words[randomPropName];

// random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// the choosen word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessElement = document.querySelector(".container .letter-guess");

// convert choosen word to array
let letterAndSpace = randomValueValue.split("");

// create spans depend on letter

letterAndSpace.forEach((letter) => {
  // create span
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    emptySpan.className = "with-space";
  }

  // add span to guess letter container
  lettersGuessElement.appendChild(emptySpan);
});

// select guess spans
let guessSpans = document.querySelectorAll(".letter-guess span");

// set wrong attempts
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

let counter = 0;

// handling clicking on letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        // set status to correct
        theStatus = true;
        counter += 1;
        // loop on guess spans
        guessSpans.forEach((span, sapnIndex) => {
          if (wordIndex === sapnIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    //  outside the loop
    // check the correct word and show the popup
    if (counter === theChosenWord.length) {
      Swal.fire(
        "You Get It",
        `The Word Is ${theChosenWord.join("").toUpperCase()}`,
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
            window.location.reload();
        }
      });
      
    }
    // if letter is wrong
    if (theStatus !== true) {
      // increas the wrong attempts
      wrongAttempts++;

      // add class wrong to draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `Game Over, The Word Is ${randomValueValue}`,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    } else {
        window.location.reload();
    }
  });
}
