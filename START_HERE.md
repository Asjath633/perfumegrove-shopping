# 🚀 START HERE - Quick Commands

Copy and paste these commands to get your auth system running in 2 minutes:

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Start Backend (Open NEW Terminal)
```bash
npm run server
```

You should see:
```
🚀 DEV Auth Server Running!
📍 http://localhost:5000
```

## Step 3: Start Frontend (Original Terminal)
```bash
npm run dev
```

Visit: http://localhost:8080

## Step 4: Test It!

1. Go to: http://localhost:8080/signup
2. Create account:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. You're logged in! ✅

## Step 5: View Registered Users
```
http://localhost:5000/api/dev/users
```

---

## 📝 What You Just Created:

✅ **Login Page** - `/login`  
✅ **Sign Up Page** - `/signup`  
✅ **Auth System** - Context-based state management  
✅ **Backend Server** - Express API with JWT  
✅ **Data Storage** - Ready for Google Sheets  

---

## 🎯 Next Steps:

1. **Test Navbar Integration** (Optional):
   ```bash
   cp NAVBAR_WITH_AUTH.tsx src/components/layout/Navbar.tsx
   ```
   Then refresh your app to see login/logout buttons!

2. **Setup Google Sheets** (Production):
   - Read: `AUTH_SETUP.md`
   - Get credentials from Google
   - Run: `npm run server:prod`

3. **Read Documentation**:
   - Quick start? → `AUTH_QUICK_START.md`
   - Detailed setup? → `AUTH_SETUP.md`  
   - Implementation details? → `IMPLEMENTATION_GUIDE.md`

---

## 🆘 Troubleshooting:

Port 5000 in use?
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill it
taskkill /PID <PID> /F
```

Dependencies missing?
```bash
npm install
```

---

**That's it! You're done! 🎉**
