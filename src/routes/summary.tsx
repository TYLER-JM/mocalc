import "../styles/summary.css";
import {useCalculators} from "../Root.tsx";

export default function Summary() {
	const [calculators] = useCalculators()
	const dynamicStyles = {
		width: `${50+25}%`
	}

	return (
		<section className="section summary">
			{calculators && calculators.map(calculator => (
				<div className="card" key={calculator.id}>
					<div>

						<div className="stats">
							<span>$350,000</span>
							<span className="text-sm">@</span>
							<span>4.35%</span>
						</div>

						<div className="mb-2">
							<p className="h4 text-primary text-sm">accelerated bi-weekly payment:</p>
							<p className="m-0 summary-payment">$1,845</p>
						</div>

						<div className="payment summary">
							<p className="h4 text-primary">
								End of term:
							</p>
							<div className="principal-summary">
								<div className="summary-bar wrapper">
									<div className="summary-bar total"></div>
									<div style={dynamicStyles} className="summary-bar remaining"></div>
								</div>
								<div className="label principal remaining">
									<span className="summary-header">remaining balance:</span>
									<span>$294,000</span>
								</div>
								<div className="label principal paid">
									<span className="summary-header">principal paid:</span>
									<span>$56,000</span>
								</div>
							</div>

							<div className="interest-summary">
								<div style={dynamicStyles} className="summary-bar interest"></div>
								<div className="label interest paid">
									<span className="summary-header">interest paid:</span>
									<span>$72,000</span>
								</div>
							</div>
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