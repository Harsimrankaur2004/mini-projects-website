const emojis = ["🍎", "🍕", "🐻", "🤡", "🚲", "☃️", "🌤️", "✈️"];

let cardsArr = [...emojis, ...emojis];

let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let moves = 0;

const cardBox = document.querySelector(".cards");
const movesElement = document.querySelector(".moves");

function shuffle(array) {
  array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  shuffle(cardsArr);
  cardBox.innerHTML = "";
  cardsArr.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="front">${emoji}</div>
    <div class="back">
      <img src="image/card.png">
    </div>`;
    card.addEventListener("click", flipCard);
    cardBox.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  moves++;
  movesElement.textContent = `Moves: ${moves}`;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = (firstCard.querySelector(".front").textContent ===
    secondCard.querySelector(".front").textContent);
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  checkWin();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWin() {
  const flippedCards = document.querySelectorAll(".flip").length;
  setTimeout(() => {
    if (flippedCards === cardsArr.length) {
      alert(`You won in ${moves} moves!`)
    }
  }, 500);
}

function restartGame() {
  moves = 0;
  movesElement.textContent = `Moves: ${moves}`;
  createBoard();
}


createBoard();