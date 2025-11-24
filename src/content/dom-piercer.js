/**
 * DomPiercer.js (Enhanced V2)
 * Implements recursive Shadow DOM piercing to find nested Salesforce components.
 */

export class DomPiercer {
    constructor() {
        this.logPrefix = '[SF-Doc-MD]';
    }

    extract() {
        // Tier 1: Deep Recursive Shadow DOM Search (The Fix)
        const tier1 = this.attemptTier1();
        if (tier1) {
            console.log(`${this.logPrefix} Success via Tier 1 (Deep Shadow Scan)`);
            return tier1;
        }

        // Tier 2: Direct Semantic Selectors
        const tier2 = this.attemptTier2();
        if (tier2) {
            console.log(`${this.logPrefix} Success via Tier 2 (Direct Selectors)`);
            return tier2;
        }

        // Tier 3: Heuristic Search
        const tier3 = this.attemptTier3();
        if (tier3) {
            console.log(`${this.logPrefix} Success via Tier 3 (Heuristic)`);
            return tier3;
        }

        return document.body;
    }

    /**
     * Tier 1: Enhanced recursive search for 'doc-xml-content'
     */
    attemptTier1() {
        try {
            // 1. Hunt for the 'doc-xml-content' tag anywhere in the Shadow Tree
            const xmlContainer = this.findNodeDeep('doc-xml-content');
            
            if (!xmlContainer || !xmlContainer.shadowRoot) {
                console.log(`${this.logPrefix} 'doc-xml-content' not found or has no shadowRoot.`);
                return null;
            }

            // 2. Go one level deeper to 'doc-content'
            const docContent = xmlContainer.shadowRoot.querySelector('doc-content');
            if (!docContent || !docContent.shadowRoot) {
                console.log(`${this.logPrefix} 'doc-content' not found inside xml-content.`);
                return null;
            }

            // 3. Grab the main container
            const container = docContent.shadowRoot.querySelector('.main-container') ||
                              docContent.shadowRoot.querySelector('main') ||
                              docContent.shadowRoot.querySelector('[class*="main"]');
            
            return container || null;
        } catch (e) {
            console.error(`${this.logPrefix} Tier 1 Error:`, e);
            return null;
        }
    }

    /**
     * Recursive function to find a selector inside ANY nested shadow root.
     * This is expensive but necessary for Salesforce.
     */
    findNodeDeep(selector, root = document.body) {
        // 1. Check direct children
        const directMatch = root.querySelector(selector);
        if (directMatch) return directMatch;

        // 2. Iterate over ALL elements to find those with shadowRoots
        // We use TreeWalker for performance over querySelectorAll('*')
        const walker = document.createTreeWalker(
            root === document.body ? document.body : root,
            NodeFilter.SHOW_ELEMENT,
            { acceptNode: (node) => node.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP }
        );

        while (walker.nextNode()) {
            const shadowHost = walker.currentNode;
            const shadowRoot = shadowHost.shadowRoot;
            
            if (shadowRoot) {
                // Recursive call into the shadow root
                const found = this.findNodeDeep(selector, shadowRoot);
                if (found) return found;
            }
        }

        return null;
    }

    // --- Tiers 2 & 3 remain mostly the same, but let's tighten Tier 3 ---

    attemptTier2() {
        // Added 'dx-article' which is sometimes used
        const selectors = ['main', '[role="main"]', '.article-content', 'dx-article'];
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (this.validateElement(el, 500)) return el;
        }
        return null;
    }

    attemptTier3() {
        // Only look for distinct article-like containers to avoid grabbing sidebars
        const candidates = document.querySelectorAll('article, section, [class*="content"]');
        let bestCandidate = null;
        let maxScore = 0;

        for (const el of candidates) {
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
            
            let score = 0;
            const text = el.textContent || '';
            
            if (text.length > 1000) score += 50;
            if (text.length < 500) continue; 

            const lowerText = text.toLowerCase();
            // Penalize sidebars/navs heavily
            if (lowerText.includes('filter') && lowerText.includes('category')) score -= 50;
            if (el.className.includes('nav') || el.className.includes('sidebar')) score -= 100;

            if (score > maxScore) {
                maxScore = score;
                bestCandidate = el;
            }
        }
        return maxScore > 40 ? bestCandidate : null;
    }

    validateElement(el, minLength = 200) {
        if (!el || !el.textContent) return false;
        const text = el.textContent.trim();
        if (text.length < minLength) return false;
        const lower = text.toLowerCase();
        if (lower.includes('cookie') || lower.includes('privacy')) return false;
        return true;
    }
}