import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "react-feather";

const cards = [
  {
    title: "Wating for Analyst",
    subtitle: "Analyst is dealing with other problems, hold on...",
  },
  {
    title: "Writing Query",
    subtitle: "Quering across many tools gets complex",
  },
  {
    title: "Asking ChatGPT",
    subtitle: "What does this powershell command even means?",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "easeIn" } },
};

const AnimatedCards = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= cards.length - 1) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const card = cards[index];

  return (
    <div className="w-full max-w-lg lg:my-6 mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="lg:min-w-[600px] card flex items-center rounded-md  gap-4 bg-slate-50 bg-opacity-5 backdrop-blur-lg p-4 shadow-lg"
        >
          <div className="logo-container flex items-center w-12 h-12 rounded-md bg-opacity-10 backdrop-blur-lg p-3 bg-slate-100/10">
            <Clock />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            <h3 className="text-md text-gray-300">{card.subtitle}</h3>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(AnimatedCards);
