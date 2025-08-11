const log = (who, text) => {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${who}:</strong> ${text}`;
  document.getElementById("chatLog").appendChild(div);
};

document.getElementById("sendChat").addEventListener("click", async () => {
  const msg = document.getElementById("chatInput").value.trim();
  if (!msg) return;

  log("You", msg);
  document.getElementById("chatInput").value = "";

  try {
    const res = await fetch("/.netlify/functions/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    if (res.ok) {
      log("MindMate", data.reply);
    } else {
      log("MindMate", "Sorry, something went wrong.");
    }
  } catch (e) {
    log("MindMate", "Sorry, failed to connect to AI service.");
  }
});
