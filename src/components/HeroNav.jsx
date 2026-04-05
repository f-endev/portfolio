import { motion } from "framer-motion";

/**
 * HeroNav
 *
 * Props:
 *  name       — display name in the left chip  (default "KUSHAL")
 *  onTalk     — callback for "Let's Talk" button
 *  onMenu     — callback for "Menu" button
 */
export default function HeroNav({
  name    = "KUSHAL",
  onTalk  = () => {},
  onMenu  = () => {},
}) {
  return (
    <div
      className="absolute flex w-full"
      style={{ zIndex: 10 }}
    >
      <motion.button
        className="text-black text-2xl w-full items-start flex font-normal"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        HI! I am {name}
      </motion.button>

      <motion.div
        className="flex items-center gap-3 w-full justify-end"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <button className="px-4 py-2 bg-black border border-indigo-500/30 rounded-full text-white text-sm hover:bg-indigo-950/40 transition-colors">
          —
        </button>
        <button
          onClick={onTalk}
          className="px-4 py-2 bg-black border border-indigo-500/30 rounded-full text-white text-sm hover:bg-indigo-600/20 hover:border-indigo-400/50 transition-all"
        >
          Let's Talk
        </button>
        <button
          onClick={onMenu}
          className="px-4 py-2 bg-black border border-indigo-500/30 rounded-full text-white text-sm hover:bg-indigo-600/20 hover:border-indigo-400/50 transition-all"
        >
          Menu
        </button>
      </motion.div>
    </div>
  );
}