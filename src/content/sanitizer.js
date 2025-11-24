/**
 * Sanitizer.js (V4 - Definition List Support)
 * Now flattens <dl>, <dt>, <dd> to prevent table breakage on Object Reference pages.
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
        
        // Flatten tables LAST
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

    flattenTables(root) {
        const cells = root.querySelectorAll('td, th');
        
        cells.forEach(cell => {
            // 1. Convert Lists (ul/ol/li)
            const listItems = Array.from(cell.querySelectorAll('li'));
            listItems.forEach(li => {
                const span = document.createElement('span');
                span.innerHTML = `&bull; ${li.innerHTML}<br>`;
                li.replaceWith(span);
            });
            
            Array.from(cell.querySelectorAll('ul, ol')).forEach(list => {
                const fragment = document.createDocumentFragment();
                while (list.firstChild) fragment.appendChild(list.firstChild);
                list.replaceWith(fragment);
            });

            // 2. CRITICAL FIX: Convert Definition Lists (dl, dt, dd)
            // These are used heavily in "Field Details" columns
            const definitions = Array.from(cell.querySelectorAll('dt, dd'));
            definitions.forEach(node => {
                const span = document.createElement('span');
                
                if (node.tagName === 'DT') {
                    // Make terms (like "Type", "Properties") bold and add break
                    span.innerHTML = `<strong>${node.innerHTML}:</strong> `;
                } else {
                    // Definitions get a break after
                    span.innerHTML = `${node.innerHTML}<br>`;
                }
                node.replaceWith(span);
            });

            // Unwrap the <dl> wrapper
            Array.from(cell.querySelectorAll('dl')).forEach(dl => {
                const fragment = document.createDocumentFragment();
                while (dl.firstChild) fragment.appendChild(dl.firstChild);
                dl.replaceWith(fragment);
            });

            // 3. Convert Generic Blocks (p, div, etc)
            const blocks = Array.from(cell.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, blockquote, pre'));
            blocks.forEach(block => {
                const span = document.createElement('span');
                const content = block.innerHTML.trim();
                if (content) {
                    // Use single break for compactness, preserve formatting
                    span.innerHTML = `${content}<br>`;
                    block.replaceWith(span);
                } else {
                    block.remove();
                }
            });

            // 4. Remove ALL raw newlines/tabs to prevent Turndown confusion
            // We rely 100% on our <br> tags for formatting now.
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