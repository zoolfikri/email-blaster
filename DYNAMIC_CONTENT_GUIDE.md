# SendGrid Dynamic Content Guide

## 🎯 What is Dynamic Content?

Dynamic content allows you to personalize each email by automatically replacing variables with recipient-specific information. Instead of sending "Dear Customer," you can send "Dear John," to each person!

## ✨ How It Works

### **1. Use Variables in Your Email**

Variables are wrapped in double curly braces: `{{variable_name}}`

**Example Subject:**
```
Hi {{name}}, Invitation to Exclusive Session with Microsoft Indonesia
```

**Example Content:**
```html
<p>Dear {{name}},</p>
<p>We're excited to invite you and {{company}} to our event!</p>
<p>As a {{position}}, we think you'll find great value in...</p>
```

### **2. Provide Data in Excel**

Your Excel file should have columns matching the variable names:

| email | name | company | position |
|-------|------|---------|----------|
| john@example.com | John Doe | Acme Corp | Manager |
| jane@example.com | Jane Smith | Tech Solutions | Director |

### **3. Variables are Automatically Replaced**

When sending:
- John receives: "Hi John Doe, ..." and "Dear John Doe, We're excited to invite you and Acme Corp..."
- Jane receives: "Hi Jane Smith, ..." and "Dear Jane Smith, We're excited to invite you and Tech Solutions..."

---

## 📝 Available Variables

You can use **any column** from your Excel file as a variable!

### Common Examples:

| Variable | Usage | Example |
|----------|-------|---------|
| `{{name}}` | Recipient's name | John Doe |
| `{{email}}` | Email address | john@example.com |
| `{{company}}` | Company name | Acme Corporation |
| `{{position}}` | Job title | Senior Manager |
| `{{phone}}` | Phone number | +62 812 3456 7890 |
| `{{city}}` | City | Jakarta |
| `{{country}}` | Country | Indonesia |

### Custom Variables:

You can create ANY variable you want! Just add a column to your Excel file:

| email | name | favorite_color | pet_name |
|-------|------|----------------|----------|
| john@example.com | John | Blue | Buddy |
| jane@example.com | Jane | Red | Whiskers |

Then use in email:
```html
<p>Hi {{name}}, your favorite color is {{favorite_color}} and your pet {{pet_name}} is adorable!</p>
```

---

## 🚀 Quick Start Tutorial

### Step 1: Download Template

Click "Download Template" button to get the Excel file with example columns:
- email (required)
- name
- company
- position

### Step 2: Fill Your Data

Open the Excel file and add your recipients:

| email | name | company | position |
|-------|------|---------|----------|
| john.doe@acme.com | John Doe | Acme Corp | Manager |
| jane.smith@tech.com | Jane Smith | Tech Inc | Director |
| bob.jones@global.com | Bob Jones | Global Ltd | VP Sales |

### Step 3: Create Your Email

**Subject:**
```
Hi {{name}}, Special Invitation for {{company}}
```

**Content:**
```html
<p>Dear {{name}},</p>

<p>As {{position}} at {{company}}, we believe you'll find great value in our upcoming event.</p>

<p>We look forward to seeing you!</p>

<p>Best regards,<br>
The Team</p>
```

### Step 4: Upload and Send

1. Upload your Excel file
2. Preview to see how it looks
3. Click Send!

Each recipient gets a personalized email with their information!

---

## 💡 Advanced Examples

### Example 1: Event Invitation with Multiple Variables

**Excel Data:**
| email | name | company | ticket_type | event_date |
|-------|------|---------|-------------|------------|
| john@example.com | John | Acme | VIP | Nov 12 |
| jane@example.com | Jane | Tech Co | Standard | Nov 12 |

**Email:**
```html
<h2>Hi {{name}}!</h2>

<p>Your {{ticket_type}} ticket for {{company}} has been confirmed!</p>

<p><strong>Event Date:</strong> {{event_date}}</p>

<p>We can't wait to see you there!</p>
```

### Example 2: Personalized Product Recommendation

**Excel Data:**
| email | name | last_purchase | recommendation |
|-------|------|---------------|----------------|
| john@example.com | John | Laptop | Laptop Bag |
| jane@example.com | Jane | Phone | Phone Case |

**Email:**
```html
<p>Hi {{name}},</p>

<p>We noticed you recently purchased a {{last_purchase}}.</p>

<p>Based on that, we recommend: <strong>{{recommendation}}</strong></p>

<p>Get 20% off today!</p>
```

### Example 3: Multi-Language Support

**Excel Data:**
| email | name | language | greeting |
|-------|------|----------|----------|
| john@example.com | John | EN | Hello |
| pierre@example.fr | Pierre | FR | Bonjour |
| yuki@example.jp | Yuki | JP | こんにちは |

**Email:**
```html
<h1>{{greeting}} {{name}}!</h1>

<p>Thank you for joining our community.</p>
```

---

## ⚙️ Technical Details

### Variable Replacement Process

1. **Upload Excel** → System reads all columns
2. **Parse Template** → Finds all `{{variable}}` patterns
3. **Match & Replace** → For each recipient:
   - Takes their row data
   - Replaces every `{{variable}}` with their value
   - Creates personalized email
4. **Send** → Each person gets their custom email

### Fallback for Missing Values

If a variable doesn't have a value in Excel:
- Empty cell → Variable becomes empty string
- Missing column → Variable stays as `{{variable}}`

**Example:**
```
Excel: | email | name |
       | john@example.com | John |

Email: "Hi {{name}}, your company is {{company}}"
Result: "Hi John, your company is {{company}}"
```

**Best Practice:** Always provide values for all variables!

---

## 🎨 Best Practices

### ✅ DO:

1. **Use descriptive variable names**
   ```
   ✅ {{first_name}} {{last_name}}
   ❌ {{fn}} {{ln}}
   ```

2. **Test with sample data first**
   - Send to yourself
   - Check all variables are replaced
   - Verify formatting

3. **Provide fallback text**
   ```html
   <!-- Good -->
   <p>Hi {{name}},</p>
   
   <!-- Better with fallback -->
   <p>Hi {{name}} (or valued customer),</p>
   ```

4. **Keep variable names consistent**
   - Excel column: `company`
   - Email variable: `{{company}}`
   - Case-sensitive!

5. **Use in both subject AND content**
   ```
   Subject: {{name}}, your {{company}} invoice is ready
   Content: Dear {{name}} from {{company}}...
   ```

### ❌ DON'T:

1. **Use spaces in variable names**
   ```
   ❌ {{first name}}
   ✅ {{first_name}}
   ```

2. **Forget the double curly braces**
   ```
   ❌ {name}
   ❌ {{name}
   ✅ {{name}}
   ```

3. **Use special characters**
   ```
   ❌ {{name!}}
   ❌ {{company@}}
   ✅ {{company_name}}
   ```

4. **Have empty columns**
   - Ensure all recipients have values for used variables

---

## 🧪 Testing Your Dynamic Content

### Test Checklist:

- [ ] All variables have matching Excel columns
- [ ] Excel column names match exactly (case-sensitive)
- [ ] No typos in `{{variable}}` names
- [ ] All recipients have values (no empty cells)
- [ ] Preview shows personalized content
- [ ] Send test email to yourself first
- [ ] Check on mobile AND desktop
- [ ] Verify all variables are replaced

### Test Excel File:

Create a test file with just yourself:

| email | name | company | position |
|-------|------|---------|----------|
| your.email@example.com | Your Name | Test Company | Tester |

Send and verify everything looks correct before sending to your full list!

---

## 📊 Variable Limits

- **No limit** on number of variables
- **No limit** on variable name length
- **No limit** on number of recipients
- Can use same variable **multiple times** in one email

---

## 🔍 Troubleshooting

### Problem: Variables not replaced

**Possible causes:**
1. Typo in variable name
2. Column name doesn't match exactly
3. Case mismatch (`{{Name}}` vs `{{name}}`)

**Solution:** Check spelling and case!

### Problem: Some emails have `{{variable}}`

**Cause:** That recipient is missing data for that column

**Solution:** Fill in all values in Excel

### Problem: Preview not showing personalization

**Cause:** Preview shows template, not personalized version

**Solution:** Send test email to see actual personalization

---

## 💪 Power User Tips

### 1. Conditional Content

Use variables for conditional sections:

**Excel:**
| email | name | vip_status | vip_message |
|-------|------|------------|-------------|
| john@example.com | John | VIP | You get free parking! |
| jane@example.com | Jane | Regular |  |

**Email:**
```html
<p>Hi {{name}},</p>
<p>{{vip_message}}</p>
```

### 2. Multiple Personalizations

Stack variables for ultra-personalization:

```html
<p>Hi {{first_name}} {{last_name}},</p>
<p>We're excited to welcome {{company}} to our {{event_type}} event!</p>
<p>Your role as {{position}} in the {{industry}} sector makes you perfect for this.</p>
<p>Date: {{event_date}} at {{event_time}}</p>
<p>Location: {{venue}}, {{city}}</p>
```

### 3. HTML in Variables

You can even put HTML in Excel!

**Excel:**
| email | name | custom_message |
|-------|------|----------------|
| john@example.com | John | `<strong>VIP Guest</strong>` |

**Email:**
```html
<p>Welcome {{name}}, you are our {{custom_message}}!</p>
```

Result: "Welcome John, you are our **VIP Guest**!"

---

## 🎓 Examples Library

### Birthday Email
```
Subject: Happy Birthday {{name}}! 🎂

Content:
Hi {{name}},

The whole team at {{company}} wants to wish you a fantastic birthday!

Enjoy your special day!

Best,
{{sender_name}}
```

### Order Confirmation
```
Subject: Order {{order_number}} Confirmed for {{name}}

Content:
Hi {{name}},

Your order #{{order_number}} has been confirmed!

Items: {{items}}
Total: {{total_amount}}
Delivery: {{delivery_date}}

Thank you for shopping with us!
```

### Meeting Reminder
```
Subject: Reminder: Meeting with {{name}} on {{meeting_date}}

Content:
Hi {{name}},

This is a reminder about our meeting:

Date: {{meeting_date}}
Time: {{meeting_time}}
Location: {{meeting_location}}
Topic: {{meeting_topic}}

Looking forward to it!
```

---

## 📚 Summary

1. **Create variables** with `{{name}}`
2. **Add columns** to Excel with same names
3. **Fill data** for each recipient
4. **Upload** and send
5. **Each person** gets personalized email!

**Start simple, then get fancy!** 🚀
