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
    title: 'Frontend Development',
    description:
      'Building fast, accessible interfaces with React and Tailwind CSS that feel great on every screen size.',
    icon: FaLaptopCode,
  },
  {
    id: 'srv-02',
    title: 'Backend Development',
    description:
      'Designing reliable Node.js and Express services with clean architecture that scale with your product.',
    icon: FaServer,
  },
  {
    id: 'srv-03',
    title: 'REST API Development',
    description:
      'Building secure, well-documented REST APIs with authentication, validation, and clear error handling.',
    icon: FaPlug,
  },
  {
    id: 'srv-04',
    title: 'Database Design',
    description:
      'Modeling MongoDB schemas with Mongoose that stay consistent, indexed, and easy to query as data grows.',
    icon: FaDatabase,
  },
  {
    id: 'srv-05',
    title: 'Responsive Websites',
    description:
      'Crafting layouts that adapt smoothly from mobile to ultra-wide, with no compromise on polish.',
    icon: FaMobileScreen,
  },
  {
    id: 'srv-06',
    title: 'Performance Optimization',
    description:
      'Auditing load times, lazy-loading assets, and trimming bundle size so apps feel instant.',
    icon: FaGaugeHigh,
  },
];

export default services;
