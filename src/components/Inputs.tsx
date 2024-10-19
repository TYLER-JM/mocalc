interface InputProps {
  setPaymentType: (val: string) => void,
}

export default function Inputs({
  setPaymentType,
}: InputProps) {

  return (
    <div>
      <label htmlFor="paymentSchedule">
        Payment Schedule
        <select name="paymentSchedule" onChange={(e) => setPaymentType(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="accelerated_weekly">Accelerated weekly</option>
          <option value="weekly">Weekly</option>
          <option value="accelerated_biweekly">Accelerated Bi-weekly</option>
          <option value="biweekly">Bi-weekly (every 2-weeks)</option>
          <option value="semimonthly">Semi-monthly (24 payments a year)</option>
        </select>
      </label>
    </div>
  )
}