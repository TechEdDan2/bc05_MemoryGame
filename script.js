// Variables
const gameContainer = document.getElementById('game');
const resetBtn = document.getElementById('playAgain');
const scoreDisplay = document.getElementById('score');
let firstCard = null;//Stores the first card
let secondCard = null;//stores the second card
const gameTo = 5;
let matchCount = 0;
let gameOver = false;
let tries = 0;

// Colors version 1
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// Bluey Characters Version 2
const CHARACTERS = [
  "bluey",
  "bandit",
  "bingo",
  "chilli",
  "honey",
  "bluey",
  "bandit",
  "bingo",
  "chilli",
  "honey"
];

//Assing the array to variable
//let shuffledColors = shuffle(COLORS);
let shuffledCharacters = shuffle(CHARACTERS);

// when the DOM loads
//createDivsForColors(shuffledColors);
createDivsForCharacters(shuffledCharacters);

// Reset the Game 
resetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  gameReset();

});

//////////////////////
//                  //
//    Functions     //
//                  //
//////////////////////

////////////////////////////////////////////////////
// Here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates 
// if you want to research more
////////////////////////////////////////////////////
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


////////////////////////////////////////////////////
// this function loops over the array of colors   //
// it creates a new div and gives it a class with //
// the value of the color it also adds an event   //
// listener for a click for each card             //
///////////////////////////////////////////////////
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     newDiv.style.backgroundImage = 'url(images/blueyBG.png)';
//     newDiv.style.backgroundSize = 'cover';
//     newDiv.style.backgroundRepeat = 'no-repeat';

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

function createDivsForCharacters(characterArray) {
  for (let character of characterArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(character);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    newDiv.style.backgroundImage = 'url(images/blueyBG.png)';
    newDiv.style.backgroundSize = 'cover';
    newDiv.style.backgroundRepeat = 'no-repeat';

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //console.log("you just clicked", event.target.classList);
  const currentCard = event.target;
  const currentCardCharacter = currentCard.classList.value;
  //console.log(currentCardCharacter);

  // - Clicking a card should change the background color to be the color of the class it has.
  if (currentCard === firstCard || currentCard.classList.contains('matchFound')) {
    console.log("Double click or match found");
    return;
  }
  // null is falsy 
  if (!firstCard) {
    console.log(`THIS IS THE FIRST CARD: ${currentCard.classList.value}`);
    // First Card Flipped assign the target object to the first card
    // event.target.style.backgroundImage = 'none';
    // event.target.style.backgroundColor = currentCardColor;
    currentCard.style.backgroundImage = `url(images/${currentCardCharacter}.png)`;
    event.target.style.backgroundSize = 'cover';
    event.target.style.backgroundPosition = 'center';
    // currentCard.style.backgroundColor = currentCardColor;
    firstCard = currentCard;

  } else {
    console.log('THIS IS THE SECOND CARD')
    // Second Card Flipped
    secondCard = currentCard;

    event.target.style.backgroundImage = `url(images/${currentCardCharacter}.png`;
    event.target.style.backgroundSize = 'cover';
    event.target.style.backgroundPosition = 'center';
    // event.target.style.backgroundColor = currentCardColor;

    // Increases the number of tries by 1
    tries++;
    // console.log('Current number of tries: ' + tries);

    // - Clicking on two matching cards should be a “match” — those cards should stay face up.
    if (firstCard.classList.contains(currentCardCharacter)) {
      console.log('MATCH FOUND!');
      matchCount++;
      console.log('Current number of matches: ' + matchCount);

      // Use 'matchFound' to stop clicking 
      firstCard.classList.add('matchFound');
      secondCard.classList.add('matchFound');

      //Check to see if game is over
      if (matchCount === gameTo) {
        // Update the Display Text
        scoreDisplay.innerText = `Game Over! It took you ${tries} tries to get ${matchCount} matches`;

        // Save to Local Storage if Current Tries is less than the Stored
        if (localStorage.getItem('guess record') > tries) {
          localStorage.setItem('guess record', tries);
        }

      }

      firstCard = null;
      secondCard = null;

    } else {
      // - When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
      setTimeout(() => {
        firstCard.classList.remove('faceUp');
        secondCard.classList.remove('faceUp');
        firstCard.style.backgroundImage = 'url(images/blueyBG.png)';
        firstCard.style.backgroundSize = 'cover';
        firstCard.style.backgroundRepeat = 'no-repeat';

        secondCard.style.backgroundImage = 'url(images/blueyBG.png)';
        secondCard.style.backgroundSize = 'cover';
        secondCard.style.backgroundRepeat = 'no-repeat';

        firstCard = null;
        secondCard = null;

      }, 1000);
    }
  }
}

// Reset the Game
function gameReset() {
  const oldCards = document.querySelectorAll('#game div');

  for (let oldCard of oldCards) {
    oldCard.remove();
  }

  // shuffledColors = shuffle(COLORS);
  // createDivsForColors(shuffledColors);
  shuffledCharacters = shuffle(CHARACTERS);
  createDivsForCharacters(shuffledCharacters);

  const newGameCards = document.querySelectorAll('#game div');

  // addCardBack();
  for (let card of newGameCards) {
    card.style.backgroundImage = 'url(images/blueyBG.png)';
    card.style.backgroundSize = 'cover';
    card.style.backgroundRepeat = 'no-repeat';
    if (card.classList.contains('matchFound')) {
      card.classList.remove('matchFound');
    }
  }

  // Reset Let's Play
  scoreDisplay.innerText = "Let's Play!"

  // Reset Match Count and Tries
  matchCount = 0;
  tries = 0;

  console.log(`Matches: ${matchCount} and Tries: ${tries}`);

}

// Need help with these:
// - Users should only be able to change at most two cards at a time.

//Future Improvements
// Allow users to pick how many cards they want to guess
// Create an animation with a card flip
// Add a timer to use in a new scoring system
// Add a start button
// Make it responsive for Mobile


