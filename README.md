# Nirmala Tech Innovations Pvt. Ltd. — Website & CMS

> **"Your Complete Tech Partner"** | Kathmandu & Rautahat, Nepal

A full-stack MERN corporate website with a protected admin CMS. Built with React + Vite + Tailwind CSS on the frontend and Node.js + Express + MongoDB on the backend.

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

---

### 1 — Clone & install dependencies

```bash
# Install server deps
cd server
npm install

# Install client deps
cd ../client
npm install
```

### 2 — Configure environment variables

```bash
# server/.env  (copy from .env.example and fill in your values)
cp server/.env.example server/.env
```

Required variables:
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Seed admin email |
| `ADMIN_PASSWORD` | Seed admin password |

### 3 — Seed the database

```bash
cd server
node scripts/seed.js
```

This creates 12 services and one admin user.

### 4 — Run development servers

```bash
# Terminal 1 — Backend (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

Open **http://localhost:5173** for the public site.  
Open **http://localhost:5173/admin/login** for the admin panel.

---

## 📁 Folder Structure

```
NTI/
├── client/                         # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── api/
│       │   ├── axios.js            # Axios instance with JWT interceptors
│       │   └── services.js         # All API call functions
│       ├── context/
│       │   └── AuthContext.jsx     # Auth state + login/logout
│       ├── layouts/
│       │   ├── PublicLayout.jsx    # Navbar + Footer wrapper
│       │   └── AdminLayout.jsx     # Sidebar CMS layout
│       ├── components/
│       │   ├── Navbar.jsx          # Responsive sticky navbar
│       │   └── Footer.jsx          # Full-featured footer
│       ├── pages/
│       │   ├── public/
│       │   │   ├── HomePage.jsx    # Hero, services, projects, CTA
│       │   │   ├── AboutPage.jsx   # Mission, vision, founder, timeline
│       │   │   ├── ServicesPage.jsx# Filterable service cards
│       │   │   ├── PortfolioPage.jsx # Animated project gallery
│       │   │   └── ContactPage.jsx # Form + office info
│       │   └── admin/
│       │       ├── LoginPage.jsx   # JWT login
│       │       ├── Dashboard.jsx   # Stats + recent messages
│       │       ├── AdminProjects.jsx # CRUD + image upload
│       │       ├── AdminServices.jsx # CRUD + category grouping
│       │       └── AdminMessages.jsx # Inbox + mark read + delete
│       ├── App.jsx                 # Router with ProtectedRoute
│       ├── main.jsx                # React entry point
│       └── index.css               # Tailwind + global design system
│
└── server/                         # Node.js + Express backend
    ├── server.js                   # Express entry point
    ├── config/
    │   └── cloudinary.js           # Cloudinary + multer config
    ├── models/
    │   ├── User.js                 # Admin user model
    │   ├── Project.js              # Portfolio project model
    │   ├── Service.js              # Service offering model
    │   └── Message.js              # Contact message model
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── project.controller.js
    │   ├── service.controller.js
    │   └── message.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── project.routes.js
    │   ├── service.routes.js
    │   └── message.routes.js
    ├── middleware/
    │   └── auth.middleware.js      # JWT protect middleware
    └── scripts/
        └── seed.js                 # DB seeder (services + admin)
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Private |

### Projects
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/projects` | Public |
| GET | `/api/projects/:id` | Public |
| POST | `/api/projects` | Admin |
| PUT | `/api/projects/:id` | Admin |
| DELETE | `/api/projects/:id` | Admin |

### Services
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/services` | Public (active only) |
| GET | `/api/services/all` | Admin (all) |
| POST | `/api/services` | Admin |
| PUT | `/api/services/:id` | Admin |
| DELETE | `/api/services/:id` | Admin |

### Messages
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/messages` | Public |
| GET | `/api/messages` | Admin |
| PATCH | `/api/messages/:id/read` | Admin |
| DELETE | `/api/messages/:id` | Admin |

---

## 📞 Contact

**Nirmala Tech Innovations Pvt. Ltd.**  
📍 Brindaban 01, Rautahat & Kathmandu, Nepal  
📞 +977 9812225102  
📧 nirmalatechinnovations@gmail.com
