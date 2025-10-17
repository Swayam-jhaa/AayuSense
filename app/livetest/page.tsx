"use client"
import React, { useEffect, useState } from 'react';
import { Activity, BarChart3, Cpu, RefreshCw } from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { TopMinistryBar } from '@/components/site/top-ministry-bar';
import { SiteFooter } from '@/components/site/footer';
import { motion } from 'framer-motion';

type SensorData = {
  pH: number;
  TDS: number;
  orp_mV: number;
  turbidity: number;
  temperature: number;
};

type AIResponse = {
  summary: string;
  chartData: any;
};

const ESP32_API_URL = "http://esp32.local/api/sensors"; // replace with your ESP32 endpoint
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA-lIPCXS7JPXUzOa8rKk7YNz6H1fjSg6w"; // Use full Gemini endpoint

// use shared navbar; drop local nav links and sidebar

const MOCK_SENSOR_DATA: SensorData = {
  pH: 7.2,
  TDS: 350,
  orp_mV: 210,
  turbidity: 0.12,
  temperature: 25.3,
};

const BackendPage: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [aiResult, setAIResult] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    setLoading(true);
    setError(null);
    let data: SensorData | null = null;
    try {
      const res = await fetch(ESP32_API_URL);
      if (!res.ok) throw new Error("ESP32 found! ");
      data = await res.json();
      setSensorData(data);
    } catch (err: any) {
      // Use mock data if ESP32 fetch fails
      data = MOCK_SENSOR_DATA;
      setSensorData(data);
      setError("Preparing Analysis");
    }

    try {
      // Improved prompt for Gemini: ask for markdown, clear sections, and a summary table
      const geminiRes = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    `Given the following sensor data: ${JSON.stringify(data)}\n` +
                    "Present the analysis as a well-formatted Markdown report with the following sections:\n" +
                    "1. A summary table of the sensor values.\n" +
                    "2. A concise summary paragraph.\n" +
                    "3. Herb Recommendation (with scientific name in italics).\n" +
                    "4. Uses and Health Benefits (as a bullet list).\n" +
                    "5. Suggest a suitable chart/visualization type for this data.\n" +
                    "Use clear headings (##) for each section. Make the report visually structured and easy to read."
                }
              ]
            }
          ]
        }),
      });
      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        throw new Error(`Gemini AI analysis failed: ${errText}`);
      }
      const geminiData = await geminiRes.json();

      setAIResult({
        summary: geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No summary",
        chartData: data // You can parse/transform as needed
      });
    } catch (err: any) {
      setError("AI analysis failed.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSensorData();
    // Optionally poll every X seconds:
    // const interval = setInterval(fetchSensorData, 5000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <TopMinistryBar />
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center tracking-tight">
              <Activity className="mr-3 h-9 w-9 text-emerald-600" />
              Live Test
            </h1>
            <p className="text-base md:text-lg text-gray-700 font-medium">
              Stream sensor data and get instant AI insights.
            </p>
          </div>
          <button
            className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            onClick={fetchSensorData}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-6 w-6 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="mb-4 flex items-center text-emerald-700 text-xl font-bold">
              <Cpu className="mr-2 h-6 w-6" />
              Raw Sensor Data
            </h2>
            {sensorData ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {Object.entries(sensorData).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl bg-emerald-50/60 px-4 py-3 flex flex-col items-center border border-emerald-100 shadow-sm"
                  >
                    <span className="uppercase text-xs text-emerald-700 font-semibold tracking-wide">{key}</span>
                    <span className="text-2xl font-mono font-bold text-emerald-900">{typeof value === 'number' ? value.toFixed(3) : value}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No data received from ESP32 yet.</div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-2xl border border-teal-100 bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="mb-4 flex items-center text-teal-700 text-xl font-bold">
              <BarChart3 className="mr-2 h-6 w-6" />
              AI Analysis
            </h2>
            {aiResult ? (
              <>
                <div className="mb-4 text-gray-700 whitespace-pre-line font-medium leading-relaxed">
                  {aiResult.summary}
                </div>
                <pre className="bg-teal-50 rounded-lg p-3 text-xs overflow-x-auto border border-teal-100">{JSON.stringify(aiResult.chartData, null, 2)}</pre>
              </>
            ) : (
              <div className="text-gray-400">No AI analysis available.</div>
            )}
          </motion.section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default BackendPage;