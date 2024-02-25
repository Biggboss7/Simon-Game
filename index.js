"use strict";

// Target Elements
const gameHeadingEl = document.querySelector("h1");
const gameBtnsContainer = document.querySelector(".game-arena");
const bodyEl = document.body;

const currentScoreEl = document.querySelector(".current--score");
const highScoreEl = document.querySelector(".high--score");

const btnOk = document.querySelector(".btn--ok"); // Button to Restart

// Configuration
const startKey = "Space";

const nextStagePause = 500; // 0.5s
const beepEffectPause = 150; // 0.1s

const soundFilePath = "./sounds/";
const gameOverSoundPath = "wrong";
const soundFileExt = ".mp3";

const storageID = "highScore"; // ID of Local Storage Key to preserve High Score

// Helper Function
const randomIndex = totalIndex => Math.floor(Math.random() * totalIndex);

const renderContent = (el, content) => {
  el.innerHTML = content;
};

const implementSoundEffect = function (btnEl) {
  const audio = new Audio(
    `${soundFilePath}${
      !bodyEl.classList.contains("gameover")
        ? btnEl.id.slice(0, -3) // this function is to exclude the STRING "-id" from btnEl.id
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

  simonGame.startGame();

  setTimeout(simonGame.proceedNextLevel.bind(simonGame), nextStagePause);

  window.removeEventListener("keydown", handleSpaceKeyDown);
};

// Simon Game Apps
const simonGame = {
  _level: 0,
  _colorList: ["red", "yellow", "green", "blue"],
  _cpuMemory: [],
  _question: 0,
  _currentScore: 0,

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

  _addScore() {
    this._currentScore += 5;
  },

  _setHighScore() {
    if (this._currentScore <= this._highScore) return;

    this._highScore = this._currentScore;
    localStorage.setItem(storageID, this._highScore);

    renderContent(highScoreEl, this._highScore);
  },

  startGame() {
    renderContent(gameHeadingEl, `Level ${this._level}`);

    gameBtnsContainer.classList.remove("hidden");

    gameBtnsContainer.addEventListener(
      "click",
      function (e) {
        // This Function is used to stop MULTIPLE SAME EVENT to be triggered (CHECK ON MDN DOC)
        e.stopImmediatePropagation();

        const selectedButton = e.target.closest("button");
        if (!selectedButton) return;

        this._validatePlayerAnswer(selectedButton);

        btnClickAnimation(selectedButton);
      }.bind(this)
    );
  },

  _restartGame() {
    this._resetGameData();
    this._resetGameView();

    this.init();
  },

  proceedNextLevel() {
    this._level++;
    renderContent(gameHeadingEl, `Level ${this._level}`);

    this._generatePattern();
    this._renderLastPattern();

    this._question = 0;
  },

  _validatePlayerAnswer(btnEl) {
    const answer = btnEl.id.slice(0, -3);

    if (this._cpuMemory[this._question] !== answer) {
      this._gameOver();
    } else {
      this._addScore();
      renderContent(currentScoreEl, this._currentScore);

      this._question++;

      // Check Remaining Question. If no, then go to next level
      if (!this._cpuMemory[this._question])
        setTimeout(this.proceedNextLevel.bind(this), nextStagePause);
    }
  },

  _resetGameData() {
    this._cpuMemory = [];
    this._level = 0;
    this._currentScore = 0;
  },

  _resetGameView() {
    renderContent(gameHeadingEl, "Press 'Space' to Start");

    renderContent(currentScoreEl, this._currentScore);

    btnOk.classList.add("hidden");
  },

  _gameOver() {
    this._setHighScore();

    beepEffect(bodyEl, "gameover");

    renderContent(gameHeadingEl, `Game Over !!`);

    setTimeout(() => {
      gameBtnsContainer.classList.add("hidden");
      btnOk.classList.remove("hidden");
    }, nextStagePause);

    btnOk.addEventListener("click", this._restartGame.bind(this));
  },

  init() {
    window.addEventListener("keydown", handleSpaceKeyDown);

    // Preserve previous High Score
    this._highScore = +localStorage.getItem(storageID) || 0;
    renderContent(highScoreEl, this._highScore);
  },
};

simonGame.init();
