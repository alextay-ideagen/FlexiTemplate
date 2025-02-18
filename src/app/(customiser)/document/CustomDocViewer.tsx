'use client';

import { useEffect, useState } from 'react';

import CustomDocumentEditor from '@/app/(customiser)/document/CustomDocEditor';

function CustomDocViewer() {
  const docs = [
    { uri: '/template/AccessPolicy.html' }, // Local File
  ];

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

  if (typeof window === 'undefined') {
    return null;
  }

  // Apply styles dynamically to the preview
  const previewStyle = {
    fontSize: `${fontSize}px`,
    color: textColor,
  };

  return (
    <div className='flex flex-grow gap-6'>
      {/* Preview the HTML content with applied styles */}
      <div
        className='p-4 bg-white shadow-lg rounded-lg'
        style={previewStyle}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>

      {/* Pass down the handleUpdateDocument function to the editor */}
      <CustomDocumentEditor onUpdateDocument={handleUpdateDocument} />

      {/* DocViewer component for rendering documents */}
      {/* <DocViewer
        className="mt-4"
        documents={docs}
        pluginRenderers={DocViewerRenderers}
      /> */}
    </div>
  );
}

export default CustomDocViewer;
