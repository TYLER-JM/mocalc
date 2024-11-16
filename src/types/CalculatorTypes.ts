import {PaymentSchedules} from "./StringTypes.ts";

export class CalculatorInputs {
	constructor(
		public id: number,
		public principal: number,
		public rate: number,
		public amortization: number,
		public term: number,
		public paymentType: PaymentSchedules
	) {
	}
}