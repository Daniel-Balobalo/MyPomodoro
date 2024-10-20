export function updateDisplay({ minutes, seconds }, isOnBreak, isLongBreak, sessionsCompleted) {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    const sessionText = document.getElementById('session-text');
    if (isOnBreak) {
        sessionText.textContent = isLongBreak ? "Long Break" : "Short Break";
    } else {
        sessionText.textContent = `Work Session ${sessionsCompleted + 1}`;
    }
}

export function playAlarm() {
    const alarm = document.getElementById('alarm-sound');
    alarm.play();
}
