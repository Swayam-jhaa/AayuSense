import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AdulterationResult } from '@/types';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AdulterationBadgeProps {
  adulteration: AdulterationResult;
}

export function AdulterationBadge({ adulteration }: AdulterationBadgeProps) {
  const getLevel = () => {
    if (adulteration.score < 0.3) return 'safe';
    if (adulteration.score < 0.7) return 'warning';
    return 'danger';
  };

  const level = getLevel();
  
  const config = {
    safe: {
      label: 'Pure',
      icon: CheckCircle,
      className: 'bg-adulteration-safe text-white border-none',
      tooltip: 'Sample appears to be pure with no significant adulteration detected'
    },
    warning: {
      label: 'Suspicious',
      icon: AlertTriangle,
      className: 'bg-adulteration-warning text-white border-none',
      tooltip: 'Potential adulteration detected - requires further investigation'
    },
    danger: {
      label: 'Adulterated',
      icon: XCircle,
      className: 'bg-adulteration-danger text-white border-none',
      tooltip: 'High probability of adulteration - sample rejected'
    }
  };

  const currentConfig = config[level];
  const Icon = currentConfig.icon;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge className={currentConfig.className}>
          <Icon className="mr-1 h-3 w-3" />
          {currentConfig.label}
          <span className="ml-1 text-xs">
            ({(adulteration.score * 100).toFixed(0)}%)
          </span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p>{currentConfig.tooltip}</p>
          <p className="text-xs">
            Score: {adulteration.score.toFixed(3)} (threshold: {adulteration.threshold})
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}