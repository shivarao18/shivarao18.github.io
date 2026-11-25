import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground">That page is not on this site.</h1>
      <p className="mt-3 text-muted">The case studies and contact details are on the home page.</p>
      <div className="mt-6">
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </div>
    </main>
  );
}
