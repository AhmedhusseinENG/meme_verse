
import { Button } from '@/components/ui/button';

interface MemePreviewProps {
  title: string;
  previewUrl: string;
  caption: string;
  onBackToEdit: () => void;
}

const MemePreview = ({ title, previewUrl, caption, onBackToEdit }: MemePreviewProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Preview Your Meme</h2>
        <Button variant="outline" onClick={onBackToEdit}>
          Edit
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <div className="relative">
          <img 
            src={previewUrl} 
            alt={title} 
            className="w-full h-auto"
          />
          
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
              <p className="text-center font-bold text-lg">{caption}</p>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-muted-foreground text-sm">
            This meme will be posted to your profile and will be visible to all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemePreview;
