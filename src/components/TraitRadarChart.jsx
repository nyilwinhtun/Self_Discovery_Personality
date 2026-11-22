import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export default function TraitRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} outerRadius="73%">
        <PolarGrid stroke="#e8dfe9" />
        <PolarAngleAxis
          dataKey="trait"
          tick={{ fill: '#5b4b60', fontSize: 11, fontFamily: 'Noto Sans Myanmar' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#6b5e70', fontSize: 11 }}
          axisLine={false}
        />
        <Radar
          name="ရမှတ်"
          dataKey="score"
          stroke="#8c719b"
          fill="#bda9c8"
          fillOpacity={0.55}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value) => [`${value}/100`, 'ရမှတ်']}
          contentStyle={{ borderRadius: 12, borderColor: '#eee4ed', fontSize: 12 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
