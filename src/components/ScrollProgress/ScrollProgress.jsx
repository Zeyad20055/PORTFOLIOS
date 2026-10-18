import { useLanguage } from '../../context/useLanguage';
import useScrollProgress from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const { t, isArabic } = useLanguage();
  const progress = useScrollProgress();

  return (
    <div className={`fixed ${isArabic ? 'right-0' : 'left-0'} top-0 z-[60] h-[3px] w-full bg-transparent`}>
      <div
        className="h-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-secondary)]"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label={t.common.scrollProgress}
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
