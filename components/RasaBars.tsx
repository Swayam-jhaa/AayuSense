import { Progress } from '@/components/ui/progress';
import { RasaIntensities } from '@/types';

interface RasaBarsProps {
  intensities: RasaIntensities;
}

const rasaConfig = {
  madhura: { label: 'Madhura (Sweet)', color: 'bg-rasa-madhura' },
  amla: { label: 'Amla (Sour)', color: 'bg-rasa-amla' },
  lavana: { label: 'Lavana (Salty)', color: 'bg-rasa-lavana' },
  tikta: { label: 'Tikta (Bitter)', color: 'bg-rasa-tikta' },
  katu: { label: 'Katu (Pungent)', color: 'bg-rasa-katu' },
  kashaya: { label: 'Kashaya (Astringent)', color: 'bg-rasa-kashaya' },
} as const;

export function RasaBars({ intensities }: RasaBarsProps) {
  return (
    <div className="space-y-4">
      {Object.entries(rasaConfig).map(([key, config]) => {
        const intensity = intensities[key as keyof RasaIntensities];
        const percentage = (intensity / 5) * 100; // Scale to 0-100%
        
        return (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{config.label}</span>
              <span className="font-mono font-semibold">
                {intensity.toFixed(1)}/5.0
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={percentage} 
                className="h-3"
              />
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${config.color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}