/**
 * Sanitizer.js (V3 - Robust Table Flattening)
 * Prepares HTML for conversion.
 */

export class Sanitizer {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    clean(element) {
        if (!element) return '';

        const clone = element.cloneNode(true);

        this.removeJunk(clone);
        this.resolveLinks(clone);
        this.resolveImages(clone);
        
        // Flatten tables LAST to ensure all other cleanup is done
        this.flattenTables(clone);

        return clone.innerHTML;
    }

    removeJunk(root) {
        const junkTags = ['script', 'style', 'noscript', 'svg', 'iframe', 'button', 'input', 'form'];
        junkTags.forEach(tag => root.querySelectorAll(tag).forEach(el => el.remove()));

        const junkClasses = [
            '.checkbox-wrapper', '.feedback-widget', '.site-header', 
            '.site-footer', '.cookie-banner', '.on-page-navigation', 
            '.copy-icon', '[aria-hidden="true"]', '.edit-page'
        ];
        junkClasses.forEach(selector => root.querySelectorAll(selector).forEach(el => el.remove()));
    }

    /**
     * Aggressively flattens block elements inside tables to <br> tags.
     * Uses reverse iteration to handle nested structures safely.
     */
    flattenTables(root) {
        const cells = root.querySelectorAll('td, th');
        
        cells.forEach(cell => {
            // 1. Convert Lists to pseudo-lists with <br>
            // We query ALL list items first
            const listItems = Array.from(cell.querySelectorAll('li'));
            listItems.forEach(li => {
                // Prepend bullet, append break
                const span = document.createElement('span');
                span.innerHTML = `&bull; ${li.innerHTML}<br>`;
                li.replaceWith(span);
            });

            // 2. Unwrap UL/OL tags (now empty of LI's or containing spans)
            const lists = Array.from(cell.querySelectorAll('ul, ol'));
            lists.forEach(list => {
                const fragment = document.createDocumentFragment();
                while (list.firstChild) {
                    fragment.appendChild(list.firstChild);
                }
                list.replaceWith(fragment);
            });

            // 3. Convert Block Elements (p, div, h*) to inline + <br>
            const blocks = Array.from(cell.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, blockquote, pre'));
            blocks.forEach(block => {
                const span = document.createElement('span');
                // Ensure space between blocks
                span.innerHTML = `${block.innerHTML}<br><br>`; 
                block.replaceWith(span);
            });

            // 4. Final Polish: Remove raw newlines inside the cell
            // Turndown will see the <br> tags we added, but we must remove 
            // the source code newlines to prevent it from generating \n characters.
            cell.innerHTML = cell.innerHTML.replace(/(\r\n|\n|\r)/gm, ' ');
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