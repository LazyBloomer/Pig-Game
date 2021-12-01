'use strict';

// while using document.getElementById we need not to use # for the element
// also document.getElementById works similar to querySelector but is a bit faster

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const newBtnEl = document.querySelector('.btn--new');
const rollBtnEl = document.querySelector('.btn--roll');
const holdBtnEl = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //after switching the player reseting the current player score to 0 aswell
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // console.log(`active player ${activePlayer}`);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//starting conditions
let scores;
let currentScore, activePlayer, isPlaying;

const initializer = function () {
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initializer();
//roll button functionality
rollBtnEl.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      //dynamically selecting player and adding score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //before switching player reseting the current socre to 0
      switchPlayer();
    }
  }
});

//hold button functionality
holdBtnEl.addEventListener('click', function () {
  if (isPlaying) {
    diceEl.classList.add('hidden');
    //add curent score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if players's score is  >=50 if yes finish
    if (scores[activePlayer] >= 50) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //else switch to other players
      switchPlayer();
    }
  }
});

//reset button
newBtnEl.addEventListener('click', initializer);
