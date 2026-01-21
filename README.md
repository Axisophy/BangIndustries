# Bang Industries Website

Data Visualisation & Explanation Design Studio

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Font Setup

This site uses DJR Forma font family. Add your font files to `/public/fonts/`:

```
public/fonts/
├── Forma-Regular.woff2
├── Forma-Medium.woff2
├── Forma-Bold.woff2
├── FormaMicro-Regular.woff2
├── FormaMono-Regular.woff2
└── FormaDisplay-Bold.woff2
```

Until fonts are added, the site will fall back to system fonts.

## Brand Colors

- **Electric Blue:** `#0055FF`
- **Hot Pink:** `#FF0055`
- **Acid Lime:** `#CCFF00`
- **Black:** `#000000`
- **White:** `#FFFFFF`

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── work/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   └── Navigation.tsx
└── public/
    └── fonts/
```

## Deployment

This site is configured for deployment on Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Content Updates

### Adding New Projects

Edit the `projects` object in `/src/app/work/[slug]/page.tsx` and `/src/app/work/page.tsx`.

### Updating Services

Edit the `services` array in `/src/app/services/page.tsx`.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## License

© Bang Industries Ltd. All rights reserved.
