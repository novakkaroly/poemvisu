import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Stílustár a https://chaosbot.tizennegy.hu/kaoszkulcsok/mesterseges-rajzolas/stilusok-technikak-es-parancsok-prompt-gyujtemenye/ alapján
const styleLibrary: string[] = [
  'szürrealizmus',
  'impresszionizmus',
  'expresszionizmus',
  'kubizmus',
  'szecesszió (Art Nouveau)',
  'barokk festészet',
  'romantika',
  'posztimpresszionizmus',
  'szimbolizmus',
  'japán fametszet',
  'art deco',
  'pop art',
  'minimalista',
  'pszichedelikus művészet',
  'akvarell festmény',
  'tusrajz',
  'szénrajz',
  'képregény stílus',
  'mesekönyv illusztráció',
  'digitális festmény',
  'fantasy művészet',
  'concept art',
  'gőzpunk (steampunk)',
  'pixel art',
  'ólomüveg ablak',
  'naiv művészet',
  'kollázs',
  'csöpögtetéses festészet (drip painting)'
];

export async function generateImageFromPoem(poem: string): Promise<string> {
  try {
    const randomStyle = styleLibrary[Math.floor(Math.random() * styleLibrary.length)];

    const prompt = `Alkoss egy szeszélyes, álomszerű képet, amelyet közvetlenül az alábbi magyar vers hangulata és képi világa ihletett. A kép stílusa legyen: ${randomStyle}. \n\n---\n\n${poem}`;

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    throw new Error("Nem sikerült létrehozni az álomképet. Kérlek, próbáld újra.");
  }
}