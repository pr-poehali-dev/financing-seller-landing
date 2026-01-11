import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ApplicationForm from '@/components/sections/ApplicationForm';

const Index = () => {
  const [stats, setStats] = useState({ clients: 0, amount: 0, approvals: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const [timer, setTimer] = useState({ hours: 2, minutes: 30, seconds: 0 });
  const [notification, setNotification] = useState<{ show: boolean; name: string; amount: string }>({ 
    show: false, 
    name: '', 
    amount: '' 
  });

  const notifications = [
    { name: 'ООО "ТекстильПро"', amount: '3 млн ₽', city: 'Москва' },
    { name: 'ИП Соколова А.В.', amount: '1.5 млн ₽', city: 'Санкт-Петербург' },
    { name: 'ООО "МаркетСтар"', amount: '5 млн ₽', city: 'Екатеринбург' },
    { name: 'ИП Морозов В.С.', amount: '2.8 млн ₽', city: 'Казань' },
    { name: 'ООО "ЭлектроТрейд"', amount: '4.2 млн ₽', city: 'Новосибирск' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 30;
          seconds = 0;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const showNotification = () => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      setNotification({ show: true, name: randomNotif.name, amount: randomNotif.amount });
      
      setTimeout(() => {
        setNotification({ show: false, name: '', amount: '' });
      }, 5000);
    };

    const initialDelay = setTimeout(() => {
      showNotification();
      const interval = setInterval(showNotification, 15000);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const targets = { clients: 450, amount: 2.5, approvals: 95 };
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        clients: Math.floor(targets.clients * progress),
        amount: parseFloat((targets.amount * progress).toFixed(1)),
        approvals: Math.floor(targets.approvals * progress)
      });

      if (step >= steps) {
        clearInterval(interval);
        setStats(targets);
      }
    }, duration / steps);
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Notification Popup */}
      {notification.show && (
        <div className="fixed bottom-8 left-8 z-50 animate-slide-in-left">
          <Card className="border-accent shadow-2xl max-w-sm bg-background/95 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="TrendingUp" size={16} className="text-accent" />
                    <span className="text-xs font-semibold text-accent">Заявка одобрена</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{notification.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Получил финансирование <span className="font-bold text-accent">{notification.amount}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    Только что
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <HeroSection timer={timer} scrollToForm={scrollToForm} />

      {/* Advantages Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Преимущества работы с нами
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Zap', title: 'Быстрое решение', desc: 'Одобрение и финансирование за 15 минут' },
              { icon: 'Shield', title: 'Без залога', desc: 'Не требуем залог имущества и личные гарантии' },
              { icon: 'TrendingUp', title: 'До 50 млн ₽', desc: 'Лимиты от 500 тыс до 50 млн рублей' },
              { icon: 'Percent', title: 'От 1.5% в месяц', desc: 'Прозрачные условия без скрытых комиссий' },
              { icon: 'Clock', title: 'Гибкий срок', desc: 'Финансирование от 3 до 12 месяцев' },
              { icon: 'CheckCircle2', title: 'Простое оформление', desc: 'Минимум документов, онлайн-процесс' }
            ].map((item, idx) => (
              <Card key={idx} className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <StatsSection ref={statsRef} stats={stats} />

      {/* Requirements Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Условия финансирования
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Четкие и понятные требования для получения финансирования
          </p>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {[
                    { label: 'Тип бизнеса', value: 'Юридические лица и ИП, работающие на маркетплейсах' },
                    { label: 'Минимальный оборот', value: 'От 100 000 рублей в месяц на маркетплейсах' },
                    { label: 'Срок работы', value: 'Не менее 3 месяцев на маркетплейсах' },
                    { label: 'Маркетплейсы', value: 'Wildberries, Ozon, Яндекс.Маркет, Мегамаркет' },
                    { label: 'Документы', value: 'ИНН' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 pb-6 border-b last:border-0 border-border">
                      <div className="md:w-1/3">
                        <div className="flex items-center gap-2">
                          <Icon name="CheckCircle" className="text-accent flex-shrink-0" size={20} />
                          <p className="font-semibold text-foreground">{item.label}</p>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Как получить финансирование
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Простой процесс из 4 шагов
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { num: '01', icon: 'FileText', title: 'Заполните заявку', desc: 'Оставьте заявку на сайте, укажите основную информацию о бизнесе' },
                { num: '02', icon: 'Search', title: 'Анализ данных', desc: 'Мы проанализируем ваши продажи за 15 минут' },
                { num: '03', icon: 'ClipboardCheck', title: 'Одобрение', desc: 'Получите решение и подпишите договор онлайн' },
                { num: '04', icon: 'Wallet', title: 'Получение средств', desc: 'Деньги поступят на счет в течение 15 минут после одобрения' }
              ].map((step, idx) => (
                <Card key={idx} className="relative border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.num}
                    </div>
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 ml-8">
                      <Icon name={step.icon} className="text-accent" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <ApplicationForm />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-primary-foreground/60 text-sm">
            © 2024 Финансирование селлеров. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
