/**
 * Theme Toggle JavaScript
 * Author: Krishchal Regmi
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme if available
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check for preferred color scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            updateThemeIcon('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            updateThemeIcon('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    }
    
    // Theme toggle event
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        }
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark-mode') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    // Listen for changes in system color scheme
    const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    
    colorSchemeMedia.addEventListener('change', (e) => {
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                updateThemeIcon('dark-mode');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                updateThemeIcon('light-mode');
            }
        }
    });
});
