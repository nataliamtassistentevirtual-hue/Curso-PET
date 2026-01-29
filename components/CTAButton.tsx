
import React from 'react';

interface CTAButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ text, className = "", onClick, href }) => {
  const baseClasses = `bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 group ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        <span>{text}</span>
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
    >
      <span>{text}</span>
    </button>
  );
};
