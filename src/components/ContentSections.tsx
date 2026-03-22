import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState, useRef, useEffect } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import ishikaImg from "../assets/images/ishika.jpeg";
import prishaImg from "../assets/images/prisha.jpeg";



function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  { name: "Workplace Wellbeing", desc: "Resilience programs for organisations navigating change and pressure" },
  { name: "Clinical Support", desc: "Evidence-based therapy for individuals and groups" },
  { name: "Academic Programs", desc: "Integrating mental health literacy into educational curricula" },
  { name: "Student Resilience", desc: "Building coping skills in young minds before crises emerge" },
  { name: "Mindutsav", desc: "India's pioneering mental wellness festival celebrating inner exploration" },
  { name: "Community Outreach", desc: "Taking mental health awareness beyond urban centres" },
  { name: "Training & Certification", desc: "Building a network of skilled mental health practitioners" },
];

const pillars = [
  { icon: "◈", title: "Mindfulness", desc: "Learning to observe the mind's currents without being swept away" },
  { icon: "◈", title: "Emotional Intelligence", desc: "Naming, understanding, and navigating the full spectrum of feelings" },
  { icon: "◈", title: "Sustainable Practices", desc: "Building rituals that nourish well-being over a lifetime" },
];

const stats = [
  { number: "500+", label: "Lives Reached" },
  { number: "800+", label: "Lives Touched" },
  { number: "7", label: "Programs" },
  { number: "12+", label: "Years of Practice" },
  { number: "50+", label: "Partner Organisations" },
];

  const links = [
    { label: "About", href: "#noise" },
    { label: "Our Work", href: "#awareness" },
    { label: "Approach", href: "#understanding" },
    { label: "Impact", href: "#clarity" },
    { label: "Contact", href: "#contact" },
  ];


const cards = [
  {
    title: "“I came thinking it’ll be just another workshop… it wasn’t.It helped me notice things about myself I usually ignore.”",
    desc: "Anonymous",
  },
  {
    title: "“It felt comfortable… not like a typical session.I actually took something practical back with me.”",
    desc: "Anonymous",
  },
  {
    title: "“I didn’t expect to open up this much in a group.The activities made things easier to understand, not heavy.”",
    desc: "Anonymous",
  },
];

export default function ContentSections() {

  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_0nh9sb9",
        "template_nd31dfw",
        formRef.current,
        "bTGgPE2HQRbSTu1Ww" // 🔴 PUT YOUR PUBLIC KEY HERE
      )
      .then(
        () => {
          alert("Message sent successfully!");
          formRef.current?.reset();
        },
        (error) => {
          alert("Failed to send message");
          console.error(error);
        }
      );
  };

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = width < 768;
  const visibleCards = isMobile ? 1 : 2;
  const cardWidth = width / visibleCards;

  const next = () => {
    if (index < cards.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const [selectedFounder, setSelectedFounder] = useState<any>(null);



  return (
    <div>
      {/* THE NOISE -About */}
      <section id="noise" className="leher-section max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-12">
        <FadeInSection>
          {/* <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body mb-4 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-primary/30 flex items-center justify-center text-[8px] text-primary">◎</span>
            The Noise
          </p> */}
          <h2 className="leher-heading text-3xl md:text-4xl text-foreground mb-6">
            A space to understand your mind - beyond the surface.
          </h2>

          <p className="leher-body text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            Not everything that weighs on you is visible, and not everything invisible is harmless.
            <span className="text-foreground font-medium"> Leher, </span>meaning <span className="text-foreground font-medium"> wave</span> comes from a simple understanding: emotions don’t stay still. They move, rise, fall, and return.
            But when they are ignored, suppressed, or never expressed, they don’t disappear -
            they accumulate beneath the surface.
          </p>

          <p className="leher-body text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            Over time, this creates an internal build-up that quietly begins to influence how we think,
            respond, and function. What feels unseen often shapes us the most, subtly guiding our reactions,
            decisions, and sense of self.
          </p>

          <p className="leher-body text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
            <span className="text-foreground font-medium">Leher Inner Space</span> was created to acknowledge
            these inner movements - not as disruptions, but as signals worth understanding. A space where
            emotional experiences are not judged or rushed away, but explored with depth, clarity, and respect.
          </p>
        </FadeInSection>


        {/* FOUNDERS / CEO */}
        <div>

          <FadeInSection>

            <h2 className="leher-heading text-3xl md:text-4xl text-foreground mb-6">
              The Minds Behind Leher.
            </h2>

            <p className="leher-body text-muted-foreground text-base md:text-lg mb-12 max-w-5xl">
              Leher is shaped by individuals who believe emotional awareness is essential. Their work is grounded in empathy, lived experience, and a deep commitment
              to inner transformation.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-10">
            <FadeInSection>
              <div
                className="text-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:-translate-y-1"
                onClick={() =>
                  setSelectedFounder({
                    name: "Ishika Ranawat",
                    role: "Founder",
                    img: ishikaImg,
                    bio: "Most people don’t struggle loudly, they struggle quietly while still showing up every day. Leher Inner Space didn’t begin as an idea, but as an observation I couldn’t ignore. I kept noticing what goes unseen; the overthinking that doesn’t switch off, emotional exhaustion without a clear reason, and a sense of disconnection even when everything seems fine. These quieter struggles rarely have space to exist. Eventually, I realised that what we don’t express doesn’t disappear; it quietly shapes us. Leher creates a space where emotions can be felt, understood, and gently explored, just as they are.",
                    linkedin: "https://www.linkedin.com/in/ishika-ranawat-5a04661bb"
                  })
                }
              >        <img
                  src={ishikaImg}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 cursor-pointer hover:scale-105 transition"
                />
                <h3 className="text-foreground font-semibold text-lg">Ishika Ranawat</h3>
                <p className="text-primary text-sm mb-2">Founder</p>
                <p className="text-muted-foreground text-sm">
                  "I don’t believe people need to be fixed.
                  But I do believe that when we begin to understand ourselves,
                  something shifts -in ways that truly matter."
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div
                className="text-center cursor-pointer p-6 rounded-2xl transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:-translate-y-1"
                onClick={() =>
                  setSelectedFounder({
                    name: "Prisha Thakkar",
                    role: "Managing Director",
                    img: prishaImg,
                    bio: "Over the past year and a half, I’ve worked closely with children and caregivers, and noticed that what appears on the surface is rarely the full story; behind behaviours or “difficult” emotions often lie confusion, unmet needs, or a child trying to cope with limited tools. I’ve realised how easily these struggles are overlooked, especially when they don’t fit clear labels. Sometimes, feeling seen without judgment can create meaningful shifts. Through Leher, I aim to build a youth-friendly space where emotions are understood, supporting healthier coping, emotional well-being, and more grounded development.",
                    linkedin: "https://www.linkedin.com/in/prisha-thakkar-b32864211"
                  })
                }
              >
                <img
                  src={prishaImg}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 cursor-pointer hover:scale-105 transition"
                />
                <h3 className="text-foreground font-semibold text-lg">Prisha Thakkar</h3>
                <p className="text-primary text-sm mb-2">Managing Director</p>
                <p className="text-muted-foreground text-sm">
                  "I believe that early identification and timely emotional support can play a significant role in promoting healthier coping, improved well-being, and overall development."
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>



      </section>


      {/* AWARENESS -Our Work */}
      <section id="awareness" className="leher-section max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-12">
        <FadeInSection>
          <h2 className="leher-heading text-3xl md:text-4xl text-foreground mb-4">
            Who We Work With.
          </h2>
          <p className="leher-body text-muted-foreground text-base md:text-lg mb-2 max-w-5xl">
            Our work spans workplaces, clinics, campuses, and communities - focused on creating spaces for clarity, emotional balance, and deeper understanding.
          </p>
        </FadeInSection>

        <div className="space-y-0">
          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                Organizations & Workplaces
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                Performance is often impacted by unseen internal strain. We support clearer thinking, emotional balance, and sustainable productivity.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                Schools & Educational Spaces
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                Learning environments need space for emotional processing. We help build awareness, understanding, and well-being that supports learning.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                Hospitals & Healthcare Settings
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                Care-giving demands constant emotional and cognitive presence. We support mental clarity, emotional balance, and spaces for reflection.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                Coaching Institutes
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                High-pressure academic environments can impact focus and confidence. We help students build stability, clarity, and healthier relationships with performance.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                1:1 Sessions
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                A confidential, non-judgmental space to explore emotions, patterns, and inner conflicts -focused on deeper understanding, not quick fixes.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="py-2 border-b border-border/60 group">
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-1">
                Psychology-Based Courses & Programs
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                Move beyond theory into real psychological thinking. Develop observation, emotional depth, and a grounded approach to working with people.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* UNDERSTANDING -Approach */}
      <section
        id="understanding" className="leher-section max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-12">
        {/* Heading */}
        <FadeInSection>
          <h2 className="leher-heading text-3xl md:text-4xl text-foreground text-center mb-4">
            What We Do
          </h2>

          <p className="leher-body text-muted-foreground text-base md:text-lg text-center max-w-3xl mx-auto mb-10">
            Leher Inner Space creates structured, psychologically informed experiences
            that support awareness, emotional regulation, and mental clarity.
          </p>
        </FadeInSection>

        {/* Cards */}
        <FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">

            {/* Card 1 */}
            <div className="bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                  💡
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Experiential
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Not just informational
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                  🧠
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Reflective
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Not surface-level
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
                  ⚛️
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Scientifically grounded
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Yet deeply human
              </p>
            </div>

          </div>
        </FadeInSection>

        {/* Bottom Statement */}
        <FadeInSection>
          <p className="leher-body text-center text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We do not aim to ‘fix’ individuals. We create the conditions where
            they can understand themselves better -and from that, function better.
          </p>
        </FadeInSection>
      </section>

      {/* CLARITY -Impact */}
      <section id="clarity" className="leher-section max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-12">
        <FadeInSection>
          <h2 className="leher-heading text-3xl md:text-4xl text-foreground mb-4 text-center">
            Small waves. Deep impact.
          </h2>
        </FadeInSection>

        <div ref={containerRef} className="relative mt-10 overflow-hidden">
          {/* Track */}
          <motion.div
            className="flex"
            animate={{ x: -index * cardWidth }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                style={{ width: cardWidth }}
                className="flex-shrink-0 px-3" // spacing instead of gap
              >
                <div className="bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    - {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Arrows */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={prev}
              className="px-4 py-2 border rounded-full hover:bg-muted transition disabled:opacity-30"
              disabled={index === 0}
            >
              ←
            </button>
            <button
              onClick={next}
              className="px-4 py-2 border rounded-full hover:bg-muted transition disabled:opacity-30"
              disabled={index >= cards.length - visibleCards}
            >
              →
            </button>
          </div>
        </div>
      </section>



      {/* CONTACT */}
      <section id="contact" className="leher-section max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-12">
        <FadeInSection>
          <h2 className="leher-heading text-3xl md:text-4xl text-foreground mb-4 text-center">
            Reach Out.
          </h2>
          <p className="leher-body text-muted-foreground text-center mb-4">
            Whether you're seeking support or exploring collaboration, we'd love to hear from you.
          </p>

          <form ref={formRef} className="space-y-5 max-w-xl mx-auto bg-white/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm h-full" onSubmit={sendEmail}>
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground block mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground block mb-1.5">Contact Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your contact number"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground block mb-1.5">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="What's on your mind?"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-body text-sm resize-none"
              />
            </div>

            <button type="submit" className="leher-btn-primary w-full">
              Submit
            </button>
          </form>
        </FadeInSection>
      </section>


      {/* FOOTER */}
      <footer className="py-12 px-6 text-center border-t border-border/50 bg-primary text-white">
        <p className="font-display text-lg italic mb-1">Leher Inner Space</p>
        <p className="font-body text-xs text-white/80 mb-6">
          Mental & Emotional Wellbeing Initiative
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
                    {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/ehsaas_foryou"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition"
          >
            <Instagram size={18} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917718953595"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition"
          >
            {/* simple whatsapp svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.8 11.8 0 0 0 12.02 0C5.38 0 .02 5.36.02 12c0 2.12.56 4.18 1.63 5.99L0 24l6.18-1.61A11.96 11.96 0 0 0 12.02 24c6.64 0 12-5.36 12-12 0-3.2-1.25-6.22-3.5-8.52zM12.02 22c-1.86 0-3.67-.5-5.25-1.45l-.38-.23-3.67.96.98-3.57-.25-.37A9.96 9.96 0 0 1 2.02 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22.02 12c0 5.52-4.48 10-10 10zm5.5-7.27c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.48.71.3 1.27.48 1.7.61.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:leher.innerspace@gmail.com"
            className="hover:text-white/80 transition"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="font-body text-xs text-white/60">
          © 2026 Leher Inner Space. All rights reserved.
        </p>
      </footer>


      {selectedFounder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setSelectedFounder(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg mx-4 rounded-2xl p-8
                 bg-white/10 backdrop-blur-xl
                 border border-white/20
                 shadow-2xl
                 transform transition-all duration-300 scale-100"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedFounder(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={selectedFounder.img}
                alt={selectedFounder.name}
                className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg"
              />
            </div>

            {/* Name */}
            <h3 className="text-center text-2xl font-semibold text-white mt-4">
              {selectedFounder.name}
            </h3>

            {/* Role */}
            <p className="text-center text-primary text-sm mb-4">
              {selectedFounder.role}
            </p>

            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4"></div>

            {/* Bio */}
            <p className="text-white/80 text-sm text-center leading-relaxed mb-6">
              {selectedFounder.bio}
            </p>

            {/* LinkedIn */}
            <a
              href={selectedFounder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3
                   bg-white text-black
                   px-5 py-2.5 rounded-lg
                   text-sm font-medium
                   hover:bg-white/90 transition"
            >
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.036-1.849-3.036-1.851 0-2.134 1.445-2.134 2.939v5.666h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.368-1.849 3.601 0 4.267 2.37 4.267 5.455v6.285zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452z" />
              </svg>

              Follow on LinkedIn
            </a>
          </div>
        </div>
      )}

    </div>
  );
}