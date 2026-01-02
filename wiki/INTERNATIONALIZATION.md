# Internationalization (i18n)

The project handles multiple languages (currently English and Chinese). This guide explains how the i18n system works and how to add new languages.

## Configuration

### Enabling/Disabling
Toggle i18n in `src/config/config.toml`:

```toml
[settings.multilingual]
  enable = true
  defaultLanguage = "en"
  disableLanguages = [] # e.g. ["zh"] to disable Chinese
  showDefaultLangInUrl = false # if false, 'en' is at root '/', 'zh' is at '/zh/'
```

### Language Definition
Defined in `src/config/language.json`:

```json
[
  {
    "languageName": "En",
    "languageCode": "en",
    "contentDir": "english",
    "weight": 1
  },
  ...
]
```
- **contentDir**: Matches the folder name in `src/content/blog/`, `src/content/services/`, etc.

## UI Translations

Static UI text (menus, buttons, footer) is translated using JSON files.

1.  **Global Strings**: `src/i18n/en.json`, `src/i18n/zh.json`.
2.  **Navigation Menu**: `src/config/menu.en.json`, `src/config/menu.zh.json`.

## Adding a New Language

1.  Add the language definition to `src/config/language.json`.
2.  Create `src/i18n/{code}.json` and `src/config/menu.{code}.json`.
3.  Create corresponding folders in `src/content/`:
    - `src/content/blog/{contentDir}/`
    - `src/content/services/{contentDir}/`
    - etc.
4.  Ensure `src/config/fonts.json` supports the character set if necessary.

## Development

The helper `src/lib/utils/i18nUtils.ts` provides:
- `getLocaleUrlCTM(url, lang)`: Generates correct URLs for the current language.
- `useTranslations(lang)`: Returns a `t()` function to fetch strings from the JSON dictionaries.
