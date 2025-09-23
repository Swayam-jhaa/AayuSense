import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, TrendingUp } from 'lucide-react';
import { ResultCard } from '@/components/ResultCard';
import { mockSampleResults } from '@/types/data';
import Link from 'next/link';


const Index = () => {
  const [recentResults] = useState(mockSampleResults.slice(0, 3));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Quick Scan Dashboard</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Advanced e-tongue analysis for herb quality assessment
        </p>
        <Button size="lg" className="gradient-primary text-white">
          <Activity className="mr-2 h-5 w-5" />
          Start New Measurement
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-scientific">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Measurements</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-scientific">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Adulterated Samples</p>
                <p className="text-3xl font-bold text-warning">3</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-scientific">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Devices</p>
                <p className="text-3xl font-bold text-success">2</p>
              </div>
              <Badge className="bg-status-connected text-white">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <Clock className="mr-2 h-6 w-6" />
            Recent Results
          </h2>
          <Link href="/history">
            <Button variant="outline">View All History</Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentResults.map((sample) => (
            <ResultCard key={sample.sample_id} sample={sample} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
