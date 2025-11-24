// Global Jest setup for Chrome Extension environment

// Basic chrome API stub so modules that register listeners at import time do not fail.
global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
    lastError: null,
  },
  tabs: {
    query: jest.fn(() => Promise.resolve([{ id: 1 }])),
    sendMessage: jest.fn(() => Promise.resolve()),
  },
  scripting: {
    executeScript: jest.fn(() => Promise.resolve()),
  },
  downloads: {
    download: jest.fn(),
  },
};

// Provide a clipboard mock for navigator.clipboard.writeText
if (typeof navigator !== 'undefined') {
  if (!navigator.clipboard) {
    navigator.clipboard = {};
  }
  navigator.clipboard.writeText =
    navigator.clipboard.writeText || jest.fn(() => Promise.resolve());
}

// jsdom does not implement URL.createObjectURL; mock it for download tests.
if (typeof URL !== 'undefined' && !URL.createObjectURL) {
  URL.createObjectURL = jest.fn(() => 'blob:mock-url');
}



