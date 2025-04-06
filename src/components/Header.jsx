import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Education Equity</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/stats" className="hover:text-gray-300">Inequality Stats</Link>
        <Link to="/faculty" className="hover:text-gray-300">Faculty Assignment</Link>
        <Link to="/feedback" className="mr-4">Feedback</Link>
        <Link to="/session" className="mr-4">Session</Link>
      </nav>
    </header>
  );
};

export default Header;
