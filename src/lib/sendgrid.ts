import sgMail from '@sendgrid/mail';
import { createEvent, type EventAttributes } from 'ics';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface EmailRecipient {
  email: string;
  name?: string;
  [key: string]: string | undefined; // Allow additional dynamic fields
}

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  organizerEmail: string;
  organizerName?: string;
}

function createCalendarInvitation(event: CalendarEvent, recipientEmail: string): string | null {
  // Convert dates to GMT+7 (Asia/Jakarta timezone)
  // The dates come in as local time, we need to ensure they're interpreted as GMT+7
  const startArray: [number, number, number, number, number] = [
    event.startDate.getFullYear(),
    event.startDate.getMonth() + 1,
    event.startDate.getDate(),
    event.startDate.getHours(),
    event.startDate.getMinutes(),
  ];

  const endArray: [number, number, number, number, number] = [
    event.endDate.getFullYear(),
    event.endDate.getMonth() + 1,
    event.endDate.getDate(),
    event.endDate.getHours(),
    event.endDate.getMinutes(),
  ];

  const eventAttributes: EventAttributes = {
    start: startArray,
    startInputType: 'local',
    startOutputType: 'local',
    end: endArray,
    endInputType: 'local',
    endOutputType: 'local',
    title: event.title,
    description: event.description,
    location: event.location,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: {
      name: event.organizerName || 'Event Organizer',
      email: event.organizerEmail,
    },
    attendees: [
      {
        name: recipientEmail.split('@')[0],
        email: recipientEmail,
        rsvp: true,
        partstat: 'NEEDS-ACTION',
        role: 'REQ-PARTICIPANT',
      },
    ],
  };

  try {
    const { error, value } = createEvent(eventAttributes);
    if (error) {
      console.error('Error creating calendar event:', error);
      return null;
    }
    
    // Add timezone information to the ICS content
    if (value) {
      // Insert VTIMEZONE component for Asia/Jakarta (GMT+7)
      const timezoneData = `BEGIN:VTIMEZONE
TZID:Asia/Jakarta
BEGIN:STANDARD
DTSTART:19700101T000000
TZOFFSETFROM:+0700
TZOFFSETTO:+0700
TZNAME:WIB
END:STANDARD
END:VTIMEZONE`;
      
      // Insert timezone after VCALENDAR line and add TZID to DTSTART/DTEND
      const lines = value.split('\n');
      const modifiedLines = [];
      
      for (let i = 0; i < lines.length; i++) {
        modifiedLines.push(lines[i]);
        
        // Add timezone definition after BEGIN:VCALENDAR
        if (lines[i].includes('BEGIN:VCALENDAR')) {
          modifiedLines.push(timezoneData);
        }
        
        // Add TZID parameter to DTSTART and DTEND
        if (lines[i].startsWith('DTSTART:')) {
          const dateValue = lines[i].split(':')[1];
          modifiedLines[modifiedLines.length - 1] = `DTSTART;TZID=Asia/Jakarta:${dateValue}`;
        }
        if (lines[i].startsWith('DTEND:')) {
          const dateValue = lines[i].split(':')[1];
          modifiedLines[modifiedLines.length - 1] = `DTEND;TZID=Asia/Jakarta:${dateValue}`;
        }
      }
      
      return modifiedLines.join('\n');
    }
    
    return null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

export async function sendBulkEmails(
  recipients: EmailRecipient[],
  subject: string,
  content: string,
  fromEmail?: string,
  calendarEvent?: CalendarEvent
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
    
    interface MessageWithAttachment {
      to: string;
      from: string;
      subject: string;
      html: string;
      attachments?: Array<{
        content: string;
        filename: string;
        type: string;
        disposition: string;
      }>;
    }

    const message: MessageWithAttachment = {
      to: recipient.email,
      from,
      subject: personalizedSubject,
      html: personalizedContent,
    };

    // Add calendar invitation if provided
    if (calendarEvent) {
      const icsContent = createCalendarInvitation(calendarEvent, recipient.email);
      if (icsContent) {
        message.attachments = [
          {
            content: Buffer.from(icsContent).toString('base64'),
            filename: 'invite.ics',
            type: 'text/calendar',
            disposition: 'attachment',
          },
        ];
      }
    }
    
    return message;
  });

  try {
    const results = await sgMail.send(messages);
    return { success: true, count: recipients.length, results };
  } catch (error) {
    console.error('SendGrid Error:', error);
    throw error;
  }
}
