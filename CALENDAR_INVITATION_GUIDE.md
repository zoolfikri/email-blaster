# Calendar Invitation & RSVP Tracking Guide

## Overview

The Email Blaster now supports sending calendar invitations (.ics files) as email attachments. Recipients can add the event to their calendar and respond with Accept/Decline, allowing you to track RSVPs automatically.

## How It Works

### 1. Enable Calendar Invitations

In the Email Blaster interface, you'll see a checkbox option:
```
📅 Include Calendar Invitation (.ics file with RSVP tracking)
```

Check this box to enable calendar invitation features.

### 2. Fill in Event Details

When enabled, you'll need to provide:

- **Event Title** * (Required)
  - The name of your event
  - Example: "Exclusive Session with Microsoft Indonesia"

- **Event Description** (Optional)
  - Brief description of what the event is about
  - Example: "Join us for an exclusive session in collaboration with Microsoft Indonesia..."

- **Event Location** (Optional)
  - Physical address or virtual meeting link
  - Example: "Microsoft Indonesia Office, Jakarta Stock Exchange Building, Tower II, 18th Floor"

- **Start Date & Time** * (Required)
  - When the event begins
  - Format: YYYY-MM-DD HH:MM (local time)

- **End Date & Time** * (Required)
  - When the event ends
  - Must be after the start date/time

### 3. Send Emails with Calendar Invitations

When you click "Send Email + Calendar Invite to X Recipient(s)", the system will:

1. Send a personalized email to each recipient
2. Attach a calendar invitation file (`invite.ics`)
3. Set the organizer as your configured email address (from `SENDGRID_FROM_EMAIL`)
4. Enable RSVP tracking for each recipient

## RSVP Tracking

### How Recipients Respond

When recipients receive the email:

1. They'll see an attachment: `invite.ics`
2. They can click/open it to add to their calendar (Outlook, Google Calendar, Apple Calendar, etc.)
3. In their calendar app, they'll see options to:
   - ✅ **Accept** - Confirms attendance
   - ❌ **Decline** - Will not attend
   - ❓ **Tentative** - Maybe attending

### How You Track Responses

When a recipient responds (Accept/Decline/Tentative), their calendar application will automatically send an email response to the **organizer email address** (the one configured in your `.env.local` as `SENDGRID_FROM_EMAIL`).

**Example Response Email:**
```
From: john.doe@example.com
To: no-reply@nawatech.co
Subject: Accepted: Exclusive Session with Microsoft Indonesia

John Doe has accepted this invitation.
```

**Tracking Options:**

1. **Manual Tracking**
   - Check your organizer email inbox
   - Look for emails with subjects like:
     - "Accepted: [Event Title]"
     - "Declined: [Event Title]"
     - "Tentative: [Event Title]"

2. **Email Filters** (Recommended)
   - Set up email filters/rules in your inbox
   - Create labels/folders for: Accepted, Declined, Tentative
   - Automatically organize responses for easy tracking

3. **External Tools**
   - Use email management tools
   - Export to spreadsheet for analysis
   - Consider calendar management platforms for larger events

## Technical Details

### ICS File Format

The system generates standard iCalendar (.ics) files with:

- **Method**: REQUEST (calendar invitation)
- **Status**: CONFIRMED
- **Organizer**: Your configured email address
- **Attendee**: Each recipient's email
- **RSVP**: TRUE (requests response)
- **Role**: REQ-PARTICIPANT (required participant)
- **Participant Status**: NEEDS-ACTION (awaiting response)

### Compatibility

Calendar invitations work with:
- ✅ Microsoft Outlook (Desktop & Web)
- ✅ Google Calendar
- ✅ Apple Calendar (macOS, iOS)
- ✅ Mozilla Thunderbird
- ✅ Most modern email clients

## Predefined Template Integration

When you click "Load Microsoft Event Template", the system will:
1. Load the email template with dynamic content
2. **Automatically enable** calendar invitation
3. Pre-fill event details based on the template:
   - Title: "Exclusive Session with Microsoft Indonesia"
   - Date: November 12, 2025, 9:00 AM - 12:00 PM
   - Location: Microsoft Indonesia Office, Jakarta

You can modify these details before sending.

## Best Practices

### 1. Event Timing
- Set dates/times in your local timezone
- Consider recipient timezones for international events
- Send invitations at least 1 week in advance

### 2. Clear Communication
- Include event details in both the email body AND calendar invitation
- Make sure location includes clear directions or meeting links
- For virtual events, include the meeting link in both description and location

### 3. RSVP Management
- Set up email filters before sending bulk invitations
- Monitor responses regularly
- Send reminders to those who haven't responded (manually or via follow-up campaign)

### 4. Testing
- Send a test invitation to yourself first
- Verify the .ics file opens correctly in your calendar
- Check that RSVP responses arrive at the organizer email

## Example Workflow

1. **Prepare Recipients**
   - Upload Excel file with recipients
   - Ensure email addresses are valid

2. **Create Email**
   - Click "Load Microsoft Event Template" (or create custom)
   - Customize subject and content with {{variables}}

3. **Configure Calendar Event**
   - Check "Include Calendar Invitation"
   - Verify pre-filled event details or enter custom details
   - Ensure dates/times are correct

4. **Send & Track**
   - Click send button
   - Monitor organizer email for responses
   - Track acceptances/declines in a spreadsheet

5. **Follow Up**
   - Send reminders to non-responders
   - Share additional details with confirmed attendees

## Troubleshooting

### Recipients Don't See Calendar Invite
- Check that the .ics file is properly attached
- Verify recipient's email client supports .ics files
- Ask them to check spam/junk folders

### No RSVP Responses Received
- Verify `SENDGRID_FROM_EMAIL` is correctly set
- Check spam folder of organizer email
- Ensure recipients are using calendar apps (not just viewing in email)

### Wrong Date/Time Shows Up
- Double-check timezone settings
- Verify datetime-local format in the form
- Remember: times are sent in the server's timezone

### Calendar Invite Shows Different Organizer
- Check `.env.local` for correct `SENDGRID_FROM_EMAIL`
- Restart the development server after changing env variables
- Verify the email address is verified in SendGrid

## Environment Configuration

Make sure your `.env.local` has:

```env
SENDGRID_API_KEY=your_api_key_here
SENDGRID_FROM_EMAIL=your-verified-email@yourdomain.com
```

The `SENDGRID_FROM_EMAIL` will be used as:
1. Email sender address
2. Calendar event organizer
3. RSVP response recipient

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Test with a single recipient first
4. Review SendGrid dashboard for delivery status
