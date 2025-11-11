# Calendar Invitation & Integrated RSVP Tracking Guide

## Overview

The Email Blaster includes **integrated RSVP functionality** through calendar invitations (.ics files). Recipients can respond directly within their email client (Outlook, Gmail, Apple Mail) without any manual steps. Their responses automatically notify you.

## How Integrated RSVP Works

### For Recipients

When recipients receive your email with a calendar invitation:

**In Microsoft Outlook:**
1. Email displays Accept/Tentative/Decline buttons at the top
2. Click their choice (one click!)
3. Event is added to their calendar automatically
4. Their response is sent to you automatically

**In Gmail:**
1. Event details appear with Yes/No/Maybe buttons
2. Click their response (one click!)
3. Event is added to Google Calendar
4. You receive their response notification

**In Apple Mail:**
1. Email shows the .ics attachment
2. Click to open in Calendar app
3. Choose Accept/Decline/Maybe
4. Response is sent automatically

### For You (Organizer)

When a recipient responds, you receive:
- **Automatic email notification** with their response
- **Subject:** "Accepted: [Event Name]" or "Declined: [Event Name]"
- **From:** The recipient's email
- **Content:** Their response status

**No manual tracking needed!** Your calendar application (Outlook/Google Calendar) automatically tracks responses.

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

### Automatic Response Collection

When recipients respond via their email client, their calendar application automatically:
1. Sends a standardized RSVP email to you
2. Updates the event's attendee status
3. Provides a clear subject line indicating their response

### Response Email Format

**When someone accepts:**
```
From: john.doe@example.com
To: no-reply@nawatech.co
Subject: Accepted: Exclusive Session with Microsoft Indonesia

John Doe has accepted this invitation.
Event: Exclusive Session with Microsoft Indonesia
When: November 12, 2025, 9:00 AM - 12:00 PM
```

**When someone declines:**
```
From: jane.smith@example.com
To: no-reply@nawatech.co
Subject: Declined: Exclusive Session with Microsoft Indonesia

Jane Smith has declined this invitation.
```

**When someone is tentative:**
```
From: bob.johnson@example.com
To: no-reply@nawatech.co
Subject: Tentative: Exclusive Session with Microsoft Indonesia

Bob Johnson has tentatively accepted this invitation.
```

### Tracking Options

**1. Email Inbox (Simple)**
   - Check your organizer email inbox
   - Look for subjects: "Accepted:", "Declined:", "Tentative:"
   - Responses are automatically formatted and easy to identify

**2. Email Filters (Recommended)**
   Create automatic filters to organize responses:

   **Gmail:**
   - Filter: Subject contains "Accepted:"
   - Label: Events/Accepted
   - Filter: Subject contains "Declined:"
   - Label: Events/Declined
   - Filter: Subject contains "Tentative:"
   - Label: Events/Tentative

   **Outlook:**
   - Rule: Subject contains "Accepted:"
   - Move to: Event Responses/Confirmed
   - Rule: Subject contains "Declined:"
   - Move to: Event Responses/Declined
   - Rule: Subject contains "Tentative:"
   - Move to: Event Responses/Maybe

**3. Calendar Application (Automatic)**
   Most calendar apps automatically track responses:

   **Microsoft Outlook:**
   - Open the event in your calendar
   - Click "Tracking" tab
   - See list of all attendees and their responses
   - Real-time updates as people respond

   **Google Calendar:**
   - Open the event
   - Click on event details
   - See "Guests" section with response counts
   - View who accepted/declined/didn't respond

   **Apple Calendar:**
   - Open the event
   - View attendees list with status icons
   - ✓ = Accepted, ✗ = Declined, ? = Tentative

**4. Reporting & Analytics**
   Export data for analysis:
   - Outlook: Export tracking data to Excel
   - Google Calendar: Use Google Workspace reports
   - Third-party tools: Zapier, Microsoft Power Automate

## How Recipients See and Respond to Invitations

### Microsoft Outlook (Desktop & Web)

**What Recipients See:**
```
┌─────────────────────────────────────────────────┐
│ [Accept ▼] [Tentative ▼] [Decline ▼]          │
│                                                 │
│ From: no-reply@nawatech.co                     │
│ Subject: Hi John, Invitation to Exclusive...   │
│                                                 │
│ 📅 Exclusive Session with Microsoft Indonesia  │
│ 📍 Microsoft Indonesia Office, Jakarta         │
│ 🕐 Wed, Nov 12, 2025 • 9:00 AM - 12:00 PM    │
│                                                 │
│ [Email body content appears below]             │
└─────────────────────────────────────────────────┘
```

**How They Respond:**
1. Click **Accept**, **Tentative**, or **Decline** button at the top
2. Choose whether to send response now or edit it
3. Event is automatically added to their Outlook calendar
4. You receive their response immediately

---

### Gmail / Google Workspace

**What Recipients See:**
```
┌─────────────────────────────────────────────────┐
│ From: no-reply@nawatech.co                     │
│ Subject: Hi Jane, Invitation to Exclusive...   │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ 📅 Exclusive Session with Microsoft...   │   │
│ │ Wed, Nov 12 • 9:00 AM - 12:00 PM        │   │
│ │ Microsoft Indonesia Office               │   │
│ │                                           │   │
│ │ Going?  [Yes] [No] [Maybe]               │   │
│ │ [Add to Calendar]                        │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [Email body content appears below]             │
└─────────────────────────────────────────────────┘
```

**How They Respond:**
1. Click **Yes**, **No**, or **Maybe** in the event card
2. Event is automatically added to Google Calendar
3. You receive their RSVP response
4. They can also click "Add to Calendar" for more options

---

### Apple Mail / iOS Mail

**What Recipients See:**
```
┌─────────────────────────────────────────────────┐
│ From: no-reply@nawatech.co                     │
│ Subject: Hi Bob, Invitation to Exclusive...    │
│                                                 │
│ 📎 invite.ics                                  │
│                                                 │
│ [Email body content]                           │
│                                                 │
│ [Tap attachment to view in Calendar]          │
└─────────────────────────────────────────────────┘
```

**How They Respond:**
1. Tap the **invite.ics** attachment
2. iOS Calendar app opens with event details
3. Choose **Accept**, **Maybe**, or **Decline**
4. Event is added to their Apple Calendar
5. Response is sent to you automatically

---

### Automatic Response Flow

```
┌─────────────┐
│  Recipient  │ Receives email with calendar invitation
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│  Email Client Shows RSVP Options            │
│  • Outlook: Accept/Tentative/Decline        │
│  • Gmail: Yes/No/Maybe                      │
│  • Apple: Accept/Maybe/Decline              │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│  One Click  │ Recipient chooses their response
└──────┬──────┘
       │
       ├──────────────────┬──────────────────┐
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐  ┌──────────────┐  ┌────────────┐
│ Accepted    │  │  Tentative   │  │  Declined  │
└──────┬──────┘  └──────┬───────┘  └─────┬──────┘
       │                │                 │
       └────────────────┴─────────────────┘
                        │
                        ▼
       ┌────────────────────────────────┐
       │  Calendar App Automatically:   │
       │  1. Adds event to calendar     │
       │  2. Sends RSVP to organizer    │
       │  3. Sets up reminders          │
       └────────────────┬───────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  You Receive:    │
              │  • Email notice  │
              │  • Status update │
              └──────────────────┘
```

## Viewing RSVP Responses in Calendar Apps

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
