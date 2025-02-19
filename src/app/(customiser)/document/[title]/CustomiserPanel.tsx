'use client';

import { Button, Tab, TabGroup, TabList } from '@headlessui/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import HtmlIframe from '@/app/(customiser)/document/[title]/HtmlIframe';
import CustomDocEditor from '@/app/(customiser)/document/CustomDocEditor';

import { getUpdatedHtml } from '@/app/actions/google';
import { generateBedrockResponse } from '@/app/actions/anthropic';

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

  const [generatedResults, setGeneratedResults] = useState<
    { model: string; text: string }[]
  >([]);

  const [currentModel, setCurrentModel] = useState<'claude' | 'gemini' | null>(
    null,
  );

  const handleCommandSubmit = async (message: string) => {
    if (!message) return;
    if (!documentContent) return;
    if (loading) return;
    setLoading(true);

    console.log('Processing command:', message);
    const geminiResultPromise = getUpdatedHtml({
      prompt: message,
      html: documentContent,
    }).then((result) => {
      if (result) {
        setGeneratedResults((prev) => {
          // remove previous gemini result
          const existing = prev.filter((r) => r.model !== 'gemini');
          return [...existing, { model: 'gemini', text: result }];
        });
      }
      console.log('Gemini result:', result);
      return result;
    });
    const claudeResultPromise = generateBedrockResponse({
      prompt: message,
      html: documentContent,
    }).then((result) => {
      if (result) {
        setGeneratedResults((prev) => {
          // remove previous claude result
          const existing = prev.filter((r) => r.model !== 'claude');
          return [...existing, { model: 'claude', text: result }];
        });
      }
      console.log('Claude result:', result);
      return result;
    });

    await Promise.all([geminiResultPromise, claudeResultPromise]);

    // setDocumentContent(result);
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

  useEffect(() => {
    if (generatedResults.length > 0) {
      const lastResult = generatedResults[generatedResults.length - 1];
      const lastResultText = lastResult.text;
      setDocumentContent(lastResultText);
      setCurrentModel(lastResult.model as 'claude' | 'gemini');
    } else {
      setDocumentContent(originalDocument ?? '');
      setCurrentModel(null);
    }
  }, [generatedResults]);

  useEffect(() => {
    if (currentModel === 'gemini') {
      setDocumentContent(
        generatedResults.find((r) => r.model === 'gemini')?.text ?? '',
      );
    } else if (currentModel === 'claude') {
      setDocumentContent(
        generatedResults.find((r) => r.model === 'claude')?.text ?? '',
      );
    } else {
      setDocumentContent(originalDocument ?? '');
    }
  }, [currentModel]);

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
      <div className='flex flex-grow flex-col gap-4 lg:flex-col'>
        {/* Customization Panel */}
        <CustomDocEditor
          handleCommandSubmit={handleCommandSubmit}
          setShowOriginalContent={setShowOriginalContent}
          showOriginalContent={showOriginalContent}
          documentContent={documentContent}
          setDocumentContent={setDocumentContent}
        />
        {/* Document Viewer */}
        <div className='relative my-4 rounded-lg shadow-lg overflow-hidden box'>
          <div className='ribbon'>
            {isOriginal || showOriginalContent ? `Original` : `Customized`}
          </div>
          <div className='absolute top-0 right-0 p-5 z-50'>
            <TabGroup
              hidden={showOriginalContent}
              onChange={(index) => {
                setCurrentModel(index === 0 ? 'gemini' : 'claude');
              }}
              selectedIndex={currentModel === 'gemini' ? 0 : 1}
            >
              <TabList className='flex gap-4'>
                <Tab
                  hidden={!generatedResults.some((r) => r.model === 'gemini')}
                  className='rounded-full py-1 px-3 text-sm/6 font-semibold text-gray-700 focus:outline-none data-[selected]:bg-gray-200 data-[hover]:bg-gray-100 data-[selected]:data-[hover]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-gray-700'
                >
                  Gemini
                </Tab>
                <Tab
                  hidden={!generatedResults.some((r) => r.model === 'claude')}
                  className='rounded-full py-1 px-3 text-sm/6 font-semibold text-gray-700 focus:outline-none data-[selected]:bg-gray-200 data-[hover]:bg-gray-100 data-[selected]:data-[hover]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-gray-700'
                >
                  Claude
                </Tab>
              </TabList>
            </TabGroup>
          </div>
          <HtmlIframe
            loading={loading}
            htmlString={
              showOriginalContent ? (originalDocument ?? '') : documentContent
            }
          />
        </div>
      </div>
    </div>
  );
}
