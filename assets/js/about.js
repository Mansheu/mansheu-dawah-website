/**
 * About Page JavaScript
 * Handles about page animations, statistics counter, and interactive elements
 */

class AboutPageManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupStatsCounter();
        this.setupTimelineAnimation();
        this.setupTeamInteractions();
    }

    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll([
            '.mission-point',
            '.values-card',
            '.timeline-item',
            '.team-member',
            '.approach-item',
            '.stat-item'
        ].join(','));

        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateStats() {
        const stats = [
            { element: document.querySelectorAll('.stat-number')[0], target: 2000000, suffix: '+' },
            { element: document.querySelectorAll('.stat-number')[1], target: 2000, suffix: '+' },
            { element: document.querySelectorAll('.stat-number')[2], target: 5},
            { element: document.querySelectorAll('.stat-number')[3], target: 85, suffix: '+' }
        ];

        stats.forEach((stat, index) => {
            if (stat.element) {
                setTimeout(() => {
                    this.animateValue(stat.element, 0, stat.target, 2000, stat.suffix);
                }, index * 200);
            }
        });
    }

    animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range > 0 ? Math.ceil(range / 100) : 1;
        let current = start;
        const stepTime = Math.abs(Math.floor(duration / (range / increment)));

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            element.textContent = current.toLocaleString() + suffix;
        }, stepTime);
    }

    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    setupTeamInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.classList.add('team-hover');
            });
            
            member.addEventListener('mouseleave', () => {
                member.classList.remove('team-hover');
            });
        });

        // Add click handlers for team member details (if needed)
        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                const memberName = member.querySelector('h3').textContent;
                this.showMemberDetails(memberName, member);
            });
        });
    }

    showMemberDetails(name, memberElement) {
        // Create a simple modal or expanded view for team member
        const memberBio = memberElement.querySelector('.member-bio').textContent;
        const memberRole = memberElement.querySelector('.member-role').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'team-modal';
        modal.innerHTML = `
            <div class="team-modal-content">
                <div class="team-modal-header">
                    <h3>${name}</h3>
                    <button class="team-modal-close">&times;</button>
                </div>
                <div class="team-modal-body">
                    <p class="modal-role">${memberRole}</p>
                    <p class="modal-bio">${memberBio}</p>
                    <div class="modal-achievements">
                        <h4>Key Contributions:</h4>
                        <ul>
                            <li>Led development of core curriculum</li>
                            <li>Published multiple research papers</li>
                            <li>Mentored over 500 students</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.team-modal-close');
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Close with Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
}

// Additional utility functions for the about page
class AboutPageUtils {
    static scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    static highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href*="#"]');
        
        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSection)) {
                    link.classList.add('active');
                }
            });
        });
    }

    static setupParallaxEffect() {
        const heroSection = document.querySelector('.hero-about');
        if (!heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Add styles for animations and modal
const aboutPageStyles = `
/* Animation styles */
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.timeline-animate .timeline-marker {
    transform: scale(1.1);
    transition: transform 0.3s ease;
}

.timeline-animate .timeline-content {
    opacity: 1;
    transform: translateX(0);
}

.team-hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(46, 111, 64, 0.2);
}

/* Team Modal Styles */
.team-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.team-modal.show {
    opacity: 1;
    visibility: visible;
}

.team-modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.team-modal.show .team-modal-content {
    transform: scale(1);
}

.team-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.team-modal-header h3 {
    margin: 0;
    color: #2E6F40;
    font-size: 1.5rem;
}

.team-modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.team-modal-close:hover {
    background-color: #f0f0f0;
}

.team-modal-body {
    padding: 24px;
}

.modal-role {
    color: #68BA7F;
    font-weight: 600;
    margin: 0 0 16px 0;
}

.modal-bio {
    color: #666;
    line-height: 1.6;
    margin: 0 0 20px 0;
}

.modal-achievements h4 {
    color: #2E6F40;
    margin: 0 0 12px 0;
}

.modal-achievements ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.modal-achievements li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
    color: #666;
}

.modal-achievements li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #68BA7F;
    font-weight: bold;
}

/* Stats animation enhancement */
.stat-item {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(46, 111, 64, 0.15);
}

.stat-icon {
    font-size: 2.5rem;
    color: #2E6F40;
    margin-bottom: 1rem;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2E6F40;
    margin-bottom: 0.5rem;
    display: block;
}

.stat-label {
    color: #666;
    font-size: 1rem;
    font-weight: 500;
}

/* Timeline enhancements */
.timeline {
    position: relative;
    padding: 2rem 0;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #2E6F40, #68BA7F);
}

.timeline-item {
    position: relative;
    margin: 2rem 0;
    display: flex;
    align-items: center;
}

.timeline-item:nth-child(odd) {
    flex-direction: row;
}

.timeline-item:nth-child(even) {
    flex-direction: row-reverse;
}

.timeline-marker {
    background: #2E6F40;
    color: white;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    position: relative;
    z-index: 2;
    border: 4px solid white;
    box-shadow: 0 4px 20px rgba(46, 111, 64, 0.3);
}

.timeline-content {
    flex: 1;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 0 2rem;
    opacity: 0.8;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.timeline-item:nth-child(even) .timeline-content {
    transform: translateX(20px);
}

.timeline-content h3 {
    color: #2E6F40;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
}

.timeline-content p {
    color: #666;
    line-height: 1.6;
    margin: 0;
}

/* Responsive timeline */
@media (max-width: 768px) {
    .timeline::before {
        left: 20px;
    }
    
    .timeline-item {
        flex-direction: row !important;
        padding-left: 60px;
    }
    
    .timeline-marker {
        position: absolute;
        left: -20px;
        width: 40px;
        height: 40px;
        font-size: 0.8rem;
    }
    
    .timeline-content {
        margin: 0;
        transform: translateX(0) !important;
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = aboutPageStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutPageManager();
    AboutPageUtils.highlightCurrentSection();
    AboutPageUtils.setupParallaxEffect();
});

// Export for potential external use
window.AboutPageManager = AboutPageManager;
window.AboutPageUtils = AboutPageUtils;