'use client';

import { usePathname, useRouter } from 'next/navigation';

type TabItem = {
  icon: string;
  label: string;
  path: string;
};

const tabs: TabItem[] = [
  { icon: '🏠', label: 'Home', path: '/dashboard' },
  { icon: '💪', label: 'Workout', path: '/workout' },
  { icon: '📊', label: 'History', path: '/history' },
  { icon: '🤖', label: 'AI Plans', path: '/plans' },
];

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-20">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => router.push(tab.path)}
          className={`flex-1 flex flex-col items-center justify-center
            ${pathname === tab.path ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <div className="text-2xl mb-1">{tab.icon}</div>
          <div className="text-xs">{tab.label}</div>
        </button>
      ))}
    </div>
  );
}
