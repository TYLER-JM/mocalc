import {PaymentSchedules} from "./StringTypes.ts";

export interface Calculator {
	id: number;
	principal: string,
	rate: string,
	amortization: string,
	term: string,
	paymentType: PaymentSchedules
}