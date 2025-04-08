import React, { useState } from 'react';
import { login as loginAPI } from 'D:/College/Senior/CS520/REACT Project - FE/hms-frontend/src/services/authService';
import useAuth from 'D:/College/Senior/CS520/REACT Project - FE/hms-frontend/src/hooks/useAuth';
import Button from 'D:/College/Senior/CS520/REACT Project - FE/hms-frontend/src/components/Button';

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAPI(form);
      login(data);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-full max-w-sm">
      <h2 className="text-xl font-semibold text-center">Login</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full p-2 border rounded"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <Button type="submit" variant="primary">Login</Button>
    </form>
  );
}