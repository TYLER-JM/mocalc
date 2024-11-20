import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import useAddCalculator from "../hooks/useAddCalculator.tsx";

export default function Help() {
  const addCalc = useAddCalculator()
  const navigate = useNavigate();

  function addCalculatorAndRedirect() {
    addCalc()
    navigate('/calculators')
  }
  
  return (
    <section className="section">
      <div className="description">
        <p>
          Use the <button className="inline-button" title="click to add a calculator" onClick={addCalculatorAndRedirect}>+</button> button to add up to 8 calculators for easy comparison between various mortgage scenarios.</p>
        <p>
          The payment schedule for the entire term length (up to 5 years) can be viewed in a single table, or viewed as individual tabs for each year of the term.
          A yearly summary shows the <span className="italic">interest</span> paid, the amount of <span className="italic">principal</span> paid down, and the <span className="italic">total</span> amount paid over that year.
        </p>
        <button className="link-button"><Link className="output-waiting italic" to="/calculators">Get Started <span>&rarr;</span></Link></button>
      </div>
    </section>
  )
}