import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Bang Industries',
  description: 'Explanation design services for complex systems. Visual audits, explanation design, and interactive systems. From quick sprints to full interactive builds.',
  alternates: {
    canonical: 'https://bangindustries.co/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
