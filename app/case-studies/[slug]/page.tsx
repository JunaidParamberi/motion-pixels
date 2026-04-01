import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetailContent } from "./CaseStudyDetailContent";
import { caseStudyDetails } from "../case-study-data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudyDetails[slug];

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.overview,
    alternates: {
      canonical: `/case-studies/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Motion Pixels`,
      description: project.overview,
      type: "article",
      url: `https://motionpixels.me/case-studies/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails[slug];

  if (!project) {
    return notFound();
  }

  return <CaseStudyDetailContent project={project} />;
}

