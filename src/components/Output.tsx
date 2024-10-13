import { getEffectiveRate, getRateByFrequency, toPercentage } from "../utils/calculators"

interface OutputProps {
  schedule: number,
  rate: number
}

export default function Output({
  schedule,
  rate
}: OutputProps) {

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)
  return (
    <div>
      <ul>
        <li>Payment amount: {schedule}</li>
        <li>Effective Rate: {toPercentage(effectiveRate)}</li>
        <li>Monthly Rate: {toPercentage(monthlyRate, 4)}</li>
      </ul>
    </div>
  )
}

