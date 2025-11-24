/**
 * Sanitizer.js (V2 - Table Fix)
 * Prepares HTML for conversion. 
 * KEY UPDATE: Flattens lists/paragraphs inside tables to prevent broken Markdown rows.
 */

export class Sanitizer {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    clean(element) {
        if (!element) return '';

        // 1. Clone to avoid mutating live page
        const clone = element.cloneNode(true);

        // 2. Remove Junk
        this.removeJunk(clone);

        // 3. Resolve Links
        this.resolveLinks(clone);
        this.resolveImages(clone);

        // 4. CRITICAL FIX: Flatten Tables
        // Converts nested lists/paragraphs in cells into inline text + <br>
        this.flattenTables(clone);

        return clone.innerHTML;
    }

    removeJunk(root) {
        const junkTags = ['script', 'style', 'noscript', 'svg', 'iframe', 'button', 'input', 'form'];
        junkTags.forEach(tag => {
            root.querySelectorAll(tag).forEach(el => el.remove());
        });

        const junkClasses = [
            '.checkbox-wrapper', '.feedback-widget', '.site-header', 
            '.site-footer', '.cookie-banner', '.on-page-navigation', 
            '.copy-icon', '[aria-hidden="true"]', '.edit-page'
        ];
        
        junkClasses.forEach(selector => {
            root.querySelectorAll(selector).forEach(el => el.remove());
        });
    }

    /**
     * Fixes "Messed Up" Markdown tables.
     * Markdown tables break if a cell contains newlines.
     * This function converts block elements (p, ul, li) inside cells into inline text with <br>.
     */
    flattenTables(root) {
        const cells = root.querySelectorAll('td, th');
        
        cells.forEach(cell => {
            // A. Handle Lists (ul/ol/li)
            // Convert <li>Item</li> to "• Item<br>"
            const listItems = cell.querySelectorAll('li');
            listItems.forEach(li => {
                const span = document.createElement('span');
                // Use a bullet char for visual separation
                span.innerHTML = `&bull; ${li.innerHTML}<br>`;
                li.replaceWith(span);
            });

            // Unwrap <ul> and <ol> (remove the tags but keep content)
            const lists = cell.querySelectorAll('ul, ol');
            lists.forEach(list => {
                const fragment = document.createDocumentFragment();
                while (list.firstChild) {
                    fragment.appendChild(list.firstChild);
                }
                list.replaceWith(fragment);
            });

            // B. Handle Paragraphs & Divs
            // Convert <p>Text</p> to "Text<br><br>"
            const blocks = cell.querySelectorAll('p, div');
            blocks.forEach(block => {
                const span = document.createElement('span');
                const content = block.innerHTML.trim();
                if (content) {
                    span.innerHTML = `${content}<br><br>`;
                    block.replaceWith(span);
                } else {
                    block.remove();
                }
            });

            // C. Final Cleanup: Remove raw newlines which break markdown
            // We replace them with spaces, trusting our <br> tags to handle formatting
            // Note: We use a regex to replace whitespace groups with a single space
            cell.innerHTML = cell.innerHTML.replace(/(\r\n|\n|\r)/gm, " ");
        });
    }

    resolveLinks(root) {
        const links = root.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                try {
                    link.setAttribute('href', new URL(href, window.location.href).href);
                } catch (e) {}
            }
        });
    }

    resolveImages(root) {
        const imgs = root.querySelectorAll('img[src]');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                try {
                    img.setAttribute('src', new URL(src, window.location.href).href);
                } catch (e) {}
            }
        });
    }
}