import React from 'react';
import { LoaderIcon, SparklesIcon } from './icons';

interface PoemInputProps {
  poem: string;
  setPoem: (poem: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PoemInput: React.FC<PoemInputProps> = ({ poem, setPoem, onGenerate, isLoading }) => {
  return (
    <div className="bg-white/60 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-purple-200">
      <label htmlFor="poem-input" className="block text-lg font-semibold text-purple-700 mb-2">
        Írj be egy magyar verset
      </label>
      <textarea
        id="poem-input"
        value={poem}
        onChange={(e) => setPoem(e.target.value)}
        placeholder="pl. 'Föltámadott a tenger...'"
        rows={8}
        className="w-full p-4 border-2 border-mint-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-300 resize-none bg-white/80"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !poem.trim()}
        className="mt-4 w-full flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-purple-300 disabled:cursor-not-allowed disabled:scale-100 shadow-md"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="w-6 h-6" />
            Álmod szövése...
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6" />
            Álomkép Létrehozása
          </>
        )}
      </button>
    </div>
  );
};

export default PoemInput;