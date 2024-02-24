"use strict";

// Target Elements
const gameHeadingEl = document.querySelector("h1");
const gameBtnsContainer = document.querySelector(".game-arena");
const bodyEl = document.body;

// Configuration
const startKey = "Space";

const nextLvlPause = 500; // 0.5s

const soundFilePath = "./sounds/";
const soundFileExt = ".mp3";

// Helper Function
const randomIndex = totalIndex => Math.floor(Math.random() * totalIndex);

const implementSoundEffect = function (btnEl) {
  const audio = new Audio(
    `${soundFilePath}${
      !bodyEl.classList.contains("gameover") ? btnEl.id.slice(0, -3) : "wrong"
    }${soundFileExt}`
  );

  audio.play();
};

const btnClickAnimation = function (btnEl) {
  btnEl.classList.add("pressedkey");
  implementSoundEffect(btnEl);

  setTimeout(function () {
    btnEl.classList.remove("pressedkey");
  }, 70);
};

const handleSpaceKeyDown = function (e) {
  if (e.code !== startKey) return;

  simonGame.proceedNextLevel();

  window.removeEventListener("keydown", handleSpaceKeyDown);
};

// Simon Game Apps
const simonGame = {
  _level: 0,
  _colorList: ["red", "yellow", "green", "blue"],
  _cpuMemory: [],
  _question: 0,

  _renderHeadingContent(message) {
    gameHeadingEl.innerHTML = message;
  },

  _renderLastPattern() {
    const lastColor = this._cpuMemory.at(-1);
    const lastBtnEl = document.getElementById(`${lastColor}-id`);

    lastBtnEl.classList.add("selectedkey");
    implementSoundEffect(lastBtnEl);

    setTimeout(() => lastBtnEl.classList.remove("selectedkey"), 150);
  },

  _generatePattern() {
    const color = this._colorList[randomIndex(this._colorList.length)];
    this._cpuMemory.push(color);
  },

  proceedNextLevel() {
    this._level++;
    this._renderHeadingContent(`Level ${this._level}`);

    this._generatePattern();
    this._renderLastPattern();

    this._question = 0;
  },

  _validatePlayerAnswer(btnEl) {
    const answer = btnEl.id.slice(0, -3);

    if (this._cpuMemory[this._question] !== answer) {
      this._gameOver();
    } else {
      this._question++;
      if (!this._cpuMemory[this._question])
        setTimeout(this.proceedNextLevel.bind(this), nextLvlPause);
    }
  },

  _resetGame() {
    this._cpuMemory = [];
    this._level = 0;
  },

  _gameOver() {
    bodyEl.classList.add("gameover");

    setTimeout(function () {
      bodyEl.classList.remove("gameover");
    }, 70);

    this._renderHeadingContent(`Game Over !!`);

    this._resetGame();
  },

  init() {
    this._renderHeadingContent("Press 'Space' to Start");

    window.addEventListener("keydown", handleSpaceKeyDown);

    gameBtnsContainer.addEventListener(
      "click",
      function (e) {
        const selectedButton = e.target.closest("button");
        if (!selectedButton) return;

        this._validatePlayerAnswer(selectedButton);

        btnClickAnimation(selectedButton);
      }.bind(this)
    );
  },
};

simonGame.init();
