import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MenuIcon, SidebarCloseIcon } from 'lucide-react';
import Image from 'next/image';

import UnstyledLink from '@/components/links/UnstyledLink';

import DocumentList from '@/app/(customiser)/list/list';

const navigation = [
  { name: 'Dashboard', href: '/list', current: true },
  { name: 'Customiser', href: '#', current: false },
];
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DocListPage() {
  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          {/* Your content */}
          <DocumentList />
        </div>
      </main>
    </>
  );
}
