'use client';

import { useState } from 'react';
import Header from '@/components/shared/Header';
import TabBar from '@/components/shared/TabBar';
import Card from '@/components/shared/Card';

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  frequency: string;
  isRecommended?: boolean;
}

const availablePlans: WorkoutPlan[] = [
  {
    id: '531-beginners',
    name: '5/3/1 for Beginners',
    description: 'Classic strength progression',
    duration: '12 weeks',
    frequency: '4 days/week'
  },
  {
    id: 'stronglifts',
    name: 'StrongLifts 5x5',
    description: 'Simple progressive overload',
    duration: '16 weeks',
    frequency: '3 days/week'
  },
  {
    id: 'upper-lower',
    name: 'Upper/Lower Split',
    description: 'Balanced muscle development',
    duration: '8 weeks',
    frequency: '4 days/week'
  }
];

const recommendedPlan: WorkoutPlan = {
  id: 'progressive-strength',
  name: 'Progressive Strength Builder',
  description: 'Based on your recent squat performance, this plan focuses on building foundational strength with proper progression.',
  duration: '12 weeks',
  frequency: '3 days/week',
  isRecommended: true
};

export default function PlansPage() {
  const [showCustomPlanDialog, setShowCustomPlanDialog] = useState(false);

  const handleStartPlan = (planId: string) => {
    // TODO: Implement plan start functionality
    console.log(`Starting plan: ${planId}`);
  };

  const handlePreviewPlan = (planId: string) => {
    // TODO: Implement plan preview functionality
    console.log(`Previewing plan: ${planId}`);
  };

  const handleCreateCustomPlan = () => {
    // TODO: Implement AI custom plan creation
    console.log('Creating custom AI plan...');
    setShowCustomPlanDialog(false);
  };

  return (
    <div className="pb-20">
      <Header
        title="AI Workout Plans"
        rightAction={{
          label: '✨ New',
          onClick: () => setShowCustomPlanDialog(true)
        }}
      />

      {/* Custom Plan Dialog */}
      {showCustomPlanDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCustomPlanDialog(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-xl p-5 z-50 max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold">Create Custom Plan</h3>
              <button
                onClick={() => setShowCustomPlanDialog(false)}
                className="text-xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Primary Goal</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Build Strength</option>
                <option>Increase Muscle Mass</option>
                <option>Improve Endurance</option>
                <option>General Fitness</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Beginner (0-6 months)</option>
                <option>Intermediate (6 months - 2 years)</option>
                <option>Advanced (2+ years)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Available Days per Week</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>3 days</option>
                <option>4 days</option>
                <option>5 days</option>
                <option>6 days</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Session Duration</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>45-60 minutes</option>
                <option>60-75 minutes</option>
                <option>75-90 minutes</option>
                <option>90+ minutes</option>
              </select>
            </div>

            <button
              onClick={handleCreateCustomPlan}
              className="w-full bg-blue-500 text-white font-semibold p-4 rounded-xl mb-2"
            >
              Generate My Plan
            </button>
            <button
              onClick={() => setShowCustomPlanDialog(false)}
              className="w-full border-2 border-blue-500 text-blue-500 font-semibold p-4 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <div className="px-4">
        {/* Recommended Plan */}
        <Card gradient>
          <h3 className="text-white font-semibold mb-2">Recommended for You</h3>
          <div className="text-lg mb-3 text-white">{recommendedPlan.name}</div>
          <div className="text-sm opacity-90 mb-4 text-white">
            {recommendedPlan.description}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white">
              {recommendedPlan.duration} • {recommendedPlan.frequency}
            </span>
            <button
              onClick={() => handleStartPlan(recommendedPlan.id)}
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full text-sm"
            >
              Start Plan
            </button>
          </div>
        </Card>

        <h3 className="text-lg font-semibold mb-4">Available Plans</h3>

        {/* Available Plans */}
        {availablePlans.map((plan) => (
          <Card key={plan.id}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold mb-1">{plan.name}</div>
                <div className="text-sm text-gray-600 mb-2">{plan.description}</div>
                <div className="text-xs text-blue-500">
                  {plan.duration} • {plan.frequency}
                </div>
              </div>
              <button
                onClick={() => handlePreviewPlan(plan.id)}
                className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium ml-3"
              >
                Preview
              </button>
            </div>
          </Card>
        ))}

        {/* Custom AI Plan CTA */}
        <div className="bg-gray-50 rounded-xl p-4 mt-5 text-center">
          <div className="text-2xl mb-2">🤖</div>
          <div className="font-semibold mb-2">Get Custom AI Plan</div>
          <div className="text-sm text-gray-600 mb-4">
            Our AI analyzes your history and creates a personalized plan just for you.
          </div>
          <button
            onClick={() => setShowCustomPlanDialog(true)}
            className="w-full bg-blue-500 text-white font-semibold p-4 rounded-xl"
          >
            Create My Plan
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
}
