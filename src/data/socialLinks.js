import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaTiktok,
} from 'react-icons/fa';

// All social/contact links live here so the UI can render them dynamically
// instead of hardcoding anchors in multiple components.
// REPLACE the placeholder URLs below (marked TODO) with your real profile
// links before deploying — every entry is wired up and clickable already.
const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/zeyad20055",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zeyad-hamdy-1322632b1", // TODO: replace with your real LinkedIn URL
    icon: FaLinkedin,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@zeyadhamdy200?_r=1&_t=ZS-98AZHCrqOBN",
    icon: FaTiktok,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1C6KXLNj4e/", // TODO: replace with your real Facebook URL
    icon: FaFacebook,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/201004817363", // TODO: replace with your real WhatsApp number (country code + number, no +/spaces)
    icon: FaWhatsapp,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/zeyad236",
    icon: FaTelegram,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/zeyad_hamdy_7", // TODO: replace with your real Instagram URL
    icon: FaInstagram,
  },
{
  id: "email",
  label: "Email",
  href: "mailto:zh9193692@gmail.com",
  icon: FaEnvelope,
},
];

export default socialLinks;
