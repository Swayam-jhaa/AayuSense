import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, 
  StopCircle, 
  CheckCircle,
  Timer,
  Droplets,
  Zap,
  Thermometer
} from 'lucide-react';
import { LiveMeasurement, SensorData } from '@/types';
import { generateMockSensorReading } from '@/types/data';
import { useToast } from '@/hooks/use-toast';

interface MeasureProgressProps {
  sessionId: string;
  config: {
    herb_id: string;
    operator: string;
    device_id: string;
    extraction_method: string;
  };
  onComplete: () => void;
  onCancel: () => void;
}

export function MeasureProgress({ 
  sessionId, 
  config, 
  onComplete, 
  onCancel 
}: MeasureProgressProps) {
  const [measurement, setMeasurement] = useState<LiveMeasurement>({
    status: 'running',
    progress: 0,
    current_sensors: {},
    elapsed_time: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate measurement progress
      setMeasurement(prev => {
        const newElapsed = prev.elapsed_time + 1;
        const newProgress = Math.min(newElapsed / 25, 1); // 25 second measurement
        const newSensors = generateMockSensorReading();
        
        const newMeasurement: LiveMeasurement = {
          status: newProgress >= 1 ? 'completed' : 'running',
          progress: newProgress,
          current_sensors: newSensors,
          elapsed_time: newElapsed
        };

        // Auto-complete when done
        if (newProgress >= 1 && prev.status === 'running') {
          setTimeout(() => {
            toast({
              title: "Measurement Complete",
              description: "Analysis successful! Results are ready for review.",
            });
            onComplete();
          }, 1000);
        }

        return newMeasurement;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete, toast]);

  const handleCancel = () => {
    toast({
      title: "Measurement Cancelled",
      description: "The measurement has been stopped.",
      variant: "destructive",
    });
    onCancel();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSensorValue = (key: keyof SensorData, value: number | undefined) => {
    if (value === undefined) return '---';
    
    switch (key) {
      case 'pH':
        return value.toFixed(2);
      case 'TDS':
        return `${value.toFixed(0)} μS/cm`;
      case 'orp_mV':
        return `${value.toFixed(0)} mV`;
      case 'turbidity':
        return value.toFixed(3);
      case 'e1_mV':
      case 'e2_mV':
      case 'e3_mV':
        return `${value.toFixed(3)} mV`;
      case 'temp_c':
        return `${value.toFixed(1)} °C`;
      default:
        return value.toString();
    }
  };

  const getSensorIcon = (key: keyof SensorData) => {
    switch (key) {
      case 'pH':
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'TDS':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'orp_mV':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'temp_c':
        return <Thermometer className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  const sensorKeys: (keyof SensorData)[] = [
    'pH', 'TDS', 'orp_mV', 'turbidity', 
    'e1_mV', 'e2_mV', 'e3_mV', 'temp_c'
  ];

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="card-scientific max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {measurement.status === 'completed' ? (
              <CheckCircle className="mr-2 h-5 w-5 text-success" />
            ) : (
              <Activity className="mr-2 h-5 w-5 text-primary animate-pulse" />
            )}
            {measurement.status === 'completed' ? 'Measurement Complete' : 'Measurement in Progress'}
          </DialogTitle>
          <DialogDescription>
            {measurement.status === 'completed' 
              ? 'Analysis complete. Processing results...'
              : 'Real-time sensor data streaming from e-tongue device'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-Medium">
                  {formatTime(measurement.elapsed_time)}
                </span>
              </div>
              <Badge variant="outline" className="measurement-glow">
                {Math.round(measurement.progress * 100)}%
              </Badge>
            </div>
            <Progress value={measurement.progress * 100} className="h-2" />
          </div>

          {/* Live Sensor Data */}
          <div className="grid grid-cols-2 gap-3">
            {sensorKeys.map((key) => (
              <Card key={key} className="border-none shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSensorIcon(key)}
                      <span className="text-sm font-medium">
                        {key.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-mono font-semibold">
                        {formatSensorValue(key, measurement.current_sensors[key])}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            {measurement.status === 'running' && (
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-destructive hover:text-destructive"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}