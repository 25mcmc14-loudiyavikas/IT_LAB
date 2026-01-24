const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const phoneInput = document.getElementById('phone');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const dobError = document.getElementById('dobError');
const phoneError = document.getElementById('phoneError');
const passwordStrengthDiv = document.getElementById('passwordStrength');

function validateName() {
    const name = nameInput.value.trim();
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(name)) {
        nameError.textContent = 'Name must contain only letters.';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        emailError.textContent = 'Invalid email format.';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    const lengthValid = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);

    if (!lengthValid || !uppercase || !lowercase || !number || !specialChar) {
        passwordError.textContent = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
        updatePasswordStrength(password);
        return false;
    } else {
        passwordError.textContent = '';
        updatePasswordStrength(password);
        return true;
    }
}

function updatePasswordStrength(password) {
    const score = Math.min(password.length + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0) + (/[!@#$%^&*()_+={}\[\]:;"'<>?,./]/.test(password) ? 1 : 0), 10);
    let strength = '';
    if (score >= 8) {
        strength = 'Strong';
        passwordStrengthDiv.style.color = 'green';
    } else if (score >= 5) {
        strength = 'Moderate';
        passwordStrengthDiv.style.color = 'orange';
    } else {
        strength = 'Weak';
        passwordStrengthDiv.style.color = 'red';
    }
    passwordStrengthDiv.textContent = `Password Strength: ${strength}`;
}

function validateDob() {
    const dobValue = dobInput.value;
    if (!dobValue) {
        dobError.textContent = 'Please select your date of birth.';
        return false;
    }
    const dob = new Date(dobValue);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 18) {
        dobError.textContent = 'You must be at least 18 years old.';
        return false;
    } else {
        dobError.textContent = '';
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const regex = /^\d{10}$/;
    if (!regex.test(phone)) {
        phoneError.textContent = 'Phone number must be exactly 10 digits.';
        return false;
    } else {
        phoneError.textContent = '';
        return true;
    }
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
dobInput.addEventListener('change', validateDob);
phoneInput.addEventListener('input', validatePhone);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isDobValid = validateDob();
    const isPhoneValid = validatePhone();

    if (isNameValid && isEmailValid && isPasswordValid && isDobValid && isPhoneValid) {
        alert('Registration Successful!');
        form.reset();
        passwordStrengthDiv.textContent = '';
    } else {
        alert('Please correct the errors in the form.');
    }
});