# 🔐 Authentication System - Quick Start Guide

## What I've Created For You

✅ **Login Page** (`/login`) - For existing users  
✅ **Sign Up Page** (`/signup`) - For new users  
✅ **Authentication Context** - Global auth state management  
✅ **Backend Server** - Two versions (dev & production)  
✅ **Google Sheets Integration** - Store user data in spreadsheets  

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Backend Server (Development)

Open a NEW terminal and run:

```bash
npm run server
```

You should see:
```
🚀 DEV Auth Server Running!
📍 http://localhost:5000
```

### Step 3: Start Frontend (Keep your existing terminal)

```bash
npm run dev
```

### Step 4: Test It Out!

1. Go to `http://localhost:8080/signup`
2. Create an account with:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   
3. You'll be logged in and redirected home
4. Click logout (in navbar) or go to `/login`
5. Test login with the same email and password

---

## 📊 View Registered Users

While the dev server is running, visit:

```
http://localhost:5000/api/dev/users
```

This shows all registered users in JSON format.

---

## 🎯 Features

### Login Page
- ✅ Email & password fields
- ✅ Form validation
- ✅ Error messages
- ✅ Link to create account
- ✅ "Forgot password" link (for future implementation)

### Sign Up Page
- ✅ Full name
- ✅ Email
- ✅ Phone (optional)
- ✅ Address (optional)
- ✅ Password with confirmation
- ✅ Terms & conditions checkbox
- ✅ Password strength checking
- ✅ Form validation

### Backend
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ User registration
- ✅ User login
- ✅ Profile endpoint
- ✅ Google Sheets integration (optional)

---

## 📁 File Structure

```
src/
├── context/
│   ├── CartContext.tsx       (existing)
│   └── AuthContext.tsx       (NEW) - Auth state management
├── pages/
│   ├── Login.tsx             (NEW) - Login page
│   ├── Signup.tsx            (NEW) - Sign up page
│   └── ... (other pages)
└── App.tsx                   (UPDATED) - Added auth routes

Root/
├── server-dev.ts             (NEW) - Dev server (no Google Sheets)
├── server.ts                 (NEW) - Prod server (Google Sheets)
├── .env.example              (NEW) - Environment template
├── AUTH_SETUP.md             (NEW) - Detailed setup guide
└── AUTH_QUICK_START.md       (THIS FILE) - Quick start
```

---

## 🔌 API Endpoints

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "555-1234",
    "address": "123 Main St"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🔄 How It Works

### Sign Up Flow
1. User fills form and clicks "Create Account"
2. Frontend sends `POST /api/auth/signup` to backend
3. Backend validates data and hashes password
4. User created in memory (or saved to Google Sheets)
5. JWT token generated and sent back
6. Frontend stores token in localStorage
7. User redirected to home page

### Login Flow
1. User enters email and password
2. Frontend sends `POST /api/auth/login` to backend
3. Backend finds user and checks password
4. JWT token generated and sent back
5. Frontend stores token and sets auth context
6. User redirected to home page

### Persistence
- User data saved in `localStorage`
- JWT token saved in `localStorage`
- On page refresh, user stays logged in (from localStorage)

---

## 🌐 Using Google Sheets (Production)

### Setup Google Sheets

1. **Get Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Sheets API
   - Create Service Account
   - Download JSON credentials

2. **Place credentials:**
   - Save as `credentials.json` in project root

3. **Create Sheet:**
   - Create Google Sheet with columns:
     - A: User ID
     - B: Email
     - C: Name
     - D: Phone
     - E: Address
     - F: Created At

4. **Configure `.env`:**
   ```bash
   GOOGLE_SHEET_ID=your-sheet-id-here
   GOOGLE_CREDENTIALS_PATH=./credentials.json
   ```

5. **Run Production Server:**
   ```bash
   npm run server:prod
   ```

New users will automatically be added to your Google Sheet!

---

## ⚙️ Navbar Integration (Optional)

Add login/logout buttons to your Navbar:

```tsx
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <button onClick={() => {
            logout();
            navigate('/');
          }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </>
      )}
    </nav>
  );
};
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000 (Windows)
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### "Cannot find module 'express'"
```bash
npm install
```

### Frontend can't reach backend
- Make sure backend is running: `npm run server`
- Check localhost:5000/api/health returns OK
- Check API URLs in `src/context/AuthContext.tsx`

### Users not persisting after refresh
- Check if localStorage is enabled
- Check browser console for errors
- Look at Network tab in DevTools

---

## 📝 Test Accounts

You can use these to test:

| Email | Password | Name |
|-------|----------|------|
| test@example.com | password123 | Test User |
| admin@example.com | admin123 | Admin User |

(Create them once and they'll be remembered)

---

## 🔐 Security Checklist

Before going to production:

- [ ] Change JWT_SECRET in `.env`
- [ ] Add `.env` to `.gitignore`
- [ ] Add email verification
- [ ] Add password reset
- [ ] Add rate limiting
- [ ] Use HTTPS
- [ ] Add CSRF protection
- [ ] Validate all inputs
- [ ] Add refresh tokens
- [ ] Set secure cookies

---

## 📞 Next Steps

1. **Test the login/signup:** Try creating an account
2. **View users:** Check http://localhost:5000/api/dev/users
3. **Setup Google Sheets:** Follow the "Using Google Sheets" section for persistent storage
4. **View AUTH_SETUP.md:** More detailed documentation
5. **Add navbar buttons:** Integrate login/logout in your navbar

---

## 📚 Additional Resources

- [JWT Docs](https://jwt.io/)
- [Express Docs](https://expressjs.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [React Router](https://reactrouter.com/)

---

**That's it! You now have a working authentication system! 🎉**
