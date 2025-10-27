import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageIcon, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string;
  tools: string;
  duration: string;
  link?: string;
  achievement?: string;
  images?: string[];
  imageDescriptions?: string[];
  onReadMore?: () => void;
}

export const ProjectCard = ({ title, description, skills, tools, duration, link, achievement, images, imageDescriptions, onReadMore }: ProjectCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;
  
  const displayImages = images && images.length > 0 ? images : [];
  const displayDescriptions = imageDescriptions && imageDescriptions.length > 0 ? imageDescriptions : [];
  const visibleImages = showAllImages ? displayImages : displayImages.slice(0, 1);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      <Card className={`group overflow-hidden transition-all duration-500 relative ${isExpanded ? 'col-span-full' : 'hover:scale-[1.01]'}`}>
        {achievement && (
          <div className="absolute top-0 left-0 w-full h-auto bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 z-10">
            <span>⭐</span>
            <span>{achievement}</span>
          </div>
        )}
        
        <div className={`flex ${isExpanded ? 'flex-row gap-6 p-6' : 'flex-col'} ${achievement ? 'mt-10' : ''}`}>
        <div className={`${isExpanded ? 'w-1/2' : 'w-full'} overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative`}>
          {displayImages.length > 0 ? (
            <div className={`grid ${visibleImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 p-2`}>
              {visibleImages.map((img, idx) => (
                <div key={idx} className="space-y-1 relative">
                  <div className={`${visibleImages.length === 1 ? 'h-48' : 'h-32'} overflow-hidden rounded-lg relative group/image`}>
                    <img src={img} alt={`${title} - ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <button
                      onClick={() => {
                        setCurrentImageIndex(showAllImages ? idx : 0);
                        setIsGalleryOpen(true);
                      }}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                      aria-label="Expand gallery"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                  {displayDescriptions[idx] && (
                    <p className="text-xs text-muted-foreground italic px-1">{displayDescriptions[idx]}</p>
                  )}
                </div>
              ))}
            </div>
        ) : displayDescriptions.length > 0 ? (
          <div className="w-full h-48 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
            <div className="p-4 rounded-full bg-primary/10 mb-2">
              <ImageIcon className="h-12 w-12 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground italic max-w-[200px]">{displayDescriptions[0]}</p>
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        {displayImages.length > 1 && (
          <button
            onClick={() => setShowAllImages(!showAllImages)}
            className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium hover:bg-primary transition-colors"
          >
            {showAllImages ? "Show less" : `+${displayImages.length - 1} more`}
          </button>
        )}
      </div>
      
      <div className={`${isExpanded ? 'w-1/2 flex flex-col justify-center' : 'w-full'}`}>
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {showFullDescription ? description : truncatedDescription}
          {description.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-2 text-primary hover:underline text-sm font-medium"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-sm font-semibold text-primary shrink-0">Skills:</span>
          <span className="text-sm text-muted-foreground">{skills}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm font-semibold text-primary shrink-0">Tools:</span>
          <span className="text-sm text-muted-foreground">{tools}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full shrink-0"></span>
          <span className="text-sm font-semibold text-primary">Duration:</span>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
        {link && (
          <div className="pt-2">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
            >
              Go to Project →
            </a>
          </div>
        )}
      </CardContent>
      </div>
      </div>
    </Card>

    {/* Full Gallery Dialog */}
    <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
      <DialogContent className="max-w-4xl h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{title} - Gallery</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex items-center justify-center relative bg-black/5 dark:bg-black/50">
          {displayImages.length > 0 && (
            <>
              <img 
                src={displayImages[currentImageIndex]} 
                alt={`${title} - ${currentImageIndex + 1}`} 
                className="max-h-[calc(90vh-120px)] max-w-full object-contain"
              />
              {displayImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {displayDescriptions[currentImageIndex] && (
          <div className="px-6 py-4 border-t bg-background">
            <p className="text-sm text-muted-foreground">{displayDescriptions[currentImageIndex]}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};
