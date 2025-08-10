'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backPath?: string;
  rightAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function Header({ 
  title, 
  showBack = false, 
  backPath = '/dashboard',
  rightAction
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {showBack ? (
        <button 
          onClick={() => router.push(backPath)}
          className="text-2xl font-light text-gray-600 p-2"
        >
          ‹
        </button>
      ) : (
        <div className="w-10" />
      )}
      
      <h2 className="text-xl font-semibold">{title}</h2>
      
      {rightAction ? (
        <button
          onClick={rightAction.onClick}
          className="text-blue-500 font-semibold bg-transparent border-none"
        >
          {rightAction.label}
        </button>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}
