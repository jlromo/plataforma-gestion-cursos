import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm text-chapingo-silver-600 dark:text-chapingo-silver-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-chapingo-silver-300 dark:text-chapingo-silver-400/40">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-chapingo-blue-700 hover:text-chapingo-blue-900 hover:underline dark:text-chapingo-blue-500 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
