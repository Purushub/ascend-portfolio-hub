import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { StudentProfile } from "@/types/student";
import { Upload, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UploadForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    fullName: "",
    schoolName: "",
    grade: "",
    year: "",
    aboutMe: "",
    personalBio: "",
    coreStrengths: [],
    passions: [],
    archetype: {
      title: "",
      description: "",
      quote: ""
    },
    socialEnergyStyle: {
      type: "",
      description: ""
    },
    skills: {},
    projects: [],
    caseStudies: [],
    extracurricular: [],
    careerPaths: []
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.schoolName) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and school.",
        variant: "destructive"
      });
      return;
    }

    const studentData: StudentProfile = {
      ...formData,
      profileId: `STU-${Date.now()}`,
      lastUpdated: new Date().toLocaleDateString(),
      profileImage: profileImagePreview || undefined,
    } as StudentProfile;

    navigate("/portfolio", { state: { studentData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <UserPlus className="h-8 w-8 text-primary" />
              Create Student Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  {profileImagePreview && (
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                      <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder="Enter school name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="e.g., 10th Grade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2024-2025"
                  />
                </div>
              </div>

              {/* About Me */}
              <div className="space-y-2">
                <Label htmlFor="aboutMe">About Me</Label>
                <Textarea
                  id="aboutMe"
                  value={formData.aboutMe}
                  onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                  placeholder="Brief introduction about yourself..."
                  rows={3}
                />
              </div>

              {/* Personal Bio */}
              <div className="space-y-2">
                <Label htmlFor="personalBio">Personal Bio</Label>
                <Textarea
                  id="personalBio"
                  value={formData.personalBio}
                  onChange={(e) => setFormData({ ...formData, personalBio: e.target.value })}
                  placeholder="Share your story..."
                  rows={4}
                />
              </div>

              {/* Core Strengths */}
              <div className="space-y-2">
                <Label htmlFor="coreStrengths">Core Strengths (comma separated)</Label>
                <Input
                  id="coreStrengths"
                  value={formData.coreStrengths?.join(", ")}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    coreStrengths: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                  })}
                  placeholder="e.g., Leadership, Creativity, Problem Solving"
                />
              </div>

              {/* Passions */}
              <div className="space-y-2">
                <Label htmlFor="passions">Passions & Interests (comma separated)</Label>
                <Input
                  id="passions"
                  value={formData.passions?.join(", ")}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    passions: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                  })}
                  placeholder="e.g., Music, Technology, Sports"
                />
              </div>

              {/* Archetype */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Archetype</h3>
                <div className="space-y-2">
                  <Label htmlFor="archetypeTitle">Archetype Title</Label>
                  <Input
                    id="archetypeTitle"
                    value={formData.archetype?.title}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      archetype: { ...formData.archetype!, title: e.target.value }
                    })}
                    placeholder="e.g., The Visionary Collaborator"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="archetypeDescription">Description</Label>
                  <Textarea
                    id="archetypeDescription"
                    value={formData.archetype?.description}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      archetype: { ...formData.archetype!, description: e.target.value }
                    })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="archetypeQuote">Quote</Label>
                  <Input
                    id="archetypeQuote"
                    value={formData.archetype?.quote}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      archetype: { ...formData.archetype!, quote: e.target.value }
                    })}
                    placeholder="Your archetype quote..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" size="lg" className="flex-1">
                  Create Portfolio
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
