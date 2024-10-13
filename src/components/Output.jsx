export default function Output({
  schedule
}) {
  return (
    <div>
      <ul>
        <li>Payment amount: {schedule}</li>
        <li>interest portion of payment</li>
        <li>principal portion of payment</li>
      </ul>
    </div>
  )
}