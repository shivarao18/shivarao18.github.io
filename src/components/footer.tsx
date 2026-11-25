import { EMAIL, GITHUB_URL, LINKEDIN_URL, person, RESUME_PATH } from "@/content/site";

const links = [
  { href: RESUME_PATH, label: "Resume" },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: `mailto:${EMAIL}`, label: "Email" },
  { href: LINKEDIN_URL, label: "LinkedIn", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted">{person.name}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-accent"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
                {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
