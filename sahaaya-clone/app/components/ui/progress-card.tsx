'use client';

import { Card } from './card';

export function ProgressCard({ title, time }: { title: string; time: string }) {
  return (
    <Card className="rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-xl font-semibold text-primary">{time}</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center mt-0.5">
          <span className="text-primary font-bold">→</span>
        </div>
      </div>
    </Card>
  );
}