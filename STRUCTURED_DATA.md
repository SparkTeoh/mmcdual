# Structured Data Playbook

This site now emits multilingual JSON-LD for the key business entities and content blocks. Use the notes below whenever you extend or debug the schema.

## Helper utilities

- `src/lib/utils/schema.ts` centralises:
  - Organization/WebSite meta (addresses, license ids, contact channels).
  - Translation dictionaries for Chinese → English schema copy (currently used for pricing and FAQ text).
  - Builders such as `buildServiceSchemas`, `buildFaqSchema`, `buildContactSchema`, `buildOfficeSchema`, and `buildArticleSchema`.
- `src/layouts/components/widgets/SchemaSnippet.astro` renders additional schema graphs from any section/component.

When adding a new schema snippet:

1. Import the relevant builder(s) from `@/lib/utils/schema`.
2. Compute the localized data using the section’s content (pass `Astro.currentLocale`, absolute URLs via `Astro.site?.href ?? new URL("/", Astro.url).href`).
3. Wrap the result in `<SchemaSnippet data={...} />`. The component safely ignores `null/undefined`.

If you introduce new Chinese source text that must appear in English schema output, update the translation maps inside `schema.ts` so both locales stay consistent.

## Page-level behaviour

- Base layout now outputs a `@graph` containing `WebPage`, `WebSite`, and `Organization` nodes for every page.
- Blog single templates pass `schemaNodes: [buildArticleSchema(...)]` so each article publishes a proper `Article` entity.

## Section coverage

- Pricing → `Service` + `Offer` nodes from `buildServiceSchemas`.
- Contact → localized `ContactPage` with `ContactPoint` entries.
- Office locations → `Place` node referencing the Exchange 106 HQ.
- FAQ → `FAQPage` with translated Q/A pairs; both zh-Hans and en variants reuse the same canonical data.

## Validation workflow

1. `npm run astro-check` (or `npx astro check --files <path>` for targeted runs) to confirm TypeScript and Astro diagnostics.
2. `npm run build` before deploy to ensure no regressions in the production bundle.
3. Copy any page URL into Google’s [Rich Results Test](https://search.google.com/test/rich-results) or the `schema-dts` playground to confirm the emitted JSON-LD is valid for both `/zh/` and `/en/` routes.
4. When editing translations, re-run the Rich Results Test on both locales to verify that `inLanguage`, descriptions, and FAQ answers are localized as expected.

Document any future schema additions (new builders or translation keys) in this file so the next update stays predictable.

