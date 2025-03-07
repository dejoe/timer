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

  clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopTimer() {
  if (!isRunning) {
    isRunning = true;
    startStopButton.textContent = 'Stop';
    pauseButton.disabled = false;
    hours = parseInt(hoursInput.value, 10) || 0;
    minutes = parseInt(minutesInput.value, 10) || 0;
    seconds = parseInt(secondsInput.value, 10) || 0;
    timerInterval = setInterval(updateClock, 1000);
  } else {
    isRunning = false;
    startStopButton.textContent = 'Start';
    pauseButton.disabled = true;
    clearInterval(timerInterval);
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

// Initialize the clock display
clockElement.textContent = '00:00:00';
