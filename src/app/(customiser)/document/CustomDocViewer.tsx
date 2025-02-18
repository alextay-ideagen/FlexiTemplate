'use client';

import { useEffect, useState } from 'react';
import DocViewer, { HTMLRenderer } from 'react-doc-viewer';

interface CustomDocViewerProps {
  documentContent?: string;
}

const CustomDocViewer: React.FC<CustomDocViewerProps> = ({
  documentContent,
}) => {
  const [documentUri, setDocumentUri] = useState<string | null>(null);

  useEffect(() => {
    if (documentContent) {
      const blob = new Blob([documentContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setDocumentUri(url);

      // Clean up the URL object when the component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [documentContent]);

  if (typeof window === 'undefined' || documentContent === undefined) {
    return null;
  }

  return (
    <DocViewer
      config={{ header: { disableHeader: true } }}
      className='min-h-[calc(100vh-300px)]'
      documents={documentUri ? [{ uri: documentUri, fileType: 'html' }] : []}
      pluginRenderers={[HTMLRenderer]}
      theme={{
        primary: '#5296d8',
        secondary: '#ffffff',
        tertiary: '#5296d899',
        text_primary: '#ffffff',
        text_secondary: '#5296d8',
        text_tertiary: '#00000099',
        disableThemeScrollbar: false,
      }}
    />
  );
};

export default CustomDocViewer;
