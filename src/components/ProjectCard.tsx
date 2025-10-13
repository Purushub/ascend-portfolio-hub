import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string;
  duration: string;
  image?: string;
  imageDescription?: string;
}

export const ProjectCard = ({ title, description, skills, duration, image, imageDescription }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
      <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : imageDescription ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <ImageIcon className="h-12 w-12 text-primary/40 mb-2" />
            <p className="text-xs text-muted-foreground italic">{imageDescription}</p>
          </div>
        ) : null}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="text-sm font-semibold text-primary">Skills: </span>
          <span className="text-sm text-muted-foreground">{skills}</span>
        </div>
        <div>
          <span className="text-sm font-semibold text-primary">Duration: </span>
          <span className="text-sm text-muted-foreground">{duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};
