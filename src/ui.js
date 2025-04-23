export function updateDisplay({ minutes, seconds }, isOnBreak, isLongBreak, sessionsCompleted) {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    const sessionText = document.getElementById('session-text');
    const sessionProgress = document.querySelector('.session-progress');
    
    if (isOnBreak) {
        sessionText.textContent = isLongBreak ? "Long Break" : "Short Break";
        sessionText.className = isLongBreak ? "session-title long-break" : "session-title short-break";
        sessionProgress.className = isLongBreak ? "session-progress long-break" : "session-progress short-break";
    } else {
        sessionText.textContent = `Work Session ${sessionsCompleted + 1}`;
        sessionText.className = "session-title work-session";
        sessionProgress.className = "session-progress work-session";
    }
    
    // Update animation timeline
    const totalTime = isOnBreak ? 
        (isLongBreak ? longBreakDuration : shortBreakDuration) : 
        workDuration;
    const remainingTime = minutes * 60 + seconds;
    document.documentElement.style.setProperty('--session-progress', `${remainingTime}s linear`);
}

export function playAlarm() {
    const alarm = document.getElementById('alarm-sound');
    alarm.currentTime = 0;
    alarm.play().catch(e => console.log("Audio play failed:", e));
    
    // Visual feedback
    document.documentElement.animate(
        [
            { backgroundColor: 'var(--surface-1)' },
            { backgroundColor: 'var(--accent)' },
            { backgroundColor: 'var(--surface-1)' }
        ],
        {
            duration: 1000,
            easing: 'ease-out'
        }
    );
}