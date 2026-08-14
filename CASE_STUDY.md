# Case Study: VireoKit — Building a Production-Grade React Component Library from Scratch

> **Role:** Solo Engineer — Design, Architecture, Development, Documentation, Publishing  
> **Type:** Open-Source npm Package · React Component Library  
> **Stack:** React 19 · SCSS · CSS Custom Properties · Vite 6 · Storybook 8  
> **Current Version:** `0.1.2` (stable) · `v0.2.0` (branch — in progress)  
> **Live Docs:** https://vireo-kit.vercel.app  
> **npm:** https://www.npmjs.com/package/vireokit

---

## Executive Summary

VireoKit is a themeable, accessible, production-ready React + SCSS component library I designed and built entirely from scratch. It currently ships **23 components** across primitives, overlays, data display, layout, and dashboard data-vis — all driven by a CSS-variable design-token system that enables runtime light/dark theming and zero-friction per-app re-branding.

The project started by solving a real engineering problem: three of my production React frontends had drifted apart over time, each maintaining their own copy of the same UI components with inconsistent APIs, hardcoded styles, and no shared documentation. VireoKit unified them under a single, versioned, installable library. After shipping v1, I did a systematic cross-app audit to identify every component that existed in a consumer app but was missing from the library — and built them all into `v0.2.0`.

---

## 1. The Problem

I was actively maintaining three separate React applications:

| Application | Design Character |
|---|---|
| **Expense Tracker** | Apple-inspired, clean blue (`#007AFF`), dashboard-heavy with charts and KPI cards |
| **E-Commerce Admin Panel** | Corporate blue-purple, data-dense with tooltips, image upload, and area charts |
| **Portfolio 2.0** | Teal accent, full dark-mode, rich text editor |

Despite sharing the same underlying patterns — plain SCSS, CSS custom properties, a `.st-` class prefix, and BEM-style naming — **there was no shared code**. Every bug fix or design improvement had to be manually replicated across all three repos. Over time, this created significant drift:

- The `Button` component accepted `onclick` and `label` in one app, but `onClick` and `children` in another — a basic React convention violation that had never been fixed.
- Typography color tokens were hardcoded (`#333`, `#666`) in the SCSS, even though the `:root` block already defined the correct semantic CSS variables like `--text-primary`. This defeated the entire purpose of the token system.
- Dark mode was partially wired — the token overrides existed under `[data-theme="dark"]`, but nothing in the codebase actually toggled the attribute.
- Dashboard components (stat cards, charts, progress bars) were completely siloed — the expense tracker had a `BarChart` and `StatTile`; the e-commerce panel had an `AreaChart` and `Tooltip`; none were shared.
- No Storybook, no prop-types, no documentation of any kind.

The situation was unsustainable. The right engineering answer was to extract the shared DNA into a proper, versioned, installable library — and then actively audit the consumer apps to grow the library to cover what they actually need.

---

## 2. My Role & Approach

I was the **sole engineer** on this project — responsible for everything: architecture decisions, token design, component implementation, accessibility, Storybook stories, the docs website, the library build configuration, and the npm publish pipeline.

My approach was deliberately phased and data-driven:

**Phase approach for v1:** Rather than migrating everything at once (a common failure mode), I wrote a build plan upfront — tokens first, primitives second, overlays third, data/nav fourth, docs fifth, npm publish last. Each phase had a clear definition of done before the next phase started.

**Cross-app audit for v0.2.0:** After shipping v1, I systematically read every component directory across all three consumer apps, compared them against the VireoKit inventory, and produced a prioritised gap analysis. Items were categorised as High (generic, production-ready, used across multiple apps), Medium (feature gaps in existing components), or Low/Skip (app-specific logic that shouldn't be extracted). This is the same process a platform team runs when deciding what belongs in a design system.

---

## 3. Technical Architecture

### 3.1 The Token Layer — The Foundation of Everything

The most important architectural decision was **where design decisions live**. My answer: entirely in CSS custom properties on `:root`, never inside component SCSS as literal values.

```scss
:root {
  --color-primary:       #2988ee;
  --color-primary-hover: #8ec5fc;
  --bg-surface:          #ffffff;
  --bg-muted:            #eef3fa;
  --text-primary:        #2f3a4a;
  --text-secondary:      #5a6b7b;
  --border-default:      #e3eaf3;

  --shadow-soft:    0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-medium:  0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-premium: 0 20px 40px rgba(0, 0, 0, 0.12);

  --radius-sm: 6px;  --radius-md: 10px;
  --radius-lg: 16px; --radius-pill: 999px;

  --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
  --color-primary:  #14b8a6;
  --bg-surface:     #111c31;
  --bg-body:        #0b1220;
  --text-primary:   #e2e8f0;
  --text-secondary: #94a3b8;
  --border-default: #334155;
}
```

**Why this matters:** Runtime theming — dark mode toggle, per-app brand overrides — is only possible with CSS custom properties. Sass variables are compile-time constants that cannot change after the stylesheet is built. With this architecture, re-branding a consumer app is a single CSS override block:

```css
:root {
  --color-primary: #7c3aed;        /* purple brand */
  --font-sans: 'Outfit', sans-serif;
  --radius-md: 14px;
}
```

The complete token set covers: **color roles · typography · spacing scale · radius · shadow elevation · motion · z-index · breakpoints**.

### 3.2 Component Architecture

Every component follows the same co-located structure:

```
src/components/<Component>/
  index.jsx               ← Component logic + PropTypes
  <Component>.stories.jsx ← Storybook story with Controls
```

SCSS lives centrally in `src/assets/styles/Component/` and is collected by `global.scss` — a deliberate v1 decision to minimise migration risk when consumer apps start importing the library.

**Class naming convention (enforced across all 23 components):**
```
.st-{component}        ← Block
.st-btn--primary       ← Variant modifier
.st-btn--sm            ← Size modifier
.st-btn__icon          ← Element
.st-btn--disabled      ← State modifier
```

### 3.3 Full Component Inventory (v0.1.2 + v0.2.0)

| Group | v0.1.2 Components | v0.2.0 Added |
|---|---|---|
| **Primitives** | `Button`, `Input`, `Select`, `Badge`, `Icon`, `Switch`, `Checkbox`, `Avatar` | — |
| **Overlays & Feedback** | `Modal`, `Drawer`, `Popover`, `Tooltip`, `NotificationProvider` + `useNotification`, `Loading`, `Skeleton` | — |
| **Data & Navigation** | `Table`, `TableContainer`, `Pagination`, `Tab`, `Breadcrumb`, `Divider` | — |
| **Layout** | `Layout`, `Sidebar`, `Topbar` | — |
| **Dashboard & Data-vis** | — | `StatCard`, `BarChart`, `AreaChart`, `ProgressList` |
| **Media** | — | `ImageUpload`, `ImageFallback` |
| **Theme** | `ThemeProvider`, `useTheme` | — |

**Total: 23 components** (17 in v0.1.2 · 6 new in v0.2.0)

### 3.4 The Build Pipeline

```
npm run build:lib   →  dist/index.js     (ESM, framework deps external)
npm run build:css   →  dist/style.css    (SCSS compiled + compressed)
npm run build:pkg   →  lib + css + postbuild (injects CSS import)
```

Three consumer import patterns supported:
```js
import { Button, StatCard, AreaChart } from 'vireokit';  // JS + auto CSS
import 'vireokit/styles';                                  // CSS only
// @use 'vireokit/scss';                                   // SCSS source
```

---

## 4. Execution — Phase by Phase

### Phase 0 — Project Hygiene
Renamed the package from placeholder `"protfolio"` to `"vireokit"`, cleaned the build output, locked the style-file location convention.

### Phase 1 — Token Foundation *(The Critical Path)*
Built the complete token layer. Fixed a critical bug: `$text-colors` in `_typography.scss` had hardcoded hex values (`#333`, `#666`) instead of resolving to the `--text-*` CSS vars already in `:root` — defeating the token system. Implemented `ThemeProvider` / `useTheme`. Added SCSS utility mixins: `respond-to`, `focus-ring`, `reduced-motion`, `truncate`.

### Phase 2 — Primitives
**Button** — refactored to React-idiomatic `children` + `onClick` API, preserving backward-compatible `label`/`onclick` for existing usage.  
**Input / TextArea** — focus ring (3–4px tinted `box-shadow`), error state, disabled, `multiline` prop.  
**Select** — custom accessible dropdown (no react-select dep): keyboard nav, `role="listbox"` / `role="option"` ARIA.  
**Badge** — semantic tints (10% opacity background + solid text). **Icon** — SVG registry, `currentColor`, tree-shakeable.

### Phase 3 — Overlays & Feedback
**Modal** — ESC + scroll-lock, `role="dialog"`. **Drawer** — `translateX` slide, ESC close. **Popover** — click-outside, optional arrow. **NotificationProvider** — provider/hook API, semantic types, per-toast duration. **Loading** — `prefers-reduced-motion` aware.

### Phase 4 — Data & Navigation
**Table** — signature card-row style (`border-collapse: separate; border-spacing: 0 8px`), sortable headers, empty/loading states. **Pagination**, **Tab** (URL sync via `?tab=`), **Breadcrumb**, **Layout shell** (Sidebar + Topbar + Layout, off-canvas at 768px).

### Phase 5 — Storybook & Documentation
Storybook 8 with `essentials`, `a11y`, and `themes` addons. Per-component stories with Controls. Foundation / Design Tokens page. Custom docs site on Vercel with live examples, props tables, theming guide, and full dashboard demo.

### Phase 6 — npm Library Build & Publish
Vite library mode, proper `exports` map, `peerDependencies`, `sideEffects` for CSS tree-shaking, `prepublishOnly` build script. Published to npm.

### Phase 7 — Cross-App Audit & v0.2.0 *(Current)*

After shipping v1, I read every component directory across all three consumer apps and cross-referenced them against the VireoKit inventory. The audit found **8 high-priority missing components** — all generic, all production-proven, all with zero app-specific logic. I built them all into the `v0.2.0` branch.

**`StatCard`** — KPI display card with `label`, `value`, trend indicator (↑ green / ↓ red), icon slot, 5 variants (`default | primary | success | warning | danger`), and a shimmer loading skeleton state. The most common pattern in any admin dashboard.

**`BarChart`** — pure CSS/JSX vertical bar chart. No external charting library. Supports single-series and multi-series (grouped bars), configurable height, legend, animated entrance (`scaleY` from bottom), and hover value reveal. Colors default to token vars (`--color-primary`, `--color-success`, etc.) but are individually overridable per series.

**`AreaChart`** — pure SVG area chart. Parses date strings in three formats (`DD/MM/YYYY`, `YYYY-MM-DD`, `MM/YYYY`). Draws a gradient-filled area, line stroke (with CSS draw animation), data-point dots, value labels, and Y-axis grid lines. All colors reference CSS custom properties — the previous implementation in the e-commerce app used hardcoded `#db4444` throughout, which violated the token rule. This was corrected during extraction.

**`ProgressList`** — ranked horizontal bar list for category breakdowns. Each item has a label, proportional fill bar (animated via CSS custom property `--fill-width`), and a display value. ARIA `role="progressbar"` on each track. Used in expense breakdown sidebars and dashboard summary panels.

**`ImageUpload`** — click-or-drag-and-drop image upload zone. Shows a live preview of the selected file. Keyboard accessible (Enter/Space). `maxSizeMb` prop with console warning. `onDrop` drag support. `onRemove` button. The hidden `<input>` resets after each selection so the same file can be re-uploaded.

**`ImageFallback`** — placeholder shown when an image is unavailable. Prevents layout collapse in grids and lists. `aria-hidden="true"` so screen readers skip it. 4 sizes: `sm` (48px), `md` (80px), `lg` (140px), `full` (fills parent).

**Build result for v0.2.0:** `dist/index.js 50.97 kB │ gzip: 12.66 kB` — ✅ zero errors.

---

## 5. Key Technical Decisions & Trade-offs

### CSS Custom Properties, not Sass Variables
Sass variables are compile-time constants. They cannot support runtime theming. CSS custom properties live in the browser and can be overridden at any point in the cascade. Every component SCSS file references `var(--color-primary)` and never `#2988ee`. This is enforced as a hard rule — when extracting `AreaChart` from the e-commerce app, I replaced every hardcoded hex with the correct token var before merging.

### JSX + PropTypes, not TypeScript
All three consumer apps use JSX with `jsconfig.json`. TypeScript in v1 would have created an adoption barrier before a single component was consumed. PropTypes provide runtime type-checking and good DX. TypeScript `.d.ts` types are deferred to post-v0.2.0 via `tsc --emitDeclarationOnly`.

### Custom Select, not react-select
`react-select` adds ~30KB to the bundle and is difficult to style cleanly with a token-based system. A custom Select with the W3C ARIA `listbox` pattern eliminates the dependency and gives full visual control.

### No Utility Framework
The consumer apps use plain SCSS. Introducing Tailwind, MUI, or styled-components would have forced a paradigm shift on every consumer. VireoKit extends what they already use.

### Vite Library Mode, not a separate Rollup config
Vite's library mode is Rollup internally. Since the project already uses Vite for the docs site and Storybook, using it for the library build means one tool and one mental model.

### Dependency-free Charts
The `BarChart` and `AreaChart` use pure CSS/JSX and SVG respectively — no Recharts, no Chart.js, no D3. This keeps the bundle lean, avoids dependency conflicts in consumer apps, and gives full styling control through the token system. The trade-off is that these charts handle only the most common cases (single/multi-series bar, time-series area). For complex charting needs, consumers should reach for a dedicated library.

---

## 6. Quality Standards

Every component — including all six v0.2.0 additions — is held to the same bar:

| Standard | How It Was Met |
|---|---|
| **Accessibility** | Semantic HTML, keyboard operable, visible focus rings (3–4px tinted `box-shadow`), ARIA roles where needed (`role="progressbar"`, `role="img"`, `aria-hidden` on decorative elements) |
| **Responsive** | 768px / 600px / 475px breakpoints; Layout shell off-canvas; charts 100% width with `viewBox` scaling |
| **Zero hardcoded themeable values** | Every color, radius, shadow, transition is a token var. Hardcoded values caught during the e-commerce `AreaChart` extraction were corrected before merging |
| **Reduced motion** | All CSS animations (`@keyframes bar-rise`, `area-draw`, `stat-shimmer`, `progress-fill`) are disabled under `@media (prefers-reduced-motion: reduce)` |
| **Consistent API** | `children` for content, camelCase handlers, `variant`, `size`, `disabled`, `className`/`style` passthrough on every component |
| **PropTypes** | Full PropTypes declarations on all components with sensible defaults |

---

## 7. Results & Impact

### Shipped

**v0.1.2 (stable)**
- ✅ 17 fully functional, accessible components
- ✅ Complete CSS-variable token system (color · type · spacing · radius · shadow · motion · z-index · breakpoints)
- ✅ Runtime light/dark theming via `ThemeProvider` + `useTheme`
- ✅ Storybook 8 with Controls, a11y, and theme switching
- ✅ Custom docs site on Vercel with live examples
- ✅ Published to npm (`npm install vireokit`)

**v0.2.0 (branch — in progress)**
- ✅ 6 new dashboard & media components extracted from 3 consumer apps
- ✅ `StatCard` with 5 variants and loading skeleton
- ✅ `BarChart` — dependency-free, single + multi-series, animated
- ✅ `AreaChart` — pure SVG, tokenized (fixed hardcoded colors from source app)
- ✅ `ProgressList` — ARIA progressbar, animated fill
- ✅ `ImageUpload` — click + drag-and-drop, preview, keyboard access
- ✅ `ImageFallback` — 4 sizes, aria-hidden, prevents layout collapse
- ✅ Build verified: `dist/index.js 50.97 kB │ gzip: 12.66 kB` — zero errors

### Before vs. After

| Before VireoKit | After VireoKit |
|---|---|
| 3 separate `Button` implementations, 3 APIs | 1 `Button`, 1 consistent API |
| Dark mode in 1 of 3 apps | Dark mode in all apps via `ThemeProvider` |
| 0 documented components | 23 documented components |
| Dashboard components (charts, stat cards) duplicated in 2+ apps | Extracted into shared `StatCard`, `BarChart`, `AreaChart`, `ProgressList` |
| `AreaChart` with hardcoded `#db4444` (token rule violation) | `AreaChart` fully tokenized, rule compliant |
| Design changes required edits in 3 repos | Design changes ship in one version bump |
| No installable package | `npm install vireokit` |

### Roadmap

| Item | Status |
|---|---|
| TypeScript `.d.ts` type declarations | 🔲 Next |
| `Alert` + `EmptyState` components | 🔲 Next |
| `Checkbox` + `RadioGroup` components | 🔲 Next |
| `SubHeading` / `SectionHeader` component | 🔲 Planned |
| Changesets + auto CHANGELOG | 🔲 Planned |
| GitHub Actions CI: build → lint → publish on tag | 🔲 Planned |
| Pilot adoption in E-Commerce Admin panel | 🔲 Planned |
| Consumer migration guide | 🔲 Planned |

---

## 8. What This Project Demonstrates

**Architectural thinking:** Designing a token system and component API before writing a single component — so re-branding is a CSS override, not a codebase search-and-replace.

**Disciplined, data-driven iteration:** v1 was built from a phased plan. v0.2.0 was driven by a systematic audit of three production codebases — reading every component directory, cross-referencing against the library, and prioritising by reuse breadth and implementation effort.

**Knowing what NOT to extract:** The audit also identified components that should stay in the consumer app. `AdminNotificationSocket` — which mounts a Socket.io connection authenticated with a JWT, dispatches to Redux slices, and plays an audio notification — is 100% app-specific. Extracting it into a shared library would introduce hard dependencies on the e-commerce app's auth model. The decision to leave it was just as deliberate as the decision to extract `StatCard`.

**Accessibility as a first-class concern:** Keyboard navigation, ARIA patterns (`role="progressbar"`, `role="listbox"`, `aria-checked`, `aria-hidden`), focus management, and `prefers-reduced-motion` — built in from the start, not added later.

**Full ownership of the software lifecycle:** Architecture → implementation → documentation → build tooling → npm publishing → cross-app audit → v0.2.0.

**Real-world problem solving:** Every component in this library — every token value, every animation, every ARIA decision — came from production code across real apps solving real user problems. Not a tutorial, not a demo.

---

## 9. Installation & Usage

```bash
npm install vireokit
# peers: react >=18, react-dom >=18, react-router-dom >=6
```

```jsx
import {
  ThemeProvider, NotificationProvider,
  Button, StatCard, AreaChart, ProgressList,
} from 'vireokit';

export default function Dashboard() {
  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <StatCard
          label="Total Revenue"
          value="$48,200"
          trend="up"
          trendValue="+12%"
          sublabel="vs last month"
          variant="primary"
        />
        <AreaChart
          data={[{ date: '01/06/2026', value: 45 }, { date: '02/06/2026', value: 70 }]}
          color="var(--color-primary)"
        />
        <ProgressList
          items={[
            { label: 'Food', value: 45, displayValue: '45%' },
            { label: 'Transport', value: 22, displayValue: '22%' },
          ]}
          maxValue={100}
        />
      </NotificationProvider>
    </ThemeProvider>
  );
}
```

Re-brand with one CSS override:
```css
:root {
  --color-primary: #7c3aed;
  --font-sans: 'Outfit', sans-serif;
  --radius-md: 14px;
}
```

---

## 10. Links

| Resource | URL |
|---|---|
| **Live Docs Site** | https://vireo-kit.vercel.app |
| **npm Package** | https://www.npmjs.com/package/vireokit |
| **GitHub — stable** | `master` branch |
| **GitHub — in progress** | `v0.2.0` branch |
| **Storybook** | `npm run storybook` (port 6006) |

---

*Built and maintained by Shahriar — Frontend Engineer.*  
*All design decisions, architecture, component implementations, documentation, and build tooling authored solely by me.*
