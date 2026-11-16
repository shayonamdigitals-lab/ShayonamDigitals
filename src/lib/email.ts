import { Resend } from 'resend';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface LeadEmailPayload {
  type: 'contact' | 'audit';
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  siteUrl?: string;
}

export async function sendLeadNotification(
  payload: LeadEmailPayload,
  apiKey?: string,
  recipientEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const targetEmail = recipientEmail || 'shayonamdigitals@gmail.com';

  if (!apiKey || apiKey.startsWith('re_your_')) {
    console.info('[Email] Resend API key not configured or using placeholder. Skipping live email dispatch.');
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);
    const isAudit = payload.type === 'audit';
    const subject = isAudit
      ? `[New Audit Request] ${escapeHtml(payload.name)} - ${escapeHtml(payload.siteUrl || '')}`
      : `[New Lead] ${escapeHtml(payload.name)} - ${escapeHtml(payload.service || 'General Inquiry')}`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #3A2C22; line-height: 1.6;">
        <h2 style="color: #2A201B; border-bottom: 2px solid #F5A03C; padding-bottom: 8px;">
          ${isAudit ? 'Free Website Audit Request' : 'New Website Project Lead'}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #A45806;">${escapeHtml(payload.email)}</a></td>
          </tr>
          ${payload.phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${escapeHtml(payload.phone)}" style="color: #A45806;">${escapeHtml(payload.phone)}</a></td>
          </tr>` : ''}
          ${payload.siteUrl ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Website URL:</td>
            <td style="padding: 8px 0;"><a href="${escapeHtml(payload.siteUrl)}" style="color: #A45806;">${escapeHtml(payload.siteUrl)}</a></td>
          </tr>` : ''}
          ${payload.service ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Service:</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.service)}</td>
          </tr>` : ''}
          ${payload.budget ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Budget Range:</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.budget)}</td>
          </tr>` : ''}
        </table>
        ${payload.message ? `
        <div style="margin-top: 20px; background-color: #F7F2EA; padding: 16px; border-radius: 8px; border-left: 4px solid #F5A03C;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap; margin-top: 8px;">${escapeHtml(payload.message)}</p>
        </div>` : ''}
        <p style="margin-top: 24px; font-size: 13px; color: #6B594D;">
          Sent from Shayonam Digital website lead capture system.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Shayonam Leads <onboarding@resend.dev>',
      to: [targetEmail],
      subject,
      html: htmlContent,
      replyTo: payload.email,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error during email dispatch';
    console.error('[Email Error] Failed to dispatch email alert:', errorMsg);
    // Don't fail the lead creation if email delivery hits an issue
    return { success: false, error: errorMsg };
  }
}
