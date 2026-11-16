import type { APIRoute } from 'astro';
import { contactFormSchema } from '@/lib/validation';
import { sendLeadNotification } from '@/lib/email';
import { verifyTurnstile } from '@/lib/turnstile';
import { hashIp, checkRateLimit } from '@/lib/ratelimit';
import { drizzle } from 'drizzle-orm/d1';
import { leads } from '@/db/schema';

export const prerender = false;

async function getEnvironment(): Promise<{
  env: Record<string, string | undefined>;
  db?: any;
}> {
  let cfEnv: Record<string, any> = {};
  try {
    // Modern Cloudflare Workers API in Astro v6/v7
    const cloudflareWorkers = await import('cloudflare:workers');
    if (cloudflareWorkers && cloudflareWorkers.env) {
      cfEnv = cloudflareWorkers.env;
    }
  } catch {
    // In local dev without cloudflare:workers mock
  }

  const merged = {
    ...process.env,
    ...cfEnv,
  };

  return {
    env: merged,
    db: cfEnv.DB,
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Content-Type and size check
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Expected application/json', code: 'INVALID_CONTENT_TYPE' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contentLength = Number(request.headers.get('content-length') || '0');
    if (contentLength > 10 * 1024) {
      return new Response(JSON.stringify({ error: 'Payload exceeds 10KB limit', code: 'PAYLOAD_TOO_LARGE' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Origin validation
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return new Response(JSON.stringify({ error: 'Cross-origin request rejected', code: 'CORS_REJECTED' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await request.json();

    // 2. Schema Validation
    const parsed = contactFormSchema.safeParse(rawBody);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Validation failed', code: 'VALIDATION_ERROR', details: parsed.error.issues }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = parsed.data;

    // 3. Honeypot check (Silent discard)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.info('[Honeypot Triggered] Silent discarding bot submission');
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. IP Extraction and Rate Limiting
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const ipHashed = await hashIp(clientIp);
    const rateCheck = checkRateLimit(ipHashed);
    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '600' },
      });
    }

    // 5. Environment & Turnstile Verification
    const { env, db: runtimeDb } = await getEnvironment();
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    const isBotChallengeValid = await verifyTurnstile(data.turnstileToken, turnstileSecret, clientIp);
    if (!isBotChallengeValid) {
      return new Response(JSON.stringify({ error: 'Bot verification failed. Please refresh and retry.', code: 'BOT_CHALLENGE_FAILED' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 6. Database Storage in D1
    const leadId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const userAgent = (request.headers.get('user-agent') || '').slice(0, 250);

    if (runtimeDb) {
      const db = drizzle(runtimeDb);
      await db.insert(leads).values({
        id: leadId,
        createdAt,
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        budget: data.budget || null,
        message: data.message || null,
        siteUrl: data.siteUrl || null,
        consentAt: createdAt,
        ipHash: ipHashed,
        userAgent,
        status: 'new',
      });
    } else {
      console.info('[D1 Local Simulation] Database binding active in local simulation mode:', {
        id: leadId,
        type: data.type,
        name: data.name,
        createdAt,
      });
    }

    // 7. Dispatch Email Notification
    const resendApiKey = env.RESEND_API_KEY;
    const ownerEmail = env.OWNER_NOTIFICATION_EMAIL;
    await sendLeadNotification(
      {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        budget: data.budget,
        message: data.message,
        siteUrl: data.siteUrl,
      },
      resendApiKey,
      ownerEmail
    );

    // 8. Minimal Secure Response
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API Contact Error] Exception details:', err);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred. Please contact us via WhatsApp.', code: 'INTERNAL_ERROR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
