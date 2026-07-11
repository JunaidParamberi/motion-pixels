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
  image: string;
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
