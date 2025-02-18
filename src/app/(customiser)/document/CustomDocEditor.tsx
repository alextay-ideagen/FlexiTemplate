import ChatInput from '@/app/(customiser)/document/[title]/ChatInput';
import { Button, Input } from '@headlessui/react';
import { useState } from 'react';

export default function CustomDocumentEditor({
  handleCommandSubmit,
}: {
  handleCommandSubmit: (message: string) => Promise<void>;
}) {
  const [command, setCommand] = useState('');

  return (
    <div className='flex p-4 bg-gray-100'>
      {/* Right: Customization Panel */}
      <div className='p-4 ml-4 bg-white shadow-lg rounded-lg'>
        <h2 className='text-lg font-semibold mb-2'>Customization</h2>
        <div className='flex flex-col gap-4'>
          <label>
            Font Size
            <Input type='number' placeholder='e.g., 16' />
          </label>
          <label>
            Text Color
            <Input type='text' placeholder='e.g., blue' />
          </label>
          <label>
            Header/Footer Image Upload
            <Input type='file' />
          </label>
        </div>

        <ChatInput onSend={handleCommandSubmit} />
      </div>
    </div>
  );
}
