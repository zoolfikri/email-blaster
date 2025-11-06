import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { sendBulkEmails, type EmailRecipient } from '@/lib/sendgrid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipients, subject, content } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Recipients array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRecipients: EmailRecipient[] = recipients.filter((r) =>
      emailRegex.test(r.email)
    );

    if (validRecipients.length === 0) {
      return NextResponse.json(
        { error: 'No valid email addresses found' },
        { status: 400 }
      );
    }

    const result = await sendBulkEmails(validRecipients, subject, content);

    return NextResponse.json({
      success: true,
      message: `Successfully sent ${result.count} emails`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
