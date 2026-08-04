# Case Study: VireoKit — Building a Production-Grade React Component Library from Scratch

> **Role:** Solo Engineer — Design, Architecture, Development, Documentation, Publishing  
> **Type:** Open-Source npm Package · React Component Library  
> **Stack:** React 19 · SCSS · CSS Custom Properties · Vite 6 · Storybook 8  
> **Live Docs:** https://vireo-kit.vercel.app  
> **npm:** https://www.npmjs.com/package/vireokit

---

## Executive Summary

VireoKit is a themeable, accessible, production-ready React + SCSS component library I designed and built entirely from scratch. It ships **17 components** across primitives, overlays, data display, and layout — all driven by a CSS-variable design-token system that enables runtime light/dark theming and zero-friction per-app re-branding.

The project solved a real engineering problem: three of my production React frontends had drifted apart over time, each maintaining their own copy of the same UI components with inconsistent APIs, hardcoded styles, and no shared documentation. VireoKit unified them under a single, versioned, installable library — the same way a product team at scale would operate.

---

## 1. The Problem

I was actively maintaining three separate React applications:

| Application | Design Character |
|---|---|
| **Expense Tracker** | Apple-inspired, clean blue (`#007AFF`) |
| **E-Commerce Admin Panel** | Corporate blue-purple, data-dense UI |
| **Portfolio 2.0** | Teal accent, full dark-mode support |

Despite sharing the same underlying patterns — plain SCSS, CSS custom properties, a `.st-` class prefix, and BEM-style naming — **there was no shared code**. Every bug fix or design improvement had to be manually replicated across all three repos. Over time, this created significant drift:

- The `Button` component accepted `onclick` and `label` in one app, but `onClick` and `children` in another — a basic React convention violation that had never been fixed.
- Typography color tokens were hardcoded (`#333`, `#666`) in the SCSS, even though the `:root` block already defined the correct semantic CSS variables like `--text-primary`. This defeated the entire purpose of the token system.
- Dark mode was partially wired — the token overrides existed under `[data-theme="dark"]`, but nothing in the codebase actually toggled the attribute.
- There was no `Input` primitive, no `Badge`, no `Icon` component, and no shared Layout shell (Sidebar + Topbar). Each app had reinvented these independently.
- No Storybook, no prop-types, no documentation of any kind.

The situation was unsustainable. The right engineering answer was to extract the shared DNA into a proper, versioned, installable library.

---

## 2. My Role & Approach

I was the **sole engineer** on this project — responsible for everything: architecture decisions, token design, component implementation, accessibility, Storybook stories, the docs website, the library build configuration, and the npm publish pipeline.

My approach was deliberately disciplined. Rather than migrating everything at once (a common failure mode), I wrote a phased build plan upfront that defined:

- What "done" looks like for each component (the spec).
- What order to build things (tokens first, primitives second, overlays third, etc.).
- Which decisions were locked for v1 and which were explicitly deferred (e.g., TypeScript types, Changesets CI).

This ensured I shipped a complete, coherent v1 rather than a half-finished library with design debt baked in from day one.

---

## 3. Technical Architecture

### 3.1 The Token Layer — The Foundation of Everything

The most important architectural decision was **where design decisions live**. My answer: entirely in CSS custom properties on `:root`, never inside component SCSS as literal values.

```scss
/* src/tokens/_colors.scss */
:root {
  --color-primary:       #0f766e;
  --color-primary-hover: #115e59;
  --bg-surface:          #ffffff;
  --bg-body:             #e8f1f3;
  --text-primary:        #172033;
  --text-secondary:      #64748b;
  --border-default:      #d8e2eb;
  --border-focus:        var(--color-primary);

  --shadow-soft:    0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-medium:  0 8px 24px rgba(0, 0, 0, 0.10);
  --shadow-premium: 0 20px 40px rgba(0, 0, 0, 0.12);

  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   18px;
  --radius-pill: 999px;

  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
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

**Why this matters:** Runtime theming is only possible with CSS custom properties. Sass variables are compile-time constants — they cannot change after the stylesheet is built. With this architecture, re-branding any consumer app is a single CSS override block:

```css
/* In the consumer app */
:root {
  --color-primary: #7c3aed;  /* purple brand */
  --font-sans: 'Outfit', sans-serif;
  --radius-md: 14px;
}
```

The complete token set covers:

| Category | Tokens |
|---|---|
| Color | Primary, secondary, semantic (success/warning/error), text roles, backgrounds, borders |
| Typography | `--font-sans`, size scale (`--text-xs` → `--text-5xl`), weight, line-height |
| Spacing | 8 / 12 / 16 / 20 / 24 / 32 px scale |
| Radius | `--radius-sm / md / lg / pill` |
| Shadow | `--shadow-soft / medium / premium` (elevation ladder) |
| Motion | `--transition-base / slow`, easing curves |
| Layout | Z-index scale, responsive breakpoint SCSS mixins |

### 3.2 Component Architecture

Every component follows the same co-located structure:

```
src/components/Button/
  index.jsx               ← Component logic, PropTypes
  Button.stories.jsx      ← Storybook story with Controls
  _styles.scss            ← BEM SCSS referencing only token vars
```

**Class naming convention:**

```
.st-{component}        ← Block
.st-btn--primary       ← Color variant modifier
.st-btn--sm            ← Size modifier
.st-btn__icon          ← Child element
.st-btn--disabled      ← State modifier
```

This BEM-ish naming is consistent with all three consumer apps — adoption is a find-and-replace, not a rewrite.

### 3.3 Component Inventory

| Group | Components |
|---|---|
| **Primitives** | `Button`, `Input`, `Select`, `Badge`, `Icon` |
| **Overlays & Feedback** | `Modal`, `Drawer`, `Popover`, `NotificationProvider` + `useNotification`, `Loading`, `Skeleton` |
| **Data & Navigation** | `Table`, `TableContainer`, `Pagination`, `Tab`, `Breadcrumb` |
| **Layout** | `Layout`, `Sidebar`, `Topbar` |
| **Theme** | `ThemeProvider`, `useTheme` |

### 3.4 The Build Pipeline

The library is built in **Vite library mode** — entirely separate from the docs site build:

```
npm run build:lib   →  dist/index.js     (ESM, framework deps external)
npm run build:css   →  dist/style.css    (SCSS compiled + compressed)
npm run build:pkg   →  lib + css + postbuild
```

`package.json` exports map supports three consumer patterns:

```js
// 1. JS + auto-loaded CSS (most common)
import { Button, Table, useTheme } from 'vireokit';

// 2. CSS only — control load order
import 'vireokit/styles';

// 3. SCSS source — reuse tokens and mixins directly
// @use 'vireokit/scss';
```

---

## 4. Execution — Phase by Phase

### Phase 0 — Project Hygiene

Before writing a single component, I cleaned up the existing codebase: renamed the package from the placeholder `"protfolio"` to `"vireokit"`, audited the build output, and locked the style-file location convention. Small steps, but they prevent bigger problems later.

### Phase 1 — Token Foundation *(The Critical Path)*

The most important phase, because every subsequent component depends on it. I:

- Built the complete token layer across all categories.
- Fixed the critical consistency bug: `$text-colors` in `_typography.scss` was using hardcoded hex values (`#333`, `#666`) instead of resolving to the `--text-*` CSS vars already defined in `:root`. This had existed since the original codebase was created.
- Implemented `ThemeProvider` (sets `[data-theme]` on `<html>`) and the `useTheme()` hook.
- Added SCSS utility mixins: `respond-to($bp)` for breakpoints, `focus-ring` for accessible outlines, `reduced-motion` for animation safety, `truncate` for text overflow.

### Phase 2 — Primitives

**Button:** Refactored to proper React API (`children` + `onClick`), preserving backward-compatible `label`/`onclick` props so existing usage wouldn't break. Ships 4 color variants, 3 sizes, loading state, disabled state, and icon slots.

**Input / TextArea:** Label, helper text, error text, focus ring (3–4px tinted `box-shadow`), disabled state, `multiline` prop for textarea, full a11y wiring.

**Select:** Built a fully custom accessible dropdown — no external dependency. Implements keyboard navigation (arrow keys, Enter, Escape), `role="listbox"` + `role="option"` ARIA pattern, and click-outside detection. Visually matches `Input` exactly.

**Badge:** Semantic tints (success, warning, error, info, neutral) — 10% opacity background of the semantic color with solid text in the same color. Optional `dot` variant. Used inline and inside `Table` cells.

**Icon:** SVG registry wrapper with 17 icons. Uses `currentColor` so icons inherit text color automatically. Tree-shakeable — import only what you use.

### Phase 3 — Overlays & Feedback

**Modal:** Fixed overlay, configurable sizes, header + close button, ESC key + scroll-lock, `role="dialog"` + `aria-modal`. Entrance animation using `--shadow-premium`.

**Drawer:** Edge-anchored (left/right), `translateX` slide transition, dim overlay, ESC close.

**Popover:** Positioned relative to trigger, click-outside detection, optional arrow, left/right alignment.

**NotificationProvider + `useNotification`:** Global toast system via React context. Toasts stack in the top-right at `z-index: 9999`. Each has a semantic type (info/success/warning/error), icon, configurable duration, and slide/fade-in animation. The hook API (`useNotification().show(...)`) means any component can trigger a toast without prop-drilling.

**Loading:** Centered spinner, 3 sizes, optional accessible label, fullscreen overlay mode, `prefers-reduced-motion` aware.

### Phase 4 — Data & Navigation

**Table:** The signature component. Uses `border-collapse: separate; border-spacing: 0 8px` — every row is a floating card with `--bg-surface`, `--radius-md`, and a hover `translateY(-2px) + --shadow-medium` lift. Supports sortable headers, empty state, loading state, compact mode, and bordered mode.

**Pagination:** Page-size select + previous/next buttons, styled as its own surface card.

**Tab:** Pill-container variant and underline variant. Disabled tab support. URL sync via `?tab=` query param — deep-linkable by default.

**Breadcrumb:** Tokenized inline flex list. Current segment in `--text-primary`, ancestors in `--text-secondary`. Custom separator support.

**Layout Shell:** A complete two-column application shell — fixed 250px Sidebar with active-link pill highlighting, sticky Topbar, and a `Layout` wrapper. Off-canvas collapse at 768px. Sidebar has a dark variant (`data-sidebar="dark"`) for apps that prefer a dark nav on a light content area.

### Phase 5 — Storybook & Documentation

- **Storybook 8** (react-vite) with `essentials` (Controls, Actions, Docs), `a11y` (accessibility audit), and `themes` (light/dark toolbar toggle).
- A `*.stories.jsx` per component with full Controls wiring.
- A dedicated **Foundation / Design Tokens** page showing color swatches, radius scale, shadow elevation, and spacing.
- A **custom docs website** (deployed to Vercel) with per-component live examples, props tables, a theming guide, and a full dashboard demo built from VireoKit components.

### Phase 6 — npm Library Build & Publish

- Vite library mode config: ESM output, all framework deps externalized, `sideEffects` configured for CSS tree-shaking.
- `package.json` fully configured: `"type": "module"`, `exports` map, `peerDependencies`, `prepublishOnly` build script.
- Published to npm: `https://www.npmjs.com/package/vireokit`.

---

## 5. Key Technical Decisions & Trade-offs

### CSS Custom Properties, not Sass Variables

Sass variables are compile-time constants. They cannot support runtime theming (dark mode toggle, per-tenant branding). CSS custom properties live in the browser and can be overridden at any point in the cascade. This is the fundamental enabler of VireoKit's theming model — and the reason every component SCSS file references `var(--color-primary)` and never `#0f766e`.

### JSX + PropTypes, not TypeScript

All three consumer apps use JSX with `jsconfig.json`. Introducing TypeScript for v1 would have created an adoption barrier. PropTypes provide runtime type-checking and good DX in JS projects. TypeScript `.d.ts` types are planned for post-v1 via `tsc --emitDeclarationOnly`.

### Custom Select, not react-select

`react-select` adds ~30KB to the bundle and its styling is difficult to override cleanly with a token-based system. Building a custom Select gave full visual control, eliminated the external dependency, and was a meaningful accessibility exercise — correctly implementing the W3C ARIA `listbox` pattern.

### No Utility Framework

The consumer apps don't use Tailwind, MUI, or styled-components. Introducing one in the shared library would have forced a paradigm shift. Plain SCSS with CSS custom properties is what they already use — VireoKit extends that pattern, it doesn't replace it.

### Vite Library Mode

Vite's library mode (built on Rollup internally) handles ESM bundling, externalization, and tree-shaking with minimal config. Since the project already used Vite for the docs site and Storybook, using it for the library build as well meant one tool to maintain and no build-tool sprawl.

---

## 6. Quality Standards

Every component was held to the same quality bar before being considered "shipped":

| Standard | How It Was Met |
|---|---|
| **Accessibility** | Semantic HTML, keyboard operable, visible focus rings (3–4px tinted `box-shadow`), ARIA roles where needed |
| **Responsive** | Three breakpoints: `768px` (primary), `600px`, `475px`. Layout shell goes off-canvas at 768px |
| **No hardcoded themeable values** | Every color, radius, shadow, transition in SCSS references a token var |
| **Reduced motion** | All animations check `@media (prefers-reduced-motion: reduce)` and disable or simplify |
| **API consistency** | Every component: `children` for content, camelCase event handlers, `variant`, `size`, `disabled`, `className`/`style` passthrough |
| **Documented** | Every component has a Storybook story with Controls and a docs-site page with a live example and props table |

---

## 7. Results & Impact

### Delivered

- ✅ 17 fully functional, documented, accessible components
- ✅ Complete CSS-variable token system covering all design dimensions
- ✅ Runtime light/dark theming with `ThemeProvider` + `useTheme`
- ✅ Storybook 8 catalog with Controls, a11y checks, and theme switching
- ✅ Custom docs site deployed to Vercel with live interactive examples
- ✅ npm package published and installable (`npm install vireokit`)
- ✅ ESM tree-shakeable build — consumers pay only for what they import
- ✅ Three consumer apps now have a clear, versioned migration target

### Before vs. After

| Before VireoKit | After VireoKit |
|---|---|
| 3 separate `Button` implementations with 3 different APIs | 1 `Button` component, 1 consistent API |
| Dark mode in 1 of 3 apps | Dark mode available in all apps via `ThemeProvider` |
| 0 documented components | 17 documented components with live examples |
| Design changes required edits in 3 repos | Design changes ship in one version bump |
| No installable package | `npm install vireokit` — all 17 components available |

### Planned Next Steps

| Item | Priority |
|---|---|
| TypeScript `.d.ts` type declarations | High |
| Changesets + auto CHANGELOG | High |
| GitHub Actions CI: build → lint → publish on tag | High |
| Migrate SCSS from `@import` → `@use`/`@forward` | Medium |
| Pilot adoption in E-Commerce Admin panel | Medium |
| Consumer migration guide | Medium |
| Skeleton Loading variant | Low |

---

## 8. What This Project Demonstrates

This project was chosen for my portfolio because it reflects the kind of engineering work I find most valuable — systematic, scalable, and built for real use rather than demonstration.

**Architectural thinking:** Designing a token system and component API that scales across multiple apps with different brands, before writing a single component.

**Disciplined execution:** Writing a phased build plan, making explicit trade-off decisions (TypeScript later, custom Select now), and shipping a coherent v1 without scope creep.

**Accessibility as a first-class concern:** Not an afterthought — keyboard navigation, ARIA patterns, focus management, and reduced-motion were built in from the start.

**Full ownership of the software lifecycle:** From architecture and implementation to documentation, build tooling, and npm publishing.

**Pragmatic API design:** The `useNotification` hook, the `?tab=` URL sync, the three CSS import paths — these are decisions that come from thinking about how real developers consume a library, not just how it works in isolation.

**Real-world problem solving:** VireoKit exists because it solved an actual problem I had. The component inventory, the token values, and the design patterns all came from production code — not from a tutorial.

---

## 9. Installation & Usage

```bash
npm install vireokit
# peers: react >=18, react-dom >=18, react-router-dom >=6
```

```jsx
import { ThemeProvider, NotificationProvider, Button } from 'vireokit';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <Button variant="primary" size="md" onClick={handleSave}>
          Save
        </Button>
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
| **Storybook** | Bundled in the repo — `npm run storybook` |

---

*Built and maintained by Shahriar — Frontend Engineer.*  
*All design decisions, architecture, component implementations, documentation, and build tooling authored solely by me.*
