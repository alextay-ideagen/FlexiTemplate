import path from 'path';
import { promises as fs } from 'fs';

import CustomiserPanel from '@/app/(customiser)/document/[title]/CustomiserPanel';

export default async function DocumentPage({
  params,
}: {
  params: { title: string };
}) {
  const title = params.title;
  const filePath = path.join(
    process.cwd(),
    'public',
    'template',
    `${title}.html`,
  );
  const fileContent = await fs.readFile(filePath, 'utf8');
  return <CustomiserPanel originalDocument={fileContent} title={title} />;
}
