import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap,
  Wheat,
  HeartPulse,
  Briefcase,
  Users,
  Home,
  Store,
  Clock,
  Wrench,
  Bot,
  Layers,
  FileCheck,
  Building2,
  Lock,
  Compass,
  ChevronRight
} from 'lucide-react';
import { Language, SchemeCategory, Scheme, RuleEvaluationResult } from '../types';
import { getLocalizedCategory } from '../data/multilingualGlossary';
import { SCHEME_TRANSLATIONS } from '../services/schemeLocalization';

interface LandingHeroProps {
  language: Language;
  popularSchemes: Scheme[];
  evaluations: Record<string, RuleEvaluationResult>;
  savedIds: string[];
  onCheckEligibility: (scheme?: Scheme) => void;
  onSearchSchemes: (query?: string) => void;
  onAskAi: (initialQuery?: string) => void;
  onSelectCategory: (cat: SchemeCategory) => void;
  onViewScheme: (scheme: Scheme) => void;
  onToggleSave: (scheme: Scheme) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  popularSchemes,
  onCheckEligibility,
  onSearchSchemes,
  onAskAi,
  onSelectCategory,
  onViewScheme,
}) => {
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const suggestions = [
    { label: 'Student scholarships', query: 'I am a student looking for higher education scholarships' },
    { label: 'Family healthcare', query: 'My family needs free healthcare and hospital treatment support' },
    { label: 'Farmer subsidies', query: 'I am a farmer looking for PM-KISAN and crop insurance' },
    { label: 'Small business loan', query: 'I want to start a small business and need Mudra loan' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      onSearchSchemes(heroSearchQuery.trim());
    } else {
      onSearchSchemes();
    }
  };

  const editorialCategories: { label: SchemeCategory; icon: any; summary: string }[] = [
    { label: 'Education', icon: GraduationCap, summary: 'Scholarships, fee waivers, laptop distribution & fellowship aid' },
    { label: 'Agriculture', icon: Wheat, summary: 'Direct income support, crop insurance, seed subsidies & solar pumps' },
    { label: 'Healthcare', icon: HeartPulse, summary: 'Cashless hospital coverage up to ₹5 Lakh/yr & generic medicines' },
    { label: 'Employment', icon: Briefcase, summary: 'Apprenticeships, rural employment guarantees & job fairs' },
    { label: 'Housing', icon: Home, summary: 'Subsidies for pucca homes, interest subvention & rural dwelling grants' },
    { label: 'Women', icon: Users, summary: 'Maternity assistance, self-help group credit & girl child education' },
    { label: 'Students', icon: GraduationCap, summary: 'Pre/post matric aid, hostel allowances & competitive exam coaching' },
    { label: 'Business', icon: Store, summary: 'Mudra collateral-free loans, PMEGP subsidies & startup capital' },
    { label: 'Senior Citizens', icon: Clock, summary: 'National old-age pension, assisted living devices & healthcare' },
  ];

  return (
    <div className="w-full bg-[#08110D] text-stone-100 overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Dark Forest / National Network Visual System)            */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#08110D] via-[#0C1511] to-[#0A130E] border-b border-emerald-950/60">
        
        {/* Subtle India Geographic / Network Visual Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#155C45" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#1E7658" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#D88932" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Ambient India Lat-Long grid */}
            <line x1="150" y1="0" x2="150" y2="800" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
            <line x1="450" y1="0" x2="450" y2="800" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
            <line x1="750" y1="0" x2="750" y2="800" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
            <line x1="1050" y1="0" x2="1050" y2="800" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
            <line x1="0" y1="200" x2="1200" y2="200" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
            <line x1="0" y1="400" x2="1200" y2="400" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
            <line x1="0" y1="600" x2="1200" y2="600" stroke="#155C45" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />

            {/* National service node interconnects */}
            <path d="M 300 280 Q 550 180 750 320 T 950 480" stroke="url(#netGrad)" strokeWidth="1.5" />
            <path d="M 250 420 Q 500 520 700 400 T 1000 350" stroke="url(#netGrad)" strokeWidth="1" />
            
            {/* Key nodes (Delhi, Mumbai, Hyderabad, Bengaluru, Kolkata, Chennai) */}
            <circle cx="550" cy="220" r="4" fill="#D88932" />
            <circle cx="550" cy="220" r="12" stroke="#D88932" strokeWidth="0.5" opacity="0.5" />
            <circle cx="380" cy="420" r="3.5" fill="#2C8C6B" />
            <circle cx="480" cy="500" r="3.5" fill="#2C8C6B" />
            <circle cx="520" cy="560" r="3.5" fill="#2C8C6B" />
            <circle cx="820" cy="380" r="3.5" fill="#2C8C6B" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto w-full text-center z-10">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-8 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>India&apos;s Government Benefits Intelligence Platform</span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stone-100 leading-[1.03] mb-6">
            Find the schemes <br />
            <span className="italic font-light text-emerald-300/95">meant for you.</span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-light leading-relaxed mb-10">
            Discover government schemes, understand your eligibility, and connect directly to verified official sources across 28 states and central ministries.
          </p>

          {/* Smart Integrated Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative flex items-center bg-[#0C1511]/90 backdrop-blur-md rounded-2xl border border-emerald-900/60 p-2 shadow-2xl transition-all group-focus-within:border-emerald-600/80 group-focus-within:ring-2 group-focus-within:ring-emerald-800/20">
                <Search className="w-5 h-5 text-stone-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={heroSearchQuery}
                  onChange={(e) => setHeroSearchQuery(e.target.value)}
                  placeholder="What are you looking for? e.g. scholarship, farmer aid, healthcare..."
                  className="w-full px-3.5 py-2.5 bg-transparent text-sm sm:text-base text-stone-100 placeholder-stone-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white font-medium text-xs sm:text-sm shrink-0 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Suggestions as intuitive prompts */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-3 text-xs text-stone-400">
              <span className="text-stone-400 font-mono text-[11px]">Suggestions:</span>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setHeroSearchQuery(s.query);
                    onSearchSchemes(s.query);
                  }}
                  className="px-2.5 py-1 rounded-md bg-emerald-950/40 hover:bg-emerald-900/50 text-stone-300 hover:text-white border border-emerald-900/40 transition cursor-pointer text-xs"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary & Secondary Action Pair */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onAskAi()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#155C45] to-[#1E7658] hover:from-[#1A6C52] hover:to-[#248866] text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-950/60 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Ask SchemeSense AI</span>
            </button>

            <button
              onClick={() => onSearchSchemes()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0C1511] hover:bg-[#101c17] text-stone-200 hover:text-white border border-emerald-900/50 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore Schemes</span>
            </button>
          </div>

          {/* Trust Guarantee Note */}
          <div className="flex items-center justify-center gap-6 mt-12 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Aadhaar Required</span>
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Official Government Gazettes</span>
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>100% Free &amp; Private</span>
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM (Editorial High-Contrast Off-White Section)                */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F2EB] text-[#0C1511] border-b border-[#DFDACD]">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-3">
                The Core Challenge
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#08110D]">
                Government support is everywhere. <br />
                <span className="italic text-[#155C45]">Finding the right support shouldn&apos;t be.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#545B56] text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Every year, central and state governments allocate over <strong className="text-[#0C1511]">₹4.5 Lakh Crore</strong> in public welfare benefits across thousands of separate programs. Yet, over 70% of eligible citizens never receive what they are legally entitled to.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#DFDACD]">
                <div>
                  <div className="font-editorial text-3xl font-bold text-[#08110D] mb-1">3,000+</div>
                  <p className="text-xs text-[#6C746E]">
                    Dispersed schemes scattered across 50+ central ministries and 36 states and union territories.
                  </p>
                </div>
                <div>
                  <div className="font-editorial text-3xl font-bold text-[#D88932] mb-1">Complex Rules</div>
                  <p className="text-xs text-[#6C746E]">
                    Buried inside dense bureaucratic gazettes, confusing income brackets, and obsolete portal links.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE SOLUTION (Conceptual Architecture in Deep Forest)                  */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C1511] text-stone-100 border-b border-emerald-950/80">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">
              The Architecture
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl tracking-tight text-stone-100 mb-6">
              One intelligent layer <br />
              <span className="italic text-emerald-300/90 font-light">between citizens and public services.</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              SchemeSense AI transforms dense government rules into human clarity. We do not replace official portals — we guide you directly to them.
            </p>
          </div>

          {/* Solution Diagram: 3 Editorial Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            <div className="p-8 rounded-2xl bg-[#08110D] border border-emerald-950/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center font-bold text-sm mb-6">
                01
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">Natural Citizen Query</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Describe your reality in your mother tongue: &ldquo;I am a girl student from Warangal&rdquo; or &ldquo;I am a small farmer with 2 acres.&rdquo; Zero administrative jargon needed.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#08110D] border border-emerald-800/50 shadow-lg shadow-emerald-950/40 relative">
              <div className="w-10 h-10 rounded-xl bg-[#155C45] text-white flex items-center justify-center font-bold text-sm mb-6">
                02
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">SchemeSense Core Engine</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Matches multi-state gazettes, verifies reservation limits, checks age thresholds, and provides a plain-language eligibility breakdown in seconds.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#08110D] border border-emerald-950/80 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-amber-400 flex items-center justify-center font-bold text-sm mb-6">
                03
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2">Direct Official Application</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Get a clean document checklist and an authentic, direct gateway to the official central or state nodal portal (e.g. NSP, ePASS, PM-KISAN, PM-JAY).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS (Large Typography Numbers 01, 02, 03, 04)                 */}
      {/* ========================================================================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0C1511] border-b border-[#DFDACD]">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-20">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-2">
              Step-by-Step Experience
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#08110D] tracking-tight">
              How SchemeSense Works.
            </h2>
          </div>

          <div className="space-y-16">
            
            {/* Step 01 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline pb-12 border-b border-[#DFDACD]">
              <div className="md:col-span-3 font-editorial text-6xl sm:text-7xl font-bold text-[#155C45]">
                01
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-[#08110D] tracking-tight">
                  Tell us what you need.
                </h3>
              </div>
              <div className="md:col-span-5 text-[#545B56] text-sm sm:text-base leading-relaxed">
                Enter your profile or inquiry in plain language. Type or speak in any of 13 Indian languages without worrying about technical department terminology.
              </div>
            </div>

            {/* Step 02 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline pb-12 border-b border-[#DFDACD]">
              <div className="md:col-span-3 font-editorial text-6xl sm:text-7xl font-bold text-[#155C45]">
                02
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-[#08110D] tracking-tight">
                  Discover relevant schemes.
                </h3>
              </div>
              <div className="md:col-span-5 text-[#545B56] text-sm sm:text-base leading-relaxed">
                Our rule engine filters hundreds of public schemes across national and state databases to isolate only programs that fit your exact domicile and circumstances.
              </div>
            </div>

            {/* Step 03 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline pb-12 border-b border-[#DFDACD]">
              <div className="md:col-span-3 font-editorial text-6xl sm:text-7xl font-bold text-[#155C45]">
                03
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-[#08110D] tracking-tight">
                  Understand your eligibility.
                </h3>
              </div>
              <div className="md:col-span-5 text-[#545B56] text-sm sm:text-base leading-relaxed">
                View why you qualify, estimated monetary or service benefits, and which documents (income certificates, caste records, ration cards) you need to gather.
              </div>
            </div>

            {/* Step 04 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
              <div className="md:col-span-3 font-editorial text-6xl sm:text-7xl font-bold text-[#D88932]">
                04
              </div>
              <div className="md:col-span-4">
                <h3 className="text-2xl font-bold text-[#08110D] tracking-tight">
                  Apply through official sources.
                </h3>
              </div>
              <div className="md:col-span-5 text-[#545B56] text-sm sm:text-base leading-relaxed">
                Follow step-by-step application instructions and launch directly into the verified government submission portal. We never charge fees or ask for OTPs.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AI DISCOVERY (Realistic SchemeSense Interaction Simulation)             */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#08110D] text-stone-100 border-b border-emerald-950/80">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              Intelligence in Action
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-stone-100 tracking-tight">
              See SchemeSense AI in motion.
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-3">
              Structured government intelligence generated from natural citizen inquiries.
            </p>
          </div>

          {/* Interactive Mock Interface */}
          <div className="rounded-2xl bg-[#0C1511] border border-emerald-900/60 p-6 sm:p-8 shadow-2xl">
            
            {/* User Query Block */}
            <div className="flex items-start gap-4 pb-6 border-b border-emerald-950/80">
              <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-200 flex items-center justify-center font-bold text-xs shrink-0">
                You
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider block mb-1">Citizen Inquiry</span>
                <p className="text-sm sm:text-base text-stone-100 font-medium">
                  &ldquo;I&apos;m a college student from Telangana studying engineering. My family annual income is ₹1.8 Lakh. What financial assistance can I get for tuition and hostel?&rdquo;
                </p>
              </div>
            </div>

            {/* SchemeSense Response Block */}
            <div className="pt-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Bot className="w-4 h-4" />
                  <span>SchemeSense AI • 3 Verified Matches Identified</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                  Domicile: Telangana
                </span>
              </div>

              {/* Match Card 1 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#08110D] border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                      Likely Eligible
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Central + State Shared</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-100">
                    Telangana ePASS Post-Matric Tuition Fee Reimbursement (RTF)
                  </h4>
                  <p className="text-xs text-stone-400">
                    <strong>Benefit:</strong> 100% tuition reimbursement directly credited to college account + Maintenance Fees (MTF).
                  </p>
                </div>
                <button
                  onClick={() => onAskAi('Telangana ePASS Post-Matric Scholarship')}
                  className="px-4 py-2 rounded-lg bg-[#155C45] hover:bg-[#1E7658] text-white text-xs font-semibold shrink-0 cursor-pointer transition"
                >
                  View Details
                </button>
              </div>

              {/* Match Card 2 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#08110D] border border-emerald-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800/40">
                      Central Scheme
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Ministry of Social Justice</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-100">
                    National Scholarship Portal (NSP) - Top Class Education Scheme
                  </h4>
                  <p className="text-xs text-stone-400">
                    <strong>Benefit:</strong> Full tuition + ₹3,000/month living stipend + ₹45,000 computer grant.
                  </p>
                </div>
                <button
                  onClick={() => onAskAi('National Scholarship Portal')}
                  className="px-4 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900/60 text-stone-200 text-xs font-semibold shrink-0 border border-emerald-800/40 cursor-pointer transition"
                >
                  View Details
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CATEGORIES (Visual Editorial Category Navigation)                      */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F2EB] text-[#0C1511] border-b border-[#DFDACD]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-2">
                Browse By Domain
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#08110D] tracking-tight">
                Government Welfare Sectors.
              </h2>
            </div>
            <button
              onClick={() => onSearchSchemes()}
              className="text-xs font-bold text-[#155C45] hover:text-[#0C1511] flex items-center gap-1 cursor-pointer transition"
            >
              <span>View All Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialCategories.map((cat) => {
              const Icon = cat.icon;
              const loc = getLocalizedCategory(cat.label, language);
              return (
                <div
                  key={cat.label}
                  onClick={() => onSelectCategory(cat.label)}
                  className="p-7 rounded-2xl bg-white border border-[#DFDACD] hover:border-[#155C45] transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#EBE7DD] flex items-center justify-center text-[#155C45] group-hover:bg-[#155C45] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#155C45] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-[#08110D] mb-1.5 group-hover:text-[#155C45] transition-colors">
                    {loc.name || cat.label}
                  </h3>
                  <p className="text-xs text-[#6C746E] leading-relaxed">
                    {loc.description || cat.summary}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRUST & OFFICIAL INTEGRATION                                            */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0C1511] text-stone-100 border-b border-emerald-950/80">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              Grounded in Government Truth
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-stone-100 tracking-tight">
              Verified government sources.
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-3">
              Every scheme on SchemeSense is verified against official departmental gazettes, nodal ministries, and .gov.in domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#08110D] border border-emerald-950/80">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-bold text-stone-100 mb-1">Direct Nodal Links</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Applications redirect exclusively to official state (.gov.in / .nic.in) portals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#08110D] border border-emerald-950/80">
              <Lock className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-bold text-stone-100 mb-1">Zero Aadhaar Storage</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                We calculate eligibility purely from self-declared facts. No biometric or Aadhaar data is ever requested.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#08110D] border border-emerald-950/80">
              <Building2 className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-bold text-stone-100 mb-1">All 28 States &amp; 8 UTs</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Comprehensive directory linking state departments (MahaDBT, ePASS, Dharani, Seva Sindhu).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#08110D] border border-emerald-950/80">
              <FileCheck className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-bold text-stone-100 mb-1">Audited Rules</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Eligibility logic is open, explainable, and cross-referenced with recent administrative guidelines.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CALL TO ACTION (Clean Editorial Closure)                         */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0C1511] to-[#08110D] text-center">
        <div className="max-w-3xl mx-auto">
          
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-100 tracking-tight leading-tight mb-6">
            Your benefits are already out there. <br />
            <span className="italic text-emerald-300 font-light">Let&apos;s find the ones meant for you.</span>
          </h2>
          
          <p className="text-stone-300 text-sm sm:text-base font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Take our 2-minute eligibility check or ask our AI assistant in your preferred language.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onCheckEligibility()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white font-semibold text-sm transition cursor-pointer shadow-md"
            >
              Check 5-Step Eligibility
            </button>
            <button
              onClick={() => onAskAi()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0C1511] hover:bg-[#12211B] text-stone-200 border border-emerald-900/60 font-semibold text-sm transition cursor-pointer"
            >
              Ask SchemeSense AI
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
