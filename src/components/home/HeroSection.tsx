
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pill label */}
          <div 
            className={`inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-700 ${
              loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            Welcome to the ultimate meme experience
          </div>
          
          {/* Main heading */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            Discover, Create, Share
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              The Best Memes
            </span>
          </h1>
          
          {/* Subheading */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            Join our community of meme enthusiasts. Find the funniest content, create your own masterpieces, and share laughter with the world.
          </p>
          
          {/* CTA buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/explorer"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-3 text-base font-medium shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-background px-5 py-3 text-base font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Upload a Meme
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute bottom-5 left-5 w-20 h-20 grid grid-cols-4 gap-1.5 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full bg-primary transition-all duration-700 delay-${(i * 50) % 500}`}
          ></div>
        ))}
      </div>
      
      <div className="absolute top-20 right-10 w-20 h-20 grid grid-cols-4 gap-1.5 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full bg-primary transition-all duration-700 delay-${(i * 50) % 500}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
