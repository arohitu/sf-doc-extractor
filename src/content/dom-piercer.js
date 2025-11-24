/**
 * DomPiercer.js (V5 - Deep Flattening)
 * Recursively unwraps nested Shadow DOMs to capture code blocks and inner content.
 */

export class DomPiercer {
    constructor() {
        this.logPrefix = '[SF-Doc-MD]';
    }

    extract() {
        // Tier 1: Salesforce Specific
        const tier1 = this.attemptTier1();
        if (tier1) {
            console.log(`${this.logPrefix} Success via Tier 1 (Deep Flattening)`);
            return tier1;
        }

        // Tier 2: Direct Selectors
        const tier2 = this.attemptTier2();
        if (tier2) {
            console.log(`${this.logPrefix} Success via Tier 2 (Direct Selector)`);
            return tier2;
        }

        // Tier 3: Heuristic
        const tier3 = this.attemptTier3();
        if (tier3) {
            console.log(`${this.logPrefix} Success via Tier 3 (Heuristic)`);
            return tier3;
        }

        console.warn(`${this.logPrefix} All tiers failed. Returning body fallback.`);
        return document.body;
    }

    /**
     * Tier 1: Targeted Salesforce Extraction with Flattening
     */
    attemptTier1() {
        try {
            // 1. Find root
            const root = document.querySelector('doc-xml-content');
            if (!root) return null;

            // 2. Dive into root shadow
            const shadow = root.shadowRoot;
            if (!shadow) return this.flattenDom(root.querySelector('.main-container'));

            // 3. Dive deeper
            const container = this.findNodeDeep('.main-container', shadow) || 
                              this.findNodeDeep('doc-content', shadow);

            if (container) {
                // If it's the doc-content wrapper, dive one last time
                if (container.tagName === 'DOC-CONTENT' && container.shadowRoot) {
                    const innerMain = container.shadowRoot.querySelector('.main-container') || 
                                      container.shadowRoot.querySelector('main');
                    if (innerMain) return this.flattenDom(innerMain);
                    return this.flattenDom(container.shadowRoot);
                }
                return this.flattenDom(container);
            }

            return null;
        } catch (e) {
            console.error(`${this.logPrefix} Tier 1 Error:`, e);
            return null;
        }
    }

    /**
     * CRITICAL: Recursively clones a node, unwrapping any Shadow DOMs it finds.
     * This ensures code blocks (hidden in shadow roots) are captured.
     */
    flattenDom(node) {
        if (!node) return null;

        // 1. Create a shallow clone of the current node
        // If it's a ShadowRoot, we use a div wrapper
        let clone;
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            clone = document.createElement('div');
            clone.className = 'sf-shadow-root';
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            clone = node.cloneNode(false); // Shallow clone (no children yet)
        } else {
            return node.cloneNode(true); // Text nodes, comments, etc.
        }

        // 2. Determine where the "content" is. 
        // If the live node has a ShadowRoot, that's where the real content lives.
        // Otherwise, use standard children.
        let sourceChildren = [];
        if (node.nodeType === Node.ELEMENT_NODE && node.shadowRoot) {
            sourceChildren = Array.from(node.shadowRoot.childNodes);
            // Optional: You could also include light DOM children if they are slotted, 
            // but for Salesforce docs, the ShadowDOM usually supersedes the light DOM.
        } else {
            sourceChildren = Array.from(node.childNodes);
        }

        // 3. Recursively flatten children and append to clone
        sourceChildren.forEach(child => {
            const flattenedChild = this.flattenDom(child);
            if (flattenedChild) {
                clone.appendChild(flattenedChild);
            }
        });

        return clone;
    }

    attemptTier2() {
        const selectors = ['main', '[role="main"]', '.article-content', 'dx-article', '#content'];
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (this.isValidContent(el)) return this.flattenDom(el); // Flatten Tier 2 as well!
        }
        return null;
    }

    attemptTier3() {
        const candidates = document.querySelectorAll('div, article, section, main');
        let bestCandidate = null;
        let maxScore = 0;

        for (const el of candidates) {
            if (this.isJunk(el)) continue;
            let score = 0;
            const text = el.textContent || '';
            if (text.length > 1000) score += 50;
            if (text.length < 500) continue; 
            
            // ... scoring logic ...
            const lowerText = text.toLowerCase();
            if (lowerText.includes('api') || lowerText.includes('apex')) score += 20;

            if (score > maxScore) {
                maxScore = score;
                bestCandidate = el;
            }
        }
        return maxScore > 40 ? this.flattenDom(bestCandidate) : null;
    }

    findNodeDeep(selector, root) {
        if (!root) return null;
        const direct = root.querySelector ? root.querySelector(selector) : null;
        if (direct) return direct;
        const children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.shadowRoot) {
                const found = this.findNodeDeep(selector, child.shadowRoot);
                if (found) return found;
            }
        }
        return null;
    }

    isJunk(el) {
        if (!el) return true;
        const id = el.id || '';
        const cls = el.className || '';
        const lowerId = (typeof id === 'string') ? id.toLowerCase() : '';
        const lowerCls = (typeof cls === 'string') ? cls.toLowerCase() : '';

        if (lowerId.includes('onetrust') || lowerCls.includes('onetrust')) return true;
        if (lowerId.includes('cookie') || lowerCls.includes('cookie')) return true;
        if (lowerId.includes('sidebar') || lowerCls.includes('sidebar')) return true;
        if (lowerId.includes('nav') || lowerCls.includes('nav')) return true;
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT') return true;
        return false;
    }

    isValidContent(el) {
        if (!el || !el.textContent) return false;
        if (this.isJunk(el)) return false;
        return el.textContent.trim().length > 300;
    }
}