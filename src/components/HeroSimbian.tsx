import React, { useEffect, useState } from "react";
import AnimatedCards from "@/components/AnimatedCard";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CountCard from "@/components/CountCard";
import { fadeUp } from "@/utils";
import { AnimatePresence, motion } from "motion/react";

const HeroSimbian = () => {
  const [animateTransform, setAnimateTransform] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateTransform(true);
    }, 8000);

    const resetTimer = setTimeout(() => {
      setShowReset(true);
    }, 8200); // 200ms after transform starts

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  const [translateX, setTranslateX] = useState(700);

  useEffect(() => {
    const updateTranslateX = () => {
      const screenWidth = window.innerWidth;
      // Translate up to 50% of screen width, but not more than 700
      const offset = Math.min(screenWidth * 0.5, 700);
      setTranslateX(offset);
    };

    updateTranslateX(); // Initial setup
    window.addEventListener("resize", updateTranslateX);
    return () => window.removeEventListener("resize", updateTranslateX);
  }, []);

  const [shouldTranslate, setShouldTranslate] = useState(true);

  useEffect(() => {
    const updateTranslateX = () => {
      const screenWidth = window.innerWidth;

      // If screen is small, limit translate to 30-40% of screen
      const offset =
        screenWidth <= 768
          ? Math.min(screenWidth * 0.3, 100) // much smaller shift on mobile
          : Math.min(screenWidth * 0.5, 700); // default for large screens

      setTranslateX(offset);
      setShouldTranslate(screenWidth > 768); // Only animate transform above 768px
    };

    updateTranslateX(); // Initial setup
    window.addEventListener("resize", updateTranslateX);
    return () => window.removeEventListener("resize", updateTranslateX);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.95 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`rounded-xl p-4 transition-colors duration-1000 ease-in-out ${
        animateTransform && "bg-blue-800"
      }`}
    >
      <AnimatePresence mode="wait">
        {!animateTransform ? (
          <motion.div
            key="without"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end lg:gap-4 gap-2"
          >
            <motion.h2
              {...fadeUp(0)}
              className="text-3xl font-bold text-blue-200"
            >
              Without Simbian
            </motion.h2>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-md font-bold text-blue-200"
            >
              If this sounds all too familiar, you might want to...
            </motion.h2>
            <motion.div {...fadeUp(0.2)}>
              <Button text="Book a Demo" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="with"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start lg:gap-4 gap-2"
          >
            <motion.h2
              {...fadeUp(0)}
              className="text-3xl font-bold text-blue-200"
            >
              With Simbian
            </motion.h2>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-md font-bold text-blue-200"
            >
              Relax our AI agent will take it from here.
            </motion.h2>
            <motion.div {...fadeUp(0.2)}>
              <Button text="Book a Demo" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedCards />

      <div className="flex flex-col lg:flex-row justify-around mt-6 gap-4">
        <motion.div
          animate={
            animateTransform && shouldTranslate ? { x: translateX } : { x: 0 }
          }
          transition={{ duration: 1, type: "spring" }}
          className="flex flex-col gap-4"
        >
          <Card text="Wasting Valueable analyst time on false positives" />
          <Card text="Processing one alert at a time, missing opportunities" />
          <Card text="More Time Flexing soar automation" />
        </motion.div>

        <motion.div
          animate={
            animateTransform && shouldTranslate ? { x: -translateX } : { x: 0 }
          }
          transition={{ duration: 1, type: "spring" }}
          className="flex flex-col gap-4"
        >
          <CountCard
            text="Ignored Alerts"
            count={193}
            trail
            resetCount={showReset}
          />
          <CountCard
            text="Wrongly Closed"
            count={23}
            trail
            resetCount={showReset}
          />
          <CountCard
            text="Active Threats"
            count={3}
            trail
            resetCount={showReset}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSimbian;
