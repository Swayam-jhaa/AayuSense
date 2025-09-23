import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Beaker } from 'lucide-react';
import { mockHerbProfiles } from '@/types/data';
import Link from 'next/link';
//import { Link } from 'react-router-dom';

export default function HerbsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [herbs] = useState(mockHerbProfiles);

  const filteredHerbs = herbs.filter(herb =>
    herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    herb.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Herb Profiles</h1>
        <p className="text-muted-foreground">
          Comprehensive database of medicinal herbs with Ayurvedic properties
        </p>
      </div>

      {/* Search */}
      <Card className="card-scientific">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search herbs by name, scientific name, or family..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Herbs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHerbs.map((herb) => (
          <Link key={herb.herb_id} href={`/dashboard/reports/${herb.herb_id}`}>
            <Card className="card-scientific hover:shadow-elevated transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Beaker className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{herb.name}</CardTitle>
                </div>
                <p className="text-sm italic text-muted-foreground">
                  {herb.scientific_name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {herb.family}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Primary Rasa:</h4>
                    <div className="flex flex-wrap gap-1">
                      {herb.ayurvedic_properties.rasa.slice(0, 2).map((rasa, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {rasa.split(' ')[0]}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Compounds:</h4>
                    <div className="flex flex-wrap gap-1">
                      {herb.phytochemicals.primary.slice(0, 2).map((compound, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {compound}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {herb.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}