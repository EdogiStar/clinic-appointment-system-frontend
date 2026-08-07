# 🏥 Clinic Appointment System – Frontend
### 3MTT Capstone Project 
A modern, responsive, and role-based Clinic Appointment System frontend built with React.js. The application enables patients to book appointments, doctors to manage schedules and consultations, and administrators to oversee users, doctors, and appointments through dedicated dashboards.

---

## 🚀 Features

#### 🔐 Authentication & Authorization

- Secure user registration and login
- JWT-based authentication
- Protected routes
- Role-based access control (Patient, Doctor, Admin)

#### 👤 Patient Features

- Personalized dashboard
- Book new appointments
- View appointment history
- Cancel upcoming appointments
- View appointment details
- Receive appointment status updates

#### 👨‍⚕️ Doctor Features

- Doctor dashboard
- View assigned appointments
- Update appointment status (Confirmed, Completed, Cancelled)
- Manage profile information
- View daily appointment schedule

#### 🛡️ Admin Features

- Admin dashboard with system statistics
- Manage users
- Approve and activate doctors
- View all appointments
- Monitor system activities

#### 📅 Appointment Management

- Book appointments with available doctors
- Search appointments
- Filter appointments by status
- View appointment details
- Appointment status tracking

#### 🗓️ Doctor Management

- Browse available doctors
- View doctor specialties
- Manage doctor availability
- Doctor approval workflow

#### 🎨 User Experience

- Fully responsive design
- Clean and modern UI
- Toast notifications
- Loading states
- Empty state screens
- Search and filtering
- Mobile-friendly navigation

---

### 🛠️ Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Axios
- Sonner
- React Icons

---

### 📂 Project Structure

src/
├── assets/
├── components/
│   ├── appointments/
│   ├── common/
│   ├── dashboard/
│   └── layout/
├── contexts/
├── hooks/
├── layouts/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── doctor/
│   ├── patient/
│   └── shared/
├── services/
├── utils/
├── App.jsx
└── main.jsx

---

### ⚙️ Installation

Clone the repository

git clone <repository-url>

Navigate to the project

cd clinic-appointment-system-frontend

Install dependencies

npm install

Start the development server

npm run dev

Build for production

npm run build

Preview production build

npm run preview

---

### 🌐 User Roles

#### Patient

- Register and log in
- Book appointments
- View appointment history
- Cancel appointments
- View doctor information

#### Doctor

- View assigned appointments
- Update appointment status
- Manage consultation schedule
- View dashboard statistics

#### Administrator

- Manage users
- Approve doctors
- Monitor appointments
- Access system dashboard
- View platform statistics

---

#### 📱 Responsive Design

The application is optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

---

### 🔗 Backend

This frontend communicates with the Clinic Appointment System REST API built using:

- Node.js
- Express.js
- PostgreSQL
- Supabase
- JWT Authentication

---

### 📄 License

This project is developed for educational and portfolio purposes.