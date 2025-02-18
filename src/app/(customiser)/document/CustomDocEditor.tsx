import { Input } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import ChatInput from '@/app/(customiser)/document/[title]/ChatInput';

export default function CustomDocumentEditor({
  handleCommandSubmit,
  setShowOriginalContent,
  showOriginalContent,
}: {
  handleCommandSubmit: (message: string) => Promise<void>;
  setShowOriginalContent: Dispatch<SetStateAction<boolean>>;
  showOriginalContent: boolean;
}) {
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [textColor, setTextColor] = useState('black'); // Default text color
  const [command, setCommand] = useState('');

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
    // handleCommandSubmit(value, textColor); // Update parent component
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    // handleCommandSubmit(fontSize, color); // Update parent component
  };

  return (
    <div className='max-w-7xl'>
      {/* Right: Customization Panel */}
      <div className='p-4 bg-white shadow-lg rounded-lg'>
        <div className='bottom-10 right-4 flex gap-4 mt-4'></div>
        <h2 className='text-lg font-semibold mb-2'>Customization</h2>
        <div className='flex flex-col gap-4 p-4'>
          <label>
            Font Size
            <Input
              type='number'
              value={fontSize}
              onChange={handleFontSizeChange}
              placeholder='e.g., 16'
              style={{ marginLeft: '1.5rem' }}
            />
          </label>
          <label>
            Text Color
            <Input
              type='text'
              value={textColor}
              onChange={handleTextColorChange}
              placeholder='e.g., blue'
              className='ml-4'
            />
          </label>
          <label>
            Header/Footer Image Upload
            <Input type='file' className='ml-4' />
          </label>
        </div>
        <ChatInput onSend={handleCommandSubmit} />
      </div>
    </div>
  );
}
