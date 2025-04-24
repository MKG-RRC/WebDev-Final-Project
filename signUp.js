// Simulate a database using local storage
function signUp(event) {
    event.preventDefault();

    // Get user input
    const username = document.getElementById("sign-up-username").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;

    // Clear previous error messages and styles
    clearErrorMessages();

    let valid = true;

    // Validate Email Format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showError("sign-up-email", "Invalid email format. Please enter a valid email address.");
        valid = false;
    }

    // Validate Password Format (at least 8 characters, one uppercase, one lowercase, one number, and one special character)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        showError("sign-up-password", "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
        valid = false;
    }

    // Check if the username already exists in local storage
    if (localStorage.getItem(username)) {
        showError("sign-up-username", "Username already exists. Please choose another username.");
        valid = false;
    }

    if (valid) {
        // Store the user data in local storage
        localStorage.setItem(username, JSON.stringify({ password: password, email: email }));

        // Hide the form and show the success message
        document.getElementById("sign-up-form").style.display = "none";
        document.getElementById("success-message").style.display = "block";
    }
}

// Show error message below the input field and highlight the field
function showError(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;

    // Add the error class to the input field to change its border color
    inputField.classList.add("error");
    
    // Append the error message after the input field
    inputField.parentElement.appendChild(errorMessage);
}

// Clear all previous error messages and reset styles
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    const errorFields = document.querySelectorAll(".error");

    errorMessages.forEach(message => message.remove());
    errorFields.forEach(field => field.classList.remove("error"));
}
