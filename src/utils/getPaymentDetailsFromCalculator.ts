import {PaymentDetails} from "../definitions/OutputTypes.ts";
// import {useCalculators} from "../Root.tsx";
import {getEffectiveRate, getMonthlyPayment, getRateByFrequency} from "./calculators.ts";
import {paymentScheduleFrequencyMap} from "./helpers.ts";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";

export default function getPaymentDetailsFromCalculator(calculator: CalculatorInputs): PaymentDetails | undefined {
	// const [calculators] = useCalculators()
	// const calculator = calculators.find((calculator) => calculator.id === calculatorId);

	if (calculator && calculator.amortization > 0 && (calculator.rate / 100 > 0)) {
		const effectiveRate = getEffectiveRate(calculator.rate / 100)
		const monthlyRate = getRateByFrequency(effectiveRate, 12)

		const paymentValues = {
			principal: calculator.principal,
			rate: monthlyRate,
			amortization: calculator.amortization * 12 // to get the months
		}

		let monthlyPayment = getMonthlyPayment(paymentValues)
		let scheduleRate = getRateByFrequency(effectiveRate, paymentScheduleFrequencyMap[calculator.paymentType])

		return {
			principal: calculator.principal,
			schedule: calculator.paymentType,
			scheduleRate,
			monthlyPayment,
			termLength: calculator.term
		} satisfies PaymentDetails
	}

	return undefined;
}