import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronDown, MapPin, Quote, Timer, Moon, Sun, Download } from "lucide-react";

// ================= THEME =================
const COLORS = {
  purple: "#2d0d4b",
  gold: "#ffcc00",
  orange: "#ff8a00",
  teal: "#00c2c7",
  navy: "#0c0c16",
};

// ================= UTILS =================
function useCountdown(targetDate) {
  const [diff, setDiff] = useState(() => Math.max(0, targetDate - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, targetDate - Date.now())), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

//================== AUDIO ==================
const AUDIO = {
  ambience: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c6a00c2a2.mp3?filename=gentle-piano-ambient-140983.mp3",
};

// ================= NAV =================
const TopHoverNav = ({ onJump }) => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 40);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "home", label: "Home" },
    { id: "news", label: "Events" },
    { id: "programs", label: "Programs" },
    { id: "camps", label: "Summer Camps" },
    { id: "reviews", label: "Reviews" },
    { id: "maskmaker", label: "Mask Maker" },
    { id: "tour", label: "Tour Map" },
    { id: "timeline", label: "Timeline" },
    { id: "support", label: "Support" },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] pointer-events-none">
      <div className="h-6 w-full" />
      <nav
        className={`mx-auto w-full max-w-6xl rounded-b-2xl bg-black/40 px-4 py-3 backdrop-blur-md transition-all pointer-events-auto ${
          visible ? "opacity-100" : "opacity-0 -translate-y-5"
        }`}
      >
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onJump(item.id)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 hover:bg-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                  <path d="M3 5c0 5 3 9 9 9s9-4 9-9c-4 3-14 3-18 0Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 9c0-.6-.9-1-2-1s-2 .4-2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 9c0-.6-.9-1-2-1s-2 .4-2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline-block">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// ================= BANNER =================
function SiteBanner() {
  return (
    <div className="w-full" style={{ background: COLORS.navy }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 text-center md:flex-row">
        <div className="flex items-center gap-4">
          {/* Swap the src to your deployed asset path. Missing image will not break render. */}
          <img src="/assets/grumbling-gryphons-banner.png" alt="Grumbling Gryphons Traveling Children's Theater" className="h-16 w-auto" />
          <div className="hidden md:block text-white text-sm md:text-base">
            <span className="mr-2 font-serif">Celebrating our 5th Decade!</span>
            <span className="opacity-80">Winner of the 2003 Connecticut Governor’s Arts Award</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="https://www.facebook.com/Grumbling-Gryphons-Theatre-Company-374597725065/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20"
          >
            Like us on Facebook!
          </a>
          <a
            href="https://www.youtube.com/channel/UC8_JxL1Oy618r69AhCJJ6rw/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20"
          >
            View more on YouTube!
          </a>
          <a href="#support" className="rounded-full px-3 py-1 font-semibold text-black" style={{ background: COLORS.gold }}>
            Donate now via PayPal Giving Fund
          </a>
        </div>
      </div>
    </div>
  );
}

// ================= HERO =================
const HeroCurtain = () => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
    if (!muted) audioRef.current?.play().catch(() => {});
    else audioRef.current?.pause();
  }, [muted]);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(1200px 600px at 50% 10%, ${COLORS.purple} 0%, ${COLORS.navy} 50%, #000 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: `conic-gradient(from 220deg at 50% 0%, ${COLORS.orange}, transparent, ${COLORS.gold})` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-7xl"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {"Grumbling Gryphons Traveling Children’s Theatre".split("").map((ch, i) => (
            <motion.span key={i} className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-4 text-lg text-white/85">Winner of the 2003 Connecticut Governor’s Arts Award · Touring since 1980</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#news"
            className="rounded-full"
            style={{ background: COLORS.gold, color: "#000", padding: "0.75rem 1.5rem", fontWeight: 700 }}
          >
            See What’s Next
          </a>
          <a className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20" href="#programs">
            Our Programs
          </a>
          <a
            href="#booking"
            className="rounded-full"
            style={{ background: COLORS.orange, color: "#000", padding: "0.75rem 1.5rem", fontWeight: 700 }}
          >
            Book a Performance
          </a>
        </div>
      </div>

      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 text-white">
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 hover:bg-black/50"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span className="hidden sm:inline-block text-sm">{muted ? "Sound Off" : "Ambience On"}</span>
        </button>
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-full w-1/2 origin-left"
        style={{ background: `linear-gradient(90deg, #5b0a1e, #8a0f29)` }}
        initial={{ x: 0 }}
        animate={{ x: open ? "-100%" : 0 }}
        transition={{ duration: 1.4 }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 origin-right"
        style={{ background: `linear-gradient(270deg, #5b0a1e, #8a0f29)` }}
        initial={{ x: 0 }}
        animate={{ x: open ? "100%" : 0 }}
        transition={{ duration: 1.4 }}
      />

      <audio ref={audioRef} src={AUDIO.ambience} loop autoPlay className="hidden" />
      <ChevronDown className="absolute bottom-6 z-20 animate-bounce text-white/80" />
    </section>
  );
};

// ================= SECTIONS =================
const NewsUpcoming = () => (
  <section id="news" className="relative bg-[#0c0c16] py-20 text-white">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mb-2 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
        News & Upcoming Performances
      </h2>
      <p className="mx-auto mb-8 max-w-3xl text-center text-white/80">Upcoming public shows and recent press highlights.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <h3 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
            August 8, 2025 — Waterbury, CT
          </h3>
          <p className="mt-2 text-white/85">Anansi, The Trickster Spider — Mattatuck Museum, 144 West Main Street</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <h3 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
            August 16, 2025 — Pine Plains, NY
          </h3>
          <p className="mt-2 text-white/85">Trickster Coyote Shares the Fire — Stissing Center · Workshop 9am, Show 10am</p>
        </div>
      </div>
    </div>
  </section>
);

const Programs = () => {
  const shows = [
    { title: "The Ghost Net: An Environmental Musical of the Sea", synopsis: "A dazzling ocean adventure with music and audience participation." },
    { title: "Trickster Tales: Native American Animal Legends", synopsis: "Raven, Skunk and Coyote help the people through humor and heart." },
    { title: "The Myth of Persephone", synopsis: "Classical Greek myth brought to life with masks, chorus work and ASL." },
    { title: "Anansi — The Trickster Spider", synopsis: "Anansi retrieves the stolen stories with help from the audience." },
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="programs" className="relative bg-[#0c0c16] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
          Programs & Repertoire
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            {shows.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`w-full rounded-xl border border-white/10 p-4 text-left transition ${
                  active === i ? "bg-white/10" : "bg-black/30 hover:bg-black/40"
                }`}
              >
                <h3 className="font-serif text-xl text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-white/75">{s.synopsis}</p>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h4 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
              {shows[active].title}
            </h4>
            <p className="mt-3 text-white/85">{shows[active].synopsis}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SummerCamps = () => (
  <section id="camps" className="relative bg-[#0c0c16] py-20 text-white">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mb-8 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
        Summer Camps
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="font-serif text-2xl text-white">2025 Summer Theater Camps</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-white/85">
            <li>
              <strong>Gala Theater Camp 2025</strong> — Mon, July 28 – Fri, Aug 1. <a className="underline" href="#">
                Registration Form »
              </a>
            </li>
            <li>
              <strong>Mattatuck Museum Camp 2025</strong> — Mon, Aug 4 – Fri, Aug 8.{" "}
              <a className="underline" href="#">
                Registration Page »
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="font-serif text-2xl text-white">Highlights & Parent Notes</h3>
          <p className="mt-2 text-sm text-white/85">
            “The performance was remarkable… I can’t believe the kids accomplished so much in just one week.” — Carolyn W.
          </p>
          <p className="mt-2 text-sm text-white/85">
            “Our daughter had nothing short of a magical experience… a warm, caring and joyful environment.” — Whitney M.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Reviews = () => {
  const quotes = [
    { who: "Leanne Maguire, Principal (June 2025)", text: "The Ghost Net… engaged every student K–8 in an unforgettable, immersive experience." },
    { who: "Tessa Winiarski, Parent (May 2025)", text: "Beautifully crafted costumes combined with skilled interactive acting… you’ll leave the show humming!" },
    { who: "Lakeville Journal (Jun 11, 2025)", text: "Cornwall students take part in Grumbling Gryphons show." },
  ];
  return (
    <section id="reviews" className="relative bg-[#0c0c16] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
          Reviews & Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((n, i) => (
            <div key={i} className="rounded-xl bg-[#fffaf0] p-4 text-black shadow-2xl">
              <Quote className="mb-2 opacity-30" />
              <p className="text-sm">{n.text}</p>
              <p className="mt-3 text-right text-xs font-semibold">— {n.who}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MaskMaker = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#b46fff");
  const [shape, setShape] = useState("oval");
  const [stickers, setStickers] = useState([]);
  const [symmetry, setSymmetry] = useState(true);
  const dragId = useRef(null);

  const redraw = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    // Clear & background
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = COLORS.navy;
    ctx.fillRect(0, 0, c.width, c.height);

    // ---- Mask (centered) ----
    ctx.save();
    ctx.translate(c.width / 2, c.height / 2);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 4;
    const w = 280,
      h = 360;

    if (shape === "oval") {
      ctx.beginPath();
      ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    }
    if (shape === "heart") {
      ctx.beginPath();
      ctx.moveTo(0, -h / 4);
      ctx.bezierCurveTo(w / 4, -h / 2, w / 2, -h / 8, 0, h / 3);
      ctx.bezierCurveTo(-w / 2, -h / 8, -w / 4, -h / 2, 0, -h / 4);
    }
    if (shape === "cat") {
      ctx.beginPath();
      ctx.ellipse(0, 20, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.moveTo(-80, -80);
      ctx.lineTo(-20, -130);
      ctx.lineTo(20, -80);
      ctx.moveTo(80, -80);
      ctx.lineTo(20, -130);
      ctx.lineTo(-20, -80);
    }
    ctx.fill();
    ctx.stroke();

    // Eyes (cut out) while still centered
    ctx.globalCompositeOperation = "destination-out";
    [-60, 60].forEach((ex) => {
      ctx.beginPath();
      ctx.ellipse(ex, -20, 30, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
    ctx.restore();

    // ---- Stickers (canvas coordinates, no translate) ----
    stickers.forEach((s) => {
      ctx.save();
      ctx.font = `${s.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.char, s.x, s.y);
      if (symmetry) ctx.fillText(s.char, c.width - s.x, s.y);
      ctx.restore();
    });
  };

  useEffect(redraw, [color, shape, stickers, symmetry]);

  const hitSticker = (x, y) => {
    for (let i = stickers.length - 1; i >= 0; i--) {
      const s = stickers[i];
      const dx = s.x - x,
        dy = s.y - y;
      if (Math.hypot(dx, dy) < s.size) return s.id;
    }
    return null;
  };
  const onDown = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    dragId.current = hitSticker(x, y);
  };
  const onMove = (e) => {
    if (!dragId.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    setStickers((arr) => arr.map((s) => (s.id === dragId.current ? { ...s, x, y } : s)));
  };
  const onUp = () => {
    dragId.current = null;
  };
  const addSticker = (char) =>
    setStickers((arr) => [
      ...arr,
      { id: (crypto?.randomUUID?.() ?? String(Math.random())).slice(0, 12), char, x: 270 + Math.random() * 40, y: 260 + Math.random() * 40, size: 36 },
    ]);
  const clearStickers = () => setStickers([]);

  const download = (transparent = false) => {
    const c = canvasRef.current;
    if (!c) return;
    const off = document.createElement("canvas");
    off.width = c.width;
    off.height = c.height;
    const ox = off.getContext("2d");
    const w = 280,
      h = 360;

    // Optional background
    if (!transparent) {
      ox.fillStyle = COLORS.navy;
      ox.fillRect(0, 0, off.width, off.height);
    }

    // Mask centered
    ox.save();
    ox.translate(off.width / 2, off.height / 2);
    ox.fillStyle = color;
    ox.strokeStyle = "#111";
    ox.lineWidth = 4;

    if (shape === "oval") {
      ox.beginPath();
      ox.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    }
    if (shape === "heart") {
      ox.beginPath();
      ox.moveTo(0, -h / 4);
      ox.bezierCurveTo(w / 4, -h / 2, w / 2, -h / 8, 0, h / 3);
      ox.bezierCurveTo(-w / 2, -h / 8, -w / 4, -h / 2, 0, -h / 4);
    }
    if (shape === "cat") {
      ox.beginPath();
      ox.ellipse(0, 20, w / 2, h / 2, 0, 0, Math.PI * 2);
      ox.moveTo(-80, -80);
      ox.lineTo(-20, -130);
      ox.lineTo(20, -80);
      ox.moveTo(80, -80);
      ox.lineTo(20, -130);
      ox.lineTo(-20, -80);
    }
    ox.fill();
    ox.stroke();

    // Eyes cutout (still centered)
    ox.globalCompositeOperation = "destination-out";
    [-60, 60].forEach((ex) => {
      ox.beginPath();
      ox.ellipse(ex, -20, 30, 18, 0, 0, Math.PI * 2);
      ox.fill();
    });
    ox.globalCompositeOperation = "source-over";
    ox.restore();

    // Stickers (no transform)
    stickers.forEach((s) => {
      ox.font = `${s.size}px serif`;
      ox.textAlign = "center";
      ox.textBaseline = "middle";
      ox.fillText(s.char, s.x, s.y);
      if (symmetry) ox.fillText(s.char, off.width - s.x, s.y);
    });

    const url = off.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = transparent ? "my-mask-transparent.png" : "my-mask.png";
    a.click();
  };

  return (
    <section id="maskmaker" className="relative bg-[#0c0c16] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
          Mask Maker
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-white/80">
          Design your own theatre mask — drag stickers, mirror them symmetrically, and export a print-ready PNG.
        </p>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-2xl">
            <canvas
              ref={canvasRef}
              width={540}
              height={540}
              onMouseDown={onDown}
              onMouseMove={onMove}
              onMouseUp={onUp}
              onMouseLeave={onUp}
              className="mx-auto w-full max-w-[540px] rounded-2xl border border-white/10"
            />
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4 shadow-2xl">
            <h3 className="mb-3 font-serif text-2xl" style={{ color: COLORS.gold }}>
              Controls
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="mb-1 block text-white/80">Shape</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "oval", label: "Oval" },
                    { id: "heart", label: "Heart" },
                    { id: "cat", label: "Cat" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setShape(opt.id)}
                      className={`rounded-full px-3 py-1 ${shape === opt.id ? "bg-[var(--gold)] text-black" : "bg-white/10 text-white"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-white/80">Color</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-20 cursor-pointer rounded" />
              </div>
              <div>
                <label className="mb-1 block text-white/80">Stickers</label>
                <div className="flex flex-wrap gap-2">
                  {["✨", "🎭", "🦁", "🌟", "🎶", "🪽"].map((c) => (
                    <button key={c} onClick={() => addSticker(c)} className="rounded-full bg-white/10 px-3 py-1 text-xl">
                      {c}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input id="sym" type="checkbox" checked={symmetry} onChange={(e) => setSymmetry(e.target.checked)} />
                  <label htmlFor="sym" className="text-white/80">
                    Mirror stickers symmetrically
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={clearStickers} className="rounded-full border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10">
                  Clear
                </button>
                <button
                  onClick={() => download(false)}
                  className="flex items-center gap-2 rounded-full"
                  style={{ background: COLORS.orange, color: "#000", padding: "0.5rem 1rem", fontWeight: 700 }}
                >
                  <Download size={16} /> Download PNG
                </button>
                <button
                  onClick={() => download(true)}
                  className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                >
                  <Download size={16} /> Transparent PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TourMap = () => {
  const [active, setActive] = useState(null);
  const pins = [
    { city: "Waterbury, CT — Aug 8, 2025 (Mattatuck Museum)", x: "58%", y: "38%", clip: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    { city: "Pine Plains, NY — Aug 16, 2025 (Stissing Center)", x: "55%", y: "40%", clip: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  ];
  return (
    <section id="tour" className="relative min-h-[60vh] bg-[#0c0c16] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
          Tour Map
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-white/80">Upcoming public shows appear as glowing pins. Click to watch a short moment.</p>
        <div
          className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          style={{ background: `linear-gradient(180deg, ${COLORS.purple}, ${COLORS.navy})` }}
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute h-px w-full bg-white/5" style={{ top: `${(i + 1) * 7}%` }} />
          ))}
          {[...Array(16)].map((_, i) => (
            <div key={i} className="absolute h-full w-px bg-white/5" style={{ left: `${(i + 1) * 5.8}%` }} />
          ))}
          {pins.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(p)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: p.x, top: p.y, background: COLORS.gold, padding: 8, boxShadow: "0 0 0 2px rgba(255,255,255,.6)" }}
              title={p.city}
            >
              <MapPin className="text-black" size={18} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#17172b] p-4" initial={{ y: 20 }} animate={{ y: 0 }}>
              <button onClick={() => setActive(null)} className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-white/80 hover:bg-white/20">
                Close
              </button>
              <h4 className="mb-3 font-serif text-2xl" style={{ color: COLORS.gold }}>
                {active.city}
              </h4>
              <video className="h-64 w-full rounded-lg" src={active.clip} controls />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Timeline = () => {
  const milestones = [
    { year: 1980, text: "Company founded; first neighborhood performance" },
    { year: 1995, text: "Reached 100 schools toured" },
    { year: 2008, text: "Launched Summer Camps" },
    { year: 2016, text: "1,000th performance celebrated" },
    { year: 2025, text: "Digital Mask Maker & interactive tour" },
  ];
  const [idx, setIdx] = useState(milestones.length - 1);
  return (
    <section id="timeline" className="relative bg-[#0c0c16] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
          Timeline
        </h2>
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl">
          <input type="range" min={0} max={milestones.length - 1} value={idx} onChange={(e) => setIdx(parseInt(e.target.value, 10))} className="w-full" />
          <div className="mt-4 flex items-center justify-between text-white/70">
            <span>{milestones[0].year}</span>
            <span>{milestones[milestones.length - 1].year}</span>
          </div>
          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <h4 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
              {milestones[idx].year}
            </h4>
            <p className="mt-2 text-white/85">{milestones[idx].text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportAndFooter = () => {
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 12);
    d.setHours(19, 30, 0, 0);
    return d.getTime();
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);
  return (
    <>
      <section id="support" className="relative bg-[#0c0c16] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-center font-serif text-4xl" style={{ color: COLORS.gold }}>
            Support the Theatre
          </h2>
          <div className="mx-auto mb-8 max-w-xl rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
            <p className="text-white/85">
              We’re a 501(c)(3). Donate through the PayPal Giving Fund (no fees). All contributions are tax-deductible — thank you!
            </p>
            <a
              className="mt-4 inline-block rounded-full px-6 py-3 font-semibold text-black hover:opacity-90"
              style={{ background: COLORS.gold }}
              href="https://www.paypal.com/us/fundraiser/charity/1504062"
              target="_blank"
              rel="noreferrer"
            >
              Donate via PayPal Giving Fund
            </a>
            <p className="mt-3 text-xs text-white/70">NEFA’s New England States Touring (NEST) fee support may be available.</p>
          </div>

          <div id="booking" className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
              Book a Performance
            </h3>
            <form className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50" placeholder="Your Name" />
              <input className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50" placeholder="Email" type="email" />
              <input className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50 sm:col-span-2" placeholder="Organization / School" />
              <input className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50" placeholder="City" />
              <input className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50" placeholder="Preferred Date" type="date" />
              <textarea className="rounded-lg bg-white/10 p-3 text-white placeholder-white/50 sm:col-span-2" rows={4} placeholder="Tell us about your event" />
              <button className="sm:col-span-2 rounded-full px-6 py-3 font-semibold text-black hover:opacity-90" style={{ background: COLORS.orange }}>
                Request Booking
              </button>
            </form>
          </div>

          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/10 bg-black/50 p-6 text-center">
            <div className="mx-auto flex max-w-sm items-center justify-center gap-3" style={{ color: COLORS.gold }}>
              <Timer />
              <p className="font-serif text-xl">Next performance starts in:</p>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                { label: "Days", v: days },
                { label: "Hours", v: hours },
                { label: "Min", v: minutes },
                { label: "Sec", v: seconds },
              ].map((b, i) => (
                <div key={i} className="rounded-xl bg-white/10 p-3">
                  <div className="text-3xl font-bold text-white">{String(b.v).padStart(2, "0")}</div>
                  <div className="text-xs text-white/70">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-[#0c0c16] text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h4 className="font-serif text-2xl" style={{ color: COLORS.gold }}>
                Grumbling Gryphons
              </h4>
              <p className="mt-2 max-w-sm text-white/80">Traveling Children’s Theatre — puppets, masks, music, and community collaborations.</p>
              <p className="mt-2 text-sm text-white/60">
                Email: <a className="underline" href="mailto:grumblinggryphons@gmail.com">grumblinggryphons@gmail.com</a> · Phone: 860-672-0286
              </p>
            </div>
            <div>
              <h5 className="font-serif text-xl" style={{ color: COLORS.gold }}>
                Newsletter
              </h5>
              <div className="mt-3 flex gap-2">
                <input className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder-white/50" placeholder="Email address" />
                <button className="rounded-full px-4 py-2 font-semibold text-black" style={{ background: COLORS.gold }}>
                  Sign Up
                </button>
              </div>
              <p className="mt-2 text-xs text-white/60">Styled like a ticket stub ✂️ — check your inbox!</p>
            </div>
            <div>
              <h5 className="font-serif text-xl" style={{ color: COLORS.gold }}>
                Follow
              </h5>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://www.facebook.com/Grumbling-Gryphons-Theatre-Company-374597725065/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-black/60"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/channel/UC8_JxL1Oy618r69AhCJJ6rw/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-black/60"
                >
                  YouTube
                </a>
              </div>
              <p className="mt-3 text-xs text-white/60">
                Partners: CT Office of the Arts, Arts NWCT, CT Humanities, Cornwall Foundation, Iron Bank, NCCF · NEFA NEST fee support available.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-white/60">© {new Date().getFullYear()} Grumbling Gryphons Traveling Children’s Theatre. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

// ================= APP ROOT =================
export default function GrumblingGryphonsSite() {
  const [mode, setMode] = useState("dark");
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  // Moved "DEV TESTS" into a proper effect (no illegal hook calls)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const links = document.querySelectorAll("a");
        if (links.length < 3) console.warn("[Test] Expected 3+ CTA links; found", links.length);
        const donate = Array.from(links).find((a) => a.getAttribute("href") === "#support");
        if (!donate) console.warn("[Test] Donate CTA not found (#support)");
      } catch (e) {
        console.warn("[Test] Skipped DOM tests:", e);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.navy }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root { --gold: ${COLORS.gold}; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
      `}</style>

      <button
        onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        className="fixed bottom-4 right-4 z-[90] flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white shadow-lg backdrop-blur hover:bg-black/60"
      >
        {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        <span className="text-sm">{mode === "dark" ? "Light" : "Dark"} Mode</span>
      </button>

      <TopHoverNav onJump={jump} />
      <SiteBanner />
      <HeroCurtain />
      <NewsUpcoming />
      <Programs />
      <SummerCamps />
      <Reviews />
      <MaskMaker />
      <TourMap />
      <Timeline />
      <SupportAndFooter />
    </div>
  );
}
