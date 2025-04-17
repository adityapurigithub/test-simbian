import { memo, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { AlertOctagon, Clock, Shield } from "react-feather";
import { fadeIn } from "@/utils";

const icons = [Clock, Shield, AlertOctagon];

const iconTrailVariants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const iconVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 80,
    },
  },
};

const CountCard = ({
  text,
  count,
  trail = false,
  resetCount = false,
}: {
  text: string;
  count: number;
  trail?: boolean;
  resetCount?: boolean;
}) => {
  const [displayCount, setDisplayCount] = useState(count);
  const [textColor, setTextColor] = useState("text-purple-500");

  useEffect(() => {
    if (resetCount) {
      setTextColor("text-purple-200");

      const controls = animate(count, 0, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplayCount(Math.round(latest));
        },
      });

      return () => controls.stop();
    } else {
      setDisplayCount(count);
      setTextColor("text-purple-600");
    }
  }, [resetCount, count]);

  return (
    <motion.div {...fadeIn(0.3)} className="w-full max-w-lg mt-6">
      <motion.div
        variants={trail ? iconTrailVariants : undefined}
        initial="initial"
        animate="animate"
        className="card flex items-center justify-between rounded-md gap-4 bg-slate-50 bg-opacity-5 backdrop-blur-lg p-4 shadow-lg"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-white">{text}</h2>
          <span
            className={`text-xl font-semibold transition-colors ${textColor}`}
          >
            {displayCount}
          </span>
        </div>

        {trail && (
          <div className="flex gap-2">
            {icons.map((Icon, idx) => (
              <motion.div
                key={idx}
                variants={iconVariants}
                className="text-white p-2 bg-white/10 rounded-full"
              >
                <Icon size={16} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default memo(CountCard);
