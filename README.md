# MailPulse

> Reliable email delivery infrastructure : send, track, and retry transactional emails at scale.

MailPulse is a transactional email service that accepts email requests via a simple REST API, processes them asynchronously through a queue, and handles retries automatically on failure.

---

## The Problem

Every app needs to send emails — confirmations, alerts, notifications. But building reliable email delivery is harder than it looks:

- What if the SMTP server is temporarily down?
- What if the email fails silently?
- How do you know if an email was actually sent?
- How do you retry without sending duplicates?

**MailPulse handles all of this so your app doesn't have to.**

---

## How It Works

```
1. Your app sends a request
   POST /emails
   { recipient, subject, html }

2. MailPulse saves it (status: PENDING)
   → responds immediately with the email ID

3. BullMQ worker picks it up in the background
   → status: IN_PROGRESS
   → sends via Gmail SMTP

4. Success → status: SUCCESS, sentAt recorded
   Failure → retry up to 3 times (exponential backoff)
           → after 3 failures → status: FAILED (Dead Letter)

5. Your app checks the result anytime
   GET /emails/:id → { status: "success", sentAt: "..." }
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS |
| Database | PostgreSQL + TypeORM |
| Queue | BullMQ + Redis |
| Email | Nodemailer (Gmail SMTP) |
| Architecture | Clean Architecture |
| Testing | Jest |
| CI/CD | GitHub Actions |

---

## Architecture

```
src/
├── modules/
│   └── email/
│       ├── domain/
│       │   ├── email.entity.ts         ← business logic
│       │   ├── email.repository.ts     ← port
│       │   └── email.errors.ts
│       ├── application/
│       │   ├── send-email.usecase.ts   ← orchestrates everything
│       │   └── get-email.usecase.ts
│       ├── infrastructure/
│       │   ├── persistence/
│       │   │   ├── email.orm-entity.ts
│       │   │   └── pg-email.repository.ts
│       │   ├── queue/
│       │   │   ├── email.queue.ts      ← BullMQ producer
│       │   │   └── email.processor.ts  ← BullMQ worker
│       │   └── mailer/
│       │       └── nodemailer.service.ts ← Gmail SMTP
│       └── interface/
│           ├── email.controller.ts
│           └── dto/
│               └── send-email.dto.ts
└── shared/
    └── exceptions/
        └── domain.exception.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis
- Gmail account with App Password enabled

### Installation

```bash
git clone https://github.com/ANDRIANALISOA-sylvere/MailPulse
cd MailPulse
npm install
cp .env.example .env
```

### Environment Variables

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mailpulse
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mailpulse.service@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=MailPulse 
```

### Run

```bash
# Development
npm run start:dev

# Docker
docker-compose up --build
```

---

## API

### Send an Email

```bash
POST /emails
Content-Type: application/json

{
  "recipient": ["jean@gmail.com"],
  "subject": "Ride confirmed",
  "content": "Hello JeanYour ride is confirmed."
}
```

Response:
```json
{
  "id": "uuid",
  "status": "pending",
  "createdAt": "2026-03-16T..."
}
```

### Get Email Status

```bash
GET /emails/:id
```

Response:
```json
{
  "id": "uuid",
  "recipient": ["jean@gmail.com"],
  "subject": "Ride confirmed",
  "status": "success",
  "attempts": 1,
  "sentAt": "2026-03-16T...",
  "createdAt": "2026-03-16T..."
}
```

### Get Email History

```bash
GET /emails?status=failed&limit=20&page=1
```

---

## Queue & Retry Logic

```
Job created → PENDING
Worker picks up → IN_PROGRESS
  → Success → SUCCESS
  → Failure → retry after 2s
  → Failure → retry after 4s
  → Failure → retry after 8s
  → Still failing → FAILED (Dead Letter Queue)
```

---

## Concepts Applied

- **Clean Architecture** — domain / application / infrastructure / interface
- **BullMQ** — async job queue with retry and backoff
- **Dead Letter Queue** — handle permanently failed jobs
- **Repository Pattern** — swap PostgreSQL without touching business logic
- **Unit Testing** — test business logic in isolation
- **CI/CD** — GitHub Actions runs tests on every push

---

<!-- 
## Roadmap

- [ ] Template support with dynamic variables
- [ ] Webhook callback when email is delivered
- [ ] Dashboard to monitor email delivery rates
- [ ] Support for multiple SMTP providers

---
-->

## Author

**Sylvère Andrianalisoa** — [@ANDRIANALISOA-sylvere](https://github.com/ANDRIANALISOA-sylvere)

> Built to master BullMQ, Clean Architecture, and production-grade testing.