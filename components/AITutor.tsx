import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, SectionType } from '../types';
import { SECTIONS } from '../constants';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface AITutorProps {
  currentSection: SectionType;
}

const AITutor: React.FC<AITutorProps> = ({ currentSection }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '指挥官你好！我是你的星际领航员 AI。关于当前的轨道参数（知识点）有什么不清楚的吗？我可以帮你生成习题或解释概念！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey) {
          throw new Error("API Key not found");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const sectionInfo = SECTIONS[currentSection];
      
      const systemPrompt = `
        你是一位幽默、酷炫的中学数学物理老师，正在给学生讲解“圆锥曲线”。
        当前的章节是：${sectionInfo.title}。
        核心知识点包括：${sectionInfo.modules.map(m => m.title + '(' + m.keyPoints.join(',') + ')').join('; ')}。
        
        请遵循以下规则：
        1. 称呼用户为“指挥官”或“同学”。
        2. 尽量用天文、航天、科幻的例子来比喻数学概念。
        3. 回答要简洁有力，像战术简报一样，但解释要清晰。
        4. 如果用户要求出题，请根据当前章节出具体的计算题或概念辨析题。
        5. 使用LaTeX格式(用$包裹)表示数学公式。
      `;

      // Simplified chat for demo purposes, in production maintain history context
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemPrompt + "\n\n用户的问题是: " + userMsg }] }
        ]
      });

      const text = response.text || "通信受到干扰，请重试。";
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "⚠ 连接星际网络失败 (Check API Key)", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="font-bold text-slate-100">AI 领航员</h3>
        <span className="text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30">Online</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/90">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100' 
                : 'bg-purple-600/20 border border-purple-500/30 text-purple-100'
            } ${msg.isError ? 'border-red-500 text-red-300' : ''}`}>
               {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 min-h-[1em]">{line}</p>)}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <Loader2 size={16} className="animate-spin" />
                 </div>
                 <div className="text-slate-400 text-sm flex items-center">计算轨道参数中...</div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你的问题，或者输入“出题”..."
          className="flex-1 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-500"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AITutor;