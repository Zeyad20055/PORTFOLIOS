import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaArrowRight, FaCircleCheck, FaEnvelope, FaPaperPlane } from 'react-icons/fa6';
import socialLinks from '../../data/socialLinks';
import { useLanguage } from '../../context/useLanguage';

const CONTACT_EMAIL = 'zh9193692@gmail.com';

function ContactLink({ label, href, icon: Icon, onClick, isArabic }) {
  const isExternal = href.startsWith('http');

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2 }}
      className="card-glow group flex min-w-0 items-center gap-3 rounded-xl p-4 focus-visible:outline"
    >
      <motion.span
        whileHover={{ scale: 1.06, y: -1 }}
        transition={{ duration: 0.16 }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-soft-accent)] text-[var(--color-primary)]"
      >
        <Icon size={17} aria-hidden="true" />
      </motion.span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text)]">{label}</span>
      <motion.span
        aria-hidden="true"
        className="inline-flex shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-primary)]"
        whileHover={{ x: isArabic ? -2 : 2 }}
        transition={{ duration: 0.16 }}
      >
        <FaArrowRight
          size={12}
          style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }}
        />
      </motion.span>
    </motion.a>
  );
}

export default function Contact() {
  const { t, isArabic } = useLanguage();
  const [emailCopied, setEmailCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    if (!emailCopied) return undefined;
    const timer = setTimeout(() => setEmailCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [emailCopied]);

  const handleEmailClick = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable.');
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    if (formStatus !== 'sending') setFormStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus('validation');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setFormStatus('configuration');
      return;
    }

    setFormStatus('sending');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: name, reply_to: email, subject, message },
        { publicKey },
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormStatus('sent');
    } catch (error) {
      console.error('EmailJS could not send the contact message.', error);
      setFormStatus('error');
    }
  };

  const availableSocialLinks = socialLinks.filter(
    ({ id }) => ['github', 'linkedin', 'tiktok', 'telegram'].includes(id),
  );

  return (
    <section id="contact" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">{t.contact.intro}</p>
        </motion.div>

        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={formStatus === 'sending'}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.35 }}
            className="glass grid gap-5 rounded-2xl p-5 sm:grid-cols-2 sm:p-7"
          >
            <label className="grid gap-2 text-sm font-medium text-[var(--color-text)]">
              {t.contact.name}
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
                className="min-h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-text)]">
              {t.contact.emailLabel}
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.emailPlaceholder}
                className="min-h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-text)] sm:col-span-2">
              {t.contact.subject}
              <input
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder={t.contact.subjectPlaceholder}
                className="min-h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-text)] sm:col-span-2">
              {t.contact.message}
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
                className="resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg btn-gradient px-5 py-2.5 font-medium"
              >
                <motion.span
                  aria-hidden="true"
                  className="inline-flex"
                  whileHover={{ x: isArabic ? -2 : 2 }}
                  transition={{ duration: 0.16 }}
                >
                  <FaPaperPlane size={13} />
                </motion.span>
                {formStatus === 'sending' ? t.contact.sending : t.contact.send}
              </button>
              {formStatus !== 'idle' && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${formStatus === 'sent' ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}`}
                >
                  {formStatus === 'sent' && t.contact.sent}
                  {formStatus === 'error' && t.contact.sendError}
                  {formStatus === 'configuration' && t.contact.configurationError}
                  {formStatus === 'validation' && t.contact.validationError}
                </p>
              )}
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="grid gap-3"
          >
            <h3 className="mb-1 font-display text-lg font-semibold text-white">{t.contact.contactLinks}</h3>
            <ContactLink
              label={emailCopied ? t.contact.copied : copyFailed ? t.contact.copyFailed : CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
              icon={emailCopied ? FaCircleCheck : FaEnvelope}
              onClick={handleEmailClick}
              isArabic={isArabic}
            />
            {availableSocialLinks.map(({ id, label, href, icon: Icon }) => (
              <ContactLink key={id} label={label} href={href} icon={Icon} isArabic={isArabic} />
            ))}
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{t.contact.note}</p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
