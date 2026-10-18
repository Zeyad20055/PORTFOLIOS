import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowUpRightFromSquare,
  FaBookOpen,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaFolderOpen,
  FaGraduationCap,
  FaGlobe,
  FaLaptopCode,
  FaRotateRight,
  FaServer,
  FaStar,
  FaStore,
} from 'react-icons/fa6';
import fallbackProjects from '../../data/projects';
import { useLanguage } from '../../context/useLanguage';

const GITHUB_USERNAME = 'Zeyad20055';
const GITHUB_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const GITHUB_CACHE_KEY = 'portfolio-github-projects-v2';
const CACHE_TTL = 1000 * 60 * 60 * 12;
const CATEGORY_ICONS = {
  bookstore: FaBookOpen,
  store: FaStore,
  dashboard: FaChartLine,
  backend: FaServer,
  database: FaDatabase,
  education: FaGraduationCap,
  portfolio: FaLaptopCode,
  website: FaGlobe,
  code: FaCode,
  other: FaFolderOpen,
};
let inFlightRepositoriesRequest = null;

function isHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function getCategory(project) {
  const identity = `${project.title} ${project.description} ${(project.topics || []).join(' ')}`.toLowerCase();
  if (/bookstore|book-shop|library|books/.test(identity)) return 'bookstore';
  if (/education|learning|course|school|e-learning|lms/.test(identity)) return 'education';
  if (/portfolio|personal-site|developer-portfolio/.test(identity)) return 'portfolio';
  if (/dashboard|analytics|admin|chart/.test(identity)) return 'dashboard';
  if (/database|mongo|sql|data-model/.test(identity)) return 'database';
  if (/api|backend|server|node/.test(identity)) return 'backend';
  if (/store|shop|commerce|market|coffee|e-commerce/.test(identity)) return 'store';
  if (/website|portfolio|landing|frontend|react|html/.test(identity)) return 'website';
  if (project.language) return 'code';
  return 'other';
}

function normalizeRepository(repository) {
  const name = repository?.name ?? repository?.title;
  const githubUrl = repository?.html_url ?? repository?.github;
  const stars = repository?.stargazers_count ?? repository?.stars;
  const updatedAt = repository?.updated_at ?? repository?.updatedAt;
  if (typeof name !== 'string' || !name || !isHttpUrl(githubUrl)) return null;

  const normalized = {
    id: repository.id ?? githubUrl,
    title: name,
    description: typeof repository.description === 'string' ? repository.description : '',
    language: typeof repository.language === 'string' ? repository.language : '',
    topics: Array.isArray(repository.topics)
      ? repository.topics.filter((topic) => typeof topic === 'string').slice(0, 4)
      : [],
    github: githubUrl,
    homepage: isHttpUrl(repository.homepage) ? repository.homepage.trim() : '',
    stars: Number.isFinite(stars) ? stars : 0,
    updatedAt: typeof updatedAt === 'string' ? updatedAt : '',
  };
  return { ...normalized, category: getCategory(normalized) };
}

function dedupeProjects(projects) {
  const seen = new Set();
  return projects.filter((project) => {
    const key = project.github.toLowerCase().replace(/\/$/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatDate(value, language) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar' : 'en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function fetchGithubRepositories() {
  if (!inFlightRepositoriesRequest) {
    inFlightRepositoriesRequest = (async () => {
      const response = await fetch(GITHUB_URL, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) {
        const error = new Error(`GitHub API request failed with status ${response.status}.`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('GitHub returned an unexpected repository response.');
      }

      return dedupeProjects(
        data
          .filter((repository) => !repository.fork && !repository.archived && repository.size > 0)
          .map(normalizeRepository)
          .filter(Boolean),
      ).sort((a, b) => b.stars - a.stars || Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    })().finally(() => {
      inFlightRepositoriesRequest = null;
    });
  }

  return inFlightRepositoriesRequest;
}

function ProjectSkeleton() {
  return (
    <div aria-hidden="true" className="card-glow overflow-hidden rounded-2xl">
      <div className="project-art animate-pulse" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-border)]" />
        <div className="h-3 w-full animate-pulse rounded bg-[var(--color-border)]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[var(--color-border)]" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, language, translations }) {
  const CategoryIcon = CATEGORY_ICONS[project.category] || CATEGORY_ICONS.other;
  const destination = project.homepage || project.github;
  const destinationLabel = project.homepage
    ? translations.projects.openDemo
    : translations.projects.openRepository;
  const techTags = [...new Set([project.language, ...project.topics].filter(Boolean))].slice(0, 4);

  return (
    <motion.a
      href={destination}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${destinationLabel}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.2, delay: (index % 3) * 0.035 }}
      className="project-card card-glow group flex h-full min-h-[25rem] flex-col overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
    >
      <div
        role="img"
        aria-label={translations.projects.previewAlt[project.category] || translations.projects.previewAlt.other}
        className={`project-art project-art--${project.category}`}
      >
        <div className="project-art-window" aria-hidden="true">
          <div className="project-art-toolbar">
            <span />
            <span />
            <span />
          </div>
          <div className="project-art-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.24 }}
              className="project-art-symbol"
            >
              <CategoryIcon className="project-art-icon" />
            </motion.div>
            <div className="project-art-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="project-art-panels"><span /><span /><span /></div>
          </div>
        </div>
        <span className="absolute bottom-3 start-4 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          {translations.projects.categories[project.category] || translations.projects.categories.other}
        </span>
        <span className="absolute end-4 top-3 z-10 inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-muted)]">
          {project.homepage ? translations.projects.liveDemo : translations.projects.github}
          <motion.span
            aria-hidden="true"
            className="inline-flex"
            whileHover={{ x: 2, y: -2 }}
            transition={{ duration: 0.16 }}
          >
            <FaArrowUpRightFromSquare />
          </motion.span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="break-words font-display text-lg font-semibold text-white group-hover:text-[var(--color-primary)]">
            {project.title}
          </h3>
          {project.stars !== null && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-xs text-[var(--color-primary)]">
              <FaStar size={11} aria-hidden="true" /> {project.stars}
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.description || translations.common.noDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-[var(--color-muted)]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-[var(--color-muted)]">
          <span>{project.updatedAt ? `${translations.projects.updated} ${formatDate(project.updatedAt, language)}` : destinationLabel}</span>
          <motion.span
            aria-hidden="true"
            className="inline-flex shrink-0 text-[var(--color-primary)]"
            whileHover={{ x: 2, y: -2 }}
            transition={{ duration: 0.16 }}
          >
            <FaArrowUpRightFromSquare />
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [githubProjects, setGithubProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorKind, setErrorKind] = useState('');
  const [cachedAt, setCachedAt] = useState(0);
  const [activeCategory, setActiveCategory] = useState('');

  const refreshProjects = useCallback(async (forceRefresh = false) => {
    if (typeof window === 'undefined') return;

    let cachedValue = null;
    try {
      cachedValue = window.localStorage.getItem(GITHUB_CACHE_KEY);
    } catch (error) {
      console.warn('Unable to read the GitHub project cache.', error);
    }

    if (cachedValue) {
      try {
        const parsed = JSON.parse(cachedValue);
        if (Number.isFinite(parsed.cachedAt) && Array.isArray(parsed.projects)) {
          const projects = dedupeProjects(parsed.projects.map(normalizeRepository).filter(Boolean));
          setGithubProjects(projects);
          setCachedAt(parsed.cachedAt);
          if (!forceRefresh && Date.now() - parsed.cachedAt < CACHE_TTL) {
            setStatus('success');
            setErrorKind('');
            return;
          }
        }
      } catch (error) {
        console.warn('The saved GitHub project cache is invalid.', error);
        try {
          window.localStorage.removeItem(GITHUB_CACHE_KEY);
        } catch (removeError) {
          console.warn('Unable to remove the invalid GitHub project cache.', removeError);
        }
      }
    }

    setStatus('loading');
    setErrorKind('');

    try {
      const repositories = await fetchGithubRepositories();
      const syncedAt = Date.now();
      setGithubProjects(repositories);
      setCachedAt(syncedAt);
      setStatus('success');
      setErrorKind('');

      try {
        window.localStorage.setItem(
          GITHUB_CACHE_KEY,
          JSON.stringify({ cachedAt: syncedAt, projects: repositories }),
        );
      } catch (error) {
        console.warn('Unable to save the GitHub project cache.', error);
      }
    } catch (error) {
      console.error('Unable to load public GitHub repositories.', error);
      setStatus('error');
      setErrorKind(error.status === 403 || error.status === 429 ? 'rateLimit' : 'error');
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => refreshProjects(), 0);
    return () => window.clearTimeout(timer);
  }, [refreshProjects]);

  const usingFallback = githubProjects.length === 0;
  const projectList = useMemo(() => {
    if (!usingFallback) return githubProjects;
    return dedupeProjects(
      fallbackProjects.map((project) => ({
        ...normalizeRepository(project),
        description: '',
        language: '',
        topics: [],
        homepage: '',
        stars: null,
        updatedAt: '',
      })),
    );
  }, [githubProjects, usingFallback]);

  const categories = useMemo(
    () => [t.projects.filterAll, ...new Set(projectList.map((project) => project.category))],
    [projectList, t.projects.filterAll],
  );

  useEffect(() => {
    setActiveCategory(t.projects.filterAll);
  }, [t.projects.filterAll]);

  const activeFilter = activeCategory || t.projects.filterAll;
  const filteredProjects = activeFilter === t.projects.filterAll
    ? projectList
    : projectList.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="section-pad relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="eyebrow">{t.projects.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.projects.title}</h2>
            {usingFallback && status !== 'loading' && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">{t.projects.fallbackTitle}</p>
            )}
            {cachedAt > 0 && !usingFallback && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {t.projects.lastSynced}: {formatDate(new Date(cachedAt).toISOString(), language)}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeFilter === category}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                  activeFilter === category
                    ? 'border-[var(--color-primary)] bg-[var(--color-soft-accent)] text-[var(--color-primary)]'
                    : 'border-white/10 text-[var(--color-muted)] hover:border-[var(--color-primary)]'
                }`}
              >
                {category === t.projects.filterAll
                  ? category
                  : t.projects.categories[category] || t.projects.categories.other}
              </button>
            ))}
            <button
              type="button"
              onClick={() => refreshProjects(true)}
              disabled={status === 'loading'}
              aria-label={t.projects.refresh}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <FaRotateRight className={status === 'loading' ? 'animate-spin' : ''} aria-hidden="true" />
              <span>{status === 'loading' ? t.projects.refreshing : t.projects.refresh}</span>
            </button>
          </div>
        </motion.div>

        {status === 'loading' && githubProjects.length === 0 && (
          <div role="status" aria-live="polite" className="mt-8">
            <p className="sr-only">{t.projects.loading}</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => <ProjectSkeleton key={index} />)}
            </div>
          </div>
        )}

        {status === 'error' && (
          <p role="status" className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-muted)]">
            {errorKind === 'rateLimit' ? t.projects.rateLimit : t.projects.error}
            {usingFallback && ` ${t.projects.fallback}`}
          </p>
        )}

        {status !== 'loading' && filteredProjects.length === 0 && (
          <p role="status" className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-6 text-center text-sm text-[var(--color-muted)]">
            {t.projects.empty}
          </p>
        )}

        {status !== 'loading' && filteredProjects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                language={language}
                translations={t}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
