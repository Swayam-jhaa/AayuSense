import { Progress } from '@/components/ui/progress';
import { ShapFeature } from '@/types';

interface ShapMiniProps {
  features: ShapFeature[];
}

export function ShapMini({ features }: ShapMiniProps) {
  // Take top 3 features and sort by impact
  const topFeatures = features
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3);

  const maxImpact = Math.max(...topFeatures.map(f => Math.abs(f.impact)));

  return (
    <div className="space-y-3">
      {topFeatures.map((feature, index) => {
        const percentage = (Math.abs(feature.impact) / maxImpact) * 100;
        const isPositive = feature.impact > 0;
        
        return (
          <div key={feature.feature} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium capitalize">
                {feature.feature.replace('_', ' ')}
              </span>
              <span className={`font-mono text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{(feature.impact * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={percentage} 
                className="h-2"
              />
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                  isPositive ? 'bg-success' : 'bg-destructive'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
      
      <p className="text-xs text-muted-foreground mt-2">
        Features contributing most to the classification result
      </p>
    </div>
  );
}