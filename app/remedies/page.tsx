"use client"
import { Navbar } from '@/components/site/navbar';
import { TopMinistryBar } from '@/components/site/top-ministry-bar';
import { SiteFooter } from '@/components/site/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker } from 'lucide-react';
import { mockHerbProfiles } from '@/types/data';

export default function RemediesPage() {
  const herbs = mockHerbProfiles;

  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <TopMinistryBar />
      <Navbar />

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 md:mb-8 text-center">
            <p className="text-sm font-semibold text-orange-600 tracking-wide"></p>
            <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-gray-900">Ayurvedic Remedies</h1>
            <p className="mt-2 text-gray-700">Explore curated herb profiles, rasa, and key uses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {herbs.map((herb) => (
              <Card key={herb.herb_id} className="border-green-100 bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{herb.name}</span>
                    <Beaker className="h-5 w-5 text-emerald-600" />
                  </CardTitle>
                  <p className="text-xs italic text-gray-600">{herb.scientific_name}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 line-clamp-3">{herb.description}</p>
                  {herb.ayurvedic_properties?.rasa?.length ? (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Rasa</p>
                      <div className="flex flex-wrap gap-2">
                        {herb.ayurvedic_properties.rasa.map((rasa, idx) => (
                          <Badge key={idx} variant="secondary">{rasa}</Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {herb.quality_indicators?.adulteration_markers?.length ? (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Watchouts</p>
                      <div className="flex flex-wrap gap-1.5">
                        {herb.quality_indicators.adulteration_markers.slice(0,3).map((m, idx) => (
                          <Badge key={idx} variant="outline">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}