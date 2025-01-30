function storeLoginDetails(firstName, lastName, emailid, phonenumber, password) {
    if (firstName && lastName && emailid && phonenumber && password) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('emailid', emailid);
        localStorage.setItem('phonenumber', phonenumber);
        localStorage.setItem('password', password);
        return true;
    }
    return false;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function displayErrorMessage(fieldId, message) {
    const errorField = document.getElementById(fieldId);
    errorField.textContent = message;
}

function clearAllErrorMessages() {
    displayErrorMessage('errorfirstname', '');
    displayErrorMessage('errorsecondname', '');
    displayErrorMessage('erroremail', '');
    displayErrorMessage('errornumber', '');
    displayErrorMessage('errorpassword', '');
}
function handleSignup() {
    const firstName = getInputValue('firstName');
    const lastName = getInputValue('lastName');
    const emailid = getInputValue('emailid');
    const phonenumber = getInputValue('phonenumber');
    const password = getInputValue('password');
    const confirm_password = getInputValue('confirm_password');

    
    clearAllErrorMessages();

    if (firstName.length < 3) {
        displayErrorMessage('errorfirstname', 'First name must be at least 3 characters.');
        return;
    }
    if (lastName.length < 3) {
        displayErrorMessage('errorsecondname', 'Last name must be at least 3 characters.');
        return;
    }
    if (!validateEmail(emailid)) {
        displayErrorMessage('erroremail', 'Please enter a valid email address.');
        return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phonenumber)) {
        displayErrorMessage('errornumber', 'Please enter a valid 10-digit phone number.');
        return;
    }
    if (password !== confirm_password) {
        displayErrorMessage('errorpassword', 'Passwords do not match.');
        return;
    }
    const isStored = storeLoginDetails(firstName, lastName, emailid, phonenumber, password);

    if (isStored) {
        alert('Sign-up successful!');
        // window.location.href = "./login.html";
    } else {
        displayErrorMessage('errorpassword', 'Please enter all required details correctly.');
    }
}
function getInputValue(inputId) {
    return document.getElementById(inputId).value.trim();
}

document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.querySelector('.buttonSignup');
    if (signupButton) {
        signupButton.addEventListener('click', handleSignup);
    }
});
