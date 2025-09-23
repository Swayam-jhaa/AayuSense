"use client"
//import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Beaker, Activity, AlertTriangle } from 'lucide-react';
import { mockHerbProfiles } from '@/types/data';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function HerbProfile() {
  const { id } = useParams<{ id: string }>();
  const herb = mockHerbProfiles.find(h => h.herb_id === id);

  if (!herb) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Herb Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The herb profile with ID "{id}" could not be found.
          </p>
          <Link href="/herbs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Herbs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/herbs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{herb.name}</h1>
          <p className="text-muted-foreground italic">
            {herb.scientific_name} • Family: {herb.family}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <Card className="card-scientific">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Beaker className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{herb.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Botanical Classification</h4>
              <div className="space-y-1">
                <p><span className="font-medium">Scientific Name:</span> {herb.scientific_name}</p>
                <p><span className="font-medium">Family:</span> {herb.family}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ayurvedic Properties */}
        <Card className="card-scientific">
          <CardHeader>
            <CardTitle>Ayurvedic Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Rasa (Taste)</h4>
              <div className="flex flex-wrap gap-2">
                {herb.ayurvedic_properties.rasa.map((rasa, index) => (
                  <Badge key={index} variant="secondary">
                    {rasa}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Virya (Potency)</h4>
                <p className="text-sm text-muted-foreground">
                  {herb.ayurvedic_properties.virya}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Vipaka (Post-digestive effect)</h4>
                <p className="text-sm text-muted-foreground">
                  {herb.ayurvedic_properties.vipaka}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-1">Prabhava (Special effect)</h4>
              <p className="text-sm text-muted-foreground">
                {herb.ayurvedic_properties.prabhava}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Phytochemicals */}
        <Card className="card-scientific">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Phytochemical Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Primary Compounds</h4>
              <div className="flex flex-wrap gap-2">
                {herb.phytochemicals.primary.map((compound, index) => (
                  <Badge key={index} variant="default">
                    {compound}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Secondary Compounds</h4>
              <div className="flex flex-wrap gap-2">
                {herb.phytochemicals.secondary.map((compound, index) => (
                  <Badge key={index} variant="outline">
                    {compound}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Indicators */}
        <Card className="card-scientific">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Quality & Adulteration Markers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Expected Sensor Ranges</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(herb.quality_indicators.expected_ranges).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key.toUpperCase()}:</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Common Adulterants</h4>
              <div className="space-y-1">
                {herb.quality_indicators.adulteration_markers.map((marker, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-warning mr-2" />
                    {marker}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}