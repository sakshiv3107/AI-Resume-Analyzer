import { useEffect, useState } from "react";
import { FileSearch, Brain, Target, Sparkles } from "lucide-react";

const STEPS = [
  { icon: FileSearch, text: "Reading your resume..." },
  { icon: Brain, text: "Analyzing skills & experience..." },
  { icon: Target, text: "Checking keyword alignment..." },
  { icon: Sparkles, text: "Putting together your report..." },
];

const STEP_DURATION_MS = 1800;

function AnalysisLoadingOverlay({ hasJobDescription }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        // Stop advancing once we hit the last step — don't loop back,
        // since looping while the real call is still pending looks broken.
        if (prev >= STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, STEP_DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  const current = STEPS[stepIndex];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
      <div className="flex flex-col items-center max-w-sm text-center px-6">
        {/* Icon with pulse ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75" />
          <div className="relative w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <Icon size={28} className="text-white" />
          </div>
        </div>

        {/* Step text */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {current.text}
        </h3>

        <p className="text-sm text-gray-500 mb-6">
          {hasJobDescription
            ? "Comparing your resume against the job description..."
            : "This usually takes a few seconds."}
        </p>

        {/* Progress dots */}
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === stepIndex
                  ? "w-8 bg-blue-600"
                  : i < stepIndex
                  ? "w-4 bg-blue-300"
                  : "w-4 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisLoadingOverlay;