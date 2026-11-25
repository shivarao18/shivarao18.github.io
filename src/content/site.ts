/**
 * Portfolio content. Edit this file to change copy, metrics, and links.
 *
 * Private repositories stay as the TODO constants below. Do not replace
 * them with a guessed URL.
 */

export const SITE_URL = "https://shivarao18.github.io";

export const EMAIL = "shivathummanapalli13@gmail.com";

export const GITHUB_URL = "https://github.com/shivarao18";

export const LINKEDIN_URL = "https://www.linkedin.com/in/shivakumarrt";

export const RESUME_PATH = "/Shiva_Thummanapalli_Resume.pdf";

export const CODING_AGENT_REPO_URL = "https://github.com/shivarao18/actix_autoGPT";

/** Private repository. TODO: replace with the public URL when it can be shared. */
export const SMARTSPEND_REPO_URL = "TODO" as const;

/** Private repository. TODO: replace with the public URL when it can be shared. */
export const SLM_REPO_URL = "TODO" as const;

export type TodoHref = typeof SMARTSPEND_REPO_URL;

export type Result = {
  label: string;
  value: string;
  detail?: string;
};

export type ProjectLink =
  | { label: string; href: string; external?: boolean }
  | { label: string; href: TodoHref; todo: true };

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  results: Result[];
  links: ProjectLink[];
};

export type Role = {
  company: string;
  title: string;
  dates: string;
  location?: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type Degree = {
  school: string;
  credential: string;
  detail: string;
  date?: string;
};

export const person = {
  name: "Shiva Kumar Thummanapalli",
  headline: "AI/ML Engineer: RAG retrieval, LLM evals, fine-tuning & inference",
  pitch:
    "Applied ML for US engineering roles. I work on RAG retrieval, LLM evaluation, fine-tuning, and inference, and the measurements are on this page.",
  audience: "Open to US AI/ML engineering roles in applied ML, LLM/RAG, inference, and agents.",
} as const;

export const proof = [
  { value: "95% Hit@5", detail: "SmartSpend retrieval" },
  { value: "0.94 MRR", detail: "SmartSpend retrieval" },
  { value: "30% to 70%", detail: "Hard-paraphrase accuracy at 14 ms P95" },
  { value: "32 to 1", detail: "Model calls in a burst. Locust: 11,074 requests, 0 failures" },
] as const;

export const roles: Role[] = [
  {
    company: "UnitedHealth Group",
    title: "AI/ML Engineer",
    dates: "May 2025 to present",
    location: "Remote",
  },
  {
    company: "Worksmart Technologies",
    title: "Software Engineer, ML & Data Systems",
    dates: "Dec 2022 to Jul 2024",
  },
];

export const projects: Project[] = [
  {
    slug: "smartspend",
    index: "01",
    title: "SmartSpend",
    summary: "AI financial agent. Retrieval, paraphrase robustness, tail latency, and a PII test suite.",
    problem:
      "A financial agent is only useful when the right context comes back for a reworded question, the tail stays fast, and personal data does not leak into the answer.",
    approach: [
      "Retrieval is scored with Hit@5 and mean reciprocal rank, including a hard-paraphrase set.",
      "A Redis cache cut P95 latency by 7x.",
      "A PII suite covers 68 test cases.",
    ],
    stack: ["Redis"],
    results: [
      { label: "Hit@5", value: "95%" },
      { label: "MRR", value: "0.94" },
      {
        label: "Hard-paraphrase accuracy",
        value: "30% to 70%",
        detail: "At 14 ms P95",
      },
      { label: "Redis tail latency", value: "P95 cut 7x" },
      { label: "PII tests", value: "68 cases" },
    ],
    links: [
      {
        label: "Repository",
        href: SMARTSPEND_REPO_URL,
        todo: true,
      },
    ],
  },
  {
    slug: "autonomous-coding-agent",
    index: "02",
    title: "Autonomous coding agent",
    summary: "Rust multi-agent system with an eval and regression framework: LLM-as-judge and trajectory replay.",
    problem:
      "A coding agent is hard to trust unless a run can be scored, and replayed, when the model, the prompt, or the tool schema changes.",
    approach: [
      "A Rust multi-agent system takes a natural-language spec through generation and checks.",
      "The eval framework pairs deterministic scores with an LLM-as-judge.",
      "Trajectory replay is the regression path across model, prompt, and tool-schema versions.",
    ],
    stack: ["Rust", "LLM-as-judge", "Trajectory replay", "Eval and regression framework"],
    results: [
      {
        label: "What is measured",
        value: "Eval and regression framework",
        detail: "Deterministic scores, an LLM-as-judge, and trajectory replay. No extra score is claimed on this page.",
      },
    ],
    links: [
      {
        label: "GitHub",
        href: CODING_AGENT_REPO_URL,
        external: true,
      },
    ],
  },
  {
    slug: "slm-tool-calling",
    index: "03",
    title: "SLM tool-calling fine-tune and vLLM serving",
    summary:
      "QLoRA fine-tune of Qwen2.5-3B, served with vLLM guided JSON behind FastAPI and a Redis single-flight lock.",
    problem:
      "A small tool-calling model needs a stratified fine-tune, loss that ignores the prompt, and a serving path that does not stampede the GPU when the same request arrives many times at once.",
    approach: [
      "QLoRA fine-tune of Qwen2.5-3B on a 15k stratified slice of xlam-function-calling-60k. Total variation from the source strata is 0.015.",
      "Completion-only loss masking, verified on all 17k rows.",
      "vLLM serves the model with guided JSON decoding behind a FastAPI gateway.",
      "A Redis single-flight lock collapses identical in-flight calls. In a burst test it cut backend model calls from 32 to 1.",
      "A BFCL-style 4-way eval harness is included. Accuracy and latency are a GPU benchmark in progress, so this page claims no accuracy or latency numbers.",
    ],
    stack: ["Python", "PyTorch", "PEFT/QLoRA", "TRL", "vLLM", "FastAPI", "Redis"],
    results: [
      {
        label: "Training slice",
        value: "15k stratified rows",
        detail: "0.015 total variation from the xlam-function-calling-60k source strata",
      },
      {
        label: "Loss masking",
        value: "Verified on all 17k rows",
        detail: "Completion-only",
      },
      {
        label: "Burst test",
        value: "32 model calls to 1",
        detail: "Redis single-flight lock",
      },
      {
        label: "Locust",
        value: "11,074 requests, 0 failures",
      },
      {
        label: "Accuracy",
        value: "GPU benchmark in progress",
      },
      {
        label: "Latency",
        value: "GPU benchmark in progress",
      },
    ],
    links: [
      {
        label: "Repository",
        href: SLM_REPO_URL,
        todo: true,
      },
    ],
  },
  {
    slug: "train-delay-forecasting",
    index: "04",
    title: "Uncertainty-aware train-delay forecasting",
    summary: "Accepted ASEE conference paper on conformal prediction, CQR, and TreeSHAP for train-delay forecasts.",
    problem:
      "A single delay number does not say whether the forecast is reliable enough to use. The work treats uncertainty as part of the prediction.",
    approach: [
      "Conformal prediction builds intervals around the forecast.",
      "Conformalized quantile regression (CQR) lets the interval width change with the prediction.",
      "TreeSHAP attributes the forecast to input features.",
    ],
    stack: ["Conformal prediction", "CQR", "TreeSHAP"],
    results: [
      {
        label: "Publication",
        value: "Accepted ASEE conference paper",
      },
    ],
    links: [],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "LLM systems",
    items: ["RAG retrieval", "LLM evaluation", "Fine-tuning", "Inference", "Agents", "LLM-as-judge"],
  },
  {
    name: "Training",
    items: ["Python", "PyTorch", "PEFT/QLoRA", "TRL"],
  },
  {
    name: "Serving",
    items: ["vLLM", "FastAPI", "Redis", "Guided JSON decoding"],
  },
  {
    name: "Evaluation and reliability",
    items: [
      "BFCL-style harnesses",
      "Trajectory replay",
      "Locust",
      "Conformal prediction",
      "CQR",
      "TreeSHAP",
    ],
  },
  {
    name: "Languages",
    items: ["Python", "Rust"],
  },
];

export const education: Degree[] = [
  {
    school: "University of Florida",
    credential: "M.S. Computer Science",
    detail: "GPA 3.9",
    date: "May 2026",
  },
  {
    school: "Guru Ghasidas Vishwavidyalaya",
    credential: "B.Tech, Computer Science and Engineering",
    detail: "GPA 3.8",
  },
];

export function projectHref(slug: string): string {
  return `/projects/${slug}/`;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function isTodoLink(link: ProjectLink): link is Extract<ProjectLink, { todo: true }> {
  return "todo" in link && link.todo;
}
