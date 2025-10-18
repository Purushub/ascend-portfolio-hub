import { StudentProfile } from "@/types/student";

export const sampleStudentData: StudentProfile = {
  fullName: "Erica Cangan",
  schoolName: "Lincoln High School",
  grade: "11th Grade",
  year: "2024-2025",
  profileId: "STU-2024-EC-8472",
  lastUpdated: "October 13, 2025",
  achievementLevel: "Exemplary",
  aboutMe: "A well-crafted profile snapshot establishes your professional presence and helps viewers quickly understand your academic standing and current educational context. I am passionate about technology, creative problem-solving, and making a positive impact in my community.",
  archetype: {
    title: "The Visionary Collaborator",
    description: "Erica Cangan thrives as a dynamic, forward-thinking leader who empowers teams, adapts to change, and navigates complex challenges with confidence, analytical insight, and a spirit of innovation.",
    quote: "Together we imagine, adapt, and achieve what others believe impossible."
  },
  socialEnergyStyle: {
    type: "People-Powered",
    description: "Erica radiates social energy, excelling in lively environments and inspiring those around her to connect, collaborate, and reach new heights together."
  },
  personalBio: "I'm a curious learner who loves tackling complex challenges and creating innovative solutions. Whether I'm coding a new app, leading a community project, or exploring the intersection of art and technology, I bring enthusiasm and dedication to everything I do. My goal is to use my skills to make a meaningful difference in the world.",
  coreStrengths: [
    "Curious Thinker",
    "Team Player",
    "Problem Solver",
    "Creative Innovator",
    "Strategic Planner"
  ],
  passions: [
    "Technology",
    "Digital Art",
    "Environmental Science",
    "Community Service",
    "Public Speaking",
    "Reading"
  ],
  skills: {
    "Adaptability": {
      overall: 88,
      subSkills: {
        "Flexibility": 84,
        "Problem-Solving": 90,
        "Openness to Change": 91
      }
    },
    "Teamwork": {
      overall: 92,
      subSkills: {
        "Collaboration": 100,
        "Communication": 89,
        "Conflict Resolution": 71
      }
    },
    "Confidence": {
      overall: 92,
      subSkills: {
        "Public Speaking": 73,
        "Self-Advocacy": 100,
        "Risk-Taking": 100
      }
    },
    "Creative Thinking": {
      overall: 67,
      subSkills: {
        "Brainstorming": 50,
        "Innovation": 84,
        "Originality": 67
      }
    },
    "Critical Thinking": {
      overall: 100,
      subSkills: {
        "Analysis": 100,
        "Evaluation": 100,
        "Reasoning": 100
      }
    },
    "Decision Making": {
      overall: 100,
      subSkills: {
        "Risk Assessment": 100,
        "Data Analysis": 100,
        "Strategic Planning": 100
      }
    },
    "Emotional Intelligence": {
      overall: 71,
      subSkills: {
        "Empathy": 71,
        "Self-Awareness": 71,
        "Relationship Management": 71
      }
    },
    "Leadership": {
      overall: 83,
      subSkills: {
        "Delegation": 100,
        "Motivation": 67,
        "Strategic Vision": 83
      }
    },
    "Problem Solving": {
      overall: 83,
      subSkills: {
        "Root Cause Analysis": 100,
        "Creative Solutions": 67,
        "Implementation": 83
      }
    },
    "Time Management": {
      overall: 100,
      subSkills: {
        "Prioritization": 100,
        "Scheduling": 100,
        "Goal Achievement": 100
      }
    }
  },
  projects: [
    {
      title: "Science Fair Robot",
      description: "Developed an autonomous robot for a science fair, capable of navigating a custom-built maze and identifying colored objects. This project involved both hardware construction and software programming.",
      skills: "Problem-solving, Prototyping, Critical Thinking",
      tools: "Robotics Kit, Python, Arduino",
      duration: "3 months"
    },
    {
      title: "Interactive Portfolio Website",
      description: "Designed and developed a personal portfolio website from scratch, featuring responsive design, dynamic content loading, and a custom animation sequence. Focused on user experience and visual appeal.",
      skills: "UI/UX Design, Creative Thinking, Problem Solving",
      tools: "HTML, CSS, JavaScript, React, Git",
      duration: "2 months"
    },
    {
      title: "Community Garden Initiative",
      description: "Co-led a community initiative to establish and maintain a sustainable urban garden. Responsibilities included planning garden beds, organizing volunteer workdays, and securing local partnerships for resources.",
      skills: "Project Management, Leadership, Collaboration",
      tools: "Project Management Software, Community Platforms",
      duration: "6 months"
    },
    {
      title: "Productivity Mobile App",
      description: "Created a cross-platform mobile application designed to help students manage tasks and study schedules. The app features reminder notifications, progress tracking, and cloud data synchronization.",
      skills: "Problem Solving, Time Management, Critical Thinking",
      tools: "React Native, Firebase, VS Code",
      duration: "4 months"
    },
    {
      title: "Digital Art Portfolio",
      description: "Created a comprehensive digital art collection using various software tools, showcasing different artistic styles and techniques.",
      skills: "Creative Thinking, Visual Design, Adaptability",
      tools: "Adobe Creative Suite, Procreate, Figma",
      duration: "5 months"
    }
  ],
  caseStudies: [],
  extracurricular: [
    {
      title: "School Event Management",
      description: "Organized and managed the annual school talent show, coordinating with performers, technical crew, and administration.",
      skills: "Event Planning, Leadership, Budget Management, Team Coordination",
      duration: "3 months",
      images: [
        { caption: "Stage Setup", description: "The meticulously arranged stage, complete with dynamic spotlights and essential musical instruments, ready to host the annual school talent show." },
        { caption: "Backstage Preparation", description: "A glimpse backstage reveals students eagerly preparing for their performances, showcasing the anticipation and collaborative spirit of the event." },
        { caption: "Planning & Budget", description: "A detailed event planning timeline and comprehensive budget sheet, illustrating the organized approach to managing resources and schedules for the show." },
        { caption: "Audience Reaction", description: "The enthusiastic audience captured in a moment of heartfelt applause, celebrating the performers and the success of the school talent show." }
      ]
    },
    {
      title: "Environmental Club President",
      description: "Led the school's environmental club, organizing campus cleanups, recycling initiatives, and awareness campaigns about sustainability.",
      skills: "Leadership, Environmental Advocacy, Team Building, Public Speaking",
      duration: "1 year",
      images: [
        { caption: "Campus Cleanup", description: "Students working together during a campus-wide cleanup initiative." },
        { caption: "Recycling Program", description: "Setting up recycling bins and educating students about proper waste sorting." }
      ]
    },
    {
      title: "Debate Team Captain",
      description: "Captained the school debate team to regional championships, mentoring younger members and developing winning strategies.",
      skills: "Critical Thinking, Public Speaking, Research, Mentorship",
      duration: "2 years",
      images: [
        { caption: "Competition Day", description: "Team members preparing arguments before a major debate competition." },
        { caption: "Trophy Ceremony", description: "Celebrating our regional championship victory." }
      ]
    },
    {
      title: "Community Art Workshop",
      description: "Organized free art workshops for local elementary school students, teaching basic drawing and painting techniques.",
      skills: "Teaching, Community Engagement, Creativity, Planning",
      duration: "6 months",
      images: [
        { caption: "Workshop Session", description: "Leading young students through a painting exercise." },
        { caption: "Student Artwork", description: "Display of beautiful artwork created by workshop participants." }
      ]
    }
  ],
  publications: [
    {
      title: "The Impact of Technology on Modern Education",
      date: "September 2024",
      platform: "School Tech Blog",
      link: "#",
      thumbnail: ""
    },
    {
      title: "Building Sustainable Communities Through Youth Engagement",
      date: "August 2024",
      platform: "Community Newsletter",
      link: "#"
    }
  ],
  careerPaths: [
    {
      title: "Innovation Project Manager",
      field: "Design/Engineering",
      whyLoveIt: [
        "Lead cutting-edge projects",
        "Merge creativity with strategy",
        "See tangible impact"
      ],
      dayLooksLike: [
        "Facilitating brainstorming sessions",
        "Managing cross-functional teams",
        "Developing project roadmaps",
        "Presenting progress to stakeholders"
      ],
      keySubjects: [
        "Project Management",
        "Design Thinking",
        "Engineering Principles",
        "Business Strategy"
      ]
    },
    {
      title: "Strategic Communications Director",
      field: "Media/Public Relations",
      whyLoveIt: [
        "Shape public perception",
        "Manage brand reputation",
        "Craft compelling narratives"
      ],
      dayLooksLike: [
        "Developing communication strategies",
        "Drafting press releases",
        "Coordinating media interviews",
        "Advising executives on public speaking"
      ],
      keySubjects: [
        "Communications",
        "Public Relations",
        "Marketing",
        "Crisis Management"
      ]
    },
    {
      title: "Organizational Psychologist",
      field: "Business Consulting",
      whyLoveIt: [
        "Improve workplace dynamics",
        "Solve complex human capital challenges",
        "Drive organizational effectiveness"
      ],
      dayLooksLike: [
        "Conducting employee surveys",
        "Designing training programs",
        "Consulting with leadership on talent management",
        "Analyzing team performance data"
      ],
      keySubjects: [
        "Psychology",
        "Human Resources",
        "Data Analysis",
        "Organizational Development"
      ]
    },
    {
      title: "Product Design Lead",
      field: "Design/Engineering",
      whyLoveIt: [
        "Create intuitive and impactful products",
        "Guide design vision",
        "Foster a user-centric approach"
      ],
      dayLooksLike: [
        "Overseeing UX/UI research",
        "Leading design sprints",
        "Mentoring junior designers",
        "Collaborating with engineering and product teams"
      ],
      keySubjects: [
        "UX/UI Design",
        "Industrial Design",
        "Human-Computer Interaction",
        "User Research"
      ]
    }
  ]
};
