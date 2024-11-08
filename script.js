const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const toggleDarkModeButton = document.getElementById('darkModeToggle');

// Toggle form panel
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Save user on sign up
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    alert('User registered successfully!');
    container.classList.remove('right-panel-active');
});

// Check user on sign in
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Sign in successful!');
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Dark mode toggle
// Get the button element
const toggleButton = document.getElementById('darkModeToggle');

// Add event listener to toggle dark mode
toggleButton.addEventListener('click', () => {
  // Toggle the 'dark-mode' class on the body
  document.body.classList.toggle('dark-mode');
});


// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
