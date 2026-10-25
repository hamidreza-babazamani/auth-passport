Express.js course exercises
# auth-passport

Backend-only authentication API built with Express 5, Passport.js (Local Strategy), MongoDB/Mongoose, bcrypt, and express-session.

---

## Features
- Register / Login / Logout with session cookies
- Password hashing with bcrypt
- Input validation with zod
- Rate limiting on auth routes
- Centralized error handling
- Session store with connect-mongo

## Endpoints

| Method | Path           | Auth | Description          |
|--------|----------------|------|----------------------|
| POST   | /auth/register | no   | Create user          |
| POST   | /auth/login    | no   | Login (sets session) |
| POST   | /auth/logout   | yes  | Logout               |
| GET    | /user/profile  | yes  | Current user         |

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

## Environment

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/passport-js
SESSION_SECRET=change-me
NODE_ENV=development
```

## Test with curl

```bash
# register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ali","username":"ali","password":"12345678"}'

# login (save cookie)
curl -c cookies.txt -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ali","password":"12345678"}'

# profile (send cookie)
curl -b cookies.txt http://localhost:3000/user/profile

# logout
curl -b cookies.txt -X POST http://localhost:3000/auth/logout
```

---

# فارسی

یک API احراز هویت بک‌اند با Express 5، Passport.js (Local Strategy)، MongoDB/Mongoose، bcrypt و express-session.

## امکانات
- ثبت‌نام / ورود / خروج با session cookie
- هش پسورد با bcrypt
- اعتبارسنجی ورودی با zod
- محدودیت نرخ درخواست روی مسیرهای احراز هویت
- مدیریت خطای متمرکز
- ذخیره session با connect-mongo

## مسیرها

| متد  | مسیر           | احراز هویت | توضیح             |
|------|----------------|------------|-------------------|
| POST | /auth/register | خیر        | ساخت کاربر        |
| POST | /auth/login    | خیر        | ورود (ست session) |
| POST | /auth/logout   | بله        | خروج              |
| GET  | /user/profile  | بله        | کاربر فعلی        |

## اجرا

```bash
cp .env.example .env
npm install
npm run dev
```

## متغیرهای محیطی

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/passport-js
SESSION_SECRET=change-me
NODE_ENV=development
```
