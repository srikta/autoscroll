// ================= ELEMENTS =================
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

const themeRadios = document.getElementsByName("theme");

// ================= VARIABLES =================
let scrollInterval = null;
let startTimeout = null;

let speed = 2;
let fontSize = 22;
let delay = 10; // seconds

// ================= LOAD =================
loadBtn.addEventListener("click", () => {
  display.textContent = input.value;
  container.scrollTop = 0;
  inputSection.classList.add("hidden");
});

// ================= EDIT =================
editBtn.addEventListener("click", () => {
  inputSection.classList.remove("hidden");
});

// ================= START (WITH DELAY) =================
startBtn.addEventListener("click", () => {
  if (scrollInterval || startTimeout) return;

  startTimeout = setTimeout(() => {
    scrollInterval = setInterval(() => {
      container.scrollTop += speed;

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    }, 50);

    startTimeout = null;
  }, delay * 1000); // dynamic delay
});

// ================= PAUSE =================
pauseBtn.addEventListener("click", () => {
  clearInterval(scrollInterval);
  clearTimeout(startTimeout);

  scrollInterval = null;
  startTimeout = null;
});

// ================= RESET =================
resetBtn.addEventListener("click", () => {
  container.scrollTop = 0;

  clearInterval(scrollInterval);
  clearTimeout(startTimeout);

  scrollInterval = null;
  startTimeout = null;
});

// ================= SPEED =================
speedSlider.addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

// ================= DELAY =================
delaySlider.addEventListener("input", (e) => {
  delay = parseInt(e.target.value);
  delayValue.textContent = delay + "s";
});

// ================= ZOOM =================
zoomInBtn.addEventListener("click", () => {
  fontSize += 2;
  display.style.fontSize = fontSize + "px";
});

zoomOutBtn.addEventListener("click", () => {
  if (fontSize > 10) {
    fontSize -= 2;
    display.style.fontSize = fontSize + "px";
  }
});

// ================= THEME =================
themeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "dark" && radio.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
});