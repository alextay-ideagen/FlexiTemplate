'use client';

import { Button } from '@headlessui/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CustomDocEditor from '@/app/(customiser)/document/CustomDocEditor';
import CustomDocViewer from '@/app/(customiser)/document/CustomDocViewer';

export default function DocumentPage() {
  const params = useParams();
  const { title } = params;

  const [documentContent, setDocumentContent] = useState(`
    <h1>${title}</h1>
    <p>This is a sample document preview.</p>
  `);

  return (
    <div className='p-6 bg-gray-100 flex flex-col'>
      {/* Header */}
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-2xl font-semibold'>{title || 'Loading...'}</h2>
        <Button onClick={() => alert('PDF Generation Coming Soon!')}>
          Export to PDF
        </Button>
      </div>

      {/* Main Content */}
      <div className='flex flex-grow gap-6'>
        {/* Document Viewer */} {/* Left: Live Preview */}
        <div className='w-2/3 '>
          <CustomDocViewer />
        </div>
        {/* Customization Panel */}
        <CustomDocEditor />
      </div>
    </div>
  );
}
