'use client';

import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase-config';  // Adjust path accordingly
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create context
const AuthContext = createContext();

// AuthProvider to wrap around your components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);  // Track if we are on the client side

  useEffect(() => {
    setIsClient(true); // Set client-side flag to true
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state based on auth changes
    });

    return () => unsubscribe(); // Clean up when the component unmounts
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);  // Firebase SignOut
      setUser(null);  // Clear user state
    } catch (error) {
      console.error('Error signing out: ', error);  // Handle sign out error
    }
  };

  // Only render the provider after ensuring we're on the client
  if (!isClient) {
    return null;  // Or render a loading spinner if needed
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => React.useContext(AuthContext);
