/**
 * Sanitizer.js (V5 - Clean & Focused)
 * Removes Breadcrumbs ("You are here") and Footer links ("See Also")
 */

export class Sanitizer {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    clean(element) {
        if (!element) return '';

        const clone = element.cloneNode(true);

        // 1. Remove Noise (Breadcrumbs, Footers, UI)
        this.removeJunk(clone);

        // 2. Fix Links & Images
        this.resolveLinks(clone);
        this.resolveImages(clone);
        
        // 3. Flatten Tables (Definition Lists & Formatting)
        this.flattenTables(clone);

        return clone.innerHTML;
    }

    removeJunk(root) {
        // 1. Remove Tags
        const junkTags = ['script', 'style', 'noscript', 'svg', 'iframe', 'button', 'input', 'form', 'nav'];
        junkTags.forEach(tag => root.querySelectorAll(tag).forEach(el => el.remove()));

        // 2. Remove Classes (UI Noise)
        const junkClasses = [
            // General UI
            '.checkbox-wrapper', '.feedback-widget', '.site-header', 
            '.site-footer', '.cookie-banner', '.on-page-navigation', 
            '.copy-icon', '[aria-hidden="true"]', '.edit-page',
            
            // Salesforce Help Specifics (Breadcrumbs & Footer)
            '.breadcrumbs',           // "You are here..."
            '.breadcrumb',            // Variant
            'div[role="navigation"]', // Accessibility Navs
            '.related-links',         // "See Also" section
            '.related-topics',        // Variant
            '.topic-footer',          // Bottom links
            '.doc-footer'             // Footer
        ];
        
        junkClasses.forEach(selector => {
            root.querySelectorAll(selector).forEach(el => el.remove());
        });

        // 3. Smart Removal: "See Also" Headers that aren't in a container
        // Sometimes "See Also" is just an <h4> followed by a <ul> without a wrapper class.
        // We look for headers containing "See Also" and remove them + their next sibling list.
        const headers = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        headers.forEach(header => {
            if (header.textContent.trim().toLowerCase() === 'see also') {
                // Remove the header
                header.remove();
                // If the next element is a list, remove it too (it's the links)
                if (header.nextElementSibling && (header.nextElementSibling.tagName === 'UL' || header.nextElementSibling.tagName === 'OL')) {
                    header.nextElementSibling.remove();
                }
            }
        });
    }

    flattenTables(root) {
        const cells = root.querySelectorAll('td, th');
        
        cells.forEach(cell => {
            // Lists
            Array.from(cell.querySelectorAll('li')).forEach(li => {
                const span = document.createElement('span');
                span.innerHTML = `&bull; ${li.innerHTML}<br>`;
                li.replaceWith(span);
            });
            Array.from(cell.querySelectorAll('ul, ol')).forEach(list => {
                const frag = document.createDocumentFragment();
                while (list.firstChild) frag.appendChild(list.firstChild);
                list.replaceWith(frag);
            });

            // Definition Lists
            Array.from(cell.querySelectorAll('dt, dd')).forEach(node => {
                const span = document.createElement('span');
                if (node.tagName === 'DT') {
                    span.innerHTML = `<strong>${node.innerHTML}:</strong> `;
                } else {
                    span.innerHTML = `${node.innerHTML}<br>`;
                }
                node.replaceWith(span);
            });
            Array.from(cell.querySelectorAll('dl')).forEach(dl => {
                const frag = document.createDocumentFragment();
                while (dl.firstChild) frag.appendChild(dl.firstChild);
                dl.replaceWith(frag);
            });

            // Blocks
            Array.from(cell.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, blockquote, pre')).forEach(block => {
                const span = document.createElement('span');
                const content = block.innerHTML.trim();
                if (content) {
                    span.innerHTML = `${content}<br>`;
                    block.replaceWith(span);
                } else {
                    block.remove();
                }
            });

            // Cleanup
            cell.innerHTML = cell.innerHTML.replace(/(\r\n|\n|\r|\t)/gm, ' ');
        });
    }

    resolveLinks(root) {
        root.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                try { link.setAttribute('href', new URL(href, window.location.href).href); } catch (e) {}
            }
        });
    }

    resolveImages(root) {
        root.querySelectorAll('img[src]').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                try { img.setAttribute('src', new URL(src, window.location.href).href); } catch (e) {}
            }
        });
    }
}