import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bang Industries — Data Visualisation & Explanation Design',
  description: 'Design studio specialising in data visualisation, scientific illustration, and explanation design. We make complex ideas clear and visually extraordinary.',
  alternates: {
    canonical: 'https://bangindustries.co',
  },
};

export default function Home() {
  return (
    <main className='min-h-screen'>
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/emergent-currents' className='block group'>
          {/* Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full aspect-video bg-black object-cover'
          >
            <source src='/video/flow_fields.mp4' type='video/mp4' />
          </video>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Emergent Currents
          </h1>

          {/* Subtitle */}
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Particles tracing a divergence-free noise field
          </p>
        </Link>
      </section>
    </main>
  );
}
