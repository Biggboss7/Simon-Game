"use strict";

// Target Elements
const gameHeadingEl = document.querySelector("h1");
const gameBtnsContainer = document.querySelector(".game-arena");
const bodyEl = document.body;

// Configuration
const soundFilePath = "./sounds/";
const soundFileExt = ".mp3";

// Helper Function
const randomIndex = () => Math.floor(Math.random() * 4);

const implementSoundEffect = function (btnEl) {
  const audio = new Audio(
    `${soundFilePath}${btnEl.id.slice(0, -3)}${soundFileExt}`
  );

  audio.play();
};

const clickAnimation = function (e) {
  const selectedButton = e.target.closest("button");
  if (!selectedButton) return;

  selectedButton.classList.add("pressedkey");
  implementSoundEffect(selectedButton);

  setTimeout(function () {
    selectedButton.classList.remove("pressedkey");
  }, 70);
};

const simonGame = {
  _level: 0,
  _colorList: ["red", "yellow", "green", "blue"],
  _cpuMemory: [],

  _renderLevel() {
    gameHeadingEl.textContent = `Level ${this._level}`;
  },

  _renderPattern() {
    this._cpuMemory.forEach(color => {
      const btnColorEl = document.getElementById(`${color}-id`);

      btnColorEl.classList.add("selectedkey");
      implementSoundEffect(btnColorEl);

      setTimeout(() => btnColorEl.classList.remove("selectedkey"), 150);
    });
  },

  _generatePattern() {
    const color = this._colorList[randomIndex()];
    this._cpuMemory.push(color);
  },

  _proceedNextLevel() {
    this._level++;
    this._renderLevel();

    this._generatePattern();
    this._renderPattern();
  },

  init() {
    window.addEventListener("keydown", this._proceedNextLevel.bind(this), {
      once: true,
    });

    gameBtnsContainer.addEventListener("click", clickAnimation);
  },
};

simonGame.init();

const startGame = function (event) {
  event.stopImmediatePropagation();
  $("h1").text("Level 1");
  patternGenerator();
};

const gameOver = function () {
  let audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("gameover");
  setTimeout(function () {
    $("body").removeClass("gameover");
  }, 100);
  memory = [];
  number = 0;
  level = 1;
  amountOfQuestion = undefined;
};

const selectAnswer = function () {
  const selectedButton = $(this);
  makeSound(selectedButton.attr("id"));
  let answer = selectedButton.attr("id");

  if (answer === memory[number]) {
    number++;
  } else {
    gameOver();
    $(document).one("keypress", startGame);
    $(document).one("tap", startGame);
  }

  if (number === amountOfQuestion) {
    number = 0;
    setTimeout(patternGenerator, 500);
    setTimeout(changeLevel, 500);
  }
};

let memory = [];
let amountOfQuestion;
let number = 0;
let level = 1;
