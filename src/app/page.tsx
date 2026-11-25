import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import {
  education,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  person,
  projectHref,
  projects,
  proof,
  RESUME_PATH,
  roles,
  skillGroups,
} from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroLinks = [
  { href: RESUME_PATH, label: "Resume", variant: "default" as const },
  { href: GITHUB_URL, label: "GitHub", variant: "outline" as const, external: true },
  { href: `mailto:${EMAIL}`, label: "Email", variant: "outline" as const },
  { href: LINKEDIN_URL, label: "LinkedIn", variant: "outline" as const, external: true },
];

export default function HomePage() {
  return (
    <main id="content">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{person.audience}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-foreground sm:text-6xl">
            {person.name}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-snug text-foreground sm:text-2xl">{person.headline}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{person.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroLinks.map((link) => (
              <ButtonLink
                key={link.label}
                href={link.href}
                variant={link.variant}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
                {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </ButtonLink>
            ))}
          </div>
          <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((item) => (
              <div key={item.value} className="rounded-2xl border border-border bg-card p-4">
                <dt className="font-serif text-2xl text-foreground">{item.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="experience" className="border-b border-border" aria-labelledby="experience-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="experience-heading" className="font-serif text-3xl text-foreground">
            Experience
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Two roles. Measured project results are in the case studies, taken from the resume.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <li key={role.company} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{role.dates}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{role.title}</h3>
                <p className="mt-1 text-muted">
                  {role.company}
                  {role.location ? ` · ${role.location}` : ""}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="border-b border-border" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="projects-heading" className="font-serif text-3xl text-foreground">
            Case studies
          </h2>
          <p className="mt-3 max-w-2xl text-muted">Problem, approach, stack, and the measured result. Open a card for the full write-up.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={projectHref(project.slug)}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <p className="text-sm font-semibold text-accent">{project.index}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{project.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">
                    {project.results[0]?.value}
                    <span className="mt-1 block font-normal text-muted">{project.results[0]?.label}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="skills" className="border-b border-border" aria-labelledby="skills-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="skills-heading" className="font-serif text-3xl text-foreground">
            Skills
          </h2>
          <p className="mt-3 max-w-2xl text-muted">The tools behind the case studies.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <section key={group.name} aria-labelledby={`skill-${group.name.replace(/\s+/g, "-").toLowerCase()}`} className="rounded-2xl border border-border bg-card p-6">
                <h3 id={`skill-${group.name.replace(/\s+/g, "-").toLowerCase()}`} className="text-lg font-semibold text-foreground">
                  {group.name}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="border-b border-border" aria-labelledby="education-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="education-heading" className="font-serif text-3xl text-foreground">
            Education
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {education.map((degree) => (
              <li key={degree.school} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">{degree.credential}</h3>
                <p className="mt-1 text-muted">{degree.school}</p>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {degree.detail}
                  {degree.date ? ` · ${degree.date}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="contact-heading" className="font-serif text-3xl text-foreground">
            Contact
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            For US AI/ML engineering roles. The resume, GitHub, and LinkedIn are the fastest way in.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li>
              <a className="block rounded-2xl border border-border bg-card p-5 hover:border-accent" href={`mailto:${EMAIL}`}>
                <span className="block text-sm text-muted">Email</span>
                <span className="mt-1 block font-semibold text-foreground">{EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                className="block rounded-2xl border border-border bg-card p-5 hover:border-accent"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="block text-sm text-muted">GitHub</span>
                <span className="mt-1 block font-semibold text-foreground">github.com/shivarao18</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="block rounded-2xl border border-border bg-card p-5 hover:border-accent"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="block text-sm text-muted">LinkedIn</span>
                <span className="mt-1 block font-semibold text-foreground">linkedin.com/in/shivakumarrt</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a className="block rounded-2xl border border-border bg-card p-5 hover:border-accent" href={RESUME_PATH}>
                <span className="block text-sm text-muted">Resume</span>
                <span className="mt-1 block font-semibold text-foreground">Shiva_Thummanapalli_Resume.pdf</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
