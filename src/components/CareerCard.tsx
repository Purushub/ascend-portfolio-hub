import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CareerCardProps {
  title: string;
  field: string;
  whyLoveIt: string[];
  dayLooksLike: string[];
  keySubjects: string[];
}

export const CareerCard = ({ title, field, whyLoveIt, dayLooksLike, keySubjects }: CareerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit">{field}</Badge>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary mb-2">Why you'd love it:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {whyLoveIt.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary mb-2">Your day might look like:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {dayLooksLike.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary mb-2">Key subjects to focus on:</h4>
          <div className="flex flex-wrap gap-2">
            {keySubjects.map((subject, idx) => (
              <Badge key={idx} variant="outline">{subject}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
