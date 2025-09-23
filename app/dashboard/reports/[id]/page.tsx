"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/ResultCard"
import { mockSampleResults, mockHerbProfiles } from "@/types/data"
import { ArrowLeft, Beaker } from "lucide-react"

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>()

  const herb = mockHerbProfiles.find(h => h.herb_id === id)
  const samples = mockSampleResults.filter(s => s.herb_id === id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Beaker className="h-6 w-6 text-(--color-brand)" />
            {herb ? herb.name : "Herb Report"}
          </h1>
          {herb && (
            <p className="text-muted-foreground italic">{herb.scientific_name}</p>
          )}
        </div>
        <Link href="/dashboard/reports">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {samples.length > 0 ? (
          samples.map(sample => (
            <ResultCard key={sample.sample_id} sample={sample} />
          ))
        ) : (
          <p className="text-muted-foreground">No samples yet for this herb.</p>
        )}
      </div>
    </div>
  )
}


