# Bang Industries Website

## Project Overview
Design studio website for Bang Industries — data visualisation, explanation design, and scientific illustration. The visual identity is bold and distinctive, positioning against homogenised corporate data viz aesthetics.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Deployment:** Vercel

## Commands
```bash
npm run dev      # Development server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

---

## Design System — DO NOT DEVIATE

### Brand Colors (immutable)
```
Black:        #000000
White:        #FFFFFF
Electric Blue: #0055FF
Hot Pink:     #FF0055
Acid Lime:    #CCFF00
```

Use CSS variables: `var(--color-blue)`, `var(--color-pink)`, `var(--color-lime)`

### Typography

**Font Family:** DJR Forma
- `var(--font-sans)` — Forma (body text)
- `var(--font-mono)` — Forma Mono (labels, meta)
- `var(--font-micro)` — Forma Micro (small text)
- `var(--font-display)` — Forma Display (hero headlines)

**Font Sizes (immutable):**
```
h1: clamp(2.5rem, 8vw, 6rem)    — 40px to 96px
h2: clamp(2rem, 5vw, 3.5rem)    — 32px to 56px
h3: clamp(1.5rem, 3vw, 2rem)    — 24px to 32px
h4: clamp(1.25rem, 2vw, 1.5rem) — 20px to 24px
Body: 1.125rem (18px)
Small/Labels: 0.75rem (12px) or 0.875rem (14px)
```

**Font Weights:**
- 400: Body text
- 500: Headings, emphasis
- 700: Display headlines only

### Spacing Scale (immutable)
```
xs:  0.25rem  (4px)
sm:  0.5rem   (8px)
md:  1rem     (16px)
lg:  2rem     (32px)
xl:  4rem     (64px)
2xl: 8rem     (128px)
```

Use these values only. No arbitrary spacing like `py-7` or `gap-5`.

### Layout

**Container:**
- Max width: 1400px
- Horizontal padding: 1.5rem (24px)
- Use `.container` class (defined in globals.css)

**Section Padding:**
- Mobile: `py-16` (64px)
- Desktop: `md:py-24` (96px)

**Grid Gaps:**
- Cards/thumbnails: `gap-6 md:gap-8` (24px / 32px)
- Content sections: `gap-8 md:gap-12` (32px / 48px)
- Large layouts: `gap-12 md:gap-16` or `gap-12 md:gap-24`

### Components

**Buttons:**
```tsx
// Primary (dark)
className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm hover:bg-[var(--color-blue)] transition-colors"

// Secondary (outline)
className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors"

// Accent
className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white hover:bg-black transition-colors"
```

**Links:**
```tsx
// Inline
className="hover:text-[var(--color-blue)] transition-colors"

// With arrow
className="inline-flex items-center gap-2 text-[var(--color-blue)] hover:text-black transition-colors"
// Arrow: <span aria-hidden="true">→</span>
```

**Labels/Meta:**
```tsx
className="text-xs font-mono uppercase tracking-wider text-black/40"
```

**Project Cards:**
- Aspect ratio: `aspect-[4/3]`
- Hover: `transition-transform group-hover:scale-[0.98]`
- Number format: `[01]`, `[02]`, etc.

### Color Usage

**Text Opacity:**
- Primary text: `text-black` or `text-white`
- Secondary text: `text-black/60` or `text-white/60`
- Tertiary/disabled: `text-black/40` or `text-white/40`

**Borders:**
- Subtle: `border-black/5` or `border-black/10`
- Medium: `border-black/20`

**Backgrounds:**
- Subtle tint: `bg-black/[0.02]`
- Dark sections: `bg-black text-white`
- Accent sections: `bg-[var(--color-lime)]` (use sparingly)

### Transitions
Always use: `transition-colors` or `transition-transform`
Duration: Default (150ms) — do not specify custom durations

### Responsive Breakpoints
- Mobile first
- `md:` = 768px (tablet/desktop)
- `lg:` = 1024px (use sparingly)
- Never use `sm:` — design for mobile by default

---

## File Structure
```
src/
├── app/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx
│   ├── work/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   └── Footer.tsx
public/
├── fonts/           # Forma font files (.woff2)
└── images/          # Project images
```

## Content Conventions

**Project data** lives in the page files for now (not a CMS). Main source of truth for projects is `/src/app/work/[slug]/page.tsx`.

**Case study slugs:** lowercase-with-hyphens

**Number formatting:** Two digits with leading zero: `01`, `02`, etc.

## Code Style

- Use `'` not `"` for JSX strings
- Escape apostrophes in JSX text: `&apos;`
- Always include `aria-hidden="true"` on decorative arrows/icons
- Use semantic HTML (`section`, `article`, `nav`, etc.)
- Keep components in `/src/components/` only if reused across pages

---

## What NOT to do

1. **Don't add new colors** — only use the 5 brand colors
2. **Don't use arbitrary Tailwind values** — stick to the spacing scale
3. **Don't change font sizes** — they're set in globals.css
4. **Don't add shadows** — the design is flat
5. **Don't add border-radius to cards** — keep them sharp (except hero viz)
6. **Don't use Inter, Roboto, or system fonts** — wait for Forma, or it falls back automatically
7. **Don't add animations beyond hover states** — keep it restrained
8. **Don't use emoji** — ever
