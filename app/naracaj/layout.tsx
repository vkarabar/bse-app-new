import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/get-page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/naracaj', 'metadata.naracaj.title', 'metadata.naracaj.description');
}

export default function NaracajLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
