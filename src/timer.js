export class PomodoroTimer {
    constructor(workDuration, shortBreakDuration, longBreakDuration, onTick, onComplete) {
        this.workDuration = workDuration;
        this.shortBreakDuration = shortBreakDuration;
        this.longBreakDuration = longBreakDuration;
        this.sessionsCompleted = 0;
        this.isOnBreak = false;
        this.isLongBreak = false;
        this.remainingTime = workDuration;
        this.intervalId = null;
        this.onTick = onTick;
        this.onComplete = onComplete;
    }

    start() {
        if (this.intervalId) {
            console.log("Timer already running.");
            return; // Prevent multiple intervals
        }
        console.log("Timer started"); // Check if the start button works
        this.intervalId = setInterval(() => {
            this.remainingTime--;
            console.log(`Time left: ${this.remainingTime} seconds`); // Show time counting down
            this.onTick(this.getTime());
            if (this.remainingTime <= 0) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.completeCycle();
            }
        }, 1000);
    }

    completeCycle() {
        this.onComplete();
        if (!this.isOnBreak) {
            this.sessionsCompleted++;
            this.isOnBreak = true;
            this.isLongBreak = (this.sessionsCompleted % 4 === 0); // Long break after 4 sessions
            this.remainingTime = this.isLongBreak ? this.longBreakDuration : this.shortBreakDuration;
        } else {
            this.isOnBreak = false;
            this.remainingTime = this.workDuration;
        }
        this.onTick(this.getTime());
        console.log("Cycle completed. Switching session.");
    }

    pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log("Timer paused");
    }

    reset() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isOnBreak = false;
        this.isLongBreak = false;
        this.remainingTime = this.workDuration;
        this.onTick(this.getTime());
        console.log("Timer reset");
    }

    getTime() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return { minutes, seconds };
    }
}
