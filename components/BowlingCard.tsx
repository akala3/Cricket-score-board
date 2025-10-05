
import React from 'react';
import { Bowler } from '../types';

interface BowlingCardProps {
  bowlers: Bowler[];
  teamName: string;
}

const BowlingCard: React.FC<BowlingCardProps> = ({ bowlers, teamName }) => {
  const activeBowlers = bowlers.filter(b => b.overs > 0);
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-white w-full">
      <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">{teamName} Bowling</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-2">Bowler</th>
              <th scope="col" className="px-2 py-2 text-center">O</th>
              <th scope="col" className="px-2 py-2 text-center">M</th>
              <th scope="col" className="px-2 py-2 text-center">R</th>
              <th scope="col" className="px-2 py-2 text-center">W</th>
              <th scope="col" className="px-2 py-2 text-center">ER</th>
            </tr>
          </thead>
          <tbody>
            {activeBowlers.map(bowler => (
              <tr key={bowler.id} className={`border-b border-gray-700 ${bowler.isBowling ? 'bg-gray-900 font-medium' : 'opacity-60'}`}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {bowler.name}
                  {bowler.isBowling && <span className="text-yellow-400 ml-1">*</span>}
                </td>
                <td className="px-2 py-2 text-center">{bowler.overs.toFixed(1)}</td>
                <td className="px-2 py-2 text-center">{bowler.maidens}</td>
                <td className="px-2 py-2 text-center">{bowler.runsConceded}</td>
                <td className="px-2 py-2 text-center">{bowler.wickets}</td>
                <td className="px-2 py-2 text-center">{bowler.economyRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BowlingCard;
