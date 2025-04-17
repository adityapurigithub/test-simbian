import { memo } from "react";
import { motion } from "framer-motion";
import { Clock } from "react-feather";
import { fadeIn } from "@/utils";

const Card = ({ text }: { text: string }) => {
  return (
    <div className="w-full max-w-lg mt-6">
      <motion.div
        {...fadeIn(0.2)}
        className="card flex items-center rounded-md  gap-4 bg-slate-50 bg-opacity-5 backdrop-blur-lg p-4 shadow-lg"
      >
        <div className="logo-container flex items-center w-10 h-10 rounded-md bg-opacity-10 backdrop-blur-lg p-3 bg-slate-100/10">
          <Clock />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-white">{text}</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Card);
