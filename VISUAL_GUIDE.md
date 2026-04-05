# 📸 What You Get - Visual Overview

## 🔑 Login Page (`/login`)

```
┌─────────────────────────────────────┐
│                                     │
│      Welcome Back                   │
│   Sign in to your Attarome          │
│                                     │
│  ─────────────────────────────      │
│  Email Address                      │
│  [you@example.com          ]        │
│                                     │
│  Password                           │
│  [••••••••               ]          │
│                                     │
│  ┌─────────────────────────┐        │
│  │    Sign In              │        │
│  └─────────────────────────┘        │
│                                     │
│  ─────────────────────────────      │
│  Don't have an account?             │
│  ─────────────────────────────      │
│                                     │
│  ┌─────────────────────────┐        │
│  │  Create Account         │        │
│  └─────────────────────────┘        │
│                                     │
│  Forgot password?                   │
│                                     │
└─────────────────────────────────────┘
```

## ✍️ Sign Up Page (`/signup`)

```
┌─────────────────────────────────────┐
│                                     │
│      Create Account                 │
│   Join Attarome and discover        │
│   premium attars                    │
│                                     │
│  Full Name *                        │
│  [John Doe                 ]        │
│                                     │
│  Email Address *                    │
│  [you@example.com          ]        │
│                                     │
│  Phone Number (Optional)            │
│  [+1 (555) 000-0000        ]        │
│                                     │
│  Address (Optional)                 │
│  [                         ]        │
│  [123 Main St, City, State ]        │
│                                     │
│  Password *                         │
│  [••••••••               ]          │
│  Minimum 6 characters               │
│                                     │
│  Confirm Password *                 │
│  [••••••••               ]          │
│                                     │
│  ☑ I agree to the Terms and        │
│    Conditions and Privacy Policy    │
│                                     │
│  ┌─────────────────────────┐        │
│  │  Create Account         │        │
│  └─────────────────────────┘        │
│                                     │
│  Have an account? Sign In           │
│                                     │
└─────────────────────────────────────┘
```

## 🧾 Data Spreadsheet View

When using Google Sheets integration, your data looks like:

```
┌────────┬──────────────────┬──────────┬──────────────┬────────────────────┬──────────────────┐
│ User   │ Email            │ Name     │ Phone        │ Address            │ Created At       │
├────────┼──────────────────┼──────────┼──────────────┼────────────────────┼──────────────────┤
│ user_1 │ john@example.com │ John Doe │ +1-555-1234  │ 123 Main St        │ 2024-01-01...    │
│ user_2 │ jane@example.com │ Jane Doe │ +1-555-5678  │ 456 Oak Ave        │ 2024-01-02...    │
│ user_3 │ bob@example.com  │ Bob      │              │                    │ 2024-01-03...    │
└────────┴──────────────────┴──────────┴──────────────┴────────────────────┴──────────────────┘
```

## 📊 Dev Server User List (`/api/dev/users`)

View all users as JSON:

```json
{
  "total": 3,
  "users": [
    {
      "id": "user_1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-1234",
      "address": "123 Main St",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "user_2",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "Not provided",
      "address": "Not provided",
      "createdAt": "2024-01-02T00:00:00Z"
    },
    {
      "id": "user_3",
      "name": "Bob",
      "email": "bob@example.com",
      "phone": "Not provided",
      "address": "Not provided",
      "createdAt": "2024-01-03T00:00:00Z"
    }
  ]
}
```

## 🧭 User Flow Diagram

```
START
  │
  ├──→ [/] Home Page
  │      │
  │      ├──→ [/signup] Sign Up Page
  │      │      │
  │      │      └──→ Create Account
  │      │           │
  │      │           └──→ Store in Backend ✓
  │      │                │
  │      │                └──→ [/] Home (Logged In) ✓
  │      │
  │      └──→ [/login] Login Page
  │             │
  │             └──→ Enter Credentials
  │                  │
  │                  └──→ [/] Home (Logged In) ✓
  │
  └──→ [/logout] Logout
         │
         └──→ [/] Home (Logged Out)
```

## 🔐 Authentication Flow

```
FRONTEND                           BACKEND
   │                                 │
   ├─ User enters email/password     │
   │                                 │
   └──────────────────────────────→ POST /api/auth/login
                                     │
                                     ├─ Hash password check
                                     ├─ Generate JWT token
                                     │
   ← JWT Token + User Data ──────────┤
   │                                 │
   ├─ Store in localStorage
   ├─ Redirect to home
   └─ User is logged in! ✓
```

## 📦 API Endpoints Overview

```
┌────────┬────────────────────────┬────────────────────┐
│ Method │ Endpoint               │ Purpose            │
├────────┼────────────────────────┼────────────────────┤
│ POST   │ /api/auth/signup       │ Create account     │
│ POST   │ /api/auth/login        │ Login user         │
│ GET    │ /api/auth/profile      │ Get user profile   │
│ GET    │ /api/dev/users         │ View all users     │
│ GET    │ /api/health            │ Server status      │
└────────┴────────────────────────┴────────────────────┘
```

## 🎨 Optional Navbar Integration

With `NAVBAR_WITH_AUTH.tsx`:

```
NOT LOGGED IN:
┌──────────────────────────────────────────────────────────────┐
│ ZANDRO    Home  Perfumes  Accessories      [🔍]  [🛒]  [👤]   │
│                                            [LOGIN] [SIGNUP]   │
└──────────────────────────────────────────────────────────────┘

LOGGED IN:
┌──────────────────────────────────────────────────────────────┐
│ ZANDRO    Home  Perfumes  Accessories      [🔍]  [🛒]  [👤]   │
│                                            [John Doe ▼]       │
│                                            ┌──────────────┐   │
│                                            │ John Doe     │   │
│                                            │ john@...     │   │
│                                            ├──────────────┤   │
│                                            │ Logout   🚪  │   │
│                                            └──────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Summary

```
┌─────────────┐
│ User        │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ React Frontend      │
│ - Login/Signup      │
│ - Auth Context      │
│ - localStorage      │
└─────────┬───────────┘
          │
          ├──────────────────────────────────┐
          │                                  │
          ▼                                  ▼
    ┌──────────────┐              ┌─────────────────┐
    │ Development  │              │ Production      │
    │ Server       │              │ Server          │
    │ (port 5000)  │              │ (port 5000)     │
    │ - In-Memory  │              │ - Google Sheets │
    │   Storage    │              │ - Persistent    │
    └──────┬───────┘              └────────┬────────┘
           │                               │
           └───────────────┬───────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ User Data    │
                    │ Repository   │
                    └──────────────┘
```

---

## 🎯 Key Features You Get

| Feature | Details |
|---------|---------|
| 🔐 **Secure Auth** | Password hashing, JWT tokens |
| 📱 **Responsive** | Works on desktop and mobile |
| ✅ **Validation** | Email, password, required fields |
| 💾 **Multiple Storage** | Dev mode (memory) or Google Sheets |
| 🌐 **API-Ready** | RESTful endpoints |
| 🎨 **Beautiful UI** | Matches your Attarome design |
| 🔗 **Context-Based** | Easy to use in any component |
| ⚡ **Hot Reload** | Changes reflected immediately |

---

**Ready to see it in action? Run: `npm install && npm run server` and `npm run dev`** 🚀
