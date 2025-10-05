
import React from 'react';

interface HeaderProps {
  battingTeam: string;
  bowlingTeam: string;
  matchStatus: string;
}

const Header: React.FC<HeaderProps> = ({ battingTeam, bowlingTeam, matchStatus }) => {
  return (
    <header className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center text-white">
        <div className="text-2xl font-bold">
          <span className="text-blue-400">{battingTeam}</span>
          <span className="text-gray-500 mx-2">vs</span>
          <span className="text-red-400">{bowlingTeam}</span>
        </div>
      </div>
      <p className="text-center text-yellow-300 mt-2 text-sm font-medium animate-pulse">{matchStatus}</p>
    </header>
  );
};

export default Header;
