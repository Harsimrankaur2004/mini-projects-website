export const projects = {
  "counter-app": {
    title: "Counter App",
    description:
      "A simple counter application to demonstrate basic DOM manipulation.",
    path: "../projects/counter-app/index.html",
    code: {
      html: `<!-- HTML for Counter App -->
<div class="counter-container">
    <h1>Counter</h1>
    <span id="value">0</span>
    <div class="button-group">
        <button class="btn decrease">Decrease</button>
        <button class="btn reset">Reset</button>
        <button class="btn increase">Increase</button>
    </div>
</div>`,
      css: `/* CSS for Counter App */
body {
    background-color: #1a1a2e;
}

h1, span{
  color: white;
}

.counter-container {
    text-align: center;
    margin-top: 100px;
}

#value {
    font-size: 4rem;
    display: block;
    margin-bottom: 20px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.btn {
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
}

.btn.decrease { 
    background-color: #e74c3c; 
    color: white; 
    border-color: #c0392b; 
}

.btn.reset { 
    background-color: #3498db; 
    color: white; 
    border-color: #2980b9; 
}

.btn.increase { 
    background-color: #2ecc71; 
    color: white; 
    border-color: #27ae60; 
}

@media (max-width: 430px) {
    .btn {
        padding: 8px 10px;
    }
}`,
      js: `// JavaScript for Counter App
let count = 0;
const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")) {
            count--;
        } else if (styles.contains("increase")) {
            count++;
        } else {
            count = 0;
        }
        value.textContent = count;
    });
});`,
    },
  },
  "todo-list": {
    title: "To-Do List",
    description:
      "A simple To-Do List application to manage your tasks. It demonstrates basic JavaScript concepts like event handling, DOM manipulation, and local storage.",
    path: "https://todolist-app-mini-project.netlify.app/",
    code: {
      html: `
<!-- HTML for To-Do-List -->
<div class="main">  
  <h1>My To-Do List</h1>  

  <div class="image">  
    <img src="image/woman-holding-clipboard.png">  
  </div>  

  <div class="todo-list-container">  
    <div class="input-container">  
      <div>  
        <input id="inputTask" type="text" placeholder="Add a new task...">  
      </div>  
      <button class="add-btn">Add</button>  
    </div>  

    <div class="todo-task-container"></div>  
  </div>  
</div>
`,
      css: `/* CSS for To-Do-List */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  caret-color: transparent;
}

body {
  background-color: #fff9e8;
}

/* For WebKit browsers (Chrome, Edge, Safari) */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.6);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: gray transparent;
}

.main {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 100px auto;
}

.main h1 {
  text-align: center;
}

.image {
  width: 80%;
  margin: 0 auto;
}

img {
  width: 100%;
  object-fit: contain;
}

.todo-list-container {
  width: 99%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
  margin: 0 auto;
  height: auto;
}

.input-container {
  display: flex;
  width: 333px;
  margin: 0 auto;
  margin-top: 10px;
}

input {
  padding: 15px;
  width: 332px;
  border-radius: 30px;
  border: 2px solid grey;
  font-size: 16px;
  outline: none;
  caret-color: auto;
}

.add-btn {
  color: #fff;
  background-color: rgb(2, 50, 139);
  padding: 15px 30px;
  margin-left: -100px;
  border: none;
  width: 100px;
  border-radius: 30px;
  font-size: inherit;
  font-weight: bold;
  cursor: pointer;
}

.todo-task-container {
  width: 333px;
  margin: 25px auto;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 250px;
}

.todo-task-box {
  display: flex;
  align-items: center;
  width: 332px;
  height: 50px;
  margin-left: 10px;
}

.done {
  text-decoration: line-through;
}

.check-box {
  width: 30px;
  height: 30px;
  text-align: center;
  vertical-align: middle;
  background-image: url("image/circle.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-right: 10px;
}

.checked {
  background-image: url("image/tick.svg");
  background-size: 100%;
  background-repeat: no-repeat;
}

.todo-task {
  flex: 0.9;
  font-size: 18px;
}

.todo-task-box select {
  outline: none;
}

.dlt-btn {
  width: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

@media (max-height: 670px) { 
  .todo-task-container{
    max-height: 200px;
  }
}

@media (max-height: 600px) { 
  .todo-task-container{
    max-height: 150px;
  }
}`,
      js: `// JavaScript for To-Do-List
let todoList = JSON.parse(localStorage.getItem('todoList')) || [
  { name: "Buy groceries", done: false },
  { name: "Read book", done: false }
];

// Ensures fallback data is stored
saveToStorage();

let inputTask = document.getElementById("inputTask");

// Isolated storage logic for reusability
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Shared task-add logic for click/enter
function addTasks() {
  let name = inputTask.value.trim();
  if (name === "") return;

  todoList.push({ name, done: false });
  saveToStorage();
  renderPage();
  inputTask.value = '';
}

// Handles Add button
document.querySelector(".add-btn").addEventListener("click", () => {
  addTasks();
});

// Handles Enter key press
inputTask.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTasks();
  }
});

// Main render function — refreshes UI fully
function renderPage() {
  const container =   document.querySelector(".todo-task-container");
  container.innerHTML = "";
  
  // Generate task markup
  todoList.forEach((todo, index) => {
    const box = document.createElement("div");
    box.classList = "todo-task-box";

    const check = document.createElement("div");
    check.classList = "check-box";
    todo.done ? check.classList.add("checked") : "";

    const task = document.createElement("div");
    task.classList = "todo-task";
    todo.done ? task.classList.add("done") : "";

    task.textContent = todo.name;

    const delBtn = document.createElement("button");
    delBtn.classList = "dlt-btn";
    delBtn.innerHTML =  \`<img src="image/delete.svg" alt="">\`;

    // Toggle done state
    check.addEventListener("click", () => {
      check.classList.toggle("checked");
      task.classList.toggle("done");
      todoList[index].done = check.classList.contains("checked");
      saveToStorage();
    });

    // Delete task on button click
    delBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderPage();
    });

    box.appendChild(check);
    box.appendChild(task);
    box.appendChild(delBtn);
    container.appendChild(box);
  });

}

// Initial render
renderPage();`,
    },
  },
  "js-quiz-app": {
    title: "JavaScript Quiz App",
    description:
      "A simple JavaScript Quiz application to test your knowledge. It demonstrates basic JavaScript concepts like event handling, DOM manipulation, and working with arrays and objects.",
    path: "../projects/js-quiz-app/index.html",
    code: {
      html: `<!-- HTML for JavaScript Quiz App -->
<div class="box">
  <h1>JavaScript Quiz</h1>
  <div class="ques-container js-ques-container">
    <div class="ques-box">
      <div class="js-ques">
      </div>
      <div id="js-ans-btns">
        
      </div>
    </div>
  </div>

  <button class="nxt-btn js-nxt-btn">
    Next
  </button>
  <div class="score js-score">
    YouScored 9 out of 10
  </div>
  <button class="strt-btn js-strt-agn">
    Start Again
  </button>
</div>
            `,
      css: `/* CSS for JavaScript Quiz App */
* {
  caret-color: transparent;
}

.box {
  background-color: #8b60f0ff;
  text-align: center;
  padding-top: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 600px;
  position: relative;
  margin: 75px auto;
}

h1{
  font-weight: bold;
}

.ques-container{
  position: relative;
  margin: 20px auto;
}

.ques-box {
  position: relative;
}

.btn{
  width: 90%;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 7px;
  text-align: start;
  font-size: 18px;
  background-color: rgba(231, 229, 229, 0.959);
}

.btn:disabled {
  opacity: 1;
  background-color: rgba(85, 82, 82, 0.96);
  color: white;
}

.btn:hover:not([disabled]) {
  background-color: rgba(19, 18, 18, 0.3);
  color: white;
}

.ques-box>:nth-child(1) {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
}

.nxt-btn, .strt-btn {
  border: none;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  padding: 8px 15px 6px;
  color: #fff;
  background-color: #22b3ab;
  box-shadow: 0px 0px 10px #413f3f;
}

.strt-btn{
  margin-bottom: 20px;
  margin-left: 5px;
}

.score {
  font-size: 20px;
  font-weight: bold;
  display: none;
  margin-bottom: 15px;
}

.correct{
  background-color: #9aeabc !important;
  border: none;
}
.incorrect{
  background-color: #ff9393 !important;
  border: none;
}

.btn,
.nxt-btn,
.strt-btn{
  cursor: pointer;
}
            `,
      js: `// JavaScript for JavaScript Quiz App
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
    ansBtns.innerHTML += \`
      <button class="btn">\${option}</button>
    \`;
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
}`,
    },
  },
  calculator: {
    title: "Calculator",
    description:
      "A simple calculator application to perform basic arithmetic operations. If you press 'c' key, it will clear the screen and if you press 'Enter' key, it will evaluate the expression.",
    path: "../projects/calculator/index.html",
    code: {
      html: `<!-- HTML for Calculator -->
<h1>Calculator</h1>
<div class="box">
  <input type="text" class="calculator-screen">
  <div class="calculator-keys-block">
    <div id="keys-row-1" class="key-row">
      <button class="key key-7">7</button>
      <button class="key key-8">8</button>
      <button class="key key-9">9</button>
      <button class="key key-divide operator">/</button>
    </div>
    <div id="keys-row-2" class="key-row">
      <button class="key key-4">4</button>
      <button class="key key-5">5</button>
      <button class="key key-6">6</button>
      <button class="key key-multiply operator">*</button>
  </div>
    <div id="keys-row-3" class="key-row">
      <button class="key key-1">1</button>
      <button class="key key-2">2</button>
      <button class="key key-3">3</button>
      <button class="key key-subtract operator">-</button>
    </div>
    <div id="keys-row-4" class="key-row">
      <button class="key key-0">0</button>
      <button class="key key-decimal">.</button>
      <button class="key key-equals">=</button>
      <button class="key key-add operator">+</button>
    </div>
    <div id="keys-row-5" class="key-row">
      <button class="key key-clear">Clear</button>
    </div>
</div>`,
      css: `/* CSS for Calculator */
h1 {
  margin-top: 50px;
  text-align: center;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #1a1a2e;
}

.box {
  width: 300px;
  height: 100%;
  background-color: #20bef3ff;
  padding: 20px 20px 7px;
  border-radius: 10px;
  border: 15px solid #20bef3ff;
  box-shadow: inset 0 0 15px #000000aa;
  margin: 0 auto;
}

.calculator-screen {
  width: 100%;
  height: 60px;
  background-color: #504e4eff;
  color: #0ff;
  font-size: 32px;
  text-align: right;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

.calculator-keys-block{
  margin: 20px 0;
}

.key {
  width: 60px;
  height: 60px;
  margin: 8px 5px;
  font-size: 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#keys-row-1 .key{
  background-color: #67f8b0ff;
  box-shadow: 0 7px #0ab57cff;
}

#keys-row-2 .key{
  background-color: #eef139ff;
  box-shadow: 0 7px #c6c20aff;
}

#keys-row-3 .key{
  background-color: #f2a93dff;
  box-shadow: 0 7px #c56b0aff;
}

#keys-row-4 .key{
  background-color: #f26fdcff;
  box-shadow: 0 7px #e235a9ff;
}

#keys-row-4 .key-equals {
  background-color: #6b065aff;
  color: #fff;
  box-shadow: 0 7px #430338ff;
}

.key-clear {
  width: 90px;
  background-color: #ff5c5cff;
  box-shadow: 0 7px #c50a0aff;
}

@media (max-width: 430px) {
  .box {
    width: 200px;
  }

  .key {
   width: 35px;
    height: 35px;
  }

  .key-clear {
  width: 90px;
  }
}`,
      js: `// JavaScript for Calculator
let calculatorKey = document.querySelectorAll(".key");

calculatorKey.forEach((key) => {
  key.addEventListener("click", () => {
    let screen = document.querySelector(".calculator-screen");
    let keyValue = key.textContent;
    if (keyValue === "=") {
      try{
        screen.value = eval(screen.value);
      }catch {
        screen.value = "Error";
      }
    } else if (keyValue === "Clear") {
      screen.value = "";
    } else {
      screen.value += keyValue;
    }
  });
});

document.addEventListener("keydown", e => {
  if(e.key === "Enter"){
    document.querySelector(".key-equals").click();
    e.preventDefault();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "c") {
    document.querySelector(".key-clear").click();
    e.preventDefault();
  }
});`,
    },
  },
  "color-flipper": {
    title: "Color Flipper",
    description:
      "A simple Color Flipper application to change the background color randomly. It demonstrates basic JavaScript concepts like event handling and DOM manipulation.",
    path: "../projects/color-flipper/index.html",
    code: {
      html: `<!-- HTML for Color Flipper -->
<div class="container">
  <h1>Color Flipper</h1>
  <div class="box">
    <div id="color">Background Color: #31c9e4</div>
  </div>
  <span>Click me to change the color</span>
  <button id="btn">Flip Color</button>
</div>`,
      css: `/* CSS for Color Flipper */
body {
  background-color: #fff;
  margin: 0;
  padding: 0;
}

.container {
  text-align: center;
  margin-top: 100px;
}

.box {
  width: 350px;
  height: 150px;
  margin: 0 auto 20px;
  background-color: #31c9e4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.box div {
  font-family: 'Arial', sans-serif;
  color: #1b1919;
  font-size: 18px;
}

span {
  font-family: 'Arial', sans-serif;
  color: #555;
  margin-right: 10px;
}

#btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #3e454d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

@media (max-width: 400px) {
  .container {
    width: 320px;
    margin: 100px auto;
  }
  
  .box {
    width: 300px;
  }

  #btn {
    margin-top: 10px;
  }
}`,
      js: `// JavaScript for Color Flipper
const color = ["#31c9e4", "#e831c9", "#c9e831", "#e8c931", "#31e8c9", "#c931e8"];

document.getElementById("btn")
  .addEventListener("click", () => {
    const randomColor = Math.floor(Math.random() * color.length);
    document.querySelector(".box")
      .style.backgroundColor = color[randomColor];
    document.getElementById("color")
      .textContent = \`Background Color: \${color[randomColor]}\`;
  });`,
    },
  },
  "joke-generator": {
    title: "Joke Generator",
    description:
      "A simple Joke Generator application to fetch and display random jokes. It demonstrates the use of an external API to retrieve jokes.",
    path: "../projects/joke-generator/index.html",
    code: {
      html: `<!-- HTML for Joke Generator -->
<div class="container">
  <h1>Joke Generator</h1>
  <div class="box">
    <button id="jokeBtn">Get a Joke</button>
    <p id="jokeDisplay">A programmer puts two glasses on his bedside table before going to sleep. - A full one, in case he gets thirsty, and an empty one, in case he doesn’t.</p>
  </div>
</div>`,
      css: `/* CSS for Joke Generator */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f7f7;
}

.container {
  margin: 100px auto;
  width: 400px;
  height: 280px;
  text-align: center;
  padding: 20px 0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.box {
  background-color: #a3d3ff;
  padding: 20px;
  border-radius: 10px;
  width: 75%;
  height: 150px;
  margin: 0 auto;
}

#jokeBtn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #324de6;
  color: white;
  cursor: pointer;
}

@media (max-width: 450px) {
  .container {
    width: 300px;
  }
}`,
      js: `// JavaScript for Joke Generator
document.getElementById("jokeBtn")
  .addEventListener("click", async () => {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke = await response.json();
    document.getElementById("jokeDisplay")
      .innerText = \`\${joke.setup} - \${joke.punchline}\`;
  });`,
    },
  },
  "modal-popup": {
    title: "Modal Popup",
    description:
      "A clean and modern modal popup design for websites, perfect for alerts, confirmations or forms.",
    path: "../projects/modal-popup/index.html",
    code: {
      html: `<!-- HTML for Modal Popup -->
<div class="container">
  <div class="box">
    <p>If you agree with these conditions then click the button below.</p>
    <button id="agreeBtn">Agree</button>
  </div>
  <div class="popup">
    <h2>Thank you!</h2>
    <p>You've signed up successfully. Now you can enjoy the servies of the app.</p>
    <button id="okBtn">Ok</button>
  </div>
</div>`,
      css: `/* CSS for  Modal Popup */
* {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  /* background-color: #8a2be2; */
}

.container {
  background: linear-gradient(125deg, #7e008a, #db0260);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.box:first-child {
  width: 300px;
  font-size: 18px;
  color: white;
}

.box :nth-child(2) {
  background-color: rgb(255, 0, 0);
  color: rgb(255, 246, 246);
  border: none;
  width: 100px;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  font-size: 16px;
  cursor: pointer;
}

.popup {
  position: absolute;
  top: 0;
  padding: 50px;
  transform: translate(0, -45%) scale(0.1);
  border-radius: 10px;
  width: 200px;
  background-color: white;
  visibility: hidden;
  transition: transform 0.4s, top 0.4s;
}

.open-popup {
  transform: translate(0, -45%) scale(1);
  top: 40%;
  visibility: visible;
}

.popup p {
  margin: 20px 0 35px;
}

.popup button {
  background-color: #7e008a;
  color: white;
  border: none;
  width: 100px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}`,
      js: `// JavaScript for Modal Popup 
const popup = document.querySelector(".popup");
const agreeBtn = document.getElementById("agreeBtn");
const okBtn = document.getElementById("okBtn");

agreeBtn.addEventListener("click", () => {
  popup.classList.add("open-popup");
});

okBtn.addEventListener("click", () => {
  popup.classList.remove("open-popup");
});`,
    },
  },
  "weather-website": {
    title: "Weather Website",
    description:
      "A simple Weather Website application to fetch and display current weather information for a specified city. If you press 'Enter' after typing the city name, it will fetch the weather data. It demonstrates the use of an external API (OpenWeatherMap) to retrieve real-time weather data.",
    path: "https://weather-website-mini-project.netlify.app/",
    code: {
      html: `<!-- HTML for Weather Website -->
<div class="card">
  <h1>Weather Detector</h1>

  <div class="search">
    <input class="js-search-bar" type="text" placeholder="Enter city name/ default: New York" spellcheck="false">
    <button class="js-search-button" >
      <img src="images/search-icon.svg">
    </button>
  </div>

  <div class="error js-error"> 
  </div>

  <div class="weather">
    <p class="temp js-temp">19°C</p>
    <p class="city js-city">New York</p>

    <div class="weather-detail-box">
      <div class="weather-details">

        <div class="humidity-col">
          <div class="humidity-image">
            <img src="images/humidity.png">
          </div>
          <div class="humidity-details">
            <p class="humidity-per js-humidity-per">80%</p>
            <p class="humidity">Humidity</p>
          </div>
        </div>

        <div class="wind-col">
          <div class="wind-image">
            <img src="images/wind.png">
          </div>
          <div class="wind-details">
            <p class="wind-speed js-wind-speed">2.44 km/h</p>
            <p class="wind">Wind Speed</p>
          </div>
        </div>
      </div>       

      <div>
        <div class="weather-image">
          <img src="" class="js-weather-icon">
        </div>

        <div class="js-weather-status weather-status">
        </div>
      </div>
      
    </div>
  </div>
</div>`,
      css: `/* CSS for Weather Website */
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body{
  
  background: #222;
}

.card{
  background: linear-gradient(135deg, rgb(140, 140, 221), rgb(82, 158, 184), green);
  width: 470px;
  max-width: 90%;
  margin: 50px auto;
  padding: 40px 35px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
}

h1{
  margin-bottom: 20px;
}

.search{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.search input{
  height: 60px;
  border-radius: 30px;
  outline: 0;
  flex: 1;
  border: 0;
  padding: 10px;
  font-size: 18px;
  background: #ebfffc;
  color: #555;
  margin-right: 15px;
}

.search button{
  border-radius: 30px;
  height: 60px;
  width: 60px;
  outline: 0;
  border: 0;
  background: #ebfffc;
  cursor: pointer;
}

.search button img{
  width: 18px;
}

.error{
  text-align: left;
  font-size: 20px;
  margin-top: 10px;
}

.weather{
  margin-top: 20px;
}

.temp{
  font-size: 80px;
  font-weight: 550;
}

.city{
  font-size: 45px;
  margin-top: -6px;
}

.weather-detail-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-details{
  width: 170px;
}

.humidity-col{
  margin-top: 50px;
  width: 100%;
  text-align: center;
  margin-left: 20px;
}

.wind-col{
  width: 100%;
  text-align: center;
  margin-top: 15px;
  margin-left: 20px;
}

.humidity-image, .wind-image{
  width: 100%;
}

.humidity-image img, .wind-image img{
  width: 70px;
}

.humidity-details, .wind-details{
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
}

.humidity-per{
  font-size: 30px;
}

.wind-details{
  margin-top: 10px;
  width: 170px;
}

.humidity, .wind, .wind-speed{
  font-size: 25px;
}

.weather-image{
  width: 200px;
}

.weather-image img{
  width: 80%;
}

.weather-status{
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 425px) {
  h1{
    font-size: 30px;
  }
  .search input{
    flex-direction: row;
    width: 170px;
  }

  .humidity-image img, .wind-image img{
    width: 50px;
  }

  .humidity-col, .wind-col{
    width: 100px
  }
  .humidity-per, .humidity, .wind, .wind-speed{
    font-size: 15px;
  }

  .wind-details{
    width: 100px;
  }
  
  .humidity-details{
    width: 100px;
  }

  .weather-image{
    width: 120px;
  }


  .temp{
    font-size: 60px;
  }

  .city{
    font-size: 35px;
  }
}`,
      js: `// JavaScript for Weather Website
const apiKey = "7caabc9abb52cb2d94f3517edd26892e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBar = document.querySelector('.js-search-bar')
const searchBtn = document.querySelector('.js-search-button')

searchBtn.addEventListener('click', () => {
  checkWeather(searchBar.value);
});

searchBar.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    checkWeather(searchBar.value);
  }
});


async function checkWeather(city) {
  const response = await fetch(apiUrl + \`&appid=\${apiKey}\` + \`&q=\${city}\`);

  if (response.status === 404) {
    document.querySelector('.js-error')
      .innerHTML = \`<p>Invalid City.</p>\`;
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  let data = await response.json();

  document.querySelector('.js-error')
    .innerHTML = '';
    document.querySelector('.weather').style.display = 'block'; 

  document.querySelector('.js-temp')
    .innerHTML = \`\${Math.round(data.main.temp)}°C\`;
  document.querySelector('.js-city')
    .innerHTML = data.name;
  document.querySelector('.js-humidity-per')
    .innerHTML = \`\${data.main.humidity}%\`;
  document.querySelector('.js-wind-speed')
    .innerHTML = \`\${data.wind.speed} km/h\`;


  let weatherStatus = data.weather[0].main;
  document.querySelector('.js-weather-icon')
    .src = \`images/\${weatherStatus.toLowerCase()}.png\`;
  document.querySelector('.js-weather-status')
    .innerHTML = weatherStatus;
}

checkWeather('New York');`,
    },
  },
  "guess-the-number": {
    title: "Guess The Number",
    description:
      "A simple Guess The Number game where the player has to guess a randomly generated number within a certain range. If you press 'Enter' after typing your guess, it will submit the guess. If you reach 10 attempts without guessing correctly, the game will end. It demonstrates basic JavaScript concepts like event handling, DOM manipulation, and random number generation.",
    path: "../projects/guess-the-number/index.html",
    code: {
      html: `<!-- HTML for Guess The Number -->
<div class="box">
  <h1>Guess the Number</h1>
  <div class="message">I'm thinking of a number between 1 and 100. Can you guess it?</div>
  <input id="guessInput" placeholder="Enter your guess" />
  <button type="submit" id="submit">Submit</button>
  <p class="feedback"></p>
  <p class="attempts">Attempts: 0</p>
  <button class="restartBtn">Restart Game</button>
  <p class="alert">You can only enter numbers from 1 to 100.</p>
</div>`,
      css: `/* CSS for Guess The Number */
body {
  text-align: center;
  background: linear-gradient(130deg, #12bfde, #7fff24);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 500px;
  margin: 50px auto;
  color: #000b58;
  padding: 20px 30px;
}

.message {
  margin: 20px auto;
  position: relative;
  width: 300px;
  color: #000b58;
  padding: 20px 30px;
  border-radius: 15px;
  background-color: rgba(240, 248, 255, 0.6);
  box-shadow: 0 0 5px rgba(102, 135, 243, 0.8);
}

.message::after {
  content: "";
  position: absolute;
  border: 5px solid rgba(240, 248, 255, 0.6);
  top: -8px;
  left: -8px;
  bottom: -8px;
  right: -8px;
  border-radius: 22px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  margin: 10px 0;
}

input {
  padding: 17px 15px;
  font-size: 1em;
  border: none;
  border-radius: 25px;
  width: 300px;
  margin-right: -45px;
  outline: none;
  filter: drop-shadow(2px 4px 2px #706f6f);
}

#submit {
  background: linear-gradient(100deg, #eea318, #ff2445);
  color: white;
  border: none;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
  filter: drop-shadow(2px 4px 2px #706f6f);
}

.restartBtn {
  background-color: #219995;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 4px #39ebe5;
}

.attempts {
  margin: 20px auto 25px;
}

.alert {
  color: red;
  display: none;
  font-weight: bold;
  margin-top: 10px;
}

.feedback {
  color: purple;
  font-weight: bold;
}

@media (max-width: 346px) {
  #submit {
    width: 65px;
    height: 65px;
    font-size: 0.9em;
  }
}

@media (max-width: 600px) {
  .box, .message, input {
    width: 70%
  }
}`,
      js: `// JavaScript for Guess The Number
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
    feedback.textContent = \`Game Over! The number was \${randomNum}.\`;
    submitBtn.disabled = true;
    guessInput.disabled = true;
  }
 
  let userGuess = Number(guessInput.value);
  if(!userGuess || isNaN(userGuess)) {
    feedback.textContent = "Please enter a valid number.";
  }

  if(userGuess === randomNum) {
    feedback.textContent = \`Congratulations! You guessed it right. The number was \${randomNum}.\`;
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
  attempts.textContent = \`Attempts: \${totalAttempts}\`;
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
  attempts.textContent = \`Attempts: \${totalAttempts}\`;
}

document.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    submitBtn.click();
  }
});`,
    },
  },
  clock: {
    title: "Clock",
    description:
      "A simple Clock application that displays the current time and updates every second.",
    path: "../projects/clock/index.html",
    code: {
      html: `<!-- HTML for Clock -->
<div class="box">
  <h1>Clock</h1>
  <div class="time"></div>
</div>
<button class="switch">Switch to 12hrs</button>`,
      css: `/* CSS for Clock */
body {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  text-align: center;
  height: 100vh;
}

.box {
  margin: 100px auto;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  width: 300px;
  color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.time {
  font-size: 45px;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #24b4f7;
  color: white;
  box-shadow: 0 4px 15px rgba(36, 180, 247, 0.4);
}

@media (max-width: 390px) {
  .box {
    width: 270px;
  }
}`,
      js: `// JavaScript for Clock
let is24hrs = true;
let switchBtn = document.querySelector(".switch");

switchBtn.addEventListener("click", () => {
  is24hrs = !is24hrs;
  switchBtn.innerText = is24hrs ? "Switch to 12hrs" : "Switch to 24hrs";
  updateTime();
});

function updateTime() {
  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  let ampm = "";

  if(!is24hrs) {
    ampm = h < 12 ? "AM" : "PM";
    h = h % 12;
    if(h === 0) {
      h = 12;
    } else {
      h = h;
    }
  }
    
  document.querySelector(".time")
    .innerText = \`\${pad(h)}:\${pad(m)}:\${pad(s)} \${!is24hrs ? ampm : ''}\`;
}

setInterval(() => {
  updateTime();
},1000);

function pad(num) {
  return num < 10 ? "0" + num : num; 
}`,
    },
  },
  "typing-website": {
    title: "Typing Website",
    description:
      "A mini typing speed test project built with HTML, CSS, and JavaScript. It displays random words, tracks your WPM (words per minute) and accuracy in real time, and includes a timer and restart option.",
    path: "https://typing-website-mini-project.netlify.app/",
    code: {
      html: `<!-- HTML for Typing Website -->
<div class="box">
  <h2>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="rgb(255, 145, 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>        
    Type this sentence</h2>
  <div class="word-box">
    <div class="cursor"></div>
    <div class="words"></div>
     <input id="hidden-input" type="text" autocapitalize="off" autocomplete="off" spellcheck="false">
  </div>
  <div class="flex">
    <div>
      <div>Timer:</div>
      <div id="time">00:00</div>
    </div>
    <div>
      <div class="wpm">wpm: 00</div>
      <button class="restart">Restart</button>
    </div>
    <div class="accuracy">Accuracy: 00%</div>
  </div>
</div>`,
      css: `/* CSS for Typing Website */
body {
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hidden-input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 5px;
}

.box {
  background-color: #333;
  color: rgb(255, 145, 0);
  width: 80vw;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px black;
  font-family: Arial, Helvetica, sans-serif;
}

.word-box {
  border: 2px solid white;
  padding: 10px;
  border-radius: 10px;
  position: relative;
}

.grey-box {
  filter: grayscale(1);
  pointer-events: none;
}

.words div{
  font-size: 25px;
  display: inline-block;
  color: rgba(239, 165, 67, 0.4);
  font-family: "Roboto Mono", monospace;
}

.cursor {
  background-color: red;
  width: 2px;
  height: 30px;
  position: absolute;
  top: 13px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.words {
  height: 135px;
  overflow: hidden;
}

.flex{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}

.restart {
  background-color: rgb(26, 26, 26);
  border: none;
  color: white;
  font-size: 20px;
  padding: 5px 14px;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
}

.correct {
  color: #fff;
}

.incorrect {
  color: red;
}

.wrong {
  background-color: red;
}`,
      js: `// JavaScript for Typing Website
const words = \`
apple river cloud light mouse dream stone quick brown jump smile chair plant sound space clean windy sharp ghost drift candy rain flame paper glass lucky ocean sweet funny watch brave fresh frost grape juice field match sleep dance clock brush tight magic storm night peace slide shine earth green happy clear yellow tiny large quiet soft fast slow blue pink black white rain sun sky bird tree fish grass road car bike book pen desk home door floor wall cup plate hand eye ear face hair mouth arm leg foot nose sand sea hill river leaf seed fire snow ice milk bread cake egg soup meat rice tea salt sugar city town village house park bridge street school class bench table light dark open close up down left right walk run jump sit stand talk read write play eat drink sing work rest sleep call help find look show stop start move stay build break cut join send keep give take feel smell touch taste know learn think love hate want need try wait hope dream hear see say tell ask answer push pull drive ride fly swim throw catch draw paint clean cook wash bake grow plant fix make use wear carry open close smile laugh cry yell shout win lose begin end change stay watch walk listen jump stand sit sleep rest wake move turn run move build find help call learn teach study count play read write speak laugh smile sing dance walk run talk watch cook bake clean wash paint draw fix cut open close drive ride swim fly jump throw catch sit stand sleep wake dream think feel love hate want need window planet future silver energy moment motion shadow memory whisper wonder travel escape hidden forest mountain valley beauty silence garden mirror rocket oceanic flavor golden silver system object number circle square power electric animal forest camera engine market people random stream family chance reason record nation travel guitar artist poetry number castle bridge energy reason forest broken planet shadow memory wonder breeze hunter chamber pocket castle prison market secret silver fallen window candle orange purple yellow violet market mirror planet forest dragon hidden rocket future animal camera puzzle action motion energy figure number bottle engine letter random symbol reason system charge pencil author reader office kitchen garden street corner bridge island tunnel canyon climber traveler hunter pirate sailor soldier captain general officer mission victory failure memory silence moment motion movement direction pattern channel signal volume surface texture feature control device charge electric battery wireless network browser server display monitor keyboard laptop charger system update upload download storage memory camera folder window option setting design project editor content version script syntax module function object return import export value method event element string number boolean array random filter reduce concat assign define create append remove update delete compute render layout format style border shadow margin padding height width center align justify display cursor scroll click hover focus submit reload refresh restart reset select toggle switch button input output screen cursor prompt browser window device sensor motion camera record stream volume audio player slider option control action search filter result random upload download connect server network cloud storage backup error signal timeout function return export import object method render layout position align shadow aesthetic algorithm ambiguous artificial astronomy biological catastrophic circumstance complexity consequence correlation cryptography determination discovery electricity environment exaggeration expression foundation hierarchy imagination independent instrument intelligence interaction interpret laboratory management metaphor motivation navigation observation perception philosophy population possibility prediction probability psychology realization revolution simulation situation structure technology transition university vocabulary volunteer architecture combination competition definition description education generation innovation leadership literature mathematics modification population preference profession relationship requirement responsible significant statistics temperature transmission typography application authentication calculation classification communication configuration conservation construction contradiction coordination determination documentation examination expectation foundation illustration implementation information integration interpretation investigation organization presentation representation reproduction specification synchronization transportation understanding visualization acknowledgment architecture circumference collaboration computation constellation cryptocurrency declaration decomposition discrimination distribution documentation identification justification manufacturing mathematical modification optimization parameter performance presentation reconciliation regulation simplification stimulation transformation visualization announcement architecture circumstance communication configuration consideration construction coordination determination documentation education implementation improvement information interaction interpretation investigation organization presentation representation responsibility satisfaction specification standardization synchronization transportation understanding visualization acknowledgment authentication characteristic collaboration computation constellation cryptography declaration demonstration discrimination distribution documentation engineering identification illumination investigation justification manufacturing mathematical optimization parameterization reconstruction simplification synchronization transformation visualization ! ? . , ; : ' " 1 2 3 4 5 6 7 8 9 0 ! ? . , ; : ' " 1 2 3 4 5 6 7 8 9 0 
\`.split(" ");

let timeStarted = false;
let isTimeUp = false;
let timeLeft = 300;
let timeInterval;
let correctKeyStroke = 0;
let typedKeyStroke = 0;
let finalWpm = "00";
let finalAccuracy = "00";
const wordsLength = words.length;

const accuracyElement = document.querySelector(".accuracy");
const wpmElement = document.querySelector(".wpm");
const timeElement = document.getElementById("time");
const cursor = document.querySelector(".cursor");
const wordBox = document.querySelector(".word-box");
const hiddenInput = document.getElementById("hidden-input");

wordBox.setAttribute("tabindex", "0"); // make div focusable
loadWords();

// --- Helpers ---
function addClass(el, name) {
  el.classList.add(name);
}
function removeClass(el, name) {
  el.classList.remove(name);
}

function randomWords() {
  const randomIndex = Math.floor(Math.random() * wordsLength);
  return words[randomIndex];
}

function formatWords(word) {
  return \`<div class="word">
    <span class="letter">\${word
      .split("")
      .join(
        "</span><span class='letter'>"
      )}</span><span class="letter">&nbsp;</span>
  </div>\`;
}

function loadWords() {
  const wordContainer = document.querySelector(".words");
  wordContainer.innerHTML = "";
  for (let i = 0; i < 200; i++) {
    wordContainer.innerHTML += formatWords(randomWords());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
}

function scrollToActiveWords() {
  const activeWord = document.querySelector(".word.current");
  activeWord.scrollIntoView({ block: "center", behavior: "auto" });
}

// --- Cursor Focus Handling ---
hiddenInput.addEventListener("focus", () => {
  cursor.style.visibility = "visible";
})

hiddenInput.addEventListener("blur", () => {
  cursor.style.visibility = "hidden";
});

wordBox.addEventListener("click", () => {
  hiddenInput.focus();
});

// --- Typing Logic ---
hiddenInput.addEventListener("input", (e) => {
  if (isTimeUp === true) return;

  const value = e.target.value;
  const key = value[value.length - 1]; // last typed character
  if (!key) return;

  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");
  if (!currentLetter || !currentWord) {
    e.target.value = "";
    return;
  }

  const expected = currentLetter.textContent;

  if (!timeStarted && key.length === 1) {
    timeStarted = true;
    startTimer();
  }

  // ignore special stuff (mobile doesn't send backspace normally)
  if (key === "Backspace" || key === "Enter") {
    e.target.value = "";
    return;
  }

  typedKeyStroke++;

  if (expected === "\u00A0") {
    const isSpaceCorrect = key === " ";
    if (isSpaceCorrect) correctKeyStroke++;
    addClass(currentLetter, isSpaceCorrect ? "correct" : "wrong");
    removeClass(currentLetter, "current");
    removeClass(currentWord, "current");
    const nextWord = currentWord.nextElementSibling;
    if (nextWord) {
      addClass(nextWord, "current");
      addClass(nextWord.querySelector(".letter"), "current");
    }
  } else if (key.length === 1) {
    let isCorrect = key === expected;
    if (isCorrect) correctKeyStroke++;
    addClass(currentLetter, isCorrect ? "correct" : "incorrect");
    removeClass(currentLetter, "current");
    addClass(currentLetter.nextElementSibling, "current");
  }

  scrollToActiveWords();
  updateCursorPostion();
  calculateAccuracy();
  calculateWpm();

  // always clear hidden input after processing
  e.target.value = "";
});

// --- Timer ---
function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeElement.textContent = \`\${minutes.toString().padStart(2, "0")}:\${seconds
    .toString()
    .padStart(2, "0")}\`;
}

function startTimer() {
  timeInterval = setInterval(() => {
    timeLeft--;
    updateTimeDisplay();
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      alert(
        \`Time's up \n wPM: \${calculateWpm()} \n Accuracy: \${calculateAccuracy()}\`
      );
      timeStarted = false;
      isTimeUp = true;
      cursor.style.display = "none";
      addClass(wordBox, "grey-box");
    }
  }, 1000);
}

// --- update cursor position ---
function updateCursorPostion() {
  const nextLetter = document.querySelector(".letter.current");
  const rect = nextLetter.getBoundingClientRect();

  const container = wordBox.getBoundingClientRect();

  cursor.style.top = rect.top - container.top + "px";
  cursor.style.left = rect.left - container.left + "px";
}

// --- WPM & Accuracy ---
function calculateWpm() {
  const timeSpent = 300 - timeLeft;
  if (timeSpent <= 0) return 0;
  const wordsTyped = correctKeyStroke / 5;
  const wpm = wordsTyped / (timeSpent / 60);
  finalWpm = isNaN(wpm) || !isFinite(wpm) ? "0" : wpm.toFixed(2);
  wpmElement.textContent = "WPM: " + finalWpm;
  return finalWpm;
}

function calculateAccuracy() {
  const accuracy = (correctKeyStroke / typedKeyStroke) * 100;
  finalAccuracy =
    isNaN(accuracy) || !isFinite(accuracy) ? "0" : accuracy.toFixed(2);
  accuracyElement.textContent = "Accuracy: " + finalAccuracy + "%";
  return finalAccuracy;
}

// --- Window Load & Restart ---
window.addEventListener(
  "load",
  () => (document.querySelector(".words").scrollTop = 0)
);

document.querySelector(".restart").addEventListener("click", () => {
  timeStarted = false;
  isTimeUp = false;
  timeLeft = 300;
  correctKeyStroke = 0;
  typedKeyStroke = 0;
  finalWpm = "00";
  finalAccuracy = "00";
  clearInterval(timeInterval);
  loadWords();
  timeElement.textContent = "00:00";
  wpmElement.textContent = "WPM: " + finalWpm;
  accuracyElement.textContent = "Accuracy: " + finalAccuracy + "%";
  document.querySelector(".words").scrollTop = 0;
  cursor.style.top = "13px";
  cursor.style.left = "10px";
  hiddenInput.focus();
  removeClass(wordBox, "grey-box");
  cursor.style.display = "inline-block";
});`,
    },
  },
  "rock-paper-scissors": {
    title: "Rock Paper Scissors",
    description:
      "A simple Rock Paper Scissors game built with HTML, CSS, and JavaScript. Players compete against the computer, and the app instantly shows the result of each round along with the running score.",
    path: "../projects/rock-paper-scissors/index.html",
    code: {
      html: `<!-- HTML for Rock Paper Scissors -->
<h1>
    <img class="rps" src="images/rps.png">
    ROCK PAPER SCISSORS
</h1>
<p class="line">Choose your move to play against the computer</p>

<div class="game-container">
    <div class="game-box game-box-rock">
        <img src="images/rock.png" alt="rock">
        <p>ROCK</p>
    </div>
    <div class="game-box game-box-paper">
        <img src="images/paper.png" alt="paper">
        <p>PAPER</p>
    </div>
    <div class="game-box game-box-scissors">
        <img src="images/scissors.png" alt="scissors">
        <p>SCISSORS</p>
    </div>
      <div class="computer-box">
        <img src="images/paper.png" alt="paper">
        <p>PAPER</p>
    </div>
</div>

<div class="result">It's a Tie.</div>
<div class="score">
    Wins: 0, Losses: 0, Ties: 0
</div>
<button class="play-game">PLAY GAME</button>
<button class="reset-btn">RESET GAME</button>`,
      css: `/* CSS for Rock Paper Scissors */
body {
  background-color: black;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  color: blueviolet;
  margin-top: 100px;
}

.line {
  margin-top: -15px;
  margin-bottom: 50px;
  color: gray;
}

.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.game-box,
.computer-box {
  width: 170px;
  padding-top: 10px;
  border-radius: 10px;
  font-weight: bold;
  pointer-events: none;
  border: 3px solid;
}

.computer-box {
  display: none;
}

.game-box-rock {
  border-color: rgb(250, 43, 43);
  color: rgb(250, 43, 43);
  img {
    filter: drop-shadow(4px 4px 5px rgb(250, 43, 43));
  }
}

.game-box-scissors {
  border-color: rgb(181, 250, 43);
  color: rgb(181, 250, 43);
  img {
    filter: drop-shadow(4px 4px 5px rgb(181, 250, 43));
  }
}

.game-box-paper {
  border-color: rgb(43, 209, 250);
  color: rgb(43, 209, 250);
  img {
    filter: drop-shadow(4px 4px 5px rgb(43, 209, 250));
  }
}

img {
  width: 50%;
}

.rps {
  width: 50px;
}

.play-game, .reset-btn {
  color: rgb(44, 233, 69);
  border: 3px solid rgb(44, 233, 69);
  background-color: transparent;
  margin-top: 25px;
  padding: 15px 50px;
  border-radius: 10px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
}

.reset-btn {
  color: rgb(26, 44, 240);
  border-color: rgb(26, 44, 240);
  display: none;
}

.result {
  color: blueviolet;
  margin-top: 20px;
}

.score {
  color: rgb(67, 165, 42);
  margin-top: 10px;
}

.result,
.score {
  font-size: 18px;
  display: none;
}

@media (max-width: 460px) {
  h1 {
    font-size: 22px;
    column-gap: none;
    margin-bottom: 30px;
  }
 .rps {
   width: 40px;
 }
}`,
      js: `// JavaScript for Rock Paper Scissors
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
  scoreElement.textContent = \`Wins: \${score.win}, Losses: \${score.losses}, Ties: \${score.tie}\`;
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
    gameBox.style.display = gameBox.classList.contains(\`game-box-\${playerMove}\`)
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
  scoreElement.textContent = \`Wins: \${score.win}, Losses: \${score.losses}, Ties: \${score.tie}\`;
  localStorage.setItem("score", JSON.stringify(score));
}

resetBtn.addEventListener("click", () => {
  score = {
    win: 0,
    losses: 0,
    tie: 0,
  };

  scoreElement.textContent = \`Wins: \${score.win}, Losses: \${score.losses}, Ties: \${score.tie}\`;
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
}`,
    },
  },
  "music-player": {
    title: "Music Player",
    description:
      "Mini music player made with HTML, CSS, and JavaScript — supports play, pause, skip, and progress tracking.",
    path: "../projects/music-player/index.html",
    code: {
      html: `<!-- HTML for Music Player -->
<div class="player">
  <div class="cover">
    <img class="cover-photo" src="images/cover-photo.png" alt="cover image" />
  </div>

  <h2 class="title">Akhar</h2>
  <div class="artist-name">Amrinder Gill</div>
  <audio class="audio" src="songs/Akhar.mp3"></audio>

  <div class="progress-bar">
    <div class="progress"></div>
    <div class="progress-circle"></div>
  </div>
  <div class="time">
    <div class="time-left">0:00</div>
    <div class="time-duration">3:40</div>
  </div>

  <div class="controls">
    <div class="prev">
      <img src="images/prev-button.png" alt="previous" />
    </div>
    <div class="play">
      <img src="images/play-button.png" alt="play" />
    </div>
    <div class="next">
      <img src="images/next-button.png" alt="next" />
    </div>
  </div>
</div>`,
      css: `/* CSS for Music Player */
body {
  font-family: "Poppins", sans-serif;
  background-color: black;
  text-align: center;
  background-color: rgb(31, 28, 28);
}

.player {
  width: 400px;
  border: 3px solid rgba(77, 72, 72, 0.5);
  background-color: rgb(34, 31, 31);
  border-radius: 20px;
  margin: 50px auto;
  box-shadow: 0 0 10px black;
}

.cover {
  width: 60%;
  border-radius: 10px;
  margin: 50px auto;
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: inherit;
  }
}

.title {
  color: white;
}

.artist-name,
.time {
  color: gray;
}

.artist-name {
  margin-top: -18px;
  margin-bottom: 25px;
}

.progress-bar {
  width: 80%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px auto;
  border-radius: 2px;
  position: relative;
}

.progress {
  height: 3px;
  background-color: white;
  width: 0;
}

.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.controls img {
  width: 50px;
}

.progress-circle {
  background-color: #60be92;
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  top: 50%;
  left: -2px;
  transform: translate(-50%, -50%);
}

@media (max-width: 500px) {
  .player {
    width: 80%;
  }

  .cover img {
    height: 250px
  }
}

@media (max-width: 490px) {
  .cover img{
    max-height: 200px;
  }
}

@media (max-width: 400px) {
  .cover img{
    max-height: 170px;
  }
}`,
      js: `// JavaScript for Music Player
const songs = [
  {
    title: "Akhar", file: "songs/Akhar.mp3", artist: "Amrinder Gill", image: "images/cover-photo.png"
  },
  {
    title: "Softly", file: "songs/Softly.mp3", artist: "Karan Aujla", image: "images/cover-2.png"
  }
];

let currentSong = 0;
const titleElement = document.querySelector(".title");
const artistName = document.querySelector(".artist-name");
const coverPhoto = document.querySelector(".cover-photo");
const timeDuration = document.querySelector(".time-duration");
const timeLeft = document.querySelector(".time-left");
const audio = document.querySelector(".audio");
const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const playIcon = playBtn.querySelector("img")
const nextBtn = document.querySelector(".next");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const progressCircle = document.querySelector(".progress-circle")

function loadSongs(index) {
  audio.src = songs[index].file;
  titleElement.textContent = songs[index].title;
  artistName.textContent = songs[index].artist;
  coverPhoto.src = songs[index].image;
}

function playSong() {
  audio.play();
  playIcon.src = "images/pause-button.png";
}

function pauseSong() {
  audio.pause();
  playIcon.src = "images/play-button.png";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong()
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSongs(currentSong);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSongs(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const {currentTime, duration} = e.srcElement;

  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = \`\${progressPercentage}%\`;
  progressCircle.style.left = \`\${progressPercentage}%\`;

  timeLeft.textContent = formatTime(currentTime);
  timeDuration.textContent = formatTime(duration);
}

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  if (isNaN(min) && isNaN(sec)) {
    min = 0;
    sec = 0
  }

  return \`\${min}:\${sec < 10 ? "0" + sec : sec}\`;
}

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;

  loadSongs(currentSong);
  playSong();
});`,
    },
  },
  "matching-pairs-game": {
    title: "Matching Pairs Game",
    description:
      "Mini memory game built with HTML, CSS, and JavaScript — match pairs of cards and test your focus.",
    path: "../projects/matching-pairs-game/index.html",
    code: {
      html: `<!-- HTML for Matching Pairs Game -->
<div class="container">
  <h1>🧠 Matching Pairs</h1>
  <div class="grid cards"></div>
  <div class="moves">Moves: 0</div>
  <button onclick="restartGame()">Restart</button>
</div>`,
      css: `/* CSS for Matching Pairs Game */
body {
  text-align: center;
  background-image: url("image/background.png");
  font-family: Arial, Helvetica, sans-serif;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 500px;
  padding: 20px;
  background-color: rgb(252, 239, 223);
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 90px);
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.card {
  width: 90px;
  height: 90px;
  border-radius: 5px;
  position: relative;
  transform-style: preserve-3d;
  transition: 0.5s;
  cursor: pointer;
}

.card.flip {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 5px;
}

.card img {
  width: inherit;
  border-radius: inherit;
}

.front {
  background-color: #e4dede;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  transform: rotateY(180deg);
}

.moves {
  margin: 20px 0 10px;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 5px black;
}

@media (max-width: 600px) {
  .container {
    width: 80%;
  }
}

@media (max-width: 570px) {
  .container {
    padding-left: 25px;
    padding-right: 25px;
  }

  .cards {
    grid-template-columns: repeat(4, 1fr);
  }

  .card {
    width: inherit;
  }

  .card img {
    height: inherit;
  }
}`,
      js: `// JavaScript for Matching Pairs Game
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
    card.innerHTML = \`<div class="front">\${emoji}</div>
    <div class="back">
      <img src="image/card.png">
    </div>\`;
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
  movesElement.textContent = \`Moves: \${moves}\`;

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
      alert(\`You won in \${moves} moves!\`)
    }
  }, 500);
}

function restartGame() {
  moves = 0;
  movesElement.textContent = \`Moves: \${moves}\`;
  createBoard();
}


createBoard();`,
    },
  },
  "form-validation": {
    title: "Form Validation",
    description:
      "A basic Form Validation project built with HTML, CSS, and JavaScript. It checks user input for errors like empty fields, invalid email format, and password requirements before submission.",
    path: "../projects/form-validation/index.html",
    code: {
      html: `<!-- HTML for Form Validation -->
<div class="container">
  <h1>Sign up</h1>
  <form id="form">
  <div class="form-control">
    <label>Username:</label>
    <input type="text" placeholder="Enter username" id="username" />
    <small></small>
  </div>
  <div class="form-control">
    <label>Email:</label>
    <input type="email" placeholder="Enter email" id="email" />
    <small></small>
  </div>
  <div class="form-control">
    <label>Password:</label>
    <input type="text" placeholder="Enter password" id="password" />
    <small></small>
  </div>
  <div class="form-control">
    <label>Confirm Password:</label>
    <input type="text" placeholder="confirm-password" id="password2" />
    <small></small>
  </div>
  <button type="submit">Submit</button>
  </form>
</div>`,
      css: `/* CSS for Form Validation */
body {
  font-family: Arial, Helvetica, sans-serif;
  background-image: url("background.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 350px;
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

h1{
  text-align: center;
  margin-bottom: 20px;
}

.form-control {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
}

input:focus{
  border-color: #007bff;
  outline: none;
}

small {
  color: red;
  visibility: hidden;
}

.form-control.error input {
  border-color: #e74c3c;
}

.form-control.success input {
  border-color: #2ecc71;
}

.form-control.error small {
  visibility: visible;
}

button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}`,
      js: `// JavaScript for Form Validation
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForErrors();
});

function checkForErrors() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username cannot be blank.");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email cannot be blank.");
  } else if (!isEmail(emailValue)) {
    setError(email, "Not a valid Email.");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password cannot be blank.");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters.");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password.");
  } else if (password2Value === passwordValue) {
    if (password2Value.length < 8) {
      setError(password2, "Password must be at least 8 characters.");
    }  else {
    setSuccess(password2);
    }
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords do not match.");
  } else {
    setSuccess(password2);
  }
}

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.textContent = message;
  formControl.className = "form-control error";
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}`,
    },
  },

  "tea-and-coffee": {
    title: "Tea & Coffee",
    description: `A responsive webpage featuring smooth scroll animations using the AOS library.
Includes a horizontal scrollable menu for quick navigation between sections.
Designed with clean HTML and minimal code for fast performance.
Delivers an engaging, modern browsing experience.`,
    path: "https://tea-and-coffee-cafe.netlify.app/",
    code: {
      html: `<!-- HTML for Tea & Coffee -->
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Romanesco&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
</head>
<body>
  <header>
    <div
      class="logo"
      data-aos="flip-down"
      data-aos-delay="500"
      data-aos-duration="1000"
      style="display: flex; align-items: center"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          aria-hidden="false"
          role="img"
        >
          <title>Steaming coffee mug</title>
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 3c0 1.3-.8 2.2-.8 3.1C7 7 7.9 8 8.5 8" />
            <path d="M11 3c0 1.3-.8 2.2-.8 3.1C10 7 10.9 8 11.5 8" />
          </g>
          <g fill="currentColor" stroke="none">
            <path d="M4 8h10v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
            <path
              d="M19 10v2a4 4 0 0 1-4 4v-2a3 3 0 0 0 3-3V10h1z"
              fill="currentColor"
            />
            <path
              d="M9 4a3 3 0 0 1 6 0v1H9V4z"
              fill="#000000"
              opacity="0.05"
            />
          </g>
        </svg>
      </div>
      <h1>Tea & coffee</h1>
    </div>

    <div
      class="nav"
      data-aos="flip-down"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <div class="equipments">Equipments</div>
      <div class="coffee&tea">Coffee&Tea</div>
      <div class="store">Store</div>
    </div>
    <div data-aos="flip-down" data-aos-delay="500" data-aos-duration="1000">
      <button class="order">Order Now</button>
      <div class="sign-up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          aria-hidden="false"
          role="img"
        >
          <title>Sign up</title>
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5" />
            <path d="M19 8v4M21 10h-4" />
          </g>
        </svg>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div
        data-aos="fade-right"
        data-aos-delay="500"
        data-aos-duration="1000"
      >
        <div>
          <img src="images/photo-5.jpeg" />
        </div>

        <div style="display: flex">
          <div>
            <h1>1k+</h1>
            <div class="cafe-label">Reviews</div>
          </div>
          <div>
            <h1>5k+</h1>
            <div class="cafe-label">Best Selling</div>
          </div>
          <div>
            <h1>150+</h1>
            <div class="cafe-label">Menus</div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-delay="500"
        data-aos-duration="1000"
        class="welcome-para"
      >
        <h1>Grab your favorite brew - coffee or tea!</h1>
        <p>
          Welcome to Tea & Coffee - your perfect spot for freshly brewed
          coffee, coz vibes, and a great conversation. Come, sip, and relax.
          You can book your table in advance as well. You can even place your
          order online - we'll deliver your favorite brew right to your door.
        </p>
        <div>
          <button class="order">Resereve Table</button>
        </div>
      </div>
    </section>

    <section class="coffeeAndTea">
      <h1 data-aos="flip-down" data-aos-delay="500" data-aos-duration="1000">
        Coffee&Tea [Menu]
      </h1>
      <div class="card-container">
        <div
          class="card card-1"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-1.jpg" />
          </div>
          <div class="product-name">Masala Chai</div>
          <div class="product-price">$4.0</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-2"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-2.avif" />
          </div>
          <div class="product-name">Green Tea</div>
          <div class="product-price">$4.5</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-3"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-3.jpg" />
          </div>
          <div class="product-name">Latte</div>
          <div class="product-price">$4.9</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-4"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-4.jpg" />
          </div>
          <div class="product-name">Americano</div>
          <div class="product-price">$4.9</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-5"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-5.jpg" />
          </div>
          <div class="product-name">Cappuccino</div>
          <div class="product-price">$5.0</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-6"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-6.webp" />
          </div>
          <div class="product-name">Croissant</div>
          <div class="product-price">$4.0</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-7"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-7.jpg"/>
          </div>
          <div class="product-name">Chocolate Truffle Pastry</div>
          <div class="product-price">$4.5</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
          class="card card-8"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div class="product-img">
            <img src="product-images/photo-8.jpg" />
          </div>
          <div class="product-name">Chocolate Puff Pastry</div>
          <div class="product-price">$4.9</div>
          <div class="order-btn-box">
            <button>order</button>
          </div>
        </div>
        <div
            class="card card-9"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <div class="product-img">
              <img src="product-images/photo-9.jpg" />
            </div>
            <div class="product-name">Puff Pastry</div>
            <div class="product-price">$4.9</div>
            <div class="order-btn-box">
              <button>order</button>
            </div>
          </div>
          <div
            class="card card-10"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <div class="product-img">
              <img src="product-images/photo-10.webp" />
            </div>
            <div class="product-name">Danish Pastry</div>
            <div class="product-price">$5.0</div>
            <div class="order-btn-box">
              <button>order</button>
            </div>
          </div>
      </div>
      <div class="arrow-btns">
        <button class="left-arrow">&lt;</button>
        <button class="right-arrow">&gt;</button>
      </div>
    </section>

    <section class="stories-section">
      <h1 data-aos="flip-down" data-aos-delay="100" data-aos-duration="1000">
        Stories
      </h1>
      <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          class="post post-1"
        >
          <div class="image">
            <img src="images/photo-2.avif" />
          </div>
          <div>
            <h3>Story 1:The First Sip</h3>

            Steam rose softly from the glass, carrying the scent of ginger and
            cardamom. One sip, and the world seemed to slow just a little. The
            sweetness lingered, wrapping the moment in calm. It wasn&rsquo;t just
            chai — it was comfort in liquid form. A reminder that peace often
            hides in the simplest things.
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          class="post post-2"
        >
          <div>
            <h3>Story 2: Brewing Dreams</h3>

            Raj never planned to open a café. It started with a single idea —
            that coffee could bring strangers together. From a small street
            stall to a cozy café filled with laughter and conversation, every
            cup he brews carries a bit of his journey. For him, coffee isn&rsquo;t a
            business — it&rsquo;s his dream, poured fresh every morning.
          </div>
          <div class="image">
            <img src="images/photo-3.avif" />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          class="post post-3"
        >
          <div class="image">
            <img src="images/photo-4.jpeg" />
          </div>
          <div>
            <h3>Story 3: The Evening Ritual</h3>

            As the sun dips low, Aisha settles into her balcony chair with her
            favorite herbal blend. The air is cool, the sky painted gold, and
            the world finally feels quiet. One sip, and the day&rsquo;s chaos fades
            away. Her evening tea isn&rsquo;t just a habit — it&rsquo;s her way of saying
            thank you for surviving another beautiful, messy day.
          </div>
        </div>
      </div>
      <div class="share-stories">Share your stories to us at: <span>tea&coffee123@gmail.com</span></div>
    </section>
  </main>

<footer>
  <p>
    &copy; 2025 Tea & Coffee - Designed & Developed by
    <span>Harsimran Kaur</span>
  </p>
</footer>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  AOS.init({
    once: true,
  });
</script>`,
      css: `/* CSS for Tea & Coffee */
html,
body {
  padding: 0;
  margin: 0;
  background-color: #ede1d7;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  overflow-x: clip;
}

header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  color: #6c360b;
  border-bottom: 2px solid #6c360b;
  height: 60px;
  h1 {
    margin: 0;
  }
}

.nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 20px;
  text-align: center;
}

.nav div {
  cursor: pointer;
}

.nav div:hover,
.sign-up:hover {
  color: rgb(124, 104, 203);
}

header > div:last-child {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
}

button {
  border: 2px solid #6c360b;
  padding: 10px 30px;
  font-size: 16px;
  border-radius: 20px;
  color: #6c360b;
  background-color: transparent;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.sign-up {
  cursor: pointer;
}

button:hover {
  background-color: #6c360b;
  color: white;
}

main {
  padding: 30px 50px;
}

.hero {
  align-items: center;
  display: flex;
  padding: 50px 80px;
  font-family: "Romanesco", cursive;
  border: 2px solid #6c360b;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.8);
}

.hero h1 {
  color: #6c360b;
  font-size: 100px;
  margin: 0;
  line-height: 1;
}

.hero p {
  font-size: 30px;
  margin: 0;
}

.hero button {
  background-color: #6c360b;
  color: white;
  margin-top: 20px;
  transition: background 0.15s ease, color 0.15s ease border 0.15s ease;
}

.hero button:hover {
  border: 2px solid #6c360b;
  color: #6c360b;
  background-color: transparent;
}

.hero > :nth-child(1) {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  border-right: 2px solid #6c360b;
}

.hero > :nth-child(1) > :nth-child(1) {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 20px solid #6c360b;
}

.hero img {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.hero > :nth-child(1) > :nth-child(2) {
  gap: 30px;
}

.hero > :nth-child(1) > :nth-child(2) h1 {
  font-size: 70px;
  line-height: 1;
}

.hero > :nth-last-child(1) {
  flex: 1;
}

.hero .welcome-para {
  margin-left: 35px;
}

.cafe-label {
  font-size: 25px;
}

.card-container {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  column-gap: 20px;
  width: 90%;
  max-width: 1400px;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
  margin: 0 auto;
  box-shadow: inset 2px 2px 5px gray;
}

.card-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.card {
  padding: 20px;
  border-radius: 10px;
  background-color: #6c360b;
  display: grid;
  grid-template-rows: auto;
  row-gap: 10px;
  color: #ede1d7;
}

.card .product-img {
  width: 180px;
  height: 150px;
  border: 4px solid #d59d70;
  border-radius: 10px;
  margin: 0 auto;
}

.card .product-img img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  border-radius: 5px;
}

.card .product-name {
  font-size: 25px;
  margin-top: 10px;
}

.card .product-price {
  font-size: 30px;
}

.card .order-btn-box {
  margin: 0 auto;
}

.card button {
  background-color: #d59d70;
  color: #6c360b;
  font-weight: bold;
  padding: 10px 45px;
}

.card button:hover {
  border-color: #d59d70;
  color: #d59d70;
  background-color: transparent;
}

.arrow-btns {
  margin: 20px auto 0;
  width: 80%;
  display: flex;
  justify-content: center;
  column-gap: 10px;
  max-width: 1400px;
}

.stories-section {
  margin-top: 30px;
}

.stories-section > :nth-child(2) {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 20px 40px;
}

.stories-section h1,
.coffeeAndTea h1 {
  font-size: 50px;
  color: #6c360b;
}

.post {
  display: flex;
  column-gap: 30px;
  font-size: 35px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
}

.post h3 {
  margin: 0;
}

.post-1,
.post-2 {
  padding: 20px 0;
  border-bottom: 2px solid #6c360b;
}

.post .image {
  width: 300px;
  height: 350px;
  border: 20px solid #6c360b;
  border-radius: 10px;
}

.post img {
  width: inherit;
  height: inherit;
}

.post-3 .image {
  width: 400px;
  height: 300px;
}

.share-stories {
  margin-top: 20px;
  font-size: 20px;
  color: #6c360b;
  text-decoration: underline;
}

.share-stories span {
  font-weight: bold;
}

footer {
  background-color: #f9f5f1;
  border-top: 1px solid #ddd;
  text-align: center;
  padding: 12px 0;
  font-size: 20px;
  color: #555;
}

footer span {
  font-weight: 600;
}

@media (max-width: 1300px) {
  .hero h1 {
    font-size: 60px;
  }
}

@media (max-width: 1100px) {
  .hero h1 {
    font-size: 45px;
  }

  .hero p {
    font-size: 25px;
  }

  .nav {
    font-size: 16px;
  }

  .post {
    font-size: 30px;
  }
}

@media (max-width: 900px) {
  header {
    padding: 0 5px;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    h1 {
      font-size: 20px;
    }
  }

  .nav {
    display: none;
  }

  main {
    padding: 30px 15px;
    margin: 0;
  }

  .hero {
    flex-direction: column;
    padding: 50px 30px;
  }

  .hero > :nth-child(1) {
    border-right: none;
    border-bottom: 2px solid #6c360b;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }

  .hero > :nth-child(1) > :nth-child(1) {
    width: 60%;
    height: 60%;
  }

  .hero .welcome-para {
    margin-left: 0;
  }

  .hero > :nth-child(1) > :nth-child(2) h1 {
    font-size: 50px;
    line-height: 1;
  }

  .stories-section > :nth-child(2) {
    padding: 20px 20px;
  }

  .card {
    width: 150px;
  }

  .card .product-img {
    width: 135px;
  }

  .card .product-name,
  .card .product-price {
    font-size: 20px;
  }

  .post {
    flex-direction: column;
    column-gap: 0;
    row-gap: 20px;
  }

  .post .image {
    width: 250px;
    margin: 0 auto;
  }

  .post img {
    width: 100%;
  }

  .post-2 {
    flex-direction: column-reverse;
  }
}

@media (max-width: 371px) {
  .order {
    font-size: 12px;
  }

  .post .image {
    width: 220px;
  }
}`,
      js: `// JavaScript for Tea & Coffee
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const cardContainer = document.querySelector(".card-container");

const scrollAmount = 500;

leftArrow.addEventListener("click", () => {
  cardContainer.scrollBy({left: -scrollAmount, behavior: "smooth"});
});

rightArrow.addEventListener("click", () => {
  cardContainer.scrollBy({left: scrollAmount, behavior: "smooth"});
});`,
    },
  },
  // Add more projects following the same structure
};
