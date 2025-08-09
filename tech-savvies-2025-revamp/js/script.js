/*
 * Tech‑Savvies 2025 Revamp JavaScript
 *
 * This script adds interactive behaviours to the Tech‑Savvies site. It powers
 * the testimonials slider on the home page, provides a simple interactive
 * demonstration chat, and handles form submissions gracefully. The goal is
 * to highlight the brand’s human‑centric approach through small dynamic
 * touches.
 */

// Testimonial slider logic
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Show the first slide immediately
  if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 7000); // rotate every 7 seconds
  }

  // Interactive demo chat logic (if present)
  const demoSelect = document.getElementById('demo-select');
  const demoChat = document.getElementById('demo-chat');
  if (demoSelect && demoChat) {
    const responses = {
      'What can Tech‑Savvies help me with?': 'We offer personal training sessions, emergency tech troubleshooting, custom AI setups, curated toolkits and security audits – all delivered with patience and a human touch.',
      'Do you support small businesses?': 'Absolutely! Many of our clients are small business owners who need help choosing and integrating tools, improving their online presence and training their teams on AI.',
      'How does the membership work?': 'Our membership plans provide recurring support. Basic covers two SOS calls and one session per month, while Pro offers unlimited SOS calls, two training sessions and quarterly security checkups.'
    };
    demoSelect.addEventListener('change', () => {
      const question = demoSelect.value;
      if (!question) return;
      // Display user question
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = question;
      demoChat.appendChild(userBubble);
      // Display answer after slight delay
      setTimeout(() => {
        const answerBubble = document.createElement('div');
        answerBubble.className = 'chat-bubble bot';
        answerBubble.textContent = responses[question] || 'We’re still working on that answer!';
        demoChat.appendChild(answerBubble);
        demoChat.scrollTop = demoChat.scrollHeight;
      }, 800);
      demoSelect.selectedIndex = 0;
    });
  }

  // Simple contact form handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! We will get back to you shortly.');
      contactForm.reset();
    });
  }
});