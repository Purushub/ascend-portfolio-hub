export interface StudentProfile {
  fullName: string;
  schoolName: string;
  grade: string;
  year: string;
  profileId: string;
  lastUpdated: string;
  aboutMe: string;
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
    duration: string;
    images?: string[];
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
    images?: Array<{
      caption: string;
      description: string;
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
