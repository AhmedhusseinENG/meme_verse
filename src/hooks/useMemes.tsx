
import { useState, useEffect } from 'react';
import { fetchMemeTemplates, filterMemes, searchMemes, getUploadedMemes } from '@/api';
import { Meme, MemeFilter } from '@/types/meme';
import { useDebounce } from '@/utils/animations';

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [filteredMemes, setFilteredMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<MemeFilter>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch memes on component mount
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setIsLoading(true);
        // Fetch API memes
        const fetchedMemes = await fetchMemeTemplates();
        
        // Get user uploaded memes
        const uploadedMemes = getUploadedMemes();
        
        // Combine both sources
        const combinedMemes = [
          ...fetchedMemes, 
          ...uploadedMemes.map(meme => ({ 
            ...meme, 
            box_count: meme.box_count || 0 
          } as Meme))
        ];
        
        setMemes(combinedMemes);
        setFilteredMemes(filterMemes(combinedMemes, activeFilter));
        setError(null);
      } catch (err) {
        setError('Failed to fetch memes. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemes();
  }, []);

  // Apply filter or search when changed
  useEffect(() => {
    if (memes.length === 0) return;
    
    let result = [...memes];
    
    // Apply filter
    result = filterMemes(result, activeFilter);
    
    // Apply search if query exists
    if (debouncedSearchQuery) {
      result = searchMemes(result, debouncedSearchQuery);
    }
    
    setFilteredMemes(result);
  }, [activeFilter, debouncedSearchQuery, memes]);

  return {
    memes: filteredMemes,
    isLoading,
    error,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
  };
}
