import { notFound } from "next/navigation";
import { CaseStudyDetailContent } from "./CaseStudyDetailContent";
import { caseStudyDetails } from "../case-study-data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails[slug];

  if (!project) {
    return notFound();
  }

  return <CaseStudyDetailContent project={project} />;
}

