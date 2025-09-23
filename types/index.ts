// Core data types for Rassify e-tongue system

export interface SensorData {
  pH: number;
  TDS: number;
  orp_mV: number;
  turbidity: number;
  e1_mV: number;
  e2_mV: number;
  e3_mV: number;
  temp_c: number;
}

export interface RasaIntensities {
  madhura: number;  // Sweet
  amla: number;     // Sour
  lavana: number;   // Salty
  tikta: number;    // Bitter
  katu: number;     // Pungent
  kashaya: number;  // Astringent
}

export interface AdulterationResult {
  score: number;
  is_adulterated: boolean;
  threshold: number;
}

export interface ShapFeature {
  feature: string;
  impact: number;
}

export interface SampleResult {
  sample_id: string;
  herb_id: string;
  herb_name: string;
  operator: string;
  device_id: string;
  timestamp: string;
  sensors: SensorData;
  rasa_intensities: RasaIntensities;
  adulteration: AdulterationResult;
  shap: ShapFeature[];
  model_version: string;
  notes: string;
}

export interface HerbProfile {
  herb_id: string;
  name: string;
  scientific_name: string;
  family: string;
  ayurvedic_properties: {
    rasa: string[];
    virya: string;
    vipaka: string;
    prabhava: string;
  };
  phytochemicals: {
    primary: string[];
    secondary: string[];
  };
  quality_indicators: {
    expected_ranges: Partial<SensorData>;
    adulteration_markers: string[];
  };
  description: string;
}

export interface Device {
  device_id: string;
  name: string;
  status: 'connected' | 'offline' | 'measuring' | 'error';
  last_calibration: string;
  location: string;
}

export type MeasurementStatus = 'idle' | 'running' | 'completed' | 'error';

export interface LiveMeasurement {
  status: MeasurementStatus;
  progress: number;
  current_sensors: Partial<SensorData>;
  elapsed_time: number;
}