import { getEffectiveRate, toPercentage } from "../utils/calculators"

interface OutputProps {
  schedule: number,
  rate: number
}

export default function Output({
  schedule,
  rate
}: OutputProps) {

  const effectiveRate = toPercentage(getEffectiveRate(rate))
  return (
    <div>
      <ul>
        <li>Payment amount: {schedule}</li>
        <li>Effective Rate: {effectiveRate}</li>
        <li>principal portion of payment</li>
      </ul>
    </div>
  )
}

