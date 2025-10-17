"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, TrendingUp } from 'lucide-react';
import { ResultCard } from '@/components/ResultCard';
import Link from 'next/link';
import { mockSampleResults } from '@/types/data';
import { Navbar } from '@/components/site/navbar';
import { TopMinistryBar } from '@/components/site/top-ministry-bar';
import { SiteFooter } from '@/components/site/footer';

export default function ResultsPage() {
  const [recentResults] = useState(mockSampleResults.slice(0, 3));

  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <TopMinistryBar />
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center">
            <Clock className="mr-3 h-9 w-9 text-emerald-600" />
            Results
          </h1>
          <Link href="/dashboard/reports" className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition">
            View All History
          </Link>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {[{ label: "Today's Measurements", value: '12', icon: Activity, color: 'emerald' }, { label: 'Adulterated Samples', value: '3', icon: TrendingUp, color: 'amber' }, { label: 'Active Devices', value: '2', icon: Activity, color: 'green' }].map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{m.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                </div>
                <m.icon className="h-8 w-8 text-emerald-600" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold flex items-center"
        >
          <Clock className="mr-2 h-6 w-6" />
          Recent Results
        </motion.h2>

        <div className="w-full max-w-5xl space-y-4">
          {recentResults.map((sample, idx) => (
            <motion.div
              key={sample.sample_id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="mx-auto w-full"
            >
              <ResultCard sample={sample} />
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
