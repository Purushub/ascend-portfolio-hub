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
    <Card className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative">
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit bg-primary/20 border-primary/30 backdrop-blur-sm">{field}</Badge>
          <CardTitle className="text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="space-y-2">
          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full"></span>
            Why you'd love it:
          </h4>
          <ul className="list-none space-y-1 text-sm text-muted-foreground pl-3">
            {whyLoveIt.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full"></span>
            Your day might look like:
          </h4>
          <ul className="list-none space-y-1 text-sm text-muted-foreground pl-3">
            {dayLooksLike.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-primary to-purple-500 rounded-full"></span>
            Key subjects to focus on:
          </h4>
          <div className="flex flex-wrap gap-2">
            {keySubjects.map((subject, idx) => (
              <Badge key={idx} variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">{subject}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
