'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HighRiskTrendsProps {
  data: { month: string; 'District 1': number; 'District 2': number; 'District 3': number }[];
  chartHeight?: number;
}

export function HighRiskTrends({
  data,
  chartHeight = 200,
}: HighRiskTrendsProps) {
  return (
    <ResponsiveContainer height={chartHeight}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#DBE2EB" strokeWidth={1} />
        <YAxis stroke="#DBE2EB" strokeWidth={1} />
        <Tooltip contentStyle={{ color: '#142334', fontFamily: 'Figtree' }} />
        <Area type="monotone" dataKey="District 1" stroke="#DC2626" fill="#FEE2E2" />
        <Area type="monotone" dataKey="District 2" stroke="#3B82F6" fill="#DBEAFE" />
        <Area type="monotone" dataKey="District 3" stroke="#F59E0B" fill="#FEF3C7" />
        <Legend verticalAlign="bottom" height={32} />
      </AreaChart>
    </ResponsiveContainer>
  );
}