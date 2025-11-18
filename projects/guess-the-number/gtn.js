let totalAttempts = 0;
let guessInput = document.getElementById("guessInput");
let submitBtn = document.getElementById("submit");
let feedback = document.querySelector(".feedback");
let attempts = document.querySelector(".attempts");
let restartBtn = document.querySelector(".restartBtn");
let alertBox = document.querySelector(".alert");

let randomNum = generateRandomNum();

submitBtn.addEventListener("click", () => {
  if(totalAttempts >= 9) {
    feedback.textContent = `Game Over! The number was ${randomNum}.`;
    submitBtn.disabled = true;
    guessInput.disabled = true;
  }
 
  let userGuess = Number(guessInput.value);
  if(!userGuess || isNaN(userGuess)) {
    feedback.textContent = "Please enter a valid number.";
  }

  if(userGuess === randomNum) {
    feedback.textContent = `Congratulations! You guessed it right. The number was ${randomNum}.`;
    submitBtn.disabled = true;
    guessInput.disabled = true;
  } else if(userGuess < 1 || userGuess > 100) {
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  } else if(userGuess < randomNum) {
    feedback.textContent = "Too low! Try a greater number.";
    attemptsTotal();
  } else if(userGuess > randomNum) {
    feedback.textContent = "Too high! Try a smaller number.";
    attemptsTotal();
  } 
  
});


restartBtn.addEventListener("click", () => {
  totalAttempts = 0;
  attempts.textContent = `Attempts: ${totalAttempts}`;
  feedback.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  randomNum = generateRandomNum();
});

function generateRandomNum() {
  const randomNum = Math.ceil(Math.random() * 100);
  return randomNum;
}

function attemptsTotal() {
  totalAttempts++;
  attempts.textContent = `Attempts: ${totalAttempts}`;
}

document.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    submitBtn.click();
  }
  });