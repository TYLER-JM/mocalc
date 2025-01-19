import {OutputValues} from "../definitions/OutputTypes.ts";
import {STATUS} from "../definitions/StringTypes.ts";
// import {useCalculators} from "../Root.tsx";
import {
	getEffectiveRate,
	getMonthlyPayment,
	getPaymentByType,
	getRateByFrequency,
	toPercentage
} from "./calculators.ts";
import accounting from "accounting";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";

export default function getOutputValuesFromCalculator(calculator: CalculatorInputs): OutputValues {

	const output: OutputValues = {
		status: STATUS.incomplete,
	}

	if (calculator && calculator.amortization > 0 && (calculator.rate / 100 > 0)) {
		const effectiveRate = getEffectiveRate(calculator.rate / 100)
		const monthlyRate = getRateByFrequency(effectiveRate, 12)

		const paymentValues = {
			principal: calculator.principal,
			rate: monthlyRate,
			amortization: calculator.amortization * 12 // to get the months
		}

		let monthlyPayment = getMonthlyPayment(paymentValues)
		let customPayment = getPaymentByType(monthlyPayment, calculator.paymentType)
		let customToString = accounting.formatMoney(customPayment, {precision: 2})

		output.amortizationPeriod = calculator.amortization
		output.payment = customToString
		output.paymentSchedule = calculator.paymentType
		output.interestRate = toPercentage((calculator.rate / 100), 2)
		output.effectiveRate = toPercentage(effectiveRate, 4)
		output.principal = accounting.formatMoney(calculator.principal)
		output.principalRaw = calculator.principal
		output.prepaymentOptions = calculator.prepaymentOptions

		output.status = STATUS.complete
	}

	return output
}