
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemeGrid from '@/components/meme/MemeGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUploadedMemes } from '@/api/storageApi';
import { getLikedMemes, getSavedMemes } from '@/api/storageApi';
import { fetchMemeById } from '@/api/fetchApi';
import { Meme } from '@/types/meme';
import { User, Settings, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);
  const [savedMemes, setSavedMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [username, setUsername] = useState('MemeEnthusiast');
  const [bio, setBio] = useState('');
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
      avatarUrl,
      bio
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
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image file is too large (max 5MB)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
        toast.success('Profile photo uploaded successfully');
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

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUsername(profile.username || 'MemeEnthusiast');
      setAvatarUrl(profile.avatarUrl || '');
      setBio(profile.bio || '');
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
                {bio && <p className="text-sm mt-1 max-w-md">{bio}</p>}
                <p className="text-muted-foreground text-sm mt-1">Joined on {new Date().toLocaleDateString()}</p>
                
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={triggerFileInput}>
                  <AvatarImage src={avatarUrl} alt={username} />
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-12 w-12 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <button 
                  type="button"
                  className="absolute -bottom-2 -right-2 rounded-full bg-primary p-1 text-primary-foreground shadow-md hover:bg-primary/90"
                  onClick={triggerFileInput}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <Input 
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <p className="text-xs text-muted-foreground text-center">
                Click to upload a new profile photo<br />
                (Max 5MB, JPG, PNG, or GIF)
              </p>
            </div>

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
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveProfile}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
