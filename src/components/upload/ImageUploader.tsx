
import { useState, useRef, ChangeEvent } from 'react';
import { Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  setImage: (file: File | null) => void;
}

const ImageUploader = ({ previewUrl, setPreviewUrl, setImage }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (JPG, PNG, GIF)');
      return;
    }
    
    setImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Clear image selection
  const handleClearImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label>Meme Image</Label>
      
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img 
            src={previewUrl} 
            alt="Meme preview" 
            className="w-full h-auto max-h-[400px] object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer",
            "hover:border-primary/50 transition-colors",
            "flex flex-col items-center justify-center gap-4"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-4 rounded-full bg-secondary flex items-center justify-center">
            <Image className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-medium">Drag and drop or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              Support JPG, PNG, and GIF (Max 5MB)
            </p>
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
