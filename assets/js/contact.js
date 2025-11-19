/**
 * Contact Page JavaScript
 * Handles contact form validation, submission, and FAQ interactions
 */

class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('.btn-submit');
        this.successMessage = document.getElementById('successMessage');
        this.errorMessage = document.getElementById('errorMessage');
        this.faqItems = document.querySelectorAll('.faq-item');
        
        this.init();
    }

    init() {
        if (this.form) {
            this.setupFormValidation();
            this.setupFormSubmission();
        }
        this.setupFAQ();
        this.setupFormAnimations();
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required.`;
            isValid = false;
        }
        
        // Specific field validations
        if (value && isValid) {
            switch (fieldName) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address.';
                        isValid = false;
                    }
                    break;
                
                case 'phone':
                    if (value && !this.isValidPhone(value)) {
                        errorMessage = 'Please enter a valid phone number.';
                        isValid = false;
                    }
                    break;
                
                case 'firstName':
                case 'lastName':
                    if (value.length < 2) {
                        errorMessage = `${this.getFieldLabel(field)} must be at least 2 characters.`;
                        isValid = false;
                    }
                    break;
                
                case 'message':
                    if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters.';
                        isValid = false;
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validateForm()) {
                this.showNotification('Please correct the errors below.', 'error');
                return;
            }

            await this.submitForm();
        });
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        this.setSubmitButtonState(true);
        this.hideMessages();

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            this.showSuccessMessage();
            this.form.reset();
            this.clearAllErrors();
            
            // Track form submission (analytics)
            this.trackFormSubmission(data.subject);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage();
        } finally {
            this.setSubmitButtonState(false);
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success (90% success rate for demo)
        if (Math.random() > 0.1) {
            return { success: true, message: 'Message sent successfully' };
        } else {
            throw new Error('Server error');
        }
    }

    setSubmitButtonState(loading) {
        if (!this.submitBtn) return;
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentElement.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    clearAllErrors() {
        const errorFields = this.form.querySelectorAll('.error');
        const errorMessages = this.form.querySelectorAll('.form-error');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    showSuccessMessage() {
        this.hideMessages();
        this.successMessage.style.display = 'flex';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showErrorMessage() {
        this.hideMessages();
        this.errorMessage.style.display = 'flex';
        this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    hideMessages() {
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    setupFAQ() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherIcon.classList.replace('fa-minus', 'fa-plus');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    icon.classList.replace('fa-minus', 'fa-plus');
                } else {
                    item.classList.add('active');
                    icon.classList.replace('fa-plus', 'fa-minus');
                }
            });
        });
    }

    setupFormAnimations() {
        // Animate form elements on scroll
        const formElements = document.querySelectorAll('.form-group, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Utility functions
    getFieldLabel(field) {
        const label = field.parentElement.querySelector('label');
        return label ? label.textContent.replace(' *', '') : field.name;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    trackFormSubmission(subject) {
        // Analytics tracking (replace with actual implementation)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': subject
            });
        }
    }
}

// Contact form enhancements
class ContactEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupCharacterCounter();
        this.setupSmartPlaceholders();
        this.setupFormProgress();
    }

    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        if (!messageField) return;

        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = '0/500';
        
        messageField.parentElement.appendChild(counter);
        
        messageField.addEventListener('input', (e) => {
            const length = e.target.value.length;
            counter.textContent = `${length}/500`;
            
            if (length > 450) {
                counter.classList.add('warning');
            } else {
                counter.classList.remove('warning');
            }
        });
    }

    setupSmartPlaceholders() {
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (!subjectField || !messageField) return;

        const messagePlaceholders = {
            'general': 'Please provide details about your general inquiry...',
            'support': 'Please describe the technical issue you\'re experiencing, including any error messages...',
            'publications': 'Which publication are you interested in? Do you need more information about pricing or availability?',
            'courses': 'What type of course or educational program interests you? Do you have any specific learning goals?',
            'donations': 'Thank you for your interest in supporting our mission. How would you like to contribute?',
            'partnership': 'Tell us about your organization and how you\'d like to collaborate with us...',
            'feedback': 'We value your feedback! Please share your thoughts and suggestions...',
            'other': 'Please provide details about your inquiry...'
        };
        
        subjectField.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (messagePlaceholders[selectedValue]) {
                messageField.placeholder = messagePlaceholders[selectedValue];
            }
        });
    }

    setupFormProgress() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.innerHTML = '<div class="progress-bar"></div><span class="progress-text">0% Complete</span>';
        
        form.insertBefore(progressBar, form.firstChild);
        
        const updateProgress = () => {
            let filledFields = 0;
            
            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (field.checked) filledFields++;
                } else if (field.value.trim()) {
                    filledFields++;
                }
            });
            
            const progress = Math.round((filledFields / requiredFields.length) * 100);
            const progressBarElement = progressBar.querySelector('.progress-bar');
            const progressText = progressBar.querySelector('.progress-text');
            
            progressBarElement.style.width = `${progress}%`;
            progressText.textContent = `${progress}% Complete`;
            
            if (progress === 100) {
                progressBar.classList.add('complete');
            } else {
                progressBar.classList.remove('complete');
            }
        };
        
        requiredFields.forEach(field => {
            field.addEventListener('input', updateProgress);
            field.addEventListener('change', updateProgress);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
    new ContactEnhancements();
});

// Export for potential external use
window.ContactManager = ContactManager;
