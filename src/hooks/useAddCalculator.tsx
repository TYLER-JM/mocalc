import {useCalculators} from "../Root.tsx";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";
import {MONTHLY} from "../definitions/StringTypes.ts";

export default function useAddCalculator() {
	const [calculators, setCalculators] = useCalculators();

	return () => {
		if (calculators.length >= 8) {
			return
		}
		setCalculators((prev: CalculatorInputs[]) => {
			const newCalc = new CalculatorInputs(prev.length, 0, 0, 0, 5, MONTHLY)
			return [...prev, newCalc]
		})
	}
}