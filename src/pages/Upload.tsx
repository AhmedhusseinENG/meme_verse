
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { uploadMeme } from '@/api';
import ImageUploader from '@/components/upload/ImageUploader';
import CaptionInput from '@/components/upload/CaptionInput';
import MemePreview from '@/components/upload/MemePreview';

const Upload = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'create' | 'preview'>('create');
  
  // Go to preview step
  const handleGoToPreview = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your meme');
      return;
    }
    
    if (!image || !previewUrl) {
      toast.error('Please upload an image');
      return;
    }
    
    setCurrentStep('preview');
  };
  
  // Back to edit step
  const handleBackToEdit = () => {
    setCurrentStep('create');
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!title.trim() || !image || !previewUrl) {
      toast.error('Please complete all required fields');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const newMeme = uploadMeme(title, previewUrl, caption);
      
      toast.success('Meme uploaded successfully!');
      navigate(`/meme/${newMeme.id}`);
    } catch (error) {
      console.error('Error uploading meme:', error);
      toast.error('Failed to upload meme. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Upload a Meme</h1>
          
          {currentStep === 'create' ? (
            <div className="space-y-8">
              {/* Title input */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your meme a catchy title"
                  maxLength={100}
                  required
                />
              </div>
              
              {/* Image upload component */}
              <ImageUploader
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                setImage={setImage}
              />
              
              {/* Caption input component */}
              <CaptionInput
                caption={caption}
                setCaption={setCaption}
                previewUrl={previewUrl}
              />
              
              {/* Continue button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  disabled={!previewUrl}
                  onClick={handleGoToPreview}
                  className="min-w-[150px]"
                >
                  Preview <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Preview component */}
              <MemePreview
                title={title}
                previewUrl={previewUrl!}
                caption={caption}
                onBackToEdit={handleBackToEdit}
              />
              
              {/* Action buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={handleBackToEdit}>
                  Go Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="min-w-[150px]"
                >
                  {isUploading ? (
                    <span className="animate-pulse">Uploading...</span>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Confirm Upload
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
