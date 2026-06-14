# RahulMaida Landing Page - Deployment Guide

## 🎯 Complete Step-by-Step Deployment Instructions

### Prerequisites
- Node.js installed on your computer
- Git installed
- FTP client (FileZilla recommended, or use command line)
- InfinityFree account credentials

---

## 📋 Step 1: Clone the Repository

```bash
# Navigate to your projects folder
cd ~/projects

# Clone the repository
git clone https://github.com/devrahulmaida-sketch/RahulMaida-Web.git

# Enter the project directory
cd RahulMaida-Web
```

---

## 📦 Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# Verify installation (optional)
npm list
```

---

## 🔨 Step 3: Build for Production

```bash
# Build the project (creates dist/ folder)
npm run build

# Verify build was successful
ls -la dist/
```

This will create an `index.html` file in the `dist/` folder with all assets bundled.

---

## 📤 Step 4: Upload to InfinityFree (3 Methods)

### **Method 1: Using FileZilla (GUI - Easiest)**

1. **Download FileZilla:** https://filezilla-project.org/

2. **Open FileZilla and connect:**
   - Host: `ftpupload.net`
   - Username: `if0_42136014`
   - Password: `AjNvNZ5K7jeqJjn`
   - Port: `21`
   - Click "Quickconnect"

3. **Navigate in FileZilla:**
   - **Left side (Local):** Browse to your `RahulMaida-Web/dist/` folder
   - **Right side (Remote):** Navigate to `/home/vol8_5/infinityfree.com/if0_42136014/public_html/`

4. **Upload files:**
   - Select all files in `dist/` folder (Ctrl+A)
   - Drag and drop to right panel OR right-click → Upload
   - Wait for upload to complete

---

### **Method 2: Using Command Line (Terminal/CMD)**

**On Windows (PowerShell):**
```bash
# Navigate to dist folder
cd dist

# Upload all files using ftp
# Create a batch FTP script
```

**On Mac/Linux:**
```bash
# Navigate to dist folder
cd dist

# Use lftp (install if needed: brew install lftp)
lftp -u if0_42136014,AjNvNZ5K7jeqJjn ftpupload.net

# Once connected to FTP, run these commands:
cd /home/vol8_5/infinityfree.com/if0_42136014/public_html/
mirror --reverse --continue --verbose .
quit
```

---

### **Method 3: Using Web-based File Manager (cPanel)**

1. Go to: https://ln1tgcu9.infinityfree.com/ (Your InfinityFree domain)
2. Log in with your credentials
3. Look for **File Manager** or **cPanel**
4. Navigate to `public_html/`
5. Upload `dist/index.html` and all files from the dist folder
6. Ensure `index.html` is in the root directory

---

## 🌐 Step 5: Verify Deployment

After uploading, visit your website:
- **Main Domain:** https://ln1tgcu9.infinityfree.com/
- **Or your custom domain** (if configured)

Check that:
- ✅ Page loads without errors
- ✅ All animations work smoothly
- ✅ Links to platforms are clickable
- ✅ Responsive design works on mobile

---

## 🔄 Step 6: Update in Future

Whenever you make changes:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Rebuild the project
npm run build

# 3. Upload dist/ folder contents to InfinityFree again
# (Follow Method 1, 2, or 3 from Step 4)
```

---

## 📝 InfinityFree Account Details

| Detail | Value |
|--------|-------|
| **FTP Host** | ftpupload.net |
| **FTP Username** | if0_42136014 |
| **FTP Password** | AjNvNZ5K7jeqJjn |
| **MySQL Host** | sql208.infinityfree.com |
| **Home Directory** | /home/vol8_5/infinityfree.com/if0_42136014 |
| **Main Domain** | ln1tgcu9.infinityfree.com |
| **Main Email** | dev.rahulmaida@gmail.com |

---

## ⚠️ Important Notes

1. **Delete old files:** Before uploading new build, clear old `index.html` and assets from `public_html/`
2. **Use single-file build:** The project uses `vite-plugin-singlefile` which bundles everything into ONE `index.html` file
3. **Cache issues:** If changes don't appear, clear browser cache (Ctrl+Shift+Del)
4. **Subdomain setup:** To host on subdomain (e.g., `rahulamaida.freedev.app`), configure in InfinityFree control panel

---

## 🆘 Troubleshooting

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### FTP connection fails
- Verify credentials are correct
- Check if FTP is enabled in InfinityFree panel
- Try a different FTP client

### Website shows "Cannot GET /"
- Ensure `index.html` is in `public_html/` root directory
- Not in a subfolder

### Animations not working
- Check browser console for errors (F12)
- Clear cache and reload
- Ensure all files uploaded successfully

---

## 📚 Additional Resources

- **Vite Documentation:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Framer Motion:** https://www.framer.com/motion/
- **FileZilla Help:** https://wiki.filezilla-project.org/

---

**Happy Deploying! 🚀**
