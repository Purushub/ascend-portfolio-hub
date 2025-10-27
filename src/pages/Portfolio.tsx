import { useLocation } from "react-router-dom";
import { StudentProfile } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCircle } from "@/components/SkillCircle";
import { ProjectCard } from "@/components/ProjectCard";
import { CareerCard } from "@/components/CareerCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
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
  const { toast } = useToast();
  
  const theme = studentData?.theme || "minimal";
  const isWholesome = theme === "wholesome";
  
  const handleUpdate = () => {
    navigate("/upload-form", { state: { studentData } });
  };

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
    // Get all stylesheets content
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    // Get the current page content
    const content = document.documentElement.outerHTML;
    
    // Create a complete HTML document with embedded styles
    const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${studentData.fullName}'s Portfolio</title>
  <style>
    ${styles}
  </style>
</head>
${content.substring(content.indexOf('<body'))}
</html>`;

    const blob = new Blob([completeHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${studentData.fullName.replace(/\s+/g, "_")}_Portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Portfolio Exported",
      description: "Your portfolio has been exported with full styling.",
    });
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
        console.log("Share cancelled");
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
      card: "bg-white border-slate-200",
      cardAccent: "bg-gradient-to-r from-primary to-accent",
      cardTitle: "text-foreground",
      textPrimary: "text-foreground",
      textSecondary: "text-muted-foreground",
      iconColor: "text-primary",
      badge: "",
      profileGlow: "bg-gradient-to-r from-primary via-purple-500 to-pink-500",
      profileBorder: "border-4 border-primary",
      achievementBadge: "bg-gradient-to-r from-primary to-purple-600",
    },
    creative: {
      wrapper: "min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950",
      header: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-10 px-6 shadow-2xl",
      headerTitle: "text-5xl font-black mb-2",
      headerSubtitle: "text-lg",
      button: "bg-white/20 hover:bg-white/30 border-white/40",
      section: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 space-y-6 shadow-xl border-2 border-purple-200 dark:border-purple-800",
      sectionTitle: "text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400",
      card: "bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700",
      cardAccent: "bg-gradient-to-r from-pink-500 to-purple-500",
      cardTitle: "text-gray-900 dark:text-white",
      textPrimary: "text-gray-900 dark:text-white",
      textSecondary: "text-gray-700 dark:text-gray-300",
      iconColor: "text-purple-600 dark:text-purple-400",
      badge: "",
      profileGlow: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
      profileBorder: "border-4 border-purple-500",
      achievementBadge: "bg-gradient-to-r from-pink-600 to-purple-600",
    },
    modern: {
      wrapper: "min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
      header: "bg-slate-900 dark:bg-slate-950 text-white py-10 px-6 border-b-4 border-blue-500",
      headerTitle: "text-4xl font-bold mb-2 tracking-tight",
      headerSubtitle: "text-lg",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      section: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-xl p-8 space-y-6 shadow-lg border border-slate-200 dark:border-slate-700",
      sectionTitle: "text-3xl font-bold text-slate-900 dark:text-white tracking-tight",
      card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
      cardAccent: "bg-gradient-to-r from-blue-500 to-cyan-500",
      cardTitle: "text-slate-900 dark:text-white",
      textPrimary: "text-slate-900 dark:text-white",
      textSecondary: "text-slate-700 dark:text-slate-300",
      iconColor: "text-blue-500",
      badge: "",
      profileGlow: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500",
      profileBorder: "border-4 border-blue-500",
      achievementBadge: "bg-gradient-to-r from-blue-600 to-cyan-600",
    },
    wholesome: {
      wrapper: "min-h-screen bg-[hsl(var(--wholesome-light))] font-nunito",
      header: "bg-gradient-to-r from-[hsl(var(--wholesome-cream))] to-[hsl(var(--wholesome-sand))] text-[hsl(var(--wholesome-dark-green))] py-10 px-6 shadow-lg rounded-b-3xl",
      headerTitle: "text-4xl font-bold mb-2 text-[hsl(var(--wholesome-terracotta))]",
      headerSubtitle: "text-lg text-[hsl(var(--wholesome-dark-green))]",
      button: "bg-white/60 hover:bg-white/80 text-[hsl(var(--wholesome-dark-green))] border-[hsl(var(--wholesome-sand))] rounded-full shadow-sm transition-all duration-300 hover:scale-105",
      section: "bg-white/80 backdrop-blur-sm rounded-3xl p-8 space-y-6 shadow-lg border-2 border-[hsl(var(--wholesome-sand))]",
      sectionTitle: "text-3xl font-semibold text-[hsl(var(--wholesome-terracotta))]",
      card: "bg-white border-2 border-[hsl(var(--wholesome-sand))] rounded-3xl shadow-md hover:shadow-xl transition-all duration-300",
      cardAccent: "bg-gradient-to-r from-[hsl(var(--wholesome-terracotta))] to-[hsl(var(--wholesome-accent))]",
      cardTitle: "text-[hsl(var(--wholesome-dark-green))]",
      textPrimary: "text-[hsl(var(--wholesome-dark-green))]",
      textSecondary: "text-[hsl(var(--wholesome-dark-green))]/70",
      iconColor: "text-[hsl(var(--wholesome-terracotta))]",
      badge: "bg-[hsl(var(--wholesome-sand))] text-[hsl(var(--wholesome-dark-green))] border-[hsl(var(--wholesome-terracotta))] rounded-full",
      profileGlow: "bg-gradient-to-r from-[hsl(var(--wholesome-terracotta))] via-[hsl(var(--wholesome-accent))] to-[hsl(var(--wholesome-sage))]",
      profileBorder: "border-4 border-[hsl(var(--wholesome-terracotta))]",
      achievementBadge: "bg-gradient-to-r from-[hsl(var(--wholesome-terracotta))] to-[hsl(var(--wholesome-accent))]",
    },
  };

  const t = themeClasses[theme] || themeClasses.minimal;

  return (
    <div className={t.wrapper}>
      {/* Header with Export Button */}
      <div className={t.header}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={t.headerTitle}>SkilliZee Pro</h1>
            <p className={t.headerSubtitle}>Student Digital Portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleUpdate}
              variant={theme === "minimal" ? "secondary" : "outline"}
              size="lg"
              className={t.button}
            >
              <Edit className="mr-2 h-5 w-5" />
              Update Portfolio
            </Button>
            <Button
              onClick={sharePortfolio}
              variant={theme === "minimal" ? "secondary" : "outline"}
              size="lg"
              className={t.button}
            >
              {copied ? <Check className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button
              onClick={exportAsHTML}
              variant={theme === "minimal" ? "secondary" : "outline"}
              size="lg"
              className={t.button}
            >
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
              <div className={`absolute inset-0 ${t.profileGlow} rounded-full blur-xl opacity-75 animate-pulse`}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/20 rounded-full blur-lg animate-rotate-light"></div>
              <div className={`relative w-40 h-40 rounded-full ${t.profileBorder} overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl group`}>
                {studentData.profileImage || studentData.selectedAvatar ? (
                  <img 
                    src={studentData.profileImage || studentData.selectedAvatar} 
                    alt={studentData.fullName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                    <User className="h-20 w-20 text-primary-foreground" />
                  </div>
                )}
              </div>
              {studentData.achievementLevel && (
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${t.achievementBadge} text-white px-4 py-1 ${isWholesome ? 'rounded-full' : 'rounded-full'} text-sm font-bold shadow-lg border border-white/20 inline-flex items-center gap-1.5`}><span className="flex items-center">⭐</span> {studentData.achievementLevel}</div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`${t.card} overflow-hidden`}>
              <div className={`h-1 ${t.cardAccent}`}></div>
              <CardHeader>
                <CardTitle className={t.cardTitle}>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${t.textPrimary}`}>Full Name:</span>
                  <span className={t.textPrimary}>{studentData.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${t.textPrimary}`}>School:</span>
                  <span className={t.textPrimary}>{studentData.schoolName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${t.textPrimary}`}>Grade:</span>
                  <span className={t.textPrimary}>{studentData.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${t.textPrimary}`}>Year:</span>
                  <span className={t.textPrimary}>{studentData.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${t.textPrimary}`}>Profile ID:</span>
                  <span className={t.textSecondary}>{studentData.profileId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${t.iconColor}`} />
                  <span className={`font-semibold ${t.textPrimary}`}>Last Updated:</span>
                  <span className={t.textSecondary}>{studentData.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>

            <Card className={`${t.card} overflow-hidden`}>
              <div className={`h-1 ${t.cardAccent}`}></div>
              <CardHeader>
                <CardTitle className={t.cardTitle}>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`leading-relaxed ${t.textSecondary}`}>{studentData.aboutMe}</p>
              </CardContent>
            </Card>
          </div>

          {/* Archetype */}
          <Card className={`${t.card} overflow-hidden`}>
            <div className={`h-1 ${t.cardAccent}`}></div>
            <CardHeader>
              <CardTitle className={`text-2xl ${t.cardTitle}`}>Your Archetype</CardTitle>
              <h3 className={`text-3xl font-bold ${t.iconColor}`}>{studentData.archetype.title}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`leading-relaxed ${t.textSecondary}`}>{studentData.archetype.description}</p>
              <blockquote className={`border-l-4 border-${t.iconColor} ${t.textPrimary} pl-4 italic text-lg`}>
                "{studentData.archetype.quote}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Social Energy Style */}
          <Card className={`${t.card} overflow-hidden`}>
            <div className={`h-1 ${t.cardAccent}`}></div>
            <CardHeader>
              <CardTitle className={`text-xl ${t.cardTitle}`}>Your Social Energy Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className={`text-lg py-2 px-4 ${t.badge}`}>
                  {studentData.socialEnergyStyle.type}
                </Badge>
              </div>
              <p className={t.textSecondary}>{studentData.socialEnergyStyle.description}</p>
            </CardContent>
          </Card>
        </section>

        {/* My Story So Far */}
        {(studentData.personalBio || studentData.coreStrengths?.length > 0 || studentData.passions?.length > 0) && (
          <section className="space-y-6">
            <h2 className={t.sectionTitle}>My Story So Far</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {studentData.personalBio && (
                <Card className={`${t.card} overflow-hidden`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${t.cardTitle}`}>
                      <div className={`w-10 h-10 ${isWholesome ? 'rounded-full bg-amber-200 text-amber-800' : 'rounded-full bg-primary text-primary-foreground'} flex items-center justify-center`}>
                        ✍️
                      </div>
                      Personal Bio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm leading-relaxed ${t.textSecondary}`}>{studentData.personalBio}</p>
                  </CardContent>
                </Card>
              )}

              {studentData.coreStrengths && studentData.coreStrengths.length > 0 && (
                <Card className={`${t.card} overflow-hidden`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${t.cardTitle}`}>
                      <div className={`w-10 h-10 ${isWholesome ? 'rounded-full bg-rose-200 text-rose-800' : 'rounded-full bg-accent text-accent-foreground'} flex items-center justify-center`}>
                        💪
                      </div>
                      Core Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.coreStrengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className={t.badge}>
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {studentData.passions && studentData.passions.length > 0 && (
                <Card className={`${t.card} overflow-hidden`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${t.cardTitle}`}>
                      <div className={`w-10 h-10 ${isWholesome ? 'rounded-full bg-green-200 text-green-800' : 'rounded-full bg-secondary text-secondary-foreground'} flex items-center justify-center`}>
                        ❤️
                      </div>
                      Passions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.passions.map((passion, index) => (
                        <Badge key={index} variant="outline" className={t.badge}>
                          {passion}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* Skills Profile */}
        {studentData.skills && Object.keys(studentData.skills).length > 0 && (
          <section className={t.section}>
            <h2 className={t.sectionTitle}>Skills Profile</h2>

            {/* Skill Circles */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
              {Object.entries(studentData.skills).map(([skill, data]) => (
                <SkillCircle key={skill} skill={skill} percentage={data.overall * 10} color={skillColors[skill] || "#6366F1"} />
              ))}
            </div>

            {/* Detailed Skills Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(studentData.skills).map(([skill, data]) => (
                <Card key={skill} className={`${t.card} overflow-hidden`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${t.cardTitle}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: skillColors[skill] || "#6366F1" }}>
                        <span className="text-white text-xs font-bold">{data.overall}</span>
                      </div>
                      {skill}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(data.subSkills).map(([subSkill, value]) => (
                        <div key={subSkill} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`text-sm ${t.textPrimary}`}>{subSkill}</span>
                            <span className={`text-xs ${t.textSecondary}`}>{value}/10</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500`}
                              style={{
                                width: `${value * 10}%`,
                                backgroundColor: skillColors[skill] || "#6366F1",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projects Showcase */}
        {studentData.projects && studentData.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className={t.sectionTitle}>My Projects Showcase</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>
        )}

        {/* Case Studies */}
        {studentData.caseStudies && studentData.caseStudies.length > 0 && (
          <section className="space-y-6">
            <h2 className={t.sectionTitle}>Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.caseStudies.map((caseStudy, index) => (
                <CaseStudyCard key={index} {...caseStudy} />
              ))}
            </div>
          </section>
        )}


        {/* Beyond the Classroom */}
        {studentData.extracurricular && studentData.extracurricular.length > 0 && (
          <section className="space-y-6">
            <h2 className={t.sectionTitle}>Beyond the Classroom</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.extracurricular.map((activity, index) => (
                <Card key={index} className={`${t.card} overflow-hidden`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  <CardHeader>
                    <CardTitle className={t.cardTitle}>{activity.title}</CardTitle>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="outline" className={t.badge}>{activity.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={t.textSecondary}>{activity.description}</p>
                    <div>
                      <p className={`text-sm font-semibold ${t.textPrimary} mb-2`}>Skills Developed:</p>
                      <p className={`text-sm ${t.textSecondary}`}>{activity.skills}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Potential Career Paths */}
        {studentData.careerPaths && studentData.careerPaths.length > 0 && (
          <section className="space-y-6">
            <h2 className={t.sectionTitle}>Potential Career Paths</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.careerPaths.map((career, index) => (
                <CareerCard key={index} {...career} />
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {studentData.publications && studentData.publications.length > 0 && (
          <section className={t.section}>
            <h2 className={t.sectionTitle}>Publications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {studentData.publications.map((pub, index) => (
                <Card key={index} className={`${t.card} overflow-hidden hover:shadow-xl transition-all duration-300`}>
                  <div className={`h-1 ${t.cardAccent}`}></div>
                  {pub.thumbnail && (
                    <div className="aspect-video overflow-hidden bg-secondary">
                      <img src={pub.thumbnail} alt={pub.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className={t.cardTitle}>{pub.title}</CardTitle>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="secondary" className={t.badge}>{pub.platform}</Badge>
                      <span className={t.textSecondary}>{pub.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${t.iconColor} hover:underline`}
                    >
                      View Publication →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Ratings & Comments */}
        <RatingComment studentId={studentData.fullName || `student-${Date.now()}`} />
      </div>
    </div>
  );
};

export default Portfolio;
