'use client';

import React from 'react';
import NavBar from './NavBar';

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default AppContent;
