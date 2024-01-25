export interface AstrologyTheme {
  id: string;
  questionExample: string;
  title: string;
  color: string;
}

export const astrologyThemes: AstrologyTheme[] = [
  {
    id: "personal-growth",
    questionExample: "What are my strengths and weaknesses?",
    title: "Personal Growth  🌱",
    color: "green",
  },
  {
    id: "career",
    questionExample: "How can I achieve success in my career?",
    title: "Career  💼",
    color: "teal",
  },
  {
    id: "relationships",
    questionExample: "What are my challenges in relationships?",
    title: "Relationships  💖",
    color: "red",
  },
];
