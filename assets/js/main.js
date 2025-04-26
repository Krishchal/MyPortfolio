/**
 * Main JavaScript File
 * Author: Krishchal Regmi
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    
    // Mobile Navigation Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking a nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Animation on scroll
        animateOnScroll();
    });
    
    // Animate elements when they are in viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-header, .skills-content, .about-content, .experience-content, .education-content, .projects-content, .contact-content, .skill-item, .project-card, .education-item, .timeline-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send the form data to a server
            // For this static website, we'll just show a success message
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Show form submission message
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add the message to the form
        contactForm.appendChild(messageElement);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add dynamic year to footer
    const yearElement = document.querySelector('.footer-text p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});
