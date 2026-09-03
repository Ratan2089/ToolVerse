import Card from '@/components/ui/Card';

export default function FeatureCard({ title, description, icon: Icon, color = 'text-brand-500' }) {
  return (
    <Card hoverEffect={false} className="h-full bg-slate-50/50 dark:bg-slate-900/50">
      <div className="flex flex-col items-start gap-3">
        <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}
