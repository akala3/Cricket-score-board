
import React from 'react';
import { CONTROL_BUTTONS } from '../constants';

interface ControlsProps {
  onBallPlay: (outcome: string | number) => void;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onBallPlay, disabled }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-white mb-3 text-center">Simulate Next Ball</h3>
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {CONTROL_BUTTONS.map(({ label, value }) => {
          const isWicket = value === "W";
          const isExtra = value === "WD" || value === "NB";
          const isBoundary = value === 4 || value === 6;

          const baseClasses = "w-full py-3 text-lg font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
          
          let colorClasses = "bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400";
          if (isBoundary) colorClasses = "bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-400";
          if (isWicket) colorClasses = "bg-red-600 hover:bg-red-500 text-white focus:ring-red-400";
          if (isExtra) colorClasses = "bg-yellow-500 hover:bg-yellow-400 text-gray-900 focus:ring-yellow-300";

          return (
            <button
              key={value.toString()}
              onClick={() => onBallPlay(value)}
              disabled={disabled}
              className={`${baseClasses} ${colorClasses}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Controls;
