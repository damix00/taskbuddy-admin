# TaskBuddy Admin Panel

The **TaskBuddy Admin Panel** is a web-based administrative interface used to manage user content, view application statistics, and control backend configurations. The interface is built with **Next.js**, **React**, and **TypeScript**, and is designed for admins only.

For more information, check out the [mobile app](https://github.com/damix00/taskbuddy-flutter).

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Auth.js (email + password, session-based)
- **UI Library:** ShadCN, Tailwind

---

## 📦 Features

### 🔐 Authentication
- Email/password login for admin users.
- Cookie-based sessions via Auth.js.
- Role-based access control.

### 📊 Analytics Dashboard
- Overview of app stats (users, posts, reports).
- Weekly activity charts (registrations, post creation).

### ⚙️ Server Configuration
- View uptime and server time.
- Control Firebase Remote Config & app-level killswitches.

### 👥 User Management
- View, search, and paginate users.
- User profile detail view with sections:
  - Overview & statistics
  - Session history (with IP and GPS if available)
  - Posts, reports, and reviews
  - Full account management (edit email, password, etc.)

### 📝 Post Management
- View all posts with filters/search.
- Detailed post view with image gallery, report list, and edit controls.

### 🚨 Reports
- Browse all reports in a table.
- View detailed report data, update status, and mark as valid/invalid.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Install Dependencies
```bash
npm install
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Apply Migrations (if needed)
```bash
npx prisma migrate dev
```

### Run the App
```bash
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)
---
