import {
  FaLaptopCode,
  FaServer,
  FaPlug,
  FaDatabase,
  FaMobileScreen,
  FaGaugeHigh,
} from 'react-icons/fa6';

const services = [
  {
    id: 'srv-01',
    title: {
      en: 'Frontend Development',
      ar: 'تطوير الواجهة الأمامية',
    },
    description: {
      en: 'Building fast, accessible interfaces with React and Tailwind CSS that feel great on every screen size.',
      ar: 'بناء واجهات سريعة وسهلة الوصول باستخدام React وTailwind CSS لتبدو ممتازة على جميع أحجام الشاشات.',
    },
    icon: FaLaptopCode,
  },
  {
    id: 'srv-02',
    title: {
      en: 'Backend Development',
      ar: 'تطوير الخادم',
    },
    description: {
      en: 'Designing reliable Node.js and Express services with clean architecture that scale with your product.',
      ar: 'تصميم خدمات Node.js وExpress موثوقة مع بنية نظيفة قابلة للتوسع مع منتجك.',
    },
    icon: FaServer,
  },
  {
    id: 'srv-03',
    title: {
      en: 'REST API Development',
      ar: 'تطوير واجهات REST API',
    },
    description: {
      en: 'Building secure, well-documented REST APIs with authentication, validation, and clear error handling.',
      ar: 'بناء واجهات REST آمنة وموثقة بشكل جيد مع المصادقة والتحقق ومعالجة الأخطاء الواضحة.',
    },
    icon: FaPlug,
  },
  {
    id: 'srv-04',
    title: {
      en: 'Database Design',
      ar: 'تصميم قواعد البيانات',
    },
    description: {
      en: 'Modeling MongoDB schemas with Mongoose that stay consistent, indexed, and easy to query as data grows.',
      ar: 'تصميم مخططات MongoDB عبر Mongoose لتبقى متسقة ومفهرسة وسهلة الاستعلام مع نمو البيانات.',
    },
    icon: FaDatabase,
  },
  {
    id: 'srv-05',
    title: {
      en: 'Responsive Websites',
      ar: 'مواقع متجاوبة',
    },
    description: {
      en: 'Crafting layouts that adapt smoothly from mobile to ultra-wide, with no compromise on polish.',
      ar: 'تصميم تخطيطات تتكيف بسلاسة من الهاتف إلى الشاشات الواسعة مع الحفاظ على المستوى العالي.',
    },
    icon: FaMobileScreen,
  },
  {
    id: 'srv-06',
    title: {
      en: 'Performance Optimization',
      ar: 'تحسين الأداء',
    },
    description: {
      en: 'Auditing load times, lazy-loading assets, and trimming bundle size so apps feel instant.',
      ar: 'مراجعة أوقات التحميل وتحميل الموارد بشكل متأخر وتقليل حجم الحزم لتشعر التطبيقات بأنها فورية.',
    },
    icon: FaGaugeHigh,
  },
];

export default services;
