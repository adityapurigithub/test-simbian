import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="w-max bg-slate-100 hover:bg-blue-500 shadow active:scale-95 transition-all duration-200 font-bold py-2 px-4 rounded-full text-black">
      {text}
    </button>
  );
};

export default Button;
