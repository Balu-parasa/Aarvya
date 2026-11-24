'use client';

import Card from './card';
import Badge from './badge';

export interface DistressScoreCardProps {
  score: number;
  trend: string;
}

export function DistressScoreCard({ score, trend }: DistressScoreCardProps) {
  const badgeVariant = score > 70 ? 'alert' : score > 40 ? 'warning' : 'success';

  return (
    <Card variant="soft" className="bg-[#EEF3F9] border-[#DBE2EB] p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-[#0F172A]">{score}</div>
          <div className="text-sm text-muted-foreground">/100</div>
        </div>
        <Badge variant={badgeVariant}>{score > 70 ? 'Critical' : score > 40 ? 'High' : 'Low'}</Badge>
      </div>
      <div className="mt-4">
        <div className="text-sm text-muted-foreground">{trend}</div>
        <div className="h-2 w-32 bg-[#D1DBE6] rounded-full mt-2">
          <div className="h-2 bg-[#0F172A]" style={{ width: `${score}%` }} />
        </div>
      </div>
    </Card>
  );
}
