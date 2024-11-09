import {useState} from "react";
import Calculator from "../components/Calculator.tsx";

import '../styles/calculators.css';


export default function Calculators() {
	const [calculators, setCalculators] = useState<number[]>([]);

	return (
		<>
			<button
				className="add-calculator"
				onClick={() => setCalculators((prev: number[]) => [...prev, prev.length])}
			>
				+
			</button>
			<section className="calculator-wrapper">
				{calculators.map((calculator) =>
					<Calculator key={calculator} id={calculator} setCalculators={setCalculators} />
				)}
			</section>
		</>
	)
}