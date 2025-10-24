import { useLocation } from "react-router-dom";
import { StudentProfile } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCircle } from "@/components/SkillCircle";
import { ProjectCard } from "@/components/ProjectCard";
import { CareerCard } from "@/components/CareerCard";
import { Download, User, GraduationCap, Calendar, Hash, Share2, Check, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RatingComment } from "@/components/RatingComment";
import { useNavigate } from "react-router-dom";
const Portfolio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData: StudentProfile = location.state?.studentData;
  const [copied, setCopied] = useState(false);
  const {
    toast
  } = useToast();
  const theme = studentData?.theme || "minimal";
  const handleUpdate = () => {
    navigate("/upload-form", {
      state: {
        studentData
      }
    });
  };
  if (!studentData) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No student data found</h2>
          <Button onClick={() => window.location.href = "/"}>Return to Upload</Button>
        </div>
      </div>;
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
    "Time Management": "#22C55E"
  };
  const exportAsHTML = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], {
      type: "text/html"
    });
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
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Portfolio link has been copied to clipboard."
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Theme-specific class configurations
  const themeClasses = {
    minimal: {
      wrapper: "min-h-screen bg-gradient-to-b from-background to-secondary/20",
      header: "bg-primary text-primary-foreground py-8 px-6",
      headerTitle: "text-4xl font-bold mb-2",
      headerSubtitle: "text-lg opacity-90",
      button: "",
      section: "bg-secondary/50 rounded-2xl p-8 space-y-6",
      sectionTitle: "text-3xl font-bold text-foreground",
      textColor: "text-foreground",
      mutedText: "text-muted-foreground",
      iconColor: "text-primary"
    },
    creative: {
      wrapper: "min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950",
      header: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-10 px-6 shadow-2xl",
      headerTitle: "text-5xl font-black mb-2",
      headerSubtitle: "text-lg",
      button: "bg-white/20 hover:bg-white/30 border-white/40",
      section: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 space-y-6 shadow-xl border-2 border-purple-200 dark:border-purple-800",
      sectionTitle: "text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400",
      textColor: "text-gray-900 dark:text-white",
      mutedText: "text-gray-700 dark:text-gray-300",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    modern: {
      wrapper: "min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
      header: "bg-slate-900 dark:bg-slate-950 text-white py-10 px-6 border-b-4 border-blue-500",
      headerTitle: "text-4xl font-bold mb-2 tracking-tight",
      headerSubtitle: "text-lg",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      section: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-lg border border-slate-200 dark:border-slate-700",
      sectionTitle: "text-3xl font-bold text-slate-900 dark:text-white tracking-tight",
      textColor: "text-slate-900 dark:text-white",
      mutedText: "text-slate-700 dark:text-slate-300",
      iconColor: "text-blue-500"
    },
    futuristic: {
      wrapper: "min-h-screen bg-black",
      header: "bg-gradient-to-r from-black via-purple-950 to-black text-white py-12 px-6 border-b border-purple-500/30",
      headerTitle: "text-5xl font-black mb-2 tracking-wider uppercase text-white",
      headerSubtitle: "text-lg text-purple-300",
      button: "border-purple-500 text-purple-300 hover:bg-purple-500/20 bg-transparent",
      section: "bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl p-8 space-y-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10",
      sectionTitle: "text-3xl font-bold text-white tracking-wide uppercase",
      textColor: "text-white",
      mutedText: "text-gray-300",
      iconColor: "text-purple-400"
    }
  };
  const t = themeClasses[theme];
  return <div className={t.wrapper}>
      {/* Header with Export Button */}
      <div className={t.header}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={t.headerTitle}>SkilliZee Pro</h1>
            <p className={t.headerSubtitle}>Student Digital Portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleUpdate} variant={theme === 'minimal' ? 'secondary' : 'outline'} size="lg" className={t.button}>
              <Edit className="mr-2 h-5 w-5" />
              Update Portfolio
            </Button>
            <Button onClick={sharePortfolio} variant={theme === 'minimal' ? 'secondary' : 'outline'} size="lg" className={t.button}>
              {copied ? <Check className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button onClick={exportAsHTML} variant={theme === 'minimal' ? 'secondary' : 'outline'} size="lg" className={t.button}>
              <Download className="mr-2 h-5 w-5" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12 animate-fade-in">
        {/* Profile Snapshot */}
        <section className={t.section}>
          <h2 className={`${t.sectionTitle} flex items-center gap-3`}>
            <User className={`h-8 w-8 ${t.iconColor}`} />
            Profile Snapshot
          </h2>

          {/* Profile Picture with Achievement Badge */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`absolute inset-0 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500' : 'bg-gradient-to-r from-primary via-purple-500 to-pink-500'} rounded-full blur-xl opacity-75 animate-pulse`}></div>
              <div className={`relative w-40 h-40 rounded-full ${theme === 'futuristic' ? 'border-4 border-purple-500' : 'border-4 border-primary'} overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl`}>
                {studentData.profileImage ? <img src={studentData.profileImage} alt={studentData.fullName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                    <User className="h-20 w-20 text-primary-foreground" />
                  </div>}
              </div>
              {studentData.achievementLevel && <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-primary to-purple-600'} text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg border border-white/20`}>
                  ⭐ {studentData.achievementLevel}
                </div>}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 text-white overflow-hidden' : 'bg-white border-slate-200 overflow-hidden'}>
              <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-primary to-accent'}`}></div>
              <CardHeader>
                <CardTitle className={theme === 'futuristic' ? 'text-white' : 'text-foreground'}>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Full Name:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-200' : 'text-foreground'}>{studentData.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>School:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-200' : 'text-foreground'}>{studentData.schoolName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Grade:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-200' : 'text-foreground'}>{studentData.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Year:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-200' : 'text-foreground'}>{studentData.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Profile ID:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{studentData.profileId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Last Updated:</span>
                  <span className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{studentData.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 text-white overflow-hidden' : 'bg-white border-slate-200 overflow-hidden'}>
              <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}></div>
              <CardHeader>
                <CardTitle className={theme === 'futuristic' ? 'text-white' : 'text-foreground'}>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`leading-relaxed ${theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}`}>{studentData.aboutMe}</p>
              </CardContent>
            </Card>
          </div>

          {/* Archetype */}
          <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 overflow-hidden' : 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 overflow-hidden'}>
            <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500' : 'bg-gradient-to-r from-primary via-purple-500 to-accent'}`}></div>
            <CardHeader>
              <CardTitle className={`text-2xl ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Your Archetype</CardTitle>
              <h3 className={`text-3xl font-bold ${theme === 'futuristic' ? 'text-purple-400' : 'text-primary'}`}>{studentData.archetype.title}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`leading-relaxed ${theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}`}>{studentData.archetype.description}</p>
              <blockquote className={`border-l-4 ${theme === 'futuristic' ? 'border-purple-500 text-white' : 'border-primary text-foreground'} pl-4 italic text-lg`}>
                "{studentData.archetype.quote}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Social Energy Style */}
          <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 text-white overflow-hidden' : 'bg-white border-slate-200 overflow-hidden'}>
            <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-gradient-to-r from-accent to-primary'}`}></div>
            <CardHeader>
              <CardTitle className={`text-xl ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Your Social Energy Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className={`text-lg py-2 px-4 ${theme === 'futuristic' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : ''}`}>
                  {studentData.socialEnergyStyle.type}
                </Badge>
              </div>
              <p className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{studentData.socialEnergyStyle.description}</p>
            </CardContent>
          </Card>
        </section>

        {/* My Story So Far */}
        {(studentData.personalBio || studentData.coreStrengths?.length > 0 || studentData.passions?.length > 0) && <section className="space-y-6">
            <h2 className={t.sectionTitle}>My Story So Far</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {studentData.personalBio && <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 overflow-hidden' : 'bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden'}>
                  <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-500 to-purple-400' : 'bg-gradient-to-r from-primary to-purple-500'}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>
                      <div className={`w-10 h-10 rounded-full ${theme === 'futuristic' ? 'bg-purple-500/20 text-purple-300' : 'bg-primary text-primary-foreground'} flex items-center justify-center`}>
                        ✍️
                      </div>
                      Personal Bio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm leading-relaxed ${theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}`}>{studentData.personalBio}</p>
                  </CardContent>
                </Card>}

              {studentData.coreStrengths && studentData.coreStrengths.length > 0 && <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 overflow-hidden' : 'bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden'}>
                  <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-pink-500 to-pink-400' : 'bg-gradient-to-r from-accent to-pink-500'}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>
                      <div className={`w-10 h-10 rounded-full ${theme === 'futuristic' ? 'bg-pink-500/20 text-pink-300' : 'bg-accent text-accent-foreground'} flex items-center justify-center`}>
                        💪
                      </div>
                      Core Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.coreStrengths.map((strength, idx) => <Badge key={idx} variant="outline" className={theme === 'futuristic' ? 'border-purple-500/30 text-purple-300' : ''}>{strength}</Badge>)}
                    </div>
                  </CardContent>
                </Card>}

              {studentData.passions && studentData.passions.length > 0 && <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 overflow-hidden' : 'bg-gradient-to-br from-success/10 to-success/5 overflow-hidden'}>
                  <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-success to-blue-500'}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>
                      <div className={`w-10 h-10 rounded-full ${theme === 'futuristic' ? 'bg-blue-500/20 text-blue-300' : 'bg-success text-success-foreground'} flex items-center justify-center`}>
                        ❤️
                      </div>
                      Passions & Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.passions.map((passion, idx) => <Badge key={idx} variant="secondary" className={theme === 'futuristic' ? 'bg-purple-500/20 text-purple-300' : ''}>{passion}</Badge>)}
                    </div>
                  </CardContent>
                </Card>}
            </div>
          </section>}

        {/* Skills Profile */}
        <section className="space-y-6">
          <div>
            <h2 className={`${t.sectionTitle} mb-2`}>Skills Profile</h2>
            <p className={t.mutedText}>An overview of professional skills developed over the last 4 years.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(studentData.skills).map(([skill, data]) => <SkillCircle key={skill} skill={skill} percentage={data.overall} color={skillColors[skill as keyof typeof skillColors] || "#8B5CF6"} />)}
          </div>

          {/* Detailed Breakdown */}
          <Card className={theme === 'futuristic' ? 'bg-slate-900 border-slate-700 text-white overflow-hidden' : 'bg-white border-slate-200 overflow-hidden'}>
            <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500' : 'bg-gradient-to-r from-primary via-purple-500 to-accent'}`}></div>
            <CardHeader>
              <CardTitle className={`text-2xl ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(studentData.skills).map(([skill, data]) => <div key={skill} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold text-lg ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>{skill}</h4>
                      <span className={`text-2xl font-bold ${theme === 'futuristic' ? 'text-purple-400' : 'text-primary'}`}>{data.overall}%</span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(data.subSkills).map(([subSkill, value]) => <div key={subSkill} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{subSkill}</span>
                            <span className={`font-medium ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>{value}%</span>
                          </div>
                          <div className={`h-2 rounded-full overflow-hidden ${theme === 'futuristic' ? 'bg-gray-800' : 'bg-muted'}`}>
                            <div className={`h-full transition-all duration-1000 ${theme === 'futuristic' ? 'bg-purple-500' : 'bg-primary'}`} style={{
                        width: `${value}%`
                      }} />
                          </div>
                        </div>)}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects Showcase */}
        <section className="space-y-6">
          <div>
            <h2 className={`${t.sectionTitle} mb-2`}>My Projects Showcase</h2>
            <p className={t.mutedText}>
              Explore a selection of my key projects, demonstrating practical application of learning and creative problem-solving abilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData.projects.map((project, idx) => <ProjectCard key={idx} title={project.title} description={project.description} skills={project.skills} tools={project.tools} duration={project.duration} link={project.link} achievement={project.achievement} images={project.images} imageDescriptions={project.imageDescriptions} />)}
          </div>
        </section>


        {/* Beyond the Classroom */}
        {studentData.extracurricular && studentData.extracurricular.length > 0 && <section className="space-y-6">
            <h2 className={t.sectionTitle}>Beyond the Classroom</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.extracurricular.map((activity, idx) => <Card key={idx} className={`overflow-hidden ${theme === 'futuristic' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-accent to-primary'}`}></div>
                  <CardHeader className={theme === 'futuristic' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-accent/10 to-primary/10'}>
                    <CardTitle className={`text-xl ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>{activity.title}</CardTitle>
                    <p className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{activity.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {activity.images && activity.images.length > 0 && <div className="grid grid-cols-2 gap-4 mb-4">
                        {activity.images.map((img, imgIdx) => <div key={imgIdx} className="space-y-2">
                            <div className={`aspect-video rounded-lg overflow-hidden ${theme === 'futuristic' ? 'bg-gray-800' : 'bg-secondary'}`}>
                              {/* Placeholder for image */}
                            </div>
                            <div className="text-xs">
                              <p className={`font-semibold ${theme === 'futuristic' ? 'text-white' : 'text-foreground'}`}>{img.caption}</p>
                              <p className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{img.description}</p>
                            </div>
                          </div>)}
                      </div>}
                    <div className={`space-y-2 pt-4 ${theme === 'futuristic' ? 'border-t border-slate-700' : 'border-t'}`}>
                      <div>
                        <span className={`font-semibold ${theme === 'futuristic' ? 'text-purple-400' : 'text-primary'}`}>Skills: </span>
                        <span className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{activity.skills}</span>
                      </div>
                      <div>
                        <span className={`font-semibold ${theme === 'futuristic' ? 'text-purple-400' : 'text-primary'}`}>Duration: </span>
                        <span className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{activity.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </section>}

        {/* Career Paths */}
        {studentData.careerPaths && studentData.careerPaths.length > 0 && <section className="space-y-6">
            <div>
              <h2 className={`${t.sectionTitle} mb-2`}>Potential Career Paths</h2>
              <p className={t.mutedText}>
                Based on your skills, interests, and archetype, these career paths could be an excellent fit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {studentData.careerPaths.map((career, idx) => <CareerCard key={idx} title={career.title} field={career.field} whyLoveIt={career.whyLoveIt} dayLooksLike={career.dayLooksLike} keySubjects={career.keySubjects} />)}
            </div>
          </section>}

        {/* Publications */}
        {studentData.publications && studentData.publications.length > 0 && <section className="space-y-6">
            <h2 className={t.sectionTitle}>Publications & Writing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.publications.map((pub, idx) => <Card key={idx} className={`overflow-hidden ${theme === 'futuristic' ? 'bg-slate-900 border-slate-700 hover:border-purple-500/40' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
                  <div className={`h-1 ${theme === 'futuristic' ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-gradient-to-r from-primary to-accent'}`}></div>
                  <CardHeader>
                    <CardTitle className={theme === 'futuristic' ? 'text-white' : 'text-foreground'}>{pub.title}</CardTitle>
                    <p className={theme === 'futuristic' ? 'text-gray-300' : 'text-muted-foreground'}>{pub.platform} • {pub.date}</p>
                  </CardHeader>
                  <CardContent>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className={theme === 'futuristic' ? 'text-purple-400 hover:text-purple-300' : 'text-primary hover:underline'}>
                      Read Article →
                    </a>
                  </CardContent>
                </Card>)}
            </div>
          </section>}

        {/* Ratings & Comments */}
        <section className="space-y-6">
          
          <RatingComment />
        </section>
      </div>
    </div>;
};
export default Portfolio;