import {ScheduledPayment} from "../definitions/OutputTypes.ts";
import accounting from "accounting";

interface MortgageScheduleTabSummaryProps {
	payments: ScheduledPayment[],
	index: number,
	activeTab: number | undefined,
}

export default function MortgageScheduleYearSummary({
	payments,
	index,
	activeTab,
}: MortgageScheduleTabSummaryProps) {
	const totalPayment = payments.reduce((total: number, payment: ScheduledPayment): number => {
		return total + payment.mortgagePayment.totalPayment
	}, 0)
	const totalInterest = payments.reduce((total: number, payment: ScheduledPayment): number => {
		return total + payment.mortgagePayment.interestPortion
	}, 0)
	const totalPrincipal = payments.reduce((total: number, payment: ScheduledPayment): number => {
		return total + payment.mortgagePayment.principalPortion
	}, 0)
	const endingBalance = payments[payments.length - 1].mortgagePayment.endingBalance

	return (
		<div className={activeTab === index + 1 ? 'active tab-summary' : `tab-summary`}>
			<div>
				<span className="label">{`Total paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(totalPayment)}</span>
			</div>
			<div>
				<span className="label">{`interest paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(totalInterest)}</span>
			</div>
			<div>
				<span className="label">{`remaining principal after Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(endingBalance)}</span>
			</div>
			<div>
				<span className="label">{`principal paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(totalPrincipal)}</span>
			</div>
		</div>
	)
}