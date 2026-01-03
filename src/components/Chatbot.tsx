import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatContext } from '@/contexts/ChatContext';
import { useLocation } from '@/contexts/LocationContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { calculateDistance } from '@/lib/distance';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getCafes, getCafeById, getReviews, getCafeLink } = useChatContext();
  const { userLocation } = useLocation();

  // Load messages từ localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatbot_messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
    // Default welcome message
    return [
      {
        id: '1',
        role: 'assistant',
        content: 'こんにちは！ベトナムのカフェ探しをお手伝いします。どんなカフェをお探しですか？',
        timestamp: new Date(),
      },
    ];
  });

  // Lưu messages vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getCafeContext = () => {
    const cafes = getCafes();
    
    // Tính khoảng cách và sắp xếp theo khoảng cách
    const cafesWithDistance = cafes.map(cafe => {
      let distance = null;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          cafe.lat,
          cafe.lng
        );
      }
      return { ...cafe, distance };
    });

    // Chỉ lấy top 10 quán gần nhất hoặc có rating cao
    const sortedCafes = cafesWithDistance
      .sort((a, b) => {
        if (a.distance && b.distance) return a.distance - b.distance;
        return b.rating - a.rating;
      })
      .slice(0, 10);

    return sortedCafes.map(cafe => {
      const reviews = getReviews(cafe.id);
      const topReviews = reviews
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3); // Chỉ lấy 3 review có likes cao nhất
      
      return {
        id: cafe.id,
        name: cafe.name,
        address: cafe.address.split('(')[0].trim(), // Bỏ phần tiếng Nhật trong address
        distance: cafe.distance ? `${cafe.distance.toFixed(1)}km` : 'N/A',
        rating: cafe.rating,
        price_range: cafe.price_range,
        tags: cafe.tags.slice(0, 5), // Chỉ lấy 5 tags
        description: cafe.description,
        hours: cafe.hours,
        menuHighlights: cafe.menuItems?.slice(0, 3).map(item => ({
          name: item.name,
          priceJPY: item.priceJPY,
        })),
        topReviews: topReviews.map(review => ({
          rating: review.rating,
          text: review.text.length > 100 ? review.text.substring(0, 100) + '...' : review.text,
          likes: review.likes,
        })),
        totalReviews: reviews.length,
        link: `http://localhost:8080${getCafeLink(cafe.id)}`,
      };
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not found');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const cafeContext = getCafeContext();
      const userLocationInfo = userLocation 
        ? `ユーザーの現在地: 緯度 ${userLocation.lat.toFixed(4)}, 経度 ${userLocation.lng.toFixed(4)}`
        : 'ユーザーの位置情報: 不明';

      const systemPrompt = `あなたはベトナムに住む日本人のためのカフェ相談アシスタントです。
以下のカフェデータベース（ユーザーから近い順/人気順のトップ10）を参照して、簡潔に答えてください：

${userLocationInfo}

カフェデータ:
${JSON.stringify(cafeContext, null, 2)}

重要なルール：
1. 常に日本語で回答
2. カフェを推薦する際は必ずリンクを含める（例：[カフェ名](http://localhost:8080/cafe/1)）
3. 距離情報を活用して近い場所を優先的に紹介
4. 回答は150-250文字程度、詳しく説明
5. 箇条書き（* または -）を使って読みやすく
6. 1-2個のカフェに絞って推薦し、それぞれの特徴を説明
7. 価格、Wi-Fi、営業時間などの具体的な情報も含める

ユーザーの質問: ${input}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '申し訳ございません。エラーが発生しました。もう一度お試しください。',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    const renderedLines: JSX.Element[] = [];

    lines.forEach((line, lineIndex) => {
      // Kiểm tra bullet point TRƯỚC khi xử lý markdown
      const isBullet = /^\s*[\*\-]\s+/.test(line);
      let processedLine = line;
      
      if (isBullet) {
        processedLine = line.replace(/^\s*[\*\-]\s+/, '');
      }

      // Tách line thành các phần: text, link, bold
      const parts: (string | JSX.Element)[] = [];
      let currentIndex = 0;
      let partKey = 0;

      // Tìm tất cả links [text](url)
      const linkPattern = /\[([^\]]+)\]\(([^\)]+)\)/g;
      let match;

      const tempLine = processedLine;
      const matches: Array<{ index: number; length: number; text: string; url: string }> = [];
      
      while ((match = linkPattern.exec(tempLine)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[1],
          url: match[2],
        });
      }

      // Xử lý từng match
      matches.forEach((m, idx) => {
        // Thêm text trước link
        if (m.index > currentIndex) {
          const textBefore = processedLine.substring(currentIndex, m.index);
          // Xử lý bold trong text này
          const boldProcessed = textBefore.split(/(\*\*[^*]+\*\*)/).filter(s => s).map((segment, i) => {
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return (
                <strong key={`bold-${lineIndex}-${partKey++}`} className="font-semibold">
                  {segment.slice(2, -2)}
                </strong>
              );
            }
            return segment;
          });
          parts.push(...boldProcessed);
        }

        // Thêm link
        parts.push(
          <a
            key={`link-${lineIndex}-${partKey++}`}
            href={m.url}
            className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = m.url;
            }}
          >
            {m.text}
          </a>
        );

        currentIndex = m.index + m.length;
      });

      // Thêm phần còn lại sau link cuối
      if (currentIndex < processedLine.length) {
        const textAfter = processedLine.substring(currentIndex);
        const boldProcessed = textAfter.split(/(\*\*[^*]+\*\*)/).filter(s => s).map((segment, i) => {
          if (segment.startsWith('**') && segment.endsWith('**')) {
            return (
              <strong key={`bold-${lineIndex}-${partKey++}`} className="font-semibold">
                {segment.slice(2, -2)}
              </strong>
            );
          }
          return segment;
        });
        parts.push(...boldProcessed);
      }

      // Nếu không có parts nào, dùng original line
      const lineContent = parts.length > 0 ? parts : [processedLine];
      
      if (isBullet) {
        renderedLines.push(
          <div key={lineIndex} className="flex gap-2 mb-1 items-start">
            <span className="text-muted-foreground mt-0.5 flex-shrink-0">•</span>
            <div className="flex-1">{lineContent}</div>
          </div>
        );
      } else if (line.trim() === '') {
        renderedLines.push(<div key={lineIndex} className="h-2" />);
      } else {
        renderedLines.push(
          <div key={lineIndex} className="mb-1">
            {lineContent}
          </div>
        );
      }
    });

    return renderedLines;
  };

  const clearChatHistory = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'こんにちは！ベトナムのカフェ探しをお手伝いします。どんなカフェをお探しですか？',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem('chatbot_messages');
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  カフェ相談アシスタント
                </h3>
                <p className="text-sm opacity-90">ベトナムのカフェ探しをお手伝いします</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChatHistory}
                className="h-8 w-8 hover:bg-primary-foreground/10"
                title="チャット履歴をクリア"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="text-sm break-words">
                      {renderMessageContent(message.content)}
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ja-JP', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
