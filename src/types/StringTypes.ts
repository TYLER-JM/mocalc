export const MONTHLY = 'monthly'
export const SEMIMONTHLY = 'semimonthly'
export const WEEKLY = 'weekly'
export const BIWEEKLY = 'biweekly'
export const ACCELERATED_WEEKLY = 'accelerated_weekly'
export const ACCELERATED_BIWEEKLY = 'accelerated_biweekly'

export type PaymentSchedules = 
  typeof MONTHLY | 
  typeof SEMIMONTHLY | 
  typeof WEEKLY | 
  typeof BIWEEKLY | 
  typeof ACCELERATED_WEEKLY |
  typeof ACCELERATED_BIWEEKLY

  export const INCOMPLETE = 'incomplete'
  export const ERROR = 'error'
  export const COMPLETE = 'complete'
  export const LOADING = 'loading'

  export const STATUSES = {
    incomplete: INCOMPLETE,
    error: ERROR,
    complete: COMPLETE,
    loading: LOADING
  }
  export type OutputValuesStatus = typeof INCOMPLETE | typeof ERROR | typeof COMPLETE | typeof LOADING
 