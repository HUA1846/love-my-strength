import { ReactNode } from 'react';

export type IntensityLevel = 'high' | 'medium' | 'low';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  borderLeft?: string;
  gradient?: boolean;
}

export function IntensityBadge({ level }: { level: IntensityLevel }) {
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-orange-500',
    low: 'bg-green-500'
  };

  return (
    <div className={`${colors[level]} text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full`}>
      {level}
    </div>
  );
}

export default function Card({ children, onClick, borderLeft, gradient }: CardProps) {
  const baseStyles = "bg-white border-2 border-gray-200 rounded-xl p-4 mb-3 cursor-pointer transition-colors";
  const hoverStyles = "hover:border-blue-500";
  const borderLeftStyles = borderLeft ? `border-l-4 border-l-[${borderLeft}]` : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none' : '';
  
  return (
    <div 
      onClick={onClick}
      className={`${baseStyles} ${!gradient ? hoverStyles : ''} ${borderLeftStyles} ${gradientStyles}`}
    >
      {children}
    </div>
  );
}
