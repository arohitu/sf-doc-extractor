/**
 * DomPiercer.js
 * Responsible for penetrating Shadow DOM boundaries and locating the main content.
 * Implements the 4-Tier Strategy defined in the Technical Design Document.
 */

export class DomPiercer {
    constructor() {
        this.logPrefix = '[SF-Doc-MD]';
    }

    /**
     * Main entry point. Tries all strategies in sequence.
     * @returns {HTMLElement|null} The found content element or null.
     */
    extract() {
        // Tier 1: Salesforce Specific (Shadow DOM)
        const tier1 = this.attemptTier1();
        if (tier1) {
            console.log(`${this.logPrefix} Success via Tier 1 (Shadow DOM)`);
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

        // Tier 4: Body Fallback
        console.log(`${this.logPrefix} Falling back to Tier 4 (Body)`);
        return document.body;
    }

    /**
     * Strategy 1: Salesforce Deep Shadow DOM
     * Targets: doc-xml-content -> shadowRoot -> doc-content -> shadowRoot -> .main-container
     */
    attemptTier1() {
        try {
            const root = document.querySelector('doc-xml-content');
            if (!root || !root.shadowRoot) return null;

            const mid = root.shadowRoot.querySelector('doc-content');
            if (!mid || !mid.shadowRoot) return null;

            // Salesforce often uses .main-container or just 'main' inside the deep shadow
            const container = mid.shadowRoot.querySelector('.main-container') ||
                            mid.shadowRoot.querySelector('main') ||
                            mid.shadowRoot.querySelector('[class*="main"]');
            
            return container || null;
        } catch (e) {
            console.error(`${this.logPrefix} Tier 1 error:`, e);
            return null;
        }
    }

    /**
     * Strategy 2: Standard Semantic Tags
     * Good for standard HTML documentation sites.
     */
    attemptTier2() {
        const selectors = [
            'main', 
            '[role="main"]', 
            '.content', 
            '.article-content', 
            '.help-content', 
            'article', 
            '.body'
        ];

        for (const selector of selectors) {
            const el = document.querySelector(selector);
            // Validation: Must have substantial text and not be a cookie banner
            if (this.validateElement(el, 500)) {
                return el;
            }
        }
        return null;
    }

    /**
     * Strategy 3: Heuristic Search (The "Smart" Fallback)
     * Scans divs/articles for keywords like "Apex", "API", and high text density.
     */
    attemptTier3() {
        const candidates = document.querySelectorAll('div, article, section');
        let bestCandidate = null;
        let maxScore = 0;

        for (const el of candidates) {
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
            
            let score = 0;
            const text = el.textContent || '';
            
            // Score based on length
            if (text.length > 1000) score += 50;
            if (text.length < 200) continue; // Too short

            // Score based on Salesforce/Tech keywords
            const lowerText = text.toLowerCase();
            if (lowerText.includes('metadata api')) score += 20;
            if (lowerText.includes('class')) score += 10;
            if (lowerText.includes('apex')) score += 10;
            if (lowerText.includes('xml')) score += 5;

            // Penalty for UI noise
            if (lowerText.includes('cookie')) score -= 100;
            if (lowerText.includes('privacy policy')) score -= 50;

            if (score > maxScore) {
                maxScore = score;
                bestCandidate = el;
            }
        }

        return maxScore > 40 ? bestCandidate : null;
    }

    /**
     * Helper: Validates if an element is worth extracting.
     * @param {HTMLElement} el 
     * @param {number} minLength 
     */
    validateElement(el, minLength = 200) {
        if (!el || !el.textContent) return false;
        
        const text = el.textContent.trim();
        if (text.length < minLength) return false;

        const lower = text.toLowerCase();
        // Skip obvious non-content elements
        if (lower.includes('accept all cookies') || lower.includes('privacy settings')) {
            return false;
        }

        return true;
    }
}