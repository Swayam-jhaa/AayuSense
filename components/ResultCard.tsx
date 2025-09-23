import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileImage, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3
} from 'lucide-react';
import { SampleResult } from '@/types';
import { RasaBars } from './RasaBars';
import { RadarFingerprint } from './RadarFingerprint';
import { AdulterationBadge } from './AdulterationBadge';
import { ShapMini } from './ShapMini';
import { format } from 'date-fns';

interface ResultCardProps {
  sample: SampleResult;
  expanded?: boolean;
}

export function ResultCard({ sample, expanded = false }: ResultCardProps) {
  const [showRawData, setShowRawData] = useState(false);

  const handleExportCSV = () => {
    // In a real app, this would use the exportAPI
    console.log('Exporting CSV for', sample.sample_id);
  };

  const handleExportPNG = () => {
    // In a real app, this would use html2canvas
    console.log('Exporting PNG for', sample.sample_id);
  };

  const getDominantRasas = () => {
    const rasas = Object.entries(sample.rasa_intensities)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);
    return rasas;
  };

  return (
    <Card className={`card-scientific ${expanded ? 'max-w-none' : 'max-w-4xl'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{sample.sample_id}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <span>{sample.herb_name}</span>
              <span>•</span>
              <span>Operator: {sample.operator}</span>
              <span>•</span>
              <span>{format(new Date(sample.timestamp), 'MMM dd, yyyy HH:mm')}</span>
              <span>•</span>
              <span>Device: {sample.device_id}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AdulterationBadge adulteration={sample.adulteration} />
            
            {/* Dominant Rasas */}
            <div className="flex space-x-1">
              {getDominantRasas().map(([rasa, intensity]) => (
                <Badge key={rasa} variant="secondary" className="text-xs">
                  {rasa} ({intensity.toFixed(1)})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rasa Bars */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Rasa Intensity Profile
          </h3>
          <RasaBars intensities={sample.rasa_intensities} />
        </div>

        {/* Radar Chart and SHAP in a grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sensor Fingerprint */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Sensor Fingerprint
            </h3>
            <RadarFingerprint sensors={sample.sensors} />
          </div>

          {/* SHAP Explanation */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Key Contributors
            </h3>
            <ShapMini features={sample.shap} />
            <p className="text-sm text-muted-foreground mt-3">
              {sample.notes}
            </p>
          </div>
        </div>

        {/* Raw Sensor Data (if expanded) */}
        {expanded && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Raw Sensor Data
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowRawData(!showRawData)}
              >
                {showRawData ? 'Hide' : 'Show'} Raw Data
              </Button>
            </div>
            
            {showRawData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                {Object.entries(sample.sensors).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                      {key.replace('_', ' ')}
                    </div>
                    <div className="text-lg font-mono font-semibold">
                      {typeof value === 'number' ? value.toFixed(3) : value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Model: {sample.model_version}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPNG}>
              <FileImage className="mr-2 h-4 w-4" />
              PNG
            </Button>
            {!expanded && (
              <Button variant="outline" size="sm">
                View Raw Traces
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}