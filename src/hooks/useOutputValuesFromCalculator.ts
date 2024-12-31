import {OutputValues} from "../definitions/OutputTypes.ts";
import {STATUS} from "../definitions/StringTypes.ts";
import {useCalculators} from "../Root.tsx";
import {
	getEffectiveRate,
	getMonthlyPayment,
	getPaymentByType,
	getRateByFrequency,
	toPercentage
} from "../utils/calculators.ts";
import accounting from "accounting";
// import {paymentScheduleFrequencyMap} from "../utils/helpers.ts";

export default function useOutputValuesFromCalculator(calculatorId: number): OutputValues {
	const [calculators] = useCalculators()
	const calculator = calculators.find((calculator) => calculator.id === calculatorId);

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
		// let scheduleRate = getRateByFrequency(effectiveRate, paymentScheduleFrequencyMap[calculator.paymentType])


		let customPayment = getPaymentByType(monthlyPayment, calculator.paymentType)
		let customToString = accounting.formatMoney(customPayment, {precision: 2})
		output.amortizationPeriod = calculator.amortization
		output.payment = customToString
		output.paymentSchedule = calculator.paymentType
		output.interestRate = toPercentage((calculator.rate / 100), 2)
		output.effectiveRate = toPercentage(effectiveRate, 4)
		output.principal = accounting.formatMoney(calculator.principal)

		output.status = STATUS.complete
	}

	return output
}