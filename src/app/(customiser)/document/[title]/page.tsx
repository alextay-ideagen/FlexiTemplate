'use client';

import { Button } from '@headlessui/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CustomDocViewer from '@/app/(customiser)/document/CustomDocViewer';

export default function DocumentPage() {
  const params = useParams();
  const { title } = params;

  const [documentContent, setDocumentContent] = useState(`
    <h1>${title}</h1>
    <p>This is a sample document preview.</p>
  `);

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
      {/* Header */}
      <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
        {title || 'Loading...'}
      </h1>
      <Button
        className='bg-green-500 hover:bg-green-600 rounded-lg p-2'
        onClick={() => alert('PDF Generation Coming Soon!')}
      >
        Export to PDF
      </Button>

      {/* Main Content */}
      {/* <CustomDocViewer /> */}
      <div className='grey flex flex-grow gap-6'>
        <CustomDocViewer />
      </div>
    </div>
  );
}
