/**
 * Tests the content script orchestration by exercising the message handler wiring.
 * We mock DomPiercer/Sanitizer/MarkdownConverter so no real DOM traversal runs.
 */

jest.mock('./dom-piercer', () => {
  return {
    DomPiercer: jest.fn().mockImplementation(() => ({
      // We do not rely on the real DOM here because Sanitizer is fully mocked.
      extract: jest.fn(() => ({ tagName: 'DIV' })),
    })),
  };
});

jest.mock('./sanitizer', () => {
  return {
    Sanitizer: jest.fn().mockImplementation(() => ({
      clean: jest.fn(() => '<p>Sanitized HTML</p>'),
    })),
  };
});

jest.mock('./markdown', () => {
  return {
    MarkdownConverter: jest.fn().mockImplementation(() => ({
      convert: jest.fn(() => '# Markdown Output'),
    })),
  };
});

describe('Content script message handler', () => {
  test('responds with markdown on EXTRACT_CONTENT', () => {
    // Capture the onMessage listener that index.js registers
    const addListenerSpy = global.chrome.runtime.onMessage.addListener;
    addListenerSpy.mockClear();

    jest.isolateModules(() => {
      // eslint-disable-next-line global-require
      require('./index');
    });

    expect(addListenerSpy).toHaveBeenCalled();
    const handler = addListenerSpy.mock.calls[0][0];

    const sendResponse = jest.fn();

    handler({ action: 'EXTRACT_CONTENT' }, {}, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      success: true,
      data: '# Markdown Output',
    });
  });

  test('returns error when extraction fails', () => {
    const addListenerSpy = global.chrome.runtime.onMessage.addListener;
    addListenerSpy.mockClear();

    jest.isolateModules(() => {
      jest.resetModules();

      jest.doMock('./dom-piercer', () => ({
        DomPiercer: jest.fn().mockImplementation(() => ({
          extract: jest.fn(() => null), // Simulate no content found
        })),
      }));

      // eslint-disable-next-line global-require
      require('./index');
    });

    const handler = addListenerSpy.mock.calls[0][0];
    const sendResponse = jest.fn();

    handler({ action: 'EXTRACT_CONTENT' }, {}, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
      }),
    );
  });
});


