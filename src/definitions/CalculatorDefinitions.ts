import {PaymentSchedules} from "./StringTypes.ts";
import {ScheduledPayment} from "./OutputTypes.ts";

export class CalculatorInputs {
	constructor(
		public id: number,
		public principal: number,
		public rate: number,
		public amortization: number,
		public term: number,
		public paymentType: PaymentSchedules
	) {}
}

export class YearSummary {
	constructor(
		public payments: ScheduledPayment[],
	) {}

	get totalPayment() {
		return this.payments.reduce((total: number, payment: ScheduledPayment): number => {
			return total + payment.mortgagePayment.totalPayment
		}, 0)
	}

	get totalInterest() {
		return this.payments.reduce((total: number, payment: ScheduledPayment): number => {
			return total + payment.mortgagePayment.interestPortion
		}, 0)
	}

	get totalPrincipal() {
		return this.payments.reduce((total: number, payment: ScheduledPayment): number => {
			return total + payment.mortgagePayment.principalPortion
		}, 0)
	}

	get endingBalance() {
		return this.payments[this.payments.length - 1].mortgagePayment.endingBalance
	}
}