// Dhikr & Du'a page functionality

// Initialize dhikr counter functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDhikrCounters();
    initializeDhikrActions();
    loadDhikrFromStorage();
});

// ========================================
// DHIKR COUNTERS
// ========================================
let dhikrCounters = {
    'subhanallah': { count: 0, target: 33 },
    'alhamdulillah': { count: 0, target: 33 },
    'allahu-akbar': { count: 0, target: 34 }
};

function initializeDhikrCounters() {
    // Load saved counters from localStorage
    const saved = localStorage.getItem('dhikrCounters');
    if (saved) {
        dhikrCounters = JSON.parse(saved);
        updateCounterDisplays();
    }
    
    // Update displays every second to show current state
    setInterval(updateCounterDisplays, 1000);
}

function incrementCounter(type) {
    if (dhikrCounters[type]) {
        dhikrCounters[type].count++;
        
        // Play sound effect (optional)
        playCounterSound();
        
        // Add visual feedback
        const counterElement = document.getElementById(`${type}-count`);
        if (counterElement) {
            counterElement.classList.add('counter-increment');
            setTimeout(() => {
                counterElement.classList.remove('counter-increment');
            }, 300);
        }
        
        // Check if target reached
        if (dhikrCounters[type].count === dhikrCounters[type].target) {
            showNotification(`Masha'Allah! You've completed ${dhikrCounters[type].target} ${type.replace('-', ' ')}!`, 'success');
            celebrateCompletion(type);
        }
        
        saveCountersToStorage();
        updateCounterDisplays();
    }
}

function resetCounter(type) {
    if (dhikrCounters[type]) {
        dhikrCounters[type].count = 0;
        saveCountersToStorage();
        updateCounterDisplays();
        showNotification(`${type.replace('-', ' ')} counter reset`, 'info', 2000);
    }
}

function resetAllCounters() {
    Object.keys(dhikrCounters).forEach(type => {
        dhikrCounters[type].count = 0;
    });
    saveCountersToStorage();
    updateCounterDisplays();
    showNotification('All counters reset', 'info', 2000);
}

function updateCounterDisplays() {
    Object.keys(dhikrCounters).forEach(type => {
        const countElement = document.getElementById(`${type}-count`);
        if (countElement) {
            countElement.textContent = dhikrCounters[type].count;
        }
    });
    
    // Update total count
    const totalElement = document.getElementById('total-count');
    if (totalElement) {
        const total = Object.values(dhikrCounters).reduce((sum, counter) => sum + counter.count, 0);
        totalElement.textContent = total;
    }
}

function saveCountersToStorage() {
    localStorage.setItem('dhikrCounters', JSON.stringify(dhikrCounters));
}

function loadDhikrFromStorage() {
    const saved = localStorage.getItem('dhikrCounters');
    if (saved) {
        dhikrCounters = JSON.parse(saved);
    }
}

function celebrateCompletion(type) {
    // Add celebration animation
    const counterCard = document.querySelector(`#${type}-count`).closest('.counter-card');
    if (counterCard) {
        counterCard.classList.add('celebration');
        setTimeout(() => {
            counterCard.classList.remove('celebration');
        }, 2000);
    }
    
    // Create confetti effect (simple version)
    createConfetti();
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 3000);
}

function getRandomColor() {
    const colors = ['#2d5a3d', '#d4af37', '#007bff', '#28a745', '#dc3545', '#fd7e14'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playCounterSound() {
    // Create a simple beep sound using Web Audio API
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// ========================================
// DHIKR CARD ACTIONS
// ========================================
function initializeDhikrActions() {
    // Initialize audio buttons
    const audioButtons = document.querySelectorAll('.audio-btn');
    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            playDhikrAudio(this);
        });
    });
    
    // Initialize smooth scrolling for navigation cards
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
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

function copyDhikr(button) {
    const dhikrCard = button.closest('.dhikr-card');
    const arabicText = dhikrCard.querySelector('.arabic-text').textContent;
    const transliteration = dhikrCard.querySelector('.transliteration').textContent;
    const translation = dhikrCard.querySelector('.translation').textContent;
    
    const textToCopy = `${arabicText}\n\n${transliteration}\n\n${translation}`;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Dhikr copied to clipboard', 'success', 2000);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Dhikr copied to clipboard', 'success', 2000);
    }
}

function shareDhikr(button) {
    const dhikrCard = button.closest('.dhikr-card');
    const title = dhikrCard.querySelector('.dhikr-title').textContent;
    const arabicText = dhikrCard.querySelector('.arabic-text').textContent;
    const translation = dhikrCard.querySelector('.translation').textContent;
    
    const shareText = `${title}\n\n${arabicText}\n\n${translation}\n\n- Shared from Mansheu Dawah`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Dhikr copied for sharing', 'success', 2000);
        });
    }
}

function readFullText(button) {
    const dhikrCard = button.closest('.dhikr-card');
    const title = dhikrCard.querySelector('.dhikr-title').textContent;
    const arabicText = dhikrCard.querySelector('.arabic-text').textContent;
    const transliteration = dhikrCard.querySelector('.transliteration').textContent;
    const translation = dhikrCard.querySelector('.translation').textContent;
    
    // Create modal for full text
    const modal = document.createElement('div');
    modal.className = 'dhikr-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeDhikrModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button onclick="closeDhikrModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="dhikr-text-full">
                    <p class="arabic-text large">${arabicText}</p>
                    <p class="transliteration">${transliteration}</p>
                    <p class="translation">${translation}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function closeDhikrModal() {
    const modal = document.querySelector('.dhikr-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function playDhikrAudio(button) {
    // This would integrate with an audio API or local audio files
    // For now, we'll show a placeholder
    button.innerHTML = '<i class="fas fa-pause"></i>';
    button.classList.add('playing');
    
    // Simulate audio playback
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-play"></i>';
        button.classList.remove('playing');
        showNotification('Audio playback completed', 'info', 2000);
    }, 3000);
    
    showNotification('Audio playback started', 'info', 2000);
}

function loadMoreDhikr(category) {
    const button = event.target;
    const section = button.closest('.dhikr-section');
    const container = section.querySelector('.dhikr-cards');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    // Simulate loading more dhikr
    setTimeout(() => {
        const moreDhikr = generateMoreDhikr(category);
        container.innerHTML += moreDhikr;
        
        button.innerHTML = `Load More ${category.charAt(0).toUpperCase() + category.slice(1)} Adhkar`;
        button.disabled = false;
        
        showNotification('More dhikr loaded', 'success', 2000);
    }, 2000);
}

function generateMoreDhikr(category) {
    // This would normally fetch from a database
    // For demo purposes, return placeholder content
    const sampleDhikr = {
        morning: {
            title: 'Additional Morning Du\'a',
            arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا',
            transliteration: 'Allahumma bika asbahna wa bika amsayna',
            translation: 'O Allah, by You we have reached the morning and by You we reach the evening...',
            source: 'Authentic Hadith'
        },
        evening: {
            title: 'Additional Evening Protection',
            arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ',
            transliteration: 'Allahumma anta rabbi la ilaha illa ant',
            translation: 'O Allah, You are my Lord, there is no deity except You...',
            source: 'Prophetic Tradition'
        },
        quranic: {
            title: 'Du\'a for Patience',
            arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا',
            transliteration: 'Rabbana afrigh \'alayna sabra',
            translation: 'Our Lord, pour upon us patience...',
            source: 'Quran 2:250'
        },
        prophetic: {
            title: 'Du\'a for Protection from Trials',
            arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفِتَنِ',
            transliteration: 'Allahumma inni a\'udhu bika min al-fitan',
            translation: 'O Allah, I seek refuge in You from trials...',
            source: 'Sahih Bukhari'
        }
    };
    
    const dhikr = sampleDhikr[category];
    if (!dhikr) return '';
    
    return `
        <div class="dhikr-card">
            <div class="dhikr-header">
                <h3 class="dhikr-title">${dhikr.title}</h3>
                <button class="audio-btn" aria-label="Play audio" onclick="playDhikrAudio(this)">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            
            <div class="dhikr-text">
                <p class="arabic-text large">${dhikr.arabic}</p>
                <div class="transliteration">${dhikr.transliteration}</div>
                <div class="translation">${dhikr.translation}</div>
            </div>
            
            <div class="dhikr-meta">
                <span class="repeat-count">
                    <i class="fas fa-infinity"></i> As needed
                </span>
                <span class="source">${dhikr.source}</span>
            </div>
            
            <div class="dhikr-actions">
                <button class="btn btn-sm btn-outline" onclick="copyDhikr(this)">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button class="btn btn-sm btn-outline" onclick="shareDhikr(this)">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', function(event) {
    // Space bar to increment first available counter
    if (event.code === 'Space' && !event.target.matches('input, textarea')) {
        event.preventDefault();
        const firstCounter = Object.keys(dhikrCounters)[0];
        incrementCounter(firstCounter);
    }
    
    // Number keys for specific counters
    if (event.code === 'Digit1') {
        event.preventDefault();
        incrementCounter('subhanallah');
    }
    if (event.code === 'Digit2') {
        event.preventDefault();
        incrementCounter('alhamdulillah');
    }
    if (event.code === 'Digit3') {
        event.preventDefault();
        incrementCounter('allahu-akbar');
    }
    
    // R key to reset all counters
    if (event.code === 'KeyR' && event.ctrlKey) {
        event.preventDefault();
        resetAllCounters();
    }
});

// ========================================
// PROGRESSIVE WEB APP FEATURES
// ========================================
function installDhikrApp() {
    // This would be implemented with service worker
    showNotification('Install feature coming soon!', 'info');
}

// Daily dhikr reminder
function setDhikrReminder() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Set up daily reminder
                const now = new Date();
                const reminder = new Date();
                reminder.setHours(7, 0, 0, 0); // 7 AM reminder
                
                if (reminder <= now) {
                    reminder.setDate(reminder.getDate() + 1);
                }
                
                const timeUntilReminder = reminder.getTime() - now.getTime();
                
                setTimeout(() => {
                    new Notification('Mansheu Dawah Reminder', {
                        body: 'Time for your morning dhikr and du\'a!',
                        icon: '/assets/images/icon-192.png'
                    });
                }, timeUntilReminder);
                
                showNotification('Daily dhikr reminder set!', 'success');
            }
        });
    }
}

// Export functions for use in other scripts
window.DhikrApp = {
    incrementCounter,
    resetCounter,
    resetAllCounters,
    copyDhikr,
    shareDhikr,
    readFullText,
    playDhikrAudio,
    loadMoreDhikr
};