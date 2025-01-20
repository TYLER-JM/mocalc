import {MortgagePayment, PaymentDetails, ScheduledPayment} from "../definitions/OutputTypes.ts";
import {paymentScheduleFrequencyMap} from "./helpers.ts";
import {REGULAR, YEARLY} from "../definitions/StringTypes.ts";

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

		if (paymentDetails.prepaymentOptions.isValid() && paymentDetails.prepaymentOptions.frequency === REGULAR) {
			mortgagePayment.prepaymentAmount = paymentDetails.prepaymentOptions.amount
		}

		//if last payment of the year, and prepayments once per year
		if (
			i % paymentScheduleFrequencyMap[paymentDetails.schedule] === 0
			&& (paymentDetails.prepaymentOptions.isValid() && paymentDetails.prepaymentOptions.frequency === YEARLY)
		) {
			mortgagePayment.prepaymentAmount = paymentDetails.prepaymentOptions.amount
		}

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