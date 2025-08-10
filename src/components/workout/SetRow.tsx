'use client';

import { useState } from 'react';

interface SetRowProps {
  defaultWeight?: number;
  defaultReps?: number;
  status?: 'success' | 'failed' | 'add';
  onStatusChange?: (status: 'success' | 'failed') => void;
  onWeightChange?: (weight: number) => void;
  onRepsChange?: (reps: number) => void;
  weightUnit?: 'lbs' | 'kg';
}

export default function SetRow({
  defaultWeight,
  defaultReps,
  status = 'success',
  onStatusChange,
  onWeightChange,
  onRepsChange,
  weightUnit = 'lbs'
}: SetRowProps) {
  const [currentStatus, setCurrentStatus] = useState(status);

  const toggleStatus = () => {
    if (currentStatus === 'add') return;
    const newStatus = currentStatus === 'success' ? 'failed' : 'success';
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  return (
    <div className="flex gap-3 items-center mb-3">
      <input
        type="number"
        className="w-28 p-3 border border-gray-300 rounded-lg text-center bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder={defaultWeight?.toString() || "Weight"}
        defaultValue={defaultWeight}
        onChange={(e) => onWeightChange?.(Number(e.target.value))}
      />
      <span className="text-gray-600">{weightUnit} ×</span>
      <input
        type="number"
        className="w-24 p-3 border border-gray-300 rounded-lg text-center bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder={defaultReps?.toString() || "Reps"}
        defaultValue={defaultReps}
        onChange={(e) => onRepsChange?.(Number(e.target.value))}
      />
      <span className="text-gray-600">reps</span>
      <button
        onClick={toggleStatus}
        className={`px-4 py-2 rounded-full border text-sm transition-colors ${
          currentStatus === 'failed'
            ? 'bg-red-500 text-white border-red-500'
            : currentStatus === 'add'
            ? 'bg-white text-gray-600 border-gray-300'
            : 'bg-white text-gray-600 border-gray-300'
        }`}
      >
        {currentStatus === 'failed' ? 'F' : currentStatus === 'add' ? 'Add' : '✓'}
      </button>
    </div>
  );
}
