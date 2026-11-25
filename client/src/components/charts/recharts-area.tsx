'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RechartsAreaChartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  stroke?: string;
  fill?: string;
  chartHeight?: number;
}

export function RechartsAreaChart({
  data,
  dataKey = 'value',
  stroke = '#0F172A',
  fill = '#F8FAFC',
  chartHeight = 250,
}: RechartsAreaChartProps) {
  return (
    <ResponsiveContainer height={chartHeight}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#DBE2EB" strokeWidth={1} />
        <YAxis stroke="#DBE2EB" strokeWidth={1} />
        <Tooltip
          contentStyle={{ color: '#142334', fontFamily: 'Figtree' }}
          labelFormatter={(value) => `${value}`}
        />
        <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
        <Legend verticalAlign="bottom" height={36} />
      </AreaChart>
    </ResponsiveContainer>
  );
}