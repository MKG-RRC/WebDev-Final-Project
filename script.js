// Get the menu icon and menu links
const menuIcon = document.getElementById('menu');
const menuLinks = document.querySelector('.menu-icons');

// Toggle the menu visibility when the icon is clicked
menuIcon.addEventListener('click', function() {
  // Toggle the display between 'none' and 'block'
  if (menuLinks.style.display === 'none') {
    menuLinks.style.display = 'block'; // Show menu
  } else {
    menuLinks.style.display = 'none'; // Hide menu
  }
});

// Get the proceed button element
const proceedButton = document.getElementById('proceed-button');

// Add an event listener to the proceedButton
proceedButton.addEventListener('click', function(event) {
  // Prevent the default action if needed (e.g., if it's a form submit button)
  event.preventDefault();

  // Get the section you want to scroll to (in this case, #pomodoro-section)
  const nextSection = document.getElementById('pomodoro-section');

  // Scroll to the next section smoothly
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error("Target section '#pomodoro-section' not found.");
  }
});



// script.js
let timer;
let isBreak = false;  // False means Pomodoro, True means Break
let minutes = 25;     // Pomodoro time
let seconds = 0;      // Starting with 0 seconds

const timeDisplay = document.querySelector(".time-display");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const breakBtn = document.querySelector(".break-btn");

function updateTime() {
    if (seconds === 0) {
        if (minutes === 0) {
            // When timer reaches 0:00, start the break or Pomodoro
            if (!isBreak) {
                isBreak = true;
                minutes = 5;
                seconds = 0;
                alert("Pomodoro Session Complete! Time for a Break!");
            } else {
                isBreak = false;
                minutes = 25;
                seconds = 0;
                alert("Break's Over! Time to Work!");
            }
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }

    // Format time to always show two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(updateTime, 1000);
}

function resetTimer() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    timeDisplay.textContent = "25:00";
}

function startBreak() {
    clearInterval(timer);
    isBreak = true;
    minutes = 5;
    seconds = 0;
    timeDisplay.textContent = "05:00";
    startTimer();
}

// Event Listeners for buttons
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
breakBtn.addEventListener("click", startBreak);




