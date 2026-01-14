
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            
            <h2 className="mt-4 text-2xl font-bold">Meme not found!</h2>
            
            <p className="mt-4 text-muted-foreground">
              The meme you're looking for seems to have vanished into thin air. Perhaps it was too funny for this world?
            </p>
            
            <div className="mt-8">
              <img 
                src="https://i.imgflip.com/7z82z3.jpg" 
                alt="Page not found meme" 
                className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
              />
            </div>
            
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg"
              >
                <Home className="h-5 w-5" />
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
