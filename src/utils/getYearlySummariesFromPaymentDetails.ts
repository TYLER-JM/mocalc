import {MortgagePayment, PaymentDetails, ScheduledPayment} from "../definitions/OutputTypes.ts";
import {paymentScheduleFrequencyMap} from "./helpers.ts";

export default function getYearlySummariesFromPaymentDetails(paymentDetails: PaymentDetails): ScheduledPayment[][] {
	let remainingBalance = paymentDetails.principal
	let payments: ScheduledPayment[] = []
	const years = []


	for (let i = 1; i <= paymentDetails.termLength * paymentScheduleFrequencyMap[paymentDetails.schedule]; i++) {
		const mortgagePayment = new MortgagePayment(
			remainingBalance,
			paymentDetails.scheduleRate,
			paymentDetails.schedule,
			paymentDetails.monthlyPayment
		)

		payments.push({
			mortgagePayment,
			year: i
		})

		remainingBalance = mortgagePayment.endingBalance

		if (i % paymentScheduleFrequencyMap[paymentDetails.schedule] === 0) {
			years.push(payments)
			payments = []
		}
	}

	return years
}