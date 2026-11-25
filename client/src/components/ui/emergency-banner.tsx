'use client';

import { Card } from './card';
import { AlertTriangle } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <Card variant="alert" className="rounded-2xl border border-alert-100 p-4">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-alert" />
        <div>
          <div className="font-medium text-alert">I feel unsafe / need urgent support</div>
          <div className="text-xs text-alert-foreground">Immediate help available</div>
        </div>
      </div>
    </Card>
  );
}