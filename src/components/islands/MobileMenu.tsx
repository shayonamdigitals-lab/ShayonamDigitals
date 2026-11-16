import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: readonly NavLink[] | NavLink[];
  phoneDisplay: string;
  phoneTel: string;
  whatsappUrl: string;
}

export default function MobileMenu({
  navLinks,
  phoneDisplay,
  phoneTel,
  whatsappUrl,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="p-2.5 rounded-lg border border-[var(--border-light)] text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] focus-visible:outline-2 focus-visible:outline-[var(--amber)] transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] z-50 bg-[var(--paper)] flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-xl font-medium text-[var(--ink)] hover:bg-[var(--surface)] rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[var(--ink-muted)]" />
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center py-3.5 px-6 rounded-lg bg-[var(--amber)] text-[var(--ink)] font-semibold text-lg hover:bg-[var(--amber-hover)] transition-colors shadow-sm"
            >
              Get a Free Quote
            </a>
          </nav>

          <div className="mt-8 pt-6 border-t border-[var(--border-light)] space-y-4">
            <p className="text-xs uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
              Direct Contact
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-[var(--surface)] text-[var(--ink)] font-medium text-sm hover:bg-[var(--surface-alt)] transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--amber-text)]" />
                <span>Call Us</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-[var(--surface)] text-[var(--ink)] font-medium text-sm hover:bg-[var(--surface-alt)] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="text-xs text-[var(--ink-subtle)] text-center">
              Office: Bhavnagar, Gujarat, India
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
