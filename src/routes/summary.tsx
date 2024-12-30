import "../styles/summary.css";
import {useCalculators} from "../Root.tsx";

export default function Summary() {
	const [calculators] = useCalculators()

	return (
		<section className="section summary">
			{calculators && calculators.map(calculator => (
				<div className="card" key={calculator.id}>
					<div className="output-summary">
						<div className="principal-wrapper">
							<p className="output-summary-header">amount borrowed:</p>
							<p>$350,000</p>
						</div>
						<div className="rate-wrapper">
							<p className="output-summary-header">interest rate:</p>
							<p>4.35%</p>
						</div>
						<div className="schedule-wrapper">
							<p className="output-summary-header">payment schedule:</p>
							<p>Monthly</p>
						</div>
						<div className="payment-wrapper">
							<p className="output-summary-header">your total payment will be</p>
							<p className="output-summary-payment">$18,245</p>
						</div>
					</div>
				</div>
			))}

			{/*<div className="card">*/}
			{/*	<div className="output-summary">*/}
			{/*		<div className="principal-wrapper">*/}
			{/*			<p className="output-summary-header">amount borrowed:</p>*/}
			{/*			<p>$350,000</p>*/}
			{/*		</div>*/}
			{/*		<div className="rate-wrapper">*/}
			{/*			<p className="output-summary-header">interest rate:</p>*/}
			{/*			<p>4.35%</p>*/}
			{/*		</div>*/}
			{/*		<div className="schedule-wrapper">*/}
			{/*			<p className="output-summary-header">payment schedule:</p>*/}
			{/*			<p>Monthly</p>*/}
			{/*		</div>*/}
			{/*		<div className="payment-wrapper">*/}
			{/*			<p className="output-summary-header">your total payment will be</p>*/}
			{/*			<p className="output-summary-payment">$18,245</p>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</section>
	)
}