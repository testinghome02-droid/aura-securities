# 🚀 AURA SECURITIES - OTP System Setup

## Your Current Project Structure:

```
AURA-SECURITIES/
├── src/
│   ├── app/
│   │   ├── admin/              ← We'll add admin dashboard here
│   │   ├── api/
│   │   │   └── otp/
│   │   │       ├── send/
│   │   │       │   └── route.ts    ← Replace this
│   │   │       └── verify/
│   │   │           └── route.ts    ← Replace this
│   │   ├── contact/
│   │   ├── demat-trading/
│   │   ├── ipo/
│   │   ├── mutual-fund/
│   │   ├── services/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── OtpForm.tsx         ← Already exists
│   ├── hooks/
│   ├── lib/                        ← We'll add prisma.ts here
│   ├── styles/
│   ├── types/
│   └── utils/
├── prisma/                         ← We'll create this
│   └── schema.prisma
├── .env.local                      ← We'll create this
└── package.json
```

---

## ⚡ STEP 1: Install Dependencies

```bash
npm install @prisma/client twilio
npm install --save-dev prisma
```

---

## 📋 STEP 2: Create Database Schema

### Create folder and file:

```bash
mkdir prisma
```

### Create file: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Contact {
  id          String   @id @default(cuid())
  countryCode String
  mobile      String
  verifiedAt  DateTime @default(now())
  createdAt   DateTime @default(now())

  @@unique([countryCode, mobile])
  @@index([mobile])
  @@index([verifiedAt])
}

model OtpAttempt {
  id          String   @id @default(cuid())
  countryCode String
  mobile      String
  otp         String
  verified    Boolean  @default(false)
  attempts    Int      @default(0)
  expiresAt   DateTime
  createdAt   DateTime @default(now())

  @@index([countryCode, mobile])
  @@index([expiresAt])
}
```

### Initialize database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📋 STEP 3: Create Prisma Client Helper

### Create file: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 📋 STEP 4: Setup Twilio

### 4.1: Create Account (FREE!)

1. Go to: https://www.twilio.com/try-twilio
2. Sign up (you get $15 free credit!)
3. Verify your email

### 4.2: Get Phone Number

1. In Twilio Console: https://console.twilio.com
2. Click "Get a Trial Number"
3. Accept the number

### 4.3: Get Credentials

On the console dashboard, copy:

- **Account SID** (starts with AC...)
- **Auth Token** (click to reveal)
- **Phone Number** (the one you just got)

### 4.4: Verify YOUR Phone (for testing)

**Important:** With free account, you can only send to verified numbers!

1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
2. Click "Add a new number"
3. Enter YOUR phone number
4. Enter the verification code they send

---

## 📋 STEP 5: Setup Environment Variables

### Create file: `.env.local`

```env
# Database
DATABASE_URL="file:./dev.db"

# Twilio (from Step 4)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Admin Access
ADMIN_API_KEY=aura-admin-secret-key-2026

# Optional: Slack Notification
# SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK
```

---

## 📋 STEP 6: Replace API Route Files

### File 1: Replace `src/app/api/otp/send/route.ts`

**Delete everything** in this file and paste the content from **`send-route.ts`** I provided.

### File 2: Replace `src/app/api/otp/verify/route.ts`

**Delete everything** in this file and paste the content from **`verify-route.ts`** I provided.

---

## 📋 STEP 7: Create Admin Dashboard

### Create folder:

```bash
mkdir src/app/admin
```

### Create file: `src/app/admin/page.tsx`

Paste the content from **`admin-page.tsx`** I provided.

---

## 📋 STEP 8: Test Everything!

### 8.1: Start the app

```bash
npm run dev
```

### 8.2: Test OTP on main page

1. Go to: http://localhost:3000
2. Enter YOUR verified phone number (from Step 4.4)
3. Click "Send OTP"
4. **Check your phone for SMS!** 📱
5. Enter the OTP
6. Click "Verify"
7. Success! ✅

### 8.3: View Admin Dashboard

1. Go to: http://localhost:3000/admin
2. Enter your API key: `aura-admin-secret-key-2026`
3. Click "Login"
4. You'll see all verified contacts!
5. Click "Export CSV" to download

---

## 📂 Final File Structure

```
AURA-SECURITIES/
├── prisma/
│   ├── dev.db                      ✅ Created by migration
│   ├── dev.db-journal
│   └── schema.prisma               ✅ NEW
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx            ✅ NEW - Admin Dashboard
│   │   ├── api/
│   │   │   └── otp/
│   │   │       ├── send/
│   │   │       │   └── route.ts    ✅ UPDATED
│   │   │       └── verify/
│   │   │           └── route.ts    ✅ UPDATED
│   │   └── ...
│   ├── components/
│   │   └── forms/
│   │       └── OtpForm.tsx         ✅ Already exists
│   └── lib/
│       └── prisma.ts               ✅ NEW
├── .env.local                      ✅ NEW
└── package.json                    ✅ UPDATED
```

---

## 📱 How It Works Now

### User Flow:

1. User goes to your website
2. Enters phone number in OtpForm
3. Clicks "Send OTP"
4. **Receives REAL SMS on their phone** 📱
5. Enters OTP from SMS
6. Clicks "Verify OTP"
7. **Contact automatically saved to database** ✅

### Admin Flow:

1. Admin goes to `/admin`
2. Enters API key
3. Sees all verified phone numbers
4. Can export to CSV
5. Can refresh anytime

---

## 🎯 What You Can Do Now

✅ Send REAL SMS to users
✅ Verify OTP codes
✅ Save all verified contacts to database
✅ View contacts in admin dashboard
✅ Export contacts to CSV
✅ Get notified when new users sign up (optional Slack)

---

## 💰 Costs

**Twilio Trial (FREE):**

- $15 free credit
- ~2000 SMS messages
- Can only send to verified numbers

**After Trial (Paid):**

- India: ₹0.35 per SMS (~$0.0047)
- No monthly fees
- Only pay for SMS sent

**Database:**

- SQLite: FREE (local file)
- Or upgrade to PostgreSQL later

---

## 🔍 View Your Data

### Option 1: Prisma Studio (Visual)

```bash
npx prisma studio
```

Opens at: http://localhost:5555

### Option 2: Admin Dashboard

http://localhost:3000/admin

### Option 3: API Call

```bash
curl -H "Authorization: Bearer aura-admin-secret-key-2026" \
  http://localhost:3000/api/otp/verify
```

---

## 🆘 Troubleshooting

### "Prisma Client not found"

```bash
npx prisma generate
```

### "Database error"

```bash
npx prisma migrate dev
```

### "SMS not received"

→ Make sure phone is verified in Twilio console
→ Check Twilio logs: https://console.twilio.com/us1/monitor/logs/sms

### "Twilio authentication failed"

→ Check credentials in `.env.local`
→ Make sure no extra spaces

### "Admin unauthorized"

→ Check `ADMIN_API_KEY` matches in `.env.local`

---

## 🚀 Next Steps

1. **Test with your phone** ✅
2. **Add more team members** - verify their phones in Twilio
3. **Upgrade Twilio** - send to ANY number
4. **Add email notifications** - notify admin via email
5. **Deploy to production** - use Vercel or your hosting

---

## 📞 Integration Ideas

You can now add the OtpForm to any page:

### In Contact Page:

```tsx
// src/app/contact/page.tsx
import OtpForm from "@/components/forms/OtpForm";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <OtpForm />
    </div>
  );
}
```

### In IPO Page:

```tsx
// src/app/ipo/page.tsx
import OtpForm from "@/components/forms/OtpForm";

export default function IpoPage() {
  return (
    <div>
      <h1>IPO Registration</h1>
      <p>Verify your phone to get IPO updates</p>
      <OtpForm />
    </div>
  );
}
```

---

## ✅ You're All Set!

Your AURA Securities OTP system is now:

- ✅ Sending REAL SMS
- ✅ Saving verified contacts
- ✅ Ready for admin to manage

Need help? Just ask! 😊
