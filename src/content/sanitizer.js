/**
 * Sanitizer.js
 * Prepares the raw HTML for conversion by removing UI noise and fixing links.
 */

export class Sanitizer {
    constructor() {
        this.baseUrl = window.location.origin;
        this.currentPath = window.location.pathname;
    }

    /**
     * Cleans the element and returns HTML string.
     * @param {HTMLElement} element 
     * @returns {string} Cleaned HTML
     */
    clean(element) {
        if (!element) return '';

        // 1. Clone to avoid mutating the live page
        const clone = element.cloneNode(true);

        // 2. Remove Junk Tags
        const junkTags = ['script', 'style', 'noscript', 'svg', 'iframe', 'button', 'input'];
        junkTags.forEach(tag => {
            clone.querySelectorAll(tag).forEach(el => el.remove());
        });

        // 3. Remove known UI noise (Salesforce specific & Generic)
        const junkClasses = [
            '.checkbox-wrapper',
            '.feedback-widget',
            '.site-header',
            '.site-footer',
            '.cookie-banner',
            '.on-page-navigation', // The right-side table of contents
            '.copy-icon',          // Code block copy buttons
            '[aria-hidden="true"]' // Accessibility hidden text often repeats visual text
        ];
        
        junkClasses.forEach(selector => {
            clone.querySelectorAll(selector).forEach(el => el.remove());
        });

        // 4. Resolve Relative Links
        // Salesforce docs often use href="../api/class.html"
        this.resolveLinks(clone);
        this.resolveImages(clone);

        return clone.innerHTML;
    }

    /**
     * Converts relative links to absolute URLs so AI can follow them.
     */
    resolveLinks(root) {
        const links = root.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // Construct absolute URL
                try {
                    // Handle root-relative (/docs/...) vs path-relative (../docs/...)
                    const absolute = new URL(href, window.location.href).href;
                    link.setAttribute('href', absolute);
                } catch (e) {
                    console.warn('Failed to resolve link:', href);
                }
            }
        });
    }

    /**
     * Converts relative image sources to absolute URLs.
     */
    resolveImages(root) {
        const imgs = root.querySelectorAll('img[src]');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                try {
                    const absolute = new URL(src, window.location.href).href;
                    img.setAttribute('src', absolute);
                } catch (e) {
                    console.warn('Failed to resolve image:', src);
                }
            }
        });
    }
}