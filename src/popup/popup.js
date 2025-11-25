/**
 * Popup.js
 * Handles user interactions and orchestrates script injection.
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnExtract = document.getElementById('btn-extract');
    const statusText = document.getElementById('status-text');
    const statusIcon = document.getElementById('status-icon');
    const statusContainer = document.getElementById('status-container');

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
                await navigator.clipboard.writeText(response.data);
                updateStatus('success', 'Copied to Clipboard!');
                
                // Optional: Close popup after success to feel faster?
                // window.close(); 
            } else {
                throw new Error(response.error || 'Unknown extraction failure');
            }

        } catch (error) {
            console.error(error);
            updateStatus('error', error.message || 'Extraction Failed');
        }
    });

    // --- Helpers ---

    async function getActiveTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    async function injectContentScript(tabId) {
        try {
            await chrome.tabs.sendMessage(tabId, { action: 'PING' });
        } catch (e) {
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
        // Show the container now that we have a message
        statusContainer.classList.remove('hidden');
        
        statusText.textContent = message;
        statusContainer.className = 'status-box'; // Reset classes
        
        if (type === 'loading') {
            statusIcon.textContent = '⏳';
            statusIcon.className = 'spin';
        } else if (type === 'success') {
            statusIcon.textContent = '✅';
            statusContainer.classList.add('success');
        } else if (type === 'error') {
            statusIcon.textContent = '❌';
            statusContainer.classList.add('error');
        }
    }
});