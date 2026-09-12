"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          Question {current} of {total}
        </span>

        <span className="text-gray-500">{percentage}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
