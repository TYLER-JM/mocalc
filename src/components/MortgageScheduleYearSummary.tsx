import {ScheduledPayment} from "../definitions/OutputTypes.ts";
import accounting from "accounting";
import {YearSummary} from "../definitions/CalculatorDefinitions.ts";

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
	const yearSummary = new YearSummary(payments)

	return (
		<div className={activeTab === index + 1 ? 'active tab-summary' : `tab-summary`}>
			<div>
				<span className="label">{`Total paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(yearSummary.totalPayment)}</span>
			</div>
			<div>
				<span className="label">{`interest paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(yearSummary.totalInterest)}</span>
			</div>
			<div>
				<span className="label">{`remaining principal after Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(yearSummary.endingBalance)}</span>
			</div>
			<div>
				<span className="label">{`principal paid in Year ${index + 1}`}</span>
				<span>{accounting.formatMoney(yearSummary.totalPrincipal)}</span>
			</div>
		</div>
	)
}