import {CalculatorInputs, Summary} from "../definitions/CalculatorDefinitions.ts";
import getOutputValuesFromCalculator from "../utils/getOutputValuesFromCalculator.ts";
import {STATUS} from "../definitions/StringTypes.ts";
import {convertToTitle} from "../utils/helpers.ts";
import getYearlySummariesFromPaymentDetails from "../utils/getYearlySummariesFromPaymentDetails.ts";
import getPaymentDetailsFromCalculator from "../utils/getPaymentDetailsFromCalculator.ts";
import {ScheduledPayment} from "../definitions/OutputTypes.ts";
import accounting from "accounting";

interface CalculatorSummaryProps {
	calculator: CalculatorInputs
}
export default function CalculatorSummary({
		calculator
}: CalculatorSummaryProps) {
	const dynamicRemainingBalanceStyles = {
		width: `100%`
	}
	const dynamicInterestPaidStyles = {
		width: `100%`
	}

	const output = getOutputValuesFromCalculator(calculator)
	const paymentDetails = getPaymentDetailsFromCalculator(calculator)
	let yearsInTerm: ScheduledPayment[][] | undefined = undefined
	let termSummary: Summary | undefined = undefined

	if (paymentDetails) {
		yearsInTerm = getYearlySummariesFromPaymentDetails(paymentDetails)
	}

	if (yearsInTerm && output.principalRaw && output.principalRaw > 0) {
		let allPayments: ScheduledPayment[] = yearsInTerm.reduce((prev, curr) => {
			return [...prev, ...curr]
		}, [])

		termSummary = new Summary(allPayments)

		const percentRemaining = Math.round(termSummary.endingBalance / output.principalRaw * 100)
		dynamicRemainingBalanceStyles.width = `${percentRemaining}%`

		// calculate the width of the interest bar by
		// comparing it to the width of the bar associated to the total principal paid
		const percentInterest = termSummary.totalInterest / termSummary.totalPayment
		const interestRelativeToPrincipal = Math.round((100 - percentRemaining) * (1 + percentInterest))
		dynamicInterestPaidStyles.width = `${interestRelativeToPrincipal}%`
	}

	return (
		<div className="card">

				{output.status === STATUS.complete &&
					<>
						<div className="stats">
							<span>{output.principal}</span>
							<span className="text-sm">@</span>
							<span className="text-sm">{output.interestRate}</span>
						</div>

						<div className="mb-2">
						<p className="font-bold text-primary text-sm">{output.paymentSchedule && convertToTitle(output.paymentSchedule)} payment:</p>
						<p className="m-0 summary-payment">{output.payment}</p>
						</div>
					</>
				}

			{termSummary &&
        <div className="payment summary">

          <p className="font-bold text-primary">
            End of term:
						<span className="text-sm text-dark font-light"> ({output.amortizationPeriod} years)</span>
          </p>

          <div className="principal-summary">
            <div className="summary-bar wrapper">
              <div className="summary-bar total"></div>
              <div style={dynamicRemainingBalanceStyles} className="summary-bar remaining"></div>
            </div>
            <div className="label principal remaining">
              <span className="summary-header">remaining balance:</span>
              <span>{accounting.formatMoney(termSummary.endingBalance)}</span>
            </div>
            <div className="label principal paid">
              <span className="summary-header">principal paid:</span>
              <span>{accounting.formatMoney(termSummary.totalPrincipal)}</span>
            </div>
          </div>

          <div className="interest-summary">
            <div style={dynamicInterestPaidStyles} className="summary-bar interest"></div>
            <div className="label interest paid">
              <span className="summary-header">interest paid:</span>
              <span>{accounting.formatMoney(termSummary.totalInterest)}</span>
            </div>
          </div>

        </div>
			}


		</div>
	)
}