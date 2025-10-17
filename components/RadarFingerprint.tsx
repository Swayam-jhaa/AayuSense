import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { SensorData } from '@/types';

interface RadarFingerprintProps {
  sensors: SensorData;
}

export function RadarFingerprint({ sensors }: RadarFingerprintProps) {
  // Normalize sensor values to 0-1 scale for visualization
  const normalizeValue = (value: number, min: number, max: number) => {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  };

  const data = [
    {
      axis: 'pH',
      value: normalizeValue(sensors.pH, 3, 11),
      fullMark: 1,
    },
    {
      axis: 'Conductivity',
      value: normalizeValue(sensors.TDS, 0, 1000),
      fullMark: 1,
    },
    {
      axis: 'ORP',
      value: normalizeValue(sensors.orp_mV, -200, 600),
      fullMark: 1,
    },
    {
      axis: 'Turbidity',
      value: normalizeValue(sensors.turbidity, 0, 1),
      fullMark: 1,
    },
    {
      axis: 'Reduction Value',
      value: normalizeValue(sensors.Reduction_value, -0.5, 0.5),
      fullMark: 1,
    },
    {
      axis: 'Ionic value',
      value: normalizeValue(sensors.Ionic_value, -0.5, 0.5),
      fullMark: 1,
    },
    {
      axis: 'Salt content',
      value: normalizeValue(sensors.Salt_content, -0.5, 0.5),
      fullMark: 1,
    },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid gridType="polygon" stroke="#d1d5db" /> {/* light gray grid */}
          <PolarAngleAxis 
            dataKey="axis" 
            tick={{ fontSize: 12, fill: "#6b7280" }} // gray-500
            className="text-xs"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 1]} 
            tick={false}
            axisLine={false}
            stroke="#d1d5db"
          />
          <Radar
            name="Sensor Values"
            dataKey="value"
            stroke="#6d28d9" // purple-700
            fill="#a78bfa"   // purple-300
            fillOpacity={0.5}
            strokeWidth={3}
            dot={{ r: 4, fill: "#6d28d9" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}