import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    revenue: '',
    marketplaces: '',
    phone: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в течение 24 часов'
    });
    setFormData({ company: '', revenue: '', marketplaces: '', phone: '', comment: '' });
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Финансирование для селлеров маркетплейсов
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-medium">
              Получите оборотный капитал до 50 млн ₽ за 15 минут без залога и личных гарантий
            </p>
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
                { num: '02', icon: 'Search', title: 'Анализ данных', desc: 'Мы проанализируем ваши продажи и кредитную историю за 24 часа' },
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

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Оставьте заявку
              </h2>
              <p className="text-muted-foreground text-lg">
                Заполните форму, и мы свяжемся с вами в течение 24 часов
              </p>
            </div>
            <Card className="border-border shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground font-medium">
                      Название компании <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ООО «Ваша компания»"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue" className="text-foreground font-medium">
                      Месячный оборот на маркетплейсах <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="revenue"
                      required
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      placeholder="От 3 млн рублей"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplaces" className="text-foreground font-medium">
                      На каких маркетплейсах работаете <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="marketplaces"
                      required
                      value={formData.marketplaces}
                      onChange={(e) => setFormData({ ...formData, marketplaces: e.target.value })}
                      placeholder="Wildberries, Ozon..."
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-foreground font-medium">
                      Комментарий
                    </Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Дополнительная информация о вашем бизнесе"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Отправить заявку
                    <Icon name="Send" className="ml-2" size={20} />
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Финансирование селлеров</h3>
              <p className="text-primary-foreground/80">
                Профессиональное финансирование для бизнеса на маркетплейсах
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@sellersfinance.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-primary-foreground/80">
                Пн-Пт: 9:00 - 20:00<br />
                Сб-Вс: 10:00 - 18:00
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
            © 2024 Финансирование селлеров. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;