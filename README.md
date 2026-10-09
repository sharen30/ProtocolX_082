# CatchUp AI 🚀

A lightweight, 100% client-side React SPA designed to instantly extract actionable insights—key decisions, action items, urgent alerts, and user mentions—from team chat transcripts.

---

## 🌟 Key Features

- **100% On-Device & Local-First**: Zero external API reliance or server processing. All chat transcript parsing is performed locally in your browser to protect data privacy.
- **Instant Regex Analysis**: Powered by an optimized $O(n)$ pattern-matching engine that filters large text blocks in milliseconds.
- **Custom File Uploads**: Upload standard `.txt` transcripts directly with built-in client-side size validation (max 1 MB limit).
- **Preset Hackathon Datasets**: Quickly test functionality using pre-loaded chat scenarios (Engineering Incident, Product Launch, Client Sync).
- **Modern Dark UI**: Designed with a focused, high-contrast dark theme (`#37353E` background) for enhanced visual clarity during high-stress incident reviews.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 (Single Page Application)
- **Styling**: Modern inline styling & system sans-serif typography
- **Testing**: Jest & React Testing Library (100% unit test coverage across core workflows)
- **Deployment**: Vercel

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have Node.js and `npm` installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sharen30/ProtocolX_082.git](https://github.com/sharen30/ProtocolX_082.git)
   cd ProtocolX_082/app
* **Time Complexity:** $O(n)$ where $n$ is the total character length of the loaded transcript. Single-pass splitting and linear regex evaluation guarantee immediate results without browser thread blocking.
* **Memory Footprint:** In-memory string manipulation within V8; total memory allocation remains well under 5 MB for standard log files.
* **Privacy Model:** Operates entirely within client state (`React.useState`). No telemetry, no third-party scripts, and no server endpoints.

---
