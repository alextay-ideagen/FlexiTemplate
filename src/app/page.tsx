'use client';

import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
// import Logo from '~/svg/Logo.svg';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
      <Image
        src={`/images/landing.png`}
        alt='Logo'
        className='rounded-lg'
        width={200}
        height={200}
      />

      <h1 className='mt-4 text-2xl font-bold text-gray-900'>
        Document Stylist
      </h1>
      <p className='mt-2 text-base text-gray-700 max-w-lg'>
        Revolutionizing document formatting with AI-powered styling. Customize
        templates, ensure brand consistency, and export professional PDFs
        effortlessly.
      </p>

      <div className='mt-6 flex flex-col items-center space-y-4'>
        <ButtonLink
          className='px-6 py-3 text-lg'
          href='/list'
          variant='primary'
        >
          Try Document Stylist
        </ButtonLink>
        <ArrowLink href='https://github.com/alextay-ideagen/DocumentStylist'>
          View the GitHub Repository
        </ArrowLink>
      </div>

      <div className='mt-8 flex flex-col items-center space-y-2 text-sm text-gray-600'>
        <p>Key Features:</p>
        <ul className='list-disc text-left'>
          <li>AI-powered style recommendations</li>
          <li>Support customization using natual language</li>
          <li>Multi-version previews</li>
        </ul>
      </div>

      {/* 
      <UnstyledLink
        href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
        className='mt-6'
      >
        <img
          width='92'
          height='32'
          src='https://vercel.com/button'
          alt='Deploy with Vercel'
        />
      </UnstyledLink> */}
    </div>
  );
}
