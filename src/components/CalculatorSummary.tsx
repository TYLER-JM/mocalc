import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";
import getOutputValuesFromCalculator from "../utils/getOutputValuesFromCalculator.ts";
import {STATUS} from "../definitions/StringTypes.ts";
import {convertToTitle} from "../utils/helpers.ts";

interface CalculatorSummaryProps {
	calculator: CalculatorInputs
}
export default function CalculatorSummary({
		calculator
}: CalculatorSummaryProps) {
	const dynamicStyles = {
		width: `${50 + 25}%`
	}

	const output = getOutputValuesFromCalculator(calculator)
	return (
		<div className="card">
			<div>

				{output.status === STATUS.complete &&
					<>
						<div className="stats">
							<span>{output.principal}</span>
							<span className="text-sm">@</span>
							<span className="text-sm">{output.interestRate}</span>
						</div>

						<div className="mb-2">
						<p className="h4 text-primary text-sm">{output.paymentSchedule && convertToTitle(output.paymentSchedule)} payment:</p>
						<p className="m-0 summary-payment">{output.payment}</p>
						</div>
					</>
				}

				<div className="payment summary">
					<p className="h4 text-primary">
						End of term:
					</p>
					<div className="principal-summary">
						<div className="summary-bar wrapper">
							<div className="summary-bar total"></div>
							<div style={dynamicStyles} className="summary-bar remaining"></div>
						</div>
						<div className="label principal remaining">
							<span className="summary-header">remaining balance:</span>
							<span>$294,000</span>
						</div>
						<div className="label principal paid">
							<span className="summary-header">principal paid:</span>
							<span>$56,000</span>
						</div>
					</div>

					<div className="interest-summary">
						<div style={dynamicStyles} className="summary-bar interest"></div>
						<div className="label interest paid">
							<span className="summary-header">interest paid:</span>
							<span>$72,000</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}