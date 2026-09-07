# CredResolve — Enterprise Voice AI Caller

A single-page voice bot calling interface built with CredResolve's design system. Designed for rapid telephone connectivity, mobile scanning over local Wi-Fi, and seamless collections voice workflows.

![CredResolve Voice AI](logo.png)

---

## 🤖 Configured Voice AI Endpoints

| Voice Agent | Role | Endpoint Target |
|---|---|---|
| **Loan Sales Bot** | Loan eligibility, interest advisory & onboarding | Direct Telephony Line |
| **Customer support Bot** | 24/7 automated dispute resolution & account support | Direct Telephony Line |
| **Predue Bot** | Early SMA-0 proactive reminders & UPI link dispatch | Direct Telephony Line |
| **Overdue Bot** | Delinquency resolution & settlement arrangements | Direct Telephony Line |

---

## 🚀 Running Locally

You can run this application with any lightweight static web server:

```bash
# Using npx and http-server
npx http-server . -p 8080 -c-1

# Or using Python 3
python -m http.server 8080
```

Open your browser at:
```
http://localhost:8080
```

---

## 📡 Accessing Over Wi-Fi on Mobile

To allow smartphones on the same Wi-Fi network to test direct tap-to-call:

1. Ensure the web server binds to `0.0.0.0` or your local Wi-Fi IP.
2. Check your machine's Wi-Fi IPv4 address (e.g. via `ipconfig`).
3. Open `http://<YOUR_WIFI_IP>:8080` from any mobile browser on the same network.
4. Tapping **"Start Call"** on any bot card immediately triggers your phone's native dialer to place the voice call!

---

## 🛠 Project Architecture

- **`index.html`**: Clean single-page application structure featuring CredResolve's floating pill navigation, hero stats, and voice bot grid.
- **`style.css`**: Precision design system with warm halftone dot-matrix textures, ambient glow orbs, micro-animations, and responsive mobile viewports.
- **`app.js`**: Telephony card rendering, call session modal controller, direct `tel:` dialing, and developer API hooks (`window.setVoiceBots`, `window.addVoiceBot`).
- **`logo.png`**: Transparent CredResolve 3D Möbius ribbon logo.
- **`wifi-qr.png`**: High-resolution QR code for instant mobile Wi-Fi onboarding.

---

## 👨‍💻 Developer API

You can dynamically update or add voice bots at runtime using the developer console:

```javascript
// Add a new voice bot dynamically
window.addVoiceBot({
  name: 'Dispute Resolution Bot',
  number: '+9180XXXXXXXX',
  desc: 'Escalated legal & grievance mediation',
  badge: 'Tier-2 Support',
  color: '#8B5CF6'
});

// Replace all bots dynamically
window.setVoiceBots([...]);
```