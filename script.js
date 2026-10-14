// 1. LIGHT / DARK MODE TOGGLE (WITH LOCALSTORAGE)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

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
    if (themeIcon) {
      themeIcon.classList.toggle('fa-moon', !isDarkMode);
      themeIcon.classList.toggle('fa-sun', isDarkMode);
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

// 2. MOBILE MENU
const menuToggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const menuIcon = menuToggleBtn ? menuToggleBtn.querySelector('i') : null;

function setMenu(open) {
  if (!navMenu || !menuToggleBtn) return;
  navMenu.classList.toggle('open', open);
  menuToggleBtn.setAttribute('aria-expanded', String(open));
  menuToggleBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (menuIcon) {
    menuIcon.classList.toggle('fa-bars', !open);
    menuIcon.classList.toggle('fa-xmark', open);
  }
}

if (menuToggleBtn && navMenu) {
  menuToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!navMenu.classList.contains('open'));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== menuToggleBtn && !menuToggleBtn.contains(e.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenu(false);
  });
}

// 3. ACTIVE NAV LINK ON SCROLL + REVEAL ANIMATION
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window) {
  const linkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => linkObserver.observe(s));

  const revealTargets = document.querySelectorAll('.about-card, .toolkit-group, .project-card, .contact-grid, .resume-paper, .hero-container');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
}

// 4. FOOTER YEAR
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// 4b. COPY EMAIL BUTTON
const copyEmailBtn = document.getElementById('copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = 'surcomelvienjoy@gmail.com';
    const original = copyEmailBtn.textContent;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      copyEmailBtn.textContent = 'Copied!';
    } catch (err) {
      copyEmailBtn.textContent = 'Copy failed';
    }
    setTimeout(() => {
      copyEmailBtn.textContent = original;
    }, 1600);
  });
}

// 4c. BACK-TO-TOP BUTTON (bottom-left)
const toTopBtn = document.getElementById('to-top');
if (toTopBtn) {
  const toggleToTop = () => {
    toTopBtn.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 4d. DOWNLOAD RESUME (PRINT TO PDF)
const printResumeBtn = document.getElementById('print-resume');
if (printResumeBtn) {
  printResumeBtn.addEventListener('click', () => {
    window.print();
  });
}

// 5. FLOATING CHAT WIDGET (BOTTOM-RIGHT)
const chatFab = document.getElementById('chat-fab');
const chatPopup = document.getElementById('chat-popup');
const chatClose = document.getElementById('chat-close');
const chatFabIcon = chatFab ? chatFab.querySelector('i') : null;

function setChat(open) {
  if (!chatPopup || !chatFab) return;
  chatPopup.classList.toggle('open', open);
  chatPopup.setAttribute('aria-hidden', String(!open));
  chatFab.setAttribute('aria-expanded', String(open));
  chatFab.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
  if (chatFabIcon) {
    chatFabIcon.classList.toggle('fa-comment-dots', !open);
    chatFabIcon.classList.toggle('fa-xmark', open);
  }
}

if (chatFab && chatPopup) {
  chatFab.addEventListener('click', (e) => {
    e.stopPropagation();
    setChat(!chatPopup.classList.contains('open'));
  });
  if (chatClose) chatClose.addEventListener('click', () => setChat(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setChat(false);
  });
}

// 6. ASK ABOUT ME CHATBOT
const answers = {
  skills: 'I specialize in HTML5, CSS3, JavaScript, PHP, and MySQL!',
  experience: 'I have experience developing full-stack web applications like POS Systems and Payroll Management platforms.',
  contact: 'You can reach me directly at surcomelvienjoy@gmail.com or send a message using the form below!'
};

function scrollChatToBottom(chatWindow) {
  requestAnimationFrame(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

function askQuestion(type) {
  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  let userText = '';
  if (type === 'skills') userText = 'What are your top skills?';
  if (type === 'experience') userText = 'Tell me about your experience.';
  if (type === 'contact') userText = 'How can I reach you?';
  if (!userText) return;

  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-msg';
  userMsgDiv.textContent = userText;
  chatWindow.appendChild(userMsgDiv);
  scrollChatToBottom(chatWindow);

  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-msg';
  typingDiv.textContent = 'Typing…';
  chatWindow.appendChild(typingDiv);
  scrollChatToBottom(chatWindow);

  setTimeout(() => {
    typingDiv.textContent = answers[type] || 'Feel free to ask another question!';
    scrollChatToBottom(chatWindow);
  }, 500);
}
window.askQuestion = askQuestion;

// Auto-open chat on first visit is intentionally off — user opens via bottom-right bubble.

// 7. CONTACT FORM SUBMISSION HANDLER
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }
    setTimeout(() => {
      alert('Thank you for reaching out! Your message has been sent successfully.');
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.textContent = original;
      }
    }, 450);
  });
}
