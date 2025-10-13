import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileJson, Eye, FileEdit } from "lucide-react";
import { toast } from "sonner";
import { StudentProfile } from "@/types/student";
import { sampleStudentData } from "@/utils/sampleData";

const Index = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/json") {
      toast.error("Please upload a JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        validateAndNavigate(json);
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const validateAndNavigate = (data: StudentProfile) => {
    // Basic validation
    if (!data.fullName || !data.schoolName) {
      toast.error("Invalid student data format");
      return;
    }

    toast.success("Student data loaded successfully!");
    navigate("/portfolio", { state: { studentData: data } });
  };

  const viewSamplePortfolio = () => {
    navigate("/portfolio", { state: { studentData: sampleStudentData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">SkilliZee Pro</h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4">Student Digital Portfolio</p>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Create a comprehensive digital showcase that highlights your academic journey, projects, and achievements.
            Build a professional portfolio that stands out to educators and admissions officers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button onClick={() => document.getElementById('file-upload')?.click()} size="lg" variant="secondary">
              <Upload className="mr-2 h-5 w-5" />
              Upload JSON
            </Button>
            <Button onClick={() => navigate('/upload-form')} size="lg" variant="secondary">
              <FileEdit className="mr-2 h-5 w-5" />
              Manual Entry
            </Button>
            <Button onClick={viewSamplePortfolio} size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
              <Eye className="mr-2 h-5 w-5" />
              View Examples
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12 -mt-8">
        {/* Upload Card */}
        <Card className="shadow-2xl animate-slide-up border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Upload className="h-6 w-6 text-primary" />
              Create Your Portfolio
            </CardTitle>
            <CardDescription>
              Upload a JSON file or use manual entry to create a beautiful digital portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileInput}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileJson className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Drop your JSON file here</h3>
                  <p className="text-muted-foreground mb-4">or choose an option below</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={() => document.getElementById('file-upload')?.click()} variant="default">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload JSON
                    </Button>
                    <Button onClick={() => navigate('/upload-form')} variant="secondary">
                      <FileEdit className="mr-2 h-4 w-4" />
                      Manual Entry
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">Expected JSON Format:</h4>
              <pre className="text-xs bg-background/50 p-3 rounded overflow-x-auto">
{`{
  "fullName": "Student Name",
  "schoolName": "School Name",
  "grade": "11th Grade",
  "year": "2024-2025",
  ...
}`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                For a complete example, click "View Examples" to see a sample portfolio
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Comprehensive Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Showcase skills, projects, achievements, and personality traits in a visually appealing format
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>Beautiful Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Professional, modern design that makes a lasting impression on admissions officers
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <CardTitle>Easy Export</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Download your portfolio as a standalone HTML file to share anywhere
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Digital Portfolios Matter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">87%</div>
                <div className="text-sm font-medium">Admissions Officers</div>
                <div className="text-xs text-muted-foreground">Review digital portfolios when provided by applicants</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-accent">3x</div>
                <div className="text-sm font-medium">Engagement Rate</div>
                <div className="text-xs text-muted-foreground">Higher viewer engagement with visual portfolios vs. traditional CVs</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">45%</div>
                <div className="text-sm font-medium">Time Saved</div>
                <div className="text-xs text-muted-foreground">Reduction in application review time with well-organized digital portfolios</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
