
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemeGrid from '@/components/meme/MemeGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUploadedMemes } from '@/api/storageApi';
import { getLikedMemes, getSavedMemes } from '@/api/storageApi';
import { fetchMemeById } from '@/api/fetchApi';
import { Meme } from '@/types/meme';
import { User, Settings, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Profile = () => {
  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);
  const [savedMemes, setSavedMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [username, setUsername] = useState('MemeEnthusiast');
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserMemes = async () => {
      try {
        setIsLoading(true);
        
        // Fetch uploaded memes
        const uploadedMemesData = getUploadedMemes();
        setUploadedMemes(uploadedMemesData as Meme[]);
        
        // Fetch liked memes
        const likedMemeIds = getLikedMemes();
        const likedMemesData: Meme[] = [];
        
        for (const id of likedMemeIds) {
          try {
            const meme = await fetchMemeById(id);
            if (meme) likedMemesData.push(meme);
          } catch (err) {
            console.error(`Failed to fetch liked meme ${id}:`, err);
          }
        }
        
        setLikedMemes(likedMemesData);
        
        // Fetch saved memes
        const savedMemeIds = getSavedMemes();
        const savedMemesData: Meme[] = [];
        
        for (const id of savedMemeIds) {
          try {
            const meme = await fetchMemeById(id);
            if (meme) savedMemesData.push(meme);
          } catch (err) {
            console.error(`Failed to fetch saved meme ${id}:`, err);
          }
        }
        
        setSavedMemes(savedMemesData);
        
      } catch (err) {
        setError('Failed to load your memes. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserMemes();
  }, []);
  
  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };
  
  const saveProfile = () => {
    // In a real app, this would save to a database
    localStorage.setItem('user_profile', JSON.stringify({
      username,
      avatarUrl
    }));
    
    setEditDialogOpen(false);
    toast.success('Profile updated successfully');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
        toast.success('Image uploaded successfully');
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Load user profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUsername(profile.username || 'MemeEnthusiast');
      setAvatarUrl(profile.avatarUrl || '');
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your memes and account settings</p>
            </div>
            
            <button 
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              onClick={handleEditProfile}
            >
              <Settings className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>
          
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-8">
            <div className="p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-primary" />
                )}
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-muted-foreground">Joined on {new Date().toLocaleDateString()}</p>
                
                <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                  <div>
                    <p className="text-2xl font-bold">{uploadedMemes.length}</p>
                    <p className="text-sm text-muted-foreground">Uploads</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{likedMemes.length}</p>
                    <p className="text-sm text-muted-foreground">Liked</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{savedMemes.length}</p>
                    <p className="text-sm text-muted-foreground">Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="uploads">
            <TabsList className="mb-6">
              <TabsTrigger value="uploads">My Uploads</TabsTrigger>
              <TabsTrigger value="liked">Liked Memes</TabsTrigger>
              <TabsTrigger value="saved">Saved Memes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="uploads">
              <MemeGrid memes={uploadedMemes} isLoading={isLoading} error={error} />
            </TabsContent>
            
            <TabsContent value="liked">
              {likedMemes.length > 0 ? (
                <MemeGrid memes={likedMemes} isLoading={isLoading} error={error} />
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">No liked memes yet. Like some memes to see them here!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {savedMemes.length > 0 ? (
                <MemeGrid memes={savedMemes} isLoading={isLoading} error={error} />
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">No saved memes yet. Save some memes to see them here!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter your username"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                />
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={triggerFileInput}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Profile Image
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                You can upload a profile picture from your device
              </p>
            </div>
            
            {avatarUrl && (
              <div className="space-y-2">
                <Label htmlFor="avatar">Or use an image URL</Label>
                <Input 
                  id="avatar" 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)} 
                  placeholder="Enter avatar image URL"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button onClick={saveProfile}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
