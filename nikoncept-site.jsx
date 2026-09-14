import React, { useEffect, useRef, useState } from "react";
import {
  Wifi, Server, IdCard, Smartphone, Printer, Calendar, ShieldCheck,
  Phone, Mail, MapPin, Menu, X, ArrowUpRight, Camera, FileText,
  CreditCard, Plane, Monitor, Tags, Gift, Zap
} from "lucide-react";

/* ---------------------------------------------------------
   NIKoncept — design tokens
   Base:      #0A0E13  (near-black navy)
   Surface:   #121822  (raised panel)
   Surface-2: #1A222E  (hover / active panel)
   Accent:    #2FB6C4  (signal cyan)
   Accent-2:  #FF5C35  (hot orange — CTAs / active states only)
   Text:      #E8EDF2
   Muted:     #6B7885
   Line:      #212B38
--------------------------------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const CLUSTERS = [
  {
    key: "digital",
    title: "Digital & Tech",
    blurb: "The backbone work — building, connecting, and securing the systems a business runs on.",
    icon: Wifi,
    image: "https://picsum.photos/seed/nik-digital/900/700",
    items: ["Web Designing", "Hosting", "Networking", "Biometric Solutions", "Computer & Accessories Sales", "Computer Work"],
  },
  {
    key: "registration",
    title: "Registration & Compliance",
    blurb: "The paperwork that legitimizes a business or identity — handled so you don't have to queue for it.",
    icon: FileText,
    image: "https://picsum.photos/seed/nik-registration/900/700",
    items: ["Company Registration (CAC)", "NIN Registration", "TIN", "Tax", "Affidavit", "Online Registration & Maintenance"],
  },
  {
    key: "bills",
    title: "Bills & Utilities",
    blurb: "Recurring life admin, settled fast — DSTV, PHCN, GOTV, STARTIMES and beyond.",
    icon: CreditCard,
    image: "https://picsum.photos/seed/nik-bills/900/700",
    items: ["Paying of Bills (DSTV, PHCN, GOTV, STARTIMES)", "Airline Ticketing", "Bulk SMS", "Outsourcing"],
  },
  {
    key: "print",
    title: "Print & Branding",
    blurb: "Physical identity — cards, signage, and merchandise that carry a brand into the real world.",
    icon: IdCard,
    image: "https://picsum.photos/seed/nik-print/900/700",
    items: ["Plastic ID Card", "LED-Light Emitting Diodes", "Digital Press", "Branding", "Monogram", "Name Tag", "General Merchandise", "Promotional Gift Items", "Advertising"],
  },
  {
    key: "events",
    title: "Events & Services",
    blurb: "On-site execution — from a single photo frame to a fully managed event.",
    icon: Calendar,
    image: "https://picsum.photos/seed/nik-events/900/700",
    items: ["Event Management", "Photo Frame", "I.C.T Training", "Consulting", "Supply of First Aid Kits"],
  },
];

const STATS = [
  { value: "25+", label: "services under one roof" },
  { value: "RC 2478738", label: "registered business" },
  { value: "Mushin", label: "Lagos State base" },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function NodeHero() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  // fixed node layout so lines connect predictably
  const nodes = [
    { x: 60, y: 60 }, { x: 260, y: 40 }, { x: 420, y: 120 },
    { x: 130, y: 200 }, { x: 340, y: 230 }, { x: 480, y: 60 },
    { x: 220, y: 280 }, { x: 40, y: 240 },
  ];
  const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[3,6],[4,5],[6,7],[0,7],[4,6]];

  return (
    <svg viewBox="0 0 520 320" className="nik-node-svg" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          className={`nik-edge ${drawn ? "nik-edge-on" : ""}`}
          style={{ transitionDelay: `${i * 70}ms` }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={i === 3 ? 7 : 4.5}
          className={`nik-node ${drawn ? "nik-node-on" : ""}`}
          style={{ transitionDelay: `${300 + i * 60}ms` }}
        />
      ))}
    </svg>
  );
}

export default function NikoncepTSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(NAV.map((n) => n.id));

  const goTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="nik-root">
      <style>{`
        .nik-root {
          --base: #0A0E13;
          --surface: #121822;
          --surface2: #1A222E;
          --accent: #2FB6C4;
          --accent2: #FF5C35;
          --text: #E8EDF2;
          --muted: #6B7885;
          --line: #212B38;
          background: var(--base);
          color: var(--text);
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          min-height: 100vh;
        }
        .nik-root * { box-sizing: border-box; }
        .nik-headline {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          letter-spacing: -0.01em;
        }
        .nik-mono { font-family: 'IBM Plex Mono', monospace; }

        /* nav */
        .nik-nav {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 28px;
          background: rgba(10,14,19,0.85);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .nik-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 19px; letter-spacing: -0.01em; }
        .nik-logo span { color: var(--accent); }
        .nik-navlinks { display: none; gap: 30px; }
        @media (min-width: 860px) { .nik-navlinks { display: flex; } }
        .nik-navlink {
          background: none; border: none; cursor: pointer;
          color: var(--muted); font-size: 14.5px; padding: 6px 2px;
          border-bottom: 2px solid transparent;
          transition: color .2s ease, border-color .2s ease;
        }
        .nik-navlink:hover { color: var(--text); }
        .nik-navlink.on { color: var(--text); border-color: var(--accent2); }
        .nik-navcta {
          display: none;
          background: var(--accent2); color: #0A0E13; font-weight: 600;
          border: none; padding: 9px 16px; border-radius: 3px; font-size: 14px; cursor: pointer;
        }
        @media (min-width: 860px) { .nik-navcta { display: inline-flex; align-items:center; gap:6px; } }
        .nik-menubtn { background: none; border: none; color: var(--text); cursor: pointer; }
        @media (min-width: 860px) { .nik-menubtn { display: none; } }
        .nik-mobilemenu {
          display: flex; flex-direction: column; gap: 2px;
          background: var(--surface); border-bottom: 1px solid var(--line);
        }
        .nik-mobilemenu button {
          text-align: left; background: none; border: none; color: var(--text);
          padding: 14px 28px; font-size: 15px; border-bottom: 1px solid var(--line); cursor: pointer;
        }

        /* hero */
        .nik-hero {
          display: grid; grid-template-columns: 1fr; gap: 40px;
          padding: 64px 28px 80px; max-width: 1180px; margin: 0 auto;
          scroll-margin-top: 70px;
        }
        @media (min-width: 960px) {
          .nik-hero { grid-template-columns: 1.1fr 0.9fr; align-items: center; padding-top: 90px; }
        }
        .nik-eyebrow { color: var(--accent); font-size: 13.5px; margin-bottom: 18px; }
        .nik-h1 {
          font-size: clamp(34px, 5.2vw, 58px); line-height: 1.05; font-weight: 600; margin: 0 0 22px;
        }
        .nik-h1 em { color: var(--accent); font-style: normal; }
        .nik-lede { color: var(--muted); font-size: 17px; line-height: 1.65; max-width: 46ch; margin-bottom: 32px; }
        .nik-herobtns { display: flex; gap: 14px; flex-wrap: wrap; }
        .nik-btn-primary {
          background: var(--accent2); color: #0A0E13; font-weight: 600; border: none;
          padding: 13px 22px; border-radius: 3px; font-size: 15px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .nik-btn-ghost {
          background: none; color: var(--text); border: 1px solid var(--line);
          padding: 13px 22px; border-radius: 3px; font-size: 15px; cursor: pointer;
        }
        .nik-node-svg { width: 100%; height: auto; }
        .nik-edge { stroke: var(--line); stroke-width: 1.4; opacity: 0; transition: opacity .5s ease, stroke .6s ease; }
        .nik-edge-on { opacity: 1; stroke: var(--accent); }
        .nik-node { fill: var(--surface2); stroke: var(--line); stroke-width: 1; opacity: 0; transform-origin: center; transition: opacity .4s ease, fill .5s ease; }
        .nik-node-on { opacity: 1; fill: var(--accent2); }
        @media (prefers-reduced-motion: reduce) {
          .nik-edge, .nik-node { transition: none; opacity: 1; stroke: var(--accent); }
        }

        /* stats strip */
        .nik-stats {
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          display: grid; grid-template-columns: repeat(3, 1fr);
        }
        .nik-stat { padding: 26px 20px; text-align: center; border-right: 1px solid var(--line); }
        .nik-stat:last-child { border-right: none; }
        .nik-stat-value { font-family: 'Space Grotesk', sans-serif; font-size: 22px; color: var(--accent); }
        .nik-stat-label { color: var(--muted); font-size: 13px; margin-top: 4px; }

        /* section shell */
        .nik-section { max-width: 1180px; margin: 0 auto; padding: 90px 28px; scroll-margin-top: 64px; }
        .nik-section-head { max-width: 640px; margin-bottom: 48px; }
        .nik-section-eyebrow { color: var(--accent2); font-size: 13px; margin-bottom: 12px; }
        .nik-h2 { font-size: clamp(26px, 3.4vw, 36px); font-weight: 600; margin: 0 0 14px; }
        .nik-section-lede { color: var(--muted); font-size: 15.5px; line-height: 1.6; }

        /* services clusters */
        .nik-clusters { display: flex; flex-direction: column; gap: 2px; background: var(--line); }
        .nik-cluster {
          display: grid; grid-template-columns: 1fr; background: var(--surface);
        }
        @media (min-width: 860px) { .nik-cluster { grid-template-columns: 320px 1fr; } }
        .nik-cluster-img { height: 220px; overflow: hidden; }
        @media (min-width: 860px) { .nik-cluster-img { height: auto; } }
        .nik-cluster-img img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(30%) contrast(1.05); }
        .nik-cluster-body { padding: 32px; }
        .nik-cluster-top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .nik-cluster-icon {
          width: 38px; height: 38px; border-radius: 3px; background: var(--surface2);
          display: flex; align-items: center; justify-content: center; color: var(--accent);
        }
        .nik-cluster-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; }
        .nik-cluster-blurb { color: var(--muted); font-size: 14.5px; line-height: 1.55; margin-bottom: 18px; max-width: 52ch; }
        .nik-taglist { display: flex; flex-wrap: wrap; gap: 8px; }
        .nik-tag {
          font-size: 13px; color: var(--text); border: 1px solid var(--line);
          padding: 6px 11px; border-radius: 3px;
        }

        /* about */
        .nik-about-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 900px) { .nik-about-grid { grid-template-columns: 1fr 1fr; } }
        .nik-about-copy p { color: var(--muted); font-size: 15.5px; line-height: 1.7; margin: 0 0 16px; max-width: 54ch; }
        .nik-about-img { border-radius: 4px; overflow: hidden; border: 1px solid var(--line); }
        .nik-about-img img { width: 100%; display: block; filter: grayscale(20%); }
        .nik-principle { display: flex; gap: 12px; padding: 16px 0; border-top: 1px solid var(--line); }
        .nik-principle:last-child { border-bottom: 1px solid var(--line); }
        .nik-principle-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
        .nik-principle-title { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
        .nik-principle-text { color: var(--muted); font-size: 14px; line-height: 1.5; }

        /* contact */
        .nik-contact-grid { display: grid; grid-template-columns: 1fr; gap: 2px; background: var(--line); border: 1px solid var(--line); }
        @media (min-width: 900px) { .nik-contact-grid { grid-template-columns: 1fr 1fr; } }
        .nik-contact-panel { background: var(--base); padding: 36px; }
        .nik-contact-row { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--line); }
        .nik-contact-row:last-child { border-bottom: none; }
        .nik-contact-icon { color: var(--accent2); flex-shrink: 0; margin-top: 2px; }
        .nik-contact-label { color: var(--muted); font-size: 12.5px; margin-bottom: 3px; }
        .nik-contact-value { font-size: 14.5px; }
        .nik-form { display: flex; flex-direction: column; gap: 14px; }
        .nik-form input, .nik-form textarea {
          background: var(--surface); border: 1px solid var(--line); color: var(--text);
          padding: 13px 14px; border-radius: 3px; font-family: inherit; font-size: 14.5px;
        }
        .nik-form input:focus, .nik-form textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
        .nik-form label { font-size: 13px; color: var(--muted); margin-bottom: 5px; display: block; }

        /* footer */
        .nik-footer {
          border-top: 1px solid var(--line); padding: 28px; text-align: center;
          color: var(--muted); font-size: 13px;
        }
      `}</style>

      {/* NAV */}
      <nav className="nik-nav">
        <div className="nik-logo">Nik<span>oncept</span></div>
        <div className="nik-navlinks">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nik-navlink ${active === n.id ? "on" : ""}`}
              onClick={() => goTo(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
        <button className="nik-navcta" onClick={() => goTo("contact")}>
          Talk to us <ArrowUpRight size={15} />
        </button>
        <button className="nik-menubtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {menuOpen && (
        <div className="nik-mobilemenu">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => goTo(n.id)}>{n.label}</button>
          ))}
          <button onClick={() => goTo("contact")}>Talk to us</button>
        </div>
      )}

      {/* HERO */}
      <header id="home" className="nik-hero">
        <div>
          <div className="nik-eyebrow nik-mono"></div>
          <h1 className="nik-headline nik-h1">
            One partner for every system <em>and</em> every errand your business runs on.
          </h1>
          <p className="nik-lede">
            NIKoncept connects the technical work — networking, hosting, web design, biometric
            systems — with the paperwork and logistics that keep a business legal and running:
            CAC registration, NIN, bill payments, event execution, and print. Professionalism
            anchored on integrity, RC 2478738.
          </p>
          <div className="nik-herobtns">
            <button className="nik-btn-primary" onClick={() => goTo("services")}>
              See all services <ArrowUpRight size={16} />
            </button>
            <button className="nik-btn-ghost" onClick={() => goTo("contact")}>
              Get in touch
            </button>
          </div>
        </div>
        <NodeHero />
      </header>

      {/* STATS */}
      <section className="nik-stats">
        {STATS.map((s) => (
          <div className="nik-stat" key={s.label}>
            <div className="nik-stat-value nik-headline">{s.value}</div>
            <div className="nik-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section id="services" className="nik-section">
        <div className="nik-section-head">
          <div className="nik-section-eyebrow nik-mono">What we handle</div>
          <h2 className="nik-headline nik-h2">Five clusters, one desk.</h2>
          <p className="nik-section-lede">
            Most of what NIKoncept does falls into five practical groups. You rarely need just
            one — a new business usually needs registration, a website, ID cards, and a launch
            event in the same season.
          </p>
        </div>
        <div className="nik-clusters">
          {CLUSTERS.map((c) => {
            const Icon = c.icon;
            return (
              <div className="nik-cluster" key={c.key}>
                <div className="nik-cluster-img">
                  <img src={c.image} alt={c.title} loading="lazy" />
                </div>
                <div className="nik-cluster-body">
                  <div className="nik-cluster-top">
                    <div className="nik-cluster-icon"><Icon size={19} /></div>
                    <div className="nik-cluster-title nik-headline">{c.title}</div>
                  </div>
                  <div className="nik-cluster-blurb">{c.blurb}</div>
                  <div className="nik-taglist">
                    {c.items.map((it) => (
                      <span className="nik-tag" key={it}>{it}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="nik-section">
        <div className="nik-about-grid">
          <div>
            <div className="nik-section-eyebrow nik-mono">Who we are</div>
            <h2 className="nik-headline nik-h2">Started as an ICT outfit. Grew into a front desk for small business Lagos.</h2>
            <div className="nik-about-copy" style={{ marginTop: 20 }}>
              <p>
                NIKoncept began doing the technical work — networking, computer sales, web
                design — for businesses around Mushin. The registrations, bill payments, and
                event requests followed, because the same people needed them and trusted the
                same desk to get it right.
              </p>
              <p>
                Under Comrade Ayansanya Olaniyi ("Delaw"), Principal Partner, the outfit is
                registered under RC 2478738 and still runs on the same line it opened with:
                professionalism anchored on integrity.
              </p>
            </div>
            <div>
              <div className="nik-principle">
                <ShieldCheck className="nik-principle-icon" size={20} />
                <div>
                  <div className="nik-principle-title">Registered, not informal</div>
                  <div className="nik-principle-text">CAC-registered business (RC 2478738) — the same registration service we run for clients.</div>
                </div>
              </div>
              <div className="nik-principle">
                <Zap className="nik-principle-icon" size={20} />
                <div>
                  <div className="nik-principle-title">One desk, fewer handoffs</div>
                  <div className="nik-principle-text">Technical, administrative, and logistical work handled by one team that already has your details.</div>
                </div>
              </div>
              <div className="nik-principle">
                <Tags className="nik-principle-icon" size={20} />
                <div>
                  <div className="nik-principle-title">Priced for small business</div>
                  <div className="nik-principle-text">Services scoped and billed individually — pay for what the job actually needs.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="nik-about-img">
            <img src="https://picsum.photos/seed/nik-about/800/1000" alt="NIKoncept team at work" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="nik-section" style={{ paddingBottom: 60 }}>
        <div className="nik-section-head">
          <div className="nik-section-eyebrow nik-mono">Reach us</div>
          <h2 className="nik-headline nik-h2">Tell us what you need handled.</h2>
        </div>
        <div className="nik-contact-grid">
          <div className="nik-contact-panel">
            <div className="nik-contact-row">
              <MapPin className="nik-contact-icon" size={19} />
              <div>
                <div className="nik-contact-label">Address</div>
                <div className="nik-contact-value">30 Agoro Street, By Cardoso Bus Stop, Mushin, Lagos State, Nigeria</div>
              </div>
            </div>
            <div className="nik-contact-row">
              <Phone className="nik-contact-icon" size={19} />
              <div>
                <div className="nik-contact-label">Phone</div>
                <div className="nik-contact-value">
                  +234 802 705 2030 · +234 813 028 6712<br />+234 807 788 7144 · +234 818 179 9781
                </div>
              </div>
            </div>
            <div className="nik-contact-row">
              <Mail className="nik-contact-icon" size={19} />
              <div>
                <div className="nik-contact-label">Email</div>
                <div className="nik-contact-value">info@nikoncept.com.ng</div>
              </div>
            </div>
          </div>
          <div className="nik-contact-panel">
            <form className="nik-form" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="nik-name">Name</label>
                <input id="nik-name" type="text" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="nik-service">What do you need?</label>
                <input id="nik-service" type="text" placeholder="e.g. CAC registration, website, event" />
              </div>
              <div>
                <label htmlFor="nik-msg">Details</label>
                <textarea id="nik-msg" rows={4} placeholder="Tell us more" />
              </div>
              <button className="nik-btn-primary" type="submit" style={{ justifyContent: "center" }}>
                Send message <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="nik-footer">
        NIKoncept · RC 2478738 · Professionalism Anchored on Integrity
      </footer>
    </div>
  );
}
