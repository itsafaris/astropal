export interface AstrologyTheme {
  id: string;
  title: string;
  color: string;
}

export const astrologyThemes = {
  relationships: {
    id: "relationships",
    title: "Relationships",
    color: "red",
  },
  career: {
    id: "career",
    title: "Career",
    color: "yellow",
  },
  selfGrowth: {
    id: "self-growth",
    title: "Personal Growth",
    color: "green",
  },
  wellBeing: {
    id: "well-being",
    title: "Well-Being",
    color: "red",
  },
} satisfies Record<string, AstrologyTheme>;

export function getThemeByID(id: string): AstrologyTheme | undefined {
  return Object.values(astrologyThemes).find((v) => v.id === id);
}
