
import React from 'react';

interface CommentaryProps {
  commentary: { id: number; text: string }[];
  isGenerating: boolean;
}

const Commentary: React.FC<CommentaryProps> = ({ commentary, isGenerating }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-white h-64 flex flex-col">
      <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Live Commentary</h3>
      <div className="flex-grow overflow-y-auto pr-2">
        {isGenerating && (
            <div className="flex items-center space-x-2 text-gray-400 mb-2 animate-pulse">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>AI is thinking...</span>
            </div>
        )}
        <ul className="space-y-3">
          {commentary.map((entry) => (
            <li key={entry.id} className="text-sm leading-relaxed text-gray-300">
              {entry.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commentary;
