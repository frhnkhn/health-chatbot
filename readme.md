# Health Chatbot 🩺

A simple healthcare information chatbot built with:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **LLM**: OpenAI API (chat completions)

> ⚠️ This bot is **not** a doctor and does **not** provide medical diagnosis or prescriptions.  
> It only gives general health information and always recommends consulting a real healthcare professional.

---

## 🧠 Features

- Chat-style UI (like a mini ChatGPT)
- Sends user messages from the browser to a Node.js backend
- Backend calls OpenAI with a safety-focused system prompt
- Safety rules:
  - No exact medicine names or doses
  - No guaranteed medical diagnosis
  - Encourages visiting a doctor for serious or persistent symptoms

---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/health-chatbot.git
cd health-chatbot
