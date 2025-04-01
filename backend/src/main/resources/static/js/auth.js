document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            login(username, password);
        });
    }
    
    // Register form handling
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // Store auth data in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRole', data.role);
        
        console.log("Login successful, token:", data.token); // Add logging
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    });
}

// Register function
function register(username, email, password, role) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    
    fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Registration failed');
            });
        }
        return response.json();
    })
    .then(data => {
        // Show success message and redirect to login page
        alert('Registration successful! Please log in.');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = error.message || 'Registration failed. Please try again.';
        errorMessage.style.display = 'block';
    });
}
