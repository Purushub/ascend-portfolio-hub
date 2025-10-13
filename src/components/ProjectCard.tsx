import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string;
  duration: string;
  image?: string;
}

export const ProjectCard = ({ title, description, skills, duration, image }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
      {image && (
        <div className="w-full h-48 overflow-hidden bg-secondary">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
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
