/**
 * Markdown.js
 * Configures TurndownService with GFM (GitHub Flavored Markdown) and custom Salesforce rules.
 */

import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export class MarkdownConverter {
    constructor() {
        // Initialize Turndown with standard settings
        this.turndownService = new TurndownService({
            headingStyle: 'atx',      // Use # for headings
            codeBlockStyle: 'fenced', // Use ``` for code blocks
            emDelimiter: '*'          // Use * for italics
        });

        // 1. Enable Tables (Crucial for Salesforce Field Reference guides)
        this.turndownService.use(gfm);

        // 2. Add Custom Rules
        this.addSalesforceRules();
    }

    /**
     * Converts HTML string to Markdown with Frontmatter.
     * @param {string} html 
     * @param {Object} metadata 
     */
    convert(html, metadata) {
        if (!html) return '';

        let markdown = this.turndownService.turndown(html);
        
        // Add YAML Frontmatter for AI Context
        const frontmatter = [
            '---',
            `title: "${metadata.title || 'Untitled'}"`,
            `url: "${metadata.url}"`,
            `fetched_at: "${new Date().toISOString()}"`,
            '---',
            '',
            ''
        ].join('\n');

        return frontmatter + markdown;
    }

    addSalesforceRules() {
        // Rule: Preserve Code Block Language
        // Salesforce uses <pre><code class="language-apex">...
        this.turndownService.addRule('fencedCodeBlock', {
            filter: function (node, options) {
                return (
                    options.codeBlockStyle === 'fenced' &&
                    node.nodeName === 'PRE' &&
                    node.firstChild &&
                    node.firstChild.nodeName === 'CODE'
                );
            },
            replacement: function (content, node, options) {
                const className = node.firstChild.getAttribute('class') || '';
                // Extract "apex" from "language-apex"
                const language = (className.match(/language-(\S+)/) || [null, ''])[1];
                
                return (
                    '\n\n' + options.fence + language + '\n' +
                    node.firstChild.textContent +
                    '\n' + options.fence + '\n\n'
                );
            }
        });

        // Rule: Salesforce Callouts (Notes/Warnings)
        // Usually <div class="box-info"> or <div class="box-warning">
        this.turndownService.addRule('salesforceCallouts', {
            filter: (node) => {
                if (node.nodeName !== 'DIV') return false;
                const cls = node.getAttribute('class') || '';
                return cls.includes('box-info') || cls.includes('box-warning') || cls.includes('box-tip');
            },
            replacement: (content, node) => {
                // Convert to Blockquote
                let type = 'Note';
                const cls = node.getAttribute('class') || '';
                if (cls.includes('warning')) type = 'Warning';
                if (cls.includes('tip')) type = 'Tip';

                return `\n> **${type}:** ${content.trim()}\n\n`;
            }
        });

        // Rule: Strip empty links (often used for anchors)
        this.turndownService.addRule('removeEmptyLinks', {
            filter: (node) => {
                return node.nodeName === 'A' && node.getAttribute('href') && !node.textContent.trim();
            },
            replacement: () => ''
        });
    }
}