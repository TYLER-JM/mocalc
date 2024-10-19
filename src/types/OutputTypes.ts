import accounting from "accounting";
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
  effectiveRate?: string,
  monthlyRate?: string,
  amortizationPeriod?: number,
  monthlyPayment?: string,
  payment?: string
}

export class MortgagePayment {
  constructor(
    public startingBalance: number,
    public interestRate: number,
    public schedule: PaymentSchedules,
    public monthlyPayment: number
  ) {}

  get totalPayment() {
    let p;
    switch (this.schedule) {
      case SEMIMONTHLY:
      case ACCELERATED_BIWEEKLY:
        p = accounting.formatMoney(this.monthlyPayment / 2, {precision: 2})
        break;
      case BIWEEKLY:
        p = accounting.formatMoney((this.monthlyPayment * 12) / 26, {precision: 2})
        break;
      case WEEKLY:
        p = accounting.formatMoney((this.monthlyPayment * 12) / 52, {precision: 2})
        break;
      case ACCELERATED_WEEKLY:
        p = accounting.formatMoney(this.monthlyPayment / 4, {precision: 2})
        break;
      default:
        p = this.monthlyPayment
        break;
    }
    return p
  }

  get interestPortion() {
    return 0
  }

  get principal() {
    return 0
  }

  get endingBalance() {
    return 0
  }
}