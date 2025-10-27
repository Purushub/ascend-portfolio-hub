import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtracurricularCardProps {
  title: string;
  description: string;
  skills: string;
  duration: string;
  highlights?: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
}

export const ExtracurricularCard = ({ title, description, skills, duration, highlights }: ExtracurricularCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`group overflow-hidden transition-all duration-500 relative ${isExpanded ? 'col-span-full' : 'hover:scale-[1.01]'}`}>
      <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text mb-2">
              {title}
            </CardTitle>
            <CardDescription className="mb-3">{description}</CardDescription>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{duration}</Badge>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <span className="text-sm font-semibold text-primary shrink-0">Skills Developed:</span>
          <span className="text-sm text-muted-foreground">{skills}</span>
        </div>

        {isExpanded && highlights && highlights.length > 0 && (
          <div className="mt-6 space-y-6 pt-6 border-t">
            <h4 className="text-lg font-semibold text-foreground">Highlights & Achievements</h4>
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0 last:pb-0">
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-bold">{index + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-foreground">{highlight.title}</h5>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    {highlight.image && (
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img 
                          src={highlight.image} 
                          alt={highlight.title} 
                          className="w-full h-auto object-cover max-h-64"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
