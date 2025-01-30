
function storeLoginDetails(username, password) {
    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        return true; 
    }
    return false; 
}

function handleLogin() {
    const username = getInputValue('name');
    const password = getInputValue('password');

    const isStored = storeLoginDetails(username, password);

    if (isStored) {
        alert('Login details stored in local storage!');
        window.location.href = "./index.html";
    } else {
        alert('Please enter both username and password.');
    }
}

function getInputValue(inputId) {
    return document.getElementById(inputId).value;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.buttonLogin');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
});
