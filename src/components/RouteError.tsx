import {Link} from "react-router-dom";

export default function RouteError() {
	return (
		<section className="section">
			<div className="description card">
				<p>Oops! An error has occurred: <span className="text-bold italic">Not Found</span></p>
				<p>Try following the following link:</p>
				<button className="link-button">
					<Link className="output-waiting italic" to="/calculators">Get Started <span>&rarr;</span></Link>
				</button>
			</div>

		</section>
	)
}