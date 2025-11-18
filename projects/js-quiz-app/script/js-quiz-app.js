import { quizData } from "./data.js";

const quesElement = document.querySelector(".js-ques");
const ansBtns = document.getElementById("js-ans-btns");
let nxtBtn = document.querySelector(".nxt-btn");
const strtBtn = document.querySelector(".js-strt-agn");
const jsScore = document.querySelector(".js-score");

let currentQuesIndex = 0;
let score = 0;

showQues();

function showQues() {
  const currentQues = quizData[currentQuesIndex];
  const quesNum = currentQuesIndex + 1;
  quesElement.textContent = "Q" + quesNum + ". " + currentQues.question;
  
  ansDisappear(); // Clears previous answer buttons before generating new ones

  currentQues.options.forEach(option => {
    ansBtns.innerHTML += `
      <button class="btn">${option}</button>
    `;
  });

  const allbtns = document.querySelectorAll(".btn");

  allbtns.forEach(button => {
    // Mark the correct answer using data attribute for validation
    if (button.textContent === currentQues.answer) {
      button.dataset.answer = true;
    }

    button.addEventListener("click", selectAns);
  });
}

nxtBtn.addEventListener("click", () => {
  // If last question is reached, end the quiz and show score
  if (currentQuesIndex >= quizData.length - 1) {
    quesElement.textContent = "Quiz Finished!";
    ansDisappear(); // Remove last question's buttons
    nxtBtn.style.display = "none";
    jsScore.style.display = "block";
    jsScore.textContent = "You Scored " + score + " out of 10";
    // document.querySelector(".js-ques-container").style.height = "auto";
  } else {
    // Move to next question
    currentQuesIndex++;
    nxtBtn.textContent = "Next";
    showQues();
  }

  // Update button label to "Submit" on last question
  if (currentQuesIndex > 8) {
    nxtBtn.textContent = "Submit";
  }
});

strtBtn.onclick = () => {
  // Reset quiz state to start from beginning
  currentQuesIndex = 0;
  score = 0;
  nxtBtn.style.display = "inline";
  nxtBtn.textContent = "Next";
  jsScore.style.display = "none";
  // document.querySelector(".js-ques-container").style.height = "300px";
  showQues();
};

function selectAns(e) {
  const selectAns = e.target;
  const isCorrect = selectAns.dataset.answer;

  if (isCorrect) {
    selectAns.classList.add("correct");
    score++;
  } else {
    selectAns.classList.add("incorrect");
  }

  const allbtns = document.querySelectorAll(".btn");

  allbtns.forEach(button => {
    // Show the correct answer even if user selects wrong
    if (button.dataset.answer) {
      button.classList.add("correct");
    }

    // Lock all options after selection
    button.disabled = true;
  });
}

// Utility function to clear the answer buttons
function ansDisappear() {
  ansBtns.innerHTML = "";
}