import { StudentProfile } from "@/types/student";

export const generateCSVTemplate = (): string => {
  const headers = [
    "fullName",
    "email",
    "linkedinUrl",
    "schoolName",
    "grade",
    "year",
    "aboutMe",
    "achievementLevel",
    "personalBio",
    "coreStrengths",
    "passions"
  ];

  const sampleRows = [
    [
      "John Smith",
      "john.smith@email.com",
      "https://linkedin.com/in/johnsmith",
      "Lincoln High School",
      "11th",
      "2024-2025",
      "Passionate about technology and innovation",
      "Scholar",
      "I'm a tech enthusiast who loves building projects that make a difference",
      "Problem Solving|Creative Thinking|Leadership",
      "Coding|Robotics|AI"
    ],
    [
      "Sarah Johnson",
      "sarah.johnson@email.com",
      "https://linkedin.com/in/sarahjohnson",
      "Washington Academy",
      "12th",
      "2024-2025",
      "Aspiring environmental scientist and activist",
      "Valedictorian",
      "I'm passionate about sustainability and creating a better future for our planet",
      "Research|Public Speaking|Data Analysis",
      "Environmental Science|Climate Action|Community Service"
    ]
  ];

  const csvContent = [
    headers.join(","),
    ...sampleRows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  return csvContent;
};

export const downloadCSVTemplate = () => {
  const csvContent = generateCSVTemplate();
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", "student_portfolio_template.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSV = (csvText: string): Partial<StudentProfile>[] => {
  const lines = csvText.split("\n").filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
  const students: Partial<StudentProfile>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let char of lines[i]) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const student: any = {
      profileId: `profile-${Date.now()}-${i}`,
      lastUpdated: new Date().toISOString(),
      archetype: {
        title: "The Innovator",
        description: "A creative problem-solver who thinks outside the box",
        quote: "Innovation distinguishes between a leader and a follower"
      },
      socialEnergyStyle: {
        type: "Ambivert",
        description: "Balanced between social interaction and solitary work"
      },
      skills: {},
      projects: [],
      caseStudies: [],
      extracurricular: [],
      careerPaths: []
    };

    headers.forEach((header, index) => {
      const value = values[index]?.replace(/"/g, "") || "";
      
      switch (header) {
        case "coreStrengths":
        case "passions":
          student[header] = value.split("|").filter(v => v.trim());
          break;
        default:
          student[header] = value;
      }
    });

    students.push(student);
  }

  return students;
};
