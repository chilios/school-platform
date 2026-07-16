# School Management System - Backend

Node.js/Express.js backend for the School Management System.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics

### Students
- `GET /api/students` - List students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student
- `PUT /api/students/:id` - Update student

### Teachers
- `GET /api/teachers` - List teachers

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Grades
- `GET /api/grades` - Get grades
- `POST /api/grades` - Record grades
- `PUT /api/grades/:id` - Update grades

### Announcements
- `GET /api/announcements` - Get announcements
- `POST /api/announcements` - Create announcement
- `DELETE /api/announcements/:id` - Delete announcement

### Timetable
- `GET /api/timetable` - Get timetable
- `POST /api/timetable` - Create timetable

### Fees
- `GET /api/fees` - Get fees
- `POST /api/fees` - Record payment
- `GET /api/fees/:id/payments` - Get payment history

## Environment Variables

See `.env.example` for required variables.

## Technologies
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- TypeScript
