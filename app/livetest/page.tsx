"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, BarChart3, Cpu, RefreshCw, Database, Home, Zap } from 'lucide-react';
import Image from 'next/image';

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
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBM0Fk-qk001bdsTXK0QsZqtZt_XIAWqVM"; // Use full Gemini endpoint

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="mr-2 h-5 w-5" /> },
  { href: "/dashboard", label: "Dashboard", icon: <BarChart3 className="mr-2 h-5 w-5" /> },
  { href: "/livetest", label: "LiveTest", icon: <Zap className="mr-2 h-5 w-5" /> },
  { href: "/remedies", label: "Remedies", icon: <Cpu className="mr-2 h-5 w-5" /> },
  { href: "/about", label: "About", icon: <Database className="mr-2 h-5 w-5" /> },
];

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
      if (!res.ok) throw new Error("Failed to fetch ESP32 data");
      data = await res.json();
      setSensorData(data);
    } catch (err: any) {
      // Use mock data if ESP32 fetch fails
      data = MOCK_SENSOR_DATA;
      setSensorData(data);
      setError("ESP32 not connected. Using mock data.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcf8] via-[#eaf6ff] to-[#f3f0ff] flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center space-x-3">
          <Image src={"/images/ayurveda.png"} alt="Logo" width={36} height={36} className="h-9 w-9 rounded-md border border-green-100 shadow" />
          <span className="font-extrabold text-2xl text-primary tracking-tight">AayuSense</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <button
              className="gradient-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
            >
              Dashboard
            </button>
          </Link>
          <Link href="/livetest">
            <button
              className="bg-accent text-white px-4 py-2 rounded-lg font-semibold shadow hover:brightness-110 transition"
              style={{ background: "linear-gradient(90deg, oklch(0.65 0.18 250), oklch(0.85 0.15 80))" }}
            >
              LiveTest
            </button>
          </Link>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-white/80 border-r border-gray-200 py-10 px-5 shadow-sm">
          <div className="mb-10">
            <span className="text-lg font-bold text-primary tracking-wide">Navigation</span>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center px-3 py-2 rounded-lg hover:bg-primary/10 font-medium text-gray-700 transition">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-2 md:px-10 py-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-primary mb-2 flex items-center tracking-tight">
                <Activity className="mr-2 h-9 w-9 text-accent" />
                Live ESP32 AI Analysis
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Connects to your ESP32, sends sensor data to AI, and visualizes the results.
              </p>
            </div>
            <button
              className="flex items-center gradient-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-lg"
              onClick={fetchSensorData}
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-6 w-6 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading..." : "Refresh Data"}
            </button>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium shadow">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Raw Sensor Data */}
            <section className="dashboard-card p-8 flex flex-col shadow-xl rounded-2xl border border-primary/10 bg-white/90">
              <h2 className="dashboard-section-title mb-4 flex items-center text-blue-700 text-xl font-bold">
                <Cpu className="mr-2 h-6 w-6" />
                Raw Sensor Data
              </h2>
              {sensorData ? (
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(sensorData).map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-blue-50 px-4 py-3 flex flex-col items-center shadow-sm border border-blue-100">
                      <span className="uppercase text-xs text-blue-700 font-semibold tracking-wide">{key}</span>
                      <span className="text-2xl font-mono font-bold text-blue-900">{typeof value === 'number' ? value.toFixed(3) : value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No data received from ESP32 yet.</div>
              )}
            </section>

            {/* AI Analysis */}
            <section className="dashboard-card p-8 flex flex-col shadow-xl rounded-2xl border border-accent/10 bg-white/90">
              <h2 className="dashboard-section-title mb-4 flex items-center text-green-700 text-xl font-bold">
                <BarChart3 className="mr-2 h-6 w-6" />
                AI Analysis
              </h2>
              {aiResult ? (
                <>
                  <div className="mb-4 text-gray-700 whitespace-pre-line font-medium leading-relaxed">
                    {aiResult.summary}
                  </div>
                  {/* Replace below with your chart component */}
                  <pre className="bg-green-50 rounded-lg p-3 text-xs overflow-x-auto border border-green-100">{JSON.stringify(aiResult.chartData, null, 2)}</pre>
                </>
              ) : (
                <div className="text-gray-400">No AI analysis available.</div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BackendPage;