import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import bottleAsset from "@/assets/tfl-bottle.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "27634595961";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE = "+27 62 054 0240";
const BOTTLE_IMAGE = bottleAsset.url;

type Size = { label: string; price: number };
const SIZES: Size[] = [
  { label: "30ml", price: 280 },
  { label: "50ml", price: 360 },
];

type DeliveryOption = { id: string; name: string; price: number; isPaxi: boolean };
const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "paxi-small", name: "PAXI Small Bag", price: 60, isPaxi: true },
  { id: "paxi-large", name: "PAXI Large Bag", price: 100, isPaxi: true },
  { id: "courier", name: "Courier Guy", price: 150, isPaxi: false },
  { id: "courier-large", name: "Courier Guy (Large)", price: 200, isPaxi: false },
];

const rand = (n: number) => `R${n}`;

type Fragrance = {
  name: string;
  available: boolean;
  tagline: string;
  notes?: string[];
};

const FRAGRANCES: Fragrance[] = [
  {
    name: "Black Authority",
    available: true,
    tagline: "Commanding. Nocturnal. Unforgettable.",
    notes: ["Rosewood", "Rich Oud", "Dark Amber"],
  },
  {
    name: "Velvet Fire",
    available: false,
    tagline: "A slow burn wrapped in silk.",
  },
  {
    name: "Glass Wealth",
    available: false,
    tagline: "Translucent opulence, poured in gold.",
  },
];

function Monogram({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50">
        <div className="absolute inset-1 rounded-full border border-[color:var(--color-gold)]/25" />
        <span className="font-display text-3xl tracking-[0.2em] text-gold-shimmer">TFL</span>
      </div>
      <span className="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.55em] text-[color:var(--color-cream)]/70">
        The Fragrance Lab
      </span>
    </div>
  );
}

function FragranceCard({ f, index }: { f: Fragrance; index: number }) {
  const [hover, setHover] = useState(false);
  const notify = encodeURIComponent(
    `Hi, please notify me when ${f.name} is available.`,
  );
  const onOrder = () => {
    window.dispatchEvent(new CustomEvent("tfl:order", { detail: { name: f.name } }));
  };
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[color:var(--color-gold)]/15 bg-[color:var(--color-charcoal)]/60 transition duration-700 hover:border-[color:var(--color-gold)]/45 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(212,175,55,0.35)]"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 z-10 pointer-events-none" />
        <img
          src={BOTTLE_IMAGE}
          alt={`${f.name} luxury round perfume bottle`}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
        />

        {f.available ? (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-end gap-3 p-8 text-center transition-all duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="glass-panel rounded-2xl px-6 py-5">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.5em] text-[color:var(--color-gold)]">
                Fragrance Notes
              </p>
              <div className="mt-3 flex flex-col gap-1 font-display text-lg text-[color:var(--color-cream)]">
                {f.notes?.map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${
              hover ? "opacity-100 bg-black/55" : "opacity-0 bg-black/0"
            }`}
          >
            <div className="text-center">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.6em] text-[color:var(--color-gold)]">
                Arriving Soon
              </p>
              <p className="mt-2 font-display text-4xl italic text-[color:var(--color-cream)]">
                Coming Soon
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-3xl text-[color:var(--color-cream)]">{f.name}</h3>
            {f.available && (
              <span className="font-sans text-[0.55rem] uppercase tracking-[0.4em] text-[color:var(--color-gold)]">
                Available
              </span>
            )}
          </div>
          <p className="mt-2 font-sans text-sm text-[color:var(--color-cream)]/60">{f.tagline}</p>
        </div>

        {f.available && (
          <ul className="space-y-2">
            {SIZES.map((s) => (
              <li
                key={s.label}
                className="flex items-center justify-between border-b border-[color:var(--color-gold)]/10 pb-2 font-sans text-sm text-[color:var(--color-cream)]/85"
              >
                <span className="uppercase tracking-[0.3em] text-xs text-[color:var(--color-cream)]/60">
                  {s.label}
                </span>
                <span className="font-display text-lg text-gold-shimmer">{rand(s.price)}</span>
              </li>
            ))}
          </ul>
        )}

        {f.available ? (
          <button
            onClick={onOrder}
            className="mt-auto inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--color-gold)]/60 px-6 py-3 font-sans text-[0.65rem] uppercase tracking-[0.5em] text-[color:var(--color-cream)] transition-all duration-500 hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] hover:tracking-[0.6em]"
          >
            Order Now
            <span aria-hidden>→</span>
          </button>
        ) : (
          <a
            href={`${WHATSAPP}?text=${notify}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--color-gold)]/60 px-6 py-3 font-sans text-[0.65rem] uppercase tracking-[0.5em] text-[color:var(--color-cream)] transition-all duration-500 hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] hover:tracking-[0.6em]"
          >
            Notify Me
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </article>
  );
}

function Index() {
  const delivery = [
    { name: "PAXI Small Bag", price: "R60" },
    { name: "PAXI Large Bag", price: "R100" },
    { name: "Courier Guy", price: "R150" },
    { name: "Courier Guy (Large)", price: "R200+" },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] font-sans text-[color:var(--color-cream)]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]" />
        </div>

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
          <span className="font-display text-lg tracking-[0.35em] text-[color:var(--color-cream)]/80">TFL</span>
          <a
            href="#fragrances"
            className="font-sans text-[0.6rem] uppercase tracking-[0.5em] text-[color:var(--color-cream)]/70 hover:text-[color:var(--color-gold)] transition"
          >
            Collection
          </a>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-16 text-center sm:pt-24">
          <div className="animate-rise animate-float">
            <Monogram />
          </div>
          <div className="hairline mt-14 w-24" />
          <h1 className="animate-rise mt-8 font-display text-5xl leading-[1.05] tracking-tight text-[color:var(--color-cream)] sm:text-7xl md:text-8xl">
            Luxury in <span className="italic text-gold-shimmer">Every Note.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-xl font-sans text-base text-[color:var(--color-cream)]/65 sm:text-lg">
            Crafted fragrances designed to leave a lasting impression.
          </p>
          <a
            href="#fragrances"
            className="animate-rise mt-12 inline-flex items-center gap-3 rounded-full border border-[color:var(--color-gold)]/50 px-8 py-3 font-sans text-[0.65rem] uppercase tracking-[0.5em] text-[color:var(--color-cream)] transition-all hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)]"
          >
            Discover the Collection
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      {/* FRAGRANCES */}
      <section id="fragrances" className="relative px-6 py-28 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.6em] text-[color:var(--color-gold)]">
              The Collection
            </span>
            <h2 className="mt-4 font-display text-4xl text-[color:var(--color-cream)] sm:text-5xl">
              Featured Fragrances
            </h2>
            <div className="hairline mt-6 w-16" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FRAGRANCES.map((f, i) => (
              <FragranceCard key={f.name} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="relative border-t border-[color:var(--color-gold)]/10 bg-[color:var(--color-charcoal)]/30 px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.6em] text-[color:var(--color-gold)]">
              Delivery
            </span>
            <h2 className="mt-4 font-display text-4xl text-[color:var(--color-cream)] sm:text-5xl">
              Delivered with care.
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm text-[color:var(--color-cream)]/60">
              Choose the delivery method that suits you. All parcels are dispatched
              discreetly and tracked from door to door.
            </p>
          </div>
          <ul className="space-y-4">
            {delivery.map((d) => (
              <li
                key={d.name + d.price}
                className="glass-panel flex items-center justify-between rounded-2xl px-6 py-5 transition-all duration-500 hover:border-[color:var(--color-gold)]/60"
              >
                <span className="font-display text-lg text-[color:var(--color-cream)]">{d.name}</span>
                <span className="font-display text-xl text-gold-shimmer">{d.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative overflow-hidden px-6 py-28 sm:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_60%)]" />
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.6em] text-[color:var(--color-gold)]">
            Enquiries
          </span>
          <h2 className="mt-4 font-display text-4xl text-[color:var(--color-cream)] sm:text-6xl">
            Speak with the atelier.
          </h2>
          <div className="hairline mt-8 w-24" />
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="mt-10 font-display text-3xl text-gold-shimmer sm:text-5xl"
          >
            {PHONE}
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-gold)] px-8 py-3 font-sans text-[0.65rem] uppercase tracking-[0.5em] text-[color:var(--color-ink)] transition-all hover:tracking-[0.6em]"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--color-gold)]/10 px-6 py-12 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-display text-lg tracking-[0.35em] text-[color:var(--color-cream)]/70">
            TFL
          </span>
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.5em] text-[color:var(--color-cream)]/50">
            © {new Date().getFullYear()} The Fragrance Lab · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
