import React from "react";
import { 
  ACCELERATED_BIWEEKLY,
  ACCELERATED_WEEKLY,
  BIWEEKLY,
  SEMIMONTHLY,
  WEEKLY, 
  OutputValuesStatus,
  PaymentSchedules
} from "./StringTypes"

export interface OutputValues {
  status: OutputValuesStatus,
  paymentSchedule?: string,
  principal?: string,
  interestRate?: string,
  effectiveRate?: string,
  monthlyRate?: string,
  amortizationPeriod?: number,
  monthlyPayment?: string,
  payment?: string
}

export interface PaymentDetails {
  principal: number,
  scheduleRate: number,
  schedule: PaymentSchedules,
  monthlyPayment: number,
  termLength: number
}

export interface ScheduledPayment {
  jsx?: React.ReactNode,
  mortgagePayment: MortgagePayment
}

export class MortgagePayment {
  constructor(
    public startingBalance: number,
    public interestRate: number,
    public schedule: PaymentSchedules,
    public monthlyPayment: number
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