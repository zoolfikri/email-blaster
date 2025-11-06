# Email Template & Preview Feature

## ✨ New Features Added

### 1. **Predefined Email Template**
A beautifully formatted Microsoft Indonesia event invitation template is now available with one click!

**Template Includes:**
- Professional HTML formatting
- Microsoft brand colors (#0078D4)
- Event details table with emojis
- Structured sections (Event Details, What to Expect)
- Contact information
- Responsive design

**To Use:**
1. Click the "Load Microsoft Event Template" button
2. Template automatically fills the Subject and Content fields
3. Edit as needed or use as-is

### 2. **Live Email Preview**
See exactly how your email will look before sending!

**Features:**
- Toggle preview on/off with "Show Preview" button
- Split-screen view (form on left, preview on right)
- Shows formatted subject line
- Renders HTML content exactly as recipients will see it
- Responsive layout

**To Use:**
1. Click "Show Preview" button in top-right corner
2. Type or load a template
3. Preview updates automatically
4. Click "Hide Preview" to return to full-width form

## 📧 Template Content

The predefined template includes:

**Subject:**
```
Invitation: Exclusive Session with Microsoft Indonesia - November 12, 2025
```

**Content:**
- Professional greeting
- Event introduction
- Styled event details table:
  - 📅 Date: Wednesday, November 12, 2025
  - 🕘 Time: 9 am – 12 pm
  - 📍 Location: Microsoft Indonesia Office details
- Bullet-point list of "What to Expect"
- Professional closing with contact information
- Branded color scheme

## 🎨 Layout Changes

- **Max width increased** from `max-w-4xl` to `max-w-7xl` for better preview space
- **Grid layout** that adapts:
  - With preview: 2 columns on large screens
  - Without preview: 1 column (original layout)
- **Header enhanced** with preview toggle button

## 🚀 How to Use the Complete Workflow

1. **Upload CSV** with recipient emails
2. **Click "Load Microsoft Event Template"** to populate the email
3. **Click "Show Preview"** to see the formatted email
4. **Review** the preview to ensure everything looks correct
5. **Edit** subject or content if needed (preview updates live)
6. **Send** to all recipients

## 💡 Tips

- The preview renders HTML exactly as it will appear in the email
- You can edit the template after loading it
- The template uses inline styles for maximum email client compatibility
- Test with yourself first before sending to large lists

## 🔧 Technical Details

**Files Modified:**
- `src/components/EmailBlaster.tsx`

**New State Variables:**
- `showPreview`: boolean to toggle preview panel

**New Functions:**
- `loadPredefinedTemplate()`: Loads the Microsoft event template

**New UI Components:**
- Preview toggle button
- Template load button
- Preview panel with subject and content rendering
- Grid layout container

**HTML Template Features:**
- Inline CSS for email client compatibility
- Table-based layout for event details
- Semantic HTML structure
- Accessible color contrast
- Mobile-friendly design

## ⚠️ Note

The `dangerouslySetInnerHTML` warning is expected and safe in this context since we're rendering user-provided content in a controlled preview environment.
