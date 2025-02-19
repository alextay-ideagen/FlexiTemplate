import { useEffect, useRef } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const HtmlIframe = ({
  htmlString,
  loading,
}: {
  htmlString: string;
  loading: boolean;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlString; // Set HTML string to iframe's srcdoc
    }
  }, [htmlString]);
  return (
    <div className='relative shadow-2xl border-2 border-gray-200'>
      <div
        hidden={!loading}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      >
        <HashLoader color='#154734' />
      </div>
      <iframe
        ref={iframeRef}
        width='100%'
        height='600'
        title='Custom HTML Iframe'
        className='bg-slate-50'
        style={{
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      ></iframe>
    </div>
  );
};

export default HtmlIframe;
