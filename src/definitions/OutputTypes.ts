import {
  ACCELERATED_BIWEEKLY,
  ACCELERATED_WEEKLY,
  BIWEEKLY,
  SEMIMONTHLY,
  WEEKLY, 
  OutputValuesStatus,
  PaymentSchedules
} from "./StringTypes"
import {PrepaymentOptions} from "./CalculatorDefinitions.ts";

export interface OutputValues {
  status: OutputValuesStatus,
  paymentSchedule?: string,
  principal?: string,
  principalRaw?: number,
  interestRate?: string,
  effectiveRate?: string,
  monthlyRate?: string,
  amortizationPeriod?: number,
  monthlyPayment?: string,
  payment?: string,
  paymentRaw?: number,
  prepaymentOptions?: PrepaymentOptions
}

export interface PaymentDetails {
  principal: number,
  scheduleRate: number,
  schedule: PaymentSchedules,
  monthlyPayment: number,
  termLength: number,
  prepaymentOptions: PrepaymentOptions
}

export interface ScheduledPayment {
  mortgagePayment: MortgagePayment
  year: number
}

export class MortgagePayment {
  constructor(
    public startingBalance: number,
    public interestRate: number,
    public schedule: PaymentSchedules,
    public monthlyPayment: number,
    public prepaymentAmount?: number
  ) {}

  get totalPayment(): number {
    let p;
    switch (this.schedule) {
      case SEMIMONTHLY:
      case ACCELERATED_BIWEEKLY:
        p = this.monthlyPayment / 2
        break;
      case BIWEEKLY:
        p =(this.monthlyPayment * 12) / 26
        break;
      case WEEKLY:
        p = (this.monthlyPayment * 12) / 52
        break;
      case ACCELERATED_WEEKLY:
        p = this.monthlyPayment / 4
        break;
      default:
        p = this.monthlyPayment
        break;
    }
    if (this.prepaymentAmount) {
      return p + this.prepaymentAmount
    }
    return p
  }

  get interestPortion() {
    return this.interestRate * this.startingBalance
  }

  get principalPortion() {
    return this.totalPayment - this.interestPortion
  }

  get endingBalance() {
    return this.startingBalance - this.principalPortion
  }
}