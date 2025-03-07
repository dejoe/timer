let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let isFullscreen = false;
let isDarkMode = false;

const clockElement = document.getElementById('clock');
const startStopButton = document.getElementById('startStopButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const darkModeButton = document.getElementById('darkModeButton');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateClock() {
  if (seconds === 0) {
    if (minutes === 0) {
      if (hours === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
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
    hours = parseInt(hoursInput.value, 10) || 0;
    minutes = parseInt(minutesInput.value, 10) || 0;
    seconds = parseInt(secondsInput.value, 10) || 0;
    timerInterval = setInterval(updateClock, 1000);
  } else {
    isRunning = false;
    startStopButton.textContent = 'Start';
    clearInterval(timerInterval);
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

function adjustFontSize() {
  const containerWidth = document.querySelector('.container').clientWidth;
  const containerHeight = document.querySelector('.container').clientHeight;
  const maxFontSize = Math.min(containerWidth / 1.5, containerHeight / 2); // Adjust these factors as needed
  clockElement.style.fontSize = `${maxFontSize}px`;
}

window.addEventListener('resize', adjustFontSize);
document.addEventListener('DOMContentLoaded', adjustFontSize);

startStopButton.addEventListener('click', startStopTimer);
fullscreenButton.addEventListener('click', toggleFullscreen);
darkModeButton.addEventListener('click', toggleDarkMode);

// Initialize the clock display
clockElement.textContent = '00:00:00';
//
