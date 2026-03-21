import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="leher-heading text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
          Unwinding the Mind,
          <br />
          <span className="text-primary">Discovering Clarity.</span>
        </h1>
      </motion.div>

      <motion.p
        className="leher-body text-muted-foreground max-w-lg text-base md:text-lg mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        A journey through the landscape of your inner world — from overwhelm to
        understanding, from noise to a deeper, steadier calm.
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
          Begin the Scroll
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="text-primary"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M4 7 L10 13 L16 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
