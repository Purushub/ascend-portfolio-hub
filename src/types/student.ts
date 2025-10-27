export type ThemeType = "minimal" | "creative" | "modern" | "wholesome";

export interface StudentProfile {
  fullName: string;
  schoolName: string;
  grade: string;
  year: string;
  profileId: string;
  lastUpdated: string;
  aboutMe: string;
  profileImage?: string;
  selectedAvatar?: string;
  theme?: ThemeType;
  achievementLevel?: "Scholar" | "Valedictorian" | "Brilliant" | "Diligent" | "Exemplary" | "Focused" | "Motivated" | "Disciplined" | "Curious" | "Proactive";
  archetype: {
    title: string;
    description: string;
    quote: string;
  };
  socialEnergyStyle: {
    type: string;
    description: string;
  };
  personalBio: string;
  coreStrengths: string[];
  passions: string[];
  skills: {
    [key: string]: {
      overall: number;
      subSkills: { [key: string]: number };
    };
  };
  projects: Array<{
    title: string;
    description: string;
    skills: string;
    tools: string;
    duration: string;
    link?: string;
    achievement?: string;
    images?: string[];
    imageDescriptions?: string[];
  }>;
  caseStudies: Array<{
    title: string;
    description: string;
    skills: string;
    duration: string;
    steps: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  }>;
  extracurricular: Array<{
    title: string;
    description: string;
    skills: string;
    duration: string;
    highlights?: Array<{
      title: string;
      description: string;
      image?: string;
    }>;
  }>;
  publications?: Array<{
    title: string;
    date: string;
    platform: string;
    link: string;
    thumbnail?: string;
  }>;
  careerPaths: Array<{
    title: string;
    field: string;
    whyLoveIt: string[];
    dayLooksLike: string[];
    keySubjects: string[];
  }>;
}
