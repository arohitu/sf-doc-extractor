/**
 * Markdown.js
 * Configures TurndownService with GFM and custom rules.
 */

import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export class MarkdownConverter {
    constructor() {
        this.turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            emDelimiter: '*'
        });

        this.turndownService.use(gfm);
        this.addSalesforceRules();
    }

    convert(html, metadata) {
        if (!html) return '';

        let markdown = this.turndownService.turndown(html);
        
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
        // CRITICAL FIX: Keep <br> as <br> tags.
        // Default Turndown converts <br> to \n, which breaks Markdown Tables.
        this.turndownService.addRule('keepBreaks', {
            filter: 'br',
            replacement: function (content) {
                return '<br>';
            }
        });

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
                const language = (className.match(/language-(\S+)/) || [null, ''])[1];
                
                return (
                    '\n\n' + options.fence + language + '\n' +
                    node.firstChild.textContent +
                    '\n' + options.fence + '\n\n'
                );
            }
        });

        this.turndownService.addRule('salesforceCallouts', {
            filter: (node) => {
                if (node.nodeName !== 'DIV') return false;
                const cls = node.getAttribute('class') || '';
                return cls.includes('box-info') || cls.includes('box-warning') || cls.includes('box-tip');
            },
            replacement: (content, node) => {
                let type = 'Note';
                const cls = node.getAttribute('class') || '';
                if (cls.includes('warning')) type = 'Warning';
                if (cls.includes('tip')) type = 'Tip';
                return `\n> **${type}:** ${content.trim()}\n\n`;
            }
        });

        this.turndownService.addRule('removeEmptyLinks', {
            filter: (node) => {
                return node.nodeName === 'A' && node.getAttribute('href') && !node.textContent.trim();
            },
            replacement: () => ''
        });
    }
}