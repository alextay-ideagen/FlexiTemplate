'use client';

import { Button } from '@headlessui/react';
import { useEffect, useState } from 'react';

import CustomDocEditor from '@/app/(customiser)/document/CustomDocEditor';
import dynamic from 'next/dynamic';
const CustomDocViewer = dynamic(
  () => import('@/app/(customiser)/document/CustomDocViewer'),
  { ssr: false },
);

export default function CustomiserPanel({
  originalDocument,
  title,
}: {
  originalDocument?: string;
  title?: string;
}) {
  const [documentContent, setDocumentContent] = useState(
    originalDocument ??
      `
    <h1>Something went wrong</h1>
    <p>Please try again later.</p>
  `,
  );

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
        {/* Document Viewer */}
        <div className='w-2/3 '>
          <CustomDocViewer documentContent={documentContent} />
        </div>
        {/* Customization Panel */}
        <CustomDocEditor />
      </div>
    </div>
  );
}
