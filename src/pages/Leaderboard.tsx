
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getTopUsers, getLeaderboardTopMemes } from '@/api/leaderboardApi';
import { useQuery } from '@tanstack/react-query';
import { MemeCard } from '@/components/ui/MemeCard';
import { User } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const { data: topUsers = [] } = useQuery({
    queryKey: ['topUsers'],
    queryFn: () => getTopUsers(10),
  });

  const { data: topMemes = [] } = useQuery({
    queryKey: ['topMemes'],
    queryFn: () => getLeaderboardTopMemes(10),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="users">Top Users</TabsTrigger>
              <TabsTrigger value="memes">Top Memes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Meme Creators</CardTitle>
                  <CardDescription>
                    Users with the highest combined scores based on uploads, likes, and comments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topUsers.map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </Badge>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} alt={user.username} />
                            <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">
                              Score: {user.score.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm font-medium">{user.uploads}</p>
                            <p className="text-xs text-muted-foreground">Uploads</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.likes.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Likes</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.comments.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Comments</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="memes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Memes</CardTitle>
                  <CardDescription>
                    Most liked memes across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topMemes.map((meme) => (
                      <MemeCard key={meme.id} meme={meme} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
