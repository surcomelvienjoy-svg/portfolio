// ==========================================
// 1. LIGHT / DARK MODE TOGGLE (WITH SAVING)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check if user previously saved a preferred theme in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

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

  // Save preference in local browser storage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});


// ==========================================
// 2. ASK ABOUT ME CHATBOT
// ==========================================
const answers = {
  skills: "I specialize in HTML5, CSS3, JavaScript, React, PHP, and MySQL!",
  experience: "I have experience developing full-stack applications like POS Systems and Payroll Management platforms.",
  contact: "You can email me directly or send a message using the form at the bottom of this page!"
};

function askQuestion(type) {
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  // Determine user question text
  let userText = "";
  if (type === 'skills') userText = "What are your top skills?";
  if (type === 'experience') userText = "Tell me about your experience.";
  if (type === 'contact') userText = "How can I reach you?";

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-msg';
  userMsgDiv.innerText = userText;
  chatWindow.appendChild(userMsgDiv);

  // Auto-scroll to latest user message
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Append bot response after a brief delay
  setTimeout(() => {
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'bot-msg';
    botMsgDiv.innerText = answers[type] || "Feel free to ask another question!";
    chatWindow.appendChild(botMsgDiv);
    
    // Auto-scroll to show bot response
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 400);
}


// ==========================================
// 3. CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    alert('Thank you for reaching out! Your message has been sent successfully.');
    
    // Clear form inputs
    contactForm.reset();
  });
}