import BoehringerIngelheimImage from "@/public/images/projects/bi/Bi-01.png";
import BoehringerIngelheimImage2 from "@/public/images/projects/bi/BI-02.png";
import BoehringerIngelheimImage3 from "@/public/images/projects/bi/Bi-03.png";
import MinistryOfCultureSaudiArabiaImage from "@/public/images/projects/ksa/01.jpg";
import MinistryOfCultureSaudiArabiaImage2 from "@/public/images/projects/ksa/02.jpg";
import MinistryOfCultureSaudiArabiaImage3 from "@/public/images/projects/ksa/03.jpg";

export interface CaseStudyMedia {
  src: string;
  type?: "image" | "video";
  label?: string;
  description?: string;
}

export interface CaseStudyDetail {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  serviceFilter: "Custom Experiences" | "Artificial Intelligence" | "Architectural Visualization";
  color: string;
  cardImage: string;
  category: string;
  year: string;
  heroImage: string;
  overview: string;
  challenge: string[];
  client: string;
  services: string[];
  location: string;
  media: CaseStudyMedia[];
  link?: string;
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "boehringer-ingelheim": {
    slug: "boehringer-ingelheim",
    title: "Touch Screen Interactive Content",
    subtitle: "Interactive Presentation for Web and PC",
    tag: "Touch Screen Interactive Content",
    serviceFilter: "Custom Experiences",
    color: "text-green-400",
    cardImage: BoehringerIngelheimImage3.src,
    category: "Interactive Content",
    year: "2024",
    heroImage: BoehringerIngelheimImage2.src,
    overview: "Boehringer Ingelheim | Interactive Presentation for Web and PC",
    challenge: [
      "Designing an interactive platform that effectively communicates complex pharmaceutical information to diverse stakeholders",
      "Developed a user-friendly interface using React and Electron, incorporating motion design principles to enhance engagement and information retention",
      "The platform received positive feedback for its intuitive navigation and dynamic content presentation, improving user interaction and knowledge dissemination",
    ],
    client: "Boehringer Ingelheim",
    services: [
      "Interactive Content",
      "Touch Screen Interactive Content",
      "Web Development & Integration",
    ],
    location: "Dubai, UAE",
    link: "https://boehringeringelheim-interactive.netlify.app/",
    media: [
      {
        src: BoehringerIngelheimImage2.src,
        label: "Sequence",
        description: "Primary cinematic frame",
      },
      {
        src: BoehringerIngelheimImage.src,
        label: "Concept",
        description: "Material and surface studies",
      },
      {
        src: BoehringerIngelheimImage3.src,
        label: "FX Pass",
        description: "Lighting and FX detail",
      },
    ],
  },
  "ministry-of-culture-saudi-arabia": {
    slug: "ministry-of-culture-saudi-arabia",
    title: "Ministry of Culture Saudi Arabia",
    subtitle: "UI/UX Design & Development",
    tag: "UI/UX Design & Development",
    serviceFilter: "Custom Experiences",
    color: "text-blue-400",
    cardImage: MinistryOfCultureSaudiArabiaImage.src,
    category: "Interactive Content",
    year: "2024",
    heroImage: MinistryOfCultureSaudiArabiaImage2.src,
    overview:
      "Orchestrated the UI/UX architecture for the Ministry of Culture Saudi Arabia, bridging historical preservation with digital innovation and improving public access under Vision 2030.",
    challenge: [
      "Designing an information-rich platform that balances cultural depth with clear and intuitive user journeys.",
      "Building a scalable design system and strong information hierarchy to simplify complex navigation for diverse audience groups.",
      "Delivering a premium, frictionless digital experience with consistent interaction patterns and high performance.",
    ],
    client: "Ministry of Culture Saudi Arabia",
    services: [
      "UI/UX Architecture",
      "Information Architecture",
      "Design System Development",
      "Digital Experience Strategy",
    ],
    location: "Riyadh, Saudi Arabia",
    link: "",
    media: [
      {
        src: "/images/projects/ksa/Ministry Of Culture Saudi.mp4",
        label: "Video",
        description: "Video content for the project",
      },
      {
        src: MinistryOfCultureSaudiArabiaImage2.src,
        label: "Platform Overview",
        description: "Primary interface direction and experience structure",
      },
      {
        src: MinistryOfCultureSaudiArabiaImage.src,
        label: "Navigation System",
        description: "Information hierarchy and cross-section wayfinding",
      },
      {
        src: MinistryOfCultureSaudiArabiaImage3.src,
        label: "Design Language",
        description: "Scalable visual system for consistency and growth",
      },
     
    ],
  },
};
