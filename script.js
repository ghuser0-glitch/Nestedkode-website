// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.getElementById('backToTop');
const faqQuestions = document.querySelectorAll('.faq-question');
const chatToggle = document.querySelector('.chat-toggle');
const chatBox = document.querySelector('.chat-box');
const chatClose = document.querySelector('.chat-close');
const contactForm = document.getElementById('contactForm');
const animateElements = document.querySelectorAll('.animate-on-scroll');

// Counter animation for stats
const counter1 = document.getElementById('counter1');
const counter2 = document.getElementById('counter2');

// Header scroll effect
window.addEventListener('scroll', () => {
    // Add/remove scrolled class to header
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ accordion
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all FAQ items
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.style.maxHeight = null;
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Chat widget
chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const business = contactForm.querySelectorAll('input[type="text"]')[1].value;
        
        // In a real app, you would send this data to a server
        console.log('Form submitted:', { name, email, business });
        
        // Show success message
        alert(`Thank you ${name}! We'll contact you within 24 hours to start your 72-hour website.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Counter animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate elements on scroll
function animateOnScroll() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
            
            // Animate counters when they come into view
            if (element.classList.contains('hero-stats')) {
                if (!counter1.hasAttribute('data-animated')) {
                    counter1.setAttribute('data-animated', 'true');
                    animateCounter(counter1, 72, 1500);
                    animateCounter(counter2, 100, 1500);
                }
            }
        }
    });
}

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initial animation for elements already in view
    animateOnScroll();
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to CTA buttons
    document.querySelectorAll('.cta-buttons .btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Add typing effect to hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing after a brief delay
        setTimeout(typeWriter, 500);
    }
    
    // Add parallax effect to background circles
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.bg-circle').forEach((circle, index) => {
            const speed = 0.05 + (index * 0.02);
            const xMove = (x * speed * 100) - 50;
            const yMove = (y * speed * 100) - 50;
            
            circle.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });
});

// Add smooth scrolling for anchor links
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

// Initialize tooltips for social icons
document.querySelectorAll('.social-links a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
        this.setAttribute('title', `Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Show a welcome message in console (optional)
    console.log('%c⚡ 72-Hour Websites - Ready to build your website!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
    console.log('%cPay only after approval • No upfront payment • 72-hour delivery', 'color: #64748b;');
});