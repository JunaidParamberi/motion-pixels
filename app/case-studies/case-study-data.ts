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

/** Default SVGs under `public/images/projects/_defaults/` — swap for real files in `public/images/projects/<slug>/`. */
export const PROJECT_PLACEHOLDER_IMAGES = {
  card: "/images/projects/_defaults/card.svg",
  hero: "/images/projects/_defaults/hero.svg",
  gallery01: "/images/projects/_defaults/gallery-01.svg",
  gallery02: "/images/projects/_defaults/gallery-02.svg",
} as const;

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

export const disabledCaseStudySlugs = ["ciel-tower", "draft-project"] as const;

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  /** Template: disabled until copy + `/public/images/projects/<slug>/` assets are ready. */
  "draft-project": {
    slug: "draft-project",
    title: "New Project",
    subtitle: "Placeholder — replace title, copy, and media paths when assets are ready.",
    tag: "Custom Experiences",
    serviceFilter: "Custom Experiences",
    color: "text-white/50",
    cardImage: PROJECT_PLACEHOLDER_IMAGES.card,
    category: "Studio",
    year: "2026",
    heroImage: PROJECT_PLACEHOLDER_IMAGES.hero,
    overview:
      "This is a scaffold case study entry using shared placeholder images. Duplicate the object, rename the slug, point cardImage, heroImage, and media to your project folder, then remove the slug from disabledCaseStudySlugs.",
    challenge: [
      "Replace this overview and challenge copy with the real project narrative.",
      "Add final stills and video under public/images/projects/your-slug/ and update paths in this file.",
      "Remove draft-project from disabledCaseStudySlugs when the work should appear on the Case Studies page.",
    ],
    client: "TBD",
    services: ["Creative Direction", "Motion Design", "Production"],
    location: "TBD",
    link: "",
    media: [
      {
        src: PROJECT_PLACEHOLDER_IMAGES.hero,
        label: "Hero placeholder",
        description: "Swap for hero still or poster frame.",
      },
      {
        src: PROJECT_PLACEHOLDER_IMAGES.gallery01,
        label: "Gallery 01",
        description: "Additional project frame or UI capture.",
      },
      {
        src: PROJECT_PLACEHOLDER_IMAGES.gallery02,
        label: "Gallery 02",
        description: "Optional second still — add more media objects as needed.",
      },
    ],
  },
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
  "burj-at-the-top": {
    slug: "burj-at-the-top",
    title: "Burj AT The Top",
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
  "reem-mall-projection": {
    slug: "reem-mall-projection",
    title: "Reem Mall Projection",
    subtitle: "Immersive projection in a sculpted jungle environment",
    tag: "Immersive Projection",
    serviceFilter: "Custom Experiences",
    color: "text-emerald-400",
    cardImage: "/images/projects/reem-mall-projection/card.png",
    category: "Immersive Installation",
    year: "2025",
    heroImage: "/images/projects/reem-mall-projection/hero-installation.png",
    overview:
      "A wide-format projection experience for Reem Mall, developed with BE Creative: jungle-themed digital content aligned with scenic wall treatments so the screen reads as part of the environment, not a bolted-on display.",
    challenge: [
      "Match projection color, contrast, and composition to printed mural geometry so the cut line between physical paint and live pixels disappears at key viewing angles.",
      "Author hero content (jungle vista, hero creature, waterfalls, mist) at a resolution and aspect that stays legible on a large surface while respecting venue playback limits.",
      "Coordinate on-site sightlines, ceiling lighting, and audience flow so the installation photographs cleanly and feels balanced in the finished retail space.",
    ],
    client: "BE Creative",
    services: [
      "Immersive Projection",
      "Environmental Integration",
      "Content Art Direction",
      "On-Site Technical Support",
    ],
    location: "Abu Dhabi, UAE",
    link: "",
    media: [
      {
        src: "/images/projects/reem-mall-projection/hero-installation.png",
        label: "Installation view",
        description:
          "On-site environment: wide projection surface set into a jungle mural room with controlled ceiling lighting and human scale for context.",
      },
      {
        src: "/images/projects/reem-mall-projection/artwork-detail.png",
        label: "Digital artwork",
        description:
          "Hero projection frame: lush jungle landscape with central elephant, waterfalls, mist, and flowering trees — replace this file with your final isolated artwork asset when ready.",
      },
    ],
  },
  "beeah-hq": {
    slug: "beeah-hq",
    title: "BEE'AH HQ",
    subtitle: "Façade LED lighting & media content — plan view from above",
    tag: "Façade LED",
    serviceFilter: "Architectural Visualization",
    color: "text-red-400",
    cardImage: "/images/projects/beeah-hq/card.png",
    category: "Façade Lighting & LED Media",
    year: "2020",
    heroImage: "/images/projects/beeah-hq/hero.png",
    overview:
      "Façade LED and playback content for BEE'AH HQ: media aligned to the building skin, developed for how the installation reads from a top-down / aerial viewpoint as well as oblique street views. Credits: designed and executed while working with 3S Lighting Solutions.",
    challenge: [
      "Author LED content that respects the façade grid, mullion rhythm, and pixel pitch so graphics stay sharp when seen from above and at distance.",
      "Keep UAE-inspired graphic language legible on emissive LED without clipping highlights or crushing shadow detail across dusk-to-night scenarios.",
      "Match stills and artboards to the real control system and content pipeline so what is shown in plan view matches what runs on-site.",
    ],
    client: "BEE'AH",
    services: [
      "Façade LED Content",
      "LED Media Production",
      "Architectural Lighting Visualization",
      "On-Site Playback Support",
    ],
    location: "Sharjah, UAE",
    link: "",
    media: [
      {
        src: "/images/projects/beeah-hq/artboard-01.png",
        label: "Plan view — artboard",
        description:
          "Project board showing context from above: how façade LED and content read in top-down composition, with graphic studies tied to the lit envelope.",
      },
      {
        src: "/images/projects/beeah-hq/artboard-02.png",
        label: "LED content direction",
        description:
          "Additional frame for façade LED sequences or stills from the same top-down vantage — replace when you have the next export.",
      },
    ],
  },
  "difc-gate": {
    slug: "difc-gate",
    title: "DIFC GATE",
    subtitle: "Projection mapping design for The Gate, DIFC",
    tag: "Projection Mapping",
    serviceFilter: "Custom Experiences",
    color: "text-sky-400",
    cardImage: "/images/projects/difc-gate/card.png",
    category: "Projection Mapping",
    year: "2023",
    heroImage: "/images/projects/difc-gate/hero.png",
    overview:
      "Night-time projection mapping for Dubai International Financial Centre’s iconic Gate: ornamental, geometric content mapped to the arch and façade in blues, yellows, and whites, tuned for how the building reads from the plaza and surrounding streets. Credits: designed and executed while working with 3S Lighting Solutions.",
    challenge: [
      "Warp content to the Gate’s double-curvature and deep arch so motifs stay aligned to stone joints and setbacks without drifting over multi-minute loops.",
      "Balance saturated projection with ambient street lighting and the bright plaza lamp so highlights don’t bloom and mid-tones survive in camera and in person.",
      "Deliver a repeatable content package that matches the playback stack used on-site, including safe zones for architectural reveals and sponsor lockups.",
    ],
    client: "DIFC",
    services: [
      "Projection Mapping Design",
      "Façade Content Production",
      "UV / 3D Mapping Preparation",
      "On-Site Calibration Support",
    ],
    location: "Dubai, UAE",
    link: "",
    media: [
      {
        src: "/images/projects/difc-gate/facade-night-01.png",
        label: "Night façade — full read",
        description:
          "Hero view: The Gate at night with mapped ornament, circular and diamond motifs, and the arch fully activated against the city backdrop.",
      },
      {
        src: "/images/projects/difc-gate/facade-night-02.png",
        label: "Projection design detail",
        description:
          "Placeholder for a tighter crop, alternate look, or timelapse still — replace `facade-night-02.png` when you have the next asset.",
      },
    ],
  },
  "sabic-hq": {
    slug: "sabic-hq",
    title: "SABIC HQ",
    subtitle: "Media façade lighting & LED content for corporate HQ",
    tag: "Media Façade",
    serviceFilter: "Architectural Visualization",
    color: "text-blue-500",
    cardImage: PROJECT_PLACEHOLDER_IMAGES.card,
    category: "Media Façade & LED",
    year: "2024",
    heroImage: PROJECT_PLACEHOLDER_IMAGES.hero,
    overview:
      "Media façade and architectural LED storytelling for SABIC headquarters: content authored for the building envelope—brand moments, abstract motion, and data-quiet sequences that read clearly on a large-scale emissive skin by day and night.",
    challenge: [
      "Map media to the façade’s module grid and glass rhythm so typography and logo lockups stay sharp at oblique angles and long viewing distances.",
      "Maintain corporate palette and luminance caps so LED peaks stay within spec while still delivering impact against sky and landscape context.",
      "Align playback layers with facility operations: scheduling, dimming curves, and emergency override so creative content never fights building systems.",
    ],
    client: "SABIC",
    services: [
      "Media Façade Content",
      "LED Façade Art Direction",
      "Architectural Lighting Media",
      "Technical Playback Documentation",
    ],
    location: "Riyadh, Saudi Arabia",
    link: "",
    media: [
      {
        src: PROJECT_PLACEHOLDER_IMAGES.gallery01,
        label: "Façade media — placeholder",
        description:
          "Drop a hero still or render into `public/images/projects/sabic-hq/` and point this `src` to `/images/projects/sabic-hq/facade-01.jpg` (or .png).",
      },
      {
        src: PROJECT_PLACEHOLDER_IMAGES.gallery02,
        label: "Night / detail — placeholder",
        description:
          "Second frame for alternate lighting state or close crop on LED modules — replace with `facade-02` when ready.",
      },
    ],
  },
};
