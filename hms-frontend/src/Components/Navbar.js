import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Navbar component - reusable top navigation bar
 */
export default function Navbar({ role, onLogout }) {
  const commonLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/messages', label: 'Messages' },
    { path: '/notifications', label: 'Notifications' },
  ];

  const roleLinks = {
    doctor: [
      { path: '/ehr', label: 'My Patients' },
    ],
    patient: [
      { path: '/ehr', label: 'My Records' },
    ],
    admin: [
      { path: '/billing', label: 'Billing' },
      { path: '/users', label: 'User Mgmt' },
    ],
  };

  const links = [...commonLinks, ...(roleLinks[role] || [])];

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">HMS</div>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Button variant="outline" onClick={onLogout}>
        Logout
      </Button>
    </nav>
  );
}

Navbar.propTypes = {
  role: PropTypes.oneOf(['doctor', 'patient', 'admin']).isRequired,
  onLogout: PropTypes.func.isRequired,
};