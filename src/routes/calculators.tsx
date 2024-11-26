import Calculator from "../components/Calculator.tsx";
import {useCalculators} from "../Root.tsx";
import useAddCalculator from "../hooks/useAddCalculator.tsx";
import '../styles/calculators.css';
import '../styles/calculator-inputs.css';


export default function Calculators() {
	const [calculators, setCalculators] = useCalculators();
	const addCalculator = useAddCalculator()

	return (
		<>
			<div
				className="add-calculator"
				data-calculators={calculators.length <= 0 ? 'empty' : true}
			>
				<button title="click to add a calculator" onClick={addCalculator}>+</button>
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