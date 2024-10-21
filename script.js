const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupForm = document.getElementById('signUpForm')
const loginForm = document.getElementById('signInForm')




signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    alert('User registered successfully!');

    container.classList.remove('right-panel-active');
});
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('User registered successfully!');
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
