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

// Featured Tours Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.tour-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Slider controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
setInterval(nextSlide, 5000);

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');
const searchInput = document.getElementById('searchInput');
const durationFilter = document.getElementById('durationFilter');
const priceFilter = document.getElementById('priceFilter');

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        applyFilters();
    });
});

// Filter by duration and price
durationFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);

// Search functionality
searchInput.addEventListener('input', applyFilters);

function applyFilters() {
    const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const selectedDuration = durationFilter.value;
    const selectedPrice = priceFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    tourCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const duration = parseInt(card.getAttribute('data-duration'));
        const price = parseInt(card.getAttribute('data-price'));
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.tour-description').textContent.toLowerCase();
        const location = card.querySelector('.tour-location').textContent.toLowerCase();
        
        let showCard = true;
        
        // Category filter
        if (activeCategory !== 'all' && category !== activeCategory) {
            showCard = false;
        }
        
        // Duration filter
        if (selectedDuration !== 'all') {
            if (selectedDuration === '1-3' && (duration < 1 || duration > 3)) {
                showCard = false;
            } else if (selectedDuration === '4-7' && (duration < 4 || duration > 7)) {
                showCard = false;
            } else if (selectedDuration === '8-14' && (duration < 8 || duration > 14)) {
                showCard = false;
            } else if (selectedDuration === '15+' && duration < 15) {
                showCard = false;
            }
        }
        
        // Price filter
        if (selectedPrice !== 'all') {
            if (selectedPrice === '0-500' && price > 500) {
                showCard = false;
            } else if (selectedPrice === '500-1000' && (price < 500 || price > 1000)) {
                showCard = false;
            } else if (selectedPrice === '1000-2000' && (price < 1000 || price > 2000)) {
                showCard = false;
            } else if (selectedPrice === '2000+' && price < 2000) {
                showCard = false;
            }
        }
        
        // Search filter
        if (searchTerm && !title.includes(searchTerm) && 
            !description.includes(searchTerm) && !location.includes(searchTerm)) {
            showCard = false;
        }
        
        // Show or hide card
        if (showCard) {
            card.classList.remove('hidden');
            // Add staggered animation
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            }, Math.random() * 200);
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Show "no results" message if no cards are visible
    const visibleCards = document.querySelectorAll('.tour-card:not(.hidden)');
    if (visibleCards.length === 0) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

function showNoResultsMessage() {
    let noResultsMsg = document.querySelector('.no-results-message');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No tours found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
            </div>
        `;
        document.getElementById('toursGrid').appendChild(noResultsMsg);
    }
    noResultsMsg.style.display = 'block';
}

function hideNoResultsMessage() {
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function clearAllFilters() {
    // Reset category filter
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    
    // Reset dropdowns
    durationFilter.value = 'all';
    priceFilter.value = 'all';
    
    // Clear search
    searchInput.value = '';
    
    // Apply filters
    applyFilters();
}

// Book Now functionality
document.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'Book Now' || e.target.textContent.trim() === 'Book') {
        const card = e.target.closest('.tour-card') || e.target.closest('.tour-slide');
        const tourName = card.querySelector('h3').textContent;
        const price = card.querySelector('.tour-price').textContent;
        
        showBookingModal(tourName, price);
    }
    
    if (e.target.textContent.trim() === 'Details') {
        const card = e.target.closest('.tour-card');
        const tourName = card.querySelector('h3').textContent;
        
        showTourDetails(tourName, card);
    }
});

// Booking Modal
function showBookingModal(tourName, price) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content booking-modal">
            <span class="modal-close">&times;</span>
            <h2><i class="fas fa-plane"></i> Book Your Tour</h2>
            <div class="booking-info">
                <h3>${tourName}</h3>
                <p class="booking-price">${price}</p>
            </div>
            <form class="booking-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Travel Date</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Number of Travelers</label>
                        <select required>
                            <option value="">Select...</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5+">5+ People</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Special Requests (Optional)</label>
                    <textarea rows="3" placeholder="Any special requirements or requests..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Continue to Payment</button>
                </div>
            </form>
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
        
        .booking-modal {
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
            color: #666;
        }
        
        .booking-modal h2 {
            background: linear-gradient(135deg, #2c5aa0, #667eea);
            color: white;
            padding: 2rem;
            margin: 0;
            border-radius: 15px 15px 0 0;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .booking-info {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #eee;
        }
        
        .booking-info h3 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .booking-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #2c5aa0;
            margin: 0;
        }
        
        .booking-form {
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
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .booking-modal {
                margin: 10px;
                max-height: 95vh;
            }
            
            .booking-modal h2 {
                padding: 1.5rem;
                font-size: 1.3rem;
            }
            
            .booking-form {
                padding: 1.5rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Handle form submission
    const form = modal.querySelector('.booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your booking request! We will contact you shortly to confirm your reservation and process payment.');
        closeModal();
    });
    
    // Close modal functionality
    setupModalClose(modal);
}

// Tour Details Modal
function showTourDetails(tourName, card) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const image = card.querySelector('img').src;
    const description = card.querySelector('.tour-description').textContent;
    const price = card.querySelector('.tour-price').textContent;
    const location = card.querySelector('.tour-location').textContent;
    const rating = card.querySelector('.tour-rating span').textContent;
    const features = Array.from(card.querySelectorAll('.tour-features span')).map(span => span.textContent);
    
    modal.innerHTML = `
        <div class="modal-content details-modal">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <img src="${image}" alt="${tourName}" class="details-image">
                <div class="details-info">
                    <h2>${tourName}</h2>
                    <p class="details-location">${location}</p>
                    <div class="details-rating">
                        <i class="fas fa-star"></i>
                        <span>${rating}</span>
                    </div>
                    <div class="details-price">${price}</div>
                </div>
            </div>
            <div class="details-body">
                <h3>Tour Description</h3>
                <p>${description}</p>
                
                <h3>Tour Highlights</h3>
                <ul class="highlights-list">
                    ${features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                
                <h3>What's Included</h3>
                <ul class="included-list">
                    <li><i class="fas fa-check"></i> Professional tour guide</li>
                    <li><i class="fas fa-check"></i> All entrance fees</li>
                    <li><i class="fas fa-check"></i> Transportation</li>
                    <li><i class="fas fa-check"></i> Accommodation (where applicable)</li>
                    <li><i class="fas fa-check"></i> Some meals</li>
                    <li><i class="fas fa-check"></i> 24/7 support</li>
                </ul>
                
                <div class="details-actions">
                    <button class="btn btn-outline" onclick="closeModal()">Close</button>
                    <button class="btn btn-primary" onclick="closeModal(); showBookingModal('${tourName}', '${price}')">Book Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Add details modal styles
    const detailsStyles = `
        <style>
        .details-modal {
            background: white;
            border-radius: 15px;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease;
            margin: 20px;
        }
        
        .details-header {
            position: relative;
            height: 300px;
            overflow: hidden;
            border-radius: 15px 15px 0 0;
        }
        
        .details-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .details-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            padding: 2rem;
        }
        
        .details-info h2 {
            margin-bottom: 0.5rem;
        }
        
        .details-location {
            margin-bottom: 0.5rem;
            opacity: 0.9;
        }
        
        .details-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .details-rating i {
            color: #ffc107;
        }
        
        .details-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #ffc107;
        }
        
        .details-body {
            padding: 2rem;
        }
        
        .details-body h3 {
            margin: 1.5rem 0 1rem 0;
            color: #2c5aa0;
        }
        
        .details-body h3:first-child {
            margin-top: 0;
        }
        
        .highlights-list,
        .included-list {
            list-style: none;
            margin: 1rem 0;
        }
        
        .highlights-list li,
        .included-list li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .highlights-list i,
        .included-list i {
            color: #27ae60;
        }
        
        .details-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .details-actions .btn {
            flex: 1;
        }
        
        @media (max-width: 768px) {
            .details-modal {
                margin: 10px;
                max-height: 95vh;
            }
            
            .details-header {
                height: 250px;
            }
            
            .details-info {
                padding: 1.5rem;
            }
            
            .details-body {
                padding: 1.5rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', detailsStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
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
        alert('Thank you for subscribing! You will receive updates about new tours and special offers.');
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

// Observe tour cards and other elements
document.querySelectorAll('.tour-card, .benefit-card, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// Scroll animations for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.tours-hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    // Add staggered animation to tour cards
    tourCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
    });
});
