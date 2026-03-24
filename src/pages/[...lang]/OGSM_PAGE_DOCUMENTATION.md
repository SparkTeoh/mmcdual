# OGSM Page — Complete Technical Documentation

> **Purpose of this document:** Provide a full technical reference of how the OGSM landing page works, covering every frontend section, the multi-step checkout flow, all backend API endpoints, FIUU payment gateway integration, Google Sheets data persistence, and environment configuration.

---

## Table of Contents

1. [Overview](#1-overview)
2. [File Map](#2-file-map)
3. [Frontend Page Sections (ogsm.astro)](#3-frontend-page-sections)
4. [4-Step Checkout Flow](#4-4-step-checkout-flow)
5. [Pricing Logic](#5-pricing-logic)
6. [Input Formatters](#6-input-formatters)
7. [Pax Countdown Feature](#7-pax-countdown-feature)
8. [UTM Tracking](#8-utm-tracking)
9. [Backend API Endpoints](#9-backend-api-endpoints)
10. [FIUU Payment Integration (Full Detail)](#10-fiuu-payment-integration-full-detail)
11. [Google Sheets Webhook Actions](#11-google-sheets-webhook-actions)
12. [Environment Variables](#12-environment-variables)
13. [Data Flow Diagram](#13-data-flow-diagram)
14. [Buy Again / Reset Flow](#14-buy-again--reset-flow)

---

## 1. Overview

The OGSM page (`/ogsm/`) is a Chinese-language landing page for the **"OGSM + KFI 利润突围实战工作坊"** (OGSM + KFI Profit Breakthrough Workshop). It is built with **Astro** and deployed on **Netlify**. 

The page serves two main purposes:
1. **Marketing / Sales** — persuasive content sections (pain points, mistakes, takeaways, instructor bio, course outline).
2. **Registration / Checkout** — a 4-step embedded registration form that collects lead info, participant details, invoice details, then redirects to FIUU (Razer Merchant Services) for payment.

Tech stack: Astro (SSR via Netlify adapter), vanilla TypeScript `<script>` block for client-side logic, FIUU (formerly MOLPay / Razer Merchant Services) for payment gateway, Google Apps Script webhooks for data persistence in Google Sheets.

---

## 2. File Map

| File | Type | Purpose |
|------|------|---------|
| `src/pages/[...lang]/ogsm.astro` | Astro Page | Full landing page HTML + all client-side JS logic |
| `src/pages/api/save_lead.ts` | Astro API Route (SSR) | Proxies lead/attendee/invoice data to Google Sheets |
| `src/pages/api/checkout.ts` | Astro API Route (SSR) | Creates FIUU payment order, generates vcode, saves pending order to Google Sheets |
| `src/pages/api/get_pax.ts` | Astro API Route (SSR) | Fetches remaining pax count from Google Apps Script |
| `src/pages/api/payment-callback.ts` | Astro API Route (SSR) | Receives FIUU server-to-server callback after payment |
| `netlify/functions/payment-callback.mjs` | Standalone Netlify Function v1 | **Duplicate** of `payment-callback.ts` as a Netlify Function — bypasses Netlify CDN cross-site POST protection. This is the **actual** callback endpoint FIUU hits (`/.netlify/functions/payment-callback`) |

---

## 3. Frontend Page Sections

The `ogsm.astro` file contains these visual sections **in order**:

### Frontmatter (Lines 1–11)
```ts
import Base from "@/layouts/Base.astro";
import { generatePaths } from "@/lib/utils/i18nUtils.ts";
export function getStaticPaths() { return generatePaths(); }
const SHOW_PAX_COUNTDOWN = false; // Toggle pax countdown visibility
```
- Uses `Base.astro` layout (likely includes header/footer, SEO meta, etc.).
- `SHOW_PAX_COUNTDOWN` is a **build-time toggle** — set `true`/`false`, then `git push` to enable/disable the pax countdown section. When `false`, the countdown container is not rendered at all in the HTML.

### Section: Mobile Banner (Lines 13–24)
- Shows the OGSM banner image (`/images/banner/OGSM_banner.jpeg`) only on mobile (`md:hidden`).

### Section: Hero (Lines 26–64)
- Desktop: Banner image as background with a radial gradient overlay.
- Contains the headline "OGSM + KFI 利润突围实战工作坊" and a CTA button linking to `#registration-form`.
- Mobile: Solid primary background color (no banner as background since it's shown above).

### Section 1: "The Pain" (Lines 66–86)
- Pain-point copy about bosses' frustration — employees are busy but profits are low.
- Key message: "It's not about bad execution; your OGSM is missing the 'accounting' logic."

### Section 2: "3 Mistakes" (Lines 88–117)
- 3-column grid showing common mistakes:
  1. Departments working in silos / pulling in different directions.
  2. Tracking "activities done" instead of "revenue generated".
  3. Metrics look good on paper but the bank account is empty.

### Section 3: "Takeaways" (Lines 119–172)
- Dark-background section showing an OGSM Map image (`/images/others/OGSM_Map.png`).
- Three value propositions: Revenue quality, Cost efficiency, Future assets.
- "Result Promise" callout box.

### Section 4: "Instructor" (Lines 174–218)
- Spark Liang (张开亮) bio as MMC Financial Planning strategic budget instructor.
- Methodology based on 张敏敏's OGSM framework book.

### Section 4.5: "Course Content" (Lines 219–325)
- Three "精华" (key takeaway) blocks, each with a red "你将不再" (you will stop) and green "你将获得" (you will get) comparison.

### Section 5: "Event Details & Registration Form" (Lines 327–586)
- Left sidebar: Event details (date, price, venue, who should attend), plus optional pax countdown box.
- Right column: The 4-step registration form (see next section).

---

## 4. 4-Step Checkout Flow

All four steps are rendered as `<div>` blocks inside the `#registration-form` section. Only one step is visible at a time; transitions are done by toggling the `hidden` CSS class. Every step has a "back" button to return to the previous step.

### Step 1: Lead Information (`#ogsm-form`)
**Visible by default.** Collects:
- 姓名 (Name) — `input#name`, required
- 公司名称 (Company) — `input#company`, required
- 职位 (Position) — `input#position`, required
- 联系电话 (Phone) — `input#phone`, required, phone formatter applied
- 邮箱 (Email) — `input#email`, required
- 课前诊断 (Pre-course Diagnosis) — `textarea#diagnosis`, required

**On submit:**
1. Validates form fields via `form.checkValidity()`.
2. Sends `POST /api/save_lead/` with `action: 'save_lead'` containing: name, company, position, phone (digits only), email, diagnosis, utm_medium, utm_content.
3. **Non-blocking on failure** — if the API call fails, a `console.warn` is logged but the user still proceeds to Step 2.
4. Initializes attendee fields by calling `updatePricing()`.
5. Auto-fills Attendee 1's name and phone from Step 1 data (only if the field is currently empty).
6. Hides Step 1 form, shows `#participants-section`.

### Step 2: Participant Details (`#participants-section`)
Contains:
- **Pax selector** — `+` / `−` buttons around a readonly `input#pax` (min 1, max 20).
- **Pricing breakdown** — Subtotal, SST (8%), Total, plus a "savings hint" for group discounts.
- **Attendee detail blocks** — dynamically generated `<div>` blocks inside `#attendees-container`. Each block collects:
  - Full Name as per IC — `attendee_name_{i}`
  - IC No. — `attendee_ic_{i}`, IC formatter applied
  - Phone No. — `attendee_phone_{i}`, phone formatter applied

**On submit:**
1. Validates the participants form.
2. Re-checks Step 1 form validity.
3. Collects all attendee data (name, IC digits only, phone digits only) into an array.
4. Sends `POST /api/save_lead/` with `action: 'save_attendees'` containing: bill_email, pax, attendees array.
5. Auto-fills invoice fields from Step 1 data (company, phone, email — only if empty).
6. Hides Step 2, shows `#invoice-section`.

### Step 3: Invoice Details (`#invoice-section`)
Collects:
- 公司名称 (Invoice Company Name) — `input#inv_company`, required
- 公司地址 (Invoice Company Address) — `textarea#inv_address`, required
- 联系电话 (Invoice Phone) — `input#inv_phone`, required, phone formatter applied
- 邮箱 (Invoice Email) — `input#inv_email`, required

Note: Fields are auto-filled from Step 1 data (company, phone, email) when entering this step.

**On submit:**
1. Validates the invoice form.
2. Re-checks Step 1 and Step 2 form validity.
3. Sends `POST /api/save_lead/` with `action: 'save_invoice'` containing: bill_email as lookup key, inv_company, inv_address, inv_phone (digits only), inv_email.
4. Updates the Step 4 summary UI with current pricing values.
5. Hides Step 3, shows `#checkout-section`.

### Step 4: Confirm & Pay (`#checkout-section`)
Displays:
- **Order Summary** — Pax count, subtotal, SST, total (pulled from the pricing breakdown).
- **"💳 立即付款 (Pay Now)"** button.

**On "Pay Now" click:**
1. Re-validates Step 1 form.
2. Calculates final amount: `calcSubtotal(pax)` + 8% SST, rounded to 2 decimals.
3. Prepares `billDesc`: `"{pax} pax《OGSM + KFI（财务指标）实战工作坊》"`.
4. **Immediately opens a centered popup window** (`window.open('about:blank', 'fiuu_payment', ...)`) — this is done synchronously in the click handler to avoid browser popup blockers. The popup shows a loading spinner ("请稍等，正在创建订单与支付页面...").
5. Hides the Pay Now button, shows a loading spinner on the main page.
6. Sends `POST /api/checkout/` with: amount, bill_name, bill_email, bill_mobile, bill_desc, pax, company, position, diagnosis.
7. On success, receives back `paymentData` containing signed FIUU parameters.
8. **Creates a hidden `<form>`** on the main page with `target="fiuu_payment"` (the popup window name) and `action=paymentData.payment_url`. Populates it with hidden inputs for all FIUU fields (see section 10).
9. **Submits the form** — this POSTs to FIUU's payment page inside the popup window.
10. Removes the injected form from the DOM.
11. **Polls popup closure** every 500ms. When the popup is closed (by the user or by FIUU return), calls `showThankYou()`.

**If the API call fails:**
- Closes the popup if open.
- Shows an error alert.
- Re-shows the Pay Now button.

---

## 5. Pricing Logic

Defined in the client-side `<script>` block:

```
Constants:
  PRICE_PER_PAX = 128 (RM)
  SST_RATE = 0.08 (8%)

calcSubtotal(pax):
  pax = 1  → RM 128
  pax = 2  → RM 199
  pax ≥ 3  → RM 199 + (pax - 2) × RM 99

Full Price (without discount) = pax × 128
SST = subtotal × 0.08
Total = subtotal + SST
```

**Discount display rules:**
- For 2+ pax: Shows the "original price" row (crossed out), the actual subtotal, and a "🎉 团报优惠！省下 RM X" savings hint.
- For 1 pax: Original price row and savings hint are hidden.

**Examples:**

| Pax | Subtotal | SST (8%) | Total |
|-----|----------|----------|-------|
| 1 | RM 128.00 | RM 10.24 | RM 138.24 |
| 2 | RM 199.00 | RM 15.92 | RM 214.92 |
| 3 | RM 298.00 | RM 23.84 | RM 321.84 |
| 5 | RM 496.00 | RM 39.68 | RM 535.68 |

---

## 6. Input Formatters

A global `input` event listener on `document` handles real-time formatting:

### Phone Formatter
Applied to: `name="phone"`, `name="inv_phone"`, `name` starting with `attendee_phone_`.
- Strips all non-digits; max 11 digits.
- If starts with `011`: formats as `011 XXXX XXXX`.
- Otherwise: formats as `0XX-XXX XXXX`.

### IC Formatter
Applied to: `name` starting with `attendee_ic_`.
- Strips all non-digits; max 12 digits.
- Formats as `XXXXXX-XX-XXXX` (Malaysian IC format).

**Important:** When data is sent to the API, phone and IC values are stripped back to digits-only using `.replace(/\D/g, '')`.

---

## 7. Pax Countdown Feature

**Toggle:** Controlled by `const SHOW_PAX_COUNTDOWN = false;` in the Astro frontmatter (build-time). When `false`, the entire countdown `<div>` is not rendered.

**When enabled:**
1. On `DOMContentLoaded`, the client JS fetches `GET /api/get_pax/`.
2. The API proxies to a Google Apps Script URL (env var `GOOGLE_SHEET_COUNTDOWN`) which reads the pax data from a Google Sheet.
3. The response contains `{ remainingPax: number }`.
4. UI behavior based on `remainingPax`:
   - `> 20`: Shows "✅ 席位充足" (seats available).
   - `1–20`: Shows "🔥 紧急！仅剩 **X** 个席位！".
   - `≤ 0`: Shows "🚫 名额已满！" **AND disables the entire Step 1 form** — all inputs are disabled, the submit button text changes to "🚫 已满额，报名通道关闭" and is grayed out.

**API endpoint: `GET /api/get_pax/`** (`get_pax.ts`)
- Reads `GOOGLE_SHEET_COUNTDOWN` env var.
- Fetches from the Google Apps Script URL (follows 302 redirects).
- Returns the JSON response with 60-second cache (`Cache-Control: public, max-age=60`).

---

## 8. UTM Tracking

On page load, the script captures UTM parameters from the URL query string:
```ts
const utmMedium  = new URLSearchParams(window.location.search).get('utm_medium') || '';
const utmContent = new URLSearchParams(window.location.search).get('utm_content') || '';
```

These values are included when saving the lead in Step 1 (`action: 'save_lead'`), sent as `utm_medium` and `utm_content` fields. This allows tracking which ad source or campaign brought the lead.

---

## 9. Backend API Endpoints

All four API routes have `export const prerender = false;` to ensure they run server-side (SSR on Netlify).

### 9.1 `POST /api/save_lead/`

**File:** `src/pages/api/save_lead.ts`

A multi-action endpoint that proxies data to a Google Apps Script webhook. Uses `GOOGLE_SHEET_OGSM_WEBHOOK_URL` env var.

| Action | When Called | Payload → Google Sheet |
|--------|-----------|----------------------|
| `save_lead` | Step 1 submit | `bill_name`, `bill_email`, `bill_mobile`, `company`, `position`, `diagnosis`, `utm_medium`, `utm_content` |
| `save_attendees` | Step 2 submit | `bill_email` (row lookup key), `pax`, `attendees` (array of `{name, ic, phone}`) |
| `save_invoice` | Step 3 submit | `bill_email` (row lookup key), `inv_company`, `inv_address`, `inv_phone`, `inv_email` |

**Key behavior:**
- Attendees and invoice actions use `bill_email` to find and update the existing lead row in Google Sheets (the Google Apps Script handles the row lookup).
- When pax is reduced, excess attendee columns must be cleared (handled by the Google Apps Script, not this code).
- IC numbers are sent as digits-only strings; the Google Apps Script must treat them as text to preserve leading zeros.

### 9.2 `POST /api/checkout/`

**File:** `src/pages/api/checkout.ts`

Creates a payment order and returns signed FIUU parameters. Two sub-flows:

#### Sub-flow A: Payment Return Log
If the request body has `_type: 'payment_return_log'`, it simply logs the payment return info to the server console and returns `{ logged: true }`. (This is a fire-and-forget call from the frontend when the FIUU return page loads.)

#### Sub-flow B: Order Creation (Main Flow)
1. **Reads env vars:** `FIUU_MERCHANT_ID`, `FIUU_VERIFY_KEY`, `FIUU_ENV` (sandbox/production), `GOOGLE_SHEET_WEBHOOK_URL`.
2. **Validates:** Checks credentials exist and amount > 0.
3. **Generates order ID:** `'OGSM' + Date.now().toString(36).toUpperCase() + random_chars` — e.g., `OGSMM1ABCXYZ`.
4. **Generates vcode (FIUU signature):**
   ```
   vcodeRaw = amount(2dp) + MERCHANT_ID + orderid + VERIFY_KEY
   vcode = MD5(vcodeRaw)
   ```
   Uses a pure JavaScript MD5 implementation (no external dependencies).
5. **Builds payment URL:**
   - Production: `https://pay.merchant.razer.com/MOLPay/pay/{MERCHANT_ID}/`
   - Sandbox: `https://sandbox.merchant.razer.com/MOLPay/pay/{MERCHANT_ID}/`
6. **Saves pending order to Google Sheet** via `GOOGLE_SHEET_WEBHOOK_URL` with action `save_pending`:
   - Fields: `orderid`, `bill_name`, `bill_email`, `bill_mobile`, `company`, `position`, `pax`, `amount`, `bill_desc`, `diagnosis`.
7. **Returns JSON** with all signed payment parameters needed by the frontend:
   ```json
   {
     "merchant_id": "...",
     "amount": "138.24",
     "orderid": "OGSMM1ABCXYZ",
     "bill_name": "...",
     "bill_email": "...",
     "bill_mobile": "...",
     "bill_desc": "...",
     "vcode": "abc123...",
     "currency": "MYR",
     "channel": "",
     "returnurl": "{origin}/ogsm/",
     "callbackurl": "{origin}/.netlify/functions/payment-callback",
     "payment_url": "https://pay.merchant.razer.com/MOLPay/pay/{MERCHANT_ID}/",
     "environment": "production"
   }
   ```

**Important:** `returnurl` is set to `{origin}/ogsm/` — after payment, the user is redirected back to the OGSM page itself (inside the popup). `callbackurl` points to the **Netlify Function** (`/.netlify/functions/payment-callback`), NOT the Astro API route, to bypass CDN cross-site POST protection.

### 9.3 `GET /api/get_pax/`

**File:** `src/pages/api/get_pax.ts`

- Proxies to Google Apps Script URL from `GOOGLE_SHEET_COUNTDOWN` env var.
- Handles 302 redirects (Google Apps Script idiosyncrasy).
- Returns JSON with 60s cache header.

### 9.4 `POST /api/payment-callback` (Astro version — NOT the one FIUU actually hits)

**File:** `src/pages/api/payment-callback.ts`

This is the Astro API route version. However, **FIUU actually hits the standalone Netlify Function** at `/.netlify/functions/payment-callback` because Netlify CDN blocks cross-site POSTs to Astro routes. Both files contain identical logic.

---

## 10. FIUU Payment Integration (Full Detail)

FIUU (formerly MOLPay / Razer Merchant Services) is the Malaysian payment gateway used for processing payments.

### 10.1 Payment Flow Overview

```
User clicks "Pay Now"
  ↓
Browser opens popup window (about:blank)
  ↓
Frontend POSTs to /api/checkout/ (Astro serverless)
  ↓
checkout.ts generates: order ID, vcode (MD5 signature), payment URL
checkout.ts saves pending order to Google Sheet (GOOGLE_SHEET_WEBHOOK_URL)
  ↓
Frontend receives signed payment params
  ↓
Frontend creates hidden <form> with target="fiuu_payment" (popup)
  ↓
Form POSTs to FIUU payment URL → FIUU payment page loads in popup
  ↓
User completes payment on FIUU
  ↓                              ↓
(Client-side)                 (Server-side)
FIUU redirects popup           FIUU sends POST to 
to returnurl (/ogsm/)          callbackurl
  ↓                              ↓
User closes popup              payment-callback.mjs
  ↓                            verifies skey,
Frontend detects                sends confirm_payment
popup closed →                 to Google Sheet
showThankYou()
```

### 10.2 FIUU Form Fields Submitted to Payment Gateway

The frontend builds a hidden form and POSTs these fields to `paymentData.payment_url`:

| Field | Value | Description |
|-------|-------|-------------|
| `merchant_id` | From env `FIUU_MERCHANT_ID` | Your FIUU merchant ID |
| `amount` | e.g., `"138.24"` | Total amount (2 decimal places) |
| `orderid` | e.g., `"OGSMM1ABCXYZ"` | Unique order ID generated by checkout.ts |
| `bill_name` | User's name | From Step 1 |
| `bill_email` | User's email | From Step 1 |
| `bill_mobile` | User's phone (digits) | From Step 1 |
| `bill_desc` | e.g., `"1 pax《OGSM...》"` | Order description |
| `vcode` | MD5 hash | Verification code = `MD5(amount + merchant_id + orderid + verify_key)` |
| `currency` | `"MYR"` | Malaysian Ringgit |
| `channel` | `""` (empty) | Let user choose payment channel on FIUU page |
| `returnurl` | `"{origin}/ogsm/"` | Where to redirect user after payment (inside popup) |
| `callbackurl` | `"{origin}/.netlify/functions/payment-callback"` | Server-to-server callback URL |
| `extraP` | JSON string | `{ company, position, diagnosis, pax }` — extra params passed through |

### 10.3 Vcode Generation (Checkout Signature)

```
Input:  amount(2dp) + MERCHANT_ID + orderid + VERIFY_KEY
Output: MD5 hex string (lowercase)
```

Example:
```
"138.24" + "merchant123" + "OGSMM1ABCXYZ" + "verifykey456"
→ MD5 → "a1b2c3d4e5f6..."
```

This vcode proves to FIUU that the order was created by a legitimate server with the correct verify key.

### 10.4 Payment Callback Verification (Skey)

When FIUU calls back to `/.netlify/functions/payment-callback`, it sends a form-urlencoded POST body containing:

| Field | Description |
|-------|-------------|
| `tranID` | FIUU transaction ID |
| `orderid` | The order ID we generated |
| `status` | `"00"` = success, other values = failed/pending |
| `domain` | Merchant domain |
| `amount` | Payment amount |
| `currency` | Currency code |
| `appcode` | Bank approval code |
| `paydate` | Payment date/time |
| `skey` | FIUU's signature for verification |
| `channel` | Payment channel used |

**Skey verification algorithm:**
```
key0 = MD5(tranID + orderid + status + domain + amount + currency)
key1 = MD5(paydate + domain + key0 + appcode + SECRET_KEY)

If key1 === skey → callback is genuine
If key1 !== skey → possible spoofed callback, log warning, still return "CAPTURED"
```

Uses `FIUU_SECRET_KEY` env var (different from `FIUU_VERIFY_KEY`).

### 10.5 Post-Payment Actions

If `status === "00"` (successful payment) AND `GOOGLE_SHEET_WEBHOOK_URL` is set:
- Sends POST to Google Sheet webhook with:
  ```json
  {
    "action": "confirm_payment",
    "orderid": "OGSMM1ABCXYZ",
    "tranID": "123456789",
    "channel": "fpx",
    "paydate": "2026-03-20 14:30:00"
  }
  ```
- This updates the pending order row in Google Sheets to mark it as paid.

**Response to FIUU:** Always returns plain text `"CAPTURED"` with status 200 (FIUU requirement).

### 10.6 Popup Window Strategy

The popup window approach is used for two key reasons:
1. **Avoid popup blockers** — `window.open()` is called synchronously in the click handler (before any async calls), so browsers allow it.
2. **Keep main page state** — The user's form data remains intact on the main page while they complete payment in the popup.

The popup is 500×650px, centered on screen. After the API responds, the hidden form submission replaces the popup's loading spinner with the FIUU payment page.

When the popup closes (whether user closes it manually or FIUU return redirects then user closes), the frontend detects this via polling (`setInterval` every 500ms checking `popup.closed`) and shows the thank-you message.

### 10.7 Return URL Behavior

The `returnurl` is set to `{origin}/ogsm/` — this means after payment, FIUU redirects the popup back to the OGSM page itself. The user then closes the popup, which triggers the thank-you screen on the main page.

---

## 11. Google Sheets Webhook Actions

The system uses **two separate** Google Apps Script webhook URLs for different purposes:

### Webhook 1: `GOOGLE_SHEET_OGSM_WEBHOOK_URL`
Used by `save_lead.ts`. Handles lead/registration data:

| Action | Purpose | Lookup |
|--------|---------|--------|
| `save_lead` | Create new lead row | N/A (creates new row) |
| `save_attendees` | Update attendee columns | By `bill_email` |
| `save_invoice` | Update invoice columns | By `bill_email` |

### Webhook 2: `GOOGLE_SHEET_WEBHOOK_URL`
Used by `checkout.ts` and `payment-callback.mjs`. Handles order/payment data:

| Action | Purpose | Lookup |
|--------|---------|--------|
| `save_pending` | Create pending order row | N/A (creates new row) |
| `confirm_payment` | Mark order as paid | By `orderid` |

### Webhook 3: `GOOGLE_SHEET_COUNTDOWN`
Used by `get_pax.ts`. A separate Google Apps Script that returns `{ remainingPax: number }`.

---

## 12. Environment Variables

All env vars are set in Netlify's Environment Variables settings.

| Variable | Used By | Purpose |
|----------|---------|---------|
| `FIUU_MERCHANT_ID` | `checkout.ts` | FIUU merchant identifier |
| `FIUU_VERIFY_KEY` | `checkout.ts` | Used for generating vcode (checkout signature) |
| `FIUU_SECRET_KEY` | `payment-callback.mjs` | Used for verifying skey (callback signature) |
| `FIUU_ENV` | `checkout.ts` | `"sandbox"` or `"production"` — determines payment gateway URL |
| `GOOGLE_SHEET_WEBHOOK_URL` | `checkout.ts`, `payment-callback.mjs` | Webhook for pending orders and payment confirmations |
| `GOOGLE_SHEET_OGSM_WEBHOOK_URL` | `save_lead.ts` | Webhook for leads, attendees, and invoice data |
| `GOOGLE_SHEET_COUNTDOWN` | `get_pax.ts` | Google Apps Script URL for pax countdown |

---

## 13. Data Flow Diagram

```
                        ┌──────────────────────┐
                        │      User Browser     │
                        └──────────┬───────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
     Step 1 Submit          Step 2 Submit          Step 3 Submit
            │                      │                      │
            ▼                      ▼                      ▼
   POST /api/save_lead/    POST /api/save_lead/    POST /api/save_lead/
   action: save_lead       action: save_attendees  action: save_invoice
            │                      │                      │
            ▼                      ▼                      ▼
   GOOGLE_SHEET_OGSM_     GOOGLE_SHEET_OGSM_     GOOGLE_SHEET_OGSM_
   WEBHOOK_URL             WEBHOOK_URL            WEBHOOK_URL
   → Google Sheet          → Google Sheet         → Google Sheet
   (new row)               (update by email)      (update by email)

                                   │
                           Step 4: Pay Now
                                   │
                                   ▼
                         POST /api/checkout/
                                   │
                    ┌──────────────┼──────────────┐
                    │                             │
            Generate order ID,             Save pending order
            vcode, payment URL             POST → GOOGLE_SHEET_
                    │                      WEBHOOK_URL
                    ▼                      action: save_pending
            Return signed params
            to frontend
                    │
                    ▼
         Frontend form POST →
         FIUU Payment URL
         (in popup window)
                    │
         User pays on FIUU
                    │
          ┌─────────┼──────────┐
          │                    │
   Return to /ogsm/      FIUU server callback
   (in popup)            POST → /.netlify/functions/
          │              payment-callback
   User closes popup           │
          │              Verify skey (MD5)
          ▼              If status "00":
   showThankYou()        POST → GOOGLE_SHEET_WEBHOOK_URL
                         action: confirm_payment
```

---

## 14. Buy Again / Reset Flow

After the thank-you message is shown, a "🔄 再次报名" (Buy Again) button is available. Clicking it:

1. Resets the Step 1 form (`form.reset()`).
2. Resets the invoice form (`invoiceForm.reset()`).
3. Resets the participants form and clears all dynamically created attendee blocks.
4. Resets pax to 1 and recalculates pricing.
5. Hides all sections (thank-you, checkout, participants, invoice).
6. Shows Step 1 form again.

This allows the user to make another purchase without reloading the page.

---

## Appendix: Key Technical Notes

1. **Two payment-callback files exist:** The Astro route (`src/pages/api/payment-callback.ts`) and the Netlify Function (`netlify/functions/payment-callback.mjs`). The Netlify Function is the one FIUU actually calls because Netlify's CDN blocks cross-origin form POSTs to Astro routes. Both contain identical logic; if you update one, you must update the other.

2. **MD5 is implemented in pure JS** — no external npm packages. The same `md5Pure()` function is duplicated in `checkout.ts`, `payment-callback.ts`, and `payment-callback.mjs`.

3. **The `save_lead` API is non-blocking on failure** — if saving to Google Sheets fails at any step (1, 2, or 3), the user still proceeds to the next step. Only `console.warn` is logged.

4. **The checkout API call IS blocking** — if `POST /api/checkout/` fails, the popup is closed and an error alert is shown. The user cannot proceed to payment.

5. **IC numbers are stored as text** — sent to the Google Sheet as digit-only strings (no dashes) and must be stored as text format in the sheet to preserve leading zeros.

6. **Pax countdown is a build-time toggle** — changing `SHOW_PAX_COUNTDOWN` requires a code change + `git push` + redeploy. It's not a runtime toggle.

7. **Two separate Google Sheet webhooks** — The lead data (`GOOGLE_SHEET_OGSM_WEBHOOK_URL`) and order data (`GOOGLE_SHEET_WEBHOOK_URL`) may point to different Google Sheets or different scripts on the same sheet. They serve different purposes and store data in different sheets/tabs.
