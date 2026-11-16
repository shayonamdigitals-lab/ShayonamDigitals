/**
 * Shayonam Digital - Site Configuration
 * Single source of truth for business facts, contact details, navigation, and feature flags.
 */

export const siteConfig = {
  name: 'Shayonam Digital',
  tagline: 'Digital Agency in Bhavnagar, Gujarat',
  url: 'https://shayonamdigitals.com',
  description: 'Fast, reliable websites and web applications for businesses in Gujarat and across India. Designed and built in Bhavnagar with direct communication.',
  
  // Note on dual numbers:
  // Call line and WhatsApp use different numbers as provided in business requirements.
  contact: {
    email: 'shayonamdigitals@gmail.com',
    location: 'Bhavnagar, Gujarat, India',
    // Voice call line
    phoneDisplay: '+91 87587 31449',
    phoneTel: '+918758731449',
    // WhatsApp line (built without spaces or + in query path)
    whatsappDisplay: '+91 98791 81464',
    whatsappUrl: 'https://wa.me/919879181464?text=Hello%20Shayonam%20Digital%2C%20I%20would%20like%20to%20discuss%20a%20project',
  },

  // Navigation Links
  navLinks: [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Core Services
  services: [
    {
      slug: 'website-design',
      title: 'Website Design & Development',
      shortTitle: 'Web Design',
      outcome: 'Fast, mobile-ready business websites that turn local visitors into paying customers.',
      path: '/services/website-design',
      icon: 'Layout',
      deliverables: [
        'Custom design tailored to your brand colors and identity',
        'Optimized for 360px mobile screens and high-speed loading on 4G',
        'Direct WhatsApp click-to-chat integration for fast customer contact',
        'Google Business Profile integration and local SEO schema',
        'Fast hosting setup and custom domain configuration',
      ],
      forWhom: 'Retail stores, clinics, manufacturers, traders, and local service providers needing a modern web presence.',
    },
    {
      slug: 'web-apps',
      title: 'Web Applications',
      shortTitle: 'Web Apps',
      outcome: 'Custom tools, client portals, billing dashboards, and ordering systems.',
      path: '/services/web-apps',
      icon: 'Cpu',
      deliverables: [
        'Secure, role-based dashboards and user authentication',
        'Custom business workflows, quotation tools, and booking flows',
        'Cloud database integration with automated backups',
        'Responsive interfaces that work on staff phones and desktop tablets',
        'Zero recurring per-user software license fees',
      ],
      forWhom: 'Growing businesses needing tailored software to manage inventory, clients, or orders without expensive SaaS lock-in.',
    },
    {
      slug: 'social-media',
      title: 'Social Media Handling',
      shortTitle: 'Social Media',
      outcome: 'Monthly management, clean branded graphics, and local outreach.',
      path: '/services/social-media',
      icon: 'Share2',
      deliverables: [
        'Consistent monthly content calendar aligned with festivals and business promotions',
        'Custom graphic design matching your official brand aesthetics',
        'Google Business Profile updates, photo uploads, and review management',
        'Audience inquiry routing directly to your WhatsApp business account',
        'Monthly transparent report on views, engagement, and reach',
      ],
      forWhom: 'Business owners who want active social media presence and Google maps visibility without spending hours creating posts.',
    },
    {
      slug: 'website-redesign',
      title: 'Website Redesign',
      shortTitle: 'Redesign',
      outcome: 'Modernize slow, outdated websites for higher speed, better mobile layout, and more leads.',
      path: '/services/website-redesign',
      icon: 'RefreshCw',
      deliverables: [
        'Complete visual overhaul while preserving existing domain authority and URLs',
        'Speed optimization aiming for 95+ mobile Lighthouse scores',
        'Removal of bloated plugins, security vulnerabilities, and slow page builders',
        'Streamlined mobile navigation and modernized contact touchpoints',
        'Zero downtime during domain migration and site switchover',
      ],
      forWhom: 'Companies whose existing website looks dated, loads slowly on smartphones, or fails to generate customer calls.',
    },
    {
      slug: 'care-plans',
      title: 'Website Care Plans',
      shortTitle: 'Care Plans',
      outcome: 'Ongoing hosting, security updates, daily backups, and quick content updates.',
      path: '/services/care-plans',
      icon: 'ShieldCheck',
      deliverables: [
        'High-performance cloud hosting with SSL and DDoS protection',
        'Automated daily backups and continuous uptime monitoring',
        'Monthly routine maintenance, security patching, and dependency updates',
        'Up to 2 hours of small content edits (menu changes, notices, phone updates) per month',
        'Direct priority WhatsApp support with the developer',
      ],
      forWhom: 'Busy owners who want total peace of mind that their digital storefront is secure, fast, and always online.',
    },
  ],

  // How We Work (Sequential Roadmap)
  processSteps: [
    {
      step: '01',
      title: 'Talk & Understand',
      desc: 'We speak directly via phone or WhatsApp to understand your business, customers, and what you need your site to achieve.',
    },
    {
      step: '02',
      title: 'Plan & Wireframe',
      desc: 'We map out the exact page structure, content flow, and calls-to-action so nothing is left to guesswork.',
    },
    {
      step: '03',
      title: 'Custom Design',
      desc: 'We create a clean, tailor-made visual layout built strictly around your brand colors, with zero generic template feel.',
    },
    {
      step: '04',
      title: 'High-Performance Build',
      desc: 'We build the website using modern web engineering for sub-second loading speeds on mobile networks.',
    },
    {
      step: '05',
      title: 'Rigorous Testing & Launch',
      desc: 'We test across Android, iPhone, and desktop browsers, verify form submissions, connect your domain, and go live.',
    },
    {
      step: '06',
      title: 'Support & Care',
      desc: 'We remain directly reachable for tweaks, hosting assistance, and future enhancements.',
    },
  ],

  // Why Shayonam Guarantees (Honest, verifiable facts)
  differentiators: [
    {
      title: 'Sub-Second Mobile Speed',
      desc: 'Engineered for 95+ mobile Lighthouse performance. Your site loads instantly even on standard mobile 4G connections.',
      badge: 'Speed',
    },
    {
      title: 'Direct Communication',
      desc: 'You speak directly with the engineers building your website. No account managers or delayed agency communication chains.',
      badge: 'Accountability',
    },
    {
      title: 'Bhavnagar-Based & Reachable',
      desc: 'Grounded locally in Bhavnagar, Gujarat. We understand the local market context and are always a phone call away.',
      badge: 'Local Presence',
    },
    {
      title: 'Clean Ownership, Zero Lock-In',
      desc: 'You own 100% of your domain, codebase, and assets. No proprietary site builder handcuffs or surprise annual ransom fees.',
      badge: 'Total Ownership',
    },
  ],

  // FAQ
  faqs: [
    {
      q: 'How long does it take to build a business website?',
      a: 'Most standard business websites are completed, tested, and launched within 7 to 14 working days, provided text and business details are ready.',
    },
    {
      q: 'What do you need from me to get started?',
      a: 'We need your logo, a brief description of your services or products, your contact numbers, and any preferred photos. If you do not have written copy, we help you structure it.',
    },
    {
      q: 'Who owns the website and domain once it is launched?',
      a: 'You do. You have 100% ownership of your domain name, code, images, and content. We never hold your digital assets hostage.',
    },
    {
      q: 'How do domain names and hosting work?',
      a: 'We can either assist you in purchasing your domain directly under your own account or connect our high-speed managed cloud hosting. We configure all DNS and security certificates for you.',
    },
    {
      q: 'What happens if I need changes after the website is live?',
      a: 'We provide post-launch support to resolve any questions. For ongoing updates and maintenance, we offer monthly Care Plans or simple hourly updates whenever you need them.',
    },
    {
      q: 'Do you work with clients outside Bhavnagar and Gujarat?',
      a: 'Yes. While we are proud to be based in Bhavnagar, we actively work with businesses across Gujarat (Ahmedabad, Surat, Rajkot, Vadodara) and pan-India via WhatsApp, Google Meet, and phone.',
    },
  ],

  // Feature Flags
  features: {
    freeAudit: true, // Enables the 2-day free website audit lead magnet
    showPricing: false, // Per 5.2/Approval: hidden until user sets real prices
    showWork: false, // Per 5.2: hidden until real client case studies exist
    showTestimonials: false, // Per 5.2: hidden until real reviews exist
  },
} as const;
