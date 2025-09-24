// Resources page functionality

// User progress tracking
let userProgress = {
    enrolledCourses: [],
    completedDownloads: [],
    wishlistedCourses: [],
    certificates: []
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeResources();
    loadUserProgress();
    updateProgressDisplays();
});

// ========================================
// RESOURCES INITIALIZATION
// ========================================
function initializeResources() {
    initializeCourseFilters();
    initializeDownloadCategories();
    initializeSearchFunctionality();
    initializeToolsInteraction();
    loadResourcesFromStorage();
}

function initializeCourseFilters() {
    const filterButtons = document.querySelectorAll('.course-filters .filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const level = this.getAttribute('data-level');
            filterCourses(level);
        });
    });
}

function filterCourses(level) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        if (level === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            const cardLevel = card.getAttribute('data-level');
            if (cardLevel === level) {
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
    
    updateFilterResults(level);
}

function updateFilterResults(level) {
    const courseCards = document.querySelectorAll('.course-card');
    let visibleCount = 0;
    
    courseCards.forEach(card => {
        const cardLevel = card.getAttribute('data-level');
        if (level === 'all' || cardLevel === level) {
            visibleCount++;
        }
    });
    
    showNotification(`Showing ${visibleCount} courses`, 'info', 2000);
}

function initializeDownloadCategories() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const downloadItems = document.querySelectorAll('.download-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterDownloads(category);
        });
    });
}

function filterDownloads(category) {
    const downloadItems = document.querySelectorAll('.download-item');
    
    downloadItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ========================================
// COURSE ENROLLMENT FUNCTIONALITY
// ========================================
function enrollInCourse(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    // Check if already enrolled
    if (userProgress.enrolledCourses.includes(courseId)) {
        showNotification('You are already enrolled in this course!', 'warning');
        return;
    }
    
    // Show enrollment modal
    showEnrollmentModal(course);
}

function showEnrollmentModal(course) {
    const modal = document.createElement('div');
    modal.className = 'enrollment-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeEnrollmentModal()"></div>
        <div class="modal-content enrollment-content">
            <div class="modal-header">
                <h3>Enroll in Course</h3>
                <button onclick="closeEnrollmentModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="course-summary">
                    <h4>${course.title}</h4>
                    <p class="course-instructor">By ${course.instructor}</p>
                    <div class="course-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${course.duration} of content</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-certificate"></i>
                            <span>Certificate included</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-mobile-alt"></i>
                            <span>Mobile & Desktop access</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-infinity"></i>
                            <span>Lifetime access</span>
                        </div>
                    </div>
                </div>
                
                <div class="enrollment-form">
                    <h5>Course Curriculum Preview</h5>
                    <ul class="curriculum-list">
                        <li><i class="fas fa-play-circle"></i> Introduction and Course Overview</li>
                        <li><i class="fas fa-play-circle"></i> Fundamentals and Basic Concepts</li>
                        <li><i class="fas fa-play-circle"></i> Practical Applications</li>
                        <li><i class="fas fa-play-circle"></i> Advanced Topics</li>
                        <li><i class="fas fa-file-pdf"></i> Course Materials & Resources</li>
                        <li><i class="fas fa-quiz"></i> Assessments and Final Exam</li>
                    </ul>
                </div>
                
                <div class="pricing-summary">
                    <div class="price-breakdown">
                        <div class="price-item">
                            <span>Course Price:</span>
                            <span>$${course.price}</span>
                        </div>
                        <div class="price-item discount">
                            <span>Special Discount:</span>
                            <span>-$${(course.price * 0.1).toFixed(2)}</span>
                        </div>
                        <div class="price-total">
                            <span>Total:</span>
                            <span>$${(course.price * 0.9).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeEnrollmentModal()">
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="confirmEnrollment('${course.id}')">
                    <i class="fas fa-credit-card"></i>
                    Enroll Now - $${(course.price * 0.9).toFixed(2)}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closeEnrollmentModal() {
    const modal = document.querySelector('.enrollment-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function confirmEnrollment(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    // Simulate payment processing
    showNotification('Processing enrollment...', 'info');
    
    setTimeout(() => {
        // Add to enrolled courses
        userProgress.enrolledCourses.push(courseId);
        saveUserProgress();
        
        closeEnrollmentModal();
        showNotification(`Successfully enrolled in ${course.title}!`, 'success', 5000);
        
        // Show course access modal
        setTimeout(() => {
            showCourseAccessModal(course);
        }, 1000);
    }, 2000);
}

function showCourseAccessModal(course) {
    const modal = document.createElement('div');
    modal.className = 'course-access-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCourseAccessModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Welcome to Your Course!</h3>
                <button onclick="closeCourseAccessModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h4>Enrollment Confirmed!</h4>
                    <p>You now have lifetime access to <strong>${course.title}</strong></p>
                </div>
                
                <div class="next-steps">
                    <h5>What's Next?</h5>
                    <ul>
                        <li>Check your email for course access details</li>
                        <li>Download the course materials</li>
                        <li>Join our student community</li>
                        <li>Start your learning journey!</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="accessCourse('${course.id}')">
                    <i class="fas fa-play"></i>
                    Start Learning
                </button>
                <button class="btn btn-outline" onclick="closeCourseAccessModal()">
                    Later
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closeCourseAccessModal() {
    const modal = document.querySelector('.course-access-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function accessCourse(courseId) {
    closeCourseAccessModal();
    showNotification('Redirecting to course platform...', 'info');
    
    // In a real application, this would redirect to the learning management system
    setTimeout(() => {
        showNotification('Course platform would open here in a real implementation', 'info', 3000);
    }, 1500);
}

function previewCourse(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    showCoursePreviewModal(course);
}

function showCoursePreviewModal(course) {
    const modal = document.createElement('div');
    modal.className = 'course-preview-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCoursePreviewModal()"></div>
        <div class="modal-content course-preview">
            <div class="modal-header">
                <h3>Course Preview - ${course.title}</h3>
                <button onclick="closeCoursePreviewModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Course Introduction Video</p>
                        <button class="play-btn" onclick="playPreviewVideo('${course.id}')">
                            <i class="fas fa-play"></i>
                            Play Preview
                        </button>
                    </div>
                </div>
                
                <div class="preview-content">
                    <div class="content-tabs">
                        <button class="tab-btn active" data-tab="curriculum">Curriculum</button>
                        <button class="tab-btn" data-tab="instructor">Instructor</button>
                        <button class="tab-btn" data-tab="reviews">Reviews</button>
                    </div>
                    
                    <div class="tab-content" id="curriculum">
                        <h5>Course Curriculum</h5>
                        <div class="curriculum-preview">
                            <div class="module">
                                <h6><i class="fas fa-folder"></i> Module 1: Introduction</h6>
                                <ul>
                                    <li><i class="fas fa-play-circle"></i> Welcome & Course Overview (Free)</li>
                                    <li><i class="fas fa-lock"></i> Setting Your Learning Goals</li>
                                    <li><i class="fas fa-lock"></i> Study Methodology</li>
                                </ul>
                            </div>
                            <div class="module">
                                <h6><i class="fas fa-folder"></i> Module 2: Fundamentals</h6>
                                <ul>
                                    <li><i class="fas fa-lock"></i> Core Concepts</li>
                                    <li><i class="fas fa-lock"></i> Historical Context</li>
                                    <li><i class="fas fa-lock"></i> Practical Applications</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="instructor" style="display: none;">
                        <h5>About the Instructor</h5>
                        <div class="instructor-info">
                            <div class="instructor-bio">
                                <h6>${course.instructor}</h6>
                                <p>Expert Islamic scholar with over 15 years of teaching experience...</p>
                                <div class="instructor-stats">
                                    <div class="stat">
                                        <i class="fas fa-graduation-cap"></i>
                                        <span>PhD in Islamic Studies</span>
                                    </div>
                                    <div class="stat">
                                        <i class="fas fa-users"></i>
                                        <span>5,000+ Students Taught</span>
                                    </div>
                                    <div class="stat">
                                        <i class="fas fa-star"></i>
                                        <span>4.9/5 Average Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="reviews" style="display: none;">
                        <h5>Student Reviews</h5>
                        <div class="reviews-preview">
                            <div class="review-item">
                                <div class="review-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p>"Excellent course with clear explanations and practical examples..."</p>
                                <span class="reviewer">- Sarah M.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="enrollInCourse('${course.id}')">
                    <i class="fas fa-graduation-cap"></i>
                    Enroll in Course - $${course.price}
                </button>
                <button class="btn btn-outline" onclick="addToWishlist('${course.id}')">
                    <i class="far fa-heart"></i>
                    Add to Wishlist
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Initialize preview tabs
    initializePreviewTabs();
}

function closeCoursePreviewModal() {
    const modal = document.querySelector('.course-preview-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function initializePreviewTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected tab content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
}

// ========================================
// DOWNLOAD FUNCTIONALITY
// ========================================
function downloadResource(resourceId) {
    const resource = getResourceById(resourceId);
    if (!resource) return;
    
    showNotification('Preparing download...', 'info');
    
    // Check if already downloaded
    if (userProgress.completedDownloads.includes(resourceId)) {
        showNotification('You have already downloaded this resource', 'info');
    } else {
        userProgress.completedDownloads.push(resourceId);
        saveUserProgress();
    }
    
    // Simulate download process
    setTimeout(() => {
        showNotification(`${resource.title} downloaded successfully!`, 'success');
        
        // Create temporary download link
        const downloadLink = document.createElement('a');
        downloadLink.href = '#';
        downloadLink.download = `${resource.filename}`;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Update download count (simulation)
        updateDownloadCount(resourceId);
    }, 1500);
}

function updateDownloadCount(resourceId) {
    const downloadItems = document.querySelectorAll('.download-item');
    downloadItems.forEach(item => {
        const itemId = item.querySelector('[onclick*="downloadResource"]')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (itemId === resourceId) {
            const downloadCountElement = item.querySelector('.download-downloads');
            if (downloadCountElement) {
                let currentCount = parseInt(downloadCountElement.textContent.match(/\d+/)[0]);
                downloadCountElement.textContent = `${currentCount + 1} downloads`;
            }
        }
    });
}

// ========================================
// LEARNING TOOLS FUNCTIONALITY
// ========================================
function initializeToolsInteraction() {
    // Add click handlers for tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function openTool(toolId) {
    const tool = getToolById(toolId);
    if (!tool) return;
    
    showToolModal(tool);
}

function showToolModal(tool) {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeToolModal()"></div>
        <div class="modal-content tool-content">
            <div class="modal-header">
                <h3>${tool.title}</h3>
                <button onclick="closeToolModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="tool-interface">
                    ${generateToolInterface(tool)}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeToolModal()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Initialize tool-specific functionality
    if (tool.id === 'qibla-finder') {
        initializeQiblaFinder();
    } else if (tool.id === 'prayer-times') {
        initializePrayerTimes();
    } else if (tool.id === 'islamic-calendar') {
        initializeIslamicCalendar();
    }
}

function closeToolModal() {
    const modal = document.querySelector('.tool-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function generateToolInterface(tool) {
    switch (tool.id) {
        case 'qibla-finder':
            return `
                <div class="qibla-finder">
                    <div class="compass-container">
                        <div class="compass">
                            <div class="compass-needle"></div>
                            <div class="compass-direction">N</div>
                        </div>
                        <div class="qibla-info">
                            <h4>Qibla Direction: 45° NE</h4>
                            <p>Distance to Mecca: 12,450 km</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="findQibla()">
                        <i class="fas fa-location-arrow"></i>
                        Use My Location
                    </button>
                </div>
            `;
        
        case 'prayer-times':
            return `
                <div class="prayer-times">
                    <div class="location-input">
                        <input type="text" placeholder="Enter your city" id="cityInput">
                        <button class="btn btn-primary" onclick="getPrayerTimes()">Get Times</button>
                    </div>
                    <div class="prayer-schedule">
                        <div class="prayer-time">
                            <span class="prayer-name">Fajr</span>
                            <span class="prayer-time-value">5:30 AM</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Dhuhr</span>
                            <span class="prayer-time-value">12:45 PM</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Asr</span>
                            <span class="prayer-time-value">4:15 PM</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Maghrib</span>
                            <span class="prayer-time-value">6:30 PM</span>
                        </div>
                        <div class="prayer-time">
                            <span class="prayer-name">Isha</span>
                            <span class="prayer-time-value">8:00 PM</span>
                        </div>
                    </div>
                </div>
            `;
        
        case 'islamic-calendar':
            return `
                <div class="islamic-calendar">
                    <div class="date-converter">
                        <div class="date-input">
                            <label>Gregorian Date:</label>
                            <input type="date" id="gregorianDate">
                        </div>
                        <div class="date-output">
                            <label>Islamic Date:</label>
                            <div class="islamic-date-display">15 Rajab 1445 AH</div>
                        </div>
                        <button class="btn btn-primary" onclick="convertDate()">Convert</button>
                    </div>
                </div>
            `;
        
        default:
            return `
                <div class="tool-placeholder">
                    <i class="fas fa-cog fa-spin"></i>
                    <h4>${tool.title}</h4>
                    <p>This tool is currently under development.</p>
                    <p>It will be available in a future update.</p>
                </div>
            `;
    }
}

// ========================================
// WISHLIST FUNCTIONALITY
// ========================================
function addToWishlist(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    // Check if already in wishlist
    if (userProgress.wishlistedCourses.includes(courseId)) {
        removeFromWishlist(courseId);
        return;
    }
    
    userProgress.wishlistedCourses.push(courseId);
    saveUserProgress();
    updateWishlistButtons();
    
    showNotification(`${course.title} added to wishlist!`, 'success');
}

function removeFromWishlist(courseId) {
    userProgress.wishlistedCourses = userProgress.wishlistedCourses.filter(id => id !== courseId);
    saveUserProgress();
    updateWishlistButtons();
    
    const course = getCourseById(courseId);
    showNotification(`${course?.title || 'Course'} removed from wishlist`, 'info');
}

function updateWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('[onclick*="addToWishlist"]');
    
    wishlistButtons.forEach(button => {
        const courseId = button.getAttribute('onclick').match(/'([^']+)'/)?.[1];
        if (courseId && userProgress.wishlistedCourses.includes(courseId)) {
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
// LOAD MORE FUNCTIONALITY
// ========================================
function loadMoreCourses() {
    showNotification('Loading more courses...', 'info');
    
    // Simulate loading
    setTimeout(() => {
        showNotification('All available courses are already displayed', 'info');
    }, 1500);
}

function loadMoreDownloads() {
    const downloadsGrid = document.querySelector('.downloads-grid');
    
    showNotification('Loading more downloads...', 'info');
    
    // Simulate loading more downloads
    setTimeout(() => {
        const moreDownloads = generateMoreDownloads();
        downloadsGrid.innerHTML += moreDownloads;
        
        showNotification('More downloads loaded', 'success');
    }, 2000);
}

function generateMoreDownloads() {
    const additionalDownloads = [
        {
            id: 'islamic-calendar-2024',
            title: 'Islamic Calendar 2024',
            description: 'Beautiful printable Islamic calendar with important dates and events.',
            category: 'posters',
            pages: '12 pages',
            downloads: 345
        },
        {
            id: 'hadith-worksheets',
            title: 'Hadith Study Worksheets',
            description: 'Comprehensive worksheets for studying and memorizing important hadith.',
            category: 'worksheets',
            pages: '20 pages',
            downloads: 567
        }
    ];
    
    return additionalDownloads.map(download => `
        <div class="download-item" data-category="${download.category}">
            <div class="download-preview">
                <img src="/assets/images/${download.id}.jpg" alt="${download.title}" loading="lazy">
                <div class="download-type">PDF</div>
            </div>
            <div class="download-info">
                <h4 class="download-title">${download.title}</h4>
                <p class="download-description">${download.description}</p>
                <div class="download-meta">
                    <span class="download-pages">${download.pages}</span>
                    <span class="download-downloads">${download.downloads} downloads</span>
                </div>
                <button class="btn btn-success" onclick="downloadResource('${download.id}')">
                    <i class="fas fa-download"></i>
                    Free Download
                </button>
            </div>
        </div>
    `).join('');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function getCourseById(courseId) {
    const courses = {
        'quran-study-program': {
            id: 'quran-study-program',
            title: 'Comprehensive Quran Study Program',
            instructor: 'Dr. Abdullah Mansheu',
            price: 79.99,
            duration: '40 hours'
        },
        'arabic-fundamentals': {
            id: 'arabic-fundamentals',
            title: 'Arabic Language Fundamentals',
            instructor: 'Dr. Ahmad Mansheu',
            price: 49.99,
            duration: '20 hours'
        },
        'islamic-history': {
            id: 'islamic-history',
            title: 'Islamic History & Civilization',
            instructor: 'Prof. Fatima Mansheu',
            price: 59.99,
            duration: '30 hours'
        },
        'hadith-studies': {
            id: 'hadith-studies',
            title: 'Advanced Hadith Studies',
            instructor: 'Sheikh Omar Mansheu',
            price: 89.99,
            duration: '45 hours'
        },
        'children-education': {
            id: 'children-education',
            title: 'Islamic Education for Children',
            instructor: 'Ustadha Maryam Mansheu',
            price: 29.99,
            duration: '15 hours'
        }
    };
    
    return courses[courseId];
}

function getResourceById(resourceId) {
    const resources = {
        'arabic-alphabet-worksheets': {
            title: 'Arabic Alphabet Worksheets',
            filename: 'arabic-alphabet-worksheets.pdf'
        },
        'prayer-times-guide': {
            title: 'Prayer Times & Qibla Guide',
            filename: 'prayer-times-guide.pdf'
        },
        '99-names-poster': {
            title: '99 Names of Allah Poster',
            filename: '99-names-poster.png'
        },
        'islamic-crosswords': {
            title: 'Islamic Crossword Puzzles',
            filename: 'islamic-crosswords.pdf'
        }
    };
    
    return resources[resourceId];
}

function getToolById(toolId) {
    const tools = {
        'qibla-finder': {
            id: 'qibla-finder',
            title: 'Qibla Finder'
        },
        'prayer-times': {
            id: 'prayer-times',
            title: 'Prayer Time Calculator'
        },
        'islamic-calendar': {
            id: 'islamic-calendar',
            title: 'Islamic Calendar'
        },
        'pronunciation-guide': {
            id: 'pronunciation-guide',
            title: 'Arabic Pronunciation Guide'
        },
        'quiz-games': {
            id: 'quiz-games',
            title: 'Islamic Quiz Games'
        },
        'quran-search': {
            id: 'quran-search',
            title: 'Quran Search'
        }
    };
    
    return tools[toolId];
}

function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function loadUserProgress() {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
}

function updateProgressDisplays() {
    updateWishlistButtons();
}

function loadResourcesFromStorage() {
    // Load any saved preferences
    const savedPreferences = localStorage.getItem('resourcePreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        // Apply saved preferences
    }
}

// Tool-specific functions
function findQibla() {
    showNotification('Determining your location...', 'info');
    // Would integrate with geolocation API
    setTimeout(() => {
        showNotification('Qibla direction updated based on your location', 'success');
    }, 2000);
}

function getPrayerTimes() {
    const cityInput = document.getElementById('cityInput');
    if (cityInput && cityInput.value.trim()) {
        showNotification(`Getting prayer times for ${cityInput.value}...`, 'info');
        // Would integrate with prayer times API
        setTimeout(() => {
            showNotification('Prayer times updated', 'success');
        }, 1500);
    } else {
        showNotification('Please enter a city name', 'warning');
    }
}

function convertDate() {
    showNotification('Converting date...', 'info');
    // Would integrate with Islamic calendar conversion API
    setTimeout(() => {
        showNotification('Date converted successfully', 'success');
    }, 1000);
}

// Export functions for use in other scripts
window.ResourcesApp = {
    enrollInCourse,
    addToWishlist,
    downloadResource,
    openTool,
    previewCourse,
    loadMoreCourses,
    loadMoreDownloads
};