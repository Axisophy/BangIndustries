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
      {/* Hero text */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 py-16 md:py-24 lg:py-32'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
          Making complex concepts comprehensible
        </h1>
      </section>

      {/* Emergent Currents */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/emergent-currents' className='block group'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full aspect-video bg-black object-cover'
          >
            <source src='/video/flow_fields.mp4' type='video/mp4' />
          </video>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Emergent Currents
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Particles tracing a divergence-free noise field
          </p>
        </Link>
      </section>

      {/* Morphogenesis */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/morphogenesis' className='block group'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full aspect-video bg-black object-cover'
          >
            <source src='/video/reaction_diffusion.mp4' type='video/mp4' />
          </video>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Morphogenesis
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Watching Turing patterns emerge from reaction and diffusion
          </p>
        </Link>
      </section>

      {/* Stellar Cartography */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/stellar-cartography' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Stellar Cartography
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            50,000 stars from the Gaia catalogue, two views of the same data
          </p>
        </Link>
      </section>

      {/* The Forbidden Orbits */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/asteroid-belt' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            The Forbidden Orbits
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            100,000 asteroids reveal the invisible hand of Jupiter&apos;s gravity
          </p>
        </Link>
      </section>

      {/* The Chirp */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/gravitational-wave' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            The Chirp
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            How LIGO found a whisper from 1.3 billion years ago
          </p>
        </Link>
      </section>

      {/* Peeling Back the Sun */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/solar-wavelength' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Peeling Back the Sun
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            The same star, seen in ten different lights
          </p>
        </Link>
      </section>

      {/* Shadows of Other Worlds */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/exoplanet-transit' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Shadows of Other Worlds
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Five thousand planets, discovered by the shadows they cast
          </p>
        </Link>
      </section>

      {/* Seismic Anatomy */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/seismic-anatomy' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            Listening to the Earth&apos;s Interior
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            How earthquakes reveal the hidden structure of our planet
          </p>
        </Link>
      </section>

      {/* Cosmic Distance Ladder */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/cosmic-distance-ladder' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            How Far is Far?
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Climbing the cosmic distance ladder from parallax to the Hubble tension
          </p>
        </Link>
      </section>

      {/* Radioactive Decay Chain */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <Link href='/work/decay-chain' className='block group'>
          <div className='w-full aspect-video bg-black' />
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mt-8 group-hover:text-[var(--color-blue)] transition-colors'>
            4.5 Billion Years in 14 Steps
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl font-normal text-white/70 mt-4'>
            Following uranium-238 through radioactive decay to stable lead
          </p>
        </Link>
      </section>
    </main>
  );
}
