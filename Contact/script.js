// Contact Page JavaScript

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const faqItems = document.querySelectorAll('.faq-item');

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
        await simulateFormSubmission();
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        contactForm.reset();
        clearValidationStates();
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

function validateForm() {
    let isValid = true;
    const requiredFields = [
        { id: 'firstName', name: 'First Name' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'email', name: 'Email Address' },
        { id: 'subject', name: 'Subject' },
        { id: 'message', name: 'Message' }
    ];
    
    // Clear previous validation states
    clearValidationStates();
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const formGroup = element.closest('.form-group');
        const value = element.value.trim();
        
        if (!value) {
            showFieldError(formGroup, `${field.name} is required`);
            isValid = false;
        } else if (field.id === 'email' && !isValidEmail(value)) {
            showFieldError(formGroup, 'Please enter a valid email address');
            isValid = false;
        } else {
            showFieldSuccess(formGroup);
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function showFieldSuccess(formGroup) {
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearValidationStates() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
}

function showSuccessModal() {
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeModal();
    }, 10000);
}

function closeModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal close handlers
successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

document.querySelector('.close')?.addEventListener('click', closeModal);

// FAQ Functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
});

function validateField(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        const fieldName = field.previousElementSibling.textContent.replace(' *', '');
        showFieldError(formGroup, `${fieldName} is required`);
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(formGroup, 'Please enter a valid email address');
    } else if (value) {
        showFieldSuccess(formGroup);
    }
}

function clearFieldError(e) {
    const formGroup = e.target.closest('.form-group');
    if (formGroup.classList.contains('error')) {
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add scroll class to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.info-card, .testimonial-card, .faq-item, .contact-form, .map-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Character counter for message textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    const maxLength = 1000;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.85rem;
        color: #666;
        margin-top: 5px;
    `;
    
    messageTextarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const remaining = maxLength - messageTextarea.value.length;
        counter.textContent = `${remaining} characters remaining`;
        
        if (remaining < 100) {
            counter.style.color = '#e74c3c';
        } else if (remaining < 200) {
            counter.style.color = '#f39c12';
        } else {
            counter.style.color = '#666';
        }
    }
    
    messageTextarea.addEventListener('input', updateCounter);
    messageTextarea.setAttribute('maxlength', maxLength);
    updateCounter();
}

// Auto-resize textarea
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// Copy contact information
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = '#2ecc71';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add click handlers for contact info
document.addEventListener('DOMContentLoaded', () => {
    const contactInfoElements = document.querySelectorAll('.contact-info p');
    
    contactInfoElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy';
        
        element.addEventListener('click', () => {
            const text = element.textContent.trim();
            copyToClipboard(text, element);
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.closest('.form-group').classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            field.closest('.form-group').classList.remove('focused');
        });
    });
});

// Add CSS for focus effects
const focusStyles = `
    .form-group.focused label {
        color: #3498db;
        transform: scale(0.95);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = focusStyles;
document.head.appendChild(styleSheet);

// Keyboard navigation for FAQ
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('faq-question') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
    }
});

// Make FAQ questions focusable
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    const observer = new MutationObserver(() => {
        const isActive = item.classList.contains('active');
        question.setAttribute('aria-expanded', isActive.toString());
    });
    
    observer.observe(item, { attributes: true, attributeFilter: ['class'] });
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('Contact page error:', e.message);
});

// Performance optimization - lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/intersection-observer@0.12.0/intersection-observer.js';
    document.head.appendChild(script);
}

console.log('Contact page loaded successfully');
