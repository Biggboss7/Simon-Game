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

const patternGenerator = function () {
  const colorList = ["red-id", "yellow-id", "green-id", "blue-id"];
  const randomIndex = Math.floor(Math.random() * 4);
  const pickedColor = colorList[randomIndex];
  memory.push(pickedColor);
  amountOfQuestion = memory.length;
  $(`#${pickedColor}`).addClass("selectedkey");
  setTimeout(function () {
    $(`#${pickedColor}`).removeClass("selectedkey");
  }, 150);
  makeSound(pickedColor);
};

const clickAnimation = function () {
  const selectedButton = $(this);
  selectedButton.addClass("pressedkey");
  setTimeout(function () {
    selectedButton.removeClass("pressedkey");
  }, 70);
};

const changeLevel = function () {
  level++;
  $("h1").text(`Level ${level}`);
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

const makeSound = function (key) {
  let audio;
  switch (key) {
    case "red-id":
      audio = new Audio("sounds/red.mp3");
      break;
    case "blue-id":
      audio = new Audio("sounds/blue.mp3");
      break;
    case "yellow-id":
      audio = new Audio("sounds/yellow.mp3");
      break;
    case "green-id":
      audio = new Audio("sounds/green.mp3");
      break;
  }
  audio.play();
};

let memory = [];
let amountOfQuestion;
let number = 0;
let level = 1;

$(document).one("keypress", startGame);
$(document).one("tap", startGame);
$(".btn").on("click", clickAnimation);
$(".btn").on("click", selectAnswer);
