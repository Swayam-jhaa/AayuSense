import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  Zap,
  User,
  Settings,
  LogOut 
} from 'lucide-react';
import { mockDevices } from '@/types/data';
import { Device } from '@/types';

interface TopBarProps {
  onMeasureClick: () => void;
}

export function TopBar({ onMeasureClick }: TopBarProps) {
  const [selectedDevice, setSelectedDevice] = useState<Device>(mockDevices[0]);

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-status-connected" />;
      case 'measuring':
        return <Activity className="h-4 w-4 text-status-measuring animate-pulse" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-status-error" />;
      default:
        return <WifiOff className="h-4 w-4 text-status-offline" />;
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-status-connected';
      case 'measuring':
        return 'bg-status-measuring';
      case 'error':
        return 'bg-status-error';
      default:
        return 'bg-status-offline';
    }
  };

  return (
    <header className="card-scientific border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="gradient-primary rounded-lg p-2">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AayuSense</h1>
            <p className="text-sm text-muted-foreground">The e-Tongue Intelligence</p>
          </div>
        </div>

        {/* Device Status & Controls */}
        <div className="flex items-center space-x-4">
          {/* Device Selector */}
          <div className="flex items-center space-x-2">
            <Select
              value={selectedDevice.device_id}
              onValueChange={(deviceId) => {
                const device = mockDevices.find(d => d.device_id === deviceId);
                if (device) setSelectedDevice(device);
              }}
            >
              <SelectTrigger className="w-48">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedDevice.status)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {mockDevices.map((device) => (
                  <SelectItem key={device.device_id} value={device.device_id}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(device.status)}
                      <span>{device.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Badge 
              variant="outline" 
              className={`${getStatusColor(selectedDevice.status)} text-white border-none`}
            >
              {selectedDevice.status}
            </Badge>
          </div>

          {/* Measure Button */}
          <Button 
            onClick={onMeasureClick}
            className="gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
            disabled={selectedDevice.status !== 'connected'}
          >
            <Activity className="mr-2 h-4 w-4" />
            New Measure
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    AL
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5 text-sm font-medium">
                Dr. Arjun Labs
              </div>
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                arjun@rassify.com
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}