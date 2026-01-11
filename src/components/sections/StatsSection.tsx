import { forwardRef } from 'react';
import Icon from '@/components/ui/icon';

interface StatsSectionProps {
  stats: { clients: number; amount: number; approvals: number };
}

const StatsSection = forwardRef<HTMLDivElement, StatsSectionProps>(({ stats }, ref) => {
  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-accent/10 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Users" className="text-accent mr-2" size={32} />
              <div className="text-5xl font-bold text-foreground">{stats.clients}+</div>
            </div>
            <p className="text-muted-foreground text-lg">Довольных клиентов</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="DollarSign" className="text-accent mr-2" size={32} />
              <div className="text-5xl font-bold text-foreground">{stats.amount} млрд ₽</div>
            </div>
            <p className="text-muted-foreground text-lg">Выдано финансирования</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="CheckCircle" className="text-accent mr-2" size={32} />
              <div className="text-5xl font-bold text-foreground">{stats.approvals}%</div>
            </div>
            <p className="text-muted-foreground text-lg">Одобрение заявок</p>
          </div>
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;
