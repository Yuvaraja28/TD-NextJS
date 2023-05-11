export default function HomePage() {
  return (
    <div className="mainframe">
      <span className="headline head-glow">Thermodynamics</span>
      <a className="menu-choice" href="/cgpa">CGPA Calculation</a>
      <a className="menu-choice" href="/conversion">Conversion</a>
      <a className="menu-choice" href="/efficiency">Efficiency</a>
      <a className="menu-choice" href="/prob_solver">Problem Solver</a>
    </div>
  );
}