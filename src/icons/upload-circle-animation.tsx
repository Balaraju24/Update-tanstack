import { Check } from "lucide-react";

type CircleProgressProps = {
  progress: number; // 0 → 100
};

export function CircleProgress({ progress }: CircleProgressProps) {
  const radius = 12; // small circle
  const stroke = 2.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      {progress < 100 ? (
        <svg
          className="w-6 h-6 rotate-[-90deg]"
          viewBox="0 0 32 32"
          fill="none"
        >
          {/* Background circle */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx="16"
            cy="16"
            r={radius}
            stroke="#3b82f6"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={12} strokeWidth={3} className="text-white" />
        </div>
      )}
      {progress < 100 && (
        <span className="absolute text-[10px] text-blue-600 font-medium">
          {progress}%
        </span>
      )}
    </div>
  );
}
