
import { UploadedMeme, Meme } from '../types/meme';
import { uploadedMemeCacheKey, likeMemeCacheKey, savedMemeCacheKey } from './constants';

// Upload meme functions
export const getUploadedMemes = (): UploadedMeme[] => {
  const memes = localStorage.getItem(uploadedMemeCacheKey);
  return memes ? JSON.parse(memes) : [];
};

export const uploadMeme = (name: string, imageUrl: string, caption: string): UploadedMeme => {
  const memes = getUploadedMemes();
  
  const newMeme: UploadedMeme = {
    id: `user-meme-${Date.now()}`,
    name,
    url: imageUrl,
    caption,
    dateCreated: new Date().toISOString(),
    width: 600,
    height: 600,
    likes: 0,
    comments: [],
    userUploaded: true,
  };
  
  memes.push(newMeme);
  localStorage.setItem(uploadedMemeCacheKey, JSON.stringify(memes));
  
  return newMeme;
};

// Liked memes functions
export const getLikedMemes = (): string[] => {
  const likes = localStorage.getItem(likeMemeCacheKey);
  return likes ? JSON.parse(likes) : [];
};

export const toggleMemeLike = (memeId: string): boolean => {
  const likedMemes = getLikedMemes();
  const isLiked = likedMemes.includes(memeId);
  
  if (isLiked) {
    const updatedLikes = likedMemes.filter(id => id !== memeId);
    localStorage.setItem(likeMemeCacheKey, JSON.stringify(updatedLikes));
    return false;
  } else {
    likedMemes.push(memeId);
    localStorage.setItem(likeMemeCacheKey, JSON.stringify(likedMemes));
    return true;
  }
};

// Saved memes functions
export const getSavedMemes = (): string[] => {
  const saved = localStorage.getItem(savedMemeCacheKey);
  return saved ? JSON.parse(saved) : [];
};

export const toggleMemeSave = (memeId: string): boolean => {
  const savedMemes = getSavedMemes();
  const isSaved = savedMemes.includes(memeId);
  
  if (isSaved) {
    const updatedSaved = savedMemes.filter(id => id !== memeId);
    localStorage.setItem(savedMemeCacheKey, JSON.stringify(updatedSaved));
    return false;
  } else {
    savedMemes.push(memeId);
    localStorage.setItem(savedMemeCacheKey, JSON.stringify(savedMemes));
    return true;
  }
};
