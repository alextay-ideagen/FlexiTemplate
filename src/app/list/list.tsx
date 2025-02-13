import Image from 'next/image';

const docList = [
  {
    title: 'Child Safe Program',
    author: 'Leslie Alexander',
    status: 'Draft',
    thumbnail:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: '3h ago',
    lastOpenedDateTime: '2023-01-23T13:23Z',
  },
  {
    title: 'Risk Management Program',
    author: 'Michael Foster',
    status: 'Published',
    thumbnail:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: '3h ago',
    lastOpenedDateTime: '2023-01-23T13:23Z',
  },
  {
    title: 'Work Health and Safety Program',
    author: 'Dries Vincent',
    status: 'Review',
    thumbnail:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: null,
  },
  {
    title: 'Work Safe Policies',
    author: 'Lindsay Walton',
    status: 'Draft',
    thumbnail:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: '3h ago',
    lastOpenedDateTime: '2023-01-23T13:23Z',
  },
  {
    title: 'Child Protection Program',
    author: 'Courtney Henry',
    status: 'Approved',
    thumbnail:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: '3h ago',
    lastOpenedDateTime: '2023-01-23T13:23Z',
  },
  {
    title: 'Staff Code of Conduct',
    author: 'Tom Cook',
    status: 'In Progress',
    thumbnail:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastOpened: null,
  },
];

export default function DocumentList() {
  return (
    <ul role='list' className='divide-y divide-gray-100'>
      {docList.map((document) => (
        <li key={document.title} className='flex justify-between gap-x-6 py-5'>
          <div className='flex min-w-0 gap-x-4'>
            <Image
              width='48'
              height='48'
              alt=''
              src={document.thumbnail}
              className='size-12 flex-none rounded-full bg-gray-50'
            />
            <div className='min-w-0 flex-auto'>
              <p className='text-sm/6 font-semibold text-gray-900'>
                {document.title}
              </p>
              <p className='mt-1 truncate text-xs/5 text-gray-500'>
                {document.author}
              </p>
            </div>
          </div>
          <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
            <p className='text-sm/6 text-gray-900'>{document.status}</p>
            {document.lastOpenedDateTime ? (
              <p className='mt-1 text-xs/5 text-gray-500'>
                Last seen{' '}
                <time dateTime={document.lastOpenedDateTime}>
                  {document.lastOpenedDateTime}
                </time>
              </p>
            ) : (
              <div className='mt-1 flex items-center gap-x-1.5'>
                <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                  <div className='size-1.5 rounded-full bg-emerald-500' />
                </div>
                <p className='text-xs/5 text-gray-500'>Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
