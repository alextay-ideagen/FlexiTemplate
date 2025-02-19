import { Input } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import ChatInput from '@/app/(customiser)/document/[title]/ChatInput';

const fontOptions = [
  'Arial',
  'Courier New',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Lucida Sans',
  'Comic Sans MS', // Feel free to add more options here
  'Helvetica',
];

const lineOptions = ['1.0', '1.15', '1.2', '1.5', '1.8', '2.0', '2.5'];

export default function CustomDocEditor({
  handleCommandSubmit,
  setShowOriginalContent,
  showOriginalContent,
  documentContent,
  setDocumentContent,
}: {
  handleCommandSubmit: (message: string) => Promise<void>;
  setShowOriginalContent: Dispatch<SetStateAction<boolean>>;
  showOriginalContent: boolean;
  documentContent: string;
  setDocumentContent: Dispatch<SetStateAction<string>>;
}) {
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [textColor, setTextColor] = useState('black'); // Default text color
  const [fontType, setFontType] = useState('Arial'); // Default font type
  const [lineHeight, setLineHeight] = useState('1.15'); // Default line height
  const [fontStyle, setFontStyle] = useState<
    'normal' | 'italic' | 'bold' | 'strong'
  >('normal'); // Default font style
  const [headingAlignment, setHeadingAlignment] = useState<
    'left' | 'center' | 'right' | 'justify'
  >('left'); // Default heading alignment

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
    updateHeadingStyles({ fontSize: `${value}px` });
    updateContentStyles({ fontSize: `${value}px` });
  };

  const handleHeadingAlignment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const styleAlign = e.target.value as
      | 'left'
      | 'center'
      | 'right'
      | 'justify';
    setHeadingAlignment(styleAlign);
    updateHeadingStyles({
      textAlign: styleAlign,
      headingAlignment: styleAlign,
    });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    updateHeadingStyles({ color });
  };

  const handleFontTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontInput = e.target.value;
    setFontType(fontInput);
    updateHeadingStyles({ fontFamily: fontInput });
    updateContentStyles({ fontFamily: fontInput });
  };

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lineInput = e.target.value;
    setLineHeight(lineInput);
    updateHeadingStyles({ lineHeight: lineInput });
    updateContentStyles({ lineHeight: lineInput });
  };

  const handleFontStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const style = e.target.value as 'normal' | 'italic' | 'bold' | 'strong';
    setFontStyle(style);
    updateHeadingStyles({
      fontWeight: style === 'bold' ? 'bold' : 'normal',
      fontStyle: style === 'italic' ? 'italic' : 'normal',
    });
  };

  const updateHeadingStyles = (newStyles: { [key: string]: string }) => {
    let updatedDocument = documentContent;
    const docElement = new DOMParser().parseFromString(
      documentContent,
      'text/html',
    );

    // Apply styles to all heading tags (h1, h2, h3, etc.)
    const headingTags: NodeListOf<HTMLElement> = docElement.querySelectorAll(
      'h1, h2, h3, h4, h5, h6',
    );
    headingTags.forEach((headingTag) => {
      Object.keys(newStyles).forEach((key) => {
        headingTag.style[key as any] = newStyles[key];
      });
    });

    // Convert back to string
    updatedDocument = docElement.documentElement.outerHTML;
    setDocumentContent(updatedDocument);
  };

  const updateContentStyles = (newStyles: { [key: string]: string }) => {
    let updatedDocument = documentContent;
    const docElement = new DOMParser().parseFromString(
      documentContent,
      'text/html',
    );

    // Apply styles to all paragraph and text elements
    const textTags = docElement.querySelectorAll('p, li, span, div');
    textTags.forEach((textTag) => {
      Object.keys(newStyles).forEach((key) => {
        textTag.style[key as any] = newStyles[key];
      });
    });

    // Convert back to string
    updatedDocument = docElement.documentElement.outerHTML;
    setDocumentContent(updatedDocument);
  };

  return (
    <div className='max-w-7xl'>
      {/* Right: Customization Panel */}
      <div className='p-4 bg-white shadow-lg rounded-lg'>
        <h2 className='text-lg font-semibold mb-2'>Customization</h2>
        <div className='flex flex-col gap-4 p-4'>
          <label>
            Font Size
            <Input
              type='number'
              value={fontSize}
              onChange={handleFontSizeChange}
              placeholder='e.g., 16'
              style={{ marginLeft: '1.5rem' }}
            />
          </label>
          <label>
            Font Type
            <select
              value={fontType}
              onChange={handleFontTypeChange}
              className='ml-4 p-2 border border-gray-300 rounded'
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </label>
          <label>
            Paragraph Line Height
            <select
              value={lineHeight}
              onChange={handleLineHeightChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '6rem' }}
            >
              {lineOptions.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>
          </label>
          <label>
            Heading Text Color
            <Input
              type='text'
              value={textColor}
              onChange={handleTextColorChange}
              placeholder='e.g., blue'
              className='ml-4'
            />
          </label>
          <label>
            Heading Font Style
            <select
              value={fontStyle}
              onChange={handleFontStyleChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '6rem' }}
            >
              <option value='normal'>Normal</option>
              <option value='italic'>Italic</option>
              <option value='bold'>Bold</option>
              <option value='strong'>Strong</option>
            </select>
          </label>
          <label>
            Heading Alignment
            <select
              value={headingAlignment}
              onChange={handleHeadingAlignment}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '6rem' }}
            >
              <option value='left'>Left</option>
              <option value='center'>Center</option>
              <option value='right'>Right</option>
              <option value='justify'>Justify</option>
            </select>
          </label>
        </div>
        <ChatInput onSend={handleCommandSubmit} />
      </div>
    </div>
  );
}
