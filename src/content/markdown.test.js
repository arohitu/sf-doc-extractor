import { MarkdownConverter } from './markdown';

describe('MarkdownConverter', () => {
  test('adds YAML frontmatter with title and url', () => {
    const converter = new MarkdownConverter();
    const html = '<div><p>Hello World</p></div>';

    const md = converter.convert(html, {
      title: 'Test Doc',
      url: 'https://example.com/doc',
    });

    expect(md).toContain('---');
    expect(md).toContain('title: "Test Doc"');
    expect(md).toContain('url: "https://example.com/doc"');
    expect(md).toContain('Hello World');
  });

  test('preserves <br> tags to avoid breaking tables', () => {
    const converter = new MarkdownConverter();
    const html = '<table><tr><td>Line 1<br>Line 2</td></tr></table>';

    const md = converter.convert(html, { title: 't', url: 'u' });

    // The keepBreaks rule keeps <br> tags instead of turning them into newlines
    expect(md).toContain('Line 1<br>Line 2');
  });

  test('converts fenced code blocks with language from class', () => {
    const converter = new MarkdownConverter();
    const html =
      '<pre><code class="language-apex">System.debug(\'hi\');</code></pre>';

    const md = converter.convert(html, { title: 't', url: 'u' });

    expect(md).toContain('```apex');
    expect(md).toContain("System.debug('hi');");
  });
});


