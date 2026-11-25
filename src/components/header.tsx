import Link from "next/link";
import { person } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground">
          {person.name}
        </Link>
        <nav aria-label="Page" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-foreground">
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
