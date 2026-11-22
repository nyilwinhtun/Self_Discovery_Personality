import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

function wrapBurmeseAxisLabel(value) {
  const text = String(value || '')
  if (text.length <= 10) return [text]
  const mid = Math.ceil(text.length / 2)
  const spaceIndex = text.indexOf(' ', Math.floor(text.length / 3))
  if (spaceIndex > 0 && spaceIndex < text.length - 2) {
    return [text.slice(0, spaceIndex), text.slice(spaceIndex + 1)]
  }
  return [text.slice(0, mid), text.slice(mid)]
}

function BurmesePolarTick({ payload, x, y, textAnchor }) {
  const lines = wrapBurmeseAxisLabel(payload?.value)
  const startDy = lines.length > 1 ? -4 : 4
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#5b4b60" fontSize={11} fontFamily="Noto Sans Myanmar">
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? startDy : 13}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

export default function TraitRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} outerRadius="58%" margin={{ top: 18, right: 34, bottom: 18, left: 34 }}>
        <PolarGrid stroke="#e8dfe9" />
        <PolarAngleAxis
          dataKey="trait"
          tick={<BurmesePolarTick />}
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
