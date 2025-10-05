import React, { useState } from 'react';
import { ArtCreation } from '../types';
// FIX: Import `SparklesIcon` to resolve the "Cannot find name" error.
import { DownloadIcon, HeartIcon, LoaderIcon, ShareIcon, SparklesIcon } from './icons';

interface ImageDisplayProps {
  artCreation: Omit<ArtCreation, 'id'> | null;
  isLoading: boolean;
  error: string | null;
  onSave: () => void;
  isFavorite: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ artCreation, isLoading, error, onSave, isFavorite }) => {
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full aspect-square bg-white/60 flex flex-col items-center justify-center rounded-xl shadow-lg backdrop-blur-sm border border-mint-200 text-purple-700">
        <LoaderIcon className="w-16 h-16" />
        <p className="mt-4 text-lg font-semibold">A mesterséges intelligencia megálmodja a képed...</p>
        <p className="text-sm">Ez eltarthat egy pillanatig.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full aspect-square bg-red-100/60 flex flex-col items-center justify-center rounded-xl shadow-lg backdrop-blur-sm border border-red-300 text-red-700 p-4">
        <h3 className="text-lg font-bold">Hiba történt</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!artCreation || !artCreation.imageUrl) {
    return (
      <div className="w-full aspect-square bg-white/60 flex flex-col items-center justify-center rounded-xl shadow-lg backdrop-blur-sm border border-mint-200 text-purple-700">
        <SparklesIcon className="w-16 h-16 text-yellow-400" />
        <p className="mt-4 text-lg font-semibold">Az álomképed itt fog megjelenni</p>
      </div>
    );
  }

  const { imageUrl, poem } = artCreation;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'alomkep.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleCopyPoem = () => {
    navigator.clipboard.writeText(poem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white/60 p-4 rounded-xl shadow-lg backdrop-blur-sm border border-yellow-200">
      <div className="relative group">
        <img src={imageUrl} alt="MI által generált művészet a versből" className="w-full h-full object-cover rounded-lg shadow-md" />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={onSave} title="Mentés a kedvencek közé" className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-purple-100 transition-colors">
            <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-purple-600'}`} isFilled={isFavorite} />
          </button>
          <button onClick={handleDownload} title="Kép letöltése" className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-purple-100 transition-colors">
            <DownloadIcon className="w-6 h-6 text-purple-600" />
          </button>
           <button onClick={handleCopyPoem} title="Vers másolása" className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-purple-100 transition-colors">
            <ShareIcon className="w-6 h-6 text-purple-600" />
          </button>
        </div>
        {copied && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">Vers másolva!</div>}
      </div>
    </div>
  );
};

export default ImageDisplay;