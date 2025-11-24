/**
 * Popup.js
 * Handles user interactions and orchestrates script injection.
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnExtract = document.getElementById('btn-extract');
    const btnDownload = document.getElementById('btn-download');
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const statusContainer = document.getElementById('status-container');

    let extractedData = null;

    // 1. Extract Button Handler
    btnExtract.addEventListener('click', async () => {
        updateStatus('loading', 'Scanning Shadow DOM...');
        
        const tab = await getActiveTab();
        if (!tab) {
            updateStatus('error', 'No active tab found.');
            return;
        }

        try {
            // Ensure content script is injected
            await injectContentScript(tab.id);

            // Send command
            const response = await sendMessageToTab(tab.id, { action: 'EXTRACT_CONTENT' });

            if (response && response.success) {
                // Success!
                extractedData = response.data;
                await navigator.clipboard.writeText(extractedData);
                
                updateStatus('success', 'Copied to Clipboard!');
                btnDownload.disabled = false;
            } else {
                throw new Error(response.error || 'Unknown extraction failure');
            }

        } catch (error) {
            console.error(error);
            updateStatus('error', error.message || 'Extraction Failed');
        }
    });

    // 2. Download Button Handler
    btnDownload.addEventListener('click', () => {
        if (!extractedData) return;
        
        const blob = new Blob([extractedData], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        chrome.downloads.download({
            url: url,
            filename: `salesforce-doc-${timestamp}.md`,
            saveAs: true
        });
    });

    // --- Helpers ---

    async function getActiveTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    /**
     * Safely injects the content script.
     * Checks if script is already running to avoid "redeclaration" errors.
     */
    async function injectContentScript(tabId) {
        try {
            // Ping to check if script exists
            await chrome.tabs.sendMessage(tabId, { action: 'PING' });
        } catch (e) {
            // If ping fails, script isn't there. Inject it.
            console.log('Injecting content script...');
            await chrome.scripting.executeScript({
                target: { tabId },
                files: ['content.bundle.js']
            });
        }
    }

    function sendMessageToTab(tabId, message) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });
    }

    function updateStatus(type, message) {
        statusText.textContent = message;
        statusContainer.className = 'status-box'; // Reset classes
        
        if (type === 'loading') {
            statusIcon.textContent = '⏳';
            statusIcon.className = 'spin'; // You could add a spin animation in CSS
        } else if (type === 'success') {
            statusIcon.textContent = '✅';
            statusContainer.classList.add('success');
        } else if (type === 'error') {
            statusIcon.textContent = '❌';
            statusContainer.classList.add('error');
        } else {
            statusIcon.textContent = '👋';
        }
    }
});