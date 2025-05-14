document.addEventListener('DOMContentLoaded', function() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    if (!token) {

        window.location.href = 'login.html';
        return;
    }
    
    console.log("Dashboard loaded with token:", token); // Add logging
    

    updateUserInfo(username, userRole);
    

    showRolePanel(userRole);
});

// Update user info in the header
function updateUserInfo(username, role) {
    const userInfoElement = document.getElementById('user-info');
    
    if (!userInfoElement) return;
    
    userInfoElement.innerHTML = `
        <span>Welcome, ${username}</span>
        <span class="user-badge">${role}</span>
        <button onclick="logout()" class="btn btn-logout">Logout</button>
    `;
}

// Show the appropriate panel based on user role
function showRolePanel(role) {
    // Hide all panels first
    document.querySelectorAll('.role-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    // Show the appropriate panel
    switch (role) {
        case 'DOCTOR':
            document.getElementById('doctor-panel').style.display = 'block';
            break;
        case 'PATIENT':
            document.getElementById('patient-panel').style.display = 'block';
            break;
        case 'STAFF':
            document.getElementById('staff-panel').style.display = 'block';
            break;
        case 'ADMIN':
            document.getElementById('admin-panel').style.display = 'block';
            break;
        default:
            // If role is not recognized, show a generic message
            console.error('Unknown role:', role);
    }
}

// Add a helper function to make authenticated API calls
function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    
    // Add authorization header
    if (token) {
        if (!options.headers) options.headers = {};
        options.headers['Authorization'] = `Bearer ${token}`;
        console.log("Using token for request:", token.substring(0, 20) + "...");
    } else {
        console.warn("No auth token found for request to:", url);
        // Redirect to login if no token
        window.location.href = 'login.html';
        return Promise.reject(new Error('Authentication required'));
    }
    
    return fetch(url, options)
        .then(response => {
            console.log(`Response from ${url}: ${response.status} ${response.statusText}`);
            
            // Handle 401 (Unauthorized) by redirecting to login
            if (response.status === 401 || response.status === 403) {
                console.error("Authentication failed, redirecting to login");
                localStorage.removeItem('token');
                window.location.href = 'login.html';
                throw new Error('Authentication failed');
            }
            
            return response;
        })
        .catch(error => {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        });
}

// Logout function
function logout() {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    // Redirect to login page
    window.location.href = 'login.html';
}
