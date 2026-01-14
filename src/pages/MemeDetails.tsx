
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMemeById } from '@/api/fetchApi';
import { toggleMemeLike, getLikedMemes, toggleMemeSave, getSavedMemes } from '@/api/storageApi';
import { getCommentsForMeme } from '@/api/commentsApi';
import { Heart, Share2, ArrowLeft, Send, Bookmark, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { Comment } from '@/types/meme';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [meme, setMeme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const getMeme = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const memeData = await fetchMemeById(id);
        
        if (!memeData) {
          setError('Meme not found');
          return;
        }
        
        setMeme(memeData);
        setLikeCount(memeData.likes || 0);
        
        const likedMemes = getLikedMemes();
        setLiked(likedMemes.includes(id));
        
        const savedMemes = getSavedMemes();
        setSaved(savedMemes.includes(id));
        
        const memeComments = getCommentsForMeme(id);
        setComments(memeComments);
        
        setError(null);
      } catch (err) {
        setError('Failed to load meme. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getMeme();
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleLike = () => {
    if (!id) return;
    
    const isNowLiked = toggleMemeLike(id);
    setLiked(isNowLiked);
    setLikeCount(prev => isNowLiked ? prev + 1 : prev - 1);
    
    if (isNowLiked) {
      toast.success('Added to your liked memes!');
    }
  };
  
  const handleSave = () => {
    if (!id) return;
    
    const isNowSaved = toggleMemeSave(id);
    setSaved(isNowSaved);
    
    if (isNowSaved) {
      toast.success('Meme saved to your collection!');
    } else {
      toast.success('Meme removed from your collection');
    }
  };
  
  const shareViaTwitter = () => {
    if (!id || !meme) return;
    
    const shareUrl = window.location.href;
    const shareText = `Check out this awesome meme: ${meme.name}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareViaFacebook = () => {
    if (!id) return;
    
    const shareUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareViaLinkedIn = () => {
    if (!id || !meme) return;
    
    const shareUrl = window.location.href;
    const shareTitle = meme.name;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareViaEmail = () => {
    if (!id || !meme) return;
    
    const shareUrl = window.location.href;
    const subject = `Check out this meme: ${meme.name}`;
    const body = `I found this awesome meme and thought you might like it: ${shareUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${id}-${Date.now()}`,
      text: newComment,
      username: 'You',
      timestamp: new Date().toISOString(),
      avatarUrl: `https://i.pravatar.cc/150?u=you-${Date.now()}`,
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    
    toast.success('Comment added!');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading meme...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !meme) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <p className="text-red-500 mb-4">{error}</p>
            <Link
              to="/explorer"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explorer
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/explorer"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explorer
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden border border-border shadow-sm">
                <div className="relative bg-muted aspect-square sm:aspect-video">
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  </div>
                  <img
                    src={meme?.url}
                    alt={meme?.name}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">{meme?.name}</h1>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`flex items-center space-x-2 ${
                          liked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                        } transition-colors`}
                        onClick={handleLike}
                        aria-label={liked ? 'Unlike meme' : 'Like meme'}
                      >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
                        <span>{likeCount}</span>
                      </button>
                      
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>{comments.length} comments</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        className={`flex items-center space-x-2 ${
                          saved ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        } transition-colors`}
                        onClick={handleSave}
                        aria-label={saved ? 'Unsave meme' : 'Save meme'}
                      >
                        <Bookmark className={`h-5 w-5 ${saved ? 'fill-primary' : ''}`} />
                      </button>
                      
                      {/* Share dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Share meme"
                          >
                            <Share2 className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={shareViaTwitter}>
                            <Twitter className="mr-2 h-4 w-4" />
                            <span>Twitter</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={shareViaFacebook}>
                            <Facebook className="mr-2 h-4 w-4" />
                            <span>Facebook</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={shareViaLinkedIn}>
                            <Linkedin className="mr-2 h-4 w-4" />
                            <span>LinkedIn</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={shareViaEmail}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-secondary rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!newComment.trim()}
                      aria-label="Post comment"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
                
                {comments.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3 animate-fade-in">
                        <div className="flex-shrink-0">
                          <img
                            src={comment.avatarUrl || `https://i.pravatar.cc/40?u=${comment.username}`}
                            alt={comment.username}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{comment.username}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MemeDetails;
