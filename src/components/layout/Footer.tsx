
import { Link } from 'react-router-dom';
import { Github, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                MemeVerse
              </h1>
            </Link>
            <p className="text-muted-foreground max-w-md">
              The ultimate platform for meme lovers. Explore, create, and share your favorite memes with the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explorer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upload
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MemeVerse. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by MemeVerse Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
