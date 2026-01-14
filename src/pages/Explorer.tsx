import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemeGrid from '@/components/meme/MemeGrid';
import { useMemes } from '@/hooks/useMemes';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { MemeFilter } from '@/types/meme';

const Explorer = () => {
  const { 
    memes, 
    isLoading, 
    error, 
    activeFilter, 
    setActiveFilter,
    searchQuery,
    setSearchQuery
  } = useMemes();
  
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filterOptions: { value: MemeFilter; label: string }[] = [
    { value: 'trending', label: 'Trending' },
    { value: 'new', label: 'Newest' },
    { value: 'classic', label: 'Classic' },
    { value: 'random', label: 'Random' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Meme Explorer</h1>
            <p className="text-muted-foreground">Discover the funniest memes from around the web.</p>
          </div>
          
          <div className="mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search memes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
            
            <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <MemeGrid memes={memes} isLoading={isLoading} error={error} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explorer;
