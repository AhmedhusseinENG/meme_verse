
// Generate AI caption for meme (simulated)
export const generateAICaption = async (): Promise<string> => {
  // In a real app, this would call an AI API
  const aiCaptions = [
    "When the code works on the first try",
    "Me explaining memes to my parents",
    "That moment when you realize it's only Tuesday",
    "How I look waiting for the microwave to finish",
    "Nobody: / Me at 3am with a bag of shredded cheese",
    "My brain during an important exam",
    "When someone asks if I'm productive working from home",
    "Me trying to be an adult",
    "My last brain cell trying to function",
    "When the internet goes out for 5 minutes",
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return aiCaptions[Math.floor(Math.random() * aiCaptions.length)];
};
