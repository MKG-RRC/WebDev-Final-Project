document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const summaryContainer = document.getElementById("summary-container");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting automatically

        let isValid = true;

        // Get form fields
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        // Clear previous error messages
        clearErrorMessages();

        // Validate First Name
        if (firstName.value.trim() === "") {
            showError(firstName, "First name is required");
            isValid = false;
        }

        // Validate Last Name
        if (lastName.value.trim() === "") {
            showError(lastName, "Last name is required");
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email.value.trim()) {
            showError(email, "Email is required");
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError(email, "Please enter a valid email address");
            isValid = false;
        }

        // Validate Phone Number
        const phonePattern = /^[0-9]{10}$/; // Adjust the pattern as per your phone number format
        if (!phone.value.trim()) {
            showError(phone, "Phone number is required");
            isValid = false;
        } else if (!phonePattern.test(phone.value)) {
            showError(phone, "Please enter a valid phone number (10 digits)");
            isValid = false;
        }

        // Validate Message
        if (message.value.trim() === "") {
            showError(message, "Message is required");
            isValid = false;
        }

        // If form is valid, display summary
        if (isValid) {
            // Hide form and show summary
            form.style.display = "none";
            summaryContainer.style.display = "block";

            // Display submitted information in summary
            document.getElementById("summary-first-name").textContent = firstName.value;
            document.getElementById("summary-last-name").textContent = lastName.value;
            document.getElementById("summary-email").textContent = email.value;
            document.getElementById("summary-phone").textContent = phone.value;
            document.getElementById("summary-message").textContent = message.value;
        }
    });

    // Show error message next to the invalid field
    function showError(field, message) {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.textContent = message;
        field.classList.add("error");
        field.parentElement.appendChild(errorSpan);
    }

    // Clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        const errorFields = document.querySelectorAll(".error");

        errorMessages.forEach(message => message.remove());
        errorFields.forEach(field => field.classList.remove("error"));
    }
});
