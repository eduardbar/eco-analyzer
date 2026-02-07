# 🌱 EcoAnalyzer: AI-Powered Environmental Impact Analysis

![EcoAnalyzer Preview](frontend/public/og-image.png)

**EcoAnalyzer** is an enterprise-level environmental impact analysis platform powered by Artificial Intelligence. Unlike conventional environmental assessment tools, EcoAnalyzer transforms product descriptions into precise and actionable metrics, enabling consumers and organizations to make more conscious and sustainable purchasing decisions.

## 🚀 Key Features

- 🤖 **Advanced AI**: Analysis engine powered by Google Gemini for precise assessments.
- 📊 **Eco-Score**: Single 0-100 score that synthesizes total environmental impact.
- 🌍 **Carbon Footprint**: CO₂ emissions estimation in kg with understandable analogies.
- 💧 **Water Usage**: Product lifecycle water consumption calculation in liters.
- ♻️ **Material Analysis**: Component breakdown with individual sustainability scores.
- 🔐 **Secure Authentication**: Login system with JWT and route protection.
- 📜 **Personal History**: Storage and consultation of previous analyses per user.
- 🎨 **Glassmorphism UI**: Modern, elegant, and responsive interface with dark theme.

## 🛠️ Tech Stack

| Layer | Technologies |
|------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | SQLite (dev) / MySQL (prod) with Prisma ORM |
| **AI** | Google Gemini API |
| **Auth** | JWT (JSON Web Tokens), bcrypt |
| **Testing** | Jest, React Testing Library |
| **Infrastructure** | Docker, Docker Compose |

## ⚙️ Environment Setup

Create a `.env` file in the `backend/` folder with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET=your_super_secure_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

NODE_ENV=development
```

## 📦 Installation and Deployment

### 1. Clone the repository

```bash
git clone https://github.com/eduardbar/eco-analyzer.git
cd eco-analyzer
```

### 2. Install dependencies

Install backend and frontend dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure the database

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Local Development

To run both servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend available at: `http://localhost:3000`
- Backend API at: `http://localhost:3001`

### 5. Docker (Production)

To start the entire environment with Docker:

```bash
docker-compose up --build
```

## 📂 Project Structure

```
eco-analyzer/
├── backend/                  # REST API Express + TypeScript
│   ├── src/
│   │   ├── controllers/      # Request/response logic
│   │   ├── services/         # Business logic (Gemini AI)
│   │   ├── routes/           # Endpoint definitions
│   │   ├── middleware/       # Auth, validation
│   │   ├── utils/            # Eco-Score calculator, schemas
│   │   └── lib/              # Prisma client
│   └── prisma/               # DB schema and migrations
├── frontend/                 # SPA Next.js 15 + React 19
│   ├── src/
│   │   ├── app/              # App Router (pages and layouts)
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom hooks (useAnalysis, useAuth)
│   │   └── services/         # API client
│   └── public/               # Static assets
└── docs/                     # RFCs and technical documentation
```

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register new user |
| `POST` | `/login` | Login (returns JWT) |

### Analysis (`/api/v1/analysis`) - *Requires Auth*
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create new product analysis |
| `GET` | `/` | Get user history |

## 📚 Documentation

| RFC | Description |
|-----|-------------|
| [RFC-001](./docs/RFC-001.md) | Component Structure and UI/UX |
| [RFC-002](./docs/RFC-002.md) | Testing Strategy |
| [RFC-003](./docs/RFC-003.md) | API Design and Authentication |
| [RFC-004](./docs/RFC-004.md) | Database Schema |
| [RFC-005](./docs/RFC-005.md) | Core Analysis Engine |
| [RFC-006](./docs/RFC-006.md) | Dockerization and Deployment |

---

© 2026 EcoAnalyzer Team
