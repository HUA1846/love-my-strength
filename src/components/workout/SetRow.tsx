'use client';

import { useState } from 'react';

interface SetRowProps {
  defaultWeight?: number;
  defaultReps?: number;
  status?: 'success' | 'failed' | 'add';
  onStatusChange?: (status: 'success' | 'failed') => void;
  onWeightChange?: (weight: number) => void;
  onRepsChange?: (reps: number) => void;
  onRemove?: () => void;
  weightUnit?: 'lbs' | 'kg';
}

export default function SetRow({
  defaultWeight,
  defaultReps,
  status = 'success',
  onStatusChange,
  onWeightChange,
  onRepsChange,
  onRemove,
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
    <div className="flex flex-nowrap gap-2 items-center mb-3">
      <input
        type="number"
        className="w-24 p-2 border border-gray-300 rounded-lg text-center bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
        placeholder={defaultWeight?.toString() || "Weight"}
        defaultValue={defaultWeight}
        onChange={(e) => onWeightChange?.(Number(e.target.value))}
      />
      <span className="text-gray-600 text-sm whitespace-nowrap">{weightUnit} ×</span>
      <input
        type="number"
        className="w-20 p-2 border border-gray-300 rounded-lg text-center bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
        placeholder={defaultReps?.toString() || "Reps"}
        defaultValue={defaultReps}
        onChange={(e) => onRepsChange?.(Number(e.target.value))}
      />
      <span className="text-gray-600 text-sm whitespace-nowrap">reps</span>
      <button
        onClick={toggleStatus}
        className={`px-3 py-2 rounded-full border text-xs transition-colors flex-shrink-0 ${
          currentStatus === 'failed'
            ? 'bg-red-500 text-white border-red-500'
            : currentStatus === 'add'
            ? 'bg-white text-gray-600 border-gray-300'
            : 'bg-white text-gray-600 border-gray-300'
        }`}
      >
        {currentStatus === 'failed' ? 'F' : currentStatus === 'add' ? 'Add' : '✓'}
      </button>
      {onRemove && (
        <button
          onClick={onRemove}
          className="px-2 py-2 rounded-full border border-red-300 text-red-500 text-xs hover:bg-red-50 transition-colors flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
}
