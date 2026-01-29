import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact  - Bang Industries',
  description: 'Get in touch about data visualisation, explanation design, or scientific illustration projects. Based in St Leonards-on-Sea, UK.',
  alternates: {
    canonical: 'https://bangindustries.co/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
