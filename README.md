# Stronger Ecommerce - EDI Transactions Dashboard (Shopify Polaris)

A high-fidelity replica and implementation of the EDI Transactions dashboard and detail management views built strictly adhering to the **Shopify Polaris Design System**, with **React**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- **Strict Shopify Polaris UI**:
  - `<IndexTable>` with responsive columns, custom status badges, and resource actions.
  - `<DataTable>` for secondary document audits with ISA/GS/ST control numbers.
  - `<Badge>` with dynamic status tones (`success`, `warning`, `critical`, `info`) and progress states.
  - `<InlineGrid>`, `<BlockStack>`, and `<InlineStack>` layout primitives.
  - `<Modal>` for viewing raw X12 EDI transaction documents.
- **Fluid Responsiveness**:
  - Desktop, tablet, and mobile optimized.
  - Multi-column metric cards grid (`InlineGrid`) with intelligent mobile reflow.
- **Robust API & Fallback Layer**:
  - Configurable backend integration via `VITE_API_BASE_URL`.
  - Automatic normalization supporting both `camelCase` and `snake_case` payloads.
  - Single-source fallback mock data (`src/api/mockData.ts`) when running offline or during API downtime.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
npm run build
```

---

## Configuration

To connect a live backend API, set `VITE_API_BASE_URL` in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

When `VITE_API_BASE_URL` is omitted, the application seamlessly runs on complete mock data from `src/api/mockData.ts`.
