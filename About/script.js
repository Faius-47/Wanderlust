// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const prevTestimonialBtn = document.querySelector('.testimonial-controls .prev-btn');
const nextTestimonialBtn = document.querySelector('.testimonial-controls .next-btn');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current testimonial
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Testimonial controls
nextTestimonialBtn.addEventListener('click', nextTestimonial);
prevTestimonialBtn.addEventListener('click', prevTestimonial);

// Dot navigation for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 6000);

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Animate counters if they exist
            const counters = entry.target.querySelectorAll('.stat h3');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    const text = counter.textContent;
                    let target = parseInt(text.replace(/[^\d]/g, ''));
                    
                    // Handle special cases
                    if (text.includes('50,000')) target = 50000;
                    else if (text.includes('100')) target = 100;
                    else if (text.includes('500')) target = 500;
                    else if (text.includes('4.9')) {
                        // Handle rating separately
                        let start = 0;
                        const targetRating = 4.9;
                        const increment = targetRating / 100;
                        
                        function updateRating() {
                            start += increment;
                            if (start < targetRating) {
                                counter.textContent = start.toFixed(1) + '/5';
                                requestAnimationFrame(updateRating);
                            } else {
                                counter.textContent = '4.9/5';
                            }
                        }
                        updateRating();
                        counter.classList.add('animated');
                        return;
                    }
                    
                    if (target > 0) {
                        counter.textContent = '0';
                        animateCounter(counter, target);
                        
                        // Add the suffix back after animation
                        setTimeout(() => {
                            if (text.includes('50,000')) counter.textContent = '50,000+';
                            else if (text.includes('100')) counter.textContent = '100+';
                            else if (text.includes('500')) counter.textContent = '500+';
                        }, 2000);
                        
                        counter.classList.add('animated');
                    }
                }
            });
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.story-content, .mission-card, .vision-card, .value-card, .team-member, .achievement-card, .feature-item').forEach(element => {
    observer.observe(element);
});

// Observe story stats separately for counter animation
document.querySelectorAll('.story-stats').forEach(element => {
    observer.observe(element);
});

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0) scale(1)';
    });
});

// Achievement cards animation
document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
    });
});

// Value cards interactive effects
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.value-icon');
        icon.style.transform = 'scale(1.1) rotateY(180deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.value-icon');
        icon.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// CTA Button functionality
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        
        if (buttonText === 'Contact Us') {
            // Simulate contact form or redirect
            showContactModal();
        } else if (buttonText === 'View Our Tours') {
            // Redirect to tours page
            window.location.href = '../Tours/index.html';
        }
    });
});

// Contact Modal
function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content contact-modal">
            <span class="modal-close">&times;</span>
            <h2><i class="fas fa-envelope"></i> Contact Us</h2>
            <p>We'd love to hear from you! Get in touch and let us help plan your next adventure.</p>
            <form class="contact-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <select required>
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Assistance</option>
                        <option value="custom">Custom Trip Planning</option>
                        <option value="group">Group Travel</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="5" required placeholder="Tell us about your travel dreams..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
            </form>
            <div class="contact-info-modal">
                <h3>Other Ways to Reach Us</h3>
                <div class="contact-methods">
                    <div class="contact-method">
                        <i class="fas fa-phone"></i>
                        <div>
                            <h4>Phone</h4>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div class="contact-method">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <h4>Email</h4>
                            <p>info@wanderlust.com</p>
                        </div>
                    </div>
                    <div class="contact-method">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Address</h4>
                            <p>123 Travel St, Adventure City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .contact-modal {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
            margin: 20px;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .contact-modal h2 {
            background: linear-gradient(135deg, #2c5aa0, #667eea);
            color: white;
            padding: 2rem;
            margin: 0;
            border-radius: 15px 15px 0 0;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .contact-modal > p {
            padding: 1.5rem 2rem 0;
            color: #666;
            margin: 0;
        }
        
        .contact-form {
            padding: 2rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #2c5aa0;
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .form-actions .btn {
            flex: 1;
        }
        
        .contact-info-modal {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 0 0 15px 15px;
            border-top: 1px solid #eee;
        }
        
        .contact-info-modal h3 {
            margin-bottom: 1.5rem;
            color: #2c5aa0;
        }
        
        .contact-methods {
            display: grid;
            gap: 1rem;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .contact-method i {
            width: 40px;
            height: 40px;
            background: #2c5aa0;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .contact-method h4 {
            margin: 0 0 0.3rem 0;
            color: #333;
        }
        
        .contact-method p {
            margin: 0;
            color: #666;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .contact-modal {
                margin: 10px;
                max-height: 95vh;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Handle form submission
    const form = modal.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        closeModal();
    });
    
    // Close modal functionality
    setupModalClose(modal);
}

// Modal close functionality
function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.about-hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.story-text, .mission-card, .vision-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(element);
});

// Loading animation
window.addEventListener('load', () => {
    // Add staggered animation to team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
    });
    
    // Add staggered animation to value cards
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
