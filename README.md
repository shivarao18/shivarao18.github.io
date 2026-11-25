# Shiva Kumar Thummanapalli

Static portfolio for US AI/ML engineering roles: RAG retrieval, LLM evaluation, fine-tuning, and inference. Next.js static export. No server, no tracking, no analytics.

GitHub is the source of truth. The repository is [shivarao18/shivarao18.github.io](https://github.com/shivarao18/shivarao18.github.io). Pushes to `main` publish [https://shivarao18.github.io](https://shivarao18.github.io).

## Local development

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

Production build:

```bash
npm run build
npx serve out -l 43123
```

`npm run build` writes the static site to `out/`. `npm run check` confirms the content file, the allowed email, the LinkedIn URL, and the resume PDF still agree.

## Edit the content

All copy, metrics, skills, education, and links live in one typed file: [`src/content/site.ts`](src/content/site.ts). Edit that file, commit, and push to `main`. GitHub Actions builds the static export and deploys it. Do not add a second content file. Do not add a second email. Do not add visa status.

After editing facts that also appear on the downloadable resume, regenerate the PDF and images, then push:

```bash
python3 scripts/generate_assets.py
```

That script needs Python packages `fpdf2`, `pillow`, and (for `npm run check`) `pypdf`.

## TODO constants

These live at the top of `src/content/site.ts`. The pages do not turn them into links.

| Constant | Meaning |
| --- | --- |
| `SMARTSPEND_REPO_URL` | SmartSpend repository is private. Replace `"TODO"` with the real URL when it can be shared. |
| `SLM_REPO_URL` | The QLoRA / vLLM repository is private. Same rule. |

LinkedIn is `https://www.linkedin.com/in/shivakumarrt`. The only email is `shivathummanapalli13@gmail.com`. The public coding-agent repository is `https://github.com/shivarao18/actix_autoGPT`.

## Resume file

The Resume button serves `/Shiva_Thummanapalli_Resume.pdf` from [`public/Shiva_Thummanapalli_Resume.pdf`](public/Shiva_Thummanapalli_Resume.pdf).

The original PDF attachment was not in this workspace, so the committed file is typeset from `src/content/site.ts` by `scripts/generate_assets.py`. It states the same roles, education, and measurements as the site, and it does not add numbers. To serve the original resume instead, replace that file and keep the filename.

## Deploy

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs on every push to `main`. It uses `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. Pages → Build and deployment → Source must be GitHub Actions.

This is a user site, so the published URL is the domain root. `basePath` is empty, `trailingSlash` is on, images are unoptimized, and `public/.nojekyll` is copied into `out/` so Pages keeps the `_next` folder.

Open Graph tags use `https://shivarao18.github.io` as `metadataBase` (`SITE_URL` in `src/content/site.ts`).
