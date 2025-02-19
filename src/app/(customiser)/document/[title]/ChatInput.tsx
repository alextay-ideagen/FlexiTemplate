import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };
  const handleBadgeClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const textContent = event.currentTarget.textContent; // get the text content of the span element

    if (!textContent) return;
    onSend(textContent);
  };
  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='relative w-full'>
        <div className='uppercase font-medium text-sm animate-pulse'>
          Ask the AI to do something
        </div>
        <textarea
          className='w-full bg-white border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none'
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type='submit'
          className='absolute right-3 bottom-3 text-blue-600 hover:text-blue-800'
        >
          ⏎
        </button>
      </form>
      <div className='mt-2 gap-4 leading-8'>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset'
        >
          Format the Tables - Improve table readability with alternating row
          colors and proper alignment.
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset'
        >
          Column Layout - Convert the document into a two-column or
          newspaper-style format.
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset'
        >
          Highlight key points in the document
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset'
        >
          Keep formatting simple with ample whitespace and clean typography
          using Google Font
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset'
        >
          Add a “Confidential” watermark
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset'
        >
          Creative & Engaging - Use vibrant colors, stylish fonts, and modern
          layouts for presentations or marketing documents.
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset'
        >
          Apply a professional layout with serif fonts using Google Font and
          subtle section dividers.
        </span>
        <span
          onClick={handleBadgeClick}
          className='cursor-pointer hover:scale-105 duration-500 transition-transform mr-2 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset'
        >
          Emphasize important sections using bold, italics, or color.
        </span>
      </div>
    </div>
  );
}
