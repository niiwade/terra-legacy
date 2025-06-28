'use client';

interface Step {
  id: string;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface CheckoutStepsProps {
  steps: Step[];
}

export default function CheckoutSteps({ steps }: CheckoutStepsProps) {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.isActive 
                  ? 'bg-burgundy text-white' 
                  : step.isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            {/* Step title */}
            <span 
              className={`ml-2 text-sm font-medium ${
                step.isActive 
                  ? 'text-burgundy' 
                  : step.isCompleted 
                    ? 'text-green-500' 
                    : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
            
            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-4 ${
                  steps[index + 1].isActive || steps[index + 1].isCompleted || step.isCompleted
                    ? 'bg-burgundy' 
                    : 'bg-gray-200'
                }`}
                style={{ width: '50px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
