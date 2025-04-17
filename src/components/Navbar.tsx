"use client";
import Image from "next/image";
import { motion } from "motion/react";
import logo from "@/app/assets/logo_white.webp";
import Link from "next/link";
import { fadeIn } from "@/utils";
import Button from "./Button";

const linkHoverEffect =
  "relative cursor-pointer font-bold text-white before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:opacity-0 before:transition-all before:duration-200 hover:before:w-full hover:before:opacity-100";

const Navbar = () => {
  return (
    <motion.div
      {...fadeIn(0.1)}
      className="lg:p-5 p-2 rounded-md fixed top-4 left-4 right-4 bg-slate-700 shadow-lg backdrop-blur-xl flex items-center justify-between z-50"
    >
      <Image
        className="cursor-pointer hover:scale-105 transition-all duration-1000"
        src={logo}
        alt="Logo"
        width={100}
        height={24}
        onClick={() => window.scrollTo(0, 0)}
      />
      <div className="lg:flex items-center gap-6 hidden">
        <Link href="/" className={linkHoverEffect}>
          Home
        </Link>
        <Link href="/" className={linkHoverEffect}>
          Product
        </Link>
        <Link href="/" className={linkHoverEffect}>
          Company
        </Link>
        <Link href="/" className={linkHoverEffect}>
          Blog
        </Link>
        <Button text="Book a Demo" />
      </div>
    </motion.div>
  );
};

export default Navbar;
