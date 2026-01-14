
import { Meme, Comment } from '../types/meme';
import { API_BASE_URL } from './constants';
import { getCommentsForMeme } from './commentsApi';

// Get popular meme templates
export const fetchMemeTemplates = async (): Promise<Meme[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_memes`);
    const data = await response.json();
    
    if (data.success) {
      // Enhance the API data with additional properties needed for our UI
      return data.data.memes.map((meme: Meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 10000),
        comments: [], // Initialize as empty Comment array
        dateCreated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      }));
    }
    throw new Error('Failed to fetch meme templates');
  } catch (error) {
    console.error('Error fetching meme templates:', error);
    return [];
  }
};

// Get a single meme by ID
export const fetchMemeById = async (id: string): Promise<Meme | null> => {
  try {
    // First check if it's an uploaded meme
    if (id.startsWith('user-meme-')) {
      const uploadedMemes = getUploadedMemes();
      const uploadedMeme = uploadedMemes.find(meme => meme.id === id);
      if (uploadedMeme) {
        return {
          ...uploadedMeme,
          box_count: uploadedMeme.box_count || 0, // Ensure box_count exists
          comments: getCommentsForMeme(id),
        };
      }
    }

    // If not an uploaded meme, check the API memes
    const allMemes = await fetchMemeTemplates();
    const meme = allMemes.find(meme => meme.id === id);
    
    // Check for leaderboard memes (meme-X format)
    if (!meme && id.startsWith('meme-')) {
      // For leaderboard memes, create a placeholder meme with the ID
      return {
        id,
        name: `Meme ${id.split('-')[1]}`,
        url: `https://picsum.photos/600/600?random=${id.split('-')[1]}`,
        width: 600,
        height: 600,
        box_count: 2,
        likes: Math.floor(Math.random() * 10000) + 1000,
        comments: getCommentsForMeme(id),
        dateCreated: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      };
    }
    
    if (!meme) {
      throw new Error('Meme not found');
    }
    
    return {
      ...meme,
      comments: getCommentsForMeme(id),
    };
  } catch (error) {
    console.error(`Error fetching meme with ID ${id}:`, error);
    return null;
  }
};

// Get top memes for leaderboard
export const getTopMemes = async (limit = 10): Promise<Meme[]> => {
  const allMemes = await fetchMemeTemplates();
  const uploadedMemes = getUploadedMemes();
  
  // Combine API memes and uploaded memes
  const combinedMemes = [
    ...allMemes,
    ...uploadedMemes.map(meme => ({ 
      ...meme, 
      box_count: meme.box_count || 0 // Ensure box_count exists
    } as Meme)),
  ];
  
  // Sort by likes and limit to requested number
  return combinedMemes
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, limit);
};

// This function is imported from the storage API
import { getUploadedMemes } from './storageApi';
