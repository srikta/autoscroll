const input = document.getElementById("chordInput");
const display = document.getElementById("displayText");
const container = document.getElementById("displayContainer");
const inputSection = document.getElementById("inputSection");

const loadBtn = document.getElementById("loadBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const editBtn = document.getElementById("editBtn");

const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");

const speedSlider = document.getElementById("speedSlider");
const delaySlider = document.getElementById("delaySlider");
const delayValue = document.getElementById("delayValue");

const themeToggle = document.getElementById("themeToggle");

let scrollInterval = null;
let startTimeout = null;

let speed = 2;
let fontSize = 22;
let delay = 10;

// LOAD
loadBtn.onclick = () => {
  display.textContent = input.value;
  container.scrollTop = 0;
  inputSection.classList.add("hidden");
};

// EDIT
editBtn.onclick = () => {
  inputSection.classList.remove("hidden");
};

// START
startBtn.onclick = () => {
  if (scrollInterval || startTimeout) return;

  startTimeout = setTimeout(() => {
    scrollInterval = setInterval(() => {
      container.scrollTop += speed;

      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    }, 50);

    startTimeout = null;
  }, delay * 1000);
};

// PAUSE
pauseBtn.onclick = () => {
  clearInterval(scrollInterval);
  clearTimeout(startTimeout);
  scrollInterval = null;
  startTimeout = null;
};

// RESET
resetBtn.onclick = () => {
  container.scrollTop = 0;
  clearInterval(scrollInterval);
  clearTimeout(startTimeout);
  scrollInterval = null;
  startTimeout = null;
};

// SPEED
speedSlider.oninput = (e) => {
  speed = parseInt(e.target.value);
};

// DELAY
delaySlider.oninput = (e) => {
  delay = parseInt(e.target.value);
  delayValue.textContent = delay + "s";
};

// ZOOM
zoomInBtn.onclick = () => {
  fontSize += 2;
  display.style.fontSize = fontSize + "px";
};

zoomOutBtn.onclick = () => {
  if (fontSize > 10) {
    fontSize -= 2;
    display.style.fontSize = fontSize + "px";
  }
};

// THEME TOGGLE
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "light_mode";
  } else {
    themeToggle.textContent = "dark_mode";
  }
};
