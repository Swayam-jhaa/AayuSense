import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockHerbProfiles, mockDevices } from '@/types/data';
import { MeasureProgress } from './MeasureProgress';
import { Play } from 'lucide-react';

const formSchema = z.object({
  herb_id: z.string().min(1, 'Please select a herb'),
  operator: z.string().min(1, 'Operator name is required'),
  device_id: z.string().min(1, 'Please select a device'),
  extraction_method: z.string().min(1, 'Please select extraction method'),
});

type FormData = z.infer<typeof formSchema>;

interface MeasureFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeasureFormModal({ open, onOpenChange }: MeasureFormModalProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      herb_id: '',
      operator: 'Dr. Arjun Labs',
      device_id: mockDevices.find(d => d.status === 'connected')?.device_id || '',
      extraction_method: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsRunning(true);
    // In a real app, this would call measurementAPI.startMeasurement
    const mockSessionId = `M${Date.now()}`;
    setSessionId(mockSessionId);
  };

  const handleMeasurementComplete = () => {
    setIsRunning(false);
    setSessionId(null);
    form.reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    setIsRunning(false);
    setSessionId(null);
    form.reset();
    onOpenChange(false);
  };

  // Show progress modal if measurement is running
  if (isRunning && sessionId) {
    return (
      <MeasureProgress
        sessionId={sessionId}
        config={form.getValues() as any}
        onComplete={handleMeasurementComplete}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-scientific sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Play className="mr-2 h-5 w-5 text-primary" />
            New Measurement
          </DialogTitle>
          <DialogDescription>
            Configure measurement parameters and start analysis
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Herb Selection */}
            <FormField
              control={form.control}
              name="herb_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Herb Sample</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select herb" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockHerbProfiles.map((herb) => (
                        <SelectItem key={herb.herb_id} value={herb.herb_id}>
                          <div>
                            <div className="font-medium">{herb.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {herb.scientific_name}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Operator */}
            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter operator name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Device Selection */}
            <FormField
              control={form.control}
              name="device_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockDevices
                        .filter(device => device.status === 'connected')
                        .map((device) => (
                          <SelectItem key={device.device_id} value={device.device_id}>
                            <div>
                              <div className="font-medium">{device.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {device.location}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Extraction Method */}
            <FormField
              control={form.control}
              name="extraction_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extraction Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select extraction method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="water">Water Extraction</SelectItem>
                      <SelectItem value="ethanol">Ethanol Extraction</SelectItem>
                      <SelectItem value="methanol">Methanol Extraction</SelectItem>
                      <SelectItem value="acetone">Acetone Extraction</SelectItem>
                      <SelectItem value="hexane">Hexane Extraction</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="gradient-primary text-white"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Measurement
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}