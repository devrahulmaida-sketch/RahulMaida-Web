import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent as ReactMouseEvent, useCallback } from "react";
import {
  ShieldCheck,
  KeyRound,
  ArrowUpRight,
  ExternalLink,
  Heart,
  BookOpen,
  Target,
  Trophy,
  Zap,
  Ban,
  Lock,
  CheckCircle2,
  Star,
  Crown,
  Globe,
  ChevronDown,
  Users,
} from "lucide-react";

/* ─── Star Field Background ─── */
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── 3D Orbiting Rings ─── */
function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-rotate-slow"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg)" }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-sage-400/40 blur-[2px]" />
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -ml-0.75 rounded-full bg-gold-400/30 blur-[1px]" />
        </div>
        {/* Ring 2 */}
        <div className="absolute inset-12 rounded-full border border-white/[0.02] animate-rotate-reverse"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg) rotateZ(30deg)" }}
        >
          <div className="absolute top-0 right-1/4 w-1.5 h-1.5 rounded-full bg-gold-400/30 blur-[1px]" />
        </div>
        {/* Ring 3 */}
        <div className="absolute inset-24 rounded-full border border-white/[0.015] animate-rotate-slow"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(65deg) rotateZ(-20deg)", animationDuration: "35s" }}
        />
      </div>
    </div>
  );
}

/* ─── 3D Tilt Card Component ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    x.set(rotateY);
    y.set(rotateX);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springY,
        rotateY: springX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-container ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 md:mx-8 mt-4">
        <div className="relative flex items-center justify-between px-6 md:px-8 py-3.5 rounded-2xl glass-card">
          {/* Logo */}
          <div className="flex items-center gap-3 logo-3d">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-lg shadow-sage-900/50">
              <span className="text-white font-black text-lg">R</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight leading-none">
                Rahul<span className="text-gold-400">Maida</span>
              </h1>
              <p className="text-sage-500 text-[9px] tracking-[0.25em] uppercase font-semibold">
                Premium Education Hub
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Platforms", "About"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sage-400 hover:text-white text-sm tracking-wide transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-sage-400 to-gold-400 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* No Ads Badge */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/30">
              <Ban size={10} className="text-red-400" />
              <span className="text-red-400 text-[10px] font-bold tracking-wider">NO ADS</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/30">
              <KeyRound size={10} className="text-emerald-400" />
              <span className="text-emerald-400 text-[10px] font-bold tracking-wider">NO KEY GEN</span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />

      {/* Gradient Orbs */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-sage-900/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-900/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-950/20 blur-[120px]" />
      </motion.div>

      {/* Orbit Rings */}
      <OrbitRings />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-emerald-300 text-xs font-semibold tracking-wider">NO ADS</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card">
            <Lock size={14} className="text-red-400" />
            <span className="text-red-300 text-xs font-semibold tracking-wider">NO KEY GENERATION</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full glass-card">
            <Crown size={14} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-semibold tracking-wider">100% FREE</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-6">
            <span className="block text-white">RAHUL</span>
            <span className="block text-shimmer">MAIDA</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sage-400 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Premium education access.{" "}
          <span className="text-white font-medium">Zero cost. Zero ads. Zero keys.</span>
          <br />
          Just pure knowledge at your fingertips.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-10 text-sage-600 text-xs"
        >
          <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sage-500" /> No Registration</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sage-500" /> No Hidden Fees</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-sage-500" /> No Ads Forever</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#platforms"
            className="group relative px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide overflow-hidden transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sage-600 to-sage-700 group-hover:from-sage-500 group-hover:to-sage-600 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative text-white flex items-center gap-2">
              Explore Platforms
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
          <a
            href="#about"
            className="group px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide border border-white/10 text-sage-300 hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            Learn More
            <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}

/* ─── Platform Card ─── */
function PlatformCard({
  title,
  subtitle,
  description,
  url,
  imageUrl,
  features,
  gradientFrom,
  glowColor,
  badge,
  badgeIcon: BadgeIcon,
  delay,
}: {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  imageUrl: string;
  features: string[];
  gradientFrom: string;
  glowColor: string;
  badge: string;
  badgeIcon: React.ComponentType<{ size?: number; className?: string }>;
  delay: number;
}) {
  return (
    <TiltCard className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay }}
        className="group relative"
      >
        <a href={url} target="_blank" rel="noopener noreferrer" className="block relative">
          {/* Outer Glow */}
          <div
            className={`absolute -inset-2 rounded-3xl ${gradientFrom} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700`}
            style={{ background: glowColor }}
          />

          {/* Card */}
          <div className="relative glass-card-premium rounded-3xl overflow-hidden card-shine gradient-border">
            {/* Top Section - Image & Glow */}
            <div className="relative h-52 md:h-60 overflow-hidden flex items-center justify-center bg-gradient-to-br from-sage-950/80 to-zen-950/80">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid opacity-50" />
              <div className={`absolute inset-0 ${gradientFrom} opacity-20`} />

              {/* Logo Image */}
              <motion.img
                src={imageUrl}
                alt={title}
                className="relative z-10 max-h-36 md:max-h-40 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
              />

              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <BadgeIcon size={12} className="text-gold-400" />
                <span className="text-gold-300 text-[10px] font-bold tracking-wider uppercase">{badge}</span>
              </div>

              {/* No Ads / No Key Badge */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-700/30">
                  <Ban size={9} className="text-emerald-400" />
                  <span className="text-emerald-300 text-[9px] font-bold tracking-wider">NO ADS</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/60 backdrop-blur-md border border-red-700/30">
                  <KeyRound size={9} className="text-red-400" />
                  <span className="text-red-300 text-[9px] font-bold tracking-wider">NO KEY GEN</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">{title}</h3>
              <p className="text-sage-400 text-sm font-medium mb-4 tracking-wide">{subtitle}</p>

              {/* Description */}
              <p className="text-sage-500 text-sm leading-relaxed mb-6">{description}</p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-sage-800/50 flex items-center justify-center flex-shrink-0 border border-sage-700/30">
                      <CheckCircle2 size={11} className="text-emerald-400" />
                    </div>
                    <span className="text-sage-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-white font-semibold text-sm tracking-wide group-hover:text-gold-300 transition-colors duration-300">
                  Visit Platform →
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors duration-300"
                >
                  <ExternalLink size={16} className="text-sage-400 group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </TiltCard>
  );
}

/* ─── Platforms Section ─── */
function PlatformsSection() {
  return (
    <section id="platforms" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#0a0a0f]">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sage-900/10 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Globe size={14} className="text-gold-400" />
            <span className="text-sage-300 text-xs tracking-wider uppercase font-semibold">
              Our Platforms
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Choose Your{" "}
            <span className="text-shimmer">Path</span>
          </h2>
          <p className="text-sage-500 text-lg max-w-xl mx-auto">
            Two curated platforms. One mission — free premium education for everyone.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Free Study - PW */}
          <PlatformCard
            title="PW Free Study"
            subtitle="Physics Wallah — Completely Free"
            description="Access all Physics Wallah courses at zero cost. Video lectures, study materials, practice resources — everything you need to excel without spending a single rupee."
            url="https://rahul-maida-free-study.pages.dev/"
            imageUrl="https://i.ibb.co/MDsSK9LY/unnamed.png"
            features={[
              "All PW courses available free",
              "Video lectures & study material",
              "Practice questions & mock tests",
              "No ads · No key generation · No fees",
            ]}
            gradientFrom="bg-gradient-to-br from-sage-800/30 to-sage-900/30"
            glowColor="radial-gradient(circle, rgba(86,112,86,0.15) 0%, transparent 70%)"
            badge="100% Free"
            badgeIcon={Zap}
            delay={0}
          />

          {/* All-in-One */}
          <PlatformCard
            title="3-in-1 Education Hub"
            subtitle="PW + NextToper + Mission Jeet"
            description="Your ultimate destination combining three powerful platforms. Get PW content, NextToper resources, and Mission Jeet preparation — all unified in one place."
            url="https://rahul-maida.pages.dev/"
            imageUrl="https://i.ibb.co/BKd4DDNH/3in-one-education.jpg"
            features={[
              "PW + NextToper + Mission Jeet",
              "Multi-platform access unified",
              "Comprehensive exam preparation",
              "No ads · No key generation · No fees",
            ]}
            gradientFrom="bg-gradient-to-br from-gold-800/20 to-sage-900/30"
            glowColor="radial-gradient(circle, rgba(212,155,20,0.12) 0%, transparent 70%)"
            badge="Premium Access"
            badgeIcon={Crown}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Trust / Stats Section ─── */
function TrustSection() {
  const stats = [
    { label: "Platforms", value: "2", icon: Globe, color: "text-sage-400" },
    { label: "Course Sources", value: "3+", icon: BookOpen, color: "text-gold-400" },
    { label: "Total Cost", value: "₹0", icon: Heart, color: "text-red-400" },
    { label: "Students", value: "∞", icon: Users, color: "text-blue-400" },
  ];

  const promises = [
    { icon: Ban, label: "No Ads", desc: "Zero advertisements, ever", color: "from-red-500/20 to-red-900/20 border-red-800/20" },
    { icon: KeyRound, label: "No Key Generation", desc: "No fake key generators or scams", color: "from-emerald-500/20 to-emerald-900/20 border-emerald-800/20" },
    { icon: ShieldCheck, label: "Safe & Secure", desc: "100% safe links, no malware", color: "from-blue-500/20 to-blue-900/20 border-blue-800/20" },
    { icon: Crown, label: "Premium Quality", desc: "Premium education, free of cost", color: "from-gold-500/20 to-gold-900/20 border-gold-800/20" },
  ];

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-2xl glass-card hover:border-white/10 transition-colors duration-300"
            >
              <stat.icon size={22} className={`${stat.color} mx-auto mb-3`} />
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sage-600 text-[10px] tracking-[0.2em] uppercase font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Promises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Our Promise</h3>
          <p className="text-sage-500 text-sm">What you will <span className="text-red-400 font-semibold">never</span> see on our platforms</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promises.map((promise, i) => (
            <motion.div
              key={promise.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-5 rounded-2xl bg-gradient-to-br ${promise.color} border text-center hover:scale-105 transition-transform duration-300`}
            >
              <promise.icon size={22} className="text-white mx-auto mb-3" />
              <h4 className="text-white font-bold text-sm mb-1">{promise.label}</h4>
              <p className="text-sage-400 text-[11px] leading-relaxed">{promise.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#0a0a0f] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sage-900/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold-900/8 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Heart size={14} className="text-red-400" />
            <span className="text-sage-300 text-xs tracking-wider uppercase font-semibold">About</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Why <span className="text-shimmer">RahulMaida</span>?
          </h2>

          <div className="text-sage-400 text-lg leading-relaxed space-y-4 max-w-2xl mx-auto mb-14">
            <p>
              Education should never be a privilege.{" "}
              <span className="text-white font-semibold">RahulMaida</span> was born from the belief that
              every student deserves access to quality learning — regardless of their financial background.
            </p>
            <p>
              We provide <span className="text-emerald-400 font-semibold">ad-free</span> and{" "}
              <span className="text-red-400 font-semibold">key-generator-free</span> access to India's top
              education platforms including <span className="text-gold-400 font-semibold">Physics Wallah</span>,{" "}
              <span className="text-gold-400 font-semibold">NextToper</span>, and{" "}
              <span className="text-gold-400 font-semibold">Mission Jeet</span>.
            </p>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "No Ads · No Keys",
                desc: "Zero advertisements, no key generators, no scams. Just clean, safe access to education.",
                color: "text-emerald-400",
              },
              {
                icon: Star,
                title: "Premium Quality",
                desc: "Only the best platforms and courses make it to our curated list. Quality over quantity.",
                color: "text-gold-400",
              },
              {
                icon: Heart,
                title: "Student First",
                desc: "Built by a student, for students. Every decision is made with you in mind — always free.",
                color: "text-red-400",
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="p-6 rounded-2xl glass-card hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <value.icon size={28} className={`${value.color} mx-auto mb-4`} />
                <h3 className="text-white font-bold mb-2">{value.title}</h3>
                <p className="text-sage-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 bg-[#0a0a0f] overflow-hidden">
      {/* Orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.02] animate-rotate-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.015] animate-rotate-reverse pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sage-600 via-sage-700 to-gold-700 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sage-900/50 animate-pulse-glow"
          >
            <Trophy size={42} className="text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Start Learning <span className="text-shimmer">Today</span>
          </h2>
          <p className="text-sage-400 text-lg mb-4 max-w-lg mx-auto">
            Don't wait. Your future starts now. Pick a platform and begin your journey towards excellence.
          </p>
          <p className="text-sage-600 text-sm mb-10 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1"><Ban size={12} /> No Ads</span>
            <span>·</span>
            <span className="flex items-center gap-1"><KeyRound size={12} /> No Key Gen</span>
            <span>·</span>
            <span className="flex items-center gap-1"><ShieldCheck size={12} /> 100% Safe</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://rahul-maida-free-study.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-2xl font-bold tracking-wide overflow-hidden transition-all duration-500 w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sage-600 to-sage-700 group-hover:from-sage-500 group-hover:to-sage-600 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative text-white flex items-center justify-center gap-2">
                <BookOpen size={18} />
                PW Free Study
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
            <a
              href="https://rahul-maida.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-2xl font-bold tracking-wide overflow-hidden transition-all duration-500 w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-700 to-sage-700 group-hover:from-gold-600 group-hover:to-sage-600 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative text-white flex items-center justify-center gap-2">
                <Target size={18} />
                3-in-1 Education Hub
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative py-10 px-6 md:px-12 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage-600 to-sage-800 flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="text-white font-bold tracking-tight">
              Rahul<span className="text-gold-400">Maida</span>
            </span>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <Ban size={12} /> No Ads
            </span>
            <span className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
              <KeyRound size={12} /> No Key Gen
            </span>
            <span className="flex items-center gap-1.5 text-gold-400 text-xs font-semibold">
              <ShieldCheck size={12} /> 100% Safe
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://rahul-maida-free-study.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-500 hover:text-white text-sm transition-colors"
            >
              Free Study
            </a>
            <a
              href="https://rahul-maida.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-500 hover:text-white text-sm transition-colors"
            >
              3-in-1 Hub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sage-700 text-xs flex items-center gap-1">
            <Heart size={10} className="text-red-500/50" /> {new Date().getFullYear()} RahulMaida
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <StarField />
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <TrustSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}