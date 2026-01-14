
import { Meme, LeaderboardUser } from '../types/meme';
import { getRandomUsername } from './commentsApi';

// Get top users for leaderboard (simulated)
export const getTopUsers = (limit = 10): LeaderboardUser[] => {
  // In a real app, this would come from a database
  const users: LeaderboardUser[] = Array.from({ length: 20 }).map((_, index) => {
    const uploads = Math.floor(Math.random() * 50) + 1;
    const likesPerUpload = Math.floor(Math.random() * 1000) + 100;
    const commentsPerUpload = Math.floor(Math.random() * 200) + 20;
    
    return {
      id: `user-${index + 1}`,
      username: getRandomUsername(),
      avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
      uploads,
      likes: uploads * likesPerUpload,
      comments: uploads * commentsPerUpload,
      score: uploads * (likesPerUpload + commentsPerUpload),
    };
  });
  
  // Sort by score and limit to requested number
  return users
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Get top memes for leaderboard (simulated)
export const getLeaderboardTopMemes = (limit = 10): Meme[] => {
  const memes: Meme[] = Array.from({ length: 20 }).map((_, index) => ({
    id: `meme-${index + 1}`,
    name: `Top Meme ${index + 1}`,
    url: `https://picsum.photos/600/600?random=${index}`,
    width: 600,
    height: 600,
    box_count: 2,
    likes: Math.floor(Math.random() * 10000) + 1000,
    comments: [],
    dateCreated: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
  }));

  return memes
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, limit);
};
