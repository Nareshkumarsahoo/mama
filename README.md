# Hey Mama ❤️ — A Romantic Interactive Website

A beautiful, romantic, mobile-first interactive questionnaire website designed as a romantic surprise for your girlfriend. Built with modern HTML5, CSS3 glassmorphism design, floating background particle hearts, smooth button animations, and ambient music support.

---

## ✨ Features

- **Mobile-First Glassmorphism UI**: Specifically engineered for 6" Android & iPhone mobile screens as well as desktop displays.
- **Glowing Floating Hearts Background**: Interactive physics particle canvas with rising glowing hearts and confetti bursts.
- **4-Step Interactive Questionnaire**:
  1. Opening screen: *"Hey Mama ❤️ - I have a few very important questions for you..."*
  2. Question 1: *"Mama, are you still angry with me? 😠"*
  3. Question 2: *"Mama, do you love me? 😘😘"*
  4. Question 3: *"Mama, will you go on a date with me? 🌹"*
  5. Question 4: *"Mama, will you be my forever? 🎶❤️"*
- **Playful Reaction Cards**: Romantic modal overlays with custom responses for both **YES** and **NO** choices.
- **Celebration Final Screen**: 3D pulsing heart with glow aura, romantic quote, and replay button.
- **Ambient Music Support**: Floating music toggle button with animated audio equalizer. Includes built-in Web Audio API romantic chime synthesizer fallback if an external MP3 file is not provided.
- **Subtle Footer**: *"Made with ❤️ for Mama"*

---

## 🎨 How to Customize

All customization options are clearly located at the very top of `script.js` in the `ROMANTIC_CONFIG` object:

```javascript
const ROMANTIC_CONFIG = {
  herName: "Mama",             // Change her name/nickname
  myName: "Your Love",          // Change your name
  bgMusicUrl: "...",            // Paste your custom romantic MP3 link (or leave "" for synth)
  footerMessage: "Made with ❤️ for Mama",
  // Customize any questions, button text, and reactions here!
};
```

---

## 💻 How to Run Locally

You have **3 quick options** to preview it locally:

### Option 1: Double-Click `index.html` (Easiest)
Simply open the folder and double-click `index.html` in your web browser (Chrome, Edge, Safari, Firefox)!

### Option 2: Using Vite (`npm run dev`)
1. Open your terminal in this directory.
2. Run `npm install`
3. Run `npm run dev`
4. Open the local link shown in the terminal (e.g. `http://localhost:5173`).

### Option 3: Using `npx serve`
Run in terminal:
```bash
npx serve .
```

---

## 🌐 How to Deploy & Get a Shareable Link

To send this surprise to your girlfriend as a shareable link on WhatsApp, iMessage, or Instagram, choose any of the free hosting platforms below:

### Method A: Vercel (Recommended — Takes 1 minute!)
1. Go to [Vercel.com](https://vercel.com) and log in with GitHub.
2. Drag and drop this project folder into the Vercel dashboard.
3. Vercel will instantly generate a public shareable URL (e.g., `https://hey-mama.vercel.app`)!

### Method B: GitHub Pages (Free & Official)
1. Push this code to a new repository on [GitHub](https://github.com).
2. Go to **Repository Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`.
4. Click **Save**. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

### Method C: Netlify Drop (30 Seconds Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the folder.
3. Copy the live shareable URL!

---

## ❤️ Made with Love
`Made with ❤️ for Mama`
# mama
