import { Sanitizer } from './sanitizer';

describe('Sanitizer Logic', () => {
    let sanitizer;

    beforeEach(() => {
        sanitizer = new Sanitizer();
        // Mock window.location
        delete window.location;
        window.location = { origin: 'https://example.com', href: 'https://example.com/doc' };
    });

    test('Should flatten Definition Lists (DL/DT/DD) inside tables', () => {
        const tableHtml = `
            <table>
                <tr>
                    <td>
                        <dl>
                            <dt>Type</dt>
                            <dd>String</dd>
                            <dt>Properties</dt>
                            <dd>Create, Filter</dd>
                        </dl>
                    </td>
                </tr>
            </table>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = tableHtml;
        
        const cleanHtml = sanitizer.clean(div);
        
        // Assertions: Check if <dt> became <strong> and <dd> has <br>
        expect(cleanHtml).toContain('<strong>Type:</strong>');
        expect(cleanHtml).toContain('String<br>');
        expect(cleanHtml).toContain('<strong>Properties:</strong>');
        expect(cleanHtml).not.toContain('<dl>'); // Wrapper should be gone
    });

    test('Should flatten Unordered Lists (UL/LI) inside tables', () => {
        const tableHtml = `
            <table><tr><td>
                <ul>
                    <li>Item A</li>
                    <li>Item B</li>
                </ul>
            </td></tr></table>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = tableHtml;
        const cleanHtml = sanitizer.clean(div);

        // The browser renders &bull; as the literal bullet character (•)
        expect(cleanHtml).toContain('• Item A<br>');
        expect(cleanHtml).toContain('• Item B<br>');
        expect(cleanHtml).not.toContain('<ul>');
    });

    test('Should resolve relative links', () => {
        const div = document.createElement('div');
        div.innerHTML = '<a href="../api/test.html">Link</a>';
        
        const cleanHtml = sanitizer.clean(div);
        expect(cleanHtml).toContain('href="https://example.com/api/test.html"');
    });

    test('Should remove junk elements', () => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>Content</div>
            <div class="cookie-banner">Cookie</div>
            <script>alert(1)</script>
        `;
        
        const cleanHtml = sanitizer.clean(div);
        expect(cleanHtml).toContain('Content');
        expect(cleanHtml).not.toContain('cookie-banner');
        expect(cleanHtml).not.toContain('<script>');
    });
});