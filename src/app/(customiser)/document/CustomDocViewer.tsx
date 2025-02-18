'use client';

import CustomDocumentEditor from '@/app/(customiser)/document/CustomDocEditor';
import { useEffect, useMemo, useState } from 'react';
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

  // State for holding document content and style
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [textColor, setTextColor] = useState('black'); // Default text color

  // Fetch HTML content
  useEffect(() => {
    fetch('/template/AccessPolicy.html')
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error('Error loading HTML content:', error);
      });
  }, []);

  // Function to update styles (font size and text color)
  const handleUpdateDocument = (newFontSize: number, newTextColor: string) => {
    setFontSize(newFontSize);
    setTextColor(newTextColor);
  };

  if (typeof window === 'undefined' || documentUri === undefined) {
    return null;
  }

  // Apply styles dynamically to the preview
  const previewStyle = {
    fontSize: `${fontSize}px`,
    color: textColor,
  };

  return (
    <div>
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

      {/* Pass down the handleUpdateDocument function to the editor */}
      {/* <CustomDocumentEditor onUpdateDocument={handleUpdateDocument} /> */}
    </div>
  );
};

export default CustomDocViewer;
