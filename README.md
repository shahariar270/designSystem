# VireoKit

> npm package name: `vireokit`

A themeable **React + SCSS** component library — 22 components spanning primitives,
overlays, data, and layout, all driven by CSS-variable design tokens with built-in
light/dark theming. Ships with `"use client"` boundaries on every interactive
component, so it drops into a Next.js App Router project without extra wiring.

- **Live docs:** https://vireo-kit.vercel.app/
- **npm:** https://www.npmjs.com/package/vireokit
- **Plan:** [design_system.md](./design_system.md)
- **Extracted pattern spec:** [pattern-reference.md](./pattern-reference.md)

## Install

```bash
npm install vireokit
# peers: react >=18, react-dom >=18, react-router-dom >=6
```

## Usage

Styles load automatically with the components (the package entry imports its own
CSS), so you only need to wrap your app and use any component:

```jsx
import {
  ThemeProvider,
  NotificationProvider,
  Button,
} from "vireokit";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <NotificationProvider>
        <Button variant="primary" onClick={() => {}}>Save</Button>
      </NotificationProvider>
    </ThemeProvider>
  );
}
```

Need the stylesheet on its own (e.g. to control load order)? Import it explicitly:

```js
import "vireokit/styles"; // dist/style.css
```

Prefer to compile the SCSS yourself (to reuse tokens/mixins)? Import the source entry:

```scss
@use "vireokit/scss";
```

## Theming

Every design decision is a CSS custom property on `:root`, overridden under
`[data-theme="dark"]`. Components reference token names only — re-theming is a token
swap. Toggle with the bundled provider:

```jsx
import { useTheme } from "vireokit";
const { theme, toggleTheme } = useTheme();
```

Re-brand by redefining tokens after the stylesheet import:

```css
:root {
  --color-primary: #7c3aed;
  --radius-md: 14px;
}
```

## Components

| Group | Components |
| --- | --- |
| **Primitives** | `Button`, `Input`, `Checkbox`, `Switch`, `Select`, `Badge`, `Avatar`, `Icon` |
| **Overlays & feedback** | `Modal`, `Drawer`, `Popover`, `Tooltip`, `NotificationProvider` / `useNotification`, `Loading`, `Skeleton` |
| **Data & navigation** | `Table`, `TableContainer`, `Pagination`, `Tab`, `Breadcrumb`, `Divider` |
| **Layout** | `Layout`, `Sidebar`, `Topbar` |
| **Theme** | `ThemeProvider`, `useTheme` |

## Next.js

Every component that uses hooks or attaches DOM event handlers (`Button`, `Input`,
`Checkbox`, `Switch`, `Select`, `Modal`, `Drawer`, `Popover`, `Tooltip`, `Tab`,
`Table`, `Pagination`, `NotificationProvider`, `Topbar`, `Sidebar`, `Avatar`) ships
with a `"use client"` directive, so they work directly inside the App Router without
you having to wrap them yourself. Purely presentational components (`Badge`, `Icon`,
`Divider`, `Breadcrumb`, `Layout`, `Loading`, `Skeleton`) stay server-renderable.

## Documentation

The project ships its own docs website — a page per component with live, copyable
examples, props tables, a theming/tokens guide, and a full dashboard demo — plus a
Storybook catalog.

```bash
npm run dev            # docs site (component-wise examples + Live Demo)
npm run storybook      # Storybook catalog (port 6006)
npm run build          # build the docs site
npm run build:pkg      # build the library: dist/index.js + dist/style.css
npm run build-storybook
```

## Publishing

The package is currently `"private": true`. To publish: set `"private": false`, pick a
registry (npm or GitHub Packages), then `npm publish` — the `prepublishOnly` script
builds `dist/` automatically.

## Tech Stack

- **Framework**: React 19
- **Styling**: SCSS with CSS-variable tokens (`@use` module system)
- **Docs**: custom docs site + Storybook 8
- **Build**: Vite 6 (library mode)
