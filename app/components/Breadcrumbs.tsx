import Link from "next/link";

interface BreadcrumbsProps {
  backHref: string;
  backLabel?: string;
}

const Breadcrumbs = ({ backHref, backLabel = "Back" }: BreadcrumbsProps) => {
  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
    >
      <span className="text-white/60">←</span>
      {backLabel}
    </Link>
  );
};

export default Breadcrumbs;
