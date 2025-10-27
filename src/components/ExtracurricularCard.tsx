import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ExtracurricularCardProps {
  title: string;
  description: string;
  skills: string;
  duration: string;
  images?: Array<{
    caption: string;
    description: string;
  }>;
}

export const ExtracurricularCard = ({ title, description, skills, duration, images }: ExtracurricularCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;
  
  const displayImages = images && images.length > 0 ? images : [];

  return (
    <Card className={`group overflow-hidden transition-all duration-500 relative ${isExpanded ? 'col-span-full' : 'hover:scale-[1.01]'}`}>
      <div className={`flex ${isExpanded ? 'flex-row gap-6 p-6' : 'flex-col'}`}>
        <div className={`${isExpanded ? 'w-1/2' : 'w-full'} overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative`}>
          {displayImages.length > 0 ? (
            <div className="p-4 space-y-3">
              {displayImages.map((img, idx) => (
                <div key={idx} className="space-y-2 p-3 bg-background/50 backdrop-blur-sm rounded-lg">
                  <div className="flex items-start gap-2">
                    <ImageIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{img.caption}</p>
                      <p className="text-xs text-muted-foreground mt-1">{img.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-48 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
            </div>
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
              <span className="text-sm font-semibold text-primary shrink-0">Skills Developed:</span>
              <span className="text-sm text-muted-foreground">{skills}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full shrink-0"></span>
              <span className="text-sm font-semibold text-primary">Duration:</span>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
