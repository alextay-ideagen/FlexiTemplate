import ChatInput from '@/app/(customiser)/document/[title]/ChatInput';
import { Button, Input } from '@headlessui/react';
import { useState } from 'react';

export default function CustomDocumentEditor({
  handleCommandSubmit,
}: {
  handleCommandSubmit: (message: string) => Promise<void>;
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
    <div className='flex p-4 bg-gray-100'>
      {/* Right: Customization Panel */}
      <div className='p-4 ml-4 bg-white shadow-lg rounded-lg'>
        <div className='bottom-10 right-4 flex gap-4 mt-4'>
          <Button className='bg-blue-500 hover:bg-blue-600 rounded-lg p-2'>
            Revert PDF
          </Button>
        </div>
        <h2 className='text-lg font-semibold mb-2'>Customization</h2>
        <div className='flex flex-col gap-4'>
          <label>
            Font Size
            <Input
              type='number'
              value={fontSize}
              onChange={handleFontSizeChange}
              placeholder='e.g., 16'
            />
          </label>
          <label>
            Text Color
            <Input
              type='text'
              value={textColor}
              onChange={handleTextColorChange}
              placeholder='e.g., blue'
            />
          </label>
          <label>
            Header/Footer Image Upload
            <Input type='file' />
          </label>
        </div>
      </div>

      {/* Bottom: Chat Commands & Generate PDF */}
      <div className='absolute bottom-10 left-4 right-4 flex gap-4'>
        <Input
          className='flex-grow'
          placeholder='Enter a command...'
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
        // onClick={(e) => handleCommandSubmit}
        >
          Apply Command
        </Button>
        <Button className='bg-green-500 hover:bg-green-600'>
          Generate PDF
        </Button>
      </div>
    </div>
  );
}
