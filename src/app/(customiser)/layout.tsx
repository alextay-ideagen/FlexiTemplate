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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-full w-full'>
      <Disclosure as='nav' className='bg-gray-100'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <UnstyledLink href='/'>
                <div className='shrink-0 h-10 w-48 relative'>
                  <Image
                    alt='Your Company'
                    src='https://www.complispace.com.au/hs-fs/hubfs/Ideagen_Product_Logos_Horz_Helix_2023_OUTLINE_CompliSpace%20(1)-1.png?width=247&height=50&name=Ideagen_Product_Logos_Horz_Helix_2023_OUTLINE_CompliSpace%20(1)-1.png'
                    fill
                  />
                </div>
              </UnstyledLink>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  {navigation.map((item) => {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-black'
                            : 'text-gray-700 hover:bg-gray-300 hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='-mr-2 flex md:hidden'>
              {/* Mobile menu button */}
              <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open main menu</span>
                <MenuIcon
                  aria-hidden='true'
                  className='block size-6 group-data-open:hidden'
                />
                <SidebarCloseIcon
                  aria-hidden='true'
                  className='hidden size-6 group-data-open:block'
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className='md:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
            {navigation.map((item) => {
              return (
                <DisclosureButton
                  key={item.name}
                  as='a'
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {children}
    </div>
  );
}
