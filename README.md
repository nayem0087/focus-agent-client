# FocusAgent — Client

FocusAgent is a full-stack Agentic AI platform where users can discover, deploy, and manage AI-powered focus and productivity agents. This repository contains the **client (frontend)** application.

**Live Site:** https://focus-agent-client.vercel.app
**Server Repository:** https://github.com/nayem0087/focus-agent-client

---

## Overview

The FocusAgent client is a modern, responsive Next.js application that lets users browse a marketplace of AI agents, view detailed agent profiles, and manage the agents they've created — all backed by real-time data from the FocusAgent API and enhanced with LLM-powered features such as AI content generation and smart recommendations.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching / Cache | TanStack Query |
| Charts | Recharts |
| Authentication | Better-Auth (Email/Password + Google OAuth) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## Key Features

- **Public Landing Page** — Sticky navbar, hero section, and 7+ content sections (features, categories, stats, testimonials, FAQ, newsletter, CTA)
- **Agent Marketplace (`/agents`)** — Searchable, filterable, sortable, paginated grid of AI agents with skeleton loading states
- **Agent Details (`/agents/[id]`)** — Public detail page with specifications, ratings, and related agents
- **Authentication** — Login/Register with validation, demo login auto-fill, and Google social login via Better-Auth
- **Add Agent (`/add-agent`)** — Protected form for creating new AI agents, redirects unauthenticated users to `/login`
- **Manage Agents (`/manage-agents`)** — Protected dashboard scoped to the logged-in user, with edit and delete actions
- **AI Content Generator** — Generates agent descriptions and marketing copy from structured prompts, with adjustable length and regenerate support
- **AI Chat Assistant** — Context-aware in-app assistant with conversation history and suggested follow-ups
- **Fully Responsive** — Optimized layouts for mobile, tablet, and desktop

---

## Project Structure

```
focus-agent-client/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing page
│   │   ├── agents/                # Explore + details pages
│   │   ├── about/
│   │   └── contact/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/
│   │   ├── add-agent/
│   │   └── manage-agents/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   └── agents/
├── lib/
│   ├── auth-client.ts             # Better-Auth client instance
│   └── api.ts                     # API request helpers
├── hooks/
├── types/
└── public/
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- The [FocusAgent server](../server) running locally or deployed

### Installation

```bash
git clone https://github.com/<your-username>/focus-agent-client.git
cd focus-agent-client
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://focus-agent-server.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run start
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

This project was built as part of the Programming Hero Full Stack Agentic AI assignment. All rights reserved by the author.