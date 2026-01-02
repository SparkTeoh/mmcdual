# Project Structure

This document outlines the file structure of the **MMCENZH** project (based on the Looka Astro Theme).

## Directory Layout

```
├── .astro/                 # Generated Astro types and cache
├── dist/                   # Production build output
├── public/                 # Static assets (images, fonts, robots.txt)
├── scripts/                # Build and utility scripts (favicon generation, i18n tools)
├── src/
│   ├── assets/             # Bundled assets (processed by Vite/Astro)
│   ├── config/             # JSON/TOML configuration files (fonts, etc.)
│   ├── content/            # Astro Content Collections (Markdown/MDX content)
│   ├── layouts/            # Page layouts and shared components
│   │   ├── components/     # Reusable UI components
│   │   ├── helpers/        # Helper UI logic
│   │   └── shortcodes/     # MDX-ready components (Accordion, Notice, etc.)
│   ├── lib/                # Utility functions (i18n, schema builders)
│   ├── pages/              # File-based routing
│   │   └── [...lang]/      # Internationalized routes
│   └── styles/             # Global styles (CSS/SCSS)
├── astro.config.mjs        # Astro configuration
├── package.json            # Project dependencies and scripts
└── wiki/                   # Project documentation
```

## Key Architectural Concepts

### Internationalization (i18n)
The project uses a dynamic route `src/pages/[...lang]/` to handle multi-language support.
- Configured in `src/lib/utils/i18nUtils.ts`.
- Default language preferences are stored in configuration files (generated).

### Content Collections
Content is stored in `src/content` and defined in `src/content.config.ts`.
- **Blog**: Standard blog posts.
- **Case Studies**: Portfolio items (`portfolioCollection`).
- **Services**: Service offerings.
- **Pages/Sections**: Landing page content blocks.

### Component Aliases
The `tsconfig.json` defines several path aliases for cleaner imports:
- `@/components` -> `src/layouts/components`
- `@/shortcodes` -> `src/layouts/shortcodes`
- `@/helpers` -> `src/layouts/helpers`
- `@` -> `src`
