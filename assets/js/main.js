// Mansheu Dawah Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    wrapNavActions(); // Wrap hamburger menu in nav-actions
    // injectNavCart(); // Disabled - Publications not ready
    // replaceCartIcons(); // Disabled - Publications not ready
    replaceFooterLogo();
    initializeScrollEffects();
    initializeNewsletter();
    initializeCookies();
    initializeFormValidation();
    initializeAnimations();
    initializeFilters();
    initializeGlobalSearch();
    initializeDailyPoll();
    initializeActionCards();
    initializeBottomNav();
});

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
    // Navbar scroll effect - now uses theme variables
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.menu__bar');
        if (navbar) {
            // Always maintain consistent theme-based styling
            navbar.style.backgroundColor = 'var(--nav-bg)';
        }
    });
    
    // Mobile menu toggle event listener + accessibility
    const menuIcon = document.querySelector('.menu-icon');
    const navigation = document.querySelector('.navigation');
    if (menuIcon && navigation) {
        // Remove any inline onclick to avoid duplicate firing
        try { menuIcon.onclick = null; } catch (e) {}

        // Ensure an id for aria-controls
        if (!navigation.id) navigation.id = 'primary-navigation';

        // A11y attributes for the toggle
        menuIcon.setAttribute('role', 'button');
        menuIcon.setAttribute('tabindex', '0');
        menuIcon.setAttribute('aria-label', 'Menu');
        menuIcon.setAttribute('aria-controls', navigation.id);
        menuIcon.setAttribute('aria-expanded', 'false');
        navigation.setAttribute('aria-hidden', 'true');

        // Click handler
        menuIcon.addEventListener('click', function() {
            toggleMenu(this);
        });

        // Keyboard activation (Enter/Space)
        menuIcon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                toggleMenu(menuIcon);
            }
        });

        // Close on nav link click
        navigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (navigation.classList.contains('navigation--mobile')) {
                    closeMobileMenu(menuIcon, navigation);
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            const isOpen = navigation.classList.contains('navigation--mobile');
            if (!isOpen) return;
            const menuBar = document.querySelector('.menu__bar');
            if (menuBar && !menuBar.contains(e.target)) {
                closeMobileMenu(menuIcon, navigation);
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('navigation--mobile')) {
                closeMobileMenu(menuIcon, navigation);
            }
        });
    }
}

// Wrap hamburger menu in nav-actions container for proper positioning
function wrapNavActions() {
    const menuBar = document.querySelector('.menu__bar');
    if (!menuBar) return;
    // Avoid duplicates
    if (menuBar.querySelector('.nav-actions')) return;

    const directMenuIcon = menuBar.querySelector(':scope > .menu-icon');
    const actions = document.createElement('div');
    actions.className = 'nav-actions';

    if (directMenuIcon) {
        actions.appendChild(directMenuIcon);
    }

    menuBar.appendChild(actions);
}

// Inject cart icon into the header and wrap hamburger + cart on the right
function injectNavCart() {
    const menuBar = document.querySelector('.menu__bar');
    if (!menuBar) return;
    // Avoid duplicates
    if (menuBar.querySelector('.nav-actions')) return;

    const directMenuIcon = menuBar.querySelector(':scope > .menu-icon');
    const actions = document.createElement('div');
    actions.className = 'nav-actions';

    if (directMenuIcon) {
        actions.appendChild(directMenuIcon);
    }

    // Cart/shopping cart feature removed as publications section is no longer available

    menuBar.appendChild(actions);
}

// Return the unified cart SVG used in nav, with adjustable size
// Deprecated (was Bootstrap SVG cart); keeping function name for compatibility
function getCartSvg() { return '<i class="fas fa-cart-shopping"></i>'; }

// Replace any Font Awesome cart icons in static markup for consistency
function replaceCartIcons() {
    try {
        // Replace Bootstrap SVG cart icons with Font Awesome bold cart
        document.querySelectorAll('svg.bi.bi-cart').forEach(svg => {
            svg.outerHTML = '<i class="fas fa-cart-shopping"></i>';
        });

        // Normalize any old shopping-cart classes to the new cart-shopping
        document.querySelectorAll('i.fa-shopping-cart, i.fas.fa-shopping-cart, i.far.fa-shopping-cart').forEach(icon => {
            icon.classList.remove('fa-shopping-cart', 'far');
            if (!icon.classList.contains('fas')) icon.classList.add('fas');
            icon.classList.add('fa-cart-shopping');
        });

        // Observe for dynamically added nodes and normalize
        if (window.MutationObserver) {
            const obs = new MutationObserver(mutations => {
                mutations.forEach(m => {
                    m.addedNodes && m.addedNodes.forEach(node => {
                        if (!(node instanceof Element)) return;
                        if (node.matches && node.matches('svg.bi.bi-cart')) {
                            node.outerHTML = '<i class="fas fa-cart-shopping"></i>';
                        } else {
                            node.querySelectorAll && node.querySelectorAll('svg.bi.bi-cart').forEach(s => {
                                s.outerHTML = '<i class="fas fa-cart-shopping"></i>';
                            });
                            node.querySelectorAll && node.querySelectorAll('i.fa-shopping-cart, i.fas.fa-shopping-cart, i.far.fa-shopping-cart').forEach(ic => {
                                ic.classList.remove('fa-shopping-cart', 'far');
                                if (!ic.classList.contains('fas')) ic.classList.add('fas');
                                ic.classList.add('fa-cart-shopping');
                            });
                        }
                    });
                });
            });
            obs.observe(document.body, { childList: true, subtree: true });
        }
    } catch (_) {}
}

// Replace footer moon icon with the blue site logo image
function replaceFooterLogo() {
    try {
        const logoWrap = document.querySelector('.footer-logo');
        if (!logoWrap) return;
        const moonIcon = logoWrap.querySelector('i.fa-moon, i.fas.fa-moon, i.far.fa-moon');
        if (moonIcon) {
            const inPages = /(^|\/|\\)pages(\/|\\|$)/.test(window.location.pathname);
            const src = inPages ? '../assets/images/logo.svg' : 'assets/images/logo.svg';
            moonIcon.outerHTML = `<img src="${src}" alt="Mansheu Dawah Logo" width="32" height="32">`;
        }
    } catch (_) {}
}

// Mobile menu toggle function
function toggleMenu(menuIcon) {
    const navigation = document.querySelector('.navigation');
    if (!navigation) return;
    const isOpen = navigation.classList.contains('navigation--mobile');
    if (isOpen) {
        closeMobileMenu(menuIcon, navigation);
    } else {
        openMobileMenu(menuIcon, navigation);
    }
}

function openMobileMenu(menuIcon, navigation) {
    navigation.classList.add('navigation--mobile');
    if (menuIcon) {
        menuIcon.classList.add('active');
        menuIcon.setAttribute('aria-expanded', 'true');
    }
    navigation.setAttribute('aria-hidden', 'false');
    // Do not lock body scroll; allow page to remain scrollable
}

function closeMobileMenu(menuIcon, navigation) {
    navigation.classList.remove('navigation--mobile');
    if (menuIcon) {
        menuIcon.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
    navigation.setAttribute('aria-hidden', 'true');
    // No scroll lock class to remove
}

// Ensure global access for inline onclick handlers
if (typeof window !== 'undefined') {
    window.toggleMenu = toggleMenu;
}

// ========================================
// ========================================
// SCROLL EFFECTS
// ========================================
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// NEWSLETTER FUNCTIONALITY
// ========================================
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const newsletterToast = document.getElementById('newsletterToast');

        if (!emailInput || !submitBtn || !newsletterToast) return;

        emailInput.addEventListener('input', function() {
            emailInput.classList.remove('error');
        });

        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                setTimeout(() => {
                    showToast(newsletterToast, 'success', 'Successfully subscribed! Check your email for confirmation.');
                    emailInput.value = '';
                    emailInput.classList.remove('error');
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                emailInput.classList.add('error');
                showToast(newsletterToast, 'error', 'Mission failed, invalid email address.');
                emailInput.focus({ preventScroll: true });
            }
        });
    }
}
// ========================================
// COOKIE BANNER
// ========================================
function initializeCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 2000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('visible');
        });
    }
}

// ========================================
// FORM VALIDATION
// ========================================
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const isNewsletter = form.classList.contains('newsletter-form');
        const isContactForm = form.id === 'contactForm' || form.classList.contains('contact-form');
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (isNewsletter || isContactForm) {
                // Newsletter and contact page have their own validation logic
                return;
            }
            input.addEventListener('blur', function() { validateField(this); });
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) validateField(this);
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    const newsletterWrapper = field.closest('.newsletter-form');
    const newsletterFeedback = newsletterWrapper ? newsletterWrapper.querySelector('.newsletter-feedback') : null;
    
    // Remove existing error states
    field.classList.remove('error');
    if (newsletterFeedback) {
        newsletterFeedback.innerHTML = '';
    } else {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Required field validation
    const requiredEmpty = field.hasAttribute('required') && !value;
    if (requiredEmpty) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// ANIMATIONS
// ========================================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.article-card, .dhikr-card, .publication-card, .resource-card, .section-header'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Counter animations
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide notification
    setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// ISLAMIC PRAYER TIMES (OPTIONAL)
// ========================================
function getPrayerTimes() {
    // This would integrate with an Islamic prayer times API
    // For now, just a placeholder
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Here you would call a prayer times API
            console.log(`Prayer times for location: ${lat}, ${lng}`);
        });
    }
}

// ========================================
// OFFLINE SUPPORT
// ========================================
window.addEventListener('online', function() {
    showNotification('Connection restored', 'success', 3000);
});

window.addEventListener('offline', function() {
    showNotification('No internet connection', 'warning', 5000);
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================
// High contrast mode detection
if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
    document.body.classList.add('high-contrast');
}

// Reduced motion preference
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // You could send this to an error tracking service
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', function() {
    // Log page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// FILTER FUNCTIONALITY
// ========================================
function initializeFilters() {
    // Initialize publication filters
    const publicationFilters = document.querySelectorAll('.publications-filter .filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    const publicationSearch = document.getElementById('publicationsSearch');
    
    // Initialize resource filters  
    const resourceFilters = document.querySelectorAll('.resources-filter .filter-btn');
    const resourceCards = document.querySelectorAll('.course-card, .download-item');
    const resourceSearch = document.getElementById('resourcesSearch');
    
    // Publication filter functionality
    publicationFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            publicationFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            filterItems(publicationCards, filter);
        });
    });
    
    // Resource filter functionality
    resourceFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            resourceFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter resources
            filterItems(resourceCards, filter);
        });
    });
    
    // Publication search functionality
    if (publicationSearch) {
        publicationSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchItems(publicationCards, searchTerm);
        });
    }
    
    // Resource search functionality
    if (resourceSearch) {
        resourceSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchItems(resourceCards, searchTerm);
        });
    }
}

// ========================================
// GLOBAL SEARCH
// ========================================
function initializeGlobalSearch() {
    const searchForms = document.querySelectorAll('.global-search-form');
    if (!searchForms.length) return;

    const STORAGE_KEY = 'md_recent_searches';
    const inPages = /(^|[\\/])pages[\\/]/.test(window.location.pathname);
    const searchPagePath = inPages ? 'search.html' : 'pages/search.html';

    const defaultSuggestions = [
        'morning adhkar',
        'evening adhkar',
        'dhikr and dua',
        'digital counter',
        'islamic articles',
        'names of Allah'
    ];

    const getRecentSearches = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (_) {
            return [];
        }
    };

    const saveSearch = (query) => {
        try {
            const recent = getRecentSearches().filter(q => q.toLowerCase() !== query.toLowerCase());
            recent.unshift(query);
            const trimmed = recent.slice(0, 6);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        } catch (_) {}
    };

    searchForms.forEach(form => {
        const input = form.querySelector('.search-input');
        if (!input) return;

        // Suggestions container
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        form.appendChild(suggestionsContainer);

        const renderSuggestions = () => {
            const recent = getRecentSearches();
            const merged = [...recent, ...defaultSuggestions];
            const seen = new Set();
            const items = merged.filter(q => {
                const key = q.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            }).slice(0, 8);

            if (!items.length) {
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.remove('visible');
                return;
            }

            suggestionsContainer.innerHTML = items.map(text => `
                <button type="button" class="search-suggestion">${text}</button>
            `).join('');
            suggestionsContainer.classList.add('visible');

            suggestionsContainer.querySelectorAll('.search-suggestion').forEach(btn => {
                btn.addEventListener('click', () => {
                    input.value = btn.textContent;
                    suggestionsContainer.classList.remove('visible');
                    form.dispatchEvent(new Event('submit', { cancelable: true }));
                });
            });
        };

        input.addEventListener('focus', renderSuggestions);

        input.addEventListener('input', () => {
            if (!input.value.trim()) {
                renderSuggestions();
            } else {
                suggestionsContainer.classList.remove('visible');
            }
        });

        document.addEventListener('click', (e) => {
            if (!form.contains(e.target)) {
                suggestionsContainer.classList.remove('visible');
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = (input.value || '').trim();
            if (!query) {
                try {
                    showNotification('Please enter a search term.', 'warning', 3000);
                } catch (_) {}
                input.focus();
                return;
            }

            saveSearch(query);
            const url = `${searchPagePath}?q=${encodeURIComponent(query)}`;
            window.location.href = url;
        });
    });
}

// Filter items based on category
function filterItems(items, filter) {
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            const itemCategory = item.getAttribute('data-category') || 
                                item.getAttribute('data-filter') ||
                                item.className;
            
            if (itemCategory && itemCategory.includes(filter)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        }
    });
}

// Search items based on text content
function searchItems(items, searchTerm) {
    items.forEach(item => {
        const title = item.querySelector('.publication-title, .course-title, .download-title');
        const author = item.querySelector('.publication-author, .course-instructor');
        const description = item.querySelector('.publication-description, .course-description, .download-description');
        
        let searchableText = '';
        if (title) searchableText += title.textContent.toLowerCase() + ' ';
        if (author) searchableText += author.textContent.toLowerCase() + ' ';
        if (description) searchableText += description.textContent.toLowerCase() + ' ';
        
        if (searchTerm === '' || searchableText.includes(searchTerm)) {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

// ========================================
// DAILY POLL (Featured Section)
// ========================================
function initializeDailyPoll() {
    const pollElement = document.querySelector('[data-daily-poll]');
    if (!pollElement) return;

    const polls = [
        {
            id: 'quran-habits',
            question: 'Which daily habit keeps you most connected to the Qur\'an?',
            description: 'Share the routine that helps you stay consistent with Allah\'s words each day.',
            options: [
                { id: 'tajweed', label: 'Reciting with tajweed after Fajr' },
                { id: 'tafseer', label: 'Listening to tafseer during commutes' },
                { id: 'study-circle', label: 'Weekly study circle with friends' },
                { id: 'memorisation', label: 'Memorising a new ayah daily' }
            ]
        },
        {
            id: 'community-service',
            question: 'Where do you feel inspired to serve your community most?',
            description: 'Let us know which space pulls your heart toward meaningful service.',
            options: [
                { id: 'masjid', label: 'Organising programs at the masjid' },
                { id: 'youth', label: 'Mentoring youth and teens' },
                { id: 'charity', label: 'Coordinating local charity drives' },
                { id: 'online', label: 'Creating uplifting digital content' }
            ]
        },
        {
            id: 'spiritual-reset',
            question: 'What best helps you reset your iman during a busy week?',
            description: 'Your answer might inspire someone else\'s next spiritual reset.',
            options: [
                { id: 'qiyam', label: 'Late night qiyam sessions' },
                { id: 'nature', label: 'Reflecting on nature and creation' },
                { id: 'mentorship', label: 'Speaking with a mentor or teacher' },
                { id: 'journaling', label: 'Writing duas and reflections in a journal' }
            ]
        }
    ];

    if (!polls.length) return;

    const todayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const activePoll = polls[todayIndex % polls.length];

    const questionEl = pollElement.querySelector('[data-poll-question]');
    const descriptionEl = pollElement.querySelector('[data-poll-description]');
    const optionsEl = pollElement.querySelector('[data-poll-options]');
    const totalEl = pollElement.querySelector('[data-poll-total]');
    const resetBtn = pollElement.querySelector('[data-poll-reset]');
    const dateEl = pollElement.querySelector('[data-poll-date]');

    if (!optionsEl) return;

    const formattedDate = (() => {
        try {
            return new Intl.DateTimeFormat(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }).format(new Date());
        } catch (_) {
            return new Date().toLocaleDateString();
        }
    })();

    if (dateEl) dateEl.textContent = formattedDate;
    if (questionEl) questionEl.textContent = activePoll.question;
    if (descriptionEl) descriptionEl.textContent = activePoll.description;

    const votesKey = `md_poll_votes_${activePoll.id}`;
    const responseKey = `md_poll_response_${activePoll.id}`;

    const loadPollData = () => {
        let parsed;
        try {
            const raw = localStorage.getItem(votesKey);
            if (raw) parsed = JSON.parse(raw);
        } catch (_) {
            parsed = null;
        }

        if (!parsed || typeof parsed !== 'object') {
            parsed = { total: 0, options: {} };
        }

        if (typeof parsed.total !== 'number') {
            parsed.total = 0;
        }

        if (!parsed.options || typeof parsed.options !== 'object') {
            parsed.options = {};
        }

        activePoll.options.forEach(option => {
            if (typeof parsed.options[option.id] !== 'number') {
                parsed.options[option.id] = 0;
            }
        });

        return parsed;
    };

    const savePollData = (data) => {
        try {
            localStorage.setItem(votesKey, JSON.stringify(data));
        } catch (_) {}
    };

    const getUserVote = () => {
        try {
            return localStorage.getItem(responseKey);
        } catch (_) {
            return null;
        }
    };

    const setUserVote = (value) => {
        try {
            if (value) {
                localStorage.setItem(responseKey, value);
            } else {
                localStorage.removeItem(responseKey);
            }
        } catch (_) {}
    };

    let pollData = loadPollData();
    let userVote = getUserVote();

    const updateTotals = () => {
        if (!totalEl) return;
        if (pollData.total > 0) {
            totalEl.textContent = `${pollData.total} ${pollData.total === 1 ? 'vote' : 'votes'}`;
        } else {
            totalEl.textContent = 'Be the first to vote';
        }
    };

    const renderOptions = () => {
        optionsEl.innerHTML = '';
        activePoll.options.forEach(option => {
            const optionId = option.id;
            const optionVotes = pollData.options[optionId] || 0;
            const percentage = pollData.total ? Math.round((optionVotes / pollData.total) * 100) : 0;

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'poll-option';
            if (userVote && userVote !== optionId) {
                button.disabled = true;
            }
            if (userVote === optionId) {
                button.classList.add('selected');
            }

            const header = document.createElement('div');
            header.className = 'poll-option-header';

            const label = document.createElement('span');
            label.className = 'poll-option-label';
            label.textContent = option.label;

            const percentageLabel = document.createElement('span');
            percentageLabel.className = 'poll-option-percentage';
            percentageLabel.textContent = pollData.total ? `${percentage}%` : '';

            header.appendChild(label);
            header.appendChild(percentageLabel);

            const bar = document.createElement('span');
            bar.className = 'poll-option-bar';

            const barFill = document.createElement('span');
            barFill.className = 'poll-option-bar-fill';
            barFill.style.width = pollData.total ? `${percentage}%` : '0%';

            bar.appendChild(barFill);

            button.appendChild(header);
            button.appendChild(bar);

            button.addEventListener('click', () => {
                if (userVote) return;
                recordVote(optionId);
            });

            optionsEl.appendChild(button);
        });

        if (resetBtn) {
            resetBtn.disabled = !userVote;
        }

        updateTotals();
    };

    const recordVote = (optionId) => {
        pollData.total += 1;
        pollData.options[optionId] = (pollData.options[optionId] || 0) + 1;
        savePollData(pollData);
        userVote = optionId;
        setUserVote(optionId);
        renderOptions();
    };

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (!userVote) return;
            const previousVotes = pollData.options[userVote] || 0;
            if (previousVotes > 0) {
                pollData.options[userVote] = previousVotes - 1;
                pollData.total = Math.max(0, pollData.total - 1);
                savePollData(pollData);
            }
            userVote = null;
            setUserVote(null);
            renderOptions();
        });
    }

    renderOptions();
}

// ========================================
// ACTION CARDS (Newsletter & Signup)
// ========================================
function initializeActionCards() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterToast = document.getElementById('newsletterToast');
    
    if (newsletterForm && newsletterToast) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            
            if (!email) {
                showToast(newsletterToast, 'error', 'Please enter your email address.');
                return;
            }
            
            if (validateEmail(email)) {
                // Show success toast
                showToast(newsletterToast, 'success', 'Successfully subscribed! Check your email for confirmation.');
                emailInput.value = '';
            } else {
                // Show error toast
                showToast(newsletterToast, 'error', 'Mission failed, invalid email address');
            }
        });
    }
    
    // Signup Button
    const signupBtn = document.getElementById('signupBtn');
    const signupToast = document.getElementById('signupToast');
    
    if (signupBtn && signupToast) {
        signupBtn.addEventListener('click', function() {
            // Simulate signup action
            showToast(signupToast, 'success', 'Redirecting to signup page...');
            
            // Optional: Redirect after a delay
            setTimeout(() => {
                // window.location.href = 'pages/signup.html';
            }, 1500);
        });
    }
}

function showToast(toastElement, type, message) {
    // Remove existing classes
    toastElement.classList.remove('show', 'success', 'error');
    
    // Set icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    // Set content
    toastElement.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add classes
    toastElement.classList.add('show', type);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 5000);
}

// Export functions for use in other scripts
window.MansheudawahWebsite = {
    showNotification,
    validateEmail,
    debounce,
    throttle
};

// ========================================
// BOTTOM CONTENTS NAVIGATION
// ========================================
function initializeBottomNav() {
    const bottomNav = document.getElementById('bottomContentsNav');
    const toggleBtn = document.getElementById('bottomNavToggle');
    const navBtns = document.querySelectorAll('.bottom-nav-btn');
    
    if (!bottomNav || !toggleBtn) return;
    
    // Toggle navigation panel
    toggleBtn.addEventListener('click', function() {
        bottomNav.classList.toggle('open');
        const isOpen = bottomNav.classList.contains('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Scroll spy - highlight active section
    const sections = Array.from(navBtns).map(btn => {
        const href = btn.getAttribute('href');
        return document.querySelector(href);
    }).filter(Boolean);
    
    function updateActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        let currentSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSection = section;
            }
        });
        
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (currentSection && btn.getAttribute('href') === '#' + currentSection.id) {
                btn.classList.add('active');
            }
        });
    }
    
    // Update on scroll with throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateActiveSection);
    });
    
    // Smooth scroll to section when clicked
    navBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial update
    updateActiveSection();
}
