import { ACCELERATED_BIWEEKLY, ACCELERATED_WEEKLY, BIWEEKLY, MONTHLY, SEMIMONTHLY, WEEKLY } from "../types/StringTypes";

export const paymentScheduleFrequencyMap = {
  [MONTHLY]: 12,
  [SEMIMONTHLY]: 24,
  [WEEKLY]: 52,
  [BIWEEKLY]: 26,
  [ACCELERATED_WEEKLY]: 52,
  [ACCELERATED_BIWEEKLY]: 26
}