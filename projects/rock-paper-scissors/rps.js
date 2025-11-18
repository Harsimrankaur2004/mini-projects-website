const playBtn = document.querySelector(".play-game");
const resetBtn = document.querySelector(".reset-btn");
const gameBoxes = document.querySelectorAll(".game-box");
const gameBoxRock = document.querySelector(".game-box-rock");
const gameBoxPaper = document.querySelector(".game-box-paper");
const gameBoxScissors = document.querySelector(".game-box-scissors");
const computerBox = document.querySelector(".computer-box");
const resultElement = document.querySelector(".result");
const scoreElement = document.querySelector(".score");
let interval;
let computerMove;

const moves = {
  rock: {
    beats: "scissors",
    img: "images/rock.png",
    label: "ROCK",
    class: "game-box-rock",
  },
  paper: {
    beats: "rock",
    img: "images/paper.png",
    label: "PAPER",
    class: "game-box-paper",
  },
  scissors: {
    beats: "paper",
    img: "images/scissors.png",
    label: "SCISSORS",
    class: "game-box-scissors",
  },
};

let savedScore = JSON.parse(localStorage.getItem("score"));

let score = savedScore || {
  win: 0,
  losses: 0,
  tie: 0,
};

if (savedScore) {
  resultElement.style.display = "block";
  scoreElement.style.display = "block";
  resultElement.textContent = "Last Game Result";
  scoreElement.textContent = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
}

playBtn.addEventListener("click", () => {
  playBtn.textContent = "CHOOSE ONE SIGN";
  gameBoxes.forEach((gameBox) => {
    gameBox.style.pointerEvents = "all";
    gameBox.style.cursor = "pointer";
  });
  updateGameBoxdisplay();
});

function playerChoice(playerMove) {
  gameBoxes.forEach((gameBox) => {
    gameBox.style.display = gameBox.classList.contains(`game-box-${playerMove}`)
      ? "inline-block"
      : "none";
  });
}

gameBoxes.forEach((gameBox) => {
  gameBox.addEventListener("click", () => {
    const choice = gameBox.classList.contains("game-box-rock")
      ? "rock"
      : gameBox.classList.contains("game-box-paper")
      ? "paper"
      : "scissors";

    playerChoice(choice);

    interval = setInterval(() => {
      computerMove = pickComputerMove();
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      playGame(choice, computerMove);
    }, 3000);
    playBtn.textContent = "PLAY AGAIN";
    gameBox.style.pointerEvents = "none";
  });
});

function pickComputerMove() {
  const movesName = Object.keys(moves);
  const randomIndex = Math.floor(Math.random() * movesName.length);
  const computerMove = movesName[randomIndex];
  const moveData = moves[computerMove];

  // removes any other existing class
  computerBox.className = "computer-box";

  computerBox.classList.add(moveData.class);
  computerBox.style.display = "inline-block";
  computerBox.querySelector("img").src = moveData.img;
  computerBox.querySelector("p").textContent = moveData.label;

  return computerMove;
}

function playGame(playerMove, computerMove) {
  let result;

  if (playerMove === computerMove) {
    result = "It's a Tie";
    score.tie++;
  } else if (moves[playerMove].beats === computerMove) {
    score.win++;
    result = "You Win!";
  } else {
    score.losses++;
    result = "You Lose!";
  }

  resetBtn.style.display = "inline-block";
  resultElement.style.display = "block";
  scoreElement.style.display = "block";
  resultElement.textContent = result;
  scoreElement.textContent = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
  localStorage.setItem("score", JSON.stringify(score));
}

resetBtn.addEventListener("click", () => {
  score = {
    win: 0,
    losses: 0,
    tie: 0,
  };

  scoreElement.textContent = `Wins: ${score.win}, Losses: ${score.losses}, Ties: ${score.tie}`;
  resultElement.style.display = "none";
  scoreElement.style.display = "none";
  localStorage.removeItem("score");

  gameBoxes.forEach((gameBox) => {
    gameBox.style.pointerEvents = "none";
  });

  resetBtn.style.display = "none";
  playBtn.textContent = "PLAY GAME";
  updateGameBoxdisplay();
});

function updateGameBoxdisplay() {
  gameBoxes.forEach((box) => (box.style.display = "inline-block"));
  computerBox.style.display = "none";
}
