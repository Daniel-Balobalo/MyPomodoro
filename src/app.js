import { PomodoroTimer } from './timer.js';
import { updateDisplay, playAlarm } from './ui.js';

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const settingsToggle = document.querySelector('.settings-toggle');
const settingsPanel = document.querySelector('.settings-panel');

// Theme toggle
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Set initial theme from localStorage or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);

// Settings panel toggle
settingsToggle.addEventListener('click', () => {
  const isExpanded = settingsToggle.getAttribute('aria-expanded') === 'true';
  settingsToggle.setAttribute('aria-expanded', !isExpanded);
  settingsPanel.hidden = isExpanded;
  
  // Animate the icon
  settingsToggle.querySelector('span').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
});

// Update range input outputs
document.querySelectorAll('input[type="range"]').forEach(input => {
  const output = document.querySelector(`output[for="${input.id}"]`);
  output.textContent = input.value;
  
  input.addEventListener('input', () => {
    output.textContent = input.value;
  });
});

// Initial settings
let workDuration = 25 * 60;
let shortBreakDuration = 5 * 60;
let longBreakDuration = 15 * 60;

// Timer initialization
let timer = new PomodoroTimer(
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  (time) => updateDisplay(time, timer.isOnBreak, timer.isLongBreak, timer.sessionsCompleted),
  () => {
    playAlarm();
    // More subtle notification than alert
    const notification = new Notification(
      timer.isOnBreak ? "Break over!" : "Work session complete!", 
      {
        body: timer.isOnBreak ? "Time to work!" : "Time for a break!",
        icon: '/assets/icons/icon-192.png'
      }
    );
  }
);

// Update settings based on user input
function applySettings() {
  const sessionCount = document.getElementById('session-count').value;
  workDuration = document.getElementById('work-duration').value * 60;
  shortBreakDuration = document.getElementById('short-break-duration').value * 60;
  longBreakDuration = document.getElementById('long-break-duration').value * 60;

  timer = new PomodoroTimer(
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    (time) => updateDisplay(time, timer.isOnBreak, timer.isLongBreak, timer.sessionsCompleted),
    () => {
      playAlarm();
      const notification = new Notification(
        timer.isOnBreak ? "Break over!" : "Work session complete!", 
        {
          body: timer.isOnBreak ? "Time to work!" : "Time for a break!",
          icon: '/assets/icons/icon-192.png'
        }
      );
    }
  );

  // Visual feedback instead of alert
  const applyBtn = document.getElementById('apply-settings-btn');
  applyBtn.textContent = '✓ Applied!';
  setTimeout(() => {
    applyBtn.textContent = 'Apply Settings';
  }, 2000);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('start-btn').addEventListener('click', () => {
    timer.start();
    // Start animation timeline
    document.documentElement.style.setProperty('--session-progress', `${timer.remainingTime}s linear`);
  });

  document.getElementById('pause-btn').addEventListener('click', () => {
    timer.pause();
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    timer.reset();
  });

  document.getElementById('apply-settings-btn').addEventListener('click', applySettings);

  // Request notification permission
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  // Initial display update
  updateDisplay(timer.getTime(), timer.isOnBreak, timer.isLongBreak, timer.sessionsCompleted);
});