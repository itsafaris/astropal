import { StaticImage } from "gatsby-plugin-image";

export const astrologers = [
  {
    id: "celestia",
    name: "Celestia",
    imgComponent: (
      <StaticImage
        alt="AI astrologer avatar"
        src="../images/avatars/avatar-1.jpg"
        style={{ borderRadius: "100%" }}
      />
    ),
  },
  {
    id: "luna",
    name: "Luna",
    imgComponent: (
      <StaticImage
        alt="AI astrologer avatar"
        src="../images/avatars/avatar-2.jpg"
        style={{ borderRadius: "100%" }}
      />
    ),
  },
  {
    id: "sophia",
    name: "Sophia",
    imgComponent: (
      <StaticImage
        alt="AI astrologer avatar"
        src="../images/avatars/avatar-3.jpg"
        style={{ borderRadius: "100%" }}
      />
    ),
  },
  {
    id: "orion",
    name: "Orion",
    imgComponent: (
      <StaticImage
        alt="AI astrologer avatar"
        src="../images/avatars/avatar-4.jpg"
        style={{ borderRadius: "100%" }}
      />
    ),
  },
];

export type AstrologerID = (typeof astrologers)[number]["id"];

export function getAstrologerOrDefault(id: AstrologerID) {
  return astrologers.find((it) => it.id === id) ?? astrologers[0];
}
