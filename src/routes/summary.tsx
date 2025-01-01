import "../styles/summary.css";
import {useCalculators} from "../Root.tsx";
import CalculatorSummary from "../components/CalculatorSummary.tsx";

export default function Summary() {
	const [calculators] = useCalculators()

	return (
		<section className="section summary">
			{calculators && calculators.map(calculator => (
				<CalculatorSummary calculator={calculator} key={calculator.id} />
			))}
		</section>
	)
}