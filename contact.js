const chatBox = document.getElementById("chatBox"),
          sendBtn = document.getElementById("sendBtn"),
          input = document.getElementById("userInput"),
          chat = document.getElementById("chatMessages");

    function toggleChat() {
      chatBox.classList.toggle("visible");
    }

    function sendMessage() {
      const message = input.value.trim();
      if (message === "") return;

      const userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.textContent = message;
      chat.appendChild(userDiv);

      let reply = "Sorry, I didn’t understand.";
      const msg = message.toLowerCase();

      if (msg.includes("hello") || msg.includes("hi")) {
        reply = "Hi there! How can I help?";
      } else if (msg.includes("track") || msg.includes("courses")) {
        reply = "We offer Web, AI, Mobile, and Cyber tracks!";
      } else if (msg.includes("bye")) {
        reply = "Goodbye! 👋";
      } else if (msg.includes("thanks")) {
        reply = "You're welcome 😊";
      }

      const botDiv = document.createElement("div");
      botDiv.className = "bot";

      setTimeout(() => {
        botDiv.textContent = reply;
        chat.appendChild(botDiv);
        chat.scrollTop = chat.scrollHeight;
      }, 400);

      input.value = "";
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    // Hide bubble when footer is in view
    window.addEventListener("scroll", () => {
      const footer = document.querySelector("footer");
      const toggle = document.querySelector(".chat-toggle");

      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        toggle.style.display = (footerTop < window.innerHeight - 100) ? "none" : "block";
      }
    });