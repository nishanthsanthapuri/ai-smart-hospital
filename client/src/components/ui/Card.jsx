// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // Used for animation in the motion.div below

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow p-4"
    >
      {children}
    </motion.div>
  );
}
