# Project Configuration (`config.toml`)

The core configuration for the site is located in `src/config/config.toml`. This file controls global settings, SEO, and specific feature toggles.

## Site Settings `[site]`
- **title**: The global title of the website (used for SEO/OpenGraph default).
- **description**: Global meta description.
- **baseUrl**: The production URL (e.g., `https://mmc.financial`).
- **trailingSlash**: Set to `true` to enforce trailing slashes.

## SEO `[seo]`
- **keywords**: Global default keywords.
- **sitemap**: Enable/disable automatic sitemap generation.

## Settings `[settings]`
Feature flags and folder mappings.

- **Content Folders**:
  - `blogFolder`: Path for blog posts (default: "blog")
  - `servicesFolder`: Path for services (default: "services")
  - `portfolioFolder`: Path for case studies (default: "case-studies")

- **Sticky Header**: Toggle navigation stickiness.
- **Contact Form**: Configure provider (`formsubmit.co`, `formspree`, etc.) and action URL.
- **Subscription**: Configure Mailchimp action URL.

### Multilingual `[settings.multilingual]`
- **enable**: Toggle multi-language support.
- **defaultLanguage**: The primary language code (e.g., "en").
- **showDefaultLangInUrl**: If false, the default language lives at `/` instead of `/en/`.

## OpenGraph `[opengraph]`
- **image**: Default social share image (`/images/og-image.png`).

## Custom Head `[head]`
Add custom HTML to the `<head>` tag, such as analytics scripts.
