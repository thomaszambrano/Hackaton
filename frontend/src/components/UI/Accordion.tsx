import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-gray-200 rounded-md overflow-hidden bg-[#F4F4F4]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-inset
          ${isOpen ? "bg-[#00AEEF] text-white" : "bg-transparent text-gray-700 hover:bg-gray-200"}`}
      >
        <span className="flex items-center gap-3 font-work text-[15px]">
          <span className="text-lg font-bold mr-2 text-gray-400 font-mono">
            +
          </span>
          {title}
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="px-6 py-6 bg-white text-gray-700 text-[15px] leading-relaxed border-t border-gray-200 font-work">
          {children}
        </div>
      )}
    </div>
  );
}
