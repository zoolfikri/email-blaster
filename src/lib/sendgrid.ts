import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface EmailRecipient {
  email: string;
  name?: string;
  [key: string]: string | undefined; // Allow additional dynamic fields
}

export async function sendBulkEmails(
  recipients: EmailRecipient[],
  subject: string,
  content: string,
  fromEmail?: string
) {
  const from = fromEmail || process.env.SENDGRID_FROM_EMAIL;
  
  if (!from) {
    throw new Error('SENDGRID_FROM_EMAIL is not set');
  }

  // Process each recipient with personalization
  const messages = recipients.map((recipient) => {
    // Replace dynamic variables in subject and content
    let personalizedSubject = subject;
    let personalizedContent = content;
    
    // Replace {{name}} and other dynamic variables
    Object.keys(recipient).forEach((key) => {
      const value = recipient[key] || '';
      const regex = new RegExp(`{{${key}}}`, 'g');
      personalizedSubject = personalizedSubject.replace(regex, value);
      personalizedContent = personalizedContent.replace(regex, value);
    });
    
    return {
      to: recipient.email,
      from,
      subject: personalizedSubject,
      html: personalizedContent,
    };
  });

  try {
    const results = await sgMail.send(messages);
    return { success: true, count: recipients.length, results };
  } catch (error) {
    console.error('SendGrid Error:', error);
    throw error;
  }
}
