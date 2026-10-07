// ==========================================
// 1. LIGHT / DARK MODE TOGGLE (WITH LOCALSTORAGE)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

// Load saved theme preference on initial load
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Toggle icon state
    if (themeIcon) {
      if (isDarkMode) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }

    // Save state to local browser storage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}


// ==========================================
// 2. ASK ABOUT ME CHATBOT
// ==========================================
const answers = {
  skills: "I specialize in HTML5, CSS3, JavaScript, PHP, and MySQL!",
  experience: "I have experience developing full-stack web applications like POS Systems and Payroll Management platforms.",
  contact: "You can reach me directly at surcomelvienjoy@gmail.com or send a message using the form below!"
};

function askQuestion(type) {
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  // Set user question text
  let userText = "";
  if (type === 'skills') userText = "What are your top skills?";
  if (type === 'experience') userText = "Tell me about your experience.";
  if (type === 'contact') userText = "How can I reach you?";

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-msg';
  userMsgDiv.innerText = userText;
  chatWindow.appendChild(userMsgDiv);

  // Auto scroll down
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Append bot response after a brief delay
  setTimeout(() => {
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'bot-msg';
    botMsgDiv.innerText = answers[type] || "Feel free to ask another question!";
    chatWindow.appendChild(botMsgDiv);
    
    // Auto scroll down to response
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 400);
}


// ==========================================
// 3. CONTACT FORM SUBMISSION HANDLER
// ==========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Thank you for reaching out! Your message has been sent successfully.');
    contactForm.reset();
  });
}
