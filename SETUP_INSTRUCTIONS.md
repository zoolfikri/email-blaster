# Email Blaster - Quick Setup Guide

## 🚀 Quick Start

Your email blaster app is now running at **http://localhost:3000**

## ⚙️ Configuration Required

Before you can send emails, you need to configure SendGrid:

### 1. Get SendGrid API Key

1. Sign up for a free SendGrid account: https://sendgrid.com
2. Navigate to Settings > API Keys in the SendGrid dashboard
3. Click "Create API Key"
4. Give it a name (e.g., "Email Blaster")
5. Select "Full Access" or at minimum "Mail Send" permission
6. Copy your API key (you'll only see it once!)

### 2. Verify Sender Email

1. In SendGrid dashboard, go to Settings > Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in the form with your email address
4. Check your email for the verification link and click it

### 3. Update Environment Variables

Open `.env.local` file and update:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@example.com
```

**Important:** Use the email you verified in step 2 for `SENDGRID_FROM_EMAIL`

### 4. Restart the Server

After updating `.env.local`, restart the development server:
- Press `Ctrl+C` in the terminal
- Run `pnpm dev` again

## 📝 How to Use

1. **Download CSV Template**
   - Click "Download Template" button on the homepage
   - Opens a CSV file with the correct format

2. **Prepare Your Email List**
   ```csv
   email,name
   john@example.com,John Doe
   jane@example.com,Jane Smith
   ```

3. **Upload CSV**
   - Click "Upload Recipients (CSV)"
   - Select your prepared CSV file
   - App will show how many recipients were loaded

4. **Compose Email**
   - Enter your email subject
   - Write your email content (HTML tags work!)
   - Example HTML: `<h1>Hello!</h1><p>This is a test email.</p>`

5. **Send**
   - Click the send button
   - Wait for confirmation message

## 📊 SendGrid Free Tier Limits

- **100 emails/day** on the free plan
- Test with small batches first
- Consider upgrading for higher volume

## ⚠️ Important Notes

- Always get permission before sending emails
- Follow CAN-SPAM and GDPR regulations
- Use unsubscribe links in production
- Test emails thoroughly before sending to large lists

## 🐛 Troubleshooting

**Error: "SENDGRID_API_KEY is not set"**
- Make sure `.env.local` file exists
- Check that the API key is correct
- Restart the dev server

**Emails not sending**
- Verify your sender email in SendGrid
- Check API key permissions
- Look for error messages in the browser console

**CSV upload not working**
- Make sure CSV has headers: `email,name`
- Check for empty rows
- Ensure valid email format

## 📚 File Structure

```
src/
├── app/
│   ├── api/send-emails/route.ts    # API endpoint for sending emails
│   ├── page.tsx                     # Main page
│   └── layout.tsx                   # Layout
├── components/
│   └── EmailBlaster.tsx            # Main email form component
└── lib/
    └── sendgrid.ts                 # SendGrid integration
```

## 🎉 You're Ready!

Visit http://localhost:3000 and start sending emails!
