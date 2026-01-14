
import { useMemes } from '@/hooks/useMemes';
import MemeCard from '@/components/ui/MemeCard';

export const TrendingMemes = () => {
  const { memes, isLoading, error } = useMemes();
  
  // Only display the top 6 trending memes on the homepage
  const trendingMemes = memes.slice(0, 6);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trending memes...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Trending Memes</h2>
          <p className="text-muted-foreground">Check out what's making everyone laugh right now.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingMemes.map((meme, index) => (
            <MemeCard 
              key={meme.id} 
              meme={meme} 
              featured={index === 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingMemes;
