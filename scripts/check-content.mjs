import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const source = readFileSync(new URL("../src/content/site.ts", import.meta.url), "utf8");
const pages = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/projects/[slug]/page.tsx",
  "src/components/footer.tsx",
  "src/components/header.tsx",
]
  .map((path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8"))
  .join("\n");

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const emails = source.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
expect(emails.length === 1 && emails[0] === "shivathummanapalli13@gmail.com", `unexpected emails in content: ${emails.join(", ")}`);
expect(!pages.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i), "an email is hardcoded outside the content file");
expect(source.includes("https://www.linkedin.com/in/shivakumarrt"), "LinkedIn URL missing");
expect(source.includes('export const SMARTSPEND_REPO_URL = "TODO"'), "SmartSpend TODO missing");
expect(source.includes('export const SLM_REPO_URL = "TODO"'), "SLM TODO missing");
expect(!/href:\s*"TODO"/.test(pages), "a page uses the TODO string as a link");
expect(!/\bvisa\b|H-1B|H1B/i.test(source + pages), "visa status appeared in site copy");
for (const fact of ["95%", "0.94", "14 ms P95", "11,074", "UnitedHealth Group", "Worksmart Technologies", "University of Florida", "Guru Ghasidas Vishwavidyalaya", "GPU benchmark in progress"]) {
  expect(source.includes(fact), `missing fact: ${fact}`);
}

const pdf = spawnSync("python3", ["-c", "from pypdf import PdfReader; print('\\n'.join(p.extract_text() or '' for p in PdfReader('public/Shiva_Thummanapalli_Resume.pdf').pages))"], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  encoding: "utf8",
});
expect(pdf.status === 0, pdf.stderr || "could not read the resume PDF");
const text = pdf.stdout || "";
for (const fact of ["Shiva Kumar Thummanapalli", "95%", "0.94", "14 ms", "11,074", "shivathummanapalli13@gmail.com", "linkedin.com/in/shivakumarrt", "GPU benchmark in progress"]) {
  expect(text.includes(fact), `resume PDF missing: ${fact}`);
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log("content checks passed");
