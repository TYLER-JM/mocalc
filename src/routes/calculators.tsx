import Calculator from "../components/Calculator.tsx";

import '../styles/calculators.css';
import {useCalculators} from "../Root.tsx";
import {CalculatorInputs} from "../types/CalculatorTypes.ts";
import {MONTHLY} from "../types/StringTypes.ts";


export default function Calculators() {
	const [calculators, setCalculators] = useCalculators();

	function addCalculator() {
		if (calculators.length >= 8) {
			return
		}
		setCalculators((prev: CalculatorInputs[]) => {
			const newCalc = new CalculatorInputs(prev.length, 0, 0, 0, 5, MONTHLY)
			return [...prev, newCalc]
		})
	}

	return (
		<>
			<div
				className="add-calculator"
				data-calculators={calculators.length <= 0 ? 'empty' : true}
			>
				<button onClick={() => addCalculator()}>+</button>
				<span>Click to add a calculator</span>
			</div>
			<section className="calculator-wrapper">
				{calculators.map((calculator) =>
					<Calculator key={calculator.id} calculator={calculator} setCalculators={setCalculators} />
				)}
			</section>
		</>
	)
}