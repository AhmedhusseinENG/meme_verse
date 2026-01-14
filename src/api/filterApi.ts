
import { Meme, MemeFilter } from '../types/meme';

// Filter functions
export const filterMemes = (memes: Meme[], filter: MemeFilter): Meme[] => {
  switch (filter) {
    case 'trending':
      return [...memes].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    case 'new':
      return [...memes].sort((a, b) => 
        new Date(b.dateCreated || '').getTime() - new Date(a.dateCreated || '').getTime()
      );
    case 'classic':
      // Simulate "classic" memes - older ones with high like counts
      return [...memes].sort((a, b) => {
        const aScore = (a.likes || 0) * (new Date(a.dateCreated || '').getTime() / 1e12);
        const bScore = (b.likes || 0) * (new Date(b.dateCreated || '').getTime() / 1e12);
        return bScore - aScore;
      });
    case 'random':
      return [...memes].sort(() => Math.random() - 0.5);
    default:
      return memes;
  }
};

// Search function
export const searchMemes = (memes: Meme[], query: string): Meme[] => {
  const lowerCaseQuery = query.toLowerCase();
  return memes.filter(meme => 
    meme.name.toLowerCase().includes(lowerCaseQuery)
  );
};
