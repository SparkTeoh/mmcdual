export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    // --- Read secret env vars (server-side only, never exposed to browser) ---
    const MERCHANT_ID = import.meta.env.FIUU_MERCHANT_ID;
    const VERIFY_KEY = import.meta.env.FIUU_VERIFY_KEY;
    const FIUU_ENV = import.meta.env.FIUU_ENV || 'sandbox';
    const SHEET_WEBHOOK = import.meta.env.GOOGLE_SHEET_WEBHOOK_URL;

    // --- Parse request body ---
    let body: any;
    try {
        body = await request.json();
    } catch {
        return new Response(
            JSON.stringify({ error: 'Invalid JSON body' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // --- Handle payment return log (fire-and-forget from frontend) ---
    if (body._type === 'payment_return_log') {
        console.log('');
        console.log('╔══════════════════════════════════════════════════════╗');
        console.log('║         FIUU PAYMENT RETURN — CLIENT REPORT         ║');
        console.log('╠══════════════════════════════════════════════════════╣');
        console.log('║ Status:        ', body.status || 'N/A');
        console.log('║ Order ID:      ', body.orderId || 'N/A');
        console.log('║ Amount:        ', body.amount ? `RM ${body.amount}` : 'N/A');
        console.log('║ Transaction ID:', body.tranId || 'N/A');
        console.log('║ Timestamp:     ', body.timestamp || new Date().toISOString());
        console.log('║ All Params:    ', JSON.stringify(body.all_params || {}, null, 2));
        console.log('╚══════════════════════════════════════════════════════╝');
        console.log('');

        return new Response(JSON.stringify({ logged: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- Validate credentials ---
    if (!MERCHANT_ID || !VERIFY_KEY) {
        return new Response(
            JSON.stringify({ error: 'FIUU credentials not configured. Set FIUU_MERCHANT_ID and FIUU_VERIFY_KEY in .env' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // --- Validate amount ---
    const amount = parseFloat(body.amount?.toFixed?.(2) ?? '0');
    if (!amount || amount <= 0) {
        return new Response(
            JSON.stringify({ error: 'Invalid amount' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // --- Generate order ID ---
    const orderid = 'OGSM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

    // --- Generate vcode: MD5(amount + merchantid + orderid + verifykey) ---
    const amountStr = amount.toFixed(2);
    const vcodeRaw = amountStr + MERCHANT_ID + orderid + VERIFY_KEY;
    const vcode = md5Pure(vcodeRaw);

    // --- Build payment URL ---
    const baseUrl = FIUU_ENV === 'production'
        ? `https://pay.merchant.razer.com/MOLPay/pay/${MERCHANT_ID}/`
        : `https://sandbox.merchant.razer.com/MOLPay/pay/${MERCHANT_ID}/`;

    // --- Build description ---
    const billDesc = body.bill_desc || '';

    // --- Log order info to server ---
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║           OGSM CHECKOUT ORDER CREATED               ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║ Order ID:     ', orderid);
    console.log('║ Amount:        RM', amountStr);
    console.log('║ Bill Name:    ', body.bill_name || '(not provided)');
    console.log('║ Bill Email:   ', body.bill_email || '(not provided)');
    console.log('║ Bill Mobile:  ', body.bill_mobile || '(not provided)');
    console.log('║ Description:  ', billDesc);
    console.log('║ Pax:          ', body.pax || 1);
    console.log('║ Environment:  ', FIUU_ENV);
    console.log('║ Timestamp:    ', new Date().toISOString());
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');

    // --- Save form data to pending_orders sheet (must await to prevent Netlify from killing the request) ---
    if (SHEET_WEBHOOK) {
        try {
            await fetch(SHEET_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save_pending',
                    orderid: orderid,
                    bill_name: body.bill_name || '',
                    bill_email: body.bill_email || '',
                    bill_mobile: body.bill_mobile || '',
                    company: body.company || '',
                    position: body.position || '',
                    pax: body.pax || 1,
                    amount: amountStr,
                    bill_desc: billDesc,
                    diagnosis: body.diagnosis || '',
                }),
            });
            console.log('✅ Pending order saved to sheet:', orderid);
        } catch (err) {
            console.error('❌ Failed to save pending order:', err);
        }
    }

    // --- Derive base URL from request for callback/return URLs ---
    const requestUrl = new URL(request.url);
    const origin = requestUrl.origin;

    // --- Return signed payment parameters ---
    const paymentParams = {
        merchant_id: MERCHANT_ID,
        amount: amountStr,
        orderid: orderid,
        bill_name: body.bill_name || '',
        bill_email: body.bill_email || '',
        bill_mobile: body.bill_mobile || '',
        bill_desc: billDesc,
        vcode: vcode,
        currency: 'MYR',
        channel: '',
        returnurl: `${origin}/ogsm/`,
        callbackurl: `${origin}/.netlify/functions/payment-callback`,
        payment_url: baseUrl,
        environment: FIUU_ENV,
    };

    return new Response(JSON.stringify(paymentParams), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

// --- Pure JS MD5 implementation (no external deps needed) ---
function md5Pure(string: string): string {
    function md5cycle(x: number[], k: number[]) {
        let a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function md51(s: string) {
        const n = s.length;
        const state = [1732584193, -271733879, -1732584194, 271733878];
        let i;
        for (i = 64; i <= s.length; i += 64) { md5cycle(state, md5blk(s.substring(i - 64, i))); }
        s = s.substring(i - 64);
        const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) { md5cycle(state, tail); for (let j = 0; j < 16; j++) tail[j] = 0; }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }
    function md5blk(s: string) {
        const md5blks: number[] = [];
        for (let i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }
    const hex_chr = '0123456789abcdef'.split('');
    function rhex(n: number) {
        let s = '';
        for (let j = 0; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }
    function hex(x: number[]) { return x.map(rhex).join(''); }
    function add32(a: number, b: number) { return (a + b) & 0xFFFFFFFF; }
    return hex(md51(string));
}
