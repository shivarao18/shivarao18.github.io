"""Build the favicon, apple icon, Open Graph image, and resume PDF.

The resume PDF is typeset from the same facts as src/content/site.ts.
Replace public/Shiva_Thummanapalli_Resume.pdf with the original file if you have it.
"""

from pathlib import Path

from fpdf import FPDF
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF_REG = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

INK = (16, 18, 15)
CREAM = (244, 241, 234)
TEAL = (158, 224, 216)
MUTED = (200, 194, 182)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def write_icons() -> None:
    base = Image.new("RGB", (512, 512), INK)
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle((0, 0, 511, 511), radius=96, fill=INK)
    mark = font(SERIF, 220)
    draw.text((256, 270), "ST", font=mark, fill=TEAL, anchor="mm")
    base.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png")
    base.save(
        PUBLIC / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )


def write_og() -> None:
    image = Image.new("RGB", (1200, 630), INK)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 16, 630), fill=TEAL)
    draw.text((72, 150), "Shiva Kumar Thummanapalli", font=font(SERIF, 64), fill=CREAM)
    draw.text((72, 240), "AI/ML Engineer", font=font(SANS_BOLD, 36), fill=TEAL)
    draw.text(
        (72, 300),
        "RAG retrieval, LLM evals, fine-tuning & inference",
        font=font(SANS, 28),
        fill=MUTED,
    )
    stats = ["95% Hit@5", "0.94 MRR", "14 ms P95", "11,074 requests, 0 failures"]
    x = 72
    for stat in stats:
        draw.text((x, 430), stat, font=font(SANS_BOLD, 26), fill=CREAM)
        x += 280 if stat != stats[-1] else 0
    # The last stat is long; place stats on two rows instead.
    image = Image.new("RGB", (1200, 630), INK)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 16, 630), fill=TEAL)
    draw.text((72, 140), "Shiva Kumar Thummanapalli", font=font(SERIF, 60), fill=CREAM)
    draw.text((72, 230), "AI/ML Engineer", font=font(SANS_BOLD, 34), fill=TEAL)
    draw.text(
        (72, 290),
        "RAG retrieval, LLM evals, fine-tuning and inference",
        font=font(SANS, 28),
        fill=MUTED,
    )
    draw.text((72, 420), "95% Hit@5", font=font(SANS_BOLD, 32), fill=CREAM)
    draw.text((320, 420), "0.94 MRR", font=font(SANS_BOLD, 32), fill=CREAM)
    draw.text((560, 420), "14 ms P95", font=font(SANS_BOLD, 32), fill=CREAM)
    draw.text((72, 490), "11,074 Locust requests, 0 failures", font=font(SANS, 26), fill=MUTED)
    image.save(PUBLIC / "og.png", optimize=True)


class Resume(FPDF):
    def footer(self) -> None:
        self.set_y(-12)
        self.set_x(self.l_margin)
        self.set_font("Sans", size=8)
        self.set_text_color(90, 86, 78)
        self.cell(self.epw, 6, "Shiva Kumar Thummanapalli  ·  AI/ML Engineer")


def write_line(pdf: Resume, text: str, height: float) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(pdf.epw, height, text)


def section(pdf: Resume, title: str) -> None:
    pdf.ln(4)
    pdf.set_font("Sans", "B", 11)
    pdf.set_text_color(12, 92, 88)
    write_line(pdf, title.upper(), 7)
    pdf.set_draw_color(221, 214, 200)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(2)


def body(pdf: Resume, text: str) -> None:
    pdf.set_font("Sans", size=10)
    pdf.set_text_color(26, 24, 20)
    write_line(pdf, text, 5)
    pdf.ln(1)


def write_pdf() -> None:
    pdf = Resume(format="Letter")
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_font("Sans", "", SANS)
    pdf.add_font("Sans", "B", SANS_BOLD)
    pdf.add_font("Serif", "", SERIF_REG)
    pdf.add_font("Serif", "B", SERIF)
    pdf.add_page()
    pdf.set_font("Serif", "B", 20)
    pdf.set_text_color(26, 24, 20)
    write_line(pdf, "Shiva Kumar Thummanapalli", 10)
    pdf.set_font("Sans", size=11)
    pdf.set_text_color(12, 92, 88)
    write_line(pdf, "AI/ML Engineer: RAG retrieval, LLM evals, fine-tuning & inference", 6)
    pdf.set_font("Sans", size=9)
    pdf.set_text_color(92, 86, 76)
    write_line(
        pdf,
        "shivathummanapalli13@gmail.com  ·  github.com/shivarao18  ·  linkedin.com/in/shivakumarrt",
        4.5,
    )
    pdf.ln(1)
    pdf.set_font("Sans", size=10)
    pdf.set_text_color(26, 24, 20)
    write_line(
        pdf,
        "Applied ML for US engineering roles. RAG retrieval, LLM evaluation, fine-tuning, and inference, with the measurements below.",
        5,
    )

    section(pdf, "Experience")
    body(pdf, "UnitedHealth Group — AI/ML Engineer — May 2025 to present — Remote")
    body(pdf, "Worksmart Technologies — Software Engineer, ML & Data Systems — Dec 2022 to Jul 2024")

    section(pdf, "Selected work")
    body(
        pdf,
        "SmartSpend, AI financial agent. Hit@5 95%. MRR 0.94. Hard-paraphrase accuracy from 30% to 70% at 14 ms P95. Redis cut P95 7x. 68 PII test cases. Repository is private.",
    )
    body(
        pdf,
        "Autonomous coding agent. Rust multi-agent system with an eval and regression framework, LLM-as-judge, and trajectory replay. https://github.com/shivarao18/actix_autoGPT",
    )
    body(
        pdf,
        "SLM tool-calling fine-tune and vLLM serving. Python, PyTorch, PEFT/QLoRA, TRL, vLLM, FastAPI, Redis. QLoRA fine-tune of Qwen2.5-3B on a 15k stratified slice of xlam-function-calling-60k (0.015 total variation from the source strata). Completion-only loss masking verified on all 17k rows. vLLM guided JSON decoding behind FastAPI, with a Redis single-flight lock that cut backend model calls from 32 to 1. Locust: 11,074 requests, 0 failures. BFCL-style 4-way eval harness. Accuracy and latency: GPU benchmark in progress. Repository is private.",
    )
    body(
        pdf,
        "Uncertainty-Aware Train-Delay Forecasting. Conformal prediction, CQR, and TreeSHAP. Accepted ASEE conference paper.",
    )

    section(pdf, "Skills")
    body(pdf, "LLM systems: RAG retrieval, LLM evaluation, fine-tuning, inference, agents, LLM-as-judge.")
    body(pdf, "Training: Python, PyTorch, PEFT/QLoRA, TRL.")
    body(pdf, "Serving: vLLM, FastAPI, Redis, guided JSON decoding.")
    body(pdf, "Evaluation and reliability: BFCL-style harnesses, trajectory replay, Locust, conformal prediction, CQR, TreeSHAP.")
    body(pdf, "Languages: Python, Rust.")

    section(pdf, "Education")
    body(pdf, "M.S. Computer Science, University of Florida. GPA 3.9. May 2026.")
    body(pdf, "B.Tech, Computer Science and Engineering, Guru Ghasidas Vishwavidyalaya. GPA 3.8.")

    pdf.output(PUBLIC / "Shiva_Thummanapalli_Resume.pdf")


if __name__ == "__main__":
    PUBLIC.mkdir(exist_ok=True)
    write_icons()
    write_og()
    write_pdf()
    print("wrote assets")
