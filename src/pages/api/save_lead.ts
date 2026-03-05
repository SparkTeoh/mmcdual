export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    // NOTE: The user provided a Google Sheet ID: 13PmMTSeB16_9JCPfHKfFtbj5jTNK3kfpSreEIl4Odxk
    // To write to this sheet, you MUST create a Google Apps Script Web App tied to that sheet 
    // and replace this URL with the new Webhook URL.
    const SHEET_WEBHOOK = import.meta.env.GOOGLE_SHEET_OGSM_WEBHOOK_URL;

    if (!SHEET_WEBHOOK) {
        return new Response(
            JSON.stringify({ error: 'Webhook URL not configured. Please add GOOGLE_SHEET_OGSM_WEBHOOK_URL to your Netlify Environment Variables.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    let body: any;
    try {
        body = await request.json();
    } catch {
        return new Response(
            JSON.stringify({ error: 'Invalid JSON body' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // We use 'save_lead' so your Google Apps script can differentiate it
        // from 'save_pending' (which means they reached the payment screen)
        await fetch(SHEET_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save_lead',
                bill_name: body.name || '',
                bill_email: body.email || '',
                bill_mobile: body.phone || '',
                company: body.company || '',
                position: body.position || '',
                diagnosis: body.diagnosis || '',
                utm_medium: body.utm_medium || '',
                utm_content: body.utm_content || '',
            }),
        });

        console.log('✅ Lead saved to sheet successfully');
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('❌ Failed to save lead:', err);
        return new Response(
            JSON.stringify({ error: 'Failed to save lead' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
