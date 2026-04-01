import type { ServiceListingItem, ServicePageData } from "./types";

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
    title: "Architectural ",
    alt: "Architectural",
    link: "/services/architectural",
    subText:
      "High-fidelity visualizations, dynamic lighting, and immersive light art for spatial storytelling.",
  },
];

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
