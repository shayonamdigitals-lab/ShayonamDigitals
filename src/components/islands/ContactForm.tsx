import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Loader2 } from 'lucide-react';
import { contactFormSchema } from '@/lib/validation';

interface ContactFormProps {
  initialType?: 'contact' | 'audit';
  defaultService?: string;
  whatsappUrl: string;
}

export default function ContactForm({
  initialType = 'contact',
  defaultService,
  whatsappUrl,
}: ContactFormProps) {
  const [formType, setFormType] = useState<'contact' | 'audit'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || 'website-design',
    budget: 'not-sure',
    message: '',
    siteUrl: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const payload = {
      ...formData,
      type: formType,
      consent: formData.consent,
    };

    const validation = contactFormSchema.safeParse(payload);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      const issues = validation.error.issues;
      for (const issue of issues) {
        const path = issue.path[0] as string;
        if (path && !formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const result = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit form. Please reach out via WhatsApp.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try WhatsApp.';
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-display text-[var(--ink)]">
          {formType === 'audit' ? 'Audit Request Received' : 'Message Sent Successfully'}
        </h3>
        <p className="text-[var(--ink-muted)] max-w-md mx-auto text-sm leading-relaxed">
          {formType === 'audit'
            ? 'Thank you! We will inspect your website speed, mobile responsiveness, and SEO, and email your 3-point report within 2 working days.'
            : 'Thank you! We have received your project details and will review them and reply within 1 working day.'}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: 'website-design',
                budget: 'not-sure',
                message: '',
                siteUrl: '',
                consent: false,
                honeypot: '',
              });
            }}
            className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] underline py-2 px-4"
          >
            Send another inquiry
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex items-center space-x-2 py-2 px-4 rounded-lg bg-[#25D366] text-white font-medium text-xs shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp now</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] p-6 md:p-8 shadow-xs">
      {/* Form Mode Switcher */}
      <div className="flex rounded-lg bg-[var(--surface-alt)] p-1 mb-6 border border-[var(--border-light)]" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={formType === 'contact'}
          onClick={() => {
            setFormType('contact');
            setErrors({});
          }}
          className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${
            formType === 'contact'
              ? 'bg-[var(--paper)] text-[var(--ink)] shadow-xs'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
          }`}
        >
          Project Quote
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={formType === 'audit'}
          onClick={() => {
            setFormType('audit');
            setErrors({});
          }}
          className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-md transition-all ${
            formType === 'audit'
              ? 'bg-[var(--paper)] text-[var(--ink)] shadow-xs'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
          }`}
        >
          Free Website Audit
        </button>
      </div>

      {apiError && (
        <div className="mb-6 p-4 rounded-lg bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-sm flex items-start space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{apiError}</p>
            <p className="mt-1 text-xs text-[#B71C1C]">
              You can also message us directly on WhatsApp at <a href={whatsappUrl} className="underline font-bold">+91 98791 81464</a>.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Hidden Honeypot Field */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="hp_field">Do not fill this</label>
          <input
            type="text"
            id="hp_field"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact_name" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Your Name <span className="text-[#C62828]">*</span>
            </label>
            <input
              type="text"
              id="contact_name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rajesh Shah"
              className={`w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] ${
                errors.name ? 'border-[#C62828] bg-[#FFF8F8]' : 'border-[var(--border-light)]'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-[#C62828]">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact_email" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Email Address <span className="text-[#C62828]">*</span>
            </label>
            <input
              type="email"
              id="contact_email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rajesh@example.com"
              className={`w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] ${
                errors.email ? 'border-[#C62828] bg-[#FFF8F8]' : 'border-[var(--border-light)]'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-[#C62828]">{errors.email}</p>}
          </div>
        </div>

        {/* Phone & (Service / Website URL) Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact_phone" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Phone / WhatsApp (Optional)
            </label>
            <input
              type="tel"
              id="contact_phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98791 81464"
              className={`w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] ${
                errors.phone ? 'border-[#C62828] bg-[#FFF8F8]' : 'border-[var(--border-light)]'
              }`}
            />
            {errors.phone && <p className="mt-1 text-xs text-[#C62828]">{errors.phone}</p>}
          </div>

          {formType === 'audit' ? (
            <div>
              <label htmlFor="contact_site_url" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
                Current Website URL <span className="text-[#C62828]">*</span>
              </label>
              <input
                type="url"
                id="contact_site_url"
                name="siteUrl"
                required
                value={formData.siteUrl}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className={`w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] ${
                  errors.siteUrl ? 'border-[#C62828] bg-[#FFF8F8]' : 'border-[var(--border-light)]'
                }`}
              />
              {errors.siteUrl && <p className="mt-1 text-xs text-[#C62828]">{errors.siteUrl}</p>}
            </div>
          ) : (
            <div>
              <label htmlFor="contact_service" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
                Service of Interest
              </label>
              <select
                id="contact_service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border border-[var(--border-light)] text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)]"
              >
                <option value="website-design">Website Design & Development</option>
                <option value="web-apps">Custom Web Applications</option>
                <option value="social-media">Social Media Handling</option>
                <option value="website-redesign">Website Redesign</option>
                <option value="care-plans">Website Care Plan</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>
          )}
        </div>

        {formType === 'contact' && (
          <div>
            <label htmlFor="contact_budget" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Estimated Budget (Optional)
            </label>
            <select
              id="contact_budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border border-[var(--border-light)] text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)]"
            >
              <option value="not-sure">Flexible / Not Sure Yet</option>
              <option value="under-25k">Under ₹25,000</option>
              <option value="25k-50k">₹25,000 - ₹50,000</option>
              <option value="50k-100k">₹50,000 - ₹1,00,000</option>
              <option value="100k-plus">₹1,00,000+</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="contact_message" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            {formType === 'audit' ? 'Specific Areas to Inspect (Optional)' : 'Tell us about your project'} {formType === 'contact' && <span className="text-[#C62828]">*</span>}
          </label>
          <textarea
            id="contact_message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              formType === 'audit'
                ? 'e.g. Please check why mobile loading takes 6 seconds on product pages...'
                : 'e.g. We run a surgical equipment business in Bhavnagar and need a clean catalog site with WhatsApp ordering...'
            }
            className={`w-full py-2.5 px-3.5 rounded-lg bg-[var(--paper)] border text-sm text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] ${
              errors.message ? 'border-[#C62828] bg-[#FFF8F8]' : 'border-[var(--border-light)]'
            }`}
          ></textarea>
          {errors.message && <p className="mt-1 text-xs text-[#C62828]">{errors.message}</p>}
        </div>

        {/* Privacy Policy Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded text-[var(--amber)] border-[var(--border-light)] focus:ring-[var(--amber)]"
            />
            <span className="text-xs text-[var(--ink-muted)] leading-relaxed">
              I agree to the <a href="/privacy" target="_blank" className="text-[var(--amber-text)] underline font-medium">Privacy Policy</a> and consent to Shayonam Digital contacting me regarding this inquiry.
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-xs text-[#C62828]">{errors.consent}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-tactile w-full py-3.5 px-6 rounded-lg bg-[var(--amber)] hover:bg-[var(--amber-hover)] text-[var(--ink)] font-bold text-sm flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Securely...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{formType === 'audit' ? 'Request Free 2-Day Audit' : 'Send Project Inquiry'}</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-[var(--ink-subtle)] text-center pt-1">
          {formType === 'audit' ? 'Reviewed and returned within 2 working days.' : 'We reply within 1 working day. Direct developer access.'}
        </p>
      </form>
    </div>
  );
}
