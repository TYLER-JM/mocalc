import { getEffectiveRate, getRateByFrequency, toDollars, toPercentage } from "../utils/calculators"

interface OutputProps {
  schedule: number,
  rate: number,
  principal: number
}

export default function Output({
  schedule,
  rate,
  principal
}: OutputProps) {

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)
  return (
    <div>
      <ul>
        <li>Payment amount: {schedule}</li>
        <li>Effective Rate: {toPercentage(effectiveRate)}</li>
        <li>Monthly Rate: {toPercentage(monthlyRate, 4)}</li>
        <li>Mortgage Amount: {toDollars(principal, 0)}</li>
      </ul>
    </div>
  )
}

