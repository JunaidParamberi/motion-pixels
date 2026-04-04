import BoehringerIngelheimImage from "@/public/images/projects/bi/Bi-01.png";
import BoehringerIngelheimImage2 from "@/public/images/projects/bi/BI-02.png";
import BoehringerIngelheimImage3 from "@/public/images/projects/bi/Bi-03.png";
import MinistryOfCultureSaudiArabiaImage from "@/public/images/projects/ksa/01.jpg";
import MinistryOfCultureSaudiArabiaImage2 from "@/public/images/projects/ksa/02.jpg";
import MinistryOfCultureSaudiArabiaImage3 from "@/public/images/projects/ksa/03.jpg";
import CielTowerImage1 from "@/public/images/projects/ciel/ciel-1.png";
import CielTowerImage2 from "@/public/images/projects/ciel/ciel-2.png";
import AtTheTopFloorLEDImage1 from "@/public/images/projects/at-the-top/at-the-top-1.png";
import RabatStadiumImage1 from "@/public/images/projects/rabat-stadium/rabat-1.jpg";

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
  "ciel-tower": {
    slug: "ciel-tower",
    title: "Ciel Tower",
    subtitle: "Interactive Content",
    tag: "Interactive Content",
    serviceFilter: "Custom Experiences",
    color: "text-purple-300",
    cardImage: CielTowerImage2.src,
    category: "Interactive Content",
    year: "2025",
    heroImage: CielTowerImage1.src,
    overview:
      "Ciel Tower is an immersive interactive content project built for a premium hospitality environment. The experience combines elegant architectural visuals with dynamic media moments designed for high-impact guest engagement.",
    challenge: [
      "Create interactive visuals that feel premium and cohesive with the interior design language of the venue.",
      "Balance artistic media storytelling with practical integration requirements, including display positioning and real-world viewing conditions.",
      "Deliver a polished on-site experience with smooth playback, strong visual contrast, and memorable first impressions.",
    ],
    client: "First Group",
    services: [
      "Interactive Content Design",
      "Media Experience Direction",
      "On-Site Media Integration",
    ],
    location: "Dubai, UAE",
    link: "",
    media: [
      {
        src: "/images/projects/ciel/ciel-landscape.mp4",
        type: "video",
        label: "Video Sequence",
        description: "Cinematic landscape animation pass",
      },
      {
        src: CielTowerImage1.src,
        label: "Hero Frame",
        description: "Main tower composition and atmospheric mood",
      },
      {
        src: CielTowerImage2.src,
        label: "Environment Integration",
        description: "Interactive wall content integrated in interior space",
      },
    ],
  },
  "at-the-top-floor-led": {
    slug: "at-the-top-floor-led",
    title: "AT The Top Floor LED",
    subtitle: "Interactive Content",
    tag: "Interactive Content",
    serviceFilter: "Custom Experiences",
    color: "text-purple-300",
    cardImage: AtTheTopFloorLEDImage1.src,
    category: "Interactive Content",
    year: "2025",
    heroImage: AtTheTopFloorLEDImage1.src,
    overview:
      "AT The Top Floor LED is an immersive digital installation experience designed for a premium hospitality environment, blending architectural ambiance with dynamic interactive visuals.",
    challenge: [
      "Create a large-scale LED visual experience that feels integrated with the space while maintaining high visual clarity.",
      "Design content with strong contrast and motion rhythm so it remains impactful from multiple viewing distances and angles.",
      "Deliver a polished final output optimized for real-world playback performance and venue conditions.",
    ],
    client: "EMMAR",
    services: [
      "Interactive Content",
      "LED Content Design",
      "On-Site Media Integration",
    ],
    location: "Dubai, UAE",
    link: "",
    media: [
      {
        src: AtTheTopFloorLEDImage1.src,
        label: "Feature Frame",
        description: "Primary view of the floor LED installation",
      },
    ],
  },
  "rabat-stadium": {
    slug: "rabat-stadium",
    title: "Rabat Stadium",
    subtitle: "Architectural Lighting Visualization",
    tag: "Architectural Visualization",
    serviceFilter: "Architectural Visualization",
    color: "text-cyan-300",
    cardImage: RabatStadiumImage1.src,
    category: "Architectural Lighting",
    year: "2025",
    heroImage: RabatStadiumImage1.src,
    overview:
      "Rabat Stadium is a facade lighting visualization project that explores dynamic digital storytelling across large-scale architectural geometry.",
    challenge: [
      "Translate visual narratives onto a complex curved facade while preserving clarity and impact from long viewing distances.",
      "Balance artistic animation with realistic architectural context so the concept remains both expressive and technically believable.",
      "Deliver high-fidelity visual outputs suitable for presentation, stakeholder review, and design decision-making.",
    ],
    client: "Spectacle Design LLC",
    services: [
      "Architectural Visualization",
      "Facade Lighting Concepts",
      "Media Content Direction",
    ],
    location: "Rabat, Morocco",
    link: "",
    media: [
      {
        src: RabatStadiumImage1.src,
        label: "Hero Frame",
        description: "Wide night facade view",
      },
      {
        src: "/images/projects/rabat-stadium/rabat-2.png",
        label: "Close View",
        description: "Facade detail and animation intensity",
      },
      {
        src: "/images/projects/rabat-stadium/rabat-1.mp4",
        type: "video",
        label: "Video 01",
        description: "Facade motion sequence",
      },
      {
        src: "/images/projects/rabat-stadium/rabat-2.mp4",
        type: "video",
        label: "Video 02",
        description: "Architectural lighting pass",
      },
      {
        src: "/images/projects/rabat-stadium/rabat-3.mp4",
        type: "video",
        label: "Video 03",
        description: "Performance variant",
      },
    ],
  },
};
