/**
 * DomPiercer.js (V3 - Anti-Cookie Defense)
 * Refined to ignore OneTrust banners and dig deeper into doc-xml-content.
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
     * Strategy: Find doc-xml-content, then recursively hunt for the main container inside it.
     */
    attemptTier1() {
        try {
            // 1. Find the root element (Probe confirmed this exists at depth 0)
            const root = document.querySelector('doc-xml-content');
            if (!root) return null;

            // 2. Access its Shadow Root
            // Note: If it's closed, we can't get in (but Salesforce usually leaves them open or uses LWC polyfills)
            const shadow = root.shadowRoot;
            if (!shadow) {
                // Edge case: Sometimes LWC renders in Light DOM if specified
                return root.querySelector('.main-container') || root.querySelector('main');
            }

            // 3. Deep dive INSIDE the shadow root to find the content
            // We search for '.main-container' or 'doc-content' deep inside
            const container = this.findNodeDeep('.main-container', shadow) || 
                              this.findNodeDeep('doc-content', shadow);

            // 4. If we found 'doc-content', we need to dive into THAT shadow root too
            if (container && container.tagName === 'DOC-CONTENT' && container.shadowRoot) {
                return container.shadowRoot.querySelector('.main-container') || 
                       container.shadowRoot.querySelector('main') || 
                       container.shadowRoot;
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
            '#content' // Generic fallback
        ];
        
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (this.isValidContent(el)) return el;
        }
        return null;
    }

    /**
     * Tier 3: Heuristic Search (The "Smart" Fallback)
     */
    attemptTier3() {
        const candidates = document.querySelectorAll('div, article, section, main');
        let bestCandidate = null;
        let maxScore = 0;

        for (const el of candidates) {
            // CRITICAL: Skip the Cookie Banner immediately
            if (this.isJunk(el)) continue;
            
            let score = 0;
            const text = el.textContent || '';
            
            // Length points
            if (text.length > 1000) score += 50;
            if (text.length < 500) continue; 

            // Tech keywords
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
     * Helper: Recursively find a node inside a root (Light or Shadow)
     */
    findNodeDeep(selector, root) {
        if (!root) return null;
        
        // Check direct children
        const direct = root.querySelector ? root.querySelector(selector) : null;
        if (direct) return direct;

        // Walk the tree checking shadow roots
        // Use TreeWalker on the root's children if possible, or fallback to manual iteration
        const children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.shadowRoot) {
                const found = this.findNodeDeep(selector, child.shadowRoot);
                if (found) return found;
            }
            // Also check light dom children recursively if needed (can be expensive)
            // For now, let's stick to jumping shadow boundaries
        }
        return null;
    }

    /**
     * Helper: Returns true if the element is definitely NOT content
     */
    isJunk(el) {
        if (!el) return true;
        const id = el.id || '';
        const cls = el.className || '';
        const lowerId = (typeof id === 'string') ? id.toLowerCase() : '';
        const lowerCls = (typeof cls === 'string') ? cls.toLowerCase() : '';

        // The Blacklist
        if (lowerId.includes('onetrust') || lowerCls.includes('onetrust')) return true;
        if (lowerId.includes('cookie') || lowerCls.includes('cookie')) return true;
        if (lowerId.includes('sidebar') || lowerCls.includes('sidebar')) return true;
        if (lowerId.includes('nav') || lowerCls.includes('nav')) return true;
        
        // Tag blacklist
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT') return true;

        return false;
    }

    isValidContent(el) {
        if (!el || !el.textContent) return false;
        if (this.isJunk(el)) return false; // Use the same junk filter
        return el.textContent.trim().length > 300;
    }
}