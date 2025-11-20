import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronDown, ChevronUp, Maximize2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getYoutubeEmbedUrl } from "@/utils/youtubeUtils";

interface CaseStudyCardProps {
  title: string;
  description: string;
  skills: string;
  duration: string;
  image?: string;
  steps: Array<{
    title: string;
    description: string;
    image?: string;
    videoLink?: string;
  }>;
}

export const CaseStudyCard = ({ title, description, skills, duration, image, steps }: CaseStudyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  return (
    <Card className={`group overflow-hidden transition-all duration-500 relative ${isExpanded ? 'col-span-full' : 'hover:scale-[1.01]'}`}>
      <div className="flex ${isExpanded ? 'flex-row gap-6 p-6' : 'flex-col'}">
        <div className={`${isExpanded ? 'w-1/2' : 'w-full'} overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative`}>
          {image ? (
            <div className="h-48 overflow-hidden relative">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
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
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm font-semibold text-primary shrink-0">Skills Used:</span>
              <span className="text-sm text-muted-foreground">{skills}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full shrink-0"></span>
              <span className="text-sm font-semibold text-primary">Duration:</span>
              <span className="text-sm text-muted-foreground">{duration}</span>
            </div>
            
            {steps.length > 0 && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSteps(!showSteps)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="text-sm font-medium">Process & Steps</span>
                  {showSteps ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </div>

      {showSteps && steps.length > 0 && (
        <CardContent className="border-t pt-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0 last:pb-0">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">{index + 1}</span>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">{step.title}</h5>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {step.image && (
                    <div className="rounded-lg overflow-hidden border border-border">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-auto object-cover max-h-64"
                      />
                    </div>
                  )}
                  {step.videoLink && getYoutubeEmbedUrl(step.videoLink) && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                      <iframe
                        src={getYoutubeEmbedUrl(step.videoLink)!}
                        title={step.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
