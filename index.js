#! /usr/bin/env node
import inquirer from 'inquirer';
class CountdownTimer {
    minutes;
    seconds;
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
    }
    displayTime() {
        const minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        const seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        console.log(`Time remaining: ${minutes}:${seconds}`);
    }
    async start() {
        const interval = setInterval(() => {
            if (this.seconds === 0 && this.minutes === 0) {
                clearInterval(interval);
                console.log('Countdown complete!');
            }
            else {
                if (this.seconds === 0) {
                    this.minutes--;
                    this.seconds = 59;
                }
                else {
                    this.seconds--;
                }
                this.displayTime();
            }
        }, 1000);
    }
}
async function getTimerInput() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'minutes',
            message: 'Enter countdown minutes:',
            validate: (input) => {
                const parsed = parseInt(input, 10);
                return !isNaN(parsed) && parsed >= 0 ? true : 'Please enter a valid number of minutes.';
            },
            default: 0,
        },
        {
            type: 'input',
            name: 'seconds',
            message: 'Enter countdown seconds:',
            validate: (input) => {
                const parsed = parseInt(input, 10);
                return !isNaN(parsed) && parsed >= 0 && parsed < 60 ? true : 'Please enter a valid number of seconds (0-59).';
            },
            default: 0,
        },
    ]);
    return {
        minutes: parseInt(answers.minutes, 10),
        seconds: parseInt(answers.seconds, 10),
    };
}
async function runCountdownTimer() {
    const { minutes, seconds } = await getTimerInput();
    const countdownTimer = new CountdownTimer(minutes, seconds);
    countdownTimer.start();
}
runCountdownTimer();
