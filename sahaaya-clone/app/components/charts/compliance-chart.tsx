'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ComplianceChartProps {
  data: { week: string; compliance: number }[];
  chartHeight?: number;
}

export function ComplianceChart({
  data,
  chartHeight = 200,
}: ComplianceChartProps) {
  return (
    <ResponsiveContainer height={chartHeight}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="week" stroke="#DBE2EB" strokeWidth={1} />
        <YAxis stroke="#DBE2EB" strokeWidth={1} />
        <Tooltip contentStyle={{ color: '#142334', fontFamily: 'Figtree' }} />
        <Area type="monotone" dataKey="compliance" stroke="#16A34C" fill="#DCFCE7" />
        <Legend verticalAlign="bottom" height={32} />
      </AreaChart>
    </ResponsiveContainer>
  );
}