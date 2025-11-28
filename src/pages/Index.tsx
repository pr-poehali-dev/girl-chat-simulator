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
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'character'; type?: 'text' | 'image'; imageUrl?: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const getIntelligentResponse = (userMessage: string, character: Character, conversationHistory: { text: string; sender: string }[]): string => {
    const msg = userMessage.toLowerCase();
    const name = character.name;
    
    const greetings = ['привет', 'здравствуй', 'hi', 'hello', 'хай'];
    const questions = ['как дела', 'как ты', 'что делаешь', 'чем занимаешься'];
    const compliments = ['красив', 'прелест', 'прекрас', 'милая', 'класс'];
    const romantic = ['люблю', 'нравишься', 'встреч', 'поцел', 'обнять'];
    const flirty = ['секс', 'эротик', 'интим', 'страст', 'желан'];
    
    if (greetings.some(word => msg.includes(word))) {
      const responses = [
        `Привет! 😊 Так рада тебя видеть снова`,
        `Привет, милый! Я уже соскучилась 💕`,
        `Здравствуй! Как хорошо что ты написал`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (questions.some(word => msg.includes(word))) {
      if (character.role.includes('Романтичная')) {
        return `У меня всё замечательно! Сейчас читаю стихи и думаю о прекрасном... А как твои дела? 📖✨`;
      } else if (character.role.includes('Загадочная')) {
        return `Скучала... Думала о тебе, если честно 😏 А ты что делаешь?`;
      } else if (character.role.includes('бизнес-леди')) {
        return `Работала над интересным проектом. Но сейчас рада отдохнуть в твоей компании 💼`;
      } else if (character.role.includes('подруга')) {
        return `Всё хорошо! Готовила вкусняшки и слушала музыку 🎵 А у тебя как день прошёл?`;
      } else if (character.role.includes('Спортивная')) {
        return `Только с тренировки вернулась! Энергии столько, что хочется горы свернуть ⚡ А ты?`;
      } else {
        return `Отлично! Рисовала немного, вдохновение пришло 🎨 Рассказывай, как твои дела?`;
      }
    }
    
    if (compliments.some(word => msg.includes(word))) {
      const responses = [
        `Ой, спасибо большое! 😊 Ты такой милый`,
        `Ты меня смущаешь... 🥰 Приятно слышать`,
        `Какой же ты душка! 💕 Мне так приятно`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (romantic.some(word => msg.includes(word))) {
      if (character.role.includes('Романтичная')) {
        return `Мне так тепло от твоих слов... 💖 Ты особенный для меня`;
      } else if (character.role.includes('Загадочная')) {
        return `Ммм, продолжай... Мне нравится куда это идёт 😏💋`;
      } else {
        return `Ты знаешь как растопить моё сердце... 💕`;
      }
    }
    
    if (flirty.some(word => msg.includes(word))) {
      if (character.role.includes('Загадочная')) {
        const responses = [
          `Ох, смелый какой... 😈 Мне нравятся такие`,
          `Интересное предложение... Расскажи подробнее 💋`,
          `Ты точно знаешь как завести девушку 🔥`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      } else if (character.role.includes('Романтичная')) {
        return `Ты меня смущаешь... 🙈 Но мне это нравится`;
      } else {
        return `Ого, как неожиданно! 😳 Ты меня удивляешь`;
      }
    }
    
    const messageLength = msg.split(' ').length;
    if (messageLength > 15) {
      const responses = [
        `Вау, как интересно! 😍 Расскажи мне ещё что-нибудь`,
        `Мне так нравится когда ты делишься со мной! Продолжай 💕`,
        `Ты такой интересный собеседник... Я слушаю тебя часами ✨`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes('?')) {
      const responses = [
        `Хм, отличный вопрос! 🤔 По-моему, это зависит от ситуации. А ты как думаешь?`,
        `Интересно спрашиваешь... Мне кажется что да, а твоё мнение?`,
        `Дай подумать... 💭 Наверное, лучше если мы обсудим это вместе`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    const contextResponses = [
      `Да, я тебя понимаю! У меня тоже так бывает 😊`,
      `Правда? Расскажи мне об этом подробнее! 💕`,
      `Ого! Звучит интересно... Продолжай`,
      `Я с тобой согласна ✨ Мне нравится твой взгляд на вещи`,
      `Хм, никогда так не думала... Ты открыл мне глаза 😍`,
      `Точно! Я думаю об этом так же, как и ты`,
    ];
    return contextResponses[Math.floor(Math.random() * contextResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedCharacter) return;

    const newMessage = { text: inputMessage, sender: 'user' as const };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    const typingDelay = Math.random() * 1000 + 1500;
    
    setTimeout(() => {
      const response = getIntelligentResponse(inputMessage, selectedCharacter, updatedMessages);
      setMessages((prev) => [...prev, { text: response, sender: 'character' }]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleRequestPhoto = async () => {
    if (!selectedCharacter || isGeneratingImage) return;
    
    setIsGeneratingImage(true);
    setMessages((prev) => [...prev, { 
      text: 'Можешь прислать фото? 📸', 
      sender: 'user',
      type: 'text'
    }]);
    
    setIsTyping(true);
    
    setTimeout(async () => {
      setIsTyping(false);
      
      const characterDescriptions: Record<string, string> = {
        'София': 'beautiful romantic young woman with long flowing hair, soft natural lighting, dreamy aesthetic, gentle smile, artistic portrait photography, high quality',
        'Анастасия': 'elegant confident woman with mysterious look, sophisticated style, dramatic lighting, alluring gaze, fashion photography, high quality',
        'Виктория': 'professional businesswoman in elegant attire, confident posture, modern office background, natural beauty, corporate photography, high quality',
        'Мария': 'warm friendly woman with kind smile, cozy casual style, natural lighting, approachable beauty, lifestyle photography, high quality',
        'Кристина': 'athletic energetic woman in sportswear, dynamic pose, outdoor setting, healthy lifestyle, fitness photography, high quality',
        'Алина': 'creative artistic woman, bohemian style, colorful background, expressive features, artistic portrait, high quality'
      };
      
      const prompt = characterDescriptions[selectedCharacter.name] || 'beautiful young woman portrait, high quality photography';
      
      try {
        const response = await fetch('https://functions.poehali.dev/ffc663f9-ba7c-4c30-ab3f-1340998eaef7', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, characterName: selectedCharacter.name })
        });
        
        if (response.ok) {
          const data = await response.json();
          const photoResponses = [
            'Вот моё фото для тебя 💕',
            'Специально для тебя сделала 📸✨',
            'Нравится? 😊💖',
            'Держи, только для тебя 💋',
          ];
          const randomText = photoResponses[Math.floor(Math.random() * photoResponses.length)];
          
          setMessages((prev) => [...prev, { 
            text: randomText,
            sender: 'character',
            type: 'image',
            imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80'
          }]);
        } else {
          setMessages((prev) => [...prev, { 
            text: 'Извини, сейчас не могу отправить фото... Попробуй позже? 🥺',
            sender: 'character',
            type: 'text'
          }]);
        }
      } catch (error) {
        const placeholderImages = [
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
          'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        ];
        const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
        
        setMessages((prev) => [...prev, { 
          text: 'Держи моё фото 💕',
          sender: 'character',
          type: 'image',
          imageUrl: randomImage
        }]);
      }
      
      setIsGeneratingImage(false);
    }, 2000);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setActiveTab('chat');
    
    let greeting = '';
    if (character.role.includes('Романтичная')) {
      greeting = `Привет! 🌸 Я ${character.name}. Люблю красоту во всех её проявлениях - поэзию, музыку, закаты... Расскажи мне о себе?`;
    } else if (character.role.includes('Загадочная')) {
      greeting = `Привет, милый 😏 Я ${character.name}. Знаешь, я редко встречаю интересных мужчин... Но ты выглядишь интригующе 💋`;
    } else if (character.role.includes('бизнес-леди')) {
      greeting = `Здравствуй! Я ${character.name}. Успешная, амбициозная, но всегда рада приятной компании после работы. Чем занимаешься?`;
    } else if (character.role.includes('подруга')) {
      greeting = `Привет! ☀️ Я ${character.name}. Так рада познакомиться! Можешь рассказать мне всё, я всегда выслушаю 💕`;
    } else if (character.role.includes('Спортивная')) {
      greeting = `Хей! ⚡ Я ${character.name}. Обожаю активный образ жизни и новые приключения! А ты любишь спорт?`;
    } else {
      greeting = `Привет! 🎨 Я ${character.name}. Творческая душа, люблю искусство и всё необычное. Рада знакомству!`;
    }
    
    setMessages([
      {
        text: greeting,
        sender: 'character',
        type: 'text',
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
                      {message.type === 'image' && message.imageUrl ? (
                        <div className="max-w-[60%]">
                          <img 
                            src={message.imageUrl} 
                            alt="Generated photo" 
                            className="rounded-2xl shadow-lg w-full object-cover"
                          />
                          {message.text && (
                            <p className="text-sm text-purple-700 mt-2 px-2">{message.text}</p>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`max-w-[70%] rounded-3xl px-6 py-3 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-purple-50 text-gray-800'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-scale-in">
                      <div className="bg-purple-50 rounded-3xl px-6 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-purple-100 bg-purple-50/50">
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestPhoto()}
                    disabled={isGeneratingImage}
                    className="rounded-full text-xs"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
                        Генерирую...
                      </>
                    ) : (
                      <>
                        <Icon name="Camera" size={14} className="mr-1" />
                        Попросить фото
                      </>
                    )}
                  </Button>
                  <Badge variant="secondary" className="text-xs">
                    <Icon name="Sparkles" size={12} className="mr-1" />
                    Premium функция
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
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