# CatchUp AI

A lightweight, privacy-first, local-first chat transcript summarizer designed to extract key decisions, action items, urgent alerts, and user mentions instantly inside your browser.

## 🌟 Key Features

* **100% Local-First Processing:** Zero API calls, zero cloud dependencies, and zero data leaves your machine.
* **$O(n)$ Linear Parsing Engine:** Rapid client-side regex evaluation across transcript datasets.
* **Multi-Dataset Support:** Built-in scenarios (Engineering Incident, Product Launch, Client Sync) + support for custom `.txt` log uploads (< 1MB).
* **Sanitized & Secure:** Strips non-printable control characters, prevents XSS payload execution, and enforces client-side file size restrictions.
* **Accessible UI:** High-contrast light mode, standard ARIA roles, live regions for dynamically rendered results, and full keyboard navigation.

---

## 🛠️ Architecture & Technical Performance

* **Time Complexity:** $O(n)$ where $n$ is the total character length of the loaded transcript. Single-pass splitting and linear regex evaluation guarantee immediate results without browser thread blocking.
* **Memory Footprint:** In-memory string manipulation within V8; total memory allocation remains well under 5 MB for standard log files.
* **Privacy Model:** Operates entirely within client state (`React.useState`). No telemetry, no third-party scripts, and no server endpoints.

---

## 🚀 Quickstart Guide

### Prerequisites
* Node.js v18+ 
* npm v9+

### Local Setup & Verification

1. **Navigate to the active application directory:**
   ```bash
   cd app