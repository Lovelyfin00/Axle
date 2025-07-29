import { GoogleGenAI, Modality } from '@google/genai';
import React, { useEffect, useRef, useState } from 'react'

import { Send, Sparkles } from 'lucide-react';

import NoMessage from './NoMessage';
import Messages from './Messages';

const Chat = ({selectedModel}) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    const [messages, setMessages] = useState([]);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Getting data from Gemini AI
    const ai = new GoogleGenAI({apiKey});

    // Generate Image
    const generateAIImage = async () => {

      //Initialize same thing for the gemini ai
      const contents = [
        ...messages,
        {
          id: Date.now(),
          role: 'user',
          parts: [{text: inputText.trim()}]
        }
      ]
    setMessages(contents);

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents,
            config: {
              responseModalities: [Modality.TEXT, Modality.IMAGE]
        }
        });

        for(const parts of response.candidates[0].content?.parts){
          
          if (parts.inlineData) {
            const imageData = parts.inlineData.data;
            const imageType = parts.inlineData.mimeType;

            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];

              const updatedMessage = {
                  ...lastMessage,
                  parts: [{ inlineData: {
                    data: imageData,
                    mimeType: imageType
                  } }],
                  id: Date.now()
              };

              return [...prev.slice(0, -1), updatedMessage];
            });

          } else {

            setMessages((prev) => [...prev, {
              role: "model",
              parts: [{ text: parts.text }],
              id: Date.now()
            }])
          }
        }
    }

  const generateAIChatResponse = async() => {
            // This below id for question and answer like quiz and not chat
        // const response = await ai.models.generateContentStream({
        //     model: 'gemini-2.0-flash-001',
        //     contents: inputText.trim(),
        // });

            //Initialize same thing for the gemini ai
    const newAIMessage = {
        id: Date.now(),
        role: 'model',
        parts: [{text: ""}]
    };
    setMessages(prev => [...prev, newAIMessage]);

     const MAX_HISTORY_MESSAGES = 10; // To not overwhelm the token limit since about 60-80 words is 100 token, we have to truncate older messages

      const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES); // Keep only the most recent 10 messages

      const response = await ai.chats.create({
        model: 'gemini-2.0-flash-001',
        history: trimmedHistory,
      });

      const chatResponse = await response.sendMessageStream({message: inputText.trim()})

      for await (const chunk of chatResponse) {

        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            
            const updatedText = lastMessage.parts[0].text + chunk.text;

            const updatedMessage = {
                ...lastMessage,
                parts: [{ text: updatedText }],
                id: Date.now()
            };

            return [...prev.slice(0, -1), updatedMessage];
        });

      }
  }

    // Handle sending messages
const handleSendMessage = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    setInputText('');

    const newUserMessage = {
        id: Date.now(),
        role: 'user',
        parts: [{ text: trimmedInput }]
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
        setIsTyping(true);

        selectedModel === "Chat" 
            ? await generateAIChatResponse() 
            : await generateAIImage();

    } catch (error) {
        console.error(error);
    } finally {
        setIsTyping(false);
    }
};

  const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
      }
  };

  return (
    <div>
        <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.length === 0 && (
            <NoMessage />
          )}

          {
            messages.length !== 0 && (
                messages.map((message, index) => (
                    <div key={message.id} className={`flex items-start space-x-4 mb-8 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'ai' && (
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    )}
                    
                    {/* Message section */}
                    <Messages message={message} messages={messages} setMessages={setMessages} index={index} selectedModel={selectedModel} />
                    
                    {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-medium">👤</span>
                        </div>
                    )}
                    </div>
                ))
            )
          }
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-4 mb-8">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-4 py-3 inline-block">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Axle..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              style={{ minHeight: '50px', maxHeight: '120px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 disabled:bg-gray-400 text-white p-2 rounded-md hover:bg-purple-700 disabled:hover:bg-gray-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              Free Research Preview. Gemini may produce inaccurate information about people, places, or facts.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat