'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/shared/Card';
import TabBar from '@/components/shared/TabBar';
import { IntensityBadge } from '@/components/shared/Card';

const recentWorkouts = [
  {
    date: 'Aug 8, 2025',
    name: 'Upper Body Strength',
    intensity: 'high' as const,
  },
  {
    date: 'Aug 6, 2025',
    name: 'Deadlift Focus',
    intensity: 'medium' as const,
  },
  {
    date: 'Aug 4, 2025',
    name: 'Leg Day',
    intensity: 'low' as const,
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="pb-20">
      <div className="px-5 pt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>9:41</span>
          <span>100%</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Love My Strength</h1>
        
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button className="flex-1 py-3 px-4 rounded-lg font-medium bg-white shadow-sm">
            Recent
          </button>
          <button className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-600">
            Stats
          </button>
          <button className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-600">
            Progress
          </button>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">Recent Workouts</h3>
        
        {recentWorkouts.map((workout) => (
          <Card key={workout.date} onClick={() => router.push('/history')}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500 mb-1">{workout.date}</div>
                <div className="font-medium">{workout.name}</div>
              </div>
              <IntensityBadge level={workout.intensity} />
            </div>
          </Card>
        ))}
        
        <button 
          className="w-full mt-4 py-4 px-4 rounded-xl border-2 border-blue-500 text-blue-500 font-semibold"
          onClick={() => router.push('/plans')}
        >
          Get AI Workout Plan
        </button>
      </div>

      <button 
        onClick={() => router.push('/workout')}
        className="fixed bottom-24 right-5 w-14 h-14 bg-blue-500 rounded-full text-white text-2xl shadow-lg flex items-center justify-center"
      >
        +
      </button>
      
      <TabBar />
    </div>
  );
}
