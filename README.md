# biodata-util

A small React app to create and export marriage biodata (resume-like profiles) with editable sections, live preview and PDF export.

## Key features

- Live WYSIWYG preview of biodata templates
- Add / remove / reorder sections and fields
- Photo upload and placement options
- Export the current preview as a PDF using html2canvas + jsPDF

## Project structure (important files)

- `src/` — React source
  - `App.js` — app root
  - `index.js` — entry point
  - `contexts/BiodataContext.js` — main state/provider
  - `pages/HomePage.jsx` — editor + preview UI
  - `components/` — UI components (Sidebar, BiodataPreview, PhotoUpload, DraggableList, ...)
  - `utils/PDFGenerator.js` — PDF export helper

## Prerequisites

- Node.js LTS (recommended 18.x or 20.x)
- npm (8+)

Note: This project has been adjusted to target React 18. Some third-party packages have been updated to versions compatible with React 18.

## Quick start

Install dependencies (if you hit peer-dep resolution errors, use the legacy flag shown):

```bash
npm install --no-audit --no-fund
# If you see ERESOLVE errors, retry with:
# npm install --legacy-peer-deps --no-audit --no-fund
```

Run dev server:

```bash
npm start
```

Build production bundle:

```bash
npm run build
```

## Notes I discovered while scanning the codebase

I scanned the source to surface likely build/runtime issues (case-sensitive imports, API mismatches, and package swaps). Below are the actionable notes you should be aware of before running a build or deploying.

1) Dependency changes
	- `react` / `react-dom` are pinned to `^18.2.0`.
	- `react-sortable-hoc` (which required React 16/17) was removed from `package.json` and replaced with `react-sortablejs` + `sortablejs`. The code currently still references the old API in `src/components/common/DraggableList.jsx`. You must either:
	  - migrate `DraggableList` to use `react-sortablejs` (recommended), or
	  - restore `react-sortable-hoc` in `package.json` (less preferred).

2) Case-sensitive import issues (on Linux/macOS filesystem these will fail)
	- In `src/pages/HomePage.jsx`:
	  - `import Sidebar from '../components/Layout/Sidebar'` — actual path is `src/components/Layouts/Sidebar.jsx` (note the plural `Layouts`).
	  - `import DraggableList from '../components/Common/DraggableList'` — actual path is `src/components/common/DraggableList.jsx` (lowercase `common`).
	  - `import { generatePdf } from '../utils/pdfGenerator'` — actual file is `src/utils/PDFGenerator.js` (capital `PDFGenerator`). Update to `../utils/PDFGenerator`.
	- Fix these import paths (or rename files) to match exact casing.

3) Missing/wrong imports and small bugs
	- `HomePage.jsx` uses React hooks and icons without importing them in some places:
	  - `useState` is used but not imported from React in `HomePage.jsx`.
	  - `MenuOutlined` is referenced in `FieldEditor` but not imported there — the drag-handle is already provided by `DraggableList`; remove the duplicate `MenuOutlined` usage or import it where necessary.
	- `DraggableList.jsx` currently uses `react-sortable-hoc` API (`SortableContainer`, `SortableElement`, `SortableHandle`). If you migrate to `react-sortablejs`, rewrite the component to use the wrapper's API (or use plain `sortablejs`).

4) PDF generator import & usage
	- The util is `src/utils/PDFGenerator.js` exporting `generatePdf`. Ensure imports use exactly that filename and casing: `import { generatePdf } from '../utils/PDFGenerator';`

5) Ant Design props
	- A few `Button` usages include a `tooltip` prop — Ant Design `Button` doesn't accept `tooltip` directly. Wrap the `Button` in an `Tooltip` component when you want hover text.

## Recommended immediate fixes

1. Fix import casing in `src/pages/HomePage.jsx`:
	- Sidebar: `../components/Layouts/Sidebar`
	- DraggableList: `../components/common/DraggableList`
	- PDF util: `../utils/PDFGenerator`

2. Update `src/pages/HomePage.jsx` top-level imports to include `useState`:
	- `import React, { useState } from 'react';`

3. Migrate `src/components/common/DraggableList.jsx` from `react-sortable-hoc` to `react-sortablejs` (or add `react-sortable-hoc` back to `package.json`). Example migration path:
	- Use `import Sortable from 'react-sortablejs';` and render children inside Sortable, handling the `onChange` callback to map order to items.

4. Replace `tooltip` props on `Button` with wrapping `Tooltip` component from `antd`.

## Development notes & testing

- To test PDF export locally, start the dev server and use the "Download Biodata as PDF" button in the UI. The app expects an element with id `biodata-pdf-content` to exist for html2canvas to capture.
- There are a number of deprecated/transitive dependency warnings from some older packages; these are warnings rather than build-blockers but worth auditing if you plan to keep the project long-term.

## If you want, I can (pick one)

- A: Run the full migration to `react-sortablejs` (edit `DraggableList` and update usages) and fix the import/casing issues, then run `npm run build` and fix any remaining compile errors. (Recommended, I can do this next.)
- B: Revert the `package.json` change and re-add `react-sortable-hoc` so the current code runs as-is (easier short-term, but keeps an incompatible package).

## Contact / author

This README was generated by an automated code scan. If you want me to apply the recommended fixes (migration + build verification), tell me which option above to take and I will proceed.

---
Generated on 2025-10-26
# biodata-util
