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

**Font Families:** Neue Haas Grotesk + Input Mono via Adobe Typekit
- Typekit link: `https://use.typekit.net/qka5zju.css`
- `neue-haas-grotesk-display` — headings only, always Bold (700), always -0.03em
- `neue-haas-grotesk-text` — body text, UI
- `input-mono` — labels, meta, code

**Heading Rules (immutable):**
- Always use `font-display` class (NHG Display)
- Always Bold weight (700)
- Always letter-spacing: -0.03em
- Line height: 1.1

**Body Text:**
- NHG Text (default)
- Letter spacing: -0.01em
- Line height: 1.5–1.6

**Type Scale:**
```
Hero (h1):
  Mobile:  text-3xl  (1.875rem / 30px)
  md:      text-5xl  (3rem / 48px)
  lg:      text-6xl  (3.75rem / 60px)
  xl:      text-7xl  (4.5rem / 72px)

h2:
  Mobile:  text-2xl  (1.5rem / 24px)
  md:      text-3xl  (1.875rem / 30px)

h3:
  Mobile:  text-xl   (1.25rem / 20px)
  md:      text-2xl  (1.5rem / 24px)

Labels/Meta: text-xs (0.75rem / 12px)
Tags:        text-[10px]
Nav:         text-sm (0.875rem / 14px)
```

### Layout — Full Width

**No max-width container.** Content flows full-width.

**Page Padding:**
```
Horizontal:
  Mobile:  px-4  (16px)
  md:      px-6  (24px)

Vertical (sections):
  Mobile:  py-12 (48px)
  md:      py-16 (64px)
  lg:      py-20 (80px)
```

**Hero:**
- Top offset: pt-[100px]
- Bottom margin: mb-16 (64px) / md:mb-24 (96px)
- Text constrained to max-w-[75%]

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

### Grid Layouts

**Work/Portfolio sections: 1 column only**
- Both mobile and desktop use single column
- Creates visual consistency across breakpoints
- `grid grid-cols-1 gap-px`

**Services/other content:**
- Can use multi-column where appropriate
- `grid grid-cols-1 lg:grid-cols-3`

**Grid gap:** `gap-px` (1px) for card grids

### Components

**Buttons:**
```tsx
// Primary (dark)
className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-display hover:bg-[var(--color-blue)] transition-colors"

// Secondary (outline)
className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-colors"

// Accent
className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-blue)] text-white font-display hover:bg-black transition-colors"
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
- No border radius (sharp corners)
- No card background — images sit directly on white page
- Hover: `transition-transform group-hover:scale-[0.98]`
- Number format: `[01]`, `[02]`, etc.

### Color Usage

**Text Opacity:**
- Primary text: `text-black` or `text-white`
- Secondary text: `text-black/60` or `text-white/60`
- Tertiary/meta: `text-black/40` or `text-white/40`

**Borders:**
- Subtle: `border-black/5` or `border-black/10`
- Medium: `border-black/20`

**Backgrounds:**
- Page: white (#FFFFFF)
- Dark sections: `bg-black text-white`
- Accent sections: `bg-[var(--color-lime)]` (use sparingly)

### Transitions
Always use: `transition-colors` or `transition-transform`
Duration: Default (150ms) — do not specify custom durations

### Responsive Breakpoints
- Mobile first
- `md:` = 768px (tablet/desktop)
- `lg:` = 1024px (large desktop)
- `xl:` = 1280px (extra large)
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
└── images/          # Project images
```

## Content Conventions

**Project data** lives in the page files for now (not a CMS). Main source of truth for projects is `/src/app/work/[slug]/page.tsx`.

**Case study slugs:** lowercase-with-hyphens

**Number formatting:** Two digits with leading zero: `01`, `02`, etc.

## Work Page Template

Canonical template for all work/case study pages. Reference `/work/nuclide-chart/page.tsx` as the implementation.

### Hero Section

```
section: px-4 md:px-6 pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16
  div: max-w-[75%]
```

- **Title (h1):** `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]`
- **Subtitle:** `text-2xl font-normal text-black/70 mt-4`
- **Description:** `text-base text-black/70 max-w-3xl mt-12 mb-12`
- **Tags:** `flex flex-wrap gap-2` with individual tags as `px-3 py-1 text-xs bg-black/5 text-black/60` (NHG Text, not mono)

### Chart/Visual Section

```
section: px-4 md:px-6 pb-16 md:pb-20
  div: border border-black/10 bg-white overflow-hidden
    div: h-[750px] lg:h-[875px]
```

Standard frame for interactive visualisations. Additional images go between this and the content section.

### Content Section

```
section: px-4 md:px-6 pb-16 md:pb-20
  div: grid lg:grid-cols-3 gap-24 lg:gap-32
```

**Left column** (`lg:col-span-2 space-y-12`):
- The Challenge, Background, Approach, Adaptability, Related Projects

**Right column** (`space-y-8`):
- Technology, Data

**Section headings (h2):** `text-4xl font-bold tracking-tight mb-6`

**Body text:**
- Left column: `text-black/70 leading-relaxed` (16px)
- Right column: `text-sm text-black/70 leading-relaxed` (14px)
- Multi-paragraph: wrap in `div: space-y-4`

**Related links:** `ul: space-y-2 text-sm` with `a: text-black/70 hover:text-[var(--color-pink)] transition-colors`

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
3. **Don't change fonts** — only NHG Display (headings), NHG Text (body), Input Mono (labels)
4. **Don't use light font weights for headings** — always Bold (700)
5. **Don't add shadows** — the design is flat
6. **Don't add border-radius** — keep everything sharp
7. **Don't add animations beyond hover states** — keep it restrained
8. **Don't use emoji** — ever
9. **Don't add a max-width container** — layout is full-width
10. **Don't use multi-column grids for work sections** — always 1 column
