let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let isPaused = false;
let isFullscreen = false;
let isDarkMode = false;

const clockElement = document.getElementById('clock');
const startStopButton = document.getElementById('startStopButton');
const pauseButton = document.getElementById('pauseButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const darkModeButton = document.getElementById('darkModeButton');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const beepSound = document.getElementById('beepSound');

function updateClock() {
  if (isPaused) return;

  if (seconds === 0) {
    if (minutes === 0) {
      if (hours === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
        pauseButton.disabled = true;
        playBeep();
        return;
      }
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  // This function uses the global timer variables (h, m, s) that are being decremented
  if (hours === 0) {
    clockElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (!clockElement.classList.contains('no-hours')) {
        clockElement.classList.add('no-hours');
    }
  } else {
    clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (clockElement.classList.contains('no-hours')) {
        clockElement.classList.remove('no-hours');
    }
  }
}

// Renamed to reflect its purpose: updates display based on INPUT fields
function updateDisplayFromInputs() {
  const inputH = parseInt(hoursInput.value, 10) || 0;
  const inputM = parseInt(minutesInput.value, 10) || 0;
  const inputS = parseInt(secondsInput.value, 10) || 0;

  if (inputH === 0) {
    clockElement.textContent = `${String(inputM).padStart(2, '0')}:${String(inputS).padStart(2, '0')}`;
    clockElement.classList.add('no-hours');
  } else {
    clockElement.textContent = `${String(inputH).padStart(2, '0')}:${String(inputM).padStart(2, '0')}:${String(inputS).padStart(2, '0')}`;
    clockElement.classList.remove('no-hours');
  }
}


function startStopTimer() {
  if (!isRunning) {
    // Read initial values from inputs into timer variables
    hours = parseInt(hoursInput.value, 10) || 0;
    minutes = parseInt(minutesInput.value, 10) || 0;
    seconds = parseInt(secondsInput.value, 10) || 0;

    // Set initial display and class based on these timer variables
    // This effectively calls the display logic of updateClock() once before interval starts
    if (hours === 0) {
      clockElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      clockElement.classList.add('no-hours');
    } else {
      clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      clockElement.classList.remove('no-hours');
    }

    isRunning = true;
    startStopButton.textContent = 'Stop';
    pauseButton.disabled = false;
    timerInterval = setInterval(updateClock, 1000);
  } else {
    isRunning = false;
    startStopButton.textContent = 'Start';
    pauseButton.disabled = true;
    clearInterval(timerInterval);
    // Update display based on current input values when stopped
    updateDisplayFromInputs();
  }
}

function pauseTimer() {
  if (isRunning && !isPaused) {
    isPaused = true;
    pauseButton.textContent = 'Resume';
  } else if (isRunning && isPaused) {
    isPaused = false;
    pauseButton.textContent = 'Pause';
  }
}

function toggleFullscreen() {
  if (!isFullscreen) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {/* Firefox */
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {/* Chrome, Safari and Opera */
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {/* IE/Edge */
      document.documentElement.msRequestFullscreen();
    }
    isFullscreen = true;
    fullscreenButton.textContent = 'Exit Fullscreen';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {/* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {/* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {/* IE/Edge */
      document.msExitFullscreen();
    }
    isFullscreen = false;
    fullscreenButton.textContent = 'Fullscreen';
  }
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  if (isDarkMode) {
    darkModeButton.textContent = 'Light Mode';
  } else {
    darkModeButton.textContent = 'Dark Mode';
  }
}

function playBeep() {
  beepSound.play();
  setTimeout(() => {
    beepSound.pause();
    beepSound.currentTime = 0;
  }, 5000);
}

startStopButton.addEventListener('click', startStopTimer);
pauseButton.addEventListener('click', pauseTimer);
fullscreenButton.addEventListener('click', toggleFullscreen);
darkModeButton.addEventListener('click', toggleDarkMode);

// Renamed to reflect its purpose: updates display based on INPUT fields
// This function was already modified and renamed above, this is just for context.
// function updateDisplayFromInputs() { ... }

// Initialize the clock display
updateDisplayFromInputs();

// Add event listeners to input fields to update display dynamically
hoursInput.addEventListener('input', updateDisplayFromInputs);
minutesInput.addEventListener('input', updateDisplayFromInputs);
secondsInput.addEventListener('input', updateDisplayFromInputs);
