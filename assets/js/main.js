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

    const cart = document.createElement('a');
    cart.className = 'cart-icon';
    cart.title = 'Shopping Cart';
    // Determine correct link target based on current location
    const inPages = /(^|\/|\\)pages(\/|\\|$)/.test(window.location.pathname);
    cart.href = inPages ? 'publications.html' : 'pages/publications.html';
    // Try opening sidebar if available
    cart.addEventListener('click', function(e) {
        if (typeof window.showCartSidebar === 'function') {
            e.preventDefault();
            try { window.showCartSidebar(); } catch(_) {}
        }
    });
    cart.innerHTML = `
        <i class="fas fa-cart-shopping"></i>
        <span class="cart-count">0</span>
    `;
    actions.appendChild(cart);
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

        // Remove any inline messages when user starts typing again
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const group = emailInput.closest('.form-group') || emailInput.parentNode;
                try {
                    group.querySelectorAll('.error-message, .success-message').forEach(n => n.remove());
                } catch (_) {}
                emailInput.classList.remove('error');
            });
        }

        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Inline success below the input/button row
                    const group = emailInput.closest('.form-group') || emailInput.parentNode;
                    // Remove any existing messages
                    try { group.querySelectorAll('.error-message, .success-message').forEach(n => n.remove()); } catch (_) {}
                    const success = document.createElement('div');
                    success.className = 'success-message';
                    success.textContent = 'Thank you for subscribing! You will receive our newsletter shortly.';
                    if (group && group.insertAdjacentElement) {
                        group.insertAdjacentElement('afterend', success);
                    }
                    // Auto-dismiss after a few seconds
                    setTimeout(() => { success.remove(); }, 4000);
                    emailInput.value = '';
                    // Clean any inline errors when successful
                    const inlineErrorInGroup = (emailInput.parentNode && emailInput.parentNode.querySelector('.error-message'));
                    if (inlineErrorInGroup) inlineErrorInGroup.remove();
                    if (group && group.nextElementSibling && group.nextElementSibling.classList && group.nextElementSibling.classList.contains('error-message')) { group.nextElementSibling.remove(); }
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                // Inline error just under the input for newsletter
                validateField(emailInput);
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
    
    // Remove existing error states
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation (do not inject custom text, rely on native UI)
    const requiredEmpty = field.hasAttribute('required') && !value;
    if (requiredEmpty) {
        isValid = false;
        // Intentionally no custom error message
    }
    
    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Show error if invalid; only render a message when we have one (e.g., email format)
    if (!isValid) {
        field.classList.add('error');
        if (errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;

            const isNewsletter = !!field.closest('.newsletter-form');
            if (isNewsletter) {
                const group = field.closest('.form-group') || field.parentNode;
                // Remove any prior inline errors under this group or immediately after the group
                try { group.querySelectorAll('.error-message').forEach(n => n.remove()); } catch (_) {}
                if (group && group.nextElementSibling && group.nextElementSibling.classList && group.nextElementSibling.classList.contains('error-message')) {
                    group.nextElementSibling.remove();
                }
                // Place error after the entire group so it appears under the Subscribe button
                if (group && group.insertAdjacentElement) {
                    group.insertAdjacentElement('afterend', errorElement);
                } else {
                    field.parentNode.appendChild(errorElement);
                }
                // Auto-dismiss the inline error after a few seconds for newsletter form
                setTimeout(() => {
                    try { if (errorElement && errorElement.parentNode) errorElement.remove(); } catch (_) {}
                    field.classList.remove('error');
                }, 4000);
            } else {
                field.parentNode.appendChild(errorElement);
            }
        }
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

// Export functions for use in other scripts
window.MansheudawahWebsite = {
    showNotification,
    validateEmail,
    debounce,
    throttle
};
