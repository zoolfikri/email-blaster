"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface EmailRecipient {
  email: string;
  [key: string]: string | undefined; // Allow dynamic fields like name, company, position, etc.
}

const TEMPLATES = {
  invitation: {
    name: "Event Invitation",
    subject:
      "Hi {{name}}, Invitation to Exclusive Session with Microsoft Indonesia",
    content: `<div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #333;">
  <!-- Header Image -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/b7f3d092803738d5/d2820a2a-0695-4002-9451-c954f6725229/619x206.png" alt="Header" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
  </div>
  
  <p>Dear {{name}},</p>
  
  <p>Thank you for registering for our <strong>Exclusive Session</strong> in collaboration with <strong>Microsoft Indonesia</strong>! We're excited to welcome you to this special event, designed to bring valuable insights, live demos, and meaningful discussions tailored to your business needs.</p>
  
  <h2 style="color: #f7ca17; margin-top: 30px;">Event Details</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px 0;"><strong>📅 Date:</strong></td>
      <td style="padding: 10px 0;">Wednesday, November 12, 2025</td>
    </tr>
    <tr>
      <td style="padding: 10px 0;"><strong>🕘 Time:</strong></td>
      <td style="padding: 10px 0;">9:00 AM – 12:00 PM</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; vertical-align: top;"><strong>📍 Location:</strong></td>
      <td style="padding: 10px 0;">
        Microsoft Indonesia Office<br>
        Jakarta Stock Exchange Building, Tower II, 18th Floor<br>
        Sudirman Central Business District
      </td>
    </tr>
  </table>
  
  <h2 style="color: #f7ca17; margin-top: 30px;">What to Expect</h2>
  
  <ul style="line-height: 1.8; padding-left: 20px;">
    <li>Learn best practices for leveraging Indonesia Central Region</li>
    <li>Gain insights into modernizing enterprise applications and data platforms</li>
    <li>Experience updated live demos from industry experts</li>
    <li>Engage in interactive discussions and networking with peers and Microsoft partners</li>
  </ul>
  
  <p style="margin-top: 30px;">We look forward to seeing you there, {{name}}, and sharing valuable takeaways to support your organization's digital journey.</p>
  
  <p style="margin-top: 30px;">Contact us if you have any questions or need more information.</p>
  
  <p style="margin-top: 20px;">
    <strong>Sincerely,</strong><br>
    Ishak Papilaya | 0853-1237-3792<br>
    <a href="mailto:ishak@nawatech.co" style="color: #f7ca17; text-decoration: none;">ishak@nawatech.co</a>
  </p>
  
  <!-- Closing Image -->
  <div style="text-align: center; margin-top: 30px;">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/b7f3d092803738d5/2bbdffad-4632-405a-92da-32b2b916e0ae/620x206.png" alt="Footer" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
  </div>
</div>`,
  },
  reminder: {
    name: "Event Reminder (Tomorrow)",
    subject:
      "Reminder: Your Exclusive Session with Microsoft Indonesia is TOMORROW!",
    content: `<div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #333;">
  <!-- Header Image -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/b7f3d092803738d5/d2820a2a-0695-4002-9451-c954f6725229/619x206.png" alt="Header" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
  </div>
  
  <p>Dear {{name}},</p>
  
  <p>We're excited to remind you that your <strong>Exclusive Session</strong> in collaboration with <strong>Microsoft Indonesia</strong> is happening <strong style="color: #f7ca17;">TOMORROW!</strong></p>
  
  <p>Join us for an insightful morning filled with best practices, live demos, and discussions designed to help your organization accelerate its digital transformation journey.</p>
  
  <h2 style="color: #f7ca17; margin-top: 30px;">Event Details</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr>
      <td style="padding: 10px 0;"><strong>📅 Date:</strong></td>
      <td style="padding: 10px 0;">Wednesday, November 12, 2025</td>
    </tr>
    <tr>
      <td style="padding: 10px 0;"><strong>🕘 Time:</strong></td>
      <td style="padding: 10px 0;">9:00 AM – 12:00 PM</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; vertical-align: top;"><strong>📍 Location:</strong></td>
      <td style="padding: 10px 0;">
        Microsoft Indonesia Office<br>
        Jakarta Stock Exchange Building, Tower II, 18th Floor<br>
        Sudirman Central Business District
      </td>
    </tr>
  </table>
  
  <h2 style="color: #f7ca17; margin-top: 30px;">Agenda Highlights</h2>
  
  <ul style="line-height: 1.8; padding-left: 20px;">
    <li>Learn best practices for leveraging Indonesia Central Region</li>
    <li>Gain insights into modernizing enterprise applications and data platforms</li>
    <li>Experience live demos from industry experts</li>
    <li>Engage in interactive discussions and networking with peers and Microsoft partners</li>
  </ul>
  
  <p style="margin-top: 30px;">We look forward to welcoming you in person and sharing valuable takeaways to support your business growth.</p>
  
  <p style="margin-top: 30px;">Contact us if you have any questions or need more information.</p>
  
  <p style="margin-top: 20px;">
    <strong>Sincerely,</strong><br>
    Ishak Papilaya | 0853-1237-3792<br>
    <a href="mailto:ishak@nawatech.co" style="color: #f7ca17; text-decoration: none;">ishak@nawatech.co</a>
  </p>
  
  <!-- Closing Image -->
  <div style="text-align: center; margin-top: 30px;">
    <img src="http://cdn.mcauto-images-production.sendgrid.net/b7f3d092803738d5/2bbdffad-4632-405a-92da-32b2b916e0ae/620x206.png" alt="Footer" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
  </div>
</div>`,
  },
};

export default function EmailBlaster() {
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  // Calendar event state
  const [includeCalendar, setIncludeCalendar] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");

  const downloadTemplate = () => {
    // Create Excel workbook with dynamic field examples
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["email", "name", "company", "position"],
      ["john.doe@example.com", "John Doe", "Acme Corp", "Manager"],
      ["jane.smith@example.com", "Jane Smith", "Tech Solutions", "Director"],
      ["bob.johnson@example.com", "Bob Johnson", "Global Inc", "VP Sales"],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Recipients");

    // Download Excel file
    XLSX.writeFile(wb, "email-template.xlsx");
  };

  const loadPredefinedTemplate = (templateKey: "invitation" | "reminder") => {
    const template = TEMPLATES[templateKey];
    setSubject(template.subject);
    setContent(template.content);

    // Pre-populate calendar event fields
    setIncludeCalendar(true);
    setEventTitle("Exclusive Session with Microsoft Indonesia");
    setEventDescription(
      "Join us for an exclusive session in collaboration with Microsoft Indonesia. Learn best practices, gain insights, and engage in interactive discussions.",
    );
    setEventLocation(
      "Microsoft Indonesia Office, Jakarta Stock Exchange Building, Tower II, 18th Floor, Sudirman Central Business District",
    );
    // Set default date: November 12, 2025, 9 AM - 12 PM
    setEventStartDate("2025-11-12T09:00");
    setEventEndDate("2025-11-12T12:00");

    setMessage({
      type: "success",
      text: `${template.name} loaded successfully`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Array<
          Record<string, string>
        >;

        const parsedRecipients: EmailRecipient[] = jsonData
          .filter((row) => row.email && row.email.trim() !== "")
          .map((row) => {
            // Capture all fields from the Excel row
            const recipient: EmailRecipient = {
              email: row.email.trim(),
            };

            // Add all other columns as dynamic fields
            Object.keys(row).forEach((key) => {
              if (key !== "email" && row[key]) {
                recipient[key] = row[key].trim();
              }
            });

            return recipient;
          });

        setRecipients(parsedRecipients);
        setMessage({
          type: "success",
          text: `Loaded ${parsedRecipients.length} recipients`,
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: `Error parsing file: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleSendEmails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (recipients.length === 0) {
      setMessage({
        type: "error",
        text: "Please upload a CSV file with recipients",
      });
      return;
    }

    if (!subject || !content) {
      setMessage({ type: "error", text: "Please fill in subject and content" });
      return;
    }

    // Validate calendar event fields if calendar is enabled
    if (includeCalendar) {
      if (!eventTitle || !eventStartDate || !eventEndDate) {
        setMessage({
          type: "error",
          text: "Please fill in all required calendar event fields (title, start date, end date)",
        });
        return;
      }

      if (new Date(eventStartDate) >= new Date(eventEndDate)) {
        setMessage({
          type: "error",
          text: "Event end date must be after start date",
        });
        return;
      }
    }

    setLoading(true);
    setMessage(null);

    try {
      const requestBody: {
        recipients: EmailRecipient[];
        subject: string;
        content: string;
        calendarEvent?: {
          title: string;
          description: string;
          location: string;
          startDate: string;
          endDate: string;
        };
      } = {
        recipients,
        subject,
        content,
      };

      // Add calendar event if enabled
      if (includeCalendar) {
        requestBody.calendarEvent = {
          title: eventTitle,
          description: eventDescription,
          location: eventLocation,
          startDate: eventStartDate,
          endDate: eventEndDate,
        };
      }

      const response = await fetch("/api/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || "Emails sent successfully!",
        });
        // Reset form
        setRecipients([]);
        setSubject("");
        setContent("");
        setIncludeCalendar(false);
        setEventTitle("");
        setEventDescription("");
        setEventLocation("");
        setEventStartDate("");
        setEventEndDate("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to send emails",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred while sending emails",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">Email Blaster</h1>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-sm font-medium text-zinc-700 border border-zinc-300 rounded-lg hover:bg-zinc-50"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div
          className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`}
        >
          <form onSubmit={handleSendEmails} className="space-y-6">
            {/* Excel Upload Section */}
            <div>
              <label
                htmlFor="excel-upload"
                className="block text-sm font-medium mb-2 text-zinc-700"
              >
                Upload Recipients (Excel)
              </label>
              <div className="flex gap-4 items-center">
                <input
                  id="excel-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="flex-1 text-sm text-zinc-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-900 file:text-zinc-50 hover:file:bg-zinc-700"
                />
                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="px-4 py-2 text-sm font-medium text-zinc-700 border border-zinc-300 rounded-lg hover:bg-zinc-50"
                >
                  Download Template
                </button>
              </div>
              {recipients.length > 0 && (
                <p className="mt-2 text-sm text-zinc-600">
                  {recipients.length} recipient(s) loaded
                </p>
              )}
            </div>

            {/* Template Actions */}
            <div>
              <p className="block text-sm font-medium mb-2 text-zinc-700">
                Email Templates
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => loadPredefinedTemplate("invitation")}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  📧 Load Event Invitation Template
                </button>
                <button
                  type="button"
                  onClick={() => loadPredefinedTemplate("reminder")}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                >
                  ⏰ Load Event Reminder Template (Tomorrow)
                </button>
              </div>
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 <strong>Dynamic Content Tip:</strong> Use{" "}
                  <code className="bg-blue-100 px-1 rounded">{"{{name}}"}</code>
                  ,{" "}
                  <code className="bg-blue-100 px-1 rounded">
                    {"{{company}}"}
                  </code>
                  , etc. in your subject and content for personalization!
                </p>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2 text-zinc-700"
              >
                Subject (supports dynamic variables like {"{{name}}"})
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Hi {{name}}, Welcome to our event!"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-2 text-zinc-700"
              >
                Email Content (HTML supported, use {"{{variable}}"} for dynamic
                content)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter email content (HTML tags are supported)"
                rows={10}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                required
              />
            </div>

            {/* Calendar Invitation Section */}
            <div className="border border-zinc-300 rounded-lg p-4 bg-zinc-50">
              <div className="flex items-center gap-3 mb-4">
                <input
                  id="include-calendar"
                  type="checkbox"
                  checked={includeCalendar}
                  onChange={(e) => setIncludeCalendar(e.target.checked)}
                  className="w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
                />
                <label
                  htmlFor="include-calendar"
                  className="text-sm font-medium text-zinc-700"
                >
                  📅 Include Calendar Invitation (.ics file with RSVP tracking)
                </label>
              </div>

              {includeCalendar && (
                <div className="space-y-4 mt-4 pt-4 border-t border-zinc-300">
                  {/* Event Title */}
                  <div>
                    <label
                      htmlFor="event-title"
                      className="block text-sm font-medium mb-2 text-zinc-700"
                    >
                      Event Title *
                    </label>
                    <input
                      id="event-title"
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g., Exclusive Session with Microsoft Indonesia"
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                      required={includeCalendar}
                    />
                  </div>

                  {/* Event Description */}
                  <div>
                    <label
                      htmlFor="event-description"
                      className="block text-sm font-medium mb-2 text-zinc-700"
                    >
                      Event Description
                    </label>
                    <textarea
                      id="event-description"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Brief description of the event"
                      rows={3}
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                    />
                  </div>

                  {/* Event Location */}
                  <div>
                    <label
                      htmlFor="event-location"
                      className="block text-sm font-medium mb-2 text-zinc-700"
                    >
                      Event Location
                    </label>
                    <input
                      id="event-location"
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g., Microsoft Indonesia Office, Jakarta"
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                    />
                  </div>

                  {/* Event Start Date */}
                  <div>
                    <label
                      htmlFor="event-start"
                      className="block text-sm font-medium mb-2 text-zinc-700"
                    >
                      Start Date & Time *
                    </label>
                    <input
                      id="event-start"
                      type="datetime-local"
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                      required={includeCalendar}
                    />
                  </div>

                  {/* Event End Date */}
                  <div>
                    <label
                      htmlFor="event-end"
                      className="block text-sm font-medium mb-2 text-zinc-700"
                    >
                      End Date & Time *
                    </label>
                    <input
                      id="event-end"
                      type="datetime-local"
                      value={eventEndDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                      required={includeCalendar}
                    />
                  </div>

                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      📧 <strong>RSVP Tracking:</strong> Recipients will receive
                      a calendar invitation (.ics file) that they can add to
                      their calendar. When they accept or decline, you'll
                      receive a notification at the organizer email address.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || recipients.length === 0}
              className="w-full py-3 px-6 bg-zinc-900 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading
                ? "Sending..."
                : includeCalendar
                  ? `Send Email + Calendar Invite to ${recipients.length} Recipient(s)`
                  : `Send to ${recipients.length} Recipient(s)`}
            </button>
          </form>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-zinc-900">
                  Email Preview
                </h2>

                {/* Preview Subject */}
                {subject && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-zinc-500 mb-1">
                      SUBJECT:
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 p-3 bg-zinc-50 rounded-lg">
                      {subject}
                    </p>
                  </div>
                )}

                {/* Preview Content */}
                <div className="border border-zinc-300 rounded-lg bg-white overflow-hidden">
                  {content ? (
                    <iframe
                      title="Email Preview"
                      srcDoc={content}
                      className="w-full h-[800px] border-0"
                      sandbox="allow-same-origin"
                    />
                  ) : (
                    <p className="text-zinc-400 italic text-center py-20">
                      No content to preview. Enter email content or load a
                      template.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
