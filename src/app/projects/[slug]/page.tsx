import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, isTodoLink, person, projectHref, projects, SITE_URL } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.title}. ${project.summary}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: projectHref(project.slug) },
    openGraph: {
      title: `${project.title} — ${person.name}`,
      description,
      url: `${SITE_URL}${projectHref(project.slug)}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: person.headline }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="content" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-accent">
        <Link href="/#projects" className="hover:underline">
          Case studies
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{project.index}</span>
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

      <section className="mt-10" aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Problem
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-foreground">{project.problem}</p>
      </section>

      <section className="mt-10" aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Approach
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground">
          {project.approach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Stack
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="results-heading">
        <h2 id="results-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Measured results
        </h2>
        <dl className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
          {project.results.map((result) => (
            <div key={result.label} className="grid gap-1 px-4 py-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
              <dt className="text-sm text-muted">{result.label}</dt>
              <dd>
                <p className="font-semibold text-foreground">{result.value}</p>
                {result.detail ? <p className="mt-1 text-sm text-muted">{result.detail}</p> : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="links-heading">
        <h2 id="links-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Links
        </h2>
        {project.links.length === 0 ? (
          <p className="mt-3 text-muted">No public URL is listed for this work.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {project.links.map((link) =>
              isTodoLink(link) ? (
                <li key={link.label} className="text-foreground">
                  {link.label}: private. The URL is still a TODO.
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-semibold text-accent underline-offset-4 hover:underline"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                    {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                </li>
              ),
            )}
          </ul>
        )}
      </section>
    </main>
  );
}
