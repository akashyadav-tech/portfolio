// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.project-card');
const timelineItems = document.querySelectorAll('.timeline-item');

// ===== Set Current Year in Footer =====
currentYearSpan.textContent = new Date().getFullYear();

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.innerHTML = navLinksContainer.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== Smooth Scrolling =====
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

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Animate skill bars when in viewport
    animateSkillBars();
    
    // Animate timeline items when in viewport
    animateTimelineItems();
});

// ===== Update Active Nav Link on Scroll =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Animate Skill Bars =====
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        }
    });
}

// ===== Animate Timeline Items =====
function animateTimelineItems() {
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
}

// ===== Initialize Animation States =====
function initAnimations() {
    // Set initial state for skill bars
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Set initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial state for project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations on load
    setTimeout(() => {
        animateSkillBars();
        animateTimelineItems();
        
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }, 500);
}

// ===== Form Validation =====
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Get error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');
    
    // Reset previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Validation flags
    let isValid = true;
    
    // Name validation
    if (name === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Subject validation
    if (subject === '') {
        subjectError.textContent = 'Subject is required';
        isValid = false;
    } else if (subject.length < 3) {
        subjectError.textContent = 'Subject must be at least 3 characters';
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    // If form is valid, show success message and reset form
    if (isValid) {
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.classList.add('success');
        
        // Add animation to success message
        formMessage.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Reset form
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
        }, 5000);
    } else {
        formMessage.textContent = 'Please fix the errors above.';
        formMessage.classList.add('error');
        formMessage.style.animation = 'fadeInUp 0.5s ease-out';
    }
});

// ===== Hover Effects for Buttons =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-primary') || !this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-card, .certification-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('.social-icons a, .home-social a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add typing effect to name
    const nameElement = document.querySelector('.name');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < nameText.length) {
            nameElement.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Show cursor after typing
            document.querySelector('.typing-cursor').style.display = 'inline-block';
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
projectCards.forEach(card => {
    observer.observe(card);
});

// ===== Add CSS for Ripple Effect =====
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

