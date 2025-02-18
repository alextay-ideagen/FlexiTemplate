'use client';

import { Button } from '@headlessui/react';
import { useEffect, useState } from 'react';

import CustomDocEditor from '@/app/(customiser)/document/CustomDocEditor';
import dynamic from 'next/dynamic';
const CustomDocViewer = dynamic(
  () => import('@/app/(customiser)/document/CustomDocViewer'),
  { ssr: false },
);

import { getUpdatedHtml } from './actions';
import HtmlIframe from '@/app/(customiser)/document/[title]/HtmlIframe';

export default function CustomiserPanel({
  originalDocument,
  title,
}: {
  originalDocument?: string;
  title?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [documentContent, setDocumentContent] = useState(
    originalDocument ??
      `
    <h1>Something went wrong</h1>
    <p>Please try again later.</p>
  `,
  );

  const handleCommandSubmit = async (message: string) => {
    console.log('Processing command:', message);
    const result = await getUpdatedHtml({
      prompt: message,
      html: documentContent,
    });
    console.log('Received response from server:', result);

    setDocumentContent(result);
  };

  const handleDownloadPDF = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: documentContent,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download error:', error);
    }

    setLoading(false);
  };

  return (
    <div className='p-6 bg-gray-100 flex flex-col'>
      {/* Header */}
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-2xl font-semibold'>{title || 'Loading...'}</h2>
        <Button onClick={handleDownloadPDF}>Export to PDF</Button>
      </div>

      {/* Main Content */}
      <div className='flex flex-grow gap-6 flex-col lg:flex-row'>
        {/* Document Viewer */}
        <div className='lg:w-2/3 my-4 rounded-lg shadow-lg overflow-hidden'>
          {/* <CustomDocViewer documentContent={documentContent} /> */}
          {/* <div className='max-h-[calc(100vh-300px)] overflow-auto'>
            <div dangerouslySetInnerHTML={{ __html: documentContent }}></div>
          </div> */}
          <HtmlIframe htmlString={documentContent} />
        </div>
        {/* Customization Panel */}
        <CustomDocEditor handleCommandSubmit={handleCommandSubmit} />
      </div>
    </div>
  );
}
