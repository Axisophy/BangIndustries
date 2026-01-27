'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganisation: ${formData.organisation}\nInterested in: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:studio@bangindustries.co?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className='min-h-screen bg-white'>
      {/* Main Content */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          {/* Left column - intro */}
          <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-8'>
              Get in touch
            </h1>
            <p className='text-black/60 mb-8'>
              Have a project in mind? Tell me what you&apos;re working on
              and we&apos;ll find a time to talk.
            </p>

            <div className='space-y-8 text-sm'>
              <div>
                <span className='font-mono text-black/40 block mb-1'>Email</span>
                <a
                  href='mailto:studio@bangindustries.co'
                  className='text-[var(--color-blue)] hover:text-black transition-colors'
                >
                  studio@bangindustries.co
                </a>
              </div>
              <div>
                <span className='font-mono text-black/40 block mb-1'>Location</span>
                <span>St Leonards-on-Sea, UK</span>
              </div>
            </div>
          </div>

          {/* Right column - form */}
          <div>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div>
                <label htmlFor='name' className='block text-sm font-mono text-black/60 mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors'
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-mono text-black/60 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors'
                />
              </div>

              <div>
                <label htmlFor='organisation' className='block text-sm font-mono text-black/60 mb-2'>
                  Organisation
                </label>
                <input
                  type='text'
                  id='organisation'
                  name='organisation'
                  value={formData.organisation}
                  onChange={handleChange}
                  className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors'
                />
              </div>

              <div>
                <label htmlFor='projectType' className='block text-sm font-mono text-black/60 mb-2'>
                  What are you interested in?
                </label>
                <select
                  id='projectType'
                  name='projectType'
                  value={formData.projectType}
                  onChange={handleChange}
                  className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors appearance-none'
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' fill-opacity='0.4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value=''>Select an option</option>
                  <option value='audit'>Visual Audit + Redesign Sprint</option>
                  <option value='explanation'>Explanation Design</option>
                  <option value='interactive'>Interactive System</option>
                  <option value='retainer'>Ongoing relationship / Retainer</option>
                  <option value='other'>Something else</option>
                </select>
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-mono text-black/60 mb-2'>
                  Tell me about your project
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='What are you trying to communicate? Who needs to understand it? Any constraints?'
                  className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors resize-none placeholder:text-black/30'
                />
              </div>

              <button
                type='submit'
                className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors'
              >
                Send message <span aria-hidden='true'>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Response time note */}
      <section className='px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20'>
        <p className='text-sm text-black/40 max-w-md'>
          I typically respond within 1-2 working days. If your project is urgent,
          mention it in your message.
        </p>
      </section>
    </main>
  );
}
