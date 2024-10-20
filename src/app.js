import { PomodoroTimer } from './timer.js';
import { updateDisplay, playAlarm } from './ui.js';

// Initial settings
let workDuration = 25 * 60;       // 25 minutes in seconds
let shortBreakDuration = 5 * 60;  // 5 minutes in seconds
let longBreakDuration = 15 * 60;  // 15 minutes in seconds

// Timer initialization
let timer = new PomodoroTimer(
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    (time) => updateDisplay(time, timer.isOnBreak, timer.isLongBreak, timer.sessionsCompleted),
    () => {
        playAlarm();
        alert(timer.isOnBreak ? "Break over! Time to work!" : "Work session complete! Time for a break!");
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
            alert(timer.isOnBreak ? "Break over! Time to work!" : "Work session complete! Time for a break!");
        }
    );

    alert(`Settings updated! Work: ${workDuration / 60} mins, Short Break: ${shortBreakDuration / 60} mins, Long Break: ${longBreakDuration / 60} mins.`);
}

// Ensure the DOM is loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('start-btn').addEventListener('click', () => {
        timer.start();
    });

    document.getElementById('pause-btn').addEventListener('click', () => {
        timer.pause();
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        timer.reset();
    });

    document.getElementById('apply-settings-btn').addEventListener('click', applySettings);

    // Initial display update
    updateDisplay(timer.getTime(), timer.isOnBreak, timer.isLongBreak, timer.sessionsCompleted);
});
