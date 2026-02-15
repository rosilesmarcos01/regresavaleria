# Romantic Quiz for Valeria 💕

A single-page quiz website to ask Valeria how she's feeling (without texting).

## Setup

### 1. Formspree (get results in your email)

1. Go to [formspree.io](https://formspree.io)
2. Create a free account and a new form
3. Copy your form ID (looks like `xeqlgqej` or `abc123xyz`)
4. Open `index.html` and replace `YOUR_FORM_ID` in this line:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

   with your actual form ID, e.g. `https://formspree.io/f/abc123xyz`

### 2. Host it

- Upload `index.html` to any static hosting (Netlify, Vercel, GitHub Pages, etc.)
- Or open it locally by double-clicking the file (note: Formspree works even with `file://` in some cases, but hosting is more reliable)

## What she sees

- Step-by-step quiz (3 questions)
- "How mad" slider 1–9 (10 is not selectable)
- Options: ignoring you (for now) / ignoring you (forever) / just need a break
- Forgiveness question
- After submit: "Thank you for participating 💕" — no results shown

## What you get

- Formspree sends you an email with her answers
- You can also check responses in your Formspree dashboard
