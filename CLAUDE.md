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
  md:      text-4xl  (2.25rem / 36px)
  lg:      text-5xl  (3rem / 48px)
  xl:      text-6xl  (3.75rem / 60px)

h2:
  Mobile:  text-2xl  (1.5rem / 24px)
  md:      text-3xl  (1.875rem / 30px)
  lg:      text-4xl  (2.25rem / 36px)

h3:
  Mobile:  text-xl   (1.25rem / 20px)
  md:      text-2xl  (1.5rem / 24px)
  lg:      text-3xl  (1.875rem / 30px)

Labels/Meta: text-xs (0.75rem / 12px)
Tags:        text-xs (0.75rem / 12px)
Nav:         text-sm (0.875rem / 14px)
```

### Layout — Full Width

**No max-width container.** Content flows full-width.

**Page Padding:**
```
Horizontal:
  Mobile:  px-4   (16px)
  md:      px-8   (32px)
  lg:      px-12  (48px)

Vertical (sections):
  pb-12 md:pb-16 lg:pb-20
```

**Hero:**
- Top offset: `pt-24 md:pt-28 lg:pt-32`
- Bottom padding: `pb-12 md:pb-16 lg:pb-20`

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
className="text-xs font-mono uppercase tracking-wider text-black/50"
```

**Project Cards:**
- No border radius (sharp corners)
- No card background — images sit directly on white page
- Hover: `transition-transform group-hover:scale-[0.98]`
- Number format: `[01]`, `[02]`, etc.

### Text Opacity

```
Primary text:    text-black / text-white
Secondary text:  text-black/70 / text-white/70
Tertiary text:   text-black/50 / text-white/50
Metadata labels: text-black/50 (mono uppercase)
```

### Borders

```
Subtle:  border-black/10
Medium:  border-black/20
```

### Backgrounds
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

---

## Work Page Template

Canonical template for all work/case study pages. All 6 work pages follow this structure.

### Hero Section

```
section: px-4 md:px-8 lg:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20
```

- **Title (h1):** `text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]`
- **Subtitle:** `text-lg md:text-xl lg:text-2xl font-normal text-black/70 mt-4`
- **Description:** `text-base text-black/70 max-w-3xl mt-8 mb-8`
- **Tags:** `flex flex-wrap gap-2` with individual tags as `px-3 py-1 text-xs bg-black/5 text-black/50`

### Visual/Interactive Section

```
section: px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20
  div: border border-black/10 bg-white overflow-hidden
```

Standard frame for interactive visualisations and images.

### Content Section

```
section: px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20
  div: grid lg:grid-cols-[3fr_7fr] gap-12 lg:gap-16
```

**Left column** (metadata sidebar):
- Uses `MetadataDropdown` component for expandable sections
- Sections: Category, Audience, Approach, Adaptability, Technology, Data

**Right column** (main content):
- The Challenge, Background, Technical approach, etc.
- `space-y-12` between major sections

**Section headings (h2):** `text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6`

**Body text:** `text-black/70 leading-relaxed`

**Multi-paragraph:** wrap in `div: space-y-4`

### MetadataDropdown Component

Expandable metadata sections for work page sidebars:

```tsx
<MetadataDropdown label="Category" defaultOpen>
  <p className="text-sm text-black/70">Scientific Visualisation</p>
</MetadataDropdown>
```

- Label: `text-xs font-mono uppercase tracking-wider text-black/50`
- Chevron indicator for expand/collapse
- Content: `text-sm text-black/70`

---

## Explainer Pages — Seven-Stage Arc

Explainer pages (like Fractals, Stellar Evolution, Nuclide Chart, Orbital Mechanics) follow a specific narrative structure and layout pattern. Use this when creating new explainer pages.

### Content Structure Overview

| Stage | Duration | Purpose |
|-------|----------|---------|
| HOOK | 5-10 sec | Visual punch, create curiosity |
| ANCHOR | 30 sec | Connect to what reader knows |
| FOUNDATION | 2-5 min | Simple concrete example of core concept |
| BUILD | 5-15 min | Progressive complexity, 3-5 beats |
| REWARD | 1-2 min | "Now you get it" consolidation |
| EXTEND | optional | Deeper material, clearly flagged |
| LAUNCH | — | Pathways to further exploration |

### Stage 1: HOOK

**Purpose:** Visual punch, create curiosity

```tsx
<section className='relative h-[70vh] min-h-[500px] bg-black overflow-hidden'>
  <video
    autoPlay
    loop
    muted
    playsInline
    className='absolute inset-0 w-full h-full object-cover'
  >
    <source src='/work/[slug]/hook-video.mp4' type='video/mp4' />
  </video>
  <div className='absolute inset-0 flex items-center justify-center'>
    <div className='text-center text-white px-4'>
      <h2 className='font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-4'>
        {title}
      </h2>
      <p className='font-display text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white/80'>
        {subtitle}
      </p>
    </div>
  </div>
</section>
```

**Rules:**
- Visual dominates — minimal text
- `h-[70vh] min-h-[500px]` for viewport coverage
- Animation/video should pose a question without answering it

### Stage 2: ANCHOR

**Purpose:** Connect to what reader already knows

```tsx
<section className='px-4 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      {heading}
    </h2>
    <div className='space-y-4 text-black/70 leading-relaxed'>
      {/* 2-4 paragraphs, conversational tone */}
    </div>
  </div>
</section>
```

**Rules:**
- Two-column layout: heading left, content right
- Conversational, second-person voice ("You've seen...", "You know...")
- No interactive elements — pure reading

### Stage 3: FOUNDATION

**Purpose:** Simple concrete example of core concept

```tsx
<section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12 mb-8'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      {heading}
    </h2>
    <div className='space-y-4 text-black/70 leading-relaxed'>
      {/* Brief setup text */}
    </div>
  </div>
  <div className='border border-black/10 bg-white overflow-hidden'>
    <FoundationInteractive />
  </div>
  <p className='text-xs md:text-sm text-black/50 mt-4'>
    {caption}
  </p>
</section>
```

**Rules:**
- First interactive element appears here
- Interactive should be simple — one core concept only
- Respects 3-4 chunk working memory limit

### Stage 4: BUILD

**Purpose:** Progressive complexity in 3-5 beats

```tsx
<section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12 mb-8'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      {beat.heading}
    </h2>
    <div className='space-y-4 text-black/70 leading-relaxed'>
      {beat.content}
    </div>
  </div>
  {beat.visual && (
    <>
      <div className='border border-black/10 bg-white overflow-hidden'>
        {beat.visual}
      </div>
      <p className='text-xs md:text-sm text-black/50 mt-4'>
        {beat.visualCaption}
      </p>
    </>
  )}
</section>
```

**Rules:**
- Each beat introduces ONE new concept
- Consistent two-column layout throughout
- 3-5 beats total — more creates cognitive overload

### Stage 5: REWARD

**Purpose:** Consolidation, "now you get it" moment

```tsx
<section className='px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24 bg-black text-white'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      {heading}
    </h2>
    <div className='space-y-4 text-white/70 leading-relaxed'>
      {/* Synthesise what they've learned */}
    </div>
  </div>
</section>
```

**Rules:**
- **Full inversion:** `bg-black text-white` signals transition
- Same two-column grid layout (consistency)
- This is the "ah-ha" moment — don't rush it

### Stage 6: EXTEND

**Purpose:** Deeper material for those who want more

```tsx
<section className='px-4 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      Going Deeper
    </h2>
    <p className='text-black/50 text-sm'>
      For the curious - you've got the main idea, this is extra.
    </p>
  </div>
</section>

{/* Multiple subsections follow */}
<section className='px-4 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
    <h3 className='text-2xl md:text-3xl font-bold tracking-tight'>
      {subsectionHeading}
    </h3>
    <div className='space-y-4 text-black/70 leading-relaxed'>
      {subsectionContent}
    </div>
  </div>
</section>
```

**Rules:**
- Always expanded (no collapse/details element)
- Multiple h3 subsections acceptable
- Can be more technical — audience has self-selected

### Stage 7: LAUNCH

**Purpose:** Pathways to further exploration

```tsx
<section className='px-4 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-24 pt-16 md:pt-20'>
  <div className='grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 lg:gap-12'>
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
      Further Exploration
    </h2>
    <div className='space-y-8'>
      <div>
        <h3 className='text-xs font-mono uppercase tracking-wider text-black/40 mb-4'>
          Recommended Reading
        </h3>
        <ul className='space-y-2 text-sm'>
          {/* Links with descriptions */}
        </ul>
      </div>
      <div>
        <h3 className='text-xs font-mono uppercase tracking-wider text-black/40 mb-4'>
          Related Explainers
        </h3>
        <ul className='space-y-2 text-sm'>
          {/* Internal links */}
        </ul>
      </div>
    </div>
  </div>
</section>
```

**Rules:**
- Related explainers (internal links)
- External resources (reputable sources)
- Never more than 6 options (decision paralysis)

### Visual Elements

**Interactive/Visual Containers:**
```tsx
<div className='border border-black/10 bg-white overflow-hidden'>
  {/* Interactive content */}
</div>
<p className='text-xs md:text-sm text-black/50 mt-4'>
  {caption}
</p>
```

**Callout — Key Insight:**
```tsx
<div className='border-l-4 border-[var(--color-blue)] pl-4 py-2 my-6'>
  <p className='text-black/70 font-medium'>{insight}</p>
</div>
```

**Callout — Warning:**
```tsx
<div className='border-l-4 border-[var(--color-pink)] pl-4 py-2 my-6'>
  <p className='text-black/70 font-medium'>{warning}</p>
</div>
```

**Definition:**
```tsx
<div className='bg-black/5 p-4 my-6'>
  <p className='font-bold text-xs uppercase tracking-wider text-black/50 mb-1'>
    {term}
  </p>
  <p className='text-black/70'>{definition}</p>
</div>
```

### Explainer File Structure

```
/app/work/[slug]/
├── page.tsx              # Main page with inline content
├── components/
│   ├── HookVideo.tsx     # Stage 1 video/animation
│   ├── [Interactive].tsx # Interactive components
│   └── ...
```

### Audience Adaptation

| Audience | Tone | Complexity | Interactivity |
|----------|------|------------|---------------|
| Kids (8-12) | Playful | 3-4 chunks max | Gamified |
| General Adults | Curious, respectful | 4-5 chunks | Guided discovery |
| Business Leaders | Direct, strategic | Lead with conclusions | Diagnostic tools |
| Policymakers | Evidence-based | Systems framing | Scenario modelling |

### Explainer Checklist

**Content:**
- [ ] Hook creates genuine curiosity
- [ ] Anchor connects to prior knowledge
- [ ] Foundation uses ONE simple example
- [ ] Build has 3-5 beats, each with ONE concept
- [ ] Reward provides emotional satisfaction
- [ ] Extend is expanded (not collapsed)
- [ ] Launch offers 3-6 pathways

**Design:**
- [ ] Two-column grid: `grid-cols-[3fr_7fr]`
- [ ] Correct padding: `px-4 md:px-8 lg:px-12`
- [ ] Borders use `border-black/10`
- [ ] Reward section inverts: `bg-black text-white`
- [ ] Sharp corners throughout

---

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
