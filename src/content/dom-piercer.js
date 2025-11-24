/**
 * DomPiercer.js (V4 - Shadow Clone Fix)
 * Fixes "ShadowRoot nodes are not clonable" error by wrapping shadow content in a div.
 */

export class DomPiercer {
    constructor() {
        this.logPrefix = '[SF-Doc-MD]';
    }

    extract() {
        // Tier 1: Salesforce Specific (The Happy Path)
        const tier1 = this.attemptTier1();
        if (tier1) {
            console.log(`${this.logPrefix} Success via Tier 1 (XML-Content)`);
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
     * Tier 1: Targeted Salesforce Extraction
     */
    attemptTier1() {
        try {
            // 1. Find the root element
            const root = document.querySelector('doc-xml-content');
            if (!root) return null;

            // 2. Access its Shadow Root
            const shadow = root.shadowRoot;
            if (!shadow) {
                return root.querySelector('.main-container') || root.querySelector('main');
            }

            // 3. Deep dive INSIDE the shadow root
            const container = this.findNodeDeep('.main-container', shadow) || 
                              this.findNodeDeep('doc-content', shadow);

            // 4. Handle nested 'doc-content'
            if (container && container.tagName === 'DOC-CONTENT' && container.shadowRoot) {
                // Try to find specific inner containers
                const innerMain = container.shadowRoot.querySelector('.main-container') || 
                                  container.shadowRoot.querySelector('main');
                
                if (innerMain) return innerMain;

                // FALLBACK FIX: If we can't find .main-container, we want the whole shadow root.
                // But we cannot return a ShadowRoot object. We must wrap its children.
                return this.createShadowWrapper(container.shadowRoot);
            }

            return container;
        } catch (e) {
            console.error(`${this.logPrefix} Tier 1 Error:`, e);
            return null;
        }
    }

    /**
     * Tier 2: Standard Semantic Selectors
     */
    attemptTier2() {
        const selectors = [
            'main', 
            '[role="main"]', 
            '.article-content', 
            'dx-article', 
            '#content'
        ];
        
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (this.isValidContent(el)) return el;
        }
        return null;
    }

    /**
     * Tier 3: Heuristic Search
     */
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

            const lowerText = text.toLowerCase();
            if (lowerText.includes('api') && lowerText.includes('string')) score += 20;
            if (lowerText.includes('apex')) score += 10;
            if (lowerText.includes('json')) score += 10;

            if (score > maxScore) {
                maxScore = score;
                bestCandidate = el;
            }
        }
        return maxScore > 40 ? bestCandidate : null;
    }

    /**
     * Helper: Safely converts a ShadowRoot into a standard <div> containing its children.
     * This avoids the "ShadowRoot nodes are not clonable" error in the Sanitizer.
     */
    createShadowWrapper(shadowRoot) {
        if (!shadowRoot) return null;

        const wrapper = document.createElement('div');
        wrapper.className = 'sf-shadow-wrapper'; // Marker class for debugging
        
        // Clone all children of the shadow root into our wrapper
        // Note: Array.from is used because childNodes is a live NodeList
        Array.from(shadowRoot.childNodes).forEach(child => {
            wrapper.appendChild(child.cloneNode(true));
        });

        return wrapper;
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