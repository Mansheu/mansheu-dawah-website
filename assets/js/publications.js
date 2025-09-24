// Publications page functionality

// Shopping cart data
let shoppingCart = {
    items: [],
    total: 0
};

// Wishlist data
let wishlist = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePublications();
    loadCartFromStorage();
    loadWishlistFromStorage();
    updateCartDisplay();
});

// ========================================
// PUBLICATIONS INITIALIZATION
// ========================================
function initializePublications() {
    initializeCategoryFilters();
    initializeSearchFunctionality();
    initializeCartFunctionality();
    initializeWishlistFunctionality();
    loadPublicationsFromStorage();
}

function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterPublications(category);
        });
    });
}

function filterPublications(category) {
    const publicationCards = document.querySelectorAll('.publication-card');
    
    publicationCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
    
    // Update results count
    updateResultsCount(category);
}

function updateResultsCount(category) {
    const publicationCards = document.querySelectorAll('.publication-card');
    let visibleCount = 0;
    
    publicationCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            visibleCount++;
        }
    });
    
    showNotification(`Showing ${visibleCount} publications`, 'info', 2000);
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.querySelector('.search-form');
    const searchFilters = document.querySelectorAll('.filter-btn');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 500));
    }
    
    searchFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            searchFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            performSearch();
        });
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const activeFilter = document.querySelector('.filter-btn.active');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !activeFilter || !searchResults) return;
    
    const query = searchInput.value.toLowerCase().trim();
    const filter = activeFilter.getAttribute('data-filter');
    
    if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
    }
    
    // Show loading state
    searchResults.innerHTML = '<div class="search-loading">Searching publications...</div>';
    
    // Simulate search delay
    setTimeout(() => {
        const results = searchPublications(query, filter);
        displaySearchResults(results);
    }, 500);
}

function searchPublications(query, filter) {
    // In a real application, this would search a database
    const sampleResults = [
        {
            id: 'quran-commentary',
            title: 'Understanding the Quran: A Contemporary Commentary',
            author: 'Dr. Abdullah Mansheu',
            category: 'Quran Studies',
            price: 24.99,
            type: 'book',
            rating: 4.9,
            description: 'A comprehensive guide to understanding the Quran in modern context...'
        },
        {
            id: 'tafsir-quran',
            title: 'Tafsir al-Qur\'an al-Kareem',
            author: 'Imam Muhammad Mansheu',
            category: 'Quran Studies',
            price: 19.99,
            type: 'book',
            rating: 4.7,
            description: 'Classical Quranic commentary with modern explanations...'
        },
        {
            id: '40-hadith',
            title: '40 Hadith for Daily Life',
            author: 'Dr. Aisha Mansheu',
            category: 'Hadith Collections',
            price: 15.99,
            type: 'book',
            rating: 4.8,
            description: 'Essential hadith collection for everyday guidance...'
        },
        {
            id: 'daily-duas',
            title: 'Daily Du\'as and Adhkar',
            author: 'Mansheu Dawah Team',
            category: 'Free Resources',
            price: 0,
            type: 'ebook',
            rating: 4.8,
            description: 'Comprehensive collection of daily Islamic supplications...'
        },
        {
            id: 'audio-quran',
            title: 'Quran Recitation with Translation',
            author: 'Qari Abdul Rahman',
            category: 'Audio Books',
            price: 25.99,
            type: 'audio',
            rating: 5.0,
            description: 'Beautiful Quranic recitation with English translation...'
        }
    ];
    
    return sampleResults.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) ||
                           item.author.toLowerCase().includes(query) ||
                           item.category.toLowerCase().includes(query) ||
                           item.description.toLowerCase().includes(query);
        
        const matchesFilter = filter === 'all' ||
                            (filter === 'books' && item.type === 'book') ||
                            (filter === 'ebooks' && item.type === 'ebook') ||
                            (filter === 'audio' && item.type === 'audio') ||
                            (filter === 'free' && item.price === 0);
        
        return matchesQuery && matchesFilter;
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <h4>No publications found</h4>
                <p>Try adjusting your search terms or filters.</p>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(item => `
        <div class="search-result-item">
            <div class="result-info">
                <h4 class="result-title">${item.title}</h4>
                <p class="result-author">By ${item.author}</p>
                <p class="result-category">${item.category}</p>
                <div class="result-rating">
                    ${generateStarRating(item.rating)}
                    <span>${item.rating}/5</span>
                </div>
            </div>
            <div class="result-actions">
                <div class="result-price">
                    ${item.price === 0 ? '<span class="price-free">Free</span>' : `$${item.price}`}
                </div>
                <button class="btn btn-sm btn-primary" onclick="addToCart('${item.id}')">
                    ${item.price === 0 ? 'Download' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <div class="search-results-header">
            <h4>Search Results (${results.length})</h4>
        </div>
        <div class="search-results-list">
            ${resultsHTML}
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return `<div class="stars">${starsHTML}</div>`;
}

// ========================================
// SHOPPING CART FUNCTIONALITY
// ========================================
function initializeCartFunctionality() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            closeCart();
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            if (!cartSidebar.contains(e.target) && !e.target.closest('[onclick*="addToCart"]')) {
                closeCart();
            }
        }
    });
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Check if item already in cart
    const existingItem = shoppingCart.items.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.items.push({
            id: productId,
            title: product.title,
            author: product.author,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    updateCartTotal();
    saveCartToStorage();
    updateCartDisplay();
    showCartSidebar();
    
    showNotification(`${product.title} added to cart!`, 'success');
}

function removeFromCart(productId) {
    shoppingCart.items = shoppingCart.items.filter(item => item.id !== productId);
    updateCartTotal();
    saveCartToStorage();
    updateCartDisplay();
    
    if (shoppingCart.items.length === 0) {
        closeCart();
    }
    
    showNotification('Item removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
    const item = shoppingCart.items.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartTotal();
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

function updateCartTotal() {
    shoppingCart.total = shoppingCart.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartContent) return;
    
    if (shoppingCart.items.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h4>Your cart is empty</h4>
                <p>Add some publications to get started!</p>
            </div>
        `;
    } else {
        const cartItemsHTML = shoppingCart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h5 class="cart-item-title">${item.title}</h5>
                    <p class="cart-item-author">${item.author}</p>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        cartContent.innerHTML = cartItemsHTML;
    }
    
    if (cartTotal) {
        cartTotal.textContent = shoppingCart.total.toFixed(2);
    }
}

function showCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function proceedToCheckout() {
    if (shoppingCart.items.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // In a real application, this would redirect to checkout page
    showNotification('Redirecting to checkout...', 'info');
    
    // Simulate checkout process
    setTimeout(() => {
        showNotification('Thank you for your order! You will receive a confirmation email shortly.', 'success', 5000);
        shoppingCart.items = [];
        shoppingCart.total = 0;
        saveCartToStorage();
        updateCartDisplay();
        closeCart();
    }, 2000);
}

// ========================================
// WISHLIST FUNCTIONALITY
// ========================================
function initializeWishlistFunctionality() {
    // Initialize wishlist UI updates
    updateWishlistButtons();
}

function addToWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Check if already in wishlist
    if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
        return;
    }
    
    wishlist.push(productId);
    saveWishlistToStorage();
    updateWishlistButtons();
    
    showNotification(`${product.title} added to wishlist!`, 'success');
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlistToStorage();
    updateWishlistButtons();
    
    const product = getProductById(productId);
    showNotification(`${product?.title || 'Item'} removed from wishlist`, 'info');
}

function updateWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('[onclick*="addToWishlist"]');
    
    wishlistButtons.forEach(button => {
        const productId = button.getAttribute('onclick').match(/'([^']+)'/)?.[1];
        if (productId && wishlist.includes(productId)) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('wishlisted');
            button.setAttribute('title', 'Remove from Wishlist');
        } else {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('wishlisted');
            button.setAttribute('title', 'Add to Wishlist');
        }
    });
}

// ========================================
// PRODUCT ACTIONS
// ========================================
function previewBook(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Create preview modal
    const modal = document.createElement('div');
    modal.className = 'book-preview-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePreviewModal()"></div>
        <div class="modal-content book-preview">
            <div class="modal-header">
                <h3>${product.title}</h3>
                <button onclick="closePreviewModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-content">
                    <div class="preview-pages">
                        <div class="preview-page active">
                            <h4>Table of Contents</h4>
                            <ul>
                                <li>Chapter 1: Introduction to Islamic Studies</li>
                                <li>Chapter 2: Understanding the Quran</li>
                                <li>Chapter 3: Hadith and Sunnah</li>
                                <li>Chapter 4: Islamic Jurisprudence</li>
                                <li>Chapter 5: Islamic Ethics and Morality</li>
                            </ul>
                        </div>
                        <div class="preview-page">
                            <h4>Sample Chapter</h4>
                            <p>In the name of Allah, the Most Gracious, the Most Merciful...</p>
                            <p>This book aims to provide readers with a comprehensive understanding of Islamic principles and practices in the modern world...</p>
                        </div>
                    </div>
                    <div class="preview-navigation">
                        <button onclick="previousPreviewPage()" class="btn btn-outline">
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <span class="page-indicator">1 of 2</span>
                        <button onclick="nextPreviewPage()" class="btn btn-outline">
                            Next <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="addToCart('${productId}')">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart - $${product.price}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closePreviewModal() {
    const modal = document.querySelector('.book-preview-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function downloadFreeBook(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    showNotification('Preparing download...', 'info');
    
    // Simulate download process
    setTimeout(() => {
        // In a real application, this would trigger an actual download
        showNotification(`${product.title} downloaded successfully!`, 'success');
        
        // Create a temporary download link (simulation)
        const downloadLink = document.createElement('a');
        downloadLink.href = '#';
        downloadLink.download = `${product.title}.pdf`;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }, 1500);
}

function playPreview(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    showNotification('Loading audio preview...', 'info');
    
    // Simulate audio preview
    setTimeout(() => {
        showNotification('Audio preview started. This is a sample implementation.', 'success');
        
        // In a real application, this would play an actual audio preview
        const audioModal = document.createElement('div');
        audioModal.className = 'audio-preview-modal';
        audioModal.innerHTML = `
            <div class="modal-overlay" onclick="closeAudioPreview()"></div>
            <div class="modal-content audio-preview">
                <div class="modal-header">
                    <h3>Audio Preview - ${product.title}</h3>
                    <button onclick="closeAudioPreview()" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="audio-player">
                        <div class="audio-controls">
                            <button class="play-btn" onclick="toggleAudioPreview()">
                                <i class="fas fa-play"></i>
                            </button>
                            <div class="audio-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                                <div class="time-display">0:00 / 3:45</div>
                            </div>
                        </div>
                        <div class="audio-info">
                            <p>Sample: Surah Al-Fatiha with English translation</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(audioModal);
        setTimeout(() => audioModal.classList.add('show'), 100);
    }, 1000);
}

function closeAudioPreview() {
    const modal = document.querySelector('.audio-preview-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// ========================================
// LOAD MORE FUNCTIONALITY
// ========================================
function loadMorePublications() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const publicationsContainer = document.querySelector('.publications-container');
    
    if (!loadMoreBtn || !publicationsContainer) return;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more publications
    setTimeout(() => {
        const morePublications = generateMorePublications();
        publicationsContainer.innerHTML += morePublications;
        
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Publications';
        loadMoreBtn.disabled = false;
        
        showNotification('More publications loaded', 'success');
        
        // Update wishlist buttons for new items
        updateWishlistButtons();
    }, 2000);
}

function generateMorePublications() {
    const moreBooks = [
        {
            id: 'islamic-ethics',
            title: 'Islamic Ethics in Modern Society',
            author: 'Dr. Zahra Mansheu',
            category: 'theology',
            price: 21.99,
            rating: 4.6,
            format: 'Paperback'
        },
        {
            id: 'prophet-companions',
            title: 'Stories of the Prophet\'s Companions',
            author: 'Sheikh Ali Mansheu',
            category: 'biography',
            price: 18.99,
            rating: 4.8,
            format: 'Hardcover'
        },
        {
            id: 'children-prayers',
            title: 'My First Book of Islamic Prayers',
            author: 'Ustadha Khadijah Mansheu',
            category: 'children',
            price: 12.99,
            rating: 4.9,
            format: 'Illustrated'
        }
    ];
    
    return moreBooks.map(book => `
        <div class="publication-card" data-category="${book.category}">
            <div class="publication-image">
                <img src="/assets/images/book-${book.id}.jpg" alt="${book.title}" loading="lazy">
                <div class="publication-format">${book.format}</div>
            </div>
            <div class="publication-content">
                <div class="publication-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</div>
                <h3 class="publication-title">${book.title}</h3>
                <p class="publication-author">By ${book.author}</p>
                <div class="publication-rating">
                    ${generateStarRating(book.rating)}
                    <span class="rating-text">${book.rating}/5</span>
                </div>
                <div class="publication-pricing">
                    <span class="price-current">$${book.price}</span>
                </div>
                <div class="publication-actions">
                    <button class="btn btn-sm btn-primary" onclick="addToCart('${book.id}')">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-sm btn-icon" onclick="addToWishlist('${book.id}')" title="Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function getProductById(productId) {
    // In a real application, this would fetch from a database
    const products = {
        'quran-commentary': {
            title: 'Understanding the Quran: A Contemporary Commentary',
            author: 'Dr. Abdullah Mansheu',
            price: 24.99,
            image: '/assets/images/book-quran-commentary.jpg'
        },
        'tafsir-quran': {
            title: 'Tafsir al-Qur\'an al-Kareem',
            author: 'Imam Muhammad Mansheu',
            price: 19.99,
            image: '/assets/images/book-tafsir.jpg'
        },
        '40-hadith': {
            title: '40 Hadith for Daily Life',
            author: 'Dr. Aisha Mansheu',
            price: 15.99,
            image: '/assets/images/book-hadith-40.jpg'
        },
        'daily-duas': {
            title: 'Daily Du\'as and Adhkar',
            author: 'Mansheu Dawah Team',
            price: 0,
            image: '/assets/images/book-daily-duas.jpg'
        },
        'audio-quran': {
            title: 'Quran Recitation with Translation',
            author: 'Qari Abdul Rahman',
            price: 25.99,
            image: '/assets/images/book-audio-quran.jpg'
        }
    };
    
    return products[productId];
}

function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('shoppingCart');
    if (saved) {
        shoppingCart = JSON.parse(saved);
    }
}

function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
        wishlist = JSON.parse(saved);
    }
}

function loadPublicationsFromStorage() {
    // Load any saved preferences or data
    const savedPreferences = localStorage.getItem('publicationPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        // Apply saved filters or preferences
    }
}

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

// Export functions for use in other scripts
window.PublicationsApp = {
    addToCart,
    addToWishlist,
    removeFromCart,
    previewBook,
    downloadFreeBook,
    playPreview,
    loadMorePublications
};