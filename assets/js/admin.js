/**
 * Admin Dashboard JavaScript
 * Handles admin dashboard functionality, navigation, and data management
 */

class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupNotifications();
        this.setupModals();
        this.setupCharts();
        this.setupTableFeatures();
        this.setupQuickActions();
        this.loadDashboardData();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');
        const pageTitle = document.getElementById('pageTitle');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetSection = link.getAttribute('data-section');
                if (!targetSection) return;

                // Update active nav item
                document.querySelector('.nav-item.active')?.classList.remove('active');
                link.closest('.nav-item').classList.add('active');

                // Show target section
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(`section-${targetSection}`)?.classList.add('active');

                // Update page title
                const sectionTitle = link.querySelector('span').textContent;
                pageTitle.textContent = sectionTitle;
                
                this.currentSection = targetSection;
                this.onSectionChange(targetSection);
            });
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('adminSidebar');

        const toggleSidebar = () => {
            sidebar.classList.toggle('show');
        };

        mobileToggle?.addEventListener('click', toggleSidebar);
        sidebarToggle?.addEventListener('click', toggleSidebar);

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !mobileToggle?.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            }
        });
    }

    setupNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationDropdown = document.querySelector('.notification-dropdown');
        const markAllRead = document.querySelector('.mark-all-read');

        notificationBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.style.display = 
                notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn?.contains(e.target) && !notificationDropdown?.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });

        markAllRead?.addEventListener('click', () => {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            const notificationCount = document.querySelector('.notification-count');
            if (notificationCount) {
                notificationCount.textContent = '0';
                notificationCount.style.display = 'none';
            }

            this.showToast('All notifications marked as read', 'success');
        });
    }

    setupModals() {
        const modals = document.querySelectorAll('.modal');
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const closeButtons = document.querySelectorAll('.modal-close');

        // Open modals
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modals
        const closeModal = (modal) => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });

        // Close modal when clicking backdrop
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.show');
                if (activeModal) {
                    closeModal(activeModal);
                }
            }
        });
    }

    setupCharts() {
        // Traffic Analytics Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            this.charts.traffic = new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Page Views',
                        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                        borderColor: '#2E6F40',
                        backgroundColor: 'rgba(46, 111, 64, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Engagement Chart
        const engagementCtx = document.getElementById('engagementChart');
        if (engagementCtx) {
            this.charts.engagement = new Chart(engagementCtx, {
                type: 'doughnut',
                data: {
                    labels: ['New Users', 'Returning Users', 'Bounce Rate'],
                    datasets: [{
                        data: [45, 35, 20],
                        backgroundColor: ['#2E6F40', '#68BA7F', '#CFFFDC'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }

        // Content Performance Chart
        const contentCtx = document.getElementById('contentChart');
        if (contentCtx) {
            this.charts.content = new Chart(contentCtx, {
                type: 'bar',
                data: {
                    labels: ['Articles', 'Resources', 'Publications', 'Courses'],
                    datasets: [{
                        label: 'Views',
                        data: [12000, 8500, 6200, 4800],
                        backgroundColor: ['#2E6F40', '#68BA7F', '#CFFFDC', '#253D2C'],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Chart period tabs
        const chartTabs = document.querySelectorAll('.tab-btn');
        chartTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const period = tab.getAttribute('data-period');
                const tabContainer = tab.closest('.card-tabs');
                
                // Update active tab
                tabContainer.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update chart data based on period
                this.updateChartData(period);
            });
        });
    }

    updateChartData(period) {
        if (!this.charts.traffic) return;

        let data, labels;
        
        switch (period) {
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = [1200, 1900, 3000, 5000, 2000, 3000, 4500];
                break;
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                data = [12000, 19000, 15000, 22000];
                break;
            case 'year':
                labels = ['Q1', 'Q2', 'Q3', 'Q4'];
                data = [120000, 190000, 150000, 220000];
                break;
        }
        
        this.charts.traffic.data.labels = labels;
        this.charts.traffic.data.datasets[0].data = data;
        this.charts.traffic.update();
    }

    setupTableFeatures() {
        // Select all checkbox
        const selectAllCheckbox = document.querySelector('.select-all');
        const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

        selectAllCheckbox?.addEventListener('change', (e) => {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
                this.updateRowSelection(checkbox.closest('tr'), checkbox.checked);
            });
        });

        // Individual row checkboxes
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateRowSelection(e.target.closest('tr'), e.target.checked);
                this.updateSelectAllState();
            });
        });

        // Search functionality
        const searchInputs = document.querySelectorAll('.filter-search');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.filterTable(e.target.value);
            });
        });

        // Filter dropdowns
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const action = button.className.includes('edit') ? 'edit' :
                             button.className.includes('delete') ? 'delete' :
                             button.className.includes('view') ? 'view' :
                             button.className.includes('preview') ? 'preview' : null;
                
                if (action) {
                    this.handleTableAction(action, button.closest('tr'));
                }
            });
        });
    }

    updateRowSelection(row, selected) {
        if (selected) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
    }

    updateSelectAllState() {
        const selectAllCheckbox = document.querySelector('.select-all');
        const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
        const checkedCount = document.querySelectorAll('tbody input[type="checkbox"]:checked').length;
        
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = checkedCount === rowCheckboxes.length;
            selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
        }
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('tbody tr');
        const term = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    applyFilters() {
        const categoryFilter = document.querySelector('.filter-select:first-child')?.value;
        const statusFilter = document.querySelector('.filter-select:last-child')?.value;
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            let show = true;
            
            if (categoryFilter) {
                const categoryTag = row.querySelector('.category-tag');
                if (!categoryTag || !categoryTag.textContent.toLowerCase().includes(categoryFilter)) {
                    show = false;
                }
            }
            
            if (statusFilter && show) {
                const statusBadge = row.querySelector('.status-badge');
                if (!statusBadge || !statusBadge.textContent.toLowerCase().includes(statusFilter)) {
                    show = false;
                }
            }
            
            row.style.display = show ? '' : 'none';
        });
    }

    handleTableAction(action, row) {
        const title = row.querySelector('.article-info h4')?.textContent || 'Item';
        
        switch (action) {
            case 'edit':
                this.editItem(row, title);
                break;
            case 'delete':
                this.deleteItem(row, title);
                break;
            case 'view':
            case 'preview':
                this.viewItem(row, title);
                break;
        }
    }

    editItem(row, title) {
        // Open edit modal or navigate to edit page
        const modal = document.getElementById('newArticleModal');
        if (modal) {
            // Populate form with existing data
            modal.querySelector('input[type="text"]').value = title;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    deleteItem(row, title) {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            row.style.opacity = '0.5';
            
            // Simulate API call
            setTimeout(() => {
                row.remove();
                this.showToast(`"${title}" has been deleted successfully`, 'success');
                this.updateSelectAllState();
            }, 1000);
        }
    }

    viewItem(row, title) {
        // Open item in new tab or show preview
        this.showToast(`Opening "${title}" for preview`, 'info');
    }

    setupQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-actions .action-btn');
        const newArticleBtn = document.getElementById('newArticleBtn');

        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        newArticleBtn?.addEventListener('click', () => {
            const modal = document.getElementById('newArticleModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    handleQuickAction(action) {
        switch (action) {
            case 'new-article':
                this.showToast('Opening article editor...', 'info');
                break;
            case 'new-resource':
                this.showToast('Opening resource uploader...', 'info');
                break;
            case 'manage-users':
                // Navigate to users section
                document.querySelector('[data-section="users"]').click();
                break;
            case 'view-reports':
                // Navigate to analytics section
                document.querySelector('[data-section="analytics"]').click();
                break;
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        this.updateStats();
        this.loadRecentActivity();
        this.loadPopularContent();
    }

    updateStats() {
        // Animate stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/,/g, ''));
            this.animateValue(stat, 0, finalValue, 2000);
        });
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString();
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    loadRecentActivity() {
        // Simulate real-time activity updates
        setInterval(() => {
            this.addActivityItem();
        }, 30000); // Add new activity every 30 seconds
    }

    addActivityItem() {
        const activities = [
            'New user registration',
            'Article published',
            'Comment posted',
            'Resource downloaded',
            'Course enrollment'
        ];
        
        const icons = [
            'fa-user text-blue',
            'fa-plus text-green',
            'fa-comment text-orange',
            'fa-download text-purple',
            'fa-graduation-cap text-blue'
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.opacity = '0';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${randomIcon}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${randomActivity}</strong></p>
                <small>Just now</small>
            </div>
        `;
        
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Animate in
        setTimeout(() => {
            activityItem.style.opacity = '1';
            activityItem.style.transition = 'opacity 0.3s ease';
        }, 100);
        
        // Remove excess items
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }

    loadPopularContent() {
        // Update popular content rankings
        const contentItems = document.querySelectorAll('.content-item');
        
        contentItems.forEach(item => {
            const viewCount = item.querySelector('.view-count');
            if (viewCount) {
                const currentViews = parseInt(viewCount.textContent.replace(/,/g, ''));
                const newViews = currentViews + Math.floor(Math.random() * 10);
                viewCount.textContent = newViews.toLocaleString() + ' views';
            }
        });
    }

    onSectionChange(section) {
        // Handle section-specific initialization
        switch (section) {
            case 'analytics':
                this.refreshCharts();
                break;
            case 'articles':
                this.loadArticles();
                break;
            case 'users':
                this.loadUsers();
                break;
        }
    }

    refreshCharts() {
        // Refresh all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
                chart.update();
            }
        });
    }

    loadArticles() {
        // Load articles data
        this.showToast('Loading articles...', 'info');
    }

    loadUsers() {
        // Load users data
        this.showToast('Loading users...', 'info');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `admin-toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                            type === 'error' ? 'fa-exclamation-circle' : 
                            'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Show with animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Toast styles (add to admin.css or include here)
const toastStyles = `
.admin-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    border-left: 4px solid #2E6F40;
}

.admin-toast.show {
    transform: translateX(0);
}

.admin-toast.success {
    border-left-color: #10b981;
}

.admin-toast.error {
    border-left-color: #ef4444;
}

.admin-toast.info {
    border-left-color: #3b82f6;
}

.admin-toast i {
    font-size: 16px;
}

.admin-toast.success i {
    color: #10b981;
}

.admin-toast.error i {
    color: #ef4444;
}

.admin-toast.info i {
    color: #3b82f6;
}
`;

// Add toast styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});

// Export for potential external use
window.AdminDashboard = AdminDashboard;