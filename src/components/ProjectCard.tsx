import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string;
  tools: string;
  duration: string;
  link?: string;
  achievement?: string;
  image?: string;
  imageDescription?: string;
  onReadMore?: () => void;
}

export const ProjectCard = ({ title, description, skills, tools, duration, link, achievement, image, imageDescription, onReadMore }: ProjectCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  return (
    <Card className="group overflow-hidden hover:scale-[1.01] transition-all duration-500 relative">
      {achievement && (
        <div className="absolute top-0 left-0 w-full h-auto bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 z-10">
          <span>⭐</span>
          <span>{achievement}</span>
        </div>
      )}
      <div className={`w-full h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative ${achievement ? 'mt-10' : ''}`}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : imageDescription ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
            <div className="p-4 rounded-full bg-primary/10 mb-2">
              <ImageIcon className="h-12 w-12 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground italic max-w-[200px]">{imageDescription}</p>
          </div>
        ) : null}
      </div>
      <CardHeader className="relative">
        <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{title}</CardTitle>
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
    </Card>
  );
};
