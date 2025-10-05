
import React, { useState, useMemo } from 'react';
import { ArtCreation } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateImageFromPoem } from './services/geminiService';
import Header from './components/Header';
import PoemInput from './components/PoemInput';
import ImageDisplay from './components/ImageDisplay';
import FavoritesGallery from './components/FavoritesGallery';

function App() {
  const [poem, setPoem] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorage<ArtCreation[]>('poem-dreams', []);

  const currentArtCreation = useMemo(() => {
    if (!currentImageUrl) return null;
    return { poem, imageUrl: currentImageUrl };
  }, [poem, currentImageUrl]);
  
  const isCurrentFavorite = useMemo(() => {
    if (!currentArtCreation) return false;
    return favorites.some(fav => fav.imageUrl === currentArtCreation.imageUrl && fav.poem === currentArtCreation.poem);
  }, [favorites, currentArtCreation]);

  const handleGenerate = async () => {
    if (!poem.trim()) return;
    setIsLoading(true);
    setError(null);
    setCurrentImageUrl(null);
    try {
      const imageUrl = await generateImageFromPoem(poem);
      setCurrentImageUrl(imageUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFavorite = () => {
    if (!currentArtCreation || isCurrentFavorite) return;
    const newFavorite: ArtCreation = {
      id: new Date().toISOString(),
      ...currentArtCreation,
    };
    setFavorites(prev => [newFavorite, ...prev]);
  };
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-rose-50 to-green-50 text-slate-800">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
          <PoemInput
            poem={poem}
            setPoem={setPoem}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <ImageDisplay
            artCreation={currentArtCreation}
            isLoading={isLoading}
            error={error}
            onSave={handleSaveFavorite}
            isFavorite={isCurrentFavorite}
          />
        </div>
        <FavoritesGallery favorites={favorites} onRemove={handleRemoveFavorite} />
      </main>
      <footer className="text-center py-4 text-purple-500 text-sm">
        <p>Powered by Gemini. Crafted with whimsy.</p>
      </footer>
    </div>
  );
}

export default App;
