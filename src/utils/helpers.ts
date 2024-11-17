import { ACCELERATED_BIWEEKLY, ACCELERATED_WEEKLY, BIWEEKLY, MONTHLY, SEMIMONTHLY, WEEKLY } from "../definitions/StringTypes";

export const paymentScheduleFrequencyMap = {
  [MONTHLY]: 12,
  [SEMIMONTHLY]: 24,
  [WEEKLY]: 52,
  [BIWEEKLY]: 26,
  [ACCELERATED_WEEKLY]: 52,
  [ACCELERATED_BIWEEKLY]: 26
}

type ConversionOptions = {
  separator: string,
}
const DEFAULT_CONVERSION_OPTIONS: ConversionOptions = {
  separator: '_'
}
export function convertToTitle(string: string, options: Partial<ConversionOptions> = {}): string {
  const userOptions = {...DEFAULT_CONVERSION_OPTIONS, ...options}
  let words = string.split(userOptions.separator)
  words = words.map((word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return words.join(' ');
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}