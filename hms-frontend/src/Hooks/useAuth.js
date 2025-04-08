import { useContext } from 'react';
import { AuthContext } from 'D:/College/Senior/CS520/REACT Project - FE/hms-frontend/src/contexts/authContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}