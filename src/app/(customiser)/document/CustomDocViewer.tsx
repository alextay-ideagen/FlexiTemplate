'use client';

import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

function CustomDocViewer() {
  const docs = [
    { uri: '/template/AccessPolicy.html' }, // Local File
  ];
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <DocViewer
      className='min-h-[calc(100vh-300px)]'
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    />
  );
}

export default CustomDocViewer;
