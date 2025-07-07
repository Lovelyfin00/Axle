import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { DownloadIcon, Edit3, RefreshCw } from 'lucide-react';
import { foundation } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


const Messages = ({message, messages, setMessages, index, selectedModel}) => {
    
    const handleEditMessage = (messageId, newContent) => {
        setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, content: newContent } : msg
        ));
    };

  return (
    <div className={`flex-1 ${message.role === 'user' ? 'max-w-2xl' : ''}`}>
        {message.role === 'user' ? (
        <div className="flex items-center justify-between mb-2">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg ml-auto">
            {message.parts[0].text}
            </div>
            {/* <button 
            onClick={() => {
                const newContent = prompt('Edit message:', message.parts[0].text);
                if (newContent) handleEditMessage(message.id, newContent);
            }}
            className="text-gray-400 hover:text-gray-600 ml-2"
            >
            <Edit3 className="w-4 h-4" />
            </button> */}
        </div>
        ) : message.parts[0].inlineData
        ? (
            <div className='rounded-lg w-full h-auto max-w-md overflow-hidden relative'>
                <a href={`data:${message.parts[0].inlineData.mimeType};base64, ${message.parts[0].inlineData.data}`} download={"ai-image.png"} className='absolute top-3 right-5 bg-white shadow rounded-lg p-2 hover:cursor-pointer'><DownloadIcon/></a>
                <img src={`data:${message.parts[0].inlineData.mimeType};base64, ${message.parts[0].inlineData.data}`} className='w-full h-auto' />
            </div>
        )
        :  (
        <div>
            <div className="max-w-none text-gray-800 text-sm leading-relaxed space-y-4">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                p: ({ children }) => (
                    <p className="mb-4 last:mb-0">{children}</p>
                ),
                li: ({ children }) => (
                    <li className="mb-1 leading-snug">{children}</li>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-1 mb-4">{children}</ol>
                ),
                code({ children, className, ...rest }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        language={match[1]}
                        style={foundation}
                        wrapLongLines
                        showLineNumbers={false}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    ) : (
                    <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>
                    );
                },
                }}
            >
                {message.parts[0].text}
            </Markdown>
            </div>                        

            {index === messages.length - 1 && message.role === 'ai' && (
            <div className="mt-6 flex justify-center">
                <button 
                onClick={() => handleRegenerateResponse(message.id)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                <RefreshCw className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 text-sm">Regenerate response</span>
                </button>
            </div>
            )}
        </div>
        )}
    </div>
  )
}

export default Messages