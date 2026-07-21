// ==========================================================================
// AFFAN ZULFIQAR - AI ENGINEER PORTFOLIO SCRIPT
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. DARK MODE TOGGLE WITH LOCALSTORAGE PERSISTENCE
  // ------------------------------------------------------------------------
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check saved user preference in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☀️";
  } else {
    if (darkModeToggle) darkModeToggle.textContent = "🌙";
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDarkMode = body.classList.contains("dark-mode");

      // Update button text / icon
      darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙";

      // Persist selection
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
  }

  // ------------------------------------------------------------------------
  // 2. DEV QUOTE API FETCH (#apiResult)
  // ------------------------------------------------------------------------
  const quoteBtn = document.getElementById("quoteBtn");
  const apiResult = document.getElementById("apiResult");

  // Local fallback quotes in case of offline / CORS issues
  const fallbackQuotes = [
    { content: "Artificial intelligence is the new electricity.", author: "Andrew Ng" },
    { content: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
    { content: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { content: "Machine learning is the science of getting computers to act without being explicitly programmed.", author: "Arthur Samuel" },
    { content: "Predicting the future isn't magic, it's artificial intelligence.", author: "Dave Waters" }
  ];

  if (quoteBtn && apiResult) {
    quoteBtn.addEventListener("click", () => {
      apiResult.textContent = "Loading...";

      // Try Quotable API first
      fetch("https://api.quotable.io/random")
        .then(res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then(data => {
          apiResult.textContent = `"${data.content}" — ${data.author}`;
        })
        .catch(() => {
          // Secondary attempt with DummyJSON Quotes API
          fetch("https://dummyjson.com/quotes/random")
            .then(res => res.json())
            .then(data => {
              apiResult.textContent = `"${data.quote}" — ${data.author}`;
            })
            .catch(() => {
              // Guaranteed local fallback
              const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
              apiResult.textContent = `"${randomQuote.content}" — ${randomQuote.author}`;
            });
        });
    });
  }

  // ------------------------------------------------------------------------
  // 3. SECONDARY API FETCH: CURRENTLY EXPLORING / TECH CHALLENGES (#activityResult)
  // ------------------------------------------------------------------------
  const activityBtn = document.getElementById("activityBtn");
  const activityResult = document.getElementById("activityResult");

  const techChallenges = [
    "Fine-tuning a quantized Llama-3 8B model using QLoRA for custom RAG tasks.",
    "Benchmarking TensorRT inference speedup vs ONNX Runtime on Jetson Orin Nano.",
    "Implementing Hybrid BM25 + Vector Search with OpenSearch and Reciprocal Rank Fusion.",
    "Designing real-time vision processing pipelines with OpenCV and CUDA acceleration.",
    "Evaluating DeepSeek-R1 reasoning capabilities on complex structured data extraction."
  ];

  if (activityBtn && activityResult) {
    activityBtn.addEventListener("click", () => {
      activityResult.textContent = "Loading activity...";

      fetch("https://api.adviceslip.com/advice")
        .then(res => res.json())
        .then(data => {
          if (data && data.slip && data.slip.advice) {
            activityResult.textContent = `💡 Tech Insight: "${data.slip.advice}"`;
          } else {
            throw new Error("Invalid advice payload");
          }
        })
        .catch(() => {
          const randomChallenge = techChallenges[Math.floor(Math.random() * techChallenges.length)];
          activityResult.textContent = `🚀 Active Exploration: ${randomChallenge}`;
        });
    });
  }

  // ------------------------------------------------------------------------
  // 4. SMOOTH SCROLLING FOR NAVIGATION LINKS
  // ------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
