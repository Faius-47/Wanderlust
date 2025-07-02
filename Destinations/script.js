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

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');
const searchInput = document.getElementById('searchInput');

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        destinationCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
                // Add animation delay for staggered effect
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, Math.random() * 200);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    destinationCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.destination-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // If search is cleared, apply current filter
    if (searchTerm === '') {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        destinationCards.forEach(card => {
            if (activeFilter === 'all' || card.getAttribute('data-category') === activeFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
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
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all destination cards
destinationCards.forEach(card => {
    observer.observe(card);
});

// Newsletter subscription
const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.querySelector('.newsletter .btn-primary');

subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    
    if (email === '') {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate subscription process
    subscribeBtn.textContent = 'Subscribing...';
    subscribeBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for subscribing! You will receive exclusive travel deals soon.');
        emailInput.value = '';
        subscribeBtn.textContent = 'Subscribe';
        subscribeBtn.disabled = false;
    }, 1500);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Book Now button functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.trim() === 'Book Now') {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.destination-card');
            const destination = card.querySelector('h3').textContent;
            const price = card.querySelector('.price-tag').textContent;
            
            alert(`Booking process initiated for ${destination}\n${price}\n\nYou will be redirected to the booking page.`);
        });
    }
});

// Learn More button functionality
document.querySelectorAll('.btn-outline').forEach(button => {
    if (button.textContent.trim() === 'Learn More') {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.destination-card');
            const destination = card.querySelector('h3').textContent;
            
            // Create modal or redirect to detailed page
            showDestinationModal(destination, card);
        });
    }
});

// Modal functionality for destination details
function showDestinationModal(destination, card) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const description = card.querySelector('.destination-description').textContent;
    const price = card.querySelector('.price-tag').textContent;
    const rating = card.querySelector('.rating span').textContent;
    const image = card.querySelector('.destination-img').src;
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-header">
                <img src="${image}" alt="${destination}" class="modal-image">
                <div class="modal-info">
                    <h2>${destination}</h2>
                    <div class="modal-rating">
                        <i class="fas fa-star"></i>
                        <span>${rating}</span>
                    </div>
                    <div class="modal-price">${price}</div>
                </div>
            </div>
            <div class="modal-body">
                <h3>About This Destination</h3>
                <p>${description}</p>
                <p>This incredible destination offers a perfect blend of culture, adventure, and relaxation. With our carefully curated itinerary, you'll experience the best that ${destination} has to offer, from iconic landmarks to hidden gems known only to locals.</p>
                
                <h3>What's Included</h3>
                <ul>
                    <li><i class="fas fa-check"></i> Round-trip flights</li>
                    <li><i class="fas fa-check"></i> Accommodation</li>
                    <li><i class="fas fa-check"></i> Daily breakfast</li>
                    <li><i class="fas fa-check"></i> Guided tours</li>
                    <li><i class="fas fa-check"></i> 24/7 support</li>
                </ul>
                
                <div class="modal-actions">
                    <button class="btn btn-primary btn-large">Book This Trip</button>
                    <button class="btn btn-outline">Contact Us</button>
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
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
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
        
        .modal-header {
            position: relative;
            height: 250px;
            overflow: hidden;
            border-radius: 15px 15px 0 0;
        }
        
        .modal-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .modal-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            padding: 2rem;
        }
        
        .modal-info h2 {
            margin-bottom: 0.5rem;
        }
        
        .modal-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .modal-rating i {
            color: #ffc107;
        }
        
        .modal-price {
            font-size: 1.2rem;
            font-weight: 600;
            color: #3498db;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-body h3 {
            margin: 1.5rem 0 1rem 0;
            color: #2c5aa0;
        }
        
        .modal-body ul {
            list-style: none;
            margin: 1rem 0;
        }
        
        .modal-body li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .modal-body li i {
            color: #27ae60;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .btn-large {
            padding: 1rem 2rem;
            font-size: 1rem;
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
            .modal-content {
                margin: 20px;
                max-width: calc(100% - 40px);
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Scroll animations for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.destinations-hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    // Add staggered animation to destination cards
    destinationCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
    });
});

// Add smooth scroll behavior to the whole page
document.documentElement.style.scrollBehavior = 'smooth';
