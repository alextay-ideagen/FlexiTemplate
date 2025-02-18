'use client';

import { Button } from '@headlessui/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import HtmlIframe from '@/app/(customiser)/document/[title]/HtmlIframe';
import CustomDocEditor from '@/app/(customiser)/document/CustomDocEditor';

import { getUpdatedHtml } from './actions';

export default function CustomiserPanel({
  originalDocument,
  title,
}: {
  originalDocument?: string;
  title?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [showOriginalContent, setShowOriginalContent] = useState(false);
  const [documentContent, setDocumentContent] = useState(
    originalDocument ?? '',
  );

  const handleCommandSubmit = async (message: string) => {
    if (!message) return;
    if (!documentContent) return;
    if (loading) return;
    setLoading(true);

    console.log('Processing command:', message);
    const result = await getUpdatedHtml({
      prompt: message,
      html: documentContent,
    });
    console.log('Received response from server:', result);

    setDocumentContent(result);

    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    if (exportLoading) return;

    setExportLoading(true);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: documentContent,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error('Failed to generate PDF');
      }

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

    setExportLoading(false);
  };
  const isOriginal = originalDocument === documentContent;
  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-2xl font-semibold'>{title || 'Loading...'}</h2>
        <div className='flex gap-5'>
          <Button
            onClick={() => {
              setDocumentContent(originalDocument ?? '');
            }}
            className={`
              inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white
              ${isOriginal ? 'hidden' : ''}
              `}
          >
            Revert to Original
          </Button>
          <Button
            hidden={isOriginal}
            onClick={() => {
              setShowOriginalContent((prev) => !prev);
            }}
            className={`inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white
                            ${isOriginal ? 'hidden' : ''}

              `}
          >
            {showOriginalContent
              ? 'Show Customized Content'
              : 'Show Original Content'}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className='mr-5 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'
          >
            <Loader2
              className={`mr-3 size-5 animate-spin ${exportLoading ? '' : 'hidden'}`}
            />
            Export to PDF
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-grow flex-col gap-4 lg:flex-col-reverse'>
        {/* Document Viewer */}
        <div className='my-4 rounded-lg shadow-lg overflow-hidden box'>
          {/* <CustomDocViewer documentContent={documentContent} /> */}
          <div className='ribbon'>
            {isOriginal || showOriginalContent ? `Original` : `Customized`}
          </div>

          <HtmlIframe
            loading={loading}
            htmlString={
              showOriginalContent ? (originalDocument ?? '') : documentContent
            }
          />
        </div>
        {/* Customization Panel */}
        <CustomDocEditor
          handleCommandSubmit={handleCommandSubmit}
          setShowOriginalContent={setShowOriginalContent}
          showOriginalContent={showOriginalContent}
        />
      </div>
    </div>
  );
}
