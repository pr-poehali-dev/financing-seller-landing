import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  timer: { hours: number; minutes: number; seconds: number };
  scrollToForm: () => void;
}

const HeroSection = ({ timer, scrollToForm }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
      {/* Marketplace logos background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img src="https://cdn.poehali.dev/projects/a75355f8-3aae-423d-8a7d-1f12f2402e75/files/a27c2159-8597-4de6-8e6c-00ffbfa301c4.jpg" alt="" className="absolute top-[10%] left-[5%] w-32 h-32 object-contain animate-float" />
        <img src="https://cdn.poehali.dev/projects/a75355f8-3aae-423d-8a7d-1f12f2402e75/files/fad50a35-57e8-47c5-8628-9fd75684a90c.jpg" alt="" className="absolute top-[60%] left-[15%] w-40 h-40 object-contain animate-float" style={{ animationDelay: '1s' }} />
        <img src="https://cdn.poehali.dev/projects/a75355f8-3aae-423d-8a7d-1f12f2402e75/files/76632e36-58cb-4960-85bf-d75a27b2266a.jpg" alt="" className="absolute top-[30%] right-[10%] w-36 h-36 object-contain animate-float" style={{ animationDelay: '2s' }} />
        <img src="https://cdn.poehali.dev/projects/a75355f8-3aae-423d-8a7d-1f12f2402e75/files/a27c2159-8597-4de6-8e6c-00ffbfa301c4.jpg" alt="" className="absolute bottom-[20%] right-[20%] w-28 h-28 object-contain animate-float" style={{ animationDelay: '0.5s' }} />
        <img src="https://cdn.poehali.dev/projects/a75355f8-3aae-423d-8a7d-1f12f2402e75/files/fad50a35-57e8-47c5-8628-9fd75684a90c.jpg" alt="" className="absolute top-[15%] right-[30%] w-32 h-32 object-contain animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Финансирование для селлеров маркетплейсов
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-medium">
            Получите оборотный капитал до 50 млн ₽ за 15 минут без залога и личных гарантий
          </p>
          
          {/* Timer */}
          <div className="bg-secondary/20 backdrop-blur-sm border-2 border-secondary rounded-2xl p-6 mb-8 max-w-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="text-secondary" size={24} />
                <span className="text-lg font-semibold text-primary-foreground">Специальное предложение истекает через:</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="text-center">
                <div className="bg-primary-foreground text-primary rounded-xl px-4 py-3 min-w-[70px] font-bold text-3xl">
                  {String(timer.hours).padStart(2, '0')}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-2">часов</div>
              </div>
              <div className="text-4xl font-bold text-primary-foreground flex items-center">:</div>
              <div className="text-center">
                <div className="bg-primary-foreground text-primary rounded-xl px-4 py-3 min-w-[70px] font-bold text-3xl">
                  {String(timer.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-2">минут</div>
              </div>
              <div className="text-4xl font-bold text-primary-foreground flex items-center">:</div>
              <div className="text-center">
                <div className="bg-primary-foreground text-primary rounded-xl px-4 py-3 min-w-[70px] font-bold text-3xl">
                  {String(timer.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-2">секунд</div>
              </div>
            </div>
            <p className="text-center text-primary-foreground/80 text-sm mt-4">
              Подайте заявку сейчас и получите ускоренное рассмотрение!
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Оставить заявку
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
