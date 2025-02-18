'use client';

import { useMemo } from 'react';
import DocViewer, { HTMLRenderer, DocViewerRenderers } from 'react-doc-viewer';

interface CustomDocViewerProps {
  documentContent?: string;
}

const CustomDocViewer: React.FC<CustomDocViewerProps> = ({
  documentContent,
}) => {
  const documentUri = useMemo(() => {
    if (documentContent) {
      const blob = new Blob([documentContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      return url;
    } else {
      return undefined;
    }
  }, [documentContent]);

  if (typeof window === 'undefined' || documentUri === undefined) {
    return null;
  }

  return (
    <DocViewer
      config={{ header: { disableHeader: true } }}
      className='min-h-[calc(100vh-300px)]'
      documents={[{ uri: documentUri, fileType: 'html' }]}
      pluginRenderers={DocViewerRenderers}
      // pluginRenderers={[HTMLRenderer]}
      // theme={{
      //   primary: '#5296d8',
      //   secondary: '#ffffff',
      //   tertiary: '#5296d899',
      //   text_primary: '#ffffff',
      //   text_secondary: '#5296d8',
      //   text_tertiary: '#00000099',
      //   disableThemeScrollbar: false,
      // }}
    />
  );
};

export default CustomDocViewer;
