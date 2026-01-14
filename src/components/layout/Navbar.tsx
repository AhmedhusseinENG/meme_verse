
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Upload, Trophy } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Explorer', path: '/explorer' },
    { title: 'Upload', path: '/upload', icon: Upload },
    { title: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { title: 'Profile', path: '/profile' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              MemeVerse
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 py-1 border-b-2 flex items-center gap-1 ${
                  location.pathname === link.path
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Right section: theme toggle and mobile menu button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary dark:hover:bg-secondary/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden bg-white dark:bg-background`}
      >
        <div className="container mx-auto px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-secondary dark:hover:bg-secondary/20'
              }`}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
