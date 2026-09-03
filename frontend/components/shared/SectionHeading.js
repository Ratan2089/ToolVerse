import Badge from '@/components/ui/Badge';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
  className = '',
}) {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}>
      {badge && (
        <div className="mb-3">
          <Badge variant="brand">{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
