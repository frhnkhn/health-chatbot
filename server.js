const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

// Create OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Health + safety focused system prompt
const SYSTEM_PROMPT = `
You are a helpful healthcare information assistant.
You are NOT a doctor and must not act like one.

Rules:
- You can provide general information about symptoms, diseases, tests, and treatment options.
- You MUST say you are not a substitute for a real doctor.
- You must NOT give exact medicine names, doses, or treatment plans.
- Never say a diagnosis is 100% certain. Use words like "may be", "could be", "possibilities include".
- Urgently recommend seeing a doctor or emergency services if user reports: chest pain, trouble breathing, severe headache, loss of consciousness, suicidal thoughts, severe bleeding, or other emergencies.
- Encourage the user to see a qualified healthcare professional for any serious or persistent symptoms.
- Be kind, calm, and easy to understand.
- If you are unsure, say that you are unsure and suggest seeing a doctor.

Always answer in simple, clear language.
`;

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message || "";

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // you can change this if needed
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a reply.";
    res.json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).json({
      reply:
        "Sorry, something went wrong talking to the AI. Please try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
