// Book Detail Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Download Form Handling
    const downloadForm = document.getElementById('downloadForm');
    const emailInput = document.getElementById('emailInput');
    const notification = document.getElementById('downloadNotification');

    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate download process
            downloadForm.querySelector('.download-btn').disabled = true;
            downloadForm.querySelector('.download-btn').textContent = 'Downloading...';
            
            // Simulate server response (replace with actual API call)
            setTimeout(() => {
                // Success scenario
                showNotification('Success! Check your email for the download link.', 'success');
                emailInput.value = '';
                downloadForm.querySelector('.download-btn').disabled = false;
                downloadForm.querySelector('.download-btn').textContent = 'Download';
                
                // Optionally trigger actual download here
                // window.location.href = 'path/to/book.pdf';
            }, 1500);
        });
    }

    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = 'download-notification show ' + type;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Bookmark Button
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                // Bookmark
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#1e90ff';
                this.style.borderColor = '#1e90ff';
                
                // You can add actual bookmark functionality here
                // localStorage.setItem('bookmark_' + bookId, 'true');
            } else {
                // Remove bookmark
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                this.style.borderColor = '';
                
                // localStorage.removeItem('bookmark_' + bookId);
            }
        });
    }

    // Share Button (Main)
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const pageTitle = document.title;
            const pageUrl = window.location.href;
            
            // Check if Web Share API is available
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: pageTitle,
                        url: pageUrl
                    });
                } catch (err) {
                    console.log('Share cancelled or failed:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                copyToClipboard(pageUrl);
                alert('Link copied to clipboard!');
            }
        });
    }

    // Social Share Icons
    const shareIcons = document.querySelectorAll('.share-icon[data-share]');
    shareIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const shareType = this.dataset.share;
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            let shareUrl = '';
            
            switch(shareType) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    window.open(shareUrl, 'facebook-share', 'width=580,height=296');
                    break;
                    
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    window.open(shareUrl, 'twitter-share', 'width=550,height=235');
                    break;
                    
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;
                    window.open(shareUrl, 'whatsapp-share');
                    break;
                    
                case 'email':
                    shareUrl = `mailto:?subject=${pageTitle}&body=Check out this book: ${pageUrl}`;
                    window.location.href = shareUrl;
                    break;
                    
                case 'copy':
                    copyToClipboard(decodeURIComponent(pageUrl));
                    
                    // Show notification
                    showCopyNotification();
                    
                    // Visual feedback on icon
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.style.background = '#28a745';
                    this.style.borderColor = '#28a745';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.background = '';
                        this.style.borderColor = '';
                    }, 2000);
                    break;
            }
        });
    });

    // Copy to Clipboard Helper
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Link copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    function showCopyNotification() {
        const notification = document.getElementById('copyNotification');
        if (notification) {
            notification.classList.add('show');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Link copied using fallback method');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Book Thumbnails Click Handler
    const mainCover = document.querySelector('.book-cover-main img');
    const thumbnails = document.querySelectorAll('.book-thumb');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            const thumbImg = this.querySelector('img');
            if (mainCover && thumbImg) {
                // Swap images
                const tempSrc = mainCover.src;
                mainCover.src = thumbImg.src;
                // Optionally, you can keep the thumbnail the same or swap it
                // thumbImg.src = tempSrc;
                
                // Add active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});
