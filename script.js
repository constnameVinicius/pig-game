'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting Conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

// Calling the initializing function
window.addEventListener('load', init);

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;

    //   Generating a random dice
    diceEl.src = `dice-${number}.png`;
    diceEl.classList.remove('hidden');

    // Display dice
    if (number !== 1) {
      currentScore += number;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //Add dice to current score
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reseting the game
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
