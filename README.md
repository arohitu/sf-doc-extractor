# **Salesforce Documentation Extractor (SF-Doc-MD)**

A Chrome Extension designed to extract technical documentation from Salesforce's complex Single Page Applications (SPAs). It converts Shadow DOM-heavy pages into clean, context-aware Markdown optimized for AI Agents (LLMs).

## **Features**

* **Shadow DOM Piercing:** Uses a recursive "Deep Flattening" strategy to extract content hidden inside nested Web Components (LWC).  
* **AI-Ready Markdown:** Outputs clean Markdown with YAML frontmatter, specifically formatted tables (GFM), and fenced code blocks.  
* **Sanitization:** Automatically strips "OneTrust" cookie banners, navigation sidebars, and "Was this helpful?" widgets.  
* **Zero-Config:** Works out of the box on Salesforce Developer Guides and Help Articles.

## **Installation**

1. **Clone the repository:**  
   git clone \<repository-url\>  
   cd sf-doc-extractor

2. **Install Dependencies:**  
   npm install

3. **Build the Extension:**  
   \# For active development (auto-rebuilds on change)  
   npm run watch

   \# For production release (minified)  
   npm run build

4. **Load into Chrome:**  
   * Open chrome://extensions/  
   * Enable **Developer mode** (top right toggle).  
   * Click **Load unpacked**.  
   * Select the **dist/** folder inside this project.

## **Usage**

1. Navigate to any [Salesforce Developer Documentation](https://developer.salesforce.com/docs/) page.  
2. Click the extension icon in the Chrome toolbar.  
3. Click **"Copy Markdown"**.  
4. Paste the result into ChatGPT, Claude, or your local LLM context.

## **Technical Architecture**

* **Manifest V3:** Secure and modern extension architecture.  
* **Webpack:** Bundles external dependencies (turndown, turndown-plugin-gfm).  
* **DomPiercer.js:** A custom engine that implements a "4-Tier Extraction Strategy":  
  1. **Tier 1:** Deep recursive flattening of doc-xml-content (Salesforce specific).  
  2. **Tier 2:** Semantic selector search (main, article).  
  3. **Tier 3:** Heuristic scoring (text density analysis).  
  4. **Tier 4:** Fallback body dump.

## **Troubleshooting**

* **"ShadowRoot nodes are not clonable":** This is fixed in v1.0 using the createShadowWrapper utility.  
* **Empty Output:** Ensure the page is fully loaded. The extension waits for the doc-xml-content tag to appear.

## **License**

MIT