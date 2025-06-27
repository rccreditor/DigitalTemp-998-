// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto slide change
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Form submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Newsletter form
const newsletterForm = document.querySelector('.footer-newsletter form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .service-card, .about-image, .about-content, .portfolio-item, .contact-content, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .about-image, .about-content, .portfolio-item, .contact-content, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

// Initialize animations
animateOnScroll();
document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("nexusUser"));
  
    const loginBtn = document.getElementById("login-btn");
    const userNav = document.getElementById("user-nav");
    const userNameSpan = document.getElementById("username");
  
    if (userData && loginBtn && userNav && userNameSpan) {
      // Hide "Get Started", show user info
      loginBtn.style.display = "none";
      userNav.style.display = "flex";
      userNameSpan.innerText = userData.name;
  
      // Toggle dropdown
      const avatar = document.querySelector(".user-avatar");
      const dropdown = document.querySelector(".dropdown-menu");
  
      avatar.addEventListener("click", () => {
        dropdown.classList.toggle("show");
      });
  
      // Logout
      document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("nexusUser");
        window.location.href = "index.html";
      });
    }
  });
// Client logos carousel
document.addEventListener('DOMContentLoaded', function() {
    const logosContainer = document.querySelector('.client-logos');
    const logos = document.querySelectorAll('.client-logos img');
    
    // Clone the logos for seamless looping
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        logosContainer.appendChild(clone);
    });
    
    // Pause/play on hover
    logosContainer.addEventListener('mouseenter', () => {
        logosContainer.style.animationPlayState = 'paused';
    });
    
    logosContainer.addEventListener('mouseleave', () => {
        logosContainer.style.animationPlayState = 'running';
    });
});
// Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = {
        initialized: false,
        init: function() {
            if (this.initialized) return;
            this.initialized = true;
            
            // DOM elements
            this.sphere = document.querySelector('.chatbot-sphere');
            this.chatWindow = document.querySelector('.chatbot-window');
            this.messagesContainer = document.querySelector('.chatbot-messages');
            this.inputField = document.querySelector('.chatbot-text-input');
            this.sendButton = document.querySelector('.chatbot-send');
            this.sphereContainer = document.querySelector('.chatbot-sphere-container');
            
            // Initialize
            this.setupEventListeners();
            this.showWelcomeMessage();
        },
        
        setupEventListeners: function() {
            // Sphere toggle
            this.sphere.addEventListener('click', this.toggleChat.bind(this));
            
            // Quick questions (with event delegation)
            document.querySelector('.chatbot-quick-questions').addEventListener('click', (e) => {
                if (e.target.classList.contains('quick-question')) {
                    this.handleQuickQuestion(e.target.textContent);
                    e.target.disabled = true; // Disable button after click
                    setTimeout(() => e.target.disabled = false, 1000);
                }
            });
            
            // Message submission
            this.sendButton.addEventListener('click', this.handleUserMessage.bind(this));
            this.inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserMessage();
            });
            // Close button
            const closeBtn = document.querySelector('.chatbot-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.sphereContainer.classList.remove('open');
                });
            }
        },
        
        toggleChat: function() {
            this.sphereContainer.classList.toggle('open');
        },
        
        showWelcomeMessage: function() {
            this.addMessage("Hello! I'm your Nexus Digital assistant. How can I help you today?", false);
        },
        
        addMessage: function(text, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-message', isUser ? 'user' : 'bot');
            messageDiv.innerHTML = `<p>${text}</p>`;
            this.messagesContainer.appendChild(messageDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        },
        
        handleQuickQuestion: function(question) {
            this.addMessage(question, true);
            this.processQuestion(question.toLowerCase());
        },
        
        handleUserMessage: function() {
            const message = this.inputField.value.trim();
            if (message) {
                this.addMessage(message, true);
                this.inputField.value = '';
                this.processQuestion(message.toLowerCase());
            }
        },
        
        processQuestion: function(question) {
            // Response database
            const responses = {
                "services": "We offer comprehensive digital marketing services including:<br><br>" +
                           "• SEO Optimization<br>" +
                           "• PPC Advertising<br>" +
                           "• Social Media Marketing<br>" +
                           "• Content Marketing<br>" +
                           "• Email Marketing<br>" +
                           "• Analytics & Reporting<br><br>" +
                           "Visit our Services page for details!",
                "pricing": "Our pricing is customized based on your specific needs. " +
                          "We offer flexible packages to suit different budgets. " +
                          "Contact us for a free consultation and quote!",
                "contact": "You can reach our support team:<br><br>" +
                           "• Email: support@nexusdigital.com<br>" +
                           "• Phone: +1 (555) 123-4567<br>" +
                           "• Hours: Mon-Fri, 9am-6pm EST",
                "default": "I'm still learning! For more complex questions, please email us at info@nexusdigital.com"
            };
            
            // Determine response
            let response = responses.default;
            if (question.includes('service') || question.includes('offer')) response = responses.services;
            else if (question.includes('pric') || question.includes('cost')) response = responses.pricing;
            else if (question.includes('contact') || question.includes('support')) response = responses.contact;
            
            // Simulate typing delay
            setTimeout(() => this.addMessage(response, false), 800);
        }
    };
    
    // Initialize chatbot
    chatbot.init();
});