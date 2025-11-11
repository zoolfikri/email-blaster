# Email Blaster

A simple email blasting application built with Next.js and SendGrid. Upload an Excel file with email addresses and send bulk emails easily.

## Features

- 📧 Send bulk emails using SendGrid
- 📊 Excel (.xlsx, .xls) upload for recipient lists with dynamic fields
- 📅 **Integrated RSVP tracking** - Recipients respond with one click in their email client
- 📬 Calendar invitation support (.ics attachments) with automatic response tracking
- � Download Excel template
- ✅ Email validation
- 🎨 Modern UI with live preview
- 🔄 Dynamic content personalization ({{name}}, {{company}}, etc.)
- 🔒 Secure API key management
- 📧 Predefined Microsoft event email template with RSVP instructions

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure SendGrid:**
   - Create a SendGrid account at [https://sendgrid.com](https://sendgrid.com)
   - Get your API key from SendGrid dashboard
   - Verify a sender email address in SendGrid

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and add your credentials:
     ```
     SENDGRID_API_KEY=your_sendgrid_api_key_here
     SENDGRID_FROM_EMAIL=your_verified_sender_email@example.com
     ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Download Excel Template:** Click the "Download Template" button to get a sample Excel file.

2. **Prepare your Excel file:** The Excel file should have columns like:
   - `email` (required): The recipient's email address
   - `name` (optional): The recipient's name
   - `company` (optional): Company name
   - `position` (optional): Job position
   - Add any other custom fields for personalization

   Example:
   | email | name | company | position |
   |-------|------|---------|----------|
   | john@example.com | John Doe | Acme Corp | Manager |
   | jane@example.com | Jane Smith | Tech Inc | Director |

3. **Upload Excel:** Click "Upload Recipients (Excel)" and select your Excel file (.xlsx or .xls).

4. **Compose Email:**
   - Click "Load Microsoft Event Template" for a pre-formatted email with calendar invitation, or
   - Enter the email subject manually (use {{name}}, {{company}}, etc. for personalization)
   - Write your email content (HTML is supported, dynamic variables work here too)

5. **Calendar Invitation (Optional):**
   - Check "Include Calendar Invitation" to attach .ics file
   - Fill in event details: title, description, location, start/end times
   - Recipients can add to their calendar and RSVP
   - See [CALENDAR_INVITATION_GUIDE.md](./CALENDAR_INVITATION_GUIDE.md) for details

6. **Preview:** View your email in the live preview panel before sending.

7. **Send:** Click the send button to send personalized emails (with optional calendar invites) to all recipients.

## Dynamic Content & Personalization

Use `{{variableName}}` syntax in your subject and email content to personalize emails:

```
Subject: Hi {{name}}, Invitation from {{company}}

Content: Dear {{name}},

We're excited to invite you as {{position}} at {{company}}...
```

See [DYNAMIC_CONTENT_GUIDE.md](./DYNAMIC_CONTENT_GUIDE.md) for complete documentation.

## Calendar Invitations & RSVP Tracking

Send calendar invitations (.ics files) with **integrated RSVP tracking**:
- Recipients see Accept/Decline/Tentative buttons directly in their email (Outlook, Gmail, Apple Mail)
- **One-click response** - no manual email replies needed
- Automatic tracking in your calendar application
- You receive instant notifications when people respond
- Works seamlessly with Outlook, Google Calendar, Apple Calendar, and more

**Example:** When you send an invitation, recipients in Outlook see Accept/Tentative/Decline buttons at the top of the email. One click adds the event to their calendar AND sends you their response automatically.

See [CALENDAR_INVITATION_GUIDE.md](./CALENDAR_INVITATION_GUIDE.md) for complete documentation with visual guides.

## Excel Template Format

The downloaded template will be a `.xlsx` file with the following structure:

| email | name | company | position |
|-------|------|---------|----------|
| john.doe@example.com | John Doe | Acme Corp | Manager |
| jane.smith@example.com | Jane Smith | Tech Solutions | Director |
| bob.johnson@example.com | Bob Johnson | Global Inc | VP Sales |

You can add additional columns for more personalization fields. Any column can be referenced in your email using `{{columnName}}`.

## Technologies Used

- **Next.js 16** - React framework with Turbopack
- **SendGrid** - Email delivery service with personalization
- **SheetJS (xlsx)** - Excel file parsing library
- **ics** - Calendar invitation (.ics) file generation
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React 19** - UI library

## Important Notes

- Make sure to verify your sender email in SendGrid before sending emails
- SendGrid has sending limits based on your plan
- Always follow email marketing best practices and regulations (CAN-SPAM, GDPR, etc.)
- Test with a small batch of emails first
- RSVP responses will be sent to the organizer email (SENDGRID_FROM_EMAIL)
- For calendar invitations, ensure recipients use calendar-compatible email clients

## Documentation

- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Detailed setup guide
- [TEMPLATE_FEATURE.md](./TEMPLATE_FEATURE.md) - Email template documentation
- [DYNAMIC_CONTENT_GUIDE.md](./DYNAMIC_CONTENT_GUIDE.md) - Personalization guide
- [CALENDAR_INVITATION_GUIDE.md](./CALENDAR_INVITATION_GUIDE.md) - **Integrated RSVP tracking** (Recommended!)
- [IMAGE_GUIDE.md](./IMAGE_GUIDE.md) - How to add images to emails

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
