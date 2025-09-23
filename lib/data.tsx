//import { SampleResult, HerbProfile, Device, SensorData } from '../types';

import { Device, HerbProfile, SampleResult, SensorData } from "@/types";

// Mock sample results
export const mockSampleResults: SampleResult[] = [
  {
    sample_id: "S20250916-01",
    herb_id: "H001",
    herb_name: "Neem (Azadirachta indica)",
    operator: "Aman",
    device_id: "ESP32-01",
    timestamp: "2025-09-16T09:12:00Z",
    sensors: {
      pH: 6.1,
      cond_uS_cm: 210,
      orp_mV: 345,
      turbidity: 0.14,
      e1_mV: 0.120,
      e2_mV: 0.080,
      e3_mV: 0.220,
      temp_c: 25.2
    },
    rasa_intensities: {
      madhura: 0.2,
      amla: 0.6,
      lavana: 0.1,
      tikta: 4.3,
      katu: 0.8,
      kashaya: 3.5
    },
    adulteration: {
      score: 0.12,
      is_adulterated: false,
      threshold: 0.5
    },
    shap: [
      { feature: "e3_mV", impact: 0.38 },
      { feature: "pH", impact: 0.31 },
      { feature: "turbidity", impact: 0.15 }
    ],
    model_version: "v1.0.0",
    notes: "Matches expected neem profile; no adulteration detected"
  },
  {
    sample_id: "S20250916-02",
    herb_id: "H002",
    herb_name: "Turmeric (Curcuma longa)",
    operator: "Priya",
    device_id: "ESP32-01",
    timestamp: "2025-09-16T10:30:00Z",
    sensors: {
      pH: 5.8,
      cond_uS_cm: 180,
      orp_mV: 290,
      turbidity: 0.22,
      e1_mV: 0.180,
      e2_mV: 0.150,
      e3_mV: 0.190,
      temp_c: 24.8
    },
    rasa_intensities: {
      madhura: 1.2,
      amla: 0.3,
      lavana: 0.2,
      tikta: 3.8,
      katu: 2.1,
      kashaya: 1.4
    },
    adulteration: {
      score: 0.76,
      is_adulterated: true,
      threshold: 0.5
    },
    shap: [
      { feature: "cond_uS_cm", impact: 0.42 },
      { feature: "e1_mV", impact: 0.35 },
      { feature: "pH", impact: 0.23 }
    ],
    model_version: "v1.0.0",
    notes: "High adulteration probability detected - likely starch addition"
  },
  {
    sample_id: "S20250916-03",
    herb_id: "H003",
    herb_name: "Ashwagandha (Withania somnifera)",
    operator: "Rahul",
    device_id: "ESP32-02",
    timestamp: "2025-09-16T14:15:00Z",
    sensors: {
      pH: 6.5,
      cond_uS_cm: 155,
      orp_mV: 320,
      turbidity: 0.08,
      e1_mV: 0.095,
      e2_mV: 0.065,
      e3_mV: 0.140,
      temp_c: 25.5
    },
    rasa_intensities: {
      madhura: 2.8,
      amla: 0.4,
      lavana: 0.3,
      tikta: 2.2,
      katu: 0.5,
      kashaya: 1.8
    },
    adulteration: {
      score: 0.28,
      is_adulterated: false,
      threshold: 0.5
    },
    shap: [
      { feature: "turbidity", impact: 0.45 },
      { feature: "e2_mV", impact: 0.32 },
      { feature: "orp_mV", impact: 0.23 }
    ],
    model_version: "v1.0.0",
    notes: "Pure ashwagandha sample with expected sweet-bitter profile"
  }
];

// Mock herb profiles
export const mockHerbProfiles: HerbProfile[] = [
  {
    herb_id: "H001",
    name: "Neem",
    scientific_name: "Azadirachta indica",
    family: "Meliaceae",
    ayurvedic_properties: {
      rasa: ["Tikta (Bitter)", "Kashaya (Astringent)"],
      virya: "Shita (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Kushthaghna (Skin disorders)"
    },
    phytochemicals: {
      primary: ["Azadirachtin", "Nimbin", "Nimbidin", "Gedunin"],
      secondary: ["Quercetin", "Beta-sitosterol", "Limonoids"]
    },
    quality_indicators: {
      expected_ranges: {
        pH: 6.0,
        cond_uS_cm: 200,
        orp_mV: 340,
        turbidity: 0.15
      },
      adulteration_markers: ["High starch content", "Synthetic bitter compounds"]
    },
    description: "Neem is a powerful bitter herb with strong antimicrobial properties, traditionally used for skin disorders and blood purification."
  },
  {
    herb_id: "H002",
    name: "Turmeric",
    scientific_name: "Curcuma longa",
    family: "Zingiberaceae",
    ayurvedic_properties: {
      rasa: ["Tikta (Bitter)", "Katu (Pungent)", "Kashaya (Astringent)"],
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Varnya (Complexion enhancer)"
    },
    phytochemicals: {
      primary: ["Curcumin", "Demethoxycurcumin", "Bisdemethoxycurcumin"],
      secondary: ["Turmerone", "Atlantone", "Zingiberene"]
    },
    quality_indicators: {
      expected_ranges: {
        pH: 5.8,
        cond_uS_cm: 160,
        orp_mV: 280,
        turbidity: 0.20
      },
      adulteration_markers: ["Artificial colors", "Lead chromate", "Metanil yellow"]
    },
    description: "Turmeric is the golden spice of Ayurveda, renowned for its anti-inflammatory and healing properties."
  },
  {
    herb_id: "H003",
    name: "Ashwagandha",
    scientific_name: "Withania somnifera",
    family: "Solanaceae",
    ayurvedic_properties: {
      rasa: ["Madhura (Sweet)", "Tikta (Bitter)", "Kashaya (Astringent)"],
      virya: "Ushna (Hot)",
      vipaka: "Madhura (Sweet)",
      prabhava: "Balya (Strength giving)"
    },
    phytochemicals: {
      primary: ["Withanolides", "Withanoside", "Withaferins"],
      secondary: ["Alkaloids", "Saponins", "Phenolic compounds"]
    },
    quality_indicators: {
      expected_ranges: {
        pH: 6.5,
        cond_uS_cm: 150,
        orp_mV: 320,
        turbidity: 0.10
      },
      adulteration_markers: ["Root powder dilution", "Other Withania species"]
    },
    description: "Ashwagandha is the premier adaptogenic herb, known for enhancing vitality and managing stress."
  }
];

// Mock devices
export const mockDevices: Device[] = [
  {
    device_id: "ESP32-01",
    name: "Lab Station Alpha",
    status: "connected",
    last_calibration: "2025-09-15T08:00:00Z",
    location: "Main Laboratory"
  },
  {
    device_id: "ESP32-02",
    name: "Field Unit Beta",
    status: "connected",
    last_calibration: "2025-09-14T14:30:00Z",
    location: "Field Station"
  },
  {
    device_id: "ESP32-03",
    name: "QC Station Gamma",
    status: "offline",
    last_calibration: "2025-09-10T10:15:00Z",
    location: "Quality Control Lab"
  }
];

// Generate mock streaming sensor data
export const generateMockSensorReading = (baseValues: Partial<SensorData> = {}): SensorData => {
  const defaults = {
    pH: 6.0,
    cond_uS_cm: 180,
    orp_mV: 320,
    turbidity: 0.15,
    e1_mV: 0.120,
    e2_mV: 0.080,
    e3_mV: 0.180,
    temp_c: 25.0
  };

  const addNoise = (value: number, noiseLevel: number = 0.05) => {
    return value + (Math.random() - 0.5) * 2 * value * noiseLevel;
  };

  return {
    pH: addNoise(baseValues.pH || defaults.pH, 0.02),
    cond_uS_cm: addNoise(baseValues.cond_uS_cm || defaults.cond_uS_cm, 0.1),
    orp_mV: addNoise(baseValues.orp_mV || defaults.orp_mV, 0.05),
    turbidity: addNoise(baseValues.turbidity || defaults.turbidity, 0.15),
    e1_mV: addNoise(baseValues.e1_mV || defaults.e1_mV, 0.1),
    e2_mV: addNoise(baseValues.e2_mV || defaults.e2_mV, 0.1),
    e3_mV: addNoise(baseValues.e3_mV || defaults.e3_mV, 0.1),
    temp_c: addNoise(baseValues.temp_c || defaults.temp_c, 0.02)
  };
};