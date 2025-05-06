# Blockchain-Based Certification System – Frontend

This is the frontend for the **Blockchain-Based Certification System**, a decentralized application (dApp) that allows users to upload and verify certificates using IPFS (InterPlanetary File System).

Built with **React (TypeScript)**, styled with **TailwindCSS**, and enhanced using **ShadCN UI**, **Framer Motion**, and **React Query**, this project ensures a performant and user-friendly experience.

---

## 🌐 Live Preview

If deployed, link would go here (e.g., `https://labeeb-seven.vercel.app/`)

---

## 🚀 Features

- Upload any file as a base64 string to IPFS.
- Verify files using CID and preview images, PDFs, or text.
- Animated tab navigation and smooth UI transitions.
- Real-time status feedback using toast notifications.
<!-- - Persistent upload/verification history using Zustand. -->

---

## 🧩 Tech Stack

| Tool / Library             | Purpose                              |
| -------------------------- | ------------------------------------ |
| **React 19 + TypeScript**  | Frontend framework and typing        |
| **pnpm**                   | Fast, disk-efficient package manager |
| **TailwindCSS**            | Utility-first CSS for fast styling   |
| **ShadCN UI**              | Pre-built accessible components      |
| **Axios**                  | HTTP client for API calls            |
| **React Query**            | Data fetching & caching              |
| **Framer Motion**          | Smooth animations                    |
| **Sonner**                 | Toast notifications                  |
| **Zustand (with persist)** | Lightweight global state management  |

---

## 📦 Installation

```bash
git clone https://github.com/Cornerstone-04/labeeb-fe.git
cd labeeb-fe
pnpm install
```

> 💡 **Why pnpm?**
>
> pnpm is faster and more efficient than npm or yarn because it uses a content-addressable filesystem to save disk space and speed up installations.

---

## 🛠 Development

Start the local dev server (usually at `http://localhost:5173`):

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Run ESLint:

```bash
pnpm lint
```

---

## ⚙️ Environment Setup

Ensure the backend is running locally on **port 3000** (`http://localhost:3000`). All Axios requests are routed to this server.

`.env` file is required in the root folder.

```bash
VITE_API_URL=http://localhost:3000
```

---

## 🧪 How Upload & Verification Work

### Upload Flow

1. User selects a file and enters a certificate name.
2. File is converted to base64 (excluding the media prefix).
3. Data is sent to `/upload` endpoint on the backend.
4. The backend uploads to IPFS and returns a `cid`.

### Verify Flow

1. User pastes a CID.
2. CID is sent to `/verify/getFile` endpoint.
3. Backend fetches file from IPFS and returns the base64.
4. Frontend intelligently previews the file (image, PDF, text).

---

## 📁 Folder Structure (Simplified)

```bash
src/
│
├── components/
│   ├── ui/               # ShadCN and custom UI components
│   ├── upload/           # Upload-specific components
│   └── verify/           # Verify-specific components
│
├── hooks/                # React Query hooks
├── store/                # Zustand state
├── lib/                  # Axios instance and utility functions
└── pages/                # App pages (Tabs)
```

---

## 📤 Deployment

You can deploy this frontend to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

### For Vercel:

1. Connect your GitHub repo to Vercel.
2. Use default Vite build settings.
3. Add environment variable
4. Ensure backend is publicly accessible or hosted separately.

---
