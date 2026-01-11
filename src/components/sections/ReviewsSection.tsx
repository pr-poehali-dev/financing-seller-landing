import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Отзывы наших клиентов
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          Селлеры уже получили финансирование и развивают свой бизнес
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Дмитрий Соколов',
              company: 'ООО "Текстиль+"',
              marketplace: 'Wildberries',
              amount: '5 млн ₽',
              text: 'Получили финансирование за 20 минут! Смогли закупить новую партию товара перед сезоном. Оборот вырос на 40%.',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry'
            },
            {
              name: 'Елена Кузнецова',
              company: 'ИП Кузнецова',
              marketplace: 'Ozon',
              amount: '2.5 млн ₽',
              text: 'Очень удобно — никакого залога и личных гарантий. Деньги пришли в тот же день, смогли расширить ассортимент.',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
            },
            {
              name: 'Алексей Морозов',
              company: 'ООО "ЭлектроМир"',
              marketplace: 'Яндекс Маркет',
              amount: '8 млн ₽',
              text: 'Работаем уже полгода. Гибкие условия, прозрачные проценты. Помогли выйти на новые маркетплейсы без кассовых разрывов.',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey'
            }
          ].map((review, idx) => (
            <Card key={idx} className="border-border hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full bg-muted" />
                  <div>
                    <h3 className="font-semibold text-foreground">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{review.text}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">{review.marketplace}</span>
                  <span className="text-sm font-semibold text-accent">{review.amount}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
