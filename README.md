🏥 AI Smart Hospital Management System

A production-grade, role-based Hospital Management System with secure authentication, real-time workflows, analytics dashboards, and AI-assisted features.
Designed with clean architecture, scalability, and deployment-readiness in mind.

📌 Project Overview

The AI Smart Hospital Management System is a full-stack web application that digitizes hospital operations:

Patient onboarding & lifecycle (OPD → ADMITTED → DISCHARGED)

Doctor scheduling & availability

Appointment booking (Patient / Admin / AI)

Billing & payments

Room & bed management

Role-aware AI assistant (safe-mode supported)

Analytics dashboards for admins

Secure JWT-based authentication

This project is NOT a toy project — it is designed to match real hospital workflows and industry expectations.

🧠 Core Design Principles

Backend is the source of truth

Frontend is UX-only (no trust)

Role-based access enforced server-side

JWT validation + role middleware separation

AI runs in safe mode when disabled

Deployment-first mindset

🧩 Tech Stack
Frontend

React + Vite

Axios (with interceptor)

Tailwind CSS

Role-based routing

Netlify (deployment)

Backend

Node.js + Express

MongoDB Atlas (Mongoose)

JWT Authentication

Role-based Authorization Middleware

AI module (OpenAI-ready, safe-mode supported)

Docker

Render (deployment)

DevOps

Docker & Docker Compose

GitHub Actions (CI)

Environment-based configuration

Secrets protection (no .env in GitHub)

🗂️ Project Structure
ai-smart-hospital/
├── client/                     # Frontend (React)
│   ├── src/
│   │   ├── api/                # Axios instance
│   │   ├── components/         # Reusable UI & AI components
│   │   ├── context/            # Auth Context
│   │   ├── layouts/            # Admin / Doctor / Patient layouts
│   │   ├── pages/              # Role-based pages
│   │   ├── routes/             # Protected routing
│   │   └── main.jsx
│   ├── .env.production         # Production API URL
│   └── package.json
│
├── server/                     # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, role, rate limiting
│   │   ├── ai/                 # AI logic (safe mode)
│   │   ├── services/           # External services (AI)
│   │   ├── utils/              # Helpers (slot generator)
│   │   ├── config/             # DB connection
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml
├── .github/workflows/           # CI pipelines
├── README.md

🏗️ System Architecture (High Level)
Browser (React)
   ↓
Axios Interceptor (JWT injection)
   ↓
Express API Gateway
   ↓
Auth Middleware (JWT verify)
   ↓
Role Middleware (RBAC)
   ↓
Controller Layer
   ↓
Service / AI / DB Layer
   ↓
MongoDB Atlas

🔐 Authentication & Authorization Flow
1️⃣ Login

User logs in → JWT issued by backend

JWT contains:

{
  "id": "userId",
  "role": "PATIENT | DOCTOR | ADMIN",
  "hospitalId": "HOSP123"
}

2️⃣ Token Usage

Frontend stores token (localStorage)

Axios injects token into headers:

Authorization: Bearer <JWT>

3️⃣ Backend Validation (Critical)

JWT verified using secret

Role validated via middleware

Frontend role checks are NOT trusted

⚠️ Frontend validation is for UX only — security is backend-enforced.

👥 User Roles
Role	Capabilities
PATIENT	Book appointments, view bills, AI guidance
DOCTOR	View appointments, update status, OPD visits
ADMIN	Manage doctors, patients, rooms, analytics
SUPER_ADMIN	Bootstrap hospital admins
🧠 AI Architecture (Safe Mode)

AI does NOT run by default

Controlled via environment variable:

ENABLE_AI=false

AI Safety Guarantees

No diagnosis

No prescriptions

Role-aware responses

Rate-limited

Safe fallback responses

📊 Key Features
✅ Patient

Login & dashboard

Book appointment

View appointments & bills

AI symptom analyzer (safe)

✅ Doctor

View assigned appointments

Update appointment status

OPD → Admission workflow

Auto bill generation

✅ Admin

Create doctors & patients

Define availability

Assign beds

Analytics dashboards

Department management

📈 Analytics APIs

Patient flow (OPD / Admitted / Discharged)

Department load

Bed occupancy

Revenue summary

🌍 Deployment
Backend (Render)

Node.js service

MongoDB Atlas

Environment variables set in dashboard

AI disabled by default

Frontend (Netlify)

Production API URL via .env.production

Auto redeploy on GitHub push

🔐 Environment Variables
Backend
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/db
JWT_SECRET=super_secret_key
ENABLE_AI=false
OPENAI_API_KEY=optional

Frontend
VITE_API_URL=https://your-backend.onrender.com

🧪 CI/CD

GitHub Actions for:

Frontend build

Backend lint & install

Secrets blocked by GitHub Push Protection

No sensitive data committed

🧠 Interview Talking Points

Backend-first security model

Role-based access control

Token verification vs role authorization

Safe AI integration

MongoDB schema design

Real hospital workflow modeling

Deployment debugging (Atlas IP, auth, envs)

🚀 Future Enhancements

Redis caching

WebSockets for live updates

Payment gateway integration

Multi-hospital tenancy

Audit logs

Observability (Prometheus)

👨‍💻 Author

Nishanth
Full-Stack Developer | System Design Enthusiast
