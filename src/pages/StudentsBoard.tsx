import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, School } from "lucide-react";
import { StudentProfile } from "@/types/student";

const StudentsBoard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Partial<StudentProfile>[]>([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  const handleCardClick = (student: Partial<StudentProfile>) => {
    navigate("/portfolio", { state: { studentData: student } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Student Portfolios
          </h1>
          <div className="w-32" /> {/* Spacer for alignment */}
        </div>

        {students.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No Students Yet</h2>
              <p className="text-muted-foreground mb-6">
                Upload a CSV file or create student profiles manually to get started.
              </p>
              <Button onClick={() => navigate("/")}>
                Go to Upload
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <Card
                key={student.profileId || index}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => handleCardClick(student)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">
                        {student.fullName || "Unknown Student"}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <School className="h-3 w-3" />
                        {student.schoolName || "School not specified"}
                      </CardDescription>
                    </div>
                  </div>
                  {student.achievementLevel && (
                    <Badge variant="secondary" className="w-fit">
                      {student.achievementLevel}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {student.grade && (
                      <p className="text-muted-foreground">
                        <span className="font-semibold">Grade:</span> {student.grade}
                      </p>
                    )}
                    {student.year && (
                      <p className="text-muted-foreground">
                        <span className="font-semibold">Year:</span> {student.year}
                      </p>
                    )}
                    {student.aboutMe && (
                      <p className="text-muted-foreground line-clamp-3 mt-3">
                        {student.aboutMe}
                      </p>
                    )}
                    {student.passions && student.passions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {student.passions.slice(0, 3).map((passion, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {passion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsBoard;
