import Link from "next/link";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolPageLayout({ title, description, children }: ToolPageLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      {children}
    </div>
  );
}
