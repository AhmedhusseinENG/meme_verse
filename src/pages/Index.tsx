
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrendingMemes from '@/components/home/TrendingMemes';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trending Memes */}
        <TrendingMemes />
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/50 dark:bg-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose MemeVerse?</h2>
              <p className="text-muted-foreground">The premier platform for meme enthusiasts worldwide.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Discover</h3>
                <p className="text-muted-foreground mb-4">
                  Explore thousands of trending memes across different categories. Our intelligent algorithm ensures you see the content you'll love.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Create</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your own memes or use our tools to create new ones. Add captions, filters, and make your memes stand out from the crowd.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Share</h3>
                <p className="text-muted-foreground mb-4">
                  Share your favorite memes with friends and the community. Gain likes, comments, and climb the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to dive deeper?</h2>
              <p className="text-muted-foreground mb-6">
                Explore our full collection of memes or share your own creations with the world.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/explorer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-5 py-3 text-base font-medium shadow-sm hover:bg-primary/90"
                >
                  Explore All Memes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-background px-5 py-3 text-base font-medium text-primary hover:bg-primary/5"
                >
                  Upload Your Meme
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
