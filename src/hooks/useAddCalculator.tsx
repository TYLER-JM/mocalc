import {useCalculators} from "../Root.tsx";
import {CalculatorInputs, PrepaymentOptions} from "../definitions/CalculatorDefinitions.ts";
import {MONTHLY} from "../definitions/StringTypes.ts";

export default function useAddCalculator() {
	const [calculators, setCalculators] = useCalculators();

	return () => {
		if (calculators.length >= 8) {
			return
		}
		setCalculators((prev: CalculatorInputs[]) => {
			const prepaymentOptions = new PrepaymentOptions()
			const newCalc = new CalculatorInputs(prev.length, 0, 0, 0, 5, MONTHLY, prepaymentOptions)
			return [...prev, newCalc]
		})
	}
}