const input = document.getElementById("chordInput");
const display = document.getElementById("displayText");
const container = document.getElementById("displayContainer");
const inputSection = document.getElementById("inputSection");

const loadBtn = document.getElementById("loadBtn");
const editBtn = document.getElementById("editBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const speedSlider = document.getElementById("speedSlider");
const delaySlider = document.getElementById("delaySlider");
const delayValue = document.getElementById("delayValue");

const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");

const themeToggle = document.getElementById("themeToggle");

let scrollInterval = null;
let startTimeout = null;

let speed = 2;
let fontSize = 22;
let delay = 10;

// ================= LOAD =================
loadBtn.onclick = () => {
  display.innerHTML = "";
  display.textContent = input.value;
  container.scrollTop = 0;

  const buffer = document.createElement("div");
  buffer.style.height = (container.clientHeight * 0.6) + "px";
  display.appendChild(buffer);

  inputSection.classList.add("hidden");
  document.body.classList.add("input-hidden");
};

// ================= EDIT =================
editBtn.onclick = () => {
  inputSection.classList.remove("hidden");
  document.body.classList.remove("input-hidden");
};

// ================= START =================
startBtn.onclick = () => {
  if (scrollInterval || startTimeout) return;

  startBtn.classList.add("active"); // ✅ ADDED

  startTimeout = setTimeout(() => {
    scrollInterval = setInterval(() => {
      container.scrollTop += speed;

      const targetPosition = container.clientHeight * 0.4;
      const lastLineOffset = display.scrollHeight - container.scrollTop;

      if (lastLineOffset <= targetPosition) {
        clearInterval(scrollInterval);
        scrollInterval = null;

        startBtn.classList.remove("active"); // ✅ ADDED
      }

    }, 50);

    startTimeout = null;
  }, delay * 1000);
};

// ================= PAUSE =================
pauseBtn.onclick = () => {
  clearInterval(scrollInterval);
  clearTimeout(startTimeout);
  scrollInterval = null;
  startTimeout = null;

  startBtn.classList.remove("active"); // ✅ ADDED
};

// ================= RESET =================
resetBtn.onclick = () => {
  container.scrollTop = 0;
  clearInterval(scrollInterval);
  clearTimeout(startTimeout);
  scrollInterval = null;
  startTimeout = null;

  startBtn.classList.remove("active"); // ✅ ADDED
};

// ================= SPEED =================
speedSlider.oninput = (e) => {
  speed = parseInt(e.target.value);
};

// ================= DELAY =================
delaySlider.oninput = (e) => {
  delay = parseInt(e.target.value);
  delayValue.textContent = delay + "s";
};

// ================= ZOOM =================
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

// ================= THEME =================
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "light_mode";
  } else {
    themeToggle.textContent = "dark_mode";
  }
};
