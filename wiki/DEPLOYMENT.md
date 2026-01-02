# Deployment Guide

The project is configured to support multiple deployment targets.

## Build Settings

- **Output Directory**: `dist/`
- **Build Command**: `npm run build`
- **Node Version**: 22 (Recommended)

## Deployment Targets

### Netlify
Configuration: `netlify.toml`
- **Publish**: `dist`
- **Command**: `yarn build` (Note: `netlify.toml` specifies yarn, but `package.json` uses npm. You may want to override this in the Netlify UI to `npm run build` if you encounter issues, or ensure yarn is available).
- **Environment**: Sets `NODE_VERSION = "22"`.
- **Headers**: Long-term caching configured for `/_astro/*` and `/images/*`.

### Cloudflare Pages
Configuration: `wrangler.toml`
- **Name**: `looka-theme`
- **Build Output**: `./dist`
- **Compatibility**: `nodejs_compat` flag enabled.
- **Node Version**: 22.13.1

### Vercel
Configuration: `vercel.json`
- **Build Command**: `sh vercel.sh`
- **Trailing Slash**: specific formatting enabled.
- Uses `vercel.sh` script for custom build logic.

## Environment Variables

When deploying, ensure the following environment variables are set if applicable:
- **Site URL**: `ASTRO_SITE` or similar may be used by the sitemap generator.
- **Secret Keys**: Any API keys required for integrations.
