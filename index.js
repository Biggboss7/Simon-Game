"use strict";

// Target Elements
const gameHeadingEl = document.querySelector("h1");
const gameBtnsContainer = document.querySelector(".game-arena");
const bodyEl = document.body;

// Configuration
const startKey = "Space";

const nextLvlPause = 500; // 0.5s
const beepEffectPause = 100; // 0.1s

const soundFilePath = "./sounds/";
const gameOverSoundPath = "wrong";
const soundFileExt = ".mp3";

// Helper Function
const randomIndex = totalIndex => Math.floor(Math.random() * totalIndex);

const implementSoundEffect = function (btnEl) {
  const audio = new Audio(
    `${soundFilePath}${
      !bodyEl.classList.contains("gameover")
        ? btnEl.id.slice(0, -3)
        : gameOverSoundPath
    }${soundFileExt}`
  );

  audio.play();
};

const beepEffect = function (el, className, pause = beepEffectPause) {
  el.classList.add(className);

  setTimeout(function () {
    el.classList.remove(className);
  }, pause);
};

const btnClickAnimation = function (btnEl) {
  implementSoundEffect(btnEl);

  beepEffect(btnEl, "pressedkey");
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

    implementSoundEffect(lastBtnEl);

    beepEffect(lastBtnEl, "selectedkey");
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
    beepEffect(bodyEl, "gameover");

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
