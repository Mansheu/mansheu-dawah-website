// Theme Toggle with system preference support
class ThemeManager {
    constructor() {
        this.mql = window.matchMedia('(prefers-color-scheme: dark)');
        this.storedTheme = localStorage.getItem('theme'); // 'light' | 'dark' | null
        this.isAuto = !this.storedTheme;
        this.theme = this.storedTheme || (this.mql.matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        // Create theme toggle button if it doesn't exist
        this.createThemeToggle();

        // Apply stored theme; otherwise follow system (no attribute so CSS @media applies)
        if (this.isAuto) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            this.applyThemeAttribute(this.theme);
        }

        // Set initial button label
        this.updateButtonLabel();

        // Add click listener
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Watch for system theme changes when in auto mode
        this.mql.addEventListener('change', (e) => {
            if (this.isAuto) {
                this.theme = e.matches ? 'dark' : 'light';
                this.updateButtonLabel();
            }
        });
    }

    createThemeToggle() {
        // Check if button already exists
        if (document.querySelector('.theme-toggle')) return;

        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = `
            <svg class="moon-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>
            <svg class="sun-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2.25a1.5,1.5,0,0,0-1.5,1.5v1a1.5,1.5,0,0,0,3,0v-1A1.5,1.5,0,0,0,12,2.25ZM19.07,4.93a1.5,1.5,0,0,0-2.12,0l-.71.71a1.5,1.5,0,0,0,0,2.12,1.49,1.49,0,0,0,2.12,0l.71-.71A1.5,1.5,0,0,0,19.07,4.93ZM22.25,12a1.5,1.5,0,0,0-1.5-1.5h-1a1.5,1.5,0,0,0,0,3h1A1.5,1.5,0,0,0,22.25,12ZM19.07,19.07a1.5,1.5,0,0,0,0-2.12l-.71-.71a1.5,1.5,0,1,0-2.12,2.12l.71.71A1.5,1.5,0,0,0,19.07,19.07ZM12,21.75a1.5,1.5,0,0,0,1.5-1.5v-1a1.5,1.5,0,0,0-3,0v1A1.5,1.5,0,0,0,12,21.75ZM4.93,19.07a1.5,1.5,0,0,0,2.12,0l.71-.71a1.5,1.5,0,0,0,0-2.12,1.49,1.49,0,0,0-2.12,0l-.71.71A1.5,1.5,0,0,0,4.93,19.07ZM1.75,12a1.5,1.5,0,0,0,1.5,1.5h1a1.5,1.5,0,0,0,0-3h-1A1.5,1.5,0,0,0,1.75,12ZM4.93,4.93a1.5,1.5,0,0,0,0,2.12l.71.71a1.5,1.5,0,1,0,2.12-2.12L7.05,4.93A1.5,1.5,0,0,0,4.93,4.93ZM12,6.75A5.25,5.25,0,1,0,17.25,12,5.26,5.26,0,0,0,12,6.75Zm0,7.5A2.25,2.25,0,1,1,14.25,12,2.25,2.25,0,0,1,12,14.25Z"/>
            </svg>
        `;

        document.body.appendChild(button);
    }

    applyThemeAttribute(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateButtonLabel() {
        const button = document.querySelector('.theme-toggle');
        if (!button) return;
        const effectiveTheme = this.isAuto ? (this.mql.matches ? 'dark' : 'light') : this.theme;
        const newLabel = effectiveTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
        button.setAttribute('aria-label', newLabel);
    }

    setTheme(theme) {
        this.theme = theme;
        this.isAuto = false;
        this.applyThemeAttribute(theme);
        localStorage.setItem('theme', theme);
        this.updateButtonLabel();
    }

    toggleTheme() {
        // If following system (auto), first click becomes explicit opposite of current system theme
        if (this.isAuto) {
            const systemTheme = this.mql.matches ? 'dark' : 'light';
            const newTheme = systemTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            return;
        }
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Initialize theme manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });
} else {
    new ThemeManager();
}

// Also add to existing main.js functionality
if (typeof initializeFilters !== 'undefined') {
    // Theme manager is compatible with existing functionality
    console.log('Theme manager initialized alongside existing functionality');
}
