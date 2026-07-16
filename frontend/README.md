# School Management System - Frontend

React TypeScript frontend for the School Management System.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The app will open at `http://localhost:3000`

## Features

- Secure login with JWT
- Multi-role dashboards (Admin, Teacher, Student, Parent)
- Responsive design
- Real-time data updates
- Charts and analytics

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── contexts/       # React contexts (Auth)
├── hooks/          # Custom hooks
├── index.css       # Global styles
└── App.tsx         # Main app
```

## Environment Variables

See `.env.example` for required variables.

## Default Login Credentials

- **Email:** admin@school.com
- **Password:** password123

## Technologies
- React 18
- TypeScript
- Tailwind CSS
- Recharts for analytics
- Lucide React for icons
