# NIKoncept site — continuation prompt for Claude Code / VS Code

Paste this into your Pro account to pick up where the design pass left off.

---

I'm continuing a website build for **NIKoncept**, a Lagos-based ICT & business
services company (RC 2478738, Mushin, Lagos). I have a working React design
prototype (`nikoncept-site.jsx`) that establishes the visual direction:

- **Palette**: near-black base `#0A0E13`, surface `#121822`/`#1A222E`, cyan
  accent `#2FB6C4`, hot-orange CTA accent `#FF5C35`, text `#E8EDF2`, muted `#6B7885`.
- **Type**: Space Grotesk (headlines), IBM Plex Sans (body), IBM Plex Mono (small labels).
- **Concept**: a "node network" motif in the hero (animated once on load), and
  services grouped into 5 clusters (Digital & Tech, Registration & Compliance,
  Bills & Utilities, Print & Branding, Events) instead of one long list.
- **Structure**: single scrolling page with scroll-spy navigation that behaves
  like page routing (Home / Services / About / Contact anchors, active state
  tracked via IntersectionObserver).

## What still needs doing (the credit-heavy part)

1. **Set up the real project**: Vite + React + Tailwind (or plain CSS — the
   prototype uses hand-written CSS-in-JS via a `<style>` tag, which you can
   keep or migrate to Tailwind/CSS modules).
2. **Replace all placeholder imagery** (`picsum.photos` seeds) with real
   NIKoncept photography — the office, staff, printed ID card samples, past
   events, branded merchandise. If none exists yet, source royalty-free
   stock that matches the palette (desaturated, cool-toned).
3. **Expand copy** for each of the 5 service clusters — right now each has a
   short blurb and a tag list; each deserves its own detail view or modal
   with pricing/turnaround expectations, written in plain, active-voice
   language (see the frontend-design skill's writing guidance if you have
   it loaded — active voice, no filler, name things the way a customer would).
4. **Working contact form**: wire the form to an actual backend (Formspree,
   a serverless function, or WhatsApp deep link — the business runs on
   phone contact, so a "message us on WhatsApp" CTA may convert better than
   a form).
5. **Responsiveness pass**: test the node-network SVG hero, the cluster
   grid, and the contact grid at 375px, 768px, 1024px, 1440px.
6. **Accessibility**: verify color contrast on the cyan/orange accents
   against the dark base, keyboard focus states on nav and form, and confirm
   `prefers-reduced-motion` is respected (already stubbed in the CSS).
7. **SEO/meta**: title, description, Open Graph image, favicon built from
   the NIKoncept logo mark (the blue speech-bubble/wing shape on the card).
8. **Deploy**: Vercel or Netlify; connect the domain
   `www.nikoncept.com.ng` if the client wants to point it there.

Keep the palette, type system, and node-network/cluster concepts — those
were deliberately chosen to avoid generic "AI-generated" defaults (warm
cream + serif, SaaS card grids, etc.) and match a techy, non-luxury brief.
