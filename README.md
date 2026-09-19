# UNDERDOG ESPORTS ACADEMY

A Tier-1 competitive coaching, tactical whiteboard, and scrimmage portal for Free Fire, BGMI, and Honor of Kings.

## 📁 Project Architecture

```
underdog-esports-academy/
├── frontend/                     # All Client-Side & Mobile PWA Files
│   ├── index.html                # Standalone Single-Page Application
│   ├── manifest.json             # PWA Fullscreen App Manifest
│   ├── sw.js                     # Offline Caching Service Worker
│   ├── assets/                   # High-Res Maps (Bermuda, Purgatory, etc.) & Icons
│   ├── css/
│   │   └── styles.css            # Cyber Theme & Neon Styles
│   └── js/
│       ├── app.js                # Core App Logic & State
│       ├── data/                 # Game Meta (Roles, Loadouts, Weapons)
│       └── modules/              # Whiteboard, Custom HUD, Scrims, Supabase Client
│
├── backend/                      # Backend Server & Cloud Database
│   ├── server.js                 # Companion Node Server (serves frontend & Wi-Fi IP)
│   ├── supabase_schema.sql       # PostgreSQL Schema for Supabase Cloud Realtime
│   └── package.json              # Backend Package Config
│
├── package.json                  # Root npm start runner
└── README.md                     # Documentation
```

## 🚀 How to Run

### Option 1: Double Click Frontend
Simply double-click `frontend/index.html` to run the application in any browser offline.

### Option 2: Run Local Server (for Mobile Phones on Wi-Fi)
```bash
npm start
# OR
node backend/server.js
```
Access the app from your computer at `http://localhost:3000` or from any smartphone on your home Wi-Fi at the displayed IP address.
