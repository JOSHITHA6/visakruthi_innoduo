# VISAKRUTHI

VISAKRUTHI is a full-stack cultural tourism prototype connecting traditional artisans from the Visakhapatnam region with tourists, students, and craft enthusiasts.

## Stack

- Frontend: React, Vite, TailwindCSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Deployment: Vercel (client), Render (server)

## Project Structure

```text
visakruthi/
  client/
    src/
      components/
      pages/
      assets/
      services/
      data/
  server/
    models/
    routes/
    controllers/
    config/
```

## Run Locally

```bash
npm install
npm run dev
```

This starts:

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Environment Variables

Create `server/.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/visakruthi
```

MongoDB is optional for demo mode. If the database connection fails or `MONGODB_URI` is missing, the API falls back to in-memory demo data so the hackathon prototype still works.

## Demo Features

- Home, About, Explore Crafts, Artisan Profile, Workshop, Volunteer, Admin Dashboard
- Language toggle: English / Telugu
- `KalaSaathi` chatbot with guided cultural FAQs
- `Svar Guide` voice narration using browser speech synthesis
- Visitor analytics tracking
- Google Maps embeds for artisan locations
- Booking and volunteer submission forms wired to the backend

## GitHub Setup

```bash
git init
git add .
git commit -m "Build VISAKRUTHI full-stack prototype"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Deploy

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the root directory to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:

```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
VITE_PUBLIC_APP_URL=https://your-vercel-frontend.vercel.app
```

### Backend on Render

1. Create a new Web Service from the same repository.
2. Set the root directory to `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:

```env
PORT=10000
CLIENT_URL=https://your-vercel-frontend.vercel.app
MONGODB_URI=<your-mongodb-connection-string>
```

## API Summary

- `GET /api/artisans`
- `POST /api/artisans`
- `GET /api/bookings`
- `POST /api/booking`
- `GET /api/volunteers`
- `POST /api/student-registration`
- `GET /api/visitors`
- `POST /api/visitors/track`
- `GET /api/dashboard/analytics`
