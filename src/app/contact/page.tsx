'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    interest: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      setFormState('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormState('idle');
    setFormData({
      name: '',
      email: '',
      organisation: '',
      interest: '',
      message: '',
    });
  };

  return (
    <main className='min-h-screen bg-white'>
      {/* Main Content */}
      <section className='px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          {/* Left column - intro */}
          <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-8'>
              Get in touch
            </h1>
            <p className='text-black/70 mb-8'>
              Have a project in mind? Tell me what you&apos;re working on
              and we&apos;ll find a time to talk.
            </p>

            <div className='space-y-8 text-sm'>
              <div>
                <span className='text-xs uppercase tracking-wider text-black/50 block mb-1'>
                  Email
                </span>
                <a
                  href='mailto:studio@bangindustries.co'
                  className='text-[var(--color-blue)] hover:text-black transition-colors'
                >
                  studio@bangindustries.co
                </a>
              </div>
              <div>
                <span className='text-xs uppercase tracking-wider text-black/50 block mb-1'>
                  Location
                </span>
                <span>St Leonards-on-Sea, UK</span>
              </div>
            </div>
          </div>

          {/* Right column - form */}
          <div>
            {formState === 'success' ? (
              <div className='space-y-6'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>Message sent</h2>
                <p className='text-black/70'>
                  Thanks for getting in touch. I&apos;ll get back to you within 1-2 working days.
                </p>
                <button
                  onClick={resetForm}
                  className='text-sm text-[var(--color-blue)] hover:text-black transition-colors'
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-8'>
                {formState === 'error' && (
                  <div className='p-4 bg-[var(--color-pink)]/10 border border-[var(--color-pink)]/20'>
                    <p className='text-sm text-black/70'>
                      Something went wrong. Please try again or email{' '}
                      <a
                        href='mailto:studio@bangindustries.co'
                        className='text-[var(--color-blue)] hover:underline'
                      >
                        studio@bangindustries.co
                      </a>{' '}
                      directly.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor='name' className='block text-sm text-black/70 mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    disabled={formState === 'loading'}
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm text-black/70 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    disabled={formState === 'loading'}
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                </div>

                <div>
                  <label htmlFor='organisation' className='block text-sm text-black/70 mb-2'>
                    Organisation
                  </label>
                  <input
                    type='text'
                    id='organisation'
                    name='organisation'
                    disabled={formState === 'loading'}
                    value={formData.organisation}
                    onChange={handleChange}
                    className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                </div>

                <div>
                  <label htmlFor='interest' className='block text-sm text-black/70 mb-2'>
                    What are you interested in?
                  </label>
                  <select
                    id='interest'
                    name='interest'
                    disabled={formState === 'loading'}
                    value={formData.interest}
                    onChange={handleChange}
                    className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed'
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' fill-opacity='0.4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value=''>Select an option</option>
                    <option value='Visual Audit + Redesign Sprint'>Visual Audit + Redesign Sprint</option>
                    <option value='Explanation Design'>Explanation Design</option>
                    <option value='Interactive System'>Interactive System</option>
                    <option value='Retained relationship'>Retained relationship</option>
                    <option value='Something else'>Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm text-black/70 mb-2'>
                    Tell me about your project
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={5}
                    required
                    disabled={formState === 'loading'}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='What are you trying to communicate? Who needs to understand it? Any constraints?'
                    className='w-full px-4 py-4 border border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors resize-none placeholder:text-black/30 disabled:opacity-50 disabled:cursor-not-allowed'
                  />
                </div>

                <button
                  type='submit'
                  disabled={formState === 'loading'}
                  className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {formState === 'loading' ? 'Sending...' : 'Send message'}
                  {formState !== 'loading' && <span aria-hidden='true'>→</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Response time note */}
      <section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
        <p className='text-sm text-black/50 max-w-md'>
          I typically respond within 1-2 working days. If your project is urgent,
          mention it in your message.
        </p>
      </section>
    </main>
  );
}
