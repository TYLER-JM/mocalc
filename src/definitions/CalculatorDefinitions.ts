import {PaymentSchedules, PrepaymentFrequencyOptions} from "./StringTypes.ts";
import {ScheduledPayment} from "./OutputTypes.ts";
import accounting from "accounting";

export class CalculatorInputs {
	constructor(
		public id: number,
		public principal: number,
		public rate: number,
		public amortization: number,
		public term: number,
		public paymentType: PaymentSchedules,
		public prepaymentOptions: PrepaymentOptions
	) {}
}

export class PrepaymentOptions {
	valid: boolean = false;
	frequency: PrepaymentFrequencyOptions | undefined;
	amount: number | undefined;
	constructor() {
		this.valid = false;
		this.frequency = undefined;
		this.amount = undefined
	}

	isValid(): boolean {
		return this.valid;
	}

	formattedAmount(): string {
		return accounting.formatMoney(this.amount || 0)
	}
}

// export interface PrepaymentOptionsInterface {
// 	valid: boolean;
// 	amount: number | undefined;
// 	frequency: 'yearly' | 'once' | 'regular' | undefined;
// }

export interface InputIconOptions {
	placement: 'start' | 'end',
	name: string,
}

export class Summary {
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

export class YearSummary extends Summary {}