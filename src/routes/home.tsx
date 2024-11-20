import About from "../components/About.tsx";
import Help from "./help.tsx";

export default function Home() {
	return (
		<>
			<div className="home"><h1>MoCalc</h1></div>
			<About />
			<Help />
		</>
	)
}