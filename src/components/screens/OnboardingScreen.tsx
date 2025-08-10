'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OnboardingForm {
  username: string;
  gender: string;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  height: number | { feet: number; inches: number };
  heightUnit: 'cm' | 'ft';
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [form, setForm] = useState<OnboardingForm>({
    username: '',
    gender: '',
    weight: 0,
    weightUnit: 'lbs',
    height: { feet: 0, inches: 0 },
    heightUnit: 'ft'
  });

  const toggleWeightUnit = () => {
    if (form.weightUnit === 'lbs') {
      const kg = Math.round(form.weight * 0.45359237 * 10) / 10;
      setForm(prev => ({ ...prev, weight: kg, weightUnit: 'kg' }));
    } else {
      const lbs = Math.round(form.weight * 2.20462262 * 10) / 10;
      setForm(prev => ({ ...prev, weight: lbs, weightUnit: 'lbs' }));
    }
  };

  const toggleHeightUnit = () => {
    if (form.heightUnit === 'ft') {
      const height = typeof form.height === 'object' 
        ? Math.round((form.height.feet * 30.48 + form.height.inches * 2.54) * 10) / 10
        : 0;
      setForm(prev => ({ ...prev, height, heightUnit: 'cm' }));
    } else {
      const totalInches = (form.height as number) / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setForm(prev => ({ ...prev, height: { feet, inches }, heightUnit: 'ft' }));
    }
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="text-3xl font-bold mb-4">Love My Strength</h1>
      <h2 className="text-xl text-center mb-5">Welcome! Let's get you started</h2>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-sm text-gray-700 mb-1">Username</label>
          <input
            type="text"
            placeholder="Choose username"
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
            value={form.username}
            onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
            required
            minLength={3}
            maxLength={30}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1">Gender</label>
          <select
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
            value={form.gender}
            onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value }))}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Weight Input */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-700">Weight</label>
          <button
            onClick={toggleWeightUnit}
            className="text-blue-500 text-xs"
          >
            Switch to {form.weightUnit === 'lbs' ? 'Metric' : 'Imperial'}
          </button>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder={`Weight in ${form.weightUnit}`}
            className="w-full p-3 pr-12 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
            value={form.weight || ''}
            onChange={(e) => setForm(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
            min={1}
            max={form.weightUnit === 'lbs' ? 1000 : 500}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {form.weightUnit}
          </span>
        </div>
      </div>

      {/* Height Input */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm text-gray-700">Height</label>
          <button
            onClick={toggleHeightUnit}
            className="text-blue-500 text-xs"
          >
            Switch to {form.heightUnit === 'ft' ? 'Metric' : 'Imperial'}
          </button>
        </div>
        {form.heightUnit === 'ft' ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Feet"
                className="w-full p-3 pr-8 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
                value={(form.height as {feet: number}).feet || ''}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  height: { ...prev.height as {feet: number, inches: number}, feet: parseInt(e.target.value) }
                }))}
                min={1}
                max={8}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ft
              </span>
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Inches"
                className="w-full p-3 pr-8 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
                value={(form.height as {inches: number}).inches || ''}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  height: { ...prev.height as {feet: number, inches: number}, inches: parseInt(e.target.value) }
                }))}
                min={0}
                max={11}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                in
              </span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="number"
              placeholder="Height in cm"
              className="w-full p-3 pr-12 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:bg-white"
              value={form.height as number || ''}
              onChange={(e) => setForm(prev => ({ ...prev, height: parseInt(e.target.value) }))}
              min={1}
              max={300}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              cm
            </span>
          </div>
        )}
      </div>

      <button
        className="w-full bg-blue-500 text-white font-semibold p-4 rounded-xl hover:bg-blue-600 transition-colors"
        onClick={() => router.push('/dashboard')}
      >
        Get Started
      </button>
    </div>
  );
}
