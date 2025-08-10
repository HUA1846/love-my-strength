'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/shared/Header';
import TabBar from '@/components/shared/TabBar';
import Exercise from '@/components/workout/Exercise';
import ExerciseSelectionModal from '@/components/workout/ExerciseSelectionModal';

type IntensityLevel = 'high' | 'medium' | 'low';

interface WorkoutData {
  date: string;
  name: string;
  intensity: IntensityLevel;
  exercises: string[];
}

export default function WorkoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFromHistory = searchParams.get('from') === 'history';
  
  const [workout, setWorkout] = useState<WorkoutData>({
    date: new Date().toISOString().split('T')[0],
    name: '',
    intensity: 'medium',
    exercises: []
  });
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  // Initialize with sample data for new workouts (not from history)
  useEffect(() => {
    if (!isFromHistory) {
      setWorkout(prev => ({
        ...prev,
        exercises: ['Squat', 'Bench Press']
      }));
    }
  }, [isFromHistory]);

  const handleSave = () => {
    // TODO: Implement save functionality
    if (isFromHistory) {
      router.push('/history');
    } else {
      router.push('/dashboard');
    }
  };

  const addExercise = () => {
    setIsExerciseModalOpen(true);
  };

  const handleExerciseSelect = (exercise: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise]
    }));
  };

  const removeExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const title = isFromHistory ? 'Add Past Workout' : 'New Workout';
  const backPath = isFromHistory ? '/history' : '/dashboard';

  return (
    <div className="pb-20">
      <Header
        title={title}
        showBack
        backPath={backPath}
        rightAction={{
          label: 'Save',
          onClick: handleSave
        }}
      />

      <div className="p-4">
        {/* Workout Header */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold m-0">
              {isFromHistory ? 'Past Workout' : 'New Workout'}
            </h3>
            <select
              className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={workout.intensity}
              onChange={(e) => setWorkout(prev => ({ ...prev, intensity: e.target.value as IntensityLevel }))}
            >
              <option value="high">High Intensity</option>
              <option value="medium">Medium Intensity</option>
              <option value="low">Low Intensity</option>
            </select>
          </div>

          <input
            type="date"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={workout.date}
            onChange={(e) => setWorkout(prev => ({ ...prev, date: e.target.value }))}
          />

          <input
            type="text"
            placeholder="Session name (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={workout.name}
            onChange={(e) => setWorkout(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        {/* Exercises */}
        {workout.exercises.map((exercise, index) => (
          <div key={index} className="relative">
            <Exercise
              name={exercise}
              isNew={workout.exercises.length === 0}
              onRemove={() => removeExercise(index)}
            />
          </div>
        ))}

        {/* Add Exercise Button */}
        <button
          onClick={addExercise}
          className="w-full py-4 px-4 rounded-xl border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-50 transition-colors"
        >
          + Add Exercise
        </button>

        {/* Help Text */}
        {isFromHistory && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Adding a past workout helps you track workouts you may have forgotten to log.
            </p>
          </div>
        )}
      </div>

      <TabBar />

      <ExerciseSelectionModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onSelect={handleExerciseSelect}
      />
    </div>
  );
}
