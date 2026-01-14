
import { Meme } from '@/types/meme';
import MemeCard from '@/components/ui/MemeCard';
import { useInView } from '@/utils/animations';

interface MemeGridProps {
  memes: Meme[];
  isLoading: boolean;
  error: string | null;
}

export const MemeGrid = ({ memes, isLoading, error }: MemeGridProps) => {
  // Use ref for scroll-based animations
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  }) as [React.RefObject<HTMLDivElement>, boolean];
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading memes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (memes.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No memes found. Try a different search or filter.</p>
      </div>
    );
  }
  
  return (
    <div 
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {memes.map((meme, index) => (
        <div 
          key={meme.id}
          className="transition-all duration-500"
          style={{ 
            transitionDelay: `${index * 50}ms`,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <MemeCard meme={meme} featured={index === 0} />
        </div>
      ))}
    </div>
  );
};

export default MemeGrid;
