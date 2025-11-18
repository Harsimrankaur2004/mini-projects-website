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
  formControl.className = "form-control";
  small.style.vissibility = hidden;
}

function isEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
