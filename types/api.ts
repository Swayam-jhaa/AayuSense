// Mock API services for Rassify dashboard
import { SampleResult, HerbProfile, Device, LiveMeasurement, SensorData } from '../types';
import { mockSampleResults, mockHerbProfiles, mockDevices, generateMockSensorReading } from './data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sample Results API
export const sampleAPI = {
  // Get all samples with optional filtering
  getSamples: async (filters?: {
    herb_id?: string;
    operator?: string;
    date_from?: string;
    date_to?: string;
    adulterated_only?: boolean;
  }): Promise<SampleResult[]> => {
    await delay(300);
    
    let results = [...mockSampleResults];
    
    if (filters?.herb_id) {
      results = results.filter(r => r.herb_id === filters.herb_id);
    }
    
    if (filters?.operator) {
      results = results.filter(r => r.operator.toLowerCase().includes(filters.operator!.toLowerCase()));
    }
    
    if (filters?.adulterated_only) {
      results = results.filter(r => r.adulteration.is_adulterated);
    }
    
    return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // Get a specific sample by ID
  getSample: async (sampleId: string): Promise<SampleResult | null> => {
    await delay(200);
    return mockSampleResults.find(r => r.sample_id === sampleId) || null;
  },

  // Create a new sample (mock - returns the created sample)
  createSample: async (sampleData: Partial<SampleResult>): Promise<SampleResult> => {
    await delay(500);
    
    const newSample: SampleResult = {
      sample_id: `S${Date.now()}`,
      herb_id: sampleData.herb_id || 'H001',
      herb_name: sampleData.herb_name || 'Unknown Herb',
      operator: sampleData.operator || 'Unknown',
      device_id: sampleData.device_id || 'ESP32-01',
      timestamp: new Date().toISOString(),
      sensors: sampleData.sensors || generateMockSensorReading(),
      rasa_intensities: sampleData.rasa_intensities || {
        madhura: Math.random() * 5,
        amla: Math.random() * 5,
        lavana: Math.random() * 5,
        tikta: Math.random() * 5,
        katu: Math.random() * 5,
        kashaya: Math.random() * 5,
      },
      adulteration: sampleData.adulteration || {
        score: Math.random(),
        is_adulterated: Math.random() > 0.7,
        threshold: 0.5
      },
      shap: sampleData.shap || [
        { feature: "pH", impact: Math.random() * 0.5 },
        { feature: "Reduction_value", impact: Math.random() * 0.5 },
        { feature: "turbidity", impact: Math.random() * 0.3 }
      ],
      model_version: "v1.0.0",
      notes: sampleData.notes || "Automated measurement"
    };
    
    // In a real app, this would save to the backend
    mockSampleResults.unshift(newSample);
    return newSample;
  }
};

// Herb Profiles API
export const herbAPI = {
  // Get all herb profiles
  getHerbs: async (): Promise<HerbProfile[]> => {
    await delay(200);
    return [...mockHerbProfiles];
  },

  // Get a specific herb profile
  getHerb: async (herbId: string): Promise<HerbProfile | null> => {
    await delay(150);
    return mockHerbProfiles.find(h => h.herb_id === herbId) || null;
  },

  // Search herbs by name
  searchHerbs: async (query: string): Promise<HerbProfile[]> => {
    await delay(100);
    const normalizedQuery = query.toLowerCase();
    return mockHerbProfiles.filter(h => 
      h.name.toLowerCase().includes(normalizedQuery) ||
      h.scientific_name.toLowerCase().includes(normalizedQuery)
    );
  }
};

// Device Management API
export const deviceAPI = {
  // Get all devices
  getDevices: async (): Promise<Device[]> => {
    await delay(150);
    return [...mockDevices];
  },

  // Get a specific device
  getDevice: async (deviceId: string): Promise<Device | null> => {
    await delay(100);
    return mockDevices.find(d => d.device_id === deviceId) || null;
  },

  // Update device status
  updateDeviceStatus: async (deviceId: string, status: Device['status']): Promise<Device | null> => {
    await delay(200);
    const device = mockDevices.find(d => d.device_id === deviceId);
    if (device) {
      device.status = status;
      return { ...device };
    }
    return null;
  }
};

// Live Measurement API
export const measurementAPI = {
  // Start a new measurement
  startMeasurement: async (config: {
    herb_id: string;
    operator: string;
    device_id: string;
    extraction_method: string;
  }): Promise<string> => {
    await delay(300);
    
    // Update device status to measuring
    await deviceAPI.updateDeviceStatus(config.device_id, 'measuring');
    
    // Return a measurement session ID
    return `M${Date.now()}`;
  },

  // Get live measurement data (simulates streaming)
  getLiveMeasurement: async (sessionId: string): Promise<LiveMeasurement> => {
    await delay(100);
    
    // Simulate different stages of measurement
    const elapsed = Math.floor(Date.now() / 1000) % 30; // 30 second cycle
    const progress = Math.min(elapsed / 25, 1); // Complete in 25 seconds
    
    let status: LiveMeasurement['status'] = 'running';
    if (progress >= 1) {
      status = 'completed';
    }
    
    return {
      status,
      progress,
      current_sensors: generateMockSensorReading(),
      elapsed_time: elapsed
    };
  },

  // Cancel a measurement
  cancelMeasurement: async (sessionId: string, deviceId: string): Promise<void> => {
    await delay(200);
    await deviceAPI.updateDeviceStatus(deviceId, 'connected');
  },

  // Complete measurement and get final results
  completeMeasurement: async (sessionId: string, config: {
    herb_id: string;
    operator: string;
    device_id: string;
    extraction_method: string;
  }): Promise<SampleResult> => {
    await delay(1000);
    
    // Reset device status
    await deviceAPI.updateDeviceStatus(config.device_id, 'connected');
    
    // Generate final result
    const herb = await herbAPI.getHerb(config.herb_id);
    const finalSensorData = generateMockSensorReading(herb?.quality_indicators.expected_ranges);
    
    return await sampleAPI.createSample({
      herb_id: config.herb_id,
      herb_name: herb?.name || 'Unknown Herb',
      operator: config.operator,
      device_id: config.device_id,
      sensors: finalSensorData,
      notes: `Measurement completed using ${config.extraction_method} extraction`
    });
  }
};

// Export helpers for CSV and PNG
export const exportAPI = {
  // Generate CSV data for a sample
  generateCSV: (samples: SampleResult[]): string => {
    const headers = [
      'Sample ID', 'Herb Name', 'Operator', 'Device ID', 'Timestamp',
      'pH', 'Conductivity (μS/cm)', 'ORP (mV)', 'Turbidity', 'E1 (mV)', 'E2 (mV)', 'E3 (mV)', 'Temperature (°C)',
      'Madhura', 'Amla', 'Lavana', 'Tikta', 'Katu', 'Kashaya',
      'Adulteration Score', 'Is Adulterated', 'Notes'
    ];
    
    const rows = samples.map(sample => [
      sample.sample_id,
      sample.herb_name,
      sample.operator,
      sample.device_id,
      sample.timestamp,
      sample.sensors.pH.toFixed(2),
      sample.sensors.TDS.toFixed(0),
      sample.sensors.orp_mV.toFixed(0),
      sample.sensors.turbidity.toFixed(3),
      sample.sensors.Reduction_value.toFixed(3),
      sample.sensors.Ionic_value.toFixed(3),
      sample.sensors.Salt_content.toFixed(3),
      sample.sensors.temp_c.toFixed(1),
      sample.rasa_intensities.madhura.toFixed(1),
      sample.rasa_intensities.amla.toFixed(1),
      sample.rasa_intensities.lavana.toFixed(1),
      sample.rasa_intensities.tikta.toFixed(1),
      sample.rasa_intensities.katu.toFixed(1),
      sample.rasa_intensities.kashaya.toFixed(1),
      sample.adulteration.score.toFixed(3),
      sample.adulteration.is_adulterated ? 'Yes' : 'No',
      sample.notes
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
};