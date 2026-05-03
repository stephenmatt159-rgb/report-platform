import { Metadata } from 'next';
import { getSignInMetadata } from '@/lib/metadata';

export const metadata: Metadata = getSignInMetadata();

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}