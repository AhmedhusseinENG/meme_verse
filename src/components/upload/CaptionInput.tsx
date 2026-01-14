
import { useState } from 'react';
import { Wand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateAICaption } from '@/api';
import { toast } from 'sonner';

interface CaptionInputProps {
  caption: string;
  setCaption: (caption: string) => void;
  previewUrl: string | null;
}

const CaptionInput = ({ caption, setCaption, previewUrl }: CaptionInputProps) => {
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Generate AI caption
  const handleGenerateCaption = async () => {
    if (!previewUrl) {
      toast.error('Please upload an image first');
      return;
    }
    
    setIsGeneratingCaption(true);
    
    try {
      const aiCaption = await generateAICaption();
      setCaption(aiCaption);
      toast.success('AI caption generated!');
    } catch (error) {
      console.error('Error generating caption:', error);
      toast.error('Failed to generate caption. Please try again.');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="caption">Caption</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGenerateCaption}
          disabled={!previewUrl || isGeneratingCaption}
          className="flex items-center gap-1"
        >
          <Wand className="h-3.5 w-3.5" />
          <span>{isGeneratingCaption ? 'Generating...' : 'Generate AI Caption'}</span>
        </Button>
      </div>
      <Textarea
        id="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a funny caption for your meme..."
        rows={3}
        maxLength={500}
      />
    </div>
  );
};

export default CaptionInput;
