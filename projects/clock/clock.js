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
    .innerText = `${pad(h)}:${pad(m)}:${pad(s)} ${!is24hrs ? ampm : ''}`;
}

setInterval(() => {
  updateTime();
},1000);

function pad(num) {
  return num < 10 ? "0" + num : num; 
}