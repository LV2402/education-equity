import React from 'react';
import Header from './Header';

const RootLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
