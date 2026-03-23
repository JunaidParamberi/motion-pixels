/**
 * Centralized exports for app-wide content data.
 * Data lives in focused files for easier maintenance.
 */

export * from "./types";
export { navLinks } from "./navigation-data";
export {
  servicesListing,
  experienceData,
  artificialIntelligenceData,
  architecturalData,
} from "./services-data";
export { aboutData } from "./about-data";
export { contactData } from "./contact-data";

import { aboutData } from "./about-data";
import { contactData } from "./contact-data";
import { navLinks } from "./navigation-data";
import {
  artificialIntelligenceData,
  architecturalData,
  experienceData,
  servicesListing,
} from "./services-data";

export const siteData = {
  navLinks,
  servicesListing,
  experienceData,
  artificialIntelligenceData,
  architecturalData,
  aboutData,
  contactData,
} as const;

export type SiteData = typeof siteData;
