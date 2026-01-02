# Component Reference

This project uses **Astro Auto-Import** to make several components available in MDX files without explicit import statements.

## Auto-Imported Components
These components can be used directly in your Markdown/MDX files (like Case Studies).

### Structural Components

- **`<CustomButton />`**
    - Renders a styled button.
    - *Usage*: `<CustomButton label="Click Me" url="/contact" />`

- **`<Accordion />`**
    - Collapsible content sections.
    - *Props*: `label` (string), `expanded` (boolean), `group` (string).
    - *Usage*:
      ```jsx
      <Accordion label="Phase 1" expanded="true">
        Content here...
      </Accordion>
      ```

- **`<Notice />`**
    - Alert/Callout boxes for highlighting information.
    - *Props*: `type` ('info', 'success', 'warning', 'error'), `title` (optional).
    - *Usage*:
      ```jsx
      <Notice type="info" title="Did you know?">
        This is an informational note.
      </Notice>
      ```

- **`<Tabs />` & `<Tab />`**
    - Tabbed interface for switching content.

### Content Components

- **`<Testimonial />`**
    - Displays a customer quote.
    - *Props*: `customerName`, `customerRole`, `customerCompanyName`.

- **`<ListCheck />`**
    - Styled unordered list with checkmarks (often used for "Results" or "Benefits").

- **`<StatsWrapper />` & `<StatsItem />`**
    - Displays statistical numbers/KPIs.

- **`<ImageList />` & `<ImageItem />`**
    - Grid or list of images.

- **`<VideoInline />`**
    - Embeds a video player.

## Layout Components
Found in `src/layouts/components/`. Use these when building new Astro pages (`.astro` files).

- **`Base.astro`**: The main HTML shell (`<html>`, `<head>`, `<body>`).
- **`BlogListPage.astro`**: Template for blog listing.
- **`SinglePageLayout.astro`**: Generic page layout.
