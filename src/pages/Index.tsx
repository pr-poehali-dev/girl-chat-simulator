import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Character {
  id: number;
  name: string;
  role: string;
  personality: string;
  avatar: string;
  tags: string[];
  online: boolean;
}

const characters: Character[] = [
  {
    id: 1,
    name: 'София',
    role: 'Романтичная мечтательница',
    personality: 'Нежная, чуткая, любит поэзию и искусство',
    avatar: '🌸',
    tags: ['романтика', 'философия', 'искусство'],
    online: true,
  },
  {
    id: 2,
    name: 'Анастасия',
    role: 'Загадочная соблазнительница',
    personality: 'Уверенная, игривая, знает чего хочет',
    avatar: '💋',
    tags: ['страсть', 'флирт', 'тайны'],
    online: true,
  },
  {
    id: 3,
    name: 'Виктория',
    role: 'Успешная бизнес-леди',
    personality: 'Амбициозная, умная, ценит интеллект',
    avatar: '💼',
    tags: ['карьера', 'успех', 'интеллект'],
    online: false,
  },
  {
    id: 4,
    name: 'Мария',
    role: 'Добрая подруга',
    personality: 'Заботливая, понимающая, всегда поддержит',
    avatar: '☀️',
    tags: ['дружба', 'поддержка', 'уют'],
    online: true,
  },
  {
    id: 5,
    name: 'Кристина',
    role: 'Спортивная энтузиастка',
    personality: 'Энергичная, активная, любит приключения',
    avatar: '⚡',
    tags: ['спорт', 'путешествия', 'активность'],
    online: true,
  },
  {
    id: 6,
    name: 'Алина',
    role: 'Творческая натура',
    personality: 'Креативная, вдохновляющая, открытая миру',
    avatar: '🎨',
    tags: ['творчество', 'музыка', 'вдохновение'],
    online: false,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'subscription' | 'payment'>('home');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; oldPrice: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sbp' | 'crypto'>('card');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'character' }[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedCharacter) return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    setTimeout(() => {
      const responses = [
        'Как интересно! Расскажи мне больше...',
        'Я очень рада что ты написал 💕',
        'Мне так приятно с тобой общаться',
        'О, это звучит захватывающе!',
        'Я думаю об этом точно так же ✨',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: 'character' }]);
    }, 1000);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setActiveTab('chat');
    setMessages([
      {
        text: `Привет! Я ${character.name}. ${character.personality}. Рада познакомиться! 💕`,
        sender: 'character',
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="backdrop-blur-lg bg-white/70 border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              HeartChat
            </h1>
            <nav className="flex gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="rounded-full"
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('chat')}
                className="rounded-full"
                disabled={!selectedCharacter}
              >
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Чат
              </Button>
              <Button
                variant={activeTab === 'subscription' || activeTab === 'payment' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('subscription')}
                className="rounded-full"
              >
                <Icon name="Crown" size={18} className="mr-2" />
                Подписка
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Выбери собеседницу
              </h2>
              <p className="text-lg text-muted-foreground">
                Каждая девушка уникальна и готова к увлекательной беседе
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-purple-300 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 text-3xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          {character.avatar}
                        </Avatar>
                        {character.online && (
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-semibold">{character.name}</h3>
                          {character.online && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Online
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-purple-600 mb-2">{character.role}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{character.personality}</p>

                    <div className="flex flex-wrap gap-2">
                      {character.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="rounded-full bg-purple-50 border-purple-200 text-purple-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Начать диалог
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chat' && selectedCharacter && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="overflow-hidden border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 text-2xl bg-white/20 flex items-center justify-center">
                    {selectedCharacter.avatar}
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedCharacter.name}</h3>
                    <p className="text-sm opacity-90">{selectedCharacter.role}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}
                    >
                      <div
                        className={`max-w-[70%] rounded-3xl px-6 py-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-purple-50 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-purple-100 bg-purple-50/50">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Напиши сообщение..."
                    className="rounded-full border-purple-200 focus:border-purple-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shrink-0"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'payment' && selectedPlan && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => setActiveTab('subscription')}
              className="mb-6 rounded-full"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад к тарифам
            </Button>

            <Card className="p-8 border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Оформление подписки
                </h2>
                <p className="text-muted-foreground">Тариф: {selectedPlan.name}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">Стоимость:</span>
                  {selectedPlan.oldPrice !== selectedPlan.price && (
                    <span className="text-muted-foreground line-through">{selectedPlan.oldPrice}₽</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">Итого:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {selectedPlan.price}₽
                  </span>
                </div>
                {selectedPlan.oldPrice !== selectedPlan.price && (
                  <div className="mt-2 text-center">
                    <Badge className="bg-green-500">Вы экономите {selectedPlan.oldPrice - selectedPlan.price}₽</Badge>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-lg">Выберите способ оплаты</h3>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="space-y-3">
                    <Card className="p-4 cursor-pointer hover:border-purple-400 transition-colors" onClick={() => setPaymentMethod('card')}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Icon name="CreditCard" size={24} className="text-purple-500" />
                          <div>
                            <p className="font-semibold">Банковская карта</p>
                            <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР</p>
                          </div>
                        </Label>
                      </div>
                    </Card>

                    <Card className="p-4 cursor-pointer hover:border-purple-400 transition-colors" onClick={() => setPaymentMethod('sbp')}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <Label htmlFor="sbp" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Icon name="Smartphone" size={24} className="text-purple-500" />
                          <div>
                            <p className="font-semibold">Система быстрых платежей</p>
                            <p className="text-sm text-muted-foreground">Мгновенный перевод по номеру телефона</p>
                          </div>
                        </Label>
                      </div>
                    </Card>

                    <Card className="p-4 cursor-pointer hover:border-purple-400 transition-colors" onClick={() => setPaymentMethod('crypto')}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Icon name="Bitcoin" size={24} className="text-purple-500" fallback="Coins" />
                          <div>
                            <p className="font-semibold">Криптовалюта</p>
                            <p className="text-sm text-muted-foreground">BTC, ETH, USDT</p>
                          </div>
                        </Label>
                      </div>
                    </Card>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Срок действия</Label>
                      <Input id="expiry" placeholder="MM/YY" className="rounded-full" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" maxLength={3} className="rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'sbp' && (
                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input id="phone" placeholder="+7 (999) 123-45-67" className="rounded-full" />
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Info" size={16} className="inline mr-1" />
                      На ваш номер придёт push-уведомление для подтверждения оплаты
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="cryptoCurrency">Выберите криптовалюту</Label>
                    <RadioGroup defaultValue="usdt" className="mt-2">
                      <div className="flex gap-3">
                        <Card className="p-3 flex-1 cursor-pointer hover:border-purple-400">
                          <RadioGroupItem value="btc" id="btc" className="sr-only" />
                          <Label htmlFor="btc" className="cursor-pointer text-center block">
                            <p className="font-semibold">BTC</p>
                          </Label>
                        </Card>
                        <Card className="p-3 flex-1 cursor-pointer hover:border-purple-400">
                          <RadioGroupItem value="eth" id="eth" className="sr-only" />
                          <Label htmlFor="eth" className="cursor-pointer text-center block">
                            <p className="font-semibold">ETH</p>
                          </Label>
                        </Card>
                        <Card className="p-3 flex-1 cursor-pointer hover:border-purple-400">
                          <RadioGroupItem value="usdt" id="usdt" className="sr-only" />
                          <Label htmlFor="usdt" className="cursor-pointer text-center block">
                            <p className="font-semibold">USDT</p>
                          </Label>
                        </Card>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Info" size={16} className="inline mr-1" />
                      После оплаты вы будете перенаправлены на страницу с адресом кошелька
                    </p>
                  </div>
                </div>
              )}

              <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12 text-lg">
                <Icon name="Lock" size={18} className="mr-2" />
                Оплатить {selectedPlan.price}₽
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                <Icon name="Shield" size={12} className="inline mr-1" />
                Безопасная оплата. Ваши данные защищены
              </p>
            </Card>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Выбери свой тариф
              </h2>
              <p className="text-lg text-muted-foreground">
                Разблокируй все возможности для незабываемого общения
              </p>
            </div>

            <div className="mb-8 text-center">
              <Card className="inline-block p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
                <div className="flex items-center gap-3">
                  <Icon name="Sparkles" size={24} className="text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold text-purple-900">Специальное предложение</p>
                    <p className="text-sm text-purple-700">Скидка 33% на все планы до конца месяца</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-8 border-2 border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 text-purple-400" />
                  <h3 className="text-2xl font-bold mb-2">Базовый</h3>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    490₽
                  </div>
                  <p className="text-muted-foreground mb-2">в месяц</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Icon name="CreditCard" size={14} />
                    <span>Карта • СБП • Крипта</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>50 сообщений в день</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Доступ к 3 персонажам</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Базовые эмоции</span>
                  </li>
                </ul>
                <Button 
                  className="w-full rounded-full" 
                  variant="outline"
                  onClick={() => {
                    setSelectedPlan({ name: 'Базовый', price: 490, oldPrice: 490 });
                    setActiveTab('payment');
                  }}
                >
                  Выбрать план
                </Button>
              </Card>

              <Card className="p-8 border-4 border-purple-400 bg-gradient-to-br from-white via-purple-50 to-pink-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    Популярный
                  </Badge>
                </div>
                <div className="text-center mb-6">
                  <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-purple-500" />
                  <h3 className="text-2xl font-bold mb-2">Премиум</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">1490₽</span>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      990₽
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-1">в месяц</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-2">
                    Скидка 33%
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Icon name="CreditCard" size={14} />
                    <span>Карта • СБП • Крипта</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Безлимитные сообщения</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Все персонажи</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Расширенные эмоции</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Голосовые сообщения</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Фото от персонажей</span>
                  </li>
                </ul>
                <Button 
                  className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => {
                    setSelectedPlan({ name: 'Премиум', price: 990, oldPrice: 1490 });
                    setActiveTab('payment');
                  }}
                >
                  Выбрать план
                </Button>
              </Card>

              <Card className="p-8 border-2 border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <Icon name="Crown" size={48} className="mx-auto mb-4 text-orange-400" />
                  <h3 className="text-2xl font-bold mb-2">VIP</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">2990₽</span>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                      1990₽
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-1">в месяц</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-2">
                    Скидка 33%
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Icon name="CreditCard" size={14} />
                    <span>Карта • СБП • Крипта</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Всё из Премиум</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Приоритетные ответы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Создание своих персонажей</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Видео звонки</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-green-500 shrink-0" />
                    <span>Эксклюзивный контент</span>
                  </li>
                </ul>
                <Button 
                  className="w-full rounded-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600"
                  onClick={() => {
                    setSelectedPlan({ name: 'VIP', price: 1990, oldPrice: 2990 });
                    setActiveTab('payment');
                  }}
                >
                  Выбрать план
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-8 border-t border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 HeartChat. Создано для незабываемого общения 💕</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;