
import React from 'react';
import { Player } from '../types';

interface BattingCardProps {
  players: Player[];
  teamName: string;
}

const BattingCard: React.FC<BattingCardProps> = ({ players, teamName }) => {
  const onCreasePlayers = players.filter(p => p.status === 'striker' || p.status === 'non-striker');
  const outPlayers = players.filter(p => p.status === 'out');

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-white w-full">
      <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">{teamName} Batting</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-2">Batter</th>
              <th scope="col" className="px-2 py-2 text-center">R</th>
              <th scope="col" className="px-2 py-2 text-center">B</th>
              <th scope="col" className="px-2 py-2 text-center">4s</th>
              <th scope="col" className="px-2 py-2 text-center">6s</th>
              <th scope="col" className="px-2 py-2 text-center">SR</th>
            </tr>
          </thead>
          <tbody>
            {onCreasePlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-700 bg-gray-900 font-medium">
                <td className="px-4 py-2 whitespace-nowrap">
                  {player.name}
                  {player.status === 'striker' && <span className="text-yellow-400 ml-1">*</span>}
                </td>
                <td className="px-2 py-2 text-center">{player.runs}</td>
                <td className="px-2 py-2 text-center">{player.balls}</td>
                <td className="px-2 py-2 text-center">{player.fours}</td>
                <td className="px-2 py-2 text-center">{player.sixes}</td>
                <td className="px-2 py-2 text-center">{player.strikeRate.toFixed(2)}</td>
              </tr>
            ))}
             {outPlayers.map(player => (
              <tr key={player.id} className="border-b border-gray-700 opacity-60">
                <td className="px-4 py-2">
                    <div className="flex flex-col">
                        <span>{player.name}</span>
                        <span className="text-xs text-red-400">{player.outMethod}</span>
                    </div>
                </td>
                <td className="px-2 py-2 text-center">{player.runs}</td>
                <td className="px-2 py-2 text-center">{player.balls}</td>
                <td className="px-2 py-2 text-center">{player.fours}</td>
                <td className="px-2 py-2 text-center">{player.sixes}</td>
                <td className="px-2 py-2 text-center">{player.strikeRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BattingCard;
