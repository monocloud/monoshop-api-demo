interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-black">{title}</h2>
      {href && (
        <a
          href={href}
          className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-wider"
        >
          View all →
        </a>
      )}
    </div>
  );
}
