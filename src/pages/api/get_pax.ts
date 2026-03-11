export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const appScriptUrl = import.meta.env.PUBLIC_GOOGLE_SHEET_COUNTDOWN || process.env.PUBLIC_GOOGLE_SHEET_COUNTDOWN;
    if (!appScriptUrl) {
      return new Response(JSON.stringify({ error: "API Config error: PUBLIC_GOOGLE_SHEET_COUNTDOWN not found" }), { status: 500 });
    }

    // Google Apps Script Web Apps often return a 302 Redirection
    let response = await fetch(appScriptUrl, { redirect: "follow" });
    
    // If undici/node fetch doesn't follow automatically, we catch 302s
    if (response.status === 302 && response.headers.has('location')) {
       response = await fetch(response.headers.get('location') as string);
    }
    
    if (!response.ok) {
       return new Response(JSON.stringify({ error: "Failed to fetch from Google App Script", status: response.status }), { status: 500 });
    }

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse JSON from Apps Script:", rawText);
      return new Response(JSON.stringify({ error: "Invalid JSON response from App Script" }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60" // Cache to avoid rate limits
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch pax data" }), { status: 500 });
  }
};
