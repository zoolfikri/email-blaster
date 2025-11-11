# RSVP Feature Guide

## Overview

The email blaster now includes a built-in RSVP system with clickable buttons directly in the email. Recipients can respond to event invitations without needing to use calendar applications.

## How It Works

### RSVP Buttons in Email

The predefined email template includes three prominent RSVP buttons:

1. **✓ Yes, I'll Attend** (Green button)
   - Indicates confirmed attendance
   - Opens email client with pre-filled acceptance message

2. **✗ Can't Attend** (Red button)
   - Indicates recipient cannot attend
   - Opens email client with pre-filled decline message

3. **? Maybe** (Yellow button)
   - Indicates tentative attendance
   - Opens email client with pre-filled tentative message

### What Recipients See

When a recipient clicks an RSVP button:
- Their email client opens automatically
- The email is pre-filled with:
  - **To:** Your organizer email (ishak@nawatech.co in the template)
  - **Subject:** RSVP status with recipient's name
  - **Body:** Formatted response including:
    - Their name (from {{name}} variable)
    - Their company (from {{company}} variable)
    - Their email (from {{email}} variable)
    - Event details

### Example RSVP Response Email

When John Doe from Acme Corp clicks "Yes, I'll Attend":

```
To: ishak@nawatech.co
Subject: RSVP: YES - John Doe will attend

Hi,

I confirm my attendance for the Exclusive Session with Microsoft Indonesia on November 12, 2025.

Name: John Doe
Company: Acme Corp
Email: john.doe@example.com

Thank you!
```

## Tracking RSVPs

### Manual Tracking

1. **Check Your Inbox**
   - RSVP responses arrive at your organizer email
   - Subject lines clearly indicate: "RSVP: YES", "RSVP: NO", or "RSVP: MAYBE"

2. **Create Email Filters**
   - Set up rules to auto-sort responses:
     - "RSVP: YES" → Confirmed folder
     - "RSVP: NO" → Declined folder
     - "RSVP: MAYBE" → Tentative folder

3. **Use Spreadsheet Tracking**
   - Export responses to Excel/Google Sheets
   - Track: Name, Company, Email, Status, Response Date
   - Calculate attendance statistics

### Gmail Filter Example

```
Filter 1: Confirmed Attendees
- Subject contains: "RSVP: YES"
- Apply label: "Event/Confirmed"
- Mark as important

Filter 2: Declined
- Subject contains: "RSVP: NO"
- Apply label: "Event/Declined"

Filter 3: Tentative
- Subject contains: "RSVP: MAYBE"
- Apply label: "Event/Tentative"
```

### Outlook Rules Example

1. Create rule: "RSVP Confirmed"
   - Condition: Subject contains "RSVP: YES"
   - Action: Move to folder "Event Responses/Confirmed"
   - Action: Flag message

2. Create rule: "RSVP Declined"
   - Condition: Subject contains "RSVP: NO"
   - Action: Move to folder "Event Responses/Declined"

3. Create rule: "RSVP Tentative"
   - Condition: Subject contains "RSVP: MAYBE"
   - Action: Move to folder "Event Responses/Tentative"

## Customizing RSVP Buttons

### Change Recipient Email

In the email template, update the `mailto:` links:

```html
<a href="mailto:YOUR-EMAIL@example.com?subject=RSVP: YES - {{name}} will attend&body=...">
```

### Customize Button Colors

```html
<!-- Green "Yes" button -->
background-color: #28a745;

<!-- Red "No" button -->
background-color: #dc3545;

<!-- Yellow "Maybe" button -->
background-color: #ffc107;
```

### Modify Response Text

Edit the `&body=` parameter in the mailto link:

```html
&body=Hi,%0D%0A%0D%0AI confirm my attendance...
```

Note: Use `%0D%0A` for line breaks in mailto URLs.

## Dual RSVP System

Your email blaster now supports **two ways to RSVP**:

### 1. Email RSVP Buttons (This Feature)
- **Pros:** Works in all email clients, simple one-click response
- **Cons:** Manual tracking required
- **Best for:** Quick responses, simple events

### 2. Calendar Invitation (.ics)
- **Pros:** Automatically adds to calendar, structured RSVP tracking
- **Cons:** Requires calendar-compatible email client
- **Best for:** Formal events, automatic calendar blocking

### Using Both Together (Recommended)

When you enable "Include Calendar Invitation":
1. Recipients get **RSVP buttons** for quick email response
2. They also get **calendar .ics file** for adding to their calendar
3. They can respond via either method

This gives recipients flexibility and increases response rates!

## Best Practices

### 1. Clear Call-to-Action
✅ The RSVP section is prominently placed in the email
✅ Buttons are large and clearly labeled
✅ Instructions are simple: "Please Confirm Your Attendance"

### 2. Required Excel Fields
Make sure your Excel file includes these columns for RSVP buttons to work properly:
- `email` (required) - Recipient's email address
- `name` (required) - Used in RSVP subject and body
- `company` (recommended) - Included in RSVP response
- Any other dynamic fields you use

### 3. Test Before Sending
1. Send test email to yourself
2. Click each RSVP button
3. Verify the mailto link works correctly
4. Check that variables ({{name}}, {{company}}) are replaced

### 4. Set Response Deadline
Add a deadline in your email:
```html
<p style="color: #dc3545; font-weight: bold;">
  Please RSVP by November 10, 2025
</p>
```

### 5. Send Reminders
For non-responders:
- Send follow-up email 1 week before event
- Include the same RSVP buttons
- Mention "We haven't received your RSVP yet"

## Tracking Dashboard Example

Create a simple spreadsheet to track responses:

| Name | Email | Company | Response | Date | Notes |
|------|-------|---------|----------|------|-------|
| John Doe | john@example.com | Acme Corp | YES | Nov 5 | Confirmed |
| Jane Smith | jane@example.com | Tech Inc | MAYBE | Nov 6 | Check later |
| Bob Johnson | bob@example.com | Global Inc | - | - | No response |

## Mobile Compatibility

RSVP buttons work on mobile devices:
- ✅ iOS Mail app
- ✅ Gmail mobile app
- ✅ Outlook mobile app
- ✅ Most modern email apps

On mobile, clicking a button:
1. Opens the device's email composer
2. Pre-fills the RSVP message
3. User can review and send

## Privacy Considerations

RSVP responses include:
- Recipient's name
- Recipient's company
- Recipient's email

This information comes from your Excel file. Ensure:
- You have permission to use this data
- Recipients are aware of how their data is used
- You comply with data protection regulations (GDPR, etc.)

## Troubleshooting

### RSVP Buttons Don't Work
**Problem:** Clicking button does nothing
**Solution:** 
- Some email clients block mailto: links by default
- Ensure recipient's email client is configured to allow mailto: links
- Provide alternative: "Or reply to this email with your response"

### Variables Not Replaced
**Problem:** Email shows {{name}} instead of actual name
**Solution:**
- Verify Excel file has the required columns
- Check that column names match exactly (case-sensitive)
- Re-upload Excel file

### Wrong Email in RSVP Responses
**Problem:** Responses go to wrong address
**Solution:**
- Update mailto: links in the email template
- Change `ishak@nawatech.co` to your desired email
- Test before sending to all recipients

### No Responses Received
**Problem:** Didn't receive any RSVP emails
**Solution:**
- Check spam/junk folder
- Verify organizer email is correct
- Ask recipients if they sent responses
- Check email server quotas/limits

## Advanced: Automated RSVP Tracking

For large events, consider:

1. **Zapier Integration**
   - Trigger: New email with "RSVP: YES" in subject
   - Action: Add row to Google Sheets

2. **Microsoft Power Automate**
   - Monitor inbox for RSVP emails
   - Parse response details
   - Update Excel/SharePoint list

3. **Google Apps Script**
   - Auto-process Gmail labels
   - Extract RSVP data
   - Update Google Sheets dashboard

4. **Third-Party Event Management**
   - Eventbrite
   - Meetup
   - Luma
   (These provide built-in RSVP tracking)

## Comparison with Calendar RSVP

| Feature | Email RSVP Buttons | Calendar .ics RSVP |
|---------|-------------------|-------------------|
| Ease of use | ⭐⭐⭐⭐⭐ One click | ⭐⭐⭐ Multiple steps |
| Tracking | Manual | Semi-automatic |
| Calendar integration | ❌ No | ✅ Yes |
| Compatibility | ✅ All email clients | ⚠️ Calendar apps only |
| Response format | Email | Calendar response |
| Customization | ⭐⭐⭐⭐⭐ Highly flexible | ⭐⭐⭐ Standard format |

**Recommendation:** Use both for maximum flexibility and response rates!

## Sample Email Template Code

Here's how the RSVP section looks in HTML:

```html
<!-- RSVP Section -->
<div style="margin: 40px 0; padding: 25px; background-color: #f9f9f9; border-left: 4px solid #f7ca17; border-radius: 4px;">
  <h3 style="margin-top: 0; color: #333;">📬 Please Confirm Your Attendance</h3>
  <p style="margin-bottom: 20px; color: #666;">Will you be able to join us for this exclusive session?</p>
  
  <div style="text-align: center;">
    <a href="mailto:ishak@nawatech.co?subject=RSVP: YES - {{name}} will attend&body=..." 
       style="display: inline-block; margin: 0 10px 10px 0; padding: 12px 30px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
      ✓ Yes, I'll Attend
    </a>
    
    <a href="mailto:ishak@nawatech.co?subject=RSVP: NO - {{name}} cannot attend&body=..." 
       style="display: inline-block; margin: 0 10px 10px 0; padding: 12px 30px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
      ✗ Can't Attend
    </a>
    
    <a href="mailto:ishak@nawatech.co?subject=RSVP: MAYBE - {{name}} is tentative&body=..." 
       style="display: inline-block; margin: 0 10px 10px 0; padding: 12px 30px; background-color: #ffc107; color: #333; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
      ? Maybe
    </a>
  </div>
  
  <p style="margin-top: 15px; font-size: 12px; color: #999; text-align: center;">
    Or reply to this email with your response
  </p>
</div>
```

You can copy and modify this code for your custom email templates!
