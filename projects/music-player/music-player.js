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
  progress.style.width = `${progressPercentage}%`;
  progressCircle.style.left = `${progressPercentage}%`;

  timeLeft.textContent = formatTime(currentTime);
  timeDuration.textContent = formatTime(duration);
}

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (isNaN(min) && isNaN(sec)) {
    min = 0;
    sec = 0
  }

  return `${min}:${sec < 10 ? "0" + sec : sec}`;
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
});