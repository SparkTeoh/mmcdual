# Getting Started

This guide covers how to set up the development environment and run the project locally.

## Prerequisites

- **Node.js**: Version 22 (as specified in `netlify.toml` / `wrangler.toml`).
- **NPM**: Or your preferred package manager (Yarn/PNPM).

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd MMCENZH
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development Commands

The project uses `npm` scripts defined in `package.json`.

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with TOML config watching. |
| `npm run build` | Builds the production site to `dist/`. |
| `npm run preview` | Builds the site and serves the production build suitable for testing. |
| `npm run astro-check` | Runs type checking and diagnostics. |
| `npm run format` | Formats code with Prettier. |

### Note on Configuration
The project uses a custom script `scripts/toml-watcher.mjs` that likely compiles TOML configurations into JSON for Astro to use. This runs automatically with `dev` and `build`.

## Project Configuration

- **Astro Config**: `astro.config.mjs`
- **Tailwind**: Configured via `@tailwindcss/vite` plugin.
- **Typescript**: `tsconfig.json` configured for strict mode and React JSX support.
