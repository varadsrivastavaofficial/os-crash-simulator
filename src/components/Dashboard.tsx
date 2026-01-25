import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ElectricBorder from '@/components/ElectricBorder';

type OS = 'windows' | 'macos';
type Mode = 'stall' | 'eject';

type DashboardProps = {
  onStart: (os: OS, mode: Mode) => void;
};

export default function Dashboard({ onStart }: DashboardProps) {
  const [os, setOs] = useState<OS>('windows');
  const [mode, setMode] = useState<Mode>('stall');

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
       <ElectricBorder
        color="#00FF00" 
        speed={1}
        chaos={0.05}
        thickness={2}
        borderRadius={8} 
      >
        <Card className="w-full max-w-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">OS Failure Simulator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <Tabs defaultValue="windows" onValueChange={(value) => setOs(value as OS)}>
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="windows">Windows 11</TabsTrigger>
                <TabsTrigger value="macos">macOS Sequoia</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-4">
                <h3 className="font-medium">Select Mode:</h3>
                <RadioGroup defaultValue="stall" onValueChange={(value) => setMode(value as Mode)} value={mode}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stall" id="stall" />
                    <Label htmlFor="stall" className="font-body">"The Stall" - Update Lock</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eject" id="eject" />
                    <Label htmlFor="eject" className="font-body">"The Eject" - Crash</Label>
                </div>
                </RadioGroup>
            </div>

            <Button
                onClick={() => onStart(os, mode)}
                className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-bold text-lg"
            >
                Initiate Simulation
            </Button>
            </CardContent>
        </Card>
      </ElectricBorder>
    </div>
  );
}
