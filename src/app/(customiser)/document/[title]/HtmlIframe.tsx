import { useEffect, useRef } from 'react';

const HtmlIframe = ({ htmlString }: { htmlString: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlString; // Set HTML string to iframe's srcdoc
    }
  }, [htmlString]);
  return (
    <iframe
      ref={iframeRef}
      width='100%'
      height='600'
      title='Custom HTML Iframe'
      style={{
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: '#fff',
      }}
    ></iframe>
  );
};

export default HtmlIframe;
