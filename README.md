# CinePass Pro

A full-stack cinema ticketing application featuring secure Razorpay payment integration, microservice architecture, and seat reservation logic.

## 🚀 Features
- **Secure Payments:** Integrated with Razorpay API using backend-side order creation.
- **Microservices:** Decoupled frontend and backend payment services for modularity.
- **Seat Management:** Dynamic seat selection and validation.
- **Responsive UI:** Modern interface with real-time feedback.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Payments:** Razorpay API
- **Containerization:** Docker, Docker Compose

## ⚙️ Setup Instructions
1. Clone the repository: `git clone https://github.com/LakishaJaiswal/CinePass.git`
2. Configure environment variables in `services/payment-service/.env`:
   ```env
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_secret_key
