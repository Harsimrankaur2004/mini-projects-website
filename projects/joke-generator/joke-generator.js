document.getElementById("jokeBtn")
  .addEventListener("click", async () => {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke = await response.json();
    document.getElementById("jokeDisplay")
      .innerText = `${joke.setup} - ${joke.punchline}`;
  });