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
						<div className="payment-wrapper">
							<p className="summary-header">your total payment will be</p>
							<p className="output-summary-payment">$1,845</p>
						</div>
						<div className="principal-wrapper">
							<p className="summary-header">amount borrowed:</p>
							<p>$350,000</p>
						</div>
						<div className="rate-wrapper">
							<p className="summary-header">interest rate:</p>
							<p>4.35%</p>
						</div>
						<div className="schedule-wrapper">
							<p className="summary-header">payment schedule:</p>
							<p>Monthly</p>
						</div>

						<div className="payment summary">
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
								<div className="label interest paid">$72,000</div>
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