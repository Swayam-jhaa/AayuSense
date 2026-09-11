# AayuSense — AI Electronic Tongue & Ayurvedic Botanical Diagnostic Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-00F5D4?style=for-the-badge&logo=vercel&logoColor=black)](https://aayu-sense.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_18-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Visuals-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Next-Generation AYUSH Botanical Authentication, Electronic-Tongue (E-Tongue) Taste Profile Analysis, and Adulteration Detection Engine.**

[🌐 Live Application](https://aayu-sense.vercel.app)

</div>

---

## 🌿 Problem Statement & Overview

In global herbal medicine, Ayurvedic formulations, and botanical supply chains, **botanical adulteration, synthetic substitution, and quality variance** cause severe clinical and commercial challenges. Traditional mass spectrometry and chromatography (HPLC/GC-MS) require days of lab turnaround and expensive specialized operators.

**AayuSense** bridges ancient Ayurvedic pharmacology with modern sensor fusion and machine learning:
- **👅 Electronic Tongue (E-Tongue) Multi-Sensor Array**: Digitizes taste sensor voltages across the fundamental Ayurvedic **6 Rasas** (Madhura, Amla, Lavana, Tikta, Katu, Kashaya).
- **🛡️ Real-Time Adulteration Detection**: Machine learning classification engine that detects synthetic fillers, substandard batches, and foreign botanicals.
- **📊 SHAP Explainability**: Integrates Shapley Additive Explanations (`ShapMini`) so laboratory auditors can inspect exactly which sensor channels triggered quality flags.
- **🔐 Secure Enterprise Authentication**: Integrated Clerk authentication supporting multi-tenant clinician and lab technician access controls.

---

## 🏗️ Architecture & Core Components

```
                          +-------------------------------------------------+
                          |               Web Client / Portal               |
                          |      (Next.js 14 App Router + Tailwind CSS)     |
                          +------------------------+------------------------+
                                                   |
                   +-------------------------------+-------------------------------+
                   |                               |                               |
                   v                               v                               v
         +-------------------+           +-------------------+           +-------------------+
         |  Landing & Health |           |   E-Tongue Sensor |           |  Lab Clinician    |
         |  Public Portal    |           |   Analysis Suite  |           |  Dashboard        |
         +-------------------+           +---------+---------+           +---------+---------+
                                                   |                               |
                                                   v                               v
                                         +-------------------+           +-------------------+
                                         | 6-Rasa Radar Plot |           |  SHAP Feature     |
                                         | & Taste Fingerprint|          |  Attributions     |
                                         +-------------------+           +-------------------+
```

### Key UI & Analytical Components:
- **`RadarFingerprint.tsx`**: Multi-dimensional radar visualization charting the 6-Rasa equilibrium profile against reference pharmacopeia standards.
- **`RasaBars.tsx`**: Calibrated taste intensity bar indicators displaying potency indices.
- **`AdulterationBadge.tsx`**: High-visibility risk indicator (Authentic / Suspicious / High Risk Adulterated).
- **`ShapMini.tsx`**: Lightweight feature-attribution waterfall graph explaining sensor influence on classification confidence.
- **`MeasureProgress.tsx` & `MeasureFormModal.tsx`**: Multi-step batch intake and calibration testing workflow.

---

## 💻 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server & Client Components) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) |
| **Visualizations** | Recharts, Three.js 3D renderers, Framer Motion |
| **Component Primitives** | Radix UI accessible UI primitives |
| **Styling** | Tailwind CSS v4, Lucide Icons, Sonner toasts |
| **Deployment** | Vercel Edge Network |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/Swayam-jhaa/AayuSense.git
cd AayuSense

npm install
```

### 2. Configure Environment Variables
Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to interact with the local development instance.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
