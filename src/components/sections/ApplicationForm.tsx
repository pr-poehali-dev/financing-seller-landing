import { useState } from 'react';
import InputMask from 'react-input-mask';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    inn: '',
    phone: '',
    email: ''
  });
  
  const [emailError, setEmailError] = useState('');
  const [innError, setInnError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, email });
    if (email && !validateEmail(email)) {
      setEmailError('Введите корректный email адрес');
    } else {
      setEmailError('');
    }
  };

  const validateInn = (inn: string) => {
    return inn.length === 10 || inn.length === 12;
  };

  const handleInnChange = (inn: string) => {
    setFormData({ ...formData, inn });
    if (inn && !validateInn(inn)) {
      setInnError('ИНН должен содержать 10 или 12 цифр');
    } else {
      setInnError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setEmailError('Введите корректный email адрес');
      return;
    }
    
    if (!validateInn(formData.inn)) {
      setInnError('ИНН должен содержать 10 или 12 цифр');
      return;
    }
    
    try {
      const response = await fetch('https://functions.poehali.dev/44df7ed9-6f31-4765-b300-5e98aaf8afc6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в течение 24 часов'
        });
        setFormData({ name: '', inn: '', phone: '', email: '' });
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось отправить заявку',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Проверьте соединение',
        variant: 'destructive'
      });
    }
  };

  return (
    <section id="application-form" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Оставьте заявку
            </h2>
            <p className="text-muted-foreground text-lg">
              Заполните форму, и мы свяжемся с вами в течение 15 минут
            </p>
          </div>
          <Card className="border-border shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    ФИО или Название компании <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иванов Иван Иванович / ООО «Ваша компания»"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inn" className="text-foreground font-medium">
                    ИНН <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="inn"
                    required
                    value={formData.inn}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      handleInnChange(value);
                    }}
                    placeholder="1234567890 (10 или 12 цифр)"
                    className={`h-12 ${innError ? 'border-destructive' : ''}`}
                    maxLength={12}
                  />
                  {innError && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <Icon name="AlertCircle" size={14} />
                      {innError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Телефон <span className="text-destructive">*</span>
                  </Label>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="phone"
                        type="tel"
                        required
                        placeholder="+7 (999) 123-45-67"
                        className="h-12"
                      />
                    )}
                  </InputMask>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="info@company.ru"
                    className={`h-12 ${emailError ? 'border-destructive' : ''}`}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <Icon name="AlertCircle" size={14} />
                      {emailError}
                    </p>
                  )}
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
  );
};

export default ApplicationForm;
