
import React from 'react';

interface CTAButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ text, className = "", onClick, href }) => {
  const baseClasses = `bg-[#8B735B] hover:bg-[#76624D] text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] shadow-sm flex items-center justify-center gap-2 group tracking-wide ${className}`;

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
