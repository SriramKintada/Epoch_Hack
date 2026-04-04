import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// ── Types ──────────────────────────────────────────────────────────
interface EvalScores {
  product: number | null;
  sales: number | null;
  technical: number | null;
  mentors: string;
  acquirers: string;
  interviewSlot: string;
  notes: string;
}

interface PriorityApplicant {
  rank: number;
  name: string;
  team: string;
  phone: string;
  building: string;
  slotPreference: string;
  defaultScores: Partial<EvalScores>;
}

interface ConfirmedApplicant {
  name: string;
  phone: string;
  city: string;
  building: string;
  status: string;
  action: string;
}

interface NonPuneApplicant {
  name: string;
  phone: string;
  city: string;
  building: string;
  quality: string;
}

interface Top15Entry {
  rank: number;
  name: string;
  city: string;
  building: string;
  why: string;
  format: string;
}

// ── Data ───────────────────────────────────────────────────────────
const INTERVIEW_SLOTS = [
  '',
  // Sunday Apr 5 (10 AM - 6 PM, 25 min + 5 buffer = 30 min blocks, 16 slots)
  'Sun 10:00', 'Sun 10:30', 'Sun 11:00', 'Sun 11:30',
  'Sun 12:00', 'Sun 12:30', 'Sun 1:00', 'Sun 1:30',
  'Sun 2:00', 'Sun 2:30', 'Sun 3:00', 'Sun 3:30',
  'Sun 4:00', 'Sun 4:30', 'Sun 5:00', 'Sun 5:30',
  // Monday Apr 7 (1.5 hr = 3 slots, Mumbai online)
  'Mon 5:00', 'Mon 5:30', 'Mon 6:00',
  // Tuesday Apr 8 (1.5 hr = 3 slots, Mumbai online)
  'Tue 5:00', 'Tue 5:30', 'Tue 6:00',
  // Wednesday Apr 9 (1.5 hr = 3 slots, overflow)
  'Wed 5:00', 'Wed 5:30', 'Wed 6:00',
];

const PRIORITY_APPLICANTS: PriorityApplicant[] = [
  {
    rank: 1, name: 'Basil Paulose', team: 'Reoxide AI', phone: '98332 39950',
    building: 'India\'s 1st AI Carbon Trading Marketplace. Edinburgh, Draper Startup House, UCR partnership, 10M credits.',
    slotPreference: 'Sunday/Monday/Tuesday',
    defaultScores: { product: 4, sales: 4, technical: 5, interviewSlot: 'Sun 10:00' }
  },
  {
    rank: 2, name: 'Ritesh Bhakare + team', team: 'AgriBotics', phone: '+918262921113',
    building: '500+ farmers on WhatsApp, NitiQuest finals, Best Agri-Tech. Location-based farming guidance. Real traction with real farmers.',
    slotPreference: 'Sunday (needs slot email)',
    defaultScores: { product: 4, sales: 4, technical: 3, interviewSlot: 'Sun 10:30' }
  },
  {
    rank: 3, name: 'Jainam Oswal + team', team: 'AI PPT Maker', phone: '+919370682619',
    building: '15L MVP client. Custom programming language for PPTs (Mermaid-inspired). Real money from real customer.',
    slotPreference: 'Sunday (needs slot email)',
    defaultScores: { product: 4, sales: 5, technical: 3, interviewSlot: 'Sun 11:00' }
  },
  {
    rank: 4, name: 'Rahul Dange', team: 'Mediz', phone: '9860488395',
    building: 'Built UPI SDKs at Sarvatra, Tata Neu mobile apps, AEPS for banks. Enterprise-grade fintech engineer. Mediz is early.',
    slotPreference: 'Sunday',
    defaultScores: { product: 3, sales: 3, technical: 5, interviewSlot: 'Sun 11:30' }
  },
  {
    rank: 5, name: 'Harshit + Yogendra + Nilesh', team: 'Colrows', phone: '9406646575',
    building: 'AI semantic layer for DBs. Yogendra had Pfizer/GSK/HUL as paying clients in prev SaaS. Nilesh ran 600K/yr institute.',
    slotPreference: 'Sunday',
    defaultScores: { product: 4, sales: 4, technical: 4, interviewSlot: 'Sun 12:00' }
  },
  {
    rank: 6, name: 'Ismail Patel', team: 'MSME AI Engine', phone: '8788737771',
    building: 'Co-leads MCCIA Applied AI Studio. 550+ MSMEs, 700+ consulting sessions, 25% efficiency gains. Institutional impact.',
    slotPreference: 'Sunday (Pune)',
    defaultScores: { product: 4, sales: 3, technical: 3, interviewSlot: 'Sun 12:30' }
  },
  {
    rank: 7, name: 'Ajinkya Takawale + team', team: 'Mixio', phone: '8768007772',
    building: 'Agentic AI video platform. Co-founder was founding eng at Vapi (YC). Open-sourced SLMs pre-ChatGPT. IIT KGP. Beta live.',
    slotPreference: 'Sunday if can come, else Mon online',
    defaultScores: { product: 4, sales: 3, technical: 5, interviewSlot: 'Sun 1:00' }
  },
  {
    rank: 8, name: 'Basil Paulose', team: 'Reoxide AI', phone: '98332 39950',
    building: 'AI carbon trading marketplace. Edinburgh/Draper programs. 10M credits listed (not necessarily sold). Bootstrapped.',
    slotPreference: 'Sun/Mon/Tue',
    defaultScores: { product: 3, sales: 3, technical: 3, interviewSlot: 'Sun 1:30' }
  },
  {
    rank: 9, name: 'Ankush Deshmukh', team: 'ZRONE', phone: '9890985151',
    building: '14yr Cloud Architect (Fortune 500) + 10yr fitness trainer. ZRONE AI fitness wearable ecosystem. Concept stage.',
    slotPreference: 'Sunday (needs slot email)',
    defaultScores: { product: 3, sales: 2, technical: 4, interviewSlot: 'Sun 2:00' }
  },
  {
    rank: 10, name: 'Muhammed Umar + Anas', team: 'Motoriq', phone: '9604646511',
    building: 'Vehicle mgmt for used car dealers. GST Margin Engine. Live product at motor-iq-two.vercel.app. No revenue yet.',
    slotPreference: 'Sunday',
    defaultScores: { product: 3, sales: 2, technical: 3, interviewSlot: 'Sun 2:30' }
  },
  {
    rank: 11, name: 'Mayur Patil', team: 'Ayurvedic SaaS', phone: '7397887032',
    building: 'Ayurvedic Clinic Mgmt. Live product, real client. Dairy Billing App in production. 500K practitioner market.',
    slotPreference: 'Tuesday onwards',
    defaultScores: { product: 4, sales: 3, technical: 3, interviewSlot: 'Sun 3:00' }
  },
  {
    rank: 12, name: 'Prashant Patil', team: 'BAAS Technologies', phone: '9665237210',
    building: 'Reusable launch vehicle for suborbital/orbital. CTO. Deep tech, massive TAM if real. Hard to evaluate without hardware.',
    slotPreference: 'TBD',
    defaultScores: { product: 4, sales: 2, technical: 5, interviewSlot: 'Sun 3:30' }
  },
  {
    rank: 13, name: 'Krish Gupta', team: 'Unknown', phone: '7219570360',
    building: 'Walked in, not in database. Showed initiative.',
    slotPreference: 'Sunday',
    defaultScores: { product: null, sales: null, technical: null, interviewSlot: 'Sun 4:00' }
  },
  // --- MONDAY: Mumbai + remote (online) ---
  {
    rank: 17, name: 'Varun Gupta', team: 'HelpingAI / AI Dubbing', phone: '+91 93154 55291',
    building: '1.5M+ OS downloads (verifiable on HuggingFace). Antler AIR 7. Intermediate reasoning model. Now building AI dubbing.',
    slotPreference: 'Remote (Gurgaon)',
    defaultScores: { product: 4, sales: 3, technical: 5, interviewSlot: 'Mon 5:00' }
  },
  {
    rank: 18, name: 'Prasad Hajare', team: 'Avianya AI', phone: '+917755991051',
    building: 'Solo founder from Nagpur. 180+ APIs, 3 paying clients, 50K+ msgs processed. WhatsApp+Meta Ads integration. Real revenue.',
    slotPreference: 'Remote (Nagpur)',
    defaultScores: { product: 4, sales: 4, technical: 4, interviewSlot: 'Mon 5:30' }
  },
  {
    rank: 19, name: 'Adhiraj Verma', team: 'Voice AI + CraftVC', phone: '+918318151945',
    building: 'IIM-A (<1% acceptance). craftvc.io (AI VC analyst). Voice AI for college admissions.',
    slotPreference: 'Remote (Kanpur)',
    defaultScores: { product: 3, sales: 3, technical: 4, interviewSlot: 'Mon 6:00' }
  },
  // --- TUESDAY: Mumbai + remote (online) ---
  {
    rank: 20, name: 'Zaid Mukaddam', team: 'Scira.ai [AUTO-SELECT]', phone: '+91 81693 85008',
    building: '19 yrs old. Said no to angel investment. Celebrity indie builder. Vercel founder support. Agentic AI research platform. 100+ models. AUTO-SELECTED.',
    slotPreference: 'Remote (Mumbai)',
    defaultScores: { product: 5, sales: 4, technical: 5, interviewSlot: 'Tue 5:00' }
  },
  {
    rank: 21, name: 'Vivek Singh', team: 'Noesis Systems', phone: '+919399601343',
    building: 'Attack surface intelligence. Claims 500+ cybersecurity hardware devices sold solo as student. Needs verification.',
    slotPreference: 'Remote (Bangalore)',
    defaultScores: { product: 3, sales: 3, technical: 4, interviewSlot: 'Tue 5:30' }
  },
  {
    rank: 22, name: 'Pritam Pawar', team: 'Alkemii Labs', phone: '+919577558080',
    building: 'AI video editor (Lovable for video). TournaHub 1000+ users (shut by govt). 50 beta users. alkemiilabs.com. Built fast.',
    slotPreference: 'Remote (Ahmednagar)',
    defaultScores: { product: 3, sales: 2, technical: 3, interviewSlot: 'Tue 6:00' }
  },
  // --- WEDNESDAY: Overflow ---
  {
    rank: 23, name: 'Kailash + Nandini + Arihan', team: 'Kino', phone: '+91 93264-05547',
    building: 'AI Story Engine, scripts to films. Applied 3 times. Dark pattern detector built. Marketing-heavy language.',
    slotPreference: 'Remote (Mumbai)',
    defaultScores: { product: 3, sales: 2, technical: 3, interviewSlot: 'Wed 5:00' }
  },
  {
    rank: 24, name: 'Pritesh Kamdi', team: 'DaaS Engine', phone: '+918390569583',
    building: 'Built HungryHub V1 for 2L. Reverse-engineered Google Protobuf. Goal: 10 B2B subs in 4 weeks. Clear technical depth.',
    slotPreference: 'Remote (was out of station)',
    defaultScores: { product: 3, sales: 3, technical: 4, interviewSlot: 'Wed 5:30' }
  },
  {
    rank: 25, name: 'Aman Porwal', team: 'Vi3W.in [AUTO-SELECT]', phone: '+918308141311',
    building: 'AI 3D Editor for Web. Lovable for 3D views. Launching this month. Co-founder reviewed, strong concept. AUTO-SELECTED.',
    slotPreference: 'Remote (Mumbai)',
    defaultScores: { product: 4, sales: 3, technical: 4, interviewSlot: 'Wed 6:00' }
  },
];

const CONFIRMED_NO_EMAIL: ConfirmedApplicant[] = [
  { name: 'Jainam Oswal + team', phone: '+919370682619', city: 'Pune', building: 'AI-native PPT maker with custom programming language (Mermaid-inspired). 15L MVP client.', status: 'Emailed confirmed, no interview time sent', action: 'Follow up for interview slot' },
  { name: 'Ankush Deshmukh', phone: '9890985151', city: 'Pune', building: 'ZRONE - AI fitness ecosystem with wearables. 14yr Cloud Architect + 10yr fitness trainer.', status: 'Emailed confirmed, no interview time sent', action: 'Follow up for interview slot' },
  { name: 'Ritesh Bhakare + team', phone: '+918262921113', city: 'Pune', building: 'AgriBotics - AI agri-tech, 500+ farmers on WhatsApp, NitiQuest finals, Best Agri-Tech award.', status: 'Emailed confirmed, no interview time sent', action: 'Follow up for interview slot' },
  { name: 'Neel Rawal', phone: '9309203642', city: 'Pune', building: 'Mentora AI - hands-on AI learning platform with real-world simulations.', status: 'Emailed confirmed, no interview time sent', action: 'Follow up for interview slot' },
  { name: 'Bharat', phone: '+91 8307882712', city: 'Pune', building: 'Markubees - startup-expert 1-1 virtual meeting platform. Live with payments + video calling.', status: 'Emailed confirmed, no interview time sent', action: 'Follow up for interview slot' },
];

const NON_PUNE: NonPuneApplicant[] = [
  { name: 'Zaid Mukaddam', phone: '+91 81693 85008', city: 'Mumbai', building: 'Scira.ai - agentic AI research platform. 100+ models, search + source modes.', quality: 'STRONG' },
  { name: 'Aman Porwal', phone: '+918308141311', city: 'Mumbai', building: 'Vi3W.in - AI 3D Editor for Web. Launching this month.', quality: 'GOOD' },
  { name: 'Kailash + Nandini + Arihan', phone: '+91 93264-05547', city: 'Mumbai', building: 'Kino - AI Cinematic Story Engine, scripts to films. Dark pattern detector. $4.4B market.', quality: 'GOOD' },
  { name: 'Vivek Singh', phone: '+919399601343', city: 'Bangalore', building: 'Noesis Systems - attack surface intelligence. Sold 500+ cybersecurity hardware devices solo as student.', quality: 'STRONG' },
  { name: 'Adhiraj Verma', phone: '+918318151945', city: 'Kanpur', building: 'Voice AI marketing stack for colleges. Built craftvc.io (AI VC analyst). IIM-A.', quality: 'STRONG' },
  { name: 'Varun Gupta', phone: 'N/A (Gurgaon)', city: 'Gurgaon', building: 'HelpingAI 1.5M+ downloads, world\'s first intermediate reasoning model. Antler AIR 7. AI dubbing software.', quality: 'STRONG' },
  { name: 'Pritam Pawar', phone: '+919577558080', city: 'Ahmednagar', building: 'Alkemii Labs - AI video editor (Lovable for video). TournaHub 1000+ users. 50 beta users.', quality: 'GOOD' },
  { name: 'Prasad Hajare', phone: '+917755991051', city: 'Nagpur', building: 'Avianya AI - unified marketing for SMBs. 180+ APIs, 50K+ messages, 3 paying clients. Solo founder.', quality: 'GOOD' },
  { name: 'Gaurav Mukherjee', phone: '+919955816505', city: 'Mumbai', building: '3D Replicator - programmable volumetric display with gel medium and microbubble voxels.', quality: 'INTERESTING' },
  { name: 'Maaz', phone: '8826333958', city: 'New Delhi', building: 'Life OS. FlickAI won Rs 2.27L at hackathon. Wants remote.', quality: 'MODERATE' },
];

const TOP_15: Top15Entry[] = [
  { rank: 1, name: 'Basil Paulose', city: 'Mumbai', building: 'Reoxide AI - Carbon Trading', why: '10M credits, Edinburgh/UCR partnerships, real marketplace with revenue path', format: 'In-person (came to Pune)' },
  { rank: 2, name: 'Zaid Mukaddam', city: 'Mumbai', building: 'Scira.ai', why: 'Agentic AI research platform, 100+ models, strong technical depth', format: 'Remote (Mumbai)' },
  { rank: 3, name: 'Harshit Chouhan + team', city: 'Pune', building: 'Colrows - AI semantic layer', why: 'Ex-Pfizer/GSK SaaS founder on team, MS hackathon winner, enterprise product', format: 'In-person' },
  { rank: 4, name: 'Dhruv Gadiya + Divy Patil', city: 'Pune', building: 'PayGate - x402 payments', why: 'ETH Mumbai highest bounty, Oasiz 500+ users, strong crypto/payments infra', format: 'In-person' },
  { rank: 5, name: 'Rahul Dange', city: 'Pune', building: 'Mediz', why: 'UPI SDKs, Tata Neu, Sarvatra background. Enterprise-grade engineer.', format: 'In-person' },
  { rank: 6, name: 'Varun Gupta', city: 'Gurgaon', building: 'HelpingAI', why: '1.5M+ downloads, Antler AIR 7, world\'s first intermediate reasoning model', format: 'Remote (Gurgaon)' },
  { rank: 7, name: 'Adhiraj Verma', city: 'Kanpur', building: 'Voice AI + craftvc.io', why: 'IIM-A, built AI VC analyst, voice AI marketing stack', format: 'Remote (Kanpur)' },
  { rank: 8, name: 'Vivek Singh', city: 'Bangalore', building: 'Noesis Systems', why: '500+ cybersecurity hardware devices sold solo, attack surface intelligence', format: 'Remote (Bangalore)' },
  { rank: 9, name: 'Prashant Patil', city: 'Pune', building: 'BAAS - Launch vehicle', why: 'Reusable launch vehicle, CTO, deep tech with massive TAM', format: 'In-person' },
  { rank: 10, name: 'Niraj Puran Rao', city: 'Pune', building: '3 parallel builds', why: 'IIT Roorkee, pro fighter, GDPR AI marketing + trading system + AI agent network', format: 'In-person' },
  { rank: 11, name: 'Jainam Oswal + team', city: 'Pune', building: 'AI PPT maker', why: '15L MVP client already, custom programming language approach', format: 'In-person (need slot)' },
  { rank: 12, name: 'Mayur Patil', city: 'Pune', building: 'Ayurvedic SaaS', why: 'Live product, real paying client, 500K+ practitioner market', format: 'In-person' },
  { rank: 13, name: 'Ritesh Bhakare + team', city: 'Pune', building: 'AgriBotics', why: '500+ farmers, NitiQuest finals, Best Agri-Tech award, real traction', format: 'In-person (need slot)' },
  { rank: 14, name: 'Kailash + team', city: 'Mumbai', building: 'Kino - AI Story Engine', why: '$4.4B market, scripts to films, dark pattern detector', format: 'Remote (Mumbai)' },
  { rank: 15, name: 'Muhammed Umar + Anas', city: 'Pune', building: 'Motoriq', why: 'Live product, GST margin engine, real dealership clients', format: 'In-person' },
];

// ── Storage helpers ────────────────────────────────────────────────
const STORAGE_KEY = 'epoch_eval_data';

function loadState(): Record<string, EvalScores> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveState(state: Record<string, EvalScores>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getDefault(app: PriorityApplicant): EvalScores {
  return {
    product: app.defaultScores.product ?? null,
    sales: app.defaultScores.sales ?? null,
    technical: app.defaultScores.technical ?? null,
    mentors: '',
    acquirers: '',
    interviewSlot: (app.defaultScores as Record<string, unknown>).interviewSlot as string || '',
    notes: '',
  };
}

// ── Styles ─────────────────────────────────────────────────────────
const S = {
  wrap: { background: '#000', color: '#e0e0e0', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace", padding: '1.5rem' } as const,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #1a1a1a' } as const,
  sectionHead: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', margin: '2.5rem 0 1rem', color: '#fff', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.75rem' } as const,
  badge: (color: string) => ({ background: color, color: '#000', fontSize: '0.65rem', padding: '0.15rem 0.5rem', fontWeight: 700, letterSpacing: '0.05em' }) as const,
  tableWrap: { overflowX: 'auto' as const, border: '1px solid #1a1a1a', marginBottom: '2rem' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.8rem' },
  th: { background: '#0a0a0a', padding: '0.5rem 0.6rem', textAlign: 'left' as const, fontSize: '0.65rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#888', borderBottom: '1px solid #222', whiteSpace: 'nowrap' as const },
  td: { padding: '0.5rem 0.6rem', borderBottom: '1px solid #111', verticalAlign: 'top' as const },
  input: { background: '#111', border: '1px solid #222', color: '#e0e0e0', padding: '0.3rem 0.4rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', width: '100%' },
  select: { background: '#111', border: '1px solid #222', color: '#e0e0e0', padding: '0.3rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' },
  scoreCell: (v: number | null) => {
    if (v === null) return { color: '#555' };
    if (v >= 4) return { color: '#00ff88', fontWeight: 700 };
    if (v >= 3) return { color: '#ffb800' };
    return { color: '#ff4444' };
  },
  qualityBadge: (q: string) => {
    const m: Record<string, string> = { STRONG: '#00ff88', GOOD: '#00aaff', INTERESTING: '#aa66ff', MODERATE: '#ffb800' };
    return { color: m[q] || '#888', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.04em' };
  },
  overallScore: (v: number) => {
    if (v >= 12) return { color: '#00ff88', fontWeight: 700, fontSize: '1rem' };
    if (v >= 9) return { color: '#ffb800', fontWeight: 700, fontSize: '1rem' };
    return { color: '#ff4444', fontWeight: 700, fontSize: '1rem' };
  },
  name: { fontWeight: 600, color: '#fff' },
  team: { fontSize: '0.7rem', color: '#00aaff' },
  phone: { fontSize: '0.75rem', color: '#888', whiteSpace: 'nowrap' as const },
  slotPref: { fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' },
  building: { fontSize: '0.75rem', color: '#ccc', maxWidth: '220px', lineHeight: '1.4' },
  rankNum: (r: number) => ({
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: r <= 3 ? '#00ff88' : r <= 7 ? '#ffb800' : '#888',
    textAlign: 'center' as const,
  }),
};

// ── Component ──────────────────────────────────────────────────────
const EVAL_PASS = 'epoch2026mav';

export default function EvalDashboard() {
  const [authed, setAuthed] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === EVAL_PASS) { window.location.hash = ''; return true; }
    return sessionStorage.getItem('epoch_eval_auth') === 'yes';
  });
  const [passInput, setPassInput] = useState('');
  const [scores, setScores] = useState<Record<string, EvalScores>>({});
  const [activeTab, setActiveTab] = useState<'priority' | 'confirmed' | 'nonpune' | 'top15'>('priority');

  useEffect(() => {
    const saved = loadState();
    const initial: Record<string, EvalScores> = {};
    for (const app of PRIORITY_APPLICANTS) {
      initial[app.name] = saved[app.name] || getDefault(app);
    }
    setScores(initial);
  }, []);

  const updateScore = useCallback((name: string, field: keyof EvalScores, value: string | number | null) => {
    setScores(prev => {
      const next = { ...prev, [name]: { ...prev[name], [field]: value } };
      saveState(next);
      return next;
    });
  }, []);

  const calcOverall = (s: EvalScores | undefined) => {
    if (!s) return null;
    const vals = [s.product, s.sales, s.technical].filter((v): v is number => v !== null);
    return vals.length === 3 ? vals.reduce((a, b) => a + b, 0) : null;
  };

  if (!authed) {
    return (
      <div style={{ ...S.wrap, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.5rem', color: '#fff' }}>EPOCH_ EVAL</h1>
          <input
            type="password"
            placeholder="Access code"
            value={passInput}
            onChange={e => setPassInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && passInput === EVAL_PASS) {
                sessionStorage.setItem('epoch_eval_auth', 'yes');
                setAuthed(true);
              }
            }}
            style={{ ...S.input, width: '250px', padding: '0.6rem', fontSize: '1rem', textAlign: 'center' }}
          />
          <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '0.75rem' }}>Enter access code to continue</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'priority' as const, label: 'SHOWED UP + EMAILED', count: PRIORITY_APPLICANTS.length, color: '#00ff88' },
    { key: 'confirmed' as const, label: 'CONFIRMED / NO SLOT', count: CONFIRMED_NO_EMAIL.length, color: '#ffb800' },
    { key: 'nonpune' as const, label: 'NON-PUNE / REMOTE', count: NON_PUNE.length, color: '#00aaff' },
    { key: 'top15' as const, label: 'TOP 15 OVERALL', count: 15, color: '#aa66ff' },
  ];

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>&lt; BACK TO SITE</Link>
          <h1 style={{ fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)", fontSize: '1.5rem', marginTop: '0.5rem', color: '#fff' }}>
            EPOCH_ EVAL DASHBOARD
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Interview scheduling & candidate ranking for Cohort 001</p>
        </div>
        <Link to="/admin/epoch-mavericks-2026" style={{ color: '#888', textDecoration: 'none', fontSize: '0.75rem', border: '1px solid #333', padding: '0.4rem 0.8rem' }}>
          APPLICATIONS DB &gt;
        </Link>
      </div>

      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              background: activeTab === t.key ? '#111' : 'transparent',
              border: `1px solid ${activeTab === t.key ? t.color : '#222'}`,
              color: activeTab === t.key ? t.color : '#666',
              padding: '0.5rem 1rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.15s',
            }}
          >
            {t.label} <span style={{ opacity: 0.6 }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* TABLE 1: Priority Interviews */}
      {activeTab === 'priority' && (
        <>
          <h2 style={S.sectionHead}>
            <span style={S.badge('#00ff88')}>PRIORITY</span>
            SHOWED UP + SENT INTERVIEW AVAILABILITY
          </h2>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Name / Team</th>
                  <th style={S.th}>Phone</th>
                  <th style={S.th}>Building</th>
                  <th style={S.th}>Product (1-5)</th>
                  <th style={S.th}>Sales/PMF (1-5)</th>
                  <th style={S.th}>Technical (1-5)</th>
                  <th style={S.th}>Overall</th>
                  <th style={S.th}>Mentors</th>
                  <th style={S.th}>Acquirers</th>
                  <th style={S.th}>Interview Slot</th>
                  <th style={S.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {PRIORITY_APPLICANTS.map(app => {
                  const s = scores[app.name] || getDefault(app);
                  const overall = calcOverall(s);
                  return (
                    <tr key={app.name} style={{ borderLeft: app.rank <= 5 ? '2px solid #00ff88' : 'none' }}>
                      <td style={{ ...S.td, ...S.rankNum(app.rank) }}>{app.rank}</td>
                      <td style={S.td}>
                        <div style={S.name}>{app.name}</div>
                        <div style={S.team}>{app.team}</div>
                      </td>
                      <td style={{ ...S.td, ...S.phone }}>{app.phone}</td>
                      <td style={{ ...S.td, ...S.building }}>{app.building}</td>
                      {/* Product Score */}
                      <td style={{ ...S.td, ...S.scoreCell(s.product) }}>
                        <select
                          style={S.select}
                          value={s.product ?? ''}
                          onChange={e => updateScore(app.name, 'product', e.target.value ? Number(e.target.value) : null)}
                        >
                          <option value="">--</option>
                          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </td>
                      {/* Sales Score */}
                      <td style={{ ...S.td, ...S.scoreCell(s.sales) }}>
                        <select
                          style={S.select}
                          value={s.sales ?? ''}
                          onChange={e => updateScore(app.name, 'sales', e.target.value ? Number(e.target.value) : null)}
                        >
                          <option value="">--</option>
                          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </td>
                      {/* Technical Score */}
                      <td style={{ ...S.td, ...S.scoreCell(s.technical) }}>
                        <select
                          style={S.select}
                          value={s.technical ?? ''}
                          onChange={e => updateScore(app.name, 'technical', e.target.value ? Number(e.target.value) : null)}
                        >
                          <option value="">--</option>
                          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </td>
                      {/* Overall */}
                      <td style={{ ...S.td, textAlign: 'center' }}>
                        {overall !== null ? (
                          <span style={S.overallScore(overall)}>{overall}/15</span>
                        ) : (
                          <span style={{ color: '#555' }}>--</span>
                        )}
                      </td>
                      {/* Mentors */}
                      <td style={S.td}>
                        <input
                          style={{ ...S.input, minWidth: '120px' }}
                          placeholder="Suggested mentors..."
                          value={s.mentors}
                          onChange={e => updateScore(app.name, 'mentors', e.target.value)}
                        />
                      </td>
                      {/* Acquirers */}
                      <td style={S.td}>
                        <input
                          style={{ ...S.input, minWidth: '120px' }}
                          placeholder="Potential acquirers..."
                          value={s.acquirers}
                          onChange={e => updateScore(app.name, 'acquirers', e.target.value)}
                        />
                      </td>
                      {/* Interview Slot */}
                      <td style={S.td}>
                        <select
                          style={S.select}
                          value={s.interviewSlot}
                          onChange={e => updateScore(app.name, 'interviewSlot', e.target.value)}
                        >
                          {INTERVIEW_SLOTS.map(sl => (
                            <option key={sl} value={sl}>{sl || '-- Assign --'}</option>
                          ))}
                        </select>
                        <div style={S.slotPref}>Pref: {app.slotPreference}</div>
                      </td>
                      {/* Notes */}
                      <td style={S.td}>
                        <input
                          style={{ ...S.input, minWidth: '140px' }}
                          placeholder="Notes..."
                          value={s.notes}
                          onChange={e => updateScore(app.name, 'notes', e.target.value)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* TABLE 2: Confirmed but no interview email */}
      {activeTab === 'confirmed' && (
        <>
          <h2 style={S.sectionHead}>
            <span style={S.badge('#ffb800')}>FOLLOW UP</span>
            CONFIRMED ATTENDANCE, NO INTERVIEW SLOT SENT
          </h2>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>Phone</th>
                  <th style={S.th}>City</th>
                  <th style={S.th}>Building</th>
                  <th style={S.th}>Status</th>
                  <th style={S.th}>Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {CONFIRMED_NO_EMAIL.map(app => (
                  <tr key={app.name}>
                    <td style={{ ...S.td, ...S.name }}>{app.name}</td>
                    <td style={{ ...S.td, ...S.phone }}>{app.phone}</td>
                    <td style={S.td}>{app.city}</td>
                    <td style={{ ...S.td, ...S.building }}>{app.building}</td>
                    <td style={{ ...S.td, color: '#ffb800', fontSize: '0.75rem' }}>{app.status}</td>
                    <td style={{ ...S.td, color: '#ff4444', fontSize: '0.75rem', fontWeight: 600 }}>{app.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* TABLE 3: Non-Pune / Remote */}
      {activeTab === 'nonpune' && (
        <>
          <h2 style={S.sectionHead}>
            <span style={S.badge('#00aaff')}>REMOTE</span>
            TOP NON-PUNE APPLICANTS (NEED REMOTE INTERVIEWS)
          </h2>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>Phone</th>
                  <th style={S.th}>City</th>
                  <th style={S.th}>Building</th>
                  <th style={S.th}>Quality</th>
                </tr>
              </thead>
              <tbody>
                {NON_PUNE.map(app => (
                  <tr key={app.name}>
                    <td style={{ ...S.td, ...S.name }}>{app.name}</td>
                    <td style={{ ...S.td, ...S.phone }}>{app.phone}</td>
                    <td style={S.td}>{app.city}</td>
                    <td style={{ ...S.td, ...S.building }}>{app.building}</td>
                    <td style={{ ...S.td, ...S.qualityBadge(app.quality) }}>{app.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* TABLE 4: Top 15 Overall */}
      {activeTab === 'top15' && (
        <>
          <h2 style={S.sectionHead}>
            <span style={S.badge('#aa66ff')}>RANKED</span>
            TOP 15 OVERALL (PUNE + NON-PUNE)
          </h2>
          <div style={S.tableWrap}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>City</th>
                  <th style={S.th}>Building</th>
                  <th style={S.th}>Why Top 15</th>
                  <th style={S.th}>Interview Format</th>
                </tr>
              </thead>
              <tbody>
                {TOP_15.map(entry => (
                  <tr key={entry.rank} style={{ borderLeft: entry.rank <= 3 ? '2px solid #aa66ff' : 'none' }}>
                    <td style={{ ...S.td, ...S.rankNum(entry.rank) }}>{entry.rank}</td>
                    <td style={{ ...S.td, ...S.name }}>{entry.name}</td>
                    <td style={S.td}>{entry.city}</td>
                    <td style={{ ...S.td, ...S.building }}>{entry.building}</td>
                    <td style={{ ...S.td, fontSize: '0.75rem', color: '#ccc', maxWidth: '280px', lineHeight: '1.4' }}>{entry.why}</td>
                    <td style={{ ...S.td, fontSize: '0.75rem', color: entry.format.includes('Remote') ? '#00aaff' : '#00ff88' }}>{entry.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1rem', marginTop: '2rem', fontSize: '0.7rem', color: '#444', textAlign: 'center' }}>
        EPOCH_ EVAL v1.0 // Scores saved to localStorage // {Object.keys(scores).length} candidates tracked
      </div>
    </div>
  );
}
