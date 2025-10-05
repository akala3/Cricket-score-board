
import React from 'react';

interface ScoreboardProps {
  score: number;
  wickets: number;
  overs: number;
  ballsThisOver: number;
  battingTeam: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, wickets, overs, ballsThisOver, battingTeam }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 text-white text-center">
      <h2 className="text-2xl font-semibold text-gray-400 mb-2">{battingTeam} Innings</h2>
      <div className="flex justify-center items-center space-x-4">
        <div className="text-6xl font-bold text-green-400">
          {score} - {wickets}
        </div>
        <div className="text-2xl font-medium text-gray-300">
          ({overs}.{ballsThisOver} Overs)
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
