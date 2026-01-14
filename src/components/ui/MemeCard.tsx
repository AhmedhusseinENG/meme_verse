
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Meme } from '@/types/meme';
import { toggleMemeLike, getLikedMemes, toggleMemeSave, getSavedMemes } from '@/api/storageApi';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MemeCardProps {
  meme: Meme;
  featured?: boolean;
}

export const MemeCard = ({ meme, featured = false }: MemeCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(meme.likes || 0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if the meme is liked and saved on mount
  useEffect(() => {
    const likedMemes = getLikedMemes();
    setLiked(likedMemes.includes(meme.id));
    
    const savedMemes = getSavedMemes();
    setSaved(savedMemes.includes(meme.id));
  }, [meme.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isNowLiked = toggleMemeLike(meme.id);
    setLiked(isNowLiked);
    setLikeCount(prev => isNowLiked ? prev + 1 : prev - 1);
    
    if (isNowLiked) {
      toast.success('Added to your liked memes!');
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isNowSaved = toggleMemeSave(meme.id);
    setSaved(isNowSaved);
    
    if (isNowSaved) {
      toast.success('Meme saved to your collection!');
    } else {
      toast.success('Meme removed from your collection');
    }
  };

  const shareViaTwitter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = window.location.origin + `/meme/${meme.id}`;
    const shareText = `Check out this awesome meme: ${meme.name}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareViaFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = window.location.origin + `/meme/${meme.id}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareViaLinkedIn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = window.location.origin + `/meme/${meme.id}`;
    const shareTitle = meme.name;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareViaEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = window.location.origin + `/meme/${meme.id}`;
    const subject = `Check out this meme: ${meme.name}`;
    const body = `I found this awesome meme and thought you might like it: ${shareUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Link 
      to={`/meme/${meme.id}`}
      className={`block meme-card ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <img
          src={meme.url}
          alt={meme.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{meme.name}</h3>
        
        {/* Interaction bar */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            {/* Like button */}
            <button 
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleLike}
              aria-label={liked ? 'Unlike meme' : 'Like meme'}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{formatNumber(likeCount)}</span>
            </button>
            
            {/* Comment count */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(meme.comments?.length || 0)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Save button */}
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleSave}
              aria-label={saved ? 'Unsave meme' : 'Save meme'}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-primary text-primary' : ''}`} />
            </button>
            
            {/* Share button with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Share meme"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Share2 className="h-4 w-4" />
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
    </Link>
  );
};

export default MemeCard;
