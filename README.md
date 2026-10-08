# UWA FC Web Portal & PWA
> **Official Executive Platform &mdash; Multi-Page Routing Documentation**

---

## 1. Executive Summary
This web application delivers real-time match data, roster changes, and club metrics for **Uganda Wildlife Authority Football Club (UWA FC)**. Built as a Progressive Web Application (PWA) with a structured multi-page routing system, the platform seamlessly segments institutional corporate governance from football performance analytics.

*   **Lead Developer:** Lwabya Eric
*   **Target Audience:** UWA Commissioner & Executive Board
*   **Application Identity:** `uwa fc` (Strict Standalone App)

---

## 2. Routing Matrix & Site Architecture
The platform relies on client-side routing to handle instantaneous multi-page transitions. This allows deep-nested subpages to load efficiently under a unified system shell:

```text
/ (Homepage - Match Center & Live Metrics)
├── /about (Institutional Profile)
│   └── /about/board (Executive Management & Patron's Message)
├── /squad (The Club Matrix)
│   ├── /squad/technical-bench (Coaches & Physiotherapists)
│   └── /squad/players (Goalkeepers, Defenders, Midfielders, Forwards)
├── /fixtures (Performance Center)
│   └── /fixtures/table (Live League Standings)
└── /community (CSR & Wildlife Conservation Impact)
```

---

## 3. Critical PWA Configuration for Subpages
Because the app features deep-nested subpages (like `/squad/players`), the PWA configuration must point to the absolute base directory. This ensures deep-links do not break or throw 404 errors during an update cycle or page refresh.

### Vite Configuration (`vite.config.js`)
```javascript
manifest: {
  name: "uwa fc",
  short_name: "uwa fc",
  start_url: "/index.html", // Maps explicitly to the entry shell file
  display: "standalone",
  scope: "/" // Ensures the PWA handles all subpages and sub-routes seamlessly
}
```

### Main Matrix Shell Entry Point (`index.html`)
```html
<!-- Absolute root linking prevents subpages from looking for manifest relatively -->
<link rel="manifest" href="/manifest.json">

<!-- Native iOS Mobile App Override Titles -->
<meta name="apple-mobile-web-app-title" content="uwa fc">
```

---

## 4. Setup & Local Development

### Installation
Ensure you have Node.js installed on your development workstation before setting up the project:

```bash
# Install node modules and dependencies
npm install

# Spin up a local lightning-fast dev instance
npm run dev

# Compile corporate code assets for production deployment build
npm run build
```

---

## 5. Testing & Presentation Guidelines

### Clearing Cache for Layout Updates
When clicking deep-nested subpages, local service worker caching profiles can occasionally preserve old route paths. To forcefully audit new UI layouts or route adjustments immediately during presentation checks:
1. Open Chrome Developer tools via `F12` or right-click and select **Inspect**.
2. Navigate into the **Application** panel selection block.
3. Select **Storage** options in the left-hand navigation list menu tree.
4. Click **Clear site data** and cleanly refresh the active layout wrapper.

### Presentation Tips for the Commissioner
*   **Router Fallback:** If showcasing the project via a built preview version, ensure your local server or hosting solution redirects all subpage requests back to `/index.html` to allow the router to resolve pages properly without breaking.
*   **Responsive Demonstration:** Leverage simulated mobile layouts inside inspection tools to display target responsiveness optimizations directly across high-density mobile devices.
