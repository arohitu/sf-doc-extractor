/**
 * Content Script Entry Point
 * Orchestrates the extraction, cleaning, and conversion process.
 * Listens for messages from the Popup UI.
 */

import { DomPiercer } from './dom-piercer';
import { Sanitizer } from './sanitizer';
import { MarkdownConverter } from './markdown';

// Instantiate our modules
const piercer = new DomPiercer();
const sanitizer = new Sanitizer();
const converter = new MarkdownConverter();

console.log('[SF-Doc-MD] Content script loaded and ready.');

// Listen for messages from the Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'EXTRACT_CONTENT') {
        handleExtraction(sendResponse);
        return true; // Keeps the message channel open for async response
    }
});

/**
 * Executes the extraction pipeline.
 * @param {Function} sendResponse - Callback to send data back to popup
 */
function handleExtraction(sendResponse) {
    try {
        console.log('[SF-Doc-MD] Starting extraction...');

        // 1. Pierce the DOM to find the content root
        const contentElement = piercer.extract();

        if (!contentElement) {
            console.warn('[SF-Doc-MD] content not found.');
            sendResponse({ 
                success: false, 
                error: 'Could not identify documentation content. Is this a Salesforce page?' 
            });
            return;
        }

        // 2. Sanitize the HTML (remove scripts, fix links)
        const cleanHtml = sanitizer.clean(contentElement);

        // 3. Convert to Markdown with metadata
        const metadata = {
            title: document.title || 'Salesforce Documentation',
            url: window.location.href
        };
        
        const markdown = converter.convert(cleanHtml, metadata);

        // 4. Send success back to Popup
        console.log('[SF-Doc-MD] Extraction complete.');
        sendResponse({ 
            success: true, 
            data: markdown 
        });

    } catch (error) {
        console.error('[SF-Doc-MD] Critical Error:', error);
        sendResponse({ 
            success: false, 
            error: error.message || 'Unknown extraction error' 
        });
    }
}