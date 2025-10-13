import { useLocation } from "react-router-dom";
import { StudentProfile } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCircle } from "@/components/SkillCircle";
import { ProjectCard } from "@/components/ProjectCard";
import { CareerCard } from "@/components/CareerCard";
import { Download, User, GraduationCap, Calendar, Hash, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const location = useLocation();
  const studentData: StudentProfile = location.state?.studentData;
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No student data found</h2>
          <Button onClick={() => window.location.href = "/"}>Return to Upload</Button>
        </div>
      </div>
    );
  }

  const skillColors = {
    Adaptability: "#8B5CF6",
    Teamwork: "#10B981",
    Confidence: "#EF4444",
    "Creative Thinking": "#F59E0B",
    "Critical Thinking": "#6366F1",
    "Decision Making": "#EC4899",
    "Emotional Intelligence": "#14B8A6",
    Leadership: "#F97316",
    "Problem Solving": "#3B82F6",
    "Time Management": "#22C55E",
  };

  const exportAsHTML = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${studentData.fullName.replace(/\s+/g, "_")}_Portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sharePortfolio = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${studentData.fullName}'s Portfolio`,
          text: `Check out ${studentData.fullName}'s digital portfolio!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Portfolio link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header with Export Button */}
      <div className="bg-primary text-primary-foreground py-8 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">SkilliZee Pro</h1>
            <p className="text-lg opacity-90">Student Digital Portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={sharePortfolio} variant="secondary" size="lg">
              {copied ? <Check className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
              {copied ? "Copied!" : "Share Portfolio"}
            </Button>
            <Button onClick={exportAsHTML} variant="secondary" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12 animate-fade-in">
        {/* Profile Snapshot */}
        <section className="bg-secondary/50 rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            Profile Snapshot
          </h2>

          {/* Profile Picture with Achievement Badge */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <div className="relative w-40 h-40 rounded-full border-4 border-primary overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl">
                {studentData.profileImage ? (
                  <img 
                    src={studentData.profileImage} 
                    alt={studentData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                    <User className="h-20 w-20 text-primary-foreground" />
                  </div>
                )}
              </div>
              {studentData.achievementLevel && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg border border-white/20">
                  ⭐ {studentData.achievementLevel}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Full Name:</span>
                  <span>{studentData.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="font-semibold">School:</span>
                  <span>{studentData.schoolName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Grade:</span>
                  <span>{studentData.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Year:</span>
                  <span>{studentData.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Profile ID:</span>
                  <span className="text-muted-foreground">{studentData.profileId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Last Updated:</span>
                  <span className="text-muted-foreground">{studentData.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{studentData.aboutMe}</p>
              </CardContent>
            </Card>
          </div>

          {/* Archetype */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Your Archetype</CardTitle>
              <h3 className="text-3xl font-bold text-primary">{studentData.archetype.title}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{studentData.archetype.description}</p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-foreground">
                "{studentData.archetype.quote}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Social Energy Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Social Energy Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-lg py-2 px-4">
                  {studentData.socialEnergyStyle.type}
                </Badge>
              </div>
              <p className="text-muted-foreground">{studentData.socialEnergyStyle.description}</p>
            </CardContent>
          </Card>
        </section>

        {/* My Story So Far */}
        {(studentData.personalBio || studentData.coreStrengths?.length > 0 || studentData.passions?.length > 0) && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">My Story So Far</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {studentData.personalBio && (
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        ✍️
                      </div>
                      Personal Bio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{studentData.personalBio}</p>
                  </CardContent>
                </Card>
              )}

              {studentData.coreStrengths && studentData.coreStrengths.length > 0 && (
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                        💪
                      </div>
                      Core Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.coreStrengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline">{strength}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {studentData.passions && studentData.passions.length > 0 && (
                <Card className="bg-gradient-to-br from-success/10 to-success/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-success text-success-foreground flex items-center justify-center">
                        ❤️
                      </div>
                      Passions & Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.passions.map((passion, idx) => (
                        <Badge key={idx} variant="secondary">{passion}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Skills Profile */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Skills Profile</h2>
            <p className="text-muted-foreground">An overview of professional skills developed over the last 4 years.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(studentData.skills).map(([skill, data]) => (
              <SkillCircle
                key={skill}
                skill={skill}
                percentage={data.overall}
                color={skillColors[skill as keyof typeof skillColors] || "#8B5CF6"}
              />
            ))}
          </div>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(studentData.skills).map(([skill, data]) => (
                  <div key={skill} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{skill}</h4>
                      <span className="text-2xl font-bold text-primary">{data.overall}%</span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(data.subSkills).map(([subSkill, value]) => (
                        <div key={subSkill} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{subSkill}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-1000"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">My Projects Showcase</h2>
            <p className="text-muted-foreground">
              Explore a selection of my key projects, demonstrating practical application of learning and creative problem-solving abilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData.projects.map((project, idx) => (
              <ProjectCard 
                key={idx} 
                {...project} 
                image={project.images?.[0]} 
                imageDescription={project.imageDescriptions?.[0]}
              />
            ))}
          </div>
        </section>

        {/* Case Studies */}
        {studentData.caseStudies && studentData.caseStudies.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Case Studies</h2>
            
            {studentData.caseStudies.map((study, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardTitle className="text-2xl">{study.title}</CardTitle>
                  <p className="text-muted-foreground">{study.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {study.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="space-y-3">
                        <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                          {step.image && (
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div>
                      <span className="font-semibold text-primary">Skills Gained: </span>
                      <span className="text-muted-foreground">{study.skills}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Duration: </span>
                      <span className="text-muted-foreground">{study.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* Career Paths */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Careers Where You'll Thrive</h2>
            <p className="text-muted-foreground">Future paths that match your unique strengths and interests</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {studentData.careerPaths.map((career, idx) => (
              <CareerCard key={idx} {...career} />
            ))}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="default" size="lg">Explore Relevant Programs</Button>
            <Button variant="outline" size="lg">Take a Career Assessment</Button>
          </div>
        </section>

        {/* Share & Get Endorsed */}
        <section className="bg-secondary/50 rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Share & Get Endorsed</h2>
            <p className="text-muted-foreground">
              Once your digital portfolio is ready, share it widely to amplify its reach and gather valuable endorsements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amplify Your Reach</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Expand your audience beyond academic committees to include family, friends, and a wider professional network.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Boost Credibility</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Gather authentic testimonials and reviews that validate your skills and achievements.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Build Network</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Connect with mentors, teachers, and professionals who can support your educational journey.
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="default" size="lg">Share My Portfolio</Button>
            <Button variant="outline" size="lg">Request an Endorsement</Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg italic mb-2">
            "The most powerful story of your work is often told through the voices of those who've seen you in action."
          </p>
          <p className="text-sm opacity-75">SkilliZee Pro - Student Digital Portfolio Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
