import { Metadata } from 'next';
import { getSignUpMetadata } from '@/lib/metadata';

export const metadata: Metadata = getSignUpMetadata();

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}