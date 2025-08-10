'use client';

import { useState } from 'react';

interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (exercise: string) => void;
}

const commonExercises = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Pull-up',
  'Dip',
  'Romanian Deadlift',
  'Front Squat',
  'Incline Bench Press',
  'Barbell Curl',
  'Tricep Extension',
  'Lateral Raise',
  'Face Pull',
  'Calf Raise'
];

export default function ExerciseSelectionModal({
  isOpen,
  onClose,
  onSelect
}: ExerciseSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  const filteredExercises = commonExercises.filter(exercise =>
    exercise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-xl p-4 z-50 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Exercise</h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Search exercises..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="space-y-2">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise}
              onClick={() => {
                onSelect(exercise);
                onClose();
              }}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {exercise}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
