'use client';

import { useState } from 'react';
import Header from '@/components/shared/Header';
import TabBar from '@/components/shared/TabBar';
import Card from '@/components/shared/Card';
import { IntensityBadge } from '@/components/shared/Card';

interface WorkoutHistory {
  date: string;
  name: string;
  intensity: 'high' | 'medium' | 'low';
  exercises: {
    name: string;
    warmupSets: string;
    workingSets: string;
  }[];
}

const workoutHistory: WorkoutHistory[] = [
  {
    date: 'August 8, 2025',
    name: 'Upper Body Strength',
    intensity: 'high',
    exercises: [
      {
        name: 'Bench Press',
        warmupSets: '8 × 95, 6 × 115, 3 × 125',
        workingSets: '6 × 135, 6 × 135, 4 × 135'
      },
      {
        name: 'Overhead Press',
        warmupSets: '8 × 65, 5 × 85',
        workingSets: '6 × 95, 5 × 95, 4 × 95'
      },
      {
        name: 'Dips',
        warmupSets: '',
        workingSets: '12 × BW, 10 × BW, 8 × BW'
      },
      {
        name: 'Tricep Extension',
        warmupSets: '12 × 25',
        workingSets: '12 × 40, 12 × 40, 10 × 40'
      }
    ]
  },
  {
    date: 'August 6, 2025',
    name: 'Deadlift Focus',
    intensity: 'medium',
    exercises: [
      {
        name: 'Deadlift',
        warmupSets: '5 × 135, 3 × 155',
        workingSets: '5 × 185, 5 × 185, 5 × 185'
      },
      {
        name: 'Pull-ups',
        warmupSets: '',
        workingSets: '8 × BW, 6 × BW, 5 × BW'
      },
      {
        name: 'Barbell Rows',
        warmupSets: '8 × 95',
        workingSets: '10 × 135, 10 × 135, 8 × 135'
      }
    ]
  },
  {
    date: 'August 4, 2025',
    name: 'Leg Day',
    intensity: 'low',
    exercises: [
      {
        name: 'Squat',
        warmupSets: '5 × 45, 5 × 95, 5 × 115, 3 × 135',
        workingSets: '5 × 165, 5 × 165, 3 × 165 (failed at rep 4)'
      },
      {
        name: 'Romanian Deadlift',
        warmupSets: '8 × 95',
        workingSets: '8 × 135, 8 × 135, 6 × 135'
      },
      {
        name: 'Walking Lunges',
        warmupSets: '',
        workingSets: '12 × 25, 12 × 25, 10 × 25'
      }
    ]
  }
];

export default function HistoryPage() {
  const [activeView, setActiveView] = useState<'list' | 'graph'>('list');
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleExport = () => {
    // TODO: Implement PDF export functionality
    console.log('Exporting workout history...');
    setShowExportDialog(false);
  };

  return (
    <div className="pb-20">
      <Header
        title="Workout History"
        rightAction={{
          label: 'Export PDF',
          onClick: () => setShowExportDialog(true)
        }}
      />

      {/* Export Dialog */}
      {showExportDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowExportDialog(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-xl p-5 z-50 max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">Export Workout History</h3>
              <button
                onClick={() => setShowExportDialog(false)}
                className="text-xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Custom range...</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Include in Export</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Workout Details</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Progress Graphs</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Personal Notes</span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Detailed Report (PDF)</option>
                <option>Summary Report (PDF)</option>
                <option>Raw Data (CSV)</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              className="w-full bg-blue-500 text-white font-semibold p-4 rounded-xl mb-2"
            >
              Generate Export
            </button>
            <button
              onClick={() => setShowExportDialog(false)}
              className="w-full border-2 border-blue-500 text-blue-500 font-semibold p-4 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <div className="px-4">
        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          <button
            onClick={() => setActiveView('list')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeView === 'list'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveView('graph')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeView === 'graph'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600'
            }`}
          >
            Graph View
          </button>
        </div>

        {/* Content */}
        {activeView === 'list' ? (
          <div>
            {workoutHistory.map((workout, index) => (
              <Card key={index} borderLeft="#007AFF">
                <div className="text-sm text-gray-500 mb-2">{workout.date}</div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-lg">{workout.name}</span>
                  <IntensityBadge level={workout.intensity} />
                </div>

                <div className="space-y-4">
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="text-sm">
                      <div className="font-semibold mb-1.5 text-gray-900">
                        {exercise.name} (rep × lb)
                      </div>
                      {exercise.warmupSets && (
                        <div className="text-gray-600 text-xs mb-1">
                          <strong>Warm up:</strong> {exercise.warmupSets}
                        </div>
                      )}
                      <div className="text-gray-800 text-xs">
                        <strong>Workout:</strong> {exercise.workingSets}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Progress Graphs</h3>
            <p className="text-gray-600 mb-6">
              Visual representation of your strength progress over time
            </p>
            <div className="text-sm text-gray-500">
              Graph functionality coming soon...
            </div>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}
