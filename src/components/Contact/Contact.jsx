import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCircleCheck, FaArrowRight } from "react-icons/fa6";
import SocialLinks from "../SocialLinks/SocialLinks";

const CONTACT_EMAIL = "zh9193692@gmail.com";

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);

  // mailto: only does something visible if the device has a default mail
  // app configured — on a lot of dev machines/browsers nothing happens at
  // all. So on click we also copy the address to the clipboard and show a
  // quick "Copied" confirmation, in addition to letting the mailto:
  // attempt proceed normally for anyone who does have a mail client set up.
  useEffect(() => {
    if (!emailCopied) return;
    const timer = setTimeout(() => setEmailCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [emailCopied]);

  const handleEmailClick = () => {
    navigator.clipboard
      ?.writeText(CONTACT_EMAIL)
      .then(() => setEmailCopied(true))
      .catch(() => {});
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center">
          <span className="eyebrow justify-center">06. contact</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Let's Build <span className="grad-text">Something</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--color-muted)]">
            Have a project in mind, or just want to say hi? Tap below and it'll open straight in your email app.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-10 max-w-md"
        >
          <motion.a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={handleEmailClick}
            data-cursor-hover
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="glass grad-border group flex items-center gap-5 rounded-2xl p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/25 to-[var(--color-secondary)]/25 text-[var(--color-secondary)]">
              <FaEnvelope size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="font-mono text-[11px] text-[var(--color-muted)]">Email me at</p>
              <p className="truncate font-display text-base font-semibold text-white">{CONTACT_EMAIL}</p>
            </div>
            {emailCopied ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-[var(--color-accent)]">
                <FaCircleCheck size={14} aria-hidden="true" /> Copied
              </span>
            ) : (
              <FaArrowRight size={16} aria-hidden="true" className="shrink-0 text-[var(--color-muted)] transition-transform group-hover:translate-x-1 group-hover:text-white" />
            )}
          </motion.a>

          <p className="mt-3 text-center font-mono text-[11px] text-[var(--color-muted)]">Tapping this also copies the address to your clipboard, just in case.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <SocialLinks variant="row" />
        </motion.div>
      </div>
    </section>
  );
}
