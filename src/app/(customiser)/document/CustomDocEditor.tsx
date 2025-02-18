import { useState } from 'react';

import { Button, Input } from '@headlessui/react';

export default function CustomDocumentEditor() {
  const [documentContent, setDocumentContent] = useState(
    '<h1>Sample Document</h1><p>This is a customizable document.</p>',
  );
  const [command, setCommand] = useState('');

  const handleCommandSubmit = () => {
    // Placeholder function to process command and update document content
    console.log('Processing command:', command);
  };

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
      </div>

      {/* Bottom: Chat Commands & Generate PDF */}
      <div className='absolute bottom-10 left-4 right-4 flex gap-4'>
        <Input
          className='flex-grow'
          placeholder='Enter a command...'
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button onClick={handleCommandSubmit}>Apply Command</Button>
        <Button className='bg-green-500 hover:bg-green-600'>
          Generate PDF
        </Button>
      </div>
    </div>
  );
}
