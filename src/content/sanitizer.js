/**
 * Sanitizer.js (V6 - SLDS & Breadcrumb Fix)
 * Targets Salesforce Lightning Design System (SLDS) breadcrumbs and footers specifically.
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

        // 2. Remove Classes & IDs (UI Noise)
        const junkSelectors = [
            // General UI
            '.checkbox-wrapper', '.feedback-widget', '.site-header', 
            '.site-footer', '.cookie-banner', '.on-page-navigation', 
            '.copy-icon', '[aria-hidden="true"]', '.edit-page',
            
            // Salesforce Help Specifics (Breadcrumbs)
            '.breadcrumbs',             // Legacy
            '.slds-breadcrumb',         // SLDS standard
            '#bread-crumb-label',       // "You are here" label
            '[aria-labelledby="bread-crumb-label"]', // The container for the breadcrumb
            
            // Footers & Related Links
            '.related-links',         
            '.related-topics',        
            '.topic-footer',          
            '.doc-footer',
            '.slds-docked-composer'   // Chat widgets
        ];
        
        junkSelectors.forEach(selector => {
            root.querySelectorAll(selector).forEach(el => el.remove());
        });

        // 3. Smart Removal: "See Also" Headers
        // Removes any header text that says "See Also" and the list immediately following it
        const headers = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        headers.forEach(header => {
            if (header.textContent.trim().toLowerCase() === 'see also') {
                const nextSibling = header.nextElementSibling;
                header.remove(); // Remove the header
                // Remove the list of links below it
                if (nextSibling && (nextSibling.tagName === 'UL' || nextSibling.tagName === 'OL')) {
                    nextSibling.remove();
                }
            }
        });
        
        // 4. Smart Removal: "You are here" text stragglers
        // Sometimes the text node exists without a class. We look for paragraphs starting with "You are here"
        const paragraphs = Array.from(root.querySelectorAll('p, div'));
        paragraphs.forEach(p => {
             if (p.textContent.trim().startsWith('You are here:')) {
                 p.remove();
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