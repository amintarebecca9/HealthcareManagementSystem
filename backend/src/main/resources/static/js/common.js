// common.js

// Populate user display info
function populateUserInfo() {
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');

  document.querySelectorAll('.username').forEach(el => {
    if (username) el.textContent = username;
  });

  document.querySelectorAll('.user-role').forEach(el => {
    if (userRole) el.textContent = userRole;
  });

  if (username) {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    if (loginLink) loginLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'inline-block';
  }
}

// Perform a fetch with stored JWT in Authorization header
async function fetchWithAuth(url, opts = {}) {
  const token = localStorage.getItem('token');
  opts.headers = {
    ...(opts.headers || {}),
    'Authorization': token ? `Bearer ${token}` : undefined,
  };
  return fetch(url, opts);
}

// Expose globally
window.populateUserInfo = populateUserInfo;
window.fetchWithAuth    = fetchWithAuth;