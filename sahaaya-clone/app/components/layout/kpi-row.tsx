'use client';

import Card from '@/app/components/ui/card';

export function KPIRow({ data }: { data: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map((item, i) => (
        <Card key={i} variant="kpi">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-primary">{item.value}</span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}