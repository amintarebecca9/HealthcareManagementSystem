import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with customizable styles and types
 */
export default function Button({ type = 'button', variant = 'primary', children, onClick, className = '', ...props }) {
  const baseStyles = 'px-4 py-2 rounded font-semibold focus:outline-none transition duration-150';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border border-gray-400 text-gray-800 hover:bg-gray-100', //subject to change 
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
