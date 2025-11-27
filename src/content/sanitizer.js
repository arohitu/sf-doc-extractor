/**
 * Sanitizer.js (V8 - Robust Table Detection & Title Stripping)
 * 1. Global strip of 'title' attributes to save tokens.
 * 2. Heuristic detection of Edition tables (not just class-based).
 */

export class Sanitizer {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    clean(element) {
        if (!element) return '';

        const clone = element.cloneNode(true);

        // 1. Remove Noise
        this.removeJunk(clone);
        
        // 2. Token Optimization: Remove decorative icons
        this.removeIcons(clone);

        // 3. Token Optimization: Remove 'title' attributes (Huge savings)
        this.removeTitles(clone);

        // 4. Flatten "Edition" tables (Heuristic + Class based)
        this.processEditionTables(clone);

        // 5. Standard Cleanups
        this.resolveLinks(clone);
        this.resolveImages(clone);
        this.flattenTables(clone); 

        return clone.innerHTML;
    }

    /**
     * Removes 'title' attributes from all elements.
     * Salesforce docs use massive tooltip titles that AI doesn't need.
     */
    removeTitles(root) {
        const elements = root.querySelectorAll('[title]');
        elements.forEach(el => el.removeAttribute('title'));
    }

    /**
     * Converts Salesforce "Edition" tables into simple text.
     * Updated to find tables even if the 'edition' class is missing.
     */
    processEditionTables(root) {
        // Target explicit classes AND tables that look like edition tables
        const tables = root.querySelectorAll('table');
        
        tables.forEach(table => {
            const text = table.textContent.toLowerCase();
            const isEditionTable = table.classList.contains('edition') || 
                                 text.includes('available in') || 
                                 text.includes('supported products') ||
                                 text.includes('user permissions needed');

            if (!isEditionTable) return;

            // Extract content
            const cells = [];
            table.querySelectorAll('td').forEach(td => {
                cells.push(td.innerHTML.trim());
            });

            if (cells.length > 0) {
                const div = document.createElement('div');
                // If it's a simple link (like your example), don't even use a blockquote. Just text.
                if (cells.length === 1 && cells[0].startsWith('<a')) {
                     div.innerHTML = `<p><strong>Supported Editions:</strong> ${cells[0]}</p>`;
                } else {
                     div.innerHTML = `<blockquote><strong>Supported Editions:</strong><br>${cells.join('<br>')}</blockquote>`;
                }
                table.replaceWith(div);
            } else {
                table.remove();
            }
        });
    }

    removeIcons(root) {
        const images = root.querySelectorAll('img');
        images.forEach(img => {
            const src = (img.getAttribute('src') || '').toLowerCase();
            const alt = (img.getAttribute('alt') || '').toLowerCase();
            if (src.includes('icon_note') || src.includes('icon_tip') || src.includes('icon_warning') || alt === 'note' || alt === 'tip') {
                img.remove();
            }
        });
    }

    removeJunk(root) {
        const junkTags = ['script', 'style', 'noscript', 'svg', 'iframe', 'button', 'input', 'form', 'nav'];
        junkTags.forEach(tag => root.querySelectorAll(tag).forEach(el => el.remove()));

        const junkSelectors = [
            '.checkbox-wrapper', '.feedback-widget', '.site-header', 
            '.site-footer', '.cookie-banner', '.on-page-navigation', 
            '.copy-icon', '[aria-hidden="true"]', '.edit-page',
            '.breadcrumbs', '.slds-breadcrumb', '#bread-crumb-label',
            '[aria-labelledby="bread-crumb-label"]', '.related-links',         
            '.related-topics', '.topic-footer', '.doc-footer', '.slds-docked-composer'
        ];
        
        junkSelectors.forEach(selector => {
            root.querySelectorAll(selector).forEach(el => el.remove());
        });

        // "See Also" header removal
        Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(header => {
            if (header.textContent.trim().toLowerCase() === 'see also') {
                const nextSibling = header.nextElementSibling;
                header.remove();
                if (nextSibling && (nextSibling.tagName === 'UL' || nextSibling.tagName === 'OL')) nextSibling.remove();
            }
        });
        
        // "You are here" text removal
        Array.from(root.querySelectorAll('p, div')).forEach(p => {
             if (p.textContent.trim().startsWith('You are here:')) p.remove();
        });
    }

    flattenTables(root) {
        const cells = root.querySelectorAll('td, th');
        cells.forEach(cell => {
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
            Array.from(cell.querySelectorAll('dt, dd')).forEach(node => {
                const span = document.createElement('span');
                if (node.tagName === 'DT') span.innerHTML = `<strong>${node.innerHTML}:</strong> `;
                else span.innerHTML = `${node.innerHTML}<br>`;
                node.replaceWith(span);
            });
            Array.from(cell.querySelectorAll('dl')).forEach(dl => {
                const frag = document.createDocumentFragment();
                while (dl.firstChild) frag.appendChild(dl.firstChild);
                dl.replaceWith(frag);
            });
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