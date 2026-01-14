
export type Comment = {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  avatarUrl?: string;
};

export type Meme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions?: number;
  likes?: number;
  comments?: Comment[];
  dateCreated?: string;
  userUploaded?: boolean;
  caption?: string;
};

export type UploadedMeme = Omit<Meme, 'box_count'> & {
  caption: string;
  userUploaded: boolean;
  box_count?: number; // Make box_count optional for uploaded memes
};

export type MemeFilter = 'trending' | 'new' | 'classic' | 'random';

export type LeaderboardUser = {
  id: string;
  username: string;
  avatarUrl: string;
  uploads: number;
  likes: number;
  comments: number;
  score: number;
};
