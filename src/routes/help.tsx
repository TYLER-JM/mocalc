export default function Help() {
  function addCalculatorAndRedirect() {
    
  }

  return (
    <section className="section">
      <div className="description">
        <p>
          Use the <button title="click to add a calculator" onClick={addCalculatorAndRedirect}>+</button> button to add up to 8 calculators for easy comparison between various mortgage scenarios.</p>
        <p>
          The payment schedule for the entire term length (up to 5 years) can be viewed in a single table, or viewed as individual tabs for each year of the term.
          A yearly summary shows the <span className="italic">interest</span> paid, the amount of <span className="italic">principal</span> paid down, and the <span className="italic">total</span> amount paid over that year.
        </p>
        <span onClick={addCalculatorAndRedirect}>Get Started!</span>
      </div>
    </section>
  )
}