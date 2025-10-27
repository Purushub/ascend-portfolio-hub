import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { StudentProfile } from "@/types/student";
import { Upload, UserPlus, X, Plus, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const UploadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const existingData: StudentProfile | undefined = location.state?.studentData;
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    fullName: "",
    schoolName: "",
    grade: "",
    year: "",
    aboutMe: "",
    personalBio: "",
    theme: "minimal",
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
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  
  const [avatarGender, setAvatarGender] = React.useState<'male' | 'female'>('male');
  
  const maleAvatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max&backgroundColor=c0aede',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver&backgroundColor=d1d4f9',
    'https://api.dicebear.com/7.x/big-smile/svg?seed=Charlie&backgroundColor=ffd5dc',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=James&backgroundColor=ffdfbf',
    'https://api.dicebear.com/7.x/lorelei/svg?seed=Lucas&backgroundColor=b6e3f4',
  ];

  const femaleAvatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffd5dc',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=ffdfbf',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&backgroundColor=d1d4f9',
    'https://api.dicebear.com/7.x/big-smile/svg?seed=Emma&backgroundColor=c0aede',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/lorelei/svg?seed=Olivia&backgroundColor=ffd5dc',
  ];

  const avatarOptions = avatarGender === 'male' ? maleAvatars : femaleAvatars;
  
  // Load existing data if available
  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
      setProfileImagePreview(existingData.profileImage || "");
      setSelectedAvatar(existingData.selectedAvatar || "");
      setProjects(existingData.projects.map(p => ({
        ...p,
        link: p.link || "",
        achievement: p.achievement || "",
        images: p.images || [],
        imageDescriptions: p.imageDescriptions || []
      })));
      setCaseStudies(existingData.caseStudies.map(c => ({
        ...c,
        steps: c.steps.map(s => ({ ...s, image: s.image || "" }))
      })));
      setExtracurricular(existingData.extracurricular.map(e => ({
        ...e,
        highlights: e.highlights || []
      })));
    }
  }, [existingData]);
  
  // Projects state
  const [projects, setProjects] = useState<Array<{
    title: string;
    description: string;
    skills: string;
    tools: string;
    duration: string;
    link?: string;
    achievement?: string;
    images?: string[];
    imageDescriptions?: string[];
  }>>([]);

  // Case studies state
  const [caseStudies, setCaseStudies] = useState<Array<{
    title: string;
    description: string;
    skills: string;
    duration: string;
    steps: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  }>>([]);

  // Extracurricular state
  const [extracurricular, setExtracurricular] = useState<Array<{
    title: string;
    description: string;
    skills: string;
    duration: string;
    highlights?: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  }>>([]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    return new Promise((resolve) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
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
      selectedAvatar: selectedAvatar || undefined,
      projects,
      caseStudies,
      extracurricular,
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
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                
                {/* Tabs for Upload or Avatar Selection */}
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={!selectedAvatar ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAvatar("")}
                  >
                    Upload Photo
                  </Button>
                  <Button
                    type="button"
                    variant={selectedAvatar ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProfileImagePreview("")}
                  >
                    Choose Avatar
                  </Button>
                </div>

                {!selectedAvatar ? (
                  <div className="space-y-2">
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
                ) : (
                  <div className="space-y-3">
                    <Label>Choose Avatar Style</Label>
                    <div className="flex gap-2 mb-4">
                      <Button
                        type="button"
                        variant={avatarGender === 'male' ? 'default' : 'outline'}
                        onClick={() => setAvatarGender('male')}
                        className="flex-1"
                      >
                        Male Avatars
                      </Button>
                      <Button
                        type="button"
                        variant={avatarGender === 'female' ? 'default' : 'outline'}
                        onClick={() => setAvatarGender('female')}
                        className="flex-1"
                      >
                        Female Avatars
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {avatarOptions.map((avatar, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${
                            selectedAvatar === avatar ? "border-primary ring-4 ring-primary/20 scale-105" : "border-muted"
                          }`}
                        >
                          <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-contain rounded-xl" />
                        </button>
                      ))}
                    </div>
                    {selectedAvatar && (
                      <div className="flex justify-center mt-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                          <img src={selectedAvatar} alt="Selected Avatar" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                  value={Array.isArray(formData.coreStrengths) ? formData.coreStrengths.join(", ") : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      coreStrengths: value ? value.split(",").map(s => s.trim()) : []
                    });
                  }}
                  placeholder="e.g., Leadership, Creativity, Problem Solving"
                />
              </div>

              {/* Passions */}
              <div className="space-y-2">
                <Label htmlFor="passions">Passions & Interests (comma separated)</Label>
                <Input
                  id="passions"
                  value={Array.isArray(formData.passions) ? formData.passions.join(", ") : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ 
                      ...formData, 
                      passions: value ? value.split(",").map(s => s.trim()) : []
                    });
                  }}
                  placeholder="e.g., Music, Technology, Sports"
                />
              </div>

              {/* Theme Selection */}
              <div className="space-y-2">
                <Label htmlFor="theme">Portfolio Theme</Label>
                <Select
                  value={formData.theme || "minimal"}
                  onValueChange={(value: any) => setFormData({ ...formData, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal - Clean & Simple</SelectItem>
                    <SelectItem value="creative">Creative - Colorful & Bold</SelectItem>
                    <SelectItem value="modern">Modern - Sleek & Professional</SelectItem>
                    <SelectItem value="wholesome">Wholesome - Warm & Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Achievement Level */}
              <div className="space-y-2">
                <Label htmlFor="achievementLevel">Achievement Level</Label>
                <Select
                  value={formData.achievementLevel}
                  onValueChange={(value: any) => setFormData({ ...formData, achievementLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select achievement level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scholar">Scholar</SelectItem>
                    <SelectItem value="Valedictorian">Valedictorian</SelectItem>
                    <SelectItem value="Brilliant">Brilliant</SelectItem>
                    <SelectItem value="Diligent">Diligent</SelectItem>
                    <SelectItem value="Exemplary">Exemplary</SelectItem>
                    <SelectItem value="Focused">Focused</SelectItem>
                    <SelectItem value="Motivated">Motivated</SelectItem>
                    <SelectItem value="Disciplined">Disciplined</SelectItem>
                    <SelectItem value="Curious">Curious</SelectItem>
                    <SelectItem value="Proactive">Proactive</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Social Energy Style */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Energy Style</h3>
                <div className="space-y-2">
                  <Label htmlFor="socialEnergyType">Type</Label>
                  <Input
                    id="socialEnergyType"
                    value={formData.socialEnergyStyle?.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialEnergyStyle: { ...formData.socialEnergyStyle!, type: e.target.value }
                    })}
                    placeholder="e.g., Introvert, Extrovert, Ambivert"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialEnergyDescription">Description</Label>
                  <Textarea
                    id="socialEnergyDescription"
                    value={formData.socialEnergyStyle?.description}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialEnergyStyle: { ...formData.socialEnergyStyle!, description: e.target.value }
                    })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Projects Section */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setProjects([...projects, { title: "", description: "", skills: "", tools: "", duration: "", link: "", achievement: "", images: [], imageDescriptions: [] }])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                {projects.map((project, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].title = e.target.value;
                            setProjects(newProjects);
                          }}
                          placeholder="Project title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].description = e.target.value;
                            setProjects(newProjects);
                          }}
                          placeholder="Project description"
                          rows={3}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Skills</Label>
                          <Input
                            value={project.skills}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].skills = e.target.value;
                              setProjects(newProjects);
                            }}
                            placeholder="e.g., Confidence, Leadership, Communication"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tools</Label>
                          <Input
                            value={project.tools}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].tools = e.target.value;
                              setProjects(newProjects);
                            }}
                            placeholder="e.g., Figma, React, Python"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={project.duration}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].duration = e.target.value;
                              setProjects(newProjects);
                            }}
                            placeholder="e.g., 3 months"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Project Link</Label>
                          <Input
                            value={project.link}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].link = e.target.value;
                              setProjects(newProjects);
                            }}
                            placeholder="e.g., https://project-url.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Achievement/Award</Label>
                        <Input
                          value={project.achievement}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].achievement = e.target.value;
                            setProjects(newProjects);
                          }}
                          placeholder="e.g., Won the Govt challenge"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Upload Project Images</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            const images = await Promise.all(
                              files.map(file => {
                                return new Promise<string>((resolve) => {
                                  const reader = new FileReader();
                                  reader.onloadend = () => resolve(reader.result as string);
                                  reader.readAsDataURL(file);
                                });
                              })
                            );
                            const newProjects = [...projects];
                            newProjects[index].images = [...newProjects[index].images, ...images];
                            setProjects(newProjects);
                          }}
                        />
                        {project.images.length > 0 && (
                          <div className="flex gap-2 flex-wrap mt-2">
                            {project.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative w-20 h-20">
                                <img src={img} alt={`Project ${index + 1} - ${imgIndex + 1}`} className="w-full h-full object-cover rounded" />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                  onClick={() => {
                                    const newProjects = [...projects];
                                    newProjects[index].images = newProjects[index].images.filter((_, i) => i !== imgIndex);
                                    setProjects(newProjects);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Image Descriptions (comma separated)</Label>
                        <Input
                          value={project.imageDescriptions.join(", ")}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].imageDescriptions = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                            setProjects(newProjects);
                          }}
                          placeholder="Description for each image"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Case Studies Section */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Case Studies</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCaseStudies([...caseStudies, { title: "", description: "", skills: "", duration: "", steps: [] }])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Case Study
                  </Button>
                </div>
                {caseStudies.map((caseStudy, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Case Study {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setCaseStudies(caseStudies.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={caseStudy.title}
                          onChange={(e) => {
                            const newCaseStudies = [...caseStudies];
                            newCaseStudies[index].title = e.target.value;
                            setCaseStudies(newCaseStudies);
                          }}
                          placeholder="Case study title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={caseStudy.description}
                          onChange={(e) => {
                            const newCaseStudies = [...caseStudies];
                            newCaseStudies[index].description = e.target.value;
                            setCaseStudies(newCaseStudies);
                          }}
                          rows={3}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Skills</Label>
                          <Input
                            value={caseStudy.skills}
                            onChange={(e) => {
                              const newCaseStudies = [...caseStudies];
                              newCaseStudies[index].skills = e.target.value;
                              setCaseStudies(newCaseStudies);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={caseStudy.duration}
                            onChange={(e) => {
                              const newCaseStudies = [...caseStudies];
                              newCaseStudies[index].duration = e.target.value;
                              setCaseStudies(newCaseStudies);
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Case Study Steps */}
                      <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center justify-between">
                          <Label>Steps</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newCaseStudies = [...caseStudies];
                              newCaseStudies[index].steps.push({ title: "", description: "", image: "" });
                              setCaseStudies(newCaseStudies);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Step
                          </Button>
                        </div>
                        {caseStudy.steps.map((step, stepIndex) => (
                          <Card key={stepIndex} className="p-3">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <Label className="text-sm">Step {stepIndex + 1}</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newCaseStudies = [...caseStudies];
                                    newCaseStudies[index].steps = newCaseStudies[index].steps.filter((_, i) => i !== stepIndex);
                                    setCaseStudies(newCaseStudies);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Step title"
                                value={step.title}
                                onChange={(e) => {
                                  const newCaseStudies = [...caseStudies];
                                  newCaseStudies[index].steps[stepIndex].title = e.target.value;
                                  setCaseStudies(newCaseStudies);
                                }}
                              />
                              <Textarea
                                placeholder="Step description"
                                value={step.description}
                                onChange={(e) => {
                                  const newCaseStudies = [...caseStudies];
                                  newCaseStudies[index].steps[stepIndex].description = e.target.value;
                                  setCaseStudies(newCaseStudies);
                                }}
                                rows={2}
                              />
                              <div className="space-y-2">
                                <Label className="text-sm">Step Image</Label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const image = await handleImageUpload(e);
                                    const newCaseStudies = [...caseStudies];
                                    newCaseStudies[index].steps[stepIndex].image = image;
                                    setCaseStudies(newCaseStudies);
                                  }}
                                />
                                {step.image && (
                                  <img src={step.image} alt={`Step ${stepIndex + 1}`} className="w-20 h-20 object-cover rounded" />
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Extracurricular Section */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Extracurricular Activities</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExtracurricular([...extracurricular, { title: "", description: "", skills: "", duration: "", highlights: [] }])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
                {extracurricular.map((activity, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Activity {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setExtracurricular(extracurricular.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={activity.title}
                          onChange={(e) => {
                            const newActivities = [...extracurricular];
                            newActivities[index].title = e.target.value;
                            setExtracurricular(newActivities);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={activity.description}
                          onChange={(e) => {
                            const newActivities = [...extracurricular];
                            newActivities[index].description = e.target.value;
                            setExtracurricular(newActivities);
                          }}
                          rows={3}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Skills</Label>
                          <Input
                            value={activity.skills}
                            onChange={(e) => {
                              const newActivities = [...extracurricular];
                              newActivities[index].skills = e.target.value;
                              setExtracurricular(newActivities);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={activity.duration}
                            onChange={(e) => {
                              const newActivities = [...extracurricular];
                              newActivities[index].duration = e.target.value;
                              setExtracurricular(newActivities);
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Activity Highlights with image upload */}
                      <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center justify-between">
                          <Label>Highlights & Achievements</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newActivities = [...extracurricular];
                              if (!newActivities[index].highlights) newActivities[index].highlights = [];
                              newActivities[index].highlights!.push({ title: "", description: "", image: "" });
                              setExtracurricular(newActivities);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Highlight
                          </Button>
                        </div>
                        {activity.highlights?.map((highlight, highlightIndex) => (
                          <Card key={highlightIndex} className="p-3">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <Label className="text-sm">Highlight {highlightIndex + 1}</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newActivities = [...extracurricular];
                                    newActivities[index].highlights = newActivities[index].highlights!.filter((_, i) => i !== highlightIndex);
                                    setExtracurricular(newActivities);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Title"
                                value={highlight.title}
                                onChange={(e) => {
                                  const newActivities = [...extracurricular];
                                  newActivities[index].highlights![highlightIndex].title = e.target.value;
                                  setExtracurricular(newActivities);
                                }}
                              />
                              <Textarea
                                placeholder="Description"
                                value={highlight.description}
                                onChange={(e) => {
                                  const newActivities = [...extracurricular];
                                  newActivities[index].highlights![highlightIndex].description = e.target.value;
                                  setExtracurricular(newActivities);
                                }}
                                rows={2}
                              />
                              <div className="space-y-2">
                                <Label className="text-xs">Upload Image</Label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const imageUrl = await handleImageUpload(e);
                                    if (imageUrl) {
                                      const newActivities = [...extracurricular];
                                      newActivities[index].highlights![highlightIndex].image = imageUrl;
                                      setExtracurricular(newActivities);
                                    }
                                  }}
                                />
                                {highlight.image && (
                                  <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                                    <img src={highlight.image} alt={highlight.title} className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
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
