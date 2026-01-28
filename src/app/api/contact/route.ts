import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organisation, interest, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check for API key at runtime
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Bang Industries <notifications@bangindustries.co>',
      to: 'studio@bangindustries.co',
      subject: `New enquiry from ${name}${organisation ? ` (${organisation})` : ''}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Organisation: ${organisation || 'Not provided'}
Interested in: ${interest || 'Not specified'}

Message:
${message}
      `.trim(),
      html: `
<h2>New enquiry from ${name}</h2>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Organisation:</strong> ${organisation || 'Not provided'}</p>
<p><strong>Interested in:</strong> ${interest || 'Not specified'}</p>
<hr />
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br />')}</p>
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
