import { Input } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

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
  'Comic Sans MS',
  'Helvetica',
];

const lineOptions = ['1.0', '1.15', '1.2', '1.5', '1.8', '2.0', '2.5'];

const borderStyles = ['none', 'solid', 'dashed', 'dotted'];
const shadowStyles = ['none', 'small', 'medium', 'large'];

export default function CustomDocEditor({
  handleCommandSubmit,
  setShowOriginalContent,
  showOriginalContent,
  documentContent,
  setDocumentContent,
  resetCustomizations,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  fontType,
  setFontType,
  lineHeight,
  setLineHeight,
  fontStyle,
  setFontStyle,
  headingAlignment,
  setHeadingAlignment,
  borderStyle,
  setBorderStyle,
  borderColor,
  setBorderColor,
  boxShadow,
  setBoxShadow,
}: {
  handleCommandSubmit: (message: string) => Promise<void>;
  setShowOriginalContent: Dispatch<SetStateAction<boolean>>;
  showOriginalContent: boolean;
  documentContent: string;
  setDocumentContent: Dispatch<SetStateAction<string>>;
  resetCustomizations: () => void;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  fontType: string;
  setFontType: Dispatch<SetStateAction<string>>;
  lineHeight: string;
  setLineHeight: Dispatch<SetStateAction<string>>;
  fontStyle: 'normal' | 'italic' | 'bold' | 'strong';
  setFontStyle: Dispatch<
    SetStateAction<'normal' | 'italic' | 'bold' | 'strong'>
  >;
  headingAlignment: 'left' | 'center' | 'right' | 'justify';
  setHeadingAlignment: Dispatch<
    SetStateAction<'left' | 'center' | 'right' | 'justify'>
  >;
  borderStyle: string;
  setBorderStyle: Dispatch<SetStateAction<string>>;
  borderColor: string;
  setBorderColor: Dispatch<SetStateAction<string>>;
  boxShadow: string;
  setBoxShadow: Dispatch<SetStateAction<string>>;
}) {
  const handleStyleChange = (
    styleType: string,
    value: string,
    setState: Dispatch<SetStateAction<string>>,
    elementSelector: string,
    styleKey: string,
  ) => {
    setState(value);
    updateStyles(elementSelector, { [styleKey]: value });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
    updateStyles('p, li, span, div', { fontSize: `${value}px` });
    updateStyles('h1, h2, h3, h4, h5, h6', { fontSize: `${value}px` });
  };

  const handleHeadingAlignment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const styleAlign = e.target.value as
      | 'left'
      | 'center'
      | 'right'
      | 'justify';
    setHeadingAlignment(styleAlign);
    updateStyles('h1, h2, h3, h4, h5, h6', { textAlign: styleAlign });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    updateStyles('h1, h2, h3, h4, h5, h6', { color });
  };

  const handleFontTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontInput = e.target.value;
    setFontType(fontInput);
    updateStyles('h1, h2, h3, h4, h5, h6, p, li, span, div', {
      fontFamily: fontInput,
    });
  };

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lineInput = e.target.value;
    setLineHeight(lineInput);
    updateStyles('p, li, span, div', { lineHeight: lineInput });
    updateStyles('h1, h2, h3, h4, h5, h6', { lineHeight: lineInput });
  };

  const handleFontStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const style = e.target.value as 'normal' | 'italic' | 'bold' | 'strong';
    setFontStyle(style);
    updateStyles('h1, h2, h3, h4, h5, h6', {
      fontWeight: style === 'bold' ? 'bold' : 'normal',
      fontStyle: style === 'italic' ? 'italic' : 'normal',
    });
  };

  const handleBorderStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const style = e.target.value;
    setBorderStyle(style);
    updateStyles('table', { borderStyle: style });
  };

  const handleBorderColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setBorderColor(color);
    updateStyles('table', { borderColor: color });
  };

  const handleBoxShadowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shadow = e.target.value;
    setBoxShadow(shadow);
    updateStyles('table', { boxShadow: getShadowStyle(shadow) });
  };

  // Helper functions for style updating
  const updateStyles = (
    selector: string,
    styles: { [key: string]: string },
  ) => {
    let updatedDocument = documentContent;
    const docElement = new DOMParser().parseFromString(
      documentContent,
      'text/html',
    );
    const elements: NodeListOf<HTMLElement> =
      docElement.querySelectorAll(selector);
    elements.forEach((el) => {
      Object.assign(el.style, styles);
    });
    updatedDocument = docElement.documentElement.outerHTML;
    setDocumentContent(updatedDocument);
  };

  const getShadowStyle = (shadow: string): string => {
    const shadows: { [key: string]: string } = {
      small: '0 1px 3px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
      large: '0 10px 20px rgba(0, 0, 0, 0.1)',
      none: 'none',
    };
    return shadows[shadow] || 'none';
  };

  return (
    <div className='max-w-7xl'>
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
              className='ml-4 p-2 border border-gray-300 rounded'
            />
          </label>
          <label>
            Font Type
            <select
              value={fontType}
              onChange={handleFontTypeChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '8rem' }}
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
              style={{ width: '8rem' }}
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
              className='ml-4 p-2 border border-gray-300 rounded'
            />
          </label>
          <label>
            Heading Font Style
            <select
              value={fontStyle}
              onChange={handleFontStyleChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '8rem' }}
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
              style={{ width: '8rem' }}
            >
              <option value='left'>Left</option>
              <option value='center'>Center</option>
              <option value='right'>Right</option>
              <option value='justify'>Justify</option>
            </select>
          </label>
          <label>
            Border Style
            <select
              value={borderStyle}
              onChange={handleBorderStyleChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '8rem' }}
            >
              {borderStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>
          <label>
            Border Color
            <Input
              type='text'
              value={borderColor}
              onChange={handleBorderColorChange}
              placeholder='e.g., red'
              className='ml-4 p-2 border border-gray-300 rounded'
            />
          </label>
          <label>
            Table Box Shadow
            <select
              value={boxShadow}
              onChange={handleBoxShadowChange}
              className='ml-4 p-2 border border-gray-300 rounded'
              style={{ width: '8rem' }}
            >
              {shadowStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ChatInput onSend={handleCommandSubmit} />
      </div>
    </div>
  );
}
