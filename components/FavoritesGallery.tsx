
import React from 'react';
import { ArtCreation } from '../types';
import { TrashIcon } from './icons';

interface FavoritesGalleryProps {
  favorites: ArtCreation[];
  onRemove: (id: string) => void;
}

const FavoritesGallery: React.FC<FavoritesGalleryProps> = ({ favorites, onRemove }) => {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-12">
      <h2 className="text-3xl font-handwriting text-purple-800 text-center mb-6">
        Your Dream Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((fav) => (
          <div key={fav.id} className="relative group bg-white/60 p-3 rounded-xl shadow-lg backdrop-blur-sm border border-purple-200">
            <img src={fav.imageUrl} alt="Favorite generated art" className="w-full aspect-square object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-4">
              <p className="text-white text-sm text-center line-clamp-4">
                {fav.poem}
              </p>
            </div>
            <button
              onClick={() => onRemove(fav.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 transform hover:scale-110"
              title="Remove from favorites"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesGallery;
