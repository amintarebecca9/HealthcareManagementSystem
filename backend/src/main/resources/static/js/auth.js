document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;

    // If I'm on login.html or register.html and already have a token, go to dashboard
    if (token && (path.endsWith('login.html') || path.endsWith('register.html'))) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Otherwise, if I don't have a token and I'm on a protected page (dashboard or messaging),
    // send me back to login
    const protectedPages = ['dashboard.html', 'messaging.html'];
    if (!token && protectedPages.some(p => path.endsWith(p))) {
        window.location.href = 'login.html';
        return;
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    // Register form handling
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email    = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role     = document.getElementById('role').value;
            register(username, email, password, role);
        });
    }
});

// Login function
function login(username, password) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role);
        window.location.href = 'dashboard.html';
    })
    .catch(err => {
        console.error(err);
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    });
}