# Content Management

This guide explains how to manage content for the website, focusing on Blog Posts, Services, and other Content Collections.

## Content Organization

Content is located in `src/content/` and organized by collection and language.

```
src/content/
├── blog/
│   ├── english/
│   │   ├── my-post.mdx
│   │   └── -index.md      <-- Listing page metadata
│   └── chinese/
├── services/
├── case-studies/
└── pages/
```

## Adding content

### Blog Posts
1.  Navigate to `src/content/blog/{language}/`.
2.  Create a new `.md` or `.mdx` file (e.g., `profit-growth.mdx`).
3.  Add the required frontmatter:

```yaml
---
title: "5 Signs Your Cash Flow is About to Break"
description: "Learn the early warning signs of cash flow problems."
date: 2024-03-15
image: "/images/blog/cash-flow.png"
categories: ["Cash Flow"]
authors: ["MMC Team"]
draft: false
---
```

4.  Write your content below the frontmatter using Markdown.

### Services
Services are defined individually in `src/content/services/{language}/`.
Each service file usually corresponds to a card or section on the services page.

### Index Files (`-index.md`)
You might notice files named `-index.md` in content folders. These are special files used to define metadata for the **listing page** itself (e.g., the main Blog page title and description).

## Images
Place images in `public/images/`.
Refer to them in markdown or frontmatter relative to the public root (e.g., `/images/my-image.jpg`).

## Tips
- **Drafts**: Set `draft: true` in frontmatter to hide content from production builds.
- **Components**: You can use components like `<Notice>` or `<Accordion>` inside `.mdx` files (see [Component Reference](./COMPONENTS.md)).
