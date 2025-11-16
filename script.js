const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Show a welcome message from the bot
addMessage(
  "Hi! I'm a health information helper.\n" +
  "Tell me your symptoms or ask a general health question.\n" +
  "⚠️ I am not a doctor and cannot diagnose or prescribe medicines."
);

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  userInput.disabled = true;

  const button = chatForm.querySelector("button");
  const oldText = button.textContent;
  button.textContent = "Thinking...";
  button.disabled = true;

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    addMessage(data.reply || "Sorry, I couldn't understand that.", "bot");
  } catch (err) {
    console.error(err);
    addMessage(
      "Oops, I couldn't reach the server.\n" +
      "Make sure your backend is running on http://localhost:3000.",
      "bot"
    );
  } finally {
    userInput.disabled = false;
    button.textContent = oldText;
    button.disabled = false;
    userInput.focus();
  }
});
