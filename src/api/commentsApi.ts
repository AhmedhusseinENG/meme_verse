
import { Comment } from '../types/meme';

// Simulate fetching comments for a meme
export const getCommentsForMeme = (memeId: string): Comment[] => {
  // This would typically come from a database or API
  // For now, we'll generate some fake comments
  const commentCount = Math.floor(Math.random() * 10) + 1;
  
  return Array.from({ length: commentCount }).map((_, index) => ({
    id: `comment-${memeId}-${index}`,
    text: getRandomComment(),
    username: getRandomUsername(),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    avatarUrl: `https://i.pravatar.cc/150?u=${memeId}-${index}`,
  }));
};

// Helper to get random comments
const getRandomComment = (): string => {
  const comments = [
    "This meme is hilarious! 😂",
    "I can't stop laughing at this.",
    "Shared this with my friends, they loved it!",
    "This is literally me every Monday morning.",
    "I feel personally attacked by this meme.",
    "So accurate it hurts.",
    "Who made this? They deserve an award!",
    "I've never seen something so relatable.",
    "This is gold. Pure gold.",
    "My sense of humor is officially broken.",
    "I snorted my coffee. Thanks a lot!",
    "This meme speaks to my soul.",
    "Why is this so accurate though?",
    "Top tier meme content right here.",
    "I'm in this picture and I don't like it.",
  ];
  
  return comments[Math.floor(Math.random() * comments.length)];
};

// Helper to get random usernames
export const getRandomUsername = (): string => {
  const usernames = [
    "MemeKing42",
    "LaughterQueen",
    "GiggleMonster",
    "FunnyBones",
    "JokeJedi",
    "HumorHero",
    "ChuckleChampion",
    "SillyGoose",
    "ComedicGenius",
    "MemeEnthusiast",
    "LaughTrack",
    "WitMaster",
    "JestJanitor",
    "PunPirate",
    "GrinGuru",
  ];
  
  return usernames[Math.floor(Math.random() * usernames.length)];
};
