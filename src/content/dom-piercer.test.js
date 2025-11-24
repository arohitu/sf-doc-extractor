import { DomPiercer } from './dom-piercer';

describe('DomPiercer', () => {
  test('flattenDom unwraps shadow DOM content', () => {
    const host = document.createElement('div');
    const shadow = host.attachShadow({ mode: 'open' });
    const span = document.createElement('span');
    span.textContent = 'Inner content';
    shadow.appendChild(span);

    const piercer = new DomPiercer();
    const clone = piercer.flattenDom(host);

    expect(clone).not.toBeNull();
    expect(clone.querySelector('span').textContent).toBe('Inner content');
  });

  test('extract falls back to sensible main content when present', () => {
    document.body.innerHTML = `
      <header id="nav">Navigation</header>
      <main>Primary documentation content</main>
    `;

    const piercer = new DomPiercer();
    const result = piercer.extract();

    expect(result).not.toBeNull();
    expect(result.textContent).toContain('Primary documentation content');
  });
});


