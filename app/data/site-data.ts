import MashreqHQ from "@/public/images/projects/mashreq/Asset 1.png";
import DIFCGate from "@/public/images/projects/DIFC/Asset-2.png";
import BeeahHQ from "@/public/images/projects/beeah/Beeah-gallery-2-min.jpg";
import ADNOCHQImage from "@/public/images/projects/adnoc/image-1.png";


/**
 * Centralized site data for Motion Pixels.
 * Content from all pages and the three main service screens (Experience, AI, Architectural).
 */

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicePageData {
  brandLabel: string;
  title: string;
  aboutParagraph: string;
  items: ServiceItem[];
}

export interface ServiceListingItem {
  image: string; // path or import key; pages resolve to actual import
  title: string;
  alt: string;
  link: string;
  subText: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface AboutData {
  title: string;
  introParagraphs: string[];
  quote: string;
  quoteLine1: string;
  quoteLine2: string;
  processParagraph: string;
}

export interface ContactData {
  title: string;
  intro: string;
  phone: string;
  email: string;
  location: string;
  formPlaceholders: {
    name: string;
    email: string;
    message: string;
  };
  submitButton: string;
  submittingButton: string;
  successMessage: string;
  errorMessage: string;
}

export interface CaseStudySummary {
  slug: string;
  title: string;
  tag: string;
  color: string;
  img: string;
}

export interface CaseStudyDetail {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  heroImage: string;
  overview: string;
  challenge: string[];
  client: string;
  services: string[];
  location: string;
  tunnelImage: string;
  textureImage: string;
  lightingImage: string;
  landscapeImage: string;
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { name: "About", href: "/about-us" },
  { name: "What We Do", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

// ─── Services listing (What We Do page) ────────────────────────────────────

export const servicesListing: Omit<ServiceListingItem, "image">[] = [
  {
    title: "Custom Experiences",
    alt: "Experience",
    link: "/services/experience",
    subText:
      "Immersive AR/VR/MR worlds, interactive content, and projection mapping for unforgettable moments.",
  },
  {
    title: "Artificial Intelligence",
    alt: "AI",
    link: "/services/artificial-intelligence",
    subText:
      "AI-driven content pipelines for commercials, episodic storytelling, and adaptive media.",
  },
  {
    title: "Architectural Visualization",
    alt: "Architectural",
    link: "/services/architectural",
    subText:
      "High-fidelity visualizations, dynamic lighting, and immersive light art for spatial storytelling.",
  },
];

// ─── Experience (screen 1) ───────────────────────────────────────────────────

export const experienceData: ServicePageData = {
  brandLabel: "Motion Pixels",
  title: "Experience",
  aboutParagraph:
    "At Motion Pixel, our Experience service brings imagination to life by blending technology with storytelling. We specialize in creating immersive, interactive, and emotionally resonant environments using cutting-edge tools and techniques. Whether it's through Augmented Reality (AR), Virtual Reality (VR), or Mixed Reality (MR), we craft unforgettable digital experiences that engage audiences in powerful new ways.",
  items: [
    {
      title:
        "Augmented Reality (AR), Virtual Reality (VR), and Mixed Reality (MR)",
      description:
        "We build custom immersive worlds that enhance real-world environments or transport users into fully virtual spaces, ideal for exhibitions, events, marketing, and training.",
    },
    {
      title: "Interactive Contents",
      description:
        "From responsive installations to touchscreen interfaces, we design content that reacts to user input, offering dynamic engagement and personalization.",
    },
    {
      title: "AI Integration",
      description:
        "Leveraging machine learning and artificial intelligence, we enhance content adaptability and interaction, enabling smarter and more intuitive experiences.",
    },
    {
      title: "3D Projection & Space Mapping",
      description:
        "We transform physical spaces with high-precision 3D projection, including projection studies and spatial analysis to create visually stunning environments.",
    },
    {
      title: "Projection Content Mapping",
      description:
        "We design and synchronize content to perfectly fit irregular surfaces and 3D structures, turning any object into a storytelling canvas.",
    },
    {
      title: "3D & 2D Content Creation",
      description:
        "Our team develops vibrant, high-quality animations and visual assets, including both 2D and 3D formats, tailored for immersive displays and digital platforms.",
    },
    {
      title: "Animations",
      description:
        "We bring ideas to motion, whether for product visualization, storytelling, or interactive experiences.",
    },
  ],
};

// ─── Artificial Intelligence (screen 2) ─────────────────────────────────────

export const artificialIntelligenceData: ServicePageData = {
  brandLabel: "Motion Pixels",
  title: "Artificial Intelligence",
  aboutParagraph:
    "From subtle enhancements to large-scale CGI environments, we combine advanced AI tools with creative artistry to help filmmakers and studios craft seamless, photorealistic visuals. Whether it's AI-assisted world-building, intelligent creature animation, or complex dynamic simulations, we transform imagination into cinematic reality—frame by frame.",
  items: [
    {
      title: "AI Commercials",
      description:
        "We create powerful AI-driven commercials, promos, and brand campaigns. By leveraging generative tools within a proven creative pipeline, we produce cinematic-quality ads that allow budgets to stretch further while maintaining the high visual standards of a full-scale production.",
    },
    {
      title: "Film & Episodic",
      description:
        "We integrate AI-driven tools across film and episodic pipelines to accelerate previs, story development, scene generation, and post-production. From AI-assisted environments to automated character animation and intelligent editing workflows, we help creators build richer worlds faster and with greater creative freedom.",
    },
    {
      title: "AI Customized Solution",
      description:
        "Using advanced machine learning and artificial intelligence, we enhance content adaptability and interaction, enabling smarter, more intuitive, and personalized digital experiences.",
    },
    {
      title: "AI Enhanced Creative",
      description:
        "We transform physical spaces with high-precision 3D projection and immersive visual engineering. This includes projection studies, spatial analysis, and real-time generative visuals to create breathtaking environments that captivate audiences.",
    },
  ],
};

// ─── Architectural (screen 3) ───────────────────────────────────────────────

export const architecturalData: ServicePageData = {
  brandLabel: "Motion Pixels",
  title: "Architectural",
  aboutParagraph:
    "From subtle enhancements to complex CGI environments, we collaborate closely with filmmakers and studios to craft seamless, photorealistic visual effects for feature films, series, and streaming content. Whether it's world-building, creature animation, or dynamic simulations, we turn imagination into reality—frame by frame.",
  items: [
    {
      title: "Architectural Visualization",
      description:
        "We produce high-fidelity 3D renderings and animations that bring unbuilt environments to life—helping clients visualize their projects with clarity and emotional impact.",
    },
    {
      title: "Dynamic Artificial Lighting — Concepts",
      description:
        "We design lighting experiences that respond to space, movement, and mood. Using simulation and creative lighting design, we craft atmospheres that evoke emotion and enhance architectural intent.",
    },
    {
      title: "Light Strategy & Branding — Content",
      description:
        "Light is a powerful branding tool. We develop strategic lighting content that aligns with brand identity and spatial goals, creating immersive environments that communicate and captivate.",
    },
    {
      title: "Artist Collaboration",
      description:
        "We partner with artists across disciplines to integrate visual storytelling, sculpture, and digital media into architectural spaces—pushing creative boundaries through shared vision.",
    },
    {
      title: "Light Art and Media — Content",
      description:
        "We design and produce bespoke light-based artworks and media installations that redefine spatial experiences through movement, color, and interaction.",
    },
    {
      title: "Research and Development",
      description:
        "Innovation is rooted in insight. Our team conducts ongoing research into materials, technologies, and lighting behavior to inform our designs and stay ahead of industry trends.",
    },
  ],
};

// ─── About Us ───────────────────────────────────────────────────────────────

export const aboutData: AboutData = {
  title: "About Us",
  introParagraphs: [
    "Motion Pixels is a full-service creative content studio. A community of creative pioneers who strive to push creative and technical boundaries. Empowered by our heritage, we are focused on building the legacy for the future of Motion Pixels.",
    "Whether it is our clients, our fellow artists, or anyone who makes delivering world-class work possible, our exceptional multimedia installation mission and values are the touchstones for who we are, how we perform and the content we create.",
  ],
  quote:
    "We orchestrate pixels for unconventional and exceptional multimedia installation",
  quoteLine1: "We orchestrate pixels for unconventional and",
  quoteLine2: "exceptional multimedia installation",
  processParagraph:
    "We collaborate closely with your team, taking the time to understand your needs and aspirations. Guiding you through the vast possibilities of multimedia and technology, we help define your project requirements, develop a unique concept, and turn it into reality. From the initial briefing, our team is fully engaged, leading the concept development, media design, and production phases while seamlessly integrating media and technology. With client review checkpoints at every stage, we ensure your team remains involved and your vision is realized. Our commitment doesn't end with the launch. We provide ongoing support, including control system operation services and continuous assistance to maintain and enhance your media content.",
};

// ─── Contact ───────────────────────────────────────────────────────────────

export const contactData: ContactData = {
  title: "Get in Touch",
  intro:
    "We're here to help you bring your ideas to life. Let's start a conversation and explore how we can work together.",
  phone: "+971 55 673 8278",
  email: "akhil@motionpixels.me",
  location: "Al Qusais, Dubai - UAE",
  formPlaceholders: {
    name: "Your Name",
    email: "Your Email",
    message: "Your Message",
  },
  submitButton: "Send Message",
  submittingButton: "Sending...",
  successMessage: "Message sent successfully!",
  errorMessage: "Failed to send message. Please try again.",
};

// ─── Case Studies ──────────────────────────────────────────────────────────

export const caseStudySummaries: CaseStudySummary[] = [
  {
    slug: "mashreq-hq",
    title: "Mashreq HQ",
    tag: "Visual Effects",
    color: "text-blue-400",
    img: MashreqHQ.src,
  },
  {
    slug: "beeah-hq",
    title: "Bee'ah HQ",
    tag: "Architectural Visualization",
    color: "text-purple-400",
    img: BeeahHQ.src,
  },
  {
    slug: "difc-gate",
    title: "DIFC Gate",
    tag: "Architectural Visualization",
    color: "text-green-400",
    img: DIFCGate.src,
  },
  {
    slug: "adnoc-hq",
    title: "ADNOC HQ",
    tag: "motion graphics",
    color: "text-yellow-400",
    img: ADNOCHQImage.src,
  },
 
];

const placeholderChallenge = [
  "Add challenge paragraph one. Describe the main obstacles and how they were addressed.",
  "Add challenge paragraph two. Expand on technical or creative constraints and solutions.",
];

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "project-neon": {
    title: "Project Neon",
    subtitle: "VFX & Immersive",
    category: "VFX & Immersive",
    year: "2023",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXHEw3WyPZGezWbor9LoFzHafofYNI0jlSDyOV7QHTEAu8mYAXu6BPna6YX5_gUF5GP8PiiBiypKjD0PjZWy47z10TTp0GN1FE_7ZnJkSvixhOyrncJhW0AraHQWSm7zRyXcmbJPeEqY3mkgc7nWMVPlGs6FfjPEMxPK21_jnlufi5oEWSRytRR8ftGQ1x2s8xTCqqlS_r8Db0mU9uP-CkeKRk0KgTajoCr8LabsmWoxaqI6BaohZAgEK3FnIQLM3U85EemvUUMo0Y",
    overview:
      "Project Neon represents a breakthrough in real-time architectural visualization. Tasked with bringing a futuristic urban landscape to life, we focused on the interplay between synthetic light and brutalist textures to create an atmosphere that feels both alien and familiar.",
    challenge: [
      "The primary obstacle was maintaining a high level of visual fidelity across a vast, open environment without compromising frame rates for the immersive VR component. We had to rethink our lighting pipeline, moving from traditional baked solutions to a hybrid ray-tracing approach that allowed for dynamic neon flickering and realistic reflections on wet surfaces.",
      "Furthermore, the scale of the architecture required a level of detail that challenged our geometry optimization workflows. Every structural beam and panel was designed to be modular yet unique, ensuring that the \"copy-paste\" aesthetic common in large-scale renders was entirely absent.",
    ],
    client: "Lumina Urban Dev",
    services: [
      "VFX Compositing",
      "Architectural Visualization",
      "VR Environmental Design",
    ],
    location: "Dubai, UAE",
    tunnelImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHGPvW9_8av1TOpuiHTarg0SbebvTQzTe2_GYfhCD8Fun_0uhUmYIkHK3Gj7wygMu8jydUO1WVannz2Oo2c8nFxwk7_5xjiMawYgMhPOMp7gqO8idHRCJVtL-Rsaa4jkxgTcsBymSsEnlSFROy9Wy1iUs-INnRMLZ4HVUragaYa8op5WCb6VkwdFQmwmZRSwvPe1kySKQ-KTvJM2KS1RkIRGo5On8lC_JtozD7nB-t-RdAR12wd-KqKBEjBnNEn43xfKuZzf6sE51B",
    textureImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBE0HsFiu-FJLVhJV26n5qbD2T21JWnSHiT47kIc-VrQe6eOZB_GPyIUAyIsWWpkPJSDFcOY0kaYmzZFruj7TZ7LzHU2ZHgiHL3oxhViHp4VSFbbFQ-Y8TuaQyYHgq4ULvs7WuWYJ-HLay02ak5sDf4PL5w9e7ljUmzbsXMNDPl6bv4-20-HxzEX4Vg5A8ZQt2W6YUf_bKnO6PvFzKoXAU4UX1Rorjzd5EVz4sPzp4TjgWl9LmSaYEf6oz0N88en-CLHRBQzGrVp_-6",
    lightingImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh79H_v1Yh8vp5wRNQP75FenWlntNTm-09RUrRiAy8-d-Y_7Uqw2TSHDWt4bo55L_rm5nORfZSV_lCDpHcY9It7WdSKfz4Pi_2YEe8kE4rpATdRIvDxg0EodLBsHO76mCP5zOuyrOL853QePRny91mfPmVnMLa3KkdRXMHomSCwLz32T902R38d8lS3AoPKh95FYBC8alvaqRhX9ffYyDvyfP2l7KOo87wasB9_5C-V93R_bdwNRD2aLMn56d4bCPg89FIwYDdAY-x",
    landscapeImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCs-ie6Ocu5ukMiDBUOuBHz8SRmwcmMPymWiLBlWC_2Dx35eLmdoIyHrQYKv1h_cRMEGclQDxe0E9yjqbW7cQilPOVn4VuE-qNPAL7i7t83DrwuVE_FNir4e9ECBIquH7VZGUfm4zSw8XjBhXRbzeGzzC9achF5kgaPd5oUxhXj0Zu5xF_aATxA-_C7VYol_gFeWe6H24UaCxwNkcYxOrn6DZcs3JBKe8odjRC0VqgJFNCEZsdOycQKVeczkzQ7hUMx_dgnIMZ-XOVh",
  },
  "mashreq-hq": {
    title: "Mashreq HQ",
    subtitle: "Visual Effects",
    category: "Visual Effects",
    year: "—",
    heroImage: MashreqHQ.src,
    overview: "Add overview for Mashreq HQ. Describe the project scope, goals, and outcome.",
    challenge: [...placeholderChallenge],
    client: "—",
    services: ["—"],
    location: "—",
    tunnelImage: MashreqHQ.src,
    textureImage: MashreqHQ.src,
    lightingImage: MashreqHQ.src,
    landscapeImage: MashreqHQ.src,
  },
  "beeah-hq": {
    title: "Bee'ah HQ",
    subtitle: "Architectural Visualization",
    category: "Architectural Visualization",
    year: "—",
    heroImage: BeeahHQ.src,
    overview: "Add overview for Bee'ah HQ. Describe the project scope, goals, and outcome.",
    challenge: [...placeholderChallenge],
    client: "—",
    services: ["—"],
    location: "—",
    tunnelImage: BeeahHQ.src,
    textureImage: BeeahHQ.src,
    lightingImage: BeeahHQ.src,
    landscapeImage: BeeahHQ.src,
  },
  "difc-gate": {
    title: "DIFC Gate",
    subtitle: "Architectural Visualization",
    category: "Architectural Visualization",
    year: "—",
    heroImage: DIFCGate.src,
    overview: "Add overview for DIFC Gate. Describe the project scope, goals, and outcome.",
    challenge: [...placeholderChallenge],
    client: "—",
    services: ["—"],
    location: "—",
    tunnelImage: DIFCGate.src,
    textureImage: DIFCGate.src,
    lightingImage: DIFCGate.src,
    landscapeImage: DIFCGate.src,
  },
  "adnoc-hq": {
    title: "ADNOC HQ",
    subtitle: "Motion Graphics",
    category: "Motion Graphics",
    year: "—",
    heroImage: ADNOCHQImage.src,
    overview: "Add overview for ADNOC HQ. Describe the project scope, goals, and outcome.",
    challenge: [...placeholderChallenge],
    client: "—",
    services: ["—"],
    location: "—",
    tunnelImage: ADNOCHQImage.src,
    textureImage: ADNOCHQImage.src,
    lightingImage: ADNOCHQImage.src,
    landscapeImage: ADNOCHQImage.src,
  },
};

// ─── Aggregated export for context ──────────────────────────────────────────

export const siteData = {
  navLinks,
  servicesListing,
  experienceData,
  artificialIntelligenceData,
  architecturalData,
  aboutData,
  contactData,
   caseStudySummaries,
   caseStudyDetails,
} as const;

export type SiteData = typeof siteData;
