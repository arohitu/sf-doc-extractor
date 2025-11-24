/**
 * Popup tests
 * Verifies happy-path extraction and download wiring without touching production logic.
 */

describe('Popup UI integration', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="status-container" class="status-box">
        <span id="status-icon"></span>
        <span id="status-text"></span>
      </div>
      <button id="btn-extract">Copy Markdown</button>
      <button id="btn-download" disabled>Download</button>
    `;

    // Reset chrome mocks for each test
    global.chrome.tabs.query.mockReset();
    global.chrome.tabs.sendMessage.mockReset();
    global.chrome.scripting.executeScript.mockReset();
    global.chrome.downloads.download.mockReset();

    global.chrome.tabs.query.mockResolvedValue([{ id: 123 }]);

    // First call is PING from injectContentScript (no response needed),
    // second call is the actual EXTRACT_CONTENT request.
    global.chrome.tabs.sendMessage.mockImplementation((tabId, message, callback) => {
      if (typeof callback === 'function') {
        if (message.action === 'EXTRACT_CONTENT') {
          callback({ success: true, data: '# Markdown\n\nContent' });
        } else {
          callback({});
        }
      }
      return Promise.resolve();
    });

    // Ensure clipboard mock exists
    if (!navigator.clipboard) {
      navigator.clipboard = {};
    }
    navigator.clipboard.writeText = jest.fn(() => Promise.resolve());

    // Import popup script AFTER DOM + globals are ready
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require
      require('./popup');
    });

    // Trigger DOMContentLoaded for the popup script
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('successful extraction copies markdown, updates status, and enables download', async () => {
    const btnExtract = document.getElementById('btn-extract');
    const btnDownload = document.getElementById('btn-download');
    const statusText = document.getElementById('status-text');

    // Sanity
    expect(btnExtract).not.toBeNull();
    expect(btnDownload).not.toBeNull();

    // Click extract
    btnExtract.click();

    // Allow async handlers (promises + callbacks) to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(global.chrome.tabs.query).toHaveBeenCalled();
    expect(global.chrome.tabs.sendMessage).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('# Markdown\n\nContent');

    // Status should be success and download should be enabled
    expect(statusText.textContent).toContain('Copied to Clipboard');
    expect(btnDownload.disabled).toBe(false);
  });

  test('download button triggers chrome.downloads.download when data is present', async () => {
    const btnExtract = document.getElementById('btn-extract');
    const btnDownload = document.getElementById('btn-download');

    // First, perform a successful extract
    btnExtract.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Then click download
    btnDownload.click();

    expect(global.chrome.downloads.download).toHaveBeenCalled();
    const call = global.chrome.downloads.download.mock.calls[0][0];
    expect(call.filename).toMatch(/salesforce-doc-.*\.md$/);
  });
});


