/**
 * Cloudflare Turnstile token validation helper
 */
export async function verifyTurnstile(
  token: string | undefined,
  secretKey: string | undefined,
  clientIp?: string
): Promise<boolean> {
  // If secret is unconfigured or placeholder, bypass for local dev
  if (!secretKey || secretKey.startsWith('0x4AAAAAAABBBBBBBB')) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = (await res.json()) as { success: boolean };
    return outcome.success === true;
  } catch (err) {
    console.error('[Turnstile Error] Validation request failed:', err);
    return false;
  }
}
