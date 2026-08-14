# K Charging Solutions — Full Stack MERN Website

## Project Structure

```
k-charging/
├── backend/                  # Node.js + Express API
│   ├── config/
│   │   └── cloudinary.js     # Cloudinary image upload config
│   ├── middleware/
│   │   └── auth.js           # JWT auth middleware
│   ├── models/               # MongoDB models
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   ├── Testimonial.js
│   │   ├── Blog.js
│   │   ├── Contact.js
│   │   └── Settings.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── bookings.js
│   │   ├── testimonials.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   ├── settings.js
│   │   └── upload.js
│   ├── utils/
│   │   └── seeder.js         # Auto-seeds admin + services
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/                 # React.js
    └── src/
        ├── admin/
        │   ├── components/
        │   │   ├── AdminLayout.js    # Sidebar navigation
        │   │   └── ProtectedRoute.js
        │   └── pages/
        │       ├── AdminLogin.js
        │       ├── AdminDashboard.js
        │       ├── AdminBookings.js
        │       ├── AdminServices.js
        │       ├── AdminTestimonials.js
        │       ├── AdminBlog.js
        │       ├── AdminMessages.js
        │       └── AdminSettings.js
        ├── components/
        │   ├── Navbar.js
        │   └── Footer.js
        ├── context/
        │   └── AuthContext.js
        ├── pages/
        │   ├── HomePage.js
        │   ├── AboutPage.js
        │   ├── ServicesPage.js
        │   ├── ServiceDetailPage.js
        │   ├── BookingPage.js
        │   ├── BlogPage.js
        │   ├── BlogPostPage.js
        │   ├── FAQPage.js
        │   ├── TestimonialsPage.js
        │   └── ContactPage.js
        ├── styles/
        │   └── global.css
        └── utils/
            └── api.js
```

---

## Setup Instructions

### 1. Clone the project and install dependencies

```bash
# Install root + all dependencies
npm run install-all
```

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your actual values:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/k-charging
JWT_SECRET=your_super_long_random_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@kchargingsolutions.com
ADMIN_PASSWORD=Admin@123456
CLIENT_URL=http://localhost:3000
```

### 3. Configure Frontend Environment

```bash
cd frontend
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> In production, update this to your deployed API URL.

### 4. Run in Development

```bash
# From root directory — runs both servers
npm run dev

# Or separately:
npm run dev-backend   # API on port 5000
npm run dev-frontend  # React on port 3000
```

---

## Admin Panel Access

Navigate to: **http://localhost:3000/admin**

Default credentials (change immediately after first login):
- **Email:** admin@kchargingsolutions.com
- **Password:** Admin@123456

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/auth/me | Yes | Get current admin |
| PUT | /api/auth/profile | Yes | Update admin profile |
| GET | /api/services | No | Get active services |
| GET | /api/services/admin/all | Yes | Get all services |
| POST | /api/services | Yes | Create service |
| PUT | /api/services/:id | Yes | Update service |
| DELETE | /api/services/:id | Yes | Delete service |
| POST | /api/bookings | No | Submit booking |
| GET | /api/bookings | Yes | Get all bookings |
| GET | /api/bookings/stats | Yes | Booking stats |
| PUT | /api/bookings/:id | Yes | Update booking |
| GET | /api/testimonials | No | Get active testimonials |
| POST | /api/testimonials | Yes | Create testimonial |
| GET | /api/blog | No | Get published posts |
| GET | /api/blog/:slug | No | Get single post |
| POST | /api/blog | Yes | Create post |
| POST | /api/contact | No | Submit contact form |
| GET | /api/contact | Yes | Get all messages |
| GET | /api/settings/public | No | Get public settings |
| PUT | /api/settings | Yes | Update settings |
| POST | /api/upload/image | Yes | Upload to Cloudinary |

---

## Services Required

- **MongoDB Atlas** — Free tier available at mongodb.com
- **Cloudinary** — Free tier at cloudinary.com (25GB storage)
- **Node.js** — v18 or higher

---

## Deployment Notes

### Backend (e.g. Railway, Render, DigitalOcean)
1. Set all environment variables
2. Set build command: `npm install`
3. Set start command: `npm start`

### Frontend (e.g. Vercel, Netlify)
1. Set `REACT_APP_API_URL` to your backend URL
2. Build command: `npm run build`
3. Publish directory: `build`

---

## Domain Note

Client form shows domain as `kchargingingsolutions.com` (possible typo).  
Confirm correct domain before going live — likely `kchargingsolutions.com`.

---

## Design Tokens

| Token | Value |
|-------|-------|
| Navy (primary) | #0d1b2e |
| Gold (accent) | #f5a623 |
| Blue (CTA) | #3d7fff |
| Font Display | Space Grotesk |
| Font Body | Inter |
