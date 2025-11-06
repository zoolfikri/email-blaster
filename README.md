# Email Blaster

A simple email blasting application built with Next.js and SendGrid. Upload an Excel file with email addresses and send bulk emails easily.

## Features

- 📧 Send bulk emails using SendGrid
- 📊 Excel (.xlsx, .xls) upload for recipient lists
- 📥 Download Excel template
- ✅ Email validation
- 🎨 Modern UI with live preview
- 🔒 Secure API key management

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

2. **Prepare your Excel file:** The Excel file should have two columns:
   - `email` (required): The recipient's email address
   - `name` (optional): The recipient's name

   Example:
   | email | name |
   |-------|------|
   | john@example.com | John Doe |
   | jane@example.com | Jane Smith |

3. **Upload Excel:** Click "Upload Recipients (Excel)" and select your Excel file (.xlsx or .xls).

4. **Compose Email:**
   - Click "Load Microsoft Event Template" for a pre-formatted email, or
   - Enter the email subject manually
   - Write your email content (HTML is supported)

5. **Preview:** View your email in the live preview panel before sending.

6. **Send:** Click the send button to send emails to all recipients.

## Excel Template Format

The downloaded template will be a `.xlsx` file with the following structure:

| email | name |
|-------|------|
| example1@example.com | John Doe |
| example2@example.com | Jane Smith |

## Technologies Used

- **Next.js 16** - React framework
- **SendGrid** - Email delivery service
- **SheetJS (xlsx)** - Excel file parsing library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Important Notes

- Make sure to verify your sender email in SendGrid before sending emails
- SendGrid has sending limits based on your plan
- Always follow email marketing best practices and regulations (CAN-SPAM, GDPR, etc.)
- Test with a small batch of emails first

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
