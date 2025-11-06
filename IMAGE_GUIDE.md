# Adding Images to Your Emails

## ✅ Method 1: Using Image URLs (Recommended)

This is the **best and most reliable method** for email images.

### How it works:
1. Upload your image to a hosting service
2. Get the public URL
3. Use it in your email HTML

### Hosting Options:

**Free Options:**
- **Imgur** - https://imgur.com (Simple, no account needed)
- **GitHub** - Upload to your repository (if public)
- **Google Drive** - Make publicly accessible
- **Cloudinary** - Free tier available

**Paid/Professional:**
- **AWS S3** - Professional, reliable
- **Cloudflare R2** - Cost-effective
- **Your own website** - Best for branding

### Example Code:

```html
<!-- Simple image -->
<img src="https://example.com/logo.png" alt="Company Logo" style="max-width: 200px;" />

<!-- Centered image -->
<div style="text-align: center;">
  <img src="https://example.com/banner.jpg" alt="Event Banner" style="max-width: 100%; height: auto;" />
</div>

<!-- Image with link -->
<a href="https://example.com">
  <img src="https://example.com/logo.png" alt="Logo" style="max-width: 150px;" />
</a>
```

### Best Practices:
- ✅ Use **HTTPS** URLs (not HTTP)
- ✅ Keep images **under 1MB** for faster loading
- ✅ Use **web-optimized formats** (JPG, PNG, GIF)
- ✅ Always include **alt text** for accessibility
- ✅ Use **inline styles** (not CSS classes)
- ✅ Set **max-width** to prevent overflow on mobile

---

## 📦 Method 2: Base64 Encoded Images

Embed images directly in the HTML (good for small images like icons).

### When to use:
- ✅ Small logos or icons (< 50KB)
- ✅ When you can't host images externally
- ✅ For critical images that must display

### How to convert:
1. Use online tool: https://www.base64-image.de/
2. Or use Node.js:
```javascript
const fs = require('fs');
const imageBuffer = fs.readFileSync('logo.png');
const base64 = imageBuffer.toString('base64');
console.log(`data:image/png;base64,${base64}`);
```

### Example Code:

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." 
     alt="Small Icon" 
     style="width: 20px; height: 20px;" />
```

### ⚠️ Limitations:
- ❌ Increases email size significantly
- ❌ Some email clients may block
- ❌ Not good for large images
- ❌ Can trigger spam filters if overused

---

## 🎨 Method 3: Using Your Current Template

The predefined template now includes a Microsoft logo as an example!

### To customize:

1. **Click "Load Microsoft Event Template"**
2. **Edit the content field** and find this line:
```html
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" 
     alt="Microsoft Logo" 
     style="max-width: 180px; height: auto;" />
```

3. **Replace the URL** with your own image:
```html
<img src="https://your-domain.com/your-logo.png" 
     alt="Your Company Logo" 
     style="max-width: 180px; height: auto;" />
```

---

## 📋 Common Image Patterns

### Header Logo
```html
<div style="text-align: center; margin-bottom: 30px;">
  <img src="https://example.com/logo.png" 
       alt="Company Logo" 
       style="max-width: 200px; height: auto;" />
</div>
```

### Banner Image
```html
<img src="https://example.com/banner.jpg" 
     alt="Event Banner" 
     style="width: 100%; max-width: 600px; height: auto; display: block;" />
```

### Side-by-side Images
```html
<table style="width: 100%;">
  <tr>
    <td style="width: 50%; padding: 10px;">
      <img src="https://example.com/image1.jpg" alt="Image 1" style="width: 100%; height: auto;" />
    </td>
    <td style="width: 50%; padding: 10px;">
      <img src="https://example.com/image2.jpg" alt="Image 2" style="width: 100%; height: auto;" />
    </td>
  </tr>
</table>
```

### Social Media Icons
```html
<div style="text-align: center; margin: 20px 0;">
  <a href="https://facebook.com/yourpage">
    <img src="https://example.com/facebook-icon.png" alt="Facebook" style="width: 32px; height: 32px; margin: 0 5px;" />
  </a>
  <a href="https://twitter.com/yourhandle">
    <img src="https://example.com/twitter-icon.png" alt="Twitter" style="width: 32px; height: 32px; margin: 0 5px;" />
  </a>
</div>
```

---

## 🚀 Quick Start Guide

### Step 1: Upload Your Image
1. Go to https://imgur.com
2. Click "New post"
3. Upload your image
4. Right-click on the uploaded image → "Copy image address"

### Step 2: Add to Email
1. In the Email Blaster app, click "Load Microsoft Event Template"
2. In the content field, add your image:
```html
<img src="PASTE_YOUR_IMGUR_URL_HERE" alt="My Image" style="max-width: 400px;" />
```

### Step 3: Preview
- The preview panel will show your image immediately
- Test before sending!

---

## 💡 Pro Tips

### Image Dimensions
- **Logo**: 200-300px wide
- **Header banner**: 600px wide (max)
- **Icons**: 24-48px
- **Full-width**: 600px max (safe for all email clients)

### File Formats
- **JPG**: Photos, complex images
- **PNG**: Logos, graphics with transparency
- **GIF**: Simple animations (use sparingly)
- **SVG**: ❌ Not supported in most email clients

### Responsive Images
Always use this style for mobile-friendly images:
```html
style="max-width: 100%; height: auto; display: block;"
```

### Testing
- Preview in the app first
- Send a test email to yourself
- Check on desktop AND mobile
- Test in different email clients (Gmail, Outlook, etc.)

---

## ❌ Common Mistakes to Avoid

1. **Using local file paths** - Won't work!
   ```html
   <!-- ❌ WRONG -->
   <img src="C:/Users/Desktop/logo.png" />
   
   <!-- ✅ CORRECT -->
   <img src="https://example.com/logo.png" />
   ```

2. **Forgetting alt text**
   ```html
   <!-- ❌ Bad -->
   <img src="logo.png" />
   
   <!-- ✅ Good -->
   <img src="logo.png" alt="Company Logo" />
   ```

3. **Not setting max-width**
   ```html
   <!-- ❌ May overflow on mobile -->
   <img src="banner.jpg" />
   
   <!-- ✅ Responsive -->
   <img src="banner.jpg" style="max-width: 100%; height: auto;" />
   ```

4. **Using CSS classes** - Email clients strip them!
   ```html
   <!-- ❌ Won't work -->
   <img src="logo.png" class="logo" />
   
   <!-- ✅ Use inline styles -->
   <img src="logo.png" style="width: 200px;" />
   ```

---

## 🎯 Example: Complete Email with Images

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <!-- Header Logo -->
  <div style="text-align: center; padding: 20px 0;">
    <img src="https://example.com/logo.png" alt="Company Logo" style="max-width: 200px; height: auto;" />
  </div>
  
  <!-- Banner -->
  <img src="https://example.com/banner.jpg" alt="Event Banner" style="width: 100%; height: auto; display: block;" />
  
  <!-- Content -->
  <div style="padding: 20px;">
    <h1>Welcome to Our Event!</h1>
    <p>We're excited to have you join us...</p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; padding: 20px; background: #f5f5f5;">
    <a href="https://facebook.com">
      <img src="https://example.com/fb-icon.png" alt="Facebook" style="width: 32px; margin: 0 10px;" />
    </a>
    <a href="https://twitter.com">
      <img src="https://example.com/tw-icon.png" alt="Twitter" style="width: 32px; margin: 0 10px;" />
    </a>
  </div>
</div>
```

---

## 📞 Need Help?

The template already includes an example image. Load it and see how it works!

**Try it now:**
1. Click "Load Microsoft Event Template"
2. Look at the preview - you'll see the Microsoft logo
3. Copy that pattern for your own images
