# **Technical Design Document: Salesforce Documentation Extractor (SF-Doc-MD)**

Version: 1.0  
Status: Approved for Development  
Date: November 25, 2025  
Target Platform: Google Chrome Extension (Manifest V3)

## **1. Executive Summary**

The **SF-Doc-MD** is a specialized browser extension designed to bridge the gap between complex, dynamic web documentation (specifically Salesforce) and Large Language Model (LLM) ingestion pipelines.

While generic web clippers fail to penetrate Salesforce’s Shadow DOM or capture the semantic meaning of technical documentation, SF-Doc-MD employs a custom 4-tier deep-traversal strategy to extract content, sanitize it, and convert it into high-context Markdown. This enables users to instantly feed official documentation into AI agents for accurate, hallucination-free assistance.

## **2. Problem Statement**

### **2.1 The Context Gap**

AI agents (e.g., ChatGPT, Claude, Custom GPTs) require clean, text-based input to function effectively.

* **Raw Copy/Paste:** Captures UI noise (sidebars, footers, "Was this helpful?" widgets), wasting context window tokens.  
* **PDF Export:** Destroys code formatting and table structures, making code examples unusable.  
* **Generic Scrapers:** Fail completely on Salesforce documentation due to the heavy use of **Shadow DOM** encapsulation.

### **2.2 The Technical Barrier**

Salesforce Developer Documentation uses a complex Single Page Application (SPA) architecture:

* Content is loaded asynchronously (Lazy Loading).  
* Core text is encapsulated inside nested Shadow Roots (e.g., \<doc-xml-content\> \-\> \#shadow-root \-\> \<doc-content\> \-\> \#shadow-root).  
* Standard DOM APIs (document.querySelector) cannot pierce these boundaries without specific recursive logic.

## **3. Challenges & Constraints**

| Challenge | Description | Technical Mitigation |
| :---- | :---- | :---- |
| **Shadow DOM Isolation** | Content is hidden from the main document tree. | Implementation of a "Piercing" Selector engine that traverses open Shadow Roots. |
| **Dynamic Rendering** | Content does not exist in the source HTML on load. | Use of MutationObservers to detect when the doc-xml-content component is fully hydrated. |
| **Code Formatting** | Salesforce mixes Apex, JSON, and XML in generic \<pre\> tags. | Heuristic analysis of code blocks to apply correct Markdown fences (e.g., \`\`\`apex). |
| **Token Economy** | AI Context windows are expensive/limited. | Aggressive stripping of non-technical DOM elements (cookie banners, navigation). |
| **Environment** | Must run Client-Side (Browser). | Adaptation of Node.js/Puppeteer logic into native Browser JavaScript. |

## **4. Solution Design**

### **4.1 User Experience (UX) Flow**

1. **Navigation:** User navigates to a Salesforce documentation page.  
2. **Activation:** User clicks the Extension Icon.  
3. **Silent Extraction:** \* The extension popup opens.  
   * A "Scanning..." indicator appears (NO intermediate logs/spam).  
   * The extension autonomously handles Shadow DOM piercing and conversion.  
4. **Result:** \* The popup displays a "Success" state.  
   * The extracted Markdown is automatically copied to the clipboard.  
   * Option to download as .md file is presented.

## **5. Technical Architecture**

The solution utilizes the **Chrome Manifest V3** architecture.

### **5.1 System Components**

1. **Popup (UI Layer):**  
   * Minimalist interface using HTML/CSS/Vanilla JS.  
   * Communicates with the Content Script to trigger extraction.  
   * Displays final success/failure state.  
2. **Content Script (The Engine):**  
   * **Role:** The heavy lifter. Injected into the active tab.  
   * **Responsibilities:**  
     * DOM Traversal (The 4-Tier Strategy).  
     * HTML Sanitization.  
     * HTML to Markdown Conversion (Turndown.js).  
     * Metadata Extraction (Title, URL, Version).  
3. **Background Service Worker:**  
   * **Role:** Event orchestrator.  
   * **Responsibilities:** Handles keyboard shortcuts and context menu events.

### **5.2 External Libraries**

* **Turndown:** For converting HTML strings to Markdown.  
* **Turndown-plugin-gfm:** For Github Flavored Markdown (essential for Salesforce tables).

## **6. Detailed Logic & Algorithms**

### **6.1 The "Network Idle" Simulation (Browser Adaption)**

Unlike Puppeteer, Chrome Extensions do not have page.waitForLoadState('networkidle'). We must simulate this using **Polled Checks** and **MutationObservers**.

**Algorithm:**

1. Check if document.readyState \=== 'complete'.  
2. If yes, initiate a MutationObserver on document.body.  
3. Wait for the existence of \<doc-xml-content\> OR a timeout of 5000ms.  
4. Once the element exists, wait an additional 500ms for internal hydration before extraction.

### **6.2 The 4-Tier Extraction Strategy (Core Logic)**

This logic is adapted from the provided cursor command but optimized for synchronous browser execution.

#### **Tier 1: Deep Shadow DOM Access (Salesforce Specific)**

*Target:* doc-xml-content \-\> shadowRoot \-\> doc-content \-\> shadowRoot \-\> .main-container

function attemptTier1() {  
  const root \= document.querySelector('doc-xml-content');  
  if (\!root?.shadowRoot) return null;  
    
  const mid \= root.shadowRoot.querySelector('doc-content');  
  if (\!mid?.shadowRoot) return null;  
    
  const container \= mid.shadowRoot.querySelector('.main-container') ||   
                    mid.shadowRoot.querySelector('\[class\*="main"\]');  
  return container ? container.innerHTML : null;  
}

#### **Tier 2: Direct Selector Access (Standard Sites)**

Target: Standard semantic HTML5 tags.  
Selectors: main, \[role="main"\], .article-content, .help-content.  
Validation: Must contain \> 500 characters and NOT contain keywords "cookie" or "privacy".

#### **Tier 3: Fallback Heuristic Search**

Target: Any generic \<div\> or \<article\>.  
Logic: Iterate through all body children. Score them based on text length (\>1000 chars) and absence of script/style tags.  
Keyword Boost: Boost score if content contains "metadata api", "scratch org", "apex".

#### **Tier 4: Body Dump (Last Resort)**

Target: document.body.  
Logic: If all else fails, grab the entire body, run it through aggressive sanitization (remove nav/footer via class name detection), and return.

### **6.3 Markdown Conversion Rules**

We will instantiate TurndownService with custom overrides:

1. **Code Blocks:**  
   * Detect \<pre\> tags.  
   * Check class attributes for language-java, language-xml, language-apex.  
   * Output:  
     \`\`\`apex  
     \[Code Content\]

2. **Callouts/Notes:**  
   * Salesforce uses \<div class="box-info"\>.  
   * Convert to Blockquote:  
     \> \*\*Note:\*\* \[Content\]  
3. **Link Resolution:**  
   * Convert all relative paths (../guide/xyz.html) to absolute paths (https://developer.salesforce.com/docs/...) to ensure the AI can follow citations.  
4. **Metadata Injection:**  
   * Prepend YAML Frontmatter to the output:  
     \---  
     title: \[Document Title\]  
     source: \[Current URL\]  
     extracted\_at: \[Timestamp\]  
     \---

     \[Markdown Content\]

## **7. Security & Permissions**

### **7.1 Manifest Permissions**

* activeTab: Allows the extension to inject the script *only* when the user clicks the icon. This is the most secure approach (Least Privilege).  
* scripting: Required to execute the 4-tier logic.

### **7.2 Content Security Policy (CSP)**

* The extension will not make external network requests (no data exfiltration).  
* All processing happens locally within the user's browser memory.

## **8. Implementation Plan**

### **Phase 1: MVP (Single Page)**

* **Goal:** Successfully extract the "Place Sales Transaction" page provided in the requirements.  
* **Deliverable:** A functional unpacked extension.  
* **Testing:** Verify Tier 1 Logic triggers correctly on Salesforce Developer Docs.

### **Phase 2: Robustness (Tiers 2-4)**

* **Goal:** Ensure extension works on generic Salesforce Help pages (non-developer) and other documentation sites.  
* **Deliverable:** Enhanced content\_script.js with fallback logic.

### **Phase 3: AI Optimization**

* **Goal:** Fine-tune Markdown output.  
* **Deliverable:** Custom Turndown rules for Tables and complex nested lists.
