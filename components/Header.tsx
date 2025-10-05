
import React from 'react';
import { SparklesIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-purple-100/30 rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-yellow-500" />
        <h1 className="text-5xl font-handwriting text-purple-800">
          Hungarian Poem Dream Weaver
        </h1>
        <SparklesIcon className="w-10 h-10 text-yellow-500" />
      </div>
      <p className="text-purple-600 mt-2">Transforming verses into visual wonders.</p>
    </header>
  );
};

export default Header;
