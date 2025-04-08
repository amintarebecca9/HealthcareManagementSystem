// import axios from 'axios';

// const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// export async function login({ username, password }) {
//   const response = await axios.post(`${API}/login`, { username, password });
//   return response.data; // { user, token }
// }

//mock login for testing
export async function login({ username, password }) {
  // Simulate a fake doctor account
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'doctor' && password === '1234') {
        resolve({
          user: { username: 'drsmith', role: 'doctor' },
          token: 'mock-token-abc123'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}