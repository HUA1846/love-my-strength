'use client';

import { useState } from 'react';
import SetRow from './SetRow';

interface ExerciseProps {
  name: string;
  isNew?: boolean;
  onRemove?: () => void;
}

interface Set {
  weight: number;
  reps: number;
  status: 'success' | 'failed';
}

interface ExerciseData {
  warmupSets: Set[];
  workingSets: Set[];
  notes: string;
}

export default function Exercise({ name, isNew = false, onRemove }: ExerciseProps) {
  const [exercise, setExercise] = useState<ExerciseData>({
    warmupSets: isNew ? [] : [{ weight: 95, reps: 5, status: 'success' }],
    workingSets: isNew ? [] : [
      { weight: 145, reps: 5, status: 'success' },
      { weight: 145, reps: 5, status: 'success' },
      { weight: 145, reps: 3, status: 'failed' }
    ],
    notes: ''
  });

  const addWarmupSet = () => {
    setExercise(prev => ({
      ...prev,
      warmupSets: [...prev.warmupSets, { weight: 0, reps: 0, status: 'success' }]
    }));
  };

  const addWorkingSet = () => {
    setExercise(prev => ({
      ...prev,
      workingSets: [...prev.workingSets, { weight: 0, reps: 0, status: 'success' }]
    }));
  };

  const removeWarmupSet = (index: number) => {
    setExercise(prev => ({
      ...prev,
      warmupSets: prev.warmupSets.filter((_, i) => i !== index)
    }));
  };

  const removeWorkingSet = (index: number) => {
    setExercise(prev => ({
      ...prev,
      workingSets: prev.workingSets.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        {onRemove && (
          <button
            onClick={onRemove}
            className="px-3 py-1 rounded-full border border-red-300 text-red-500 text-sm hover:bg-red-50 transition-colors"
          >
            Remove Exercise
          </button>
        )}
      </div>
      
      {/* Warm-up sets */}
      {(!isNew || exercise.warmupSets.length > 0) && (
        <div className="mb-4">
          <label className="text-sm text-gray-500 mb-2 block">Warm-up Sets</label>
          {exercise.warmupSets.map((set, index) => (
            <SetRow
              key={`warmup-${index}`}
              defaultWeight={set.weight}
              defaultReps={set.reps}
              status={set.status}
              onWeightChange={(weight) => {
                const newWarmupSets = [...exercise.warmupSets];
                newWarmupSets[index].weight = weight;
                setExercise({ ...exercise, warmupSets: newWarmupSets });
              }}
              onRepsChange={(reps) => {
                const newWarmupSets = [...exercise.warmupSets];
                newWarmupSets[index].reps = reps;
                setExercise({ ...exercise, warmupSets: newWarmupSets });
              }}
              onStatusChange={(status) => {
                const newWarmupSets = [...exercise.warmupSets];
                newWarmupSets[index].status = status;
                setExercise({ ...exercise, warmupSets: newWarmupSets });
              }}
              onRemove={() => removeWarmupSet(index)}
            />
          ))}
          <button
            onClick={addWarmupSet}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            + Add warm-up set
          </button>
        </div>
      )}
      
      {/* Working sets */}
      <div className="mb-4">
        <label className="text-sm text-gray-700 mb-2 block">Working Sets</label>
        {exercise.workingSets.map((set, index) => (
          <SetRow
            key={`working-${index}`}
            defaultWeight={set.weight}
            defaultReps={set.reps}
            status={set.status}
            onWeightChange={(weight) => {
              const newWorkingSets = [...exercise.workingSets];
              newWorkingSets[index].weight = weight;
              setExercise({ ...exercise, workingSets: newWorkingSets });
            }}
            onRepsChange={(reps) => {
              const newWorkingSets = [...exercise.workingSets];
              newWorkingSets[index].reps = reps;
              setExercise({ ...exercise, workingSets: newWorkingSets });
            }}
            onStatusChange={(status) => {
              const newWorkingSets = [...exercise.workingSets];
              newWorkingSets[index].status = status;
              setExercise({ ...exercise, workingSets: newWorkingSets });
            }}
            onRemove={() => removeWorkingSet(index)}
          />
        ))}
        <button
          onClick={addWorkingSet}
          className="text-blue-500 text-sm hover:text-blue-600"
        >
          + Add working set
        </button>
      </div>
      
      {/* Notes */}
      <input
        type="text"
        placeholder="Notes: How did it feel? How was your form?"
        className="w-full p-3 mt-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={exercise.notes}
        onChange={(e) => setExercise({ ...exercise, notes: e.target.value })}
      />
    </div>
  );
}
