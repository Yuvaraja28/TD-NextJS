export default function EfficiencyPage() {
    return (
      <div className="mainframe">
        <div>
            <a className="headline head-glow underline" href='/'>Thermodynamics</a> <span className='headline-2 head-glow'>|</span> <a className="headline-2 head-glow underline" href='/unit4'>Unit 4</a>
        </div>
        <span className="headline-2 head-glow">Efficiency Calculator</span>
        <a className="menu-choice" href="/unit4/efficiency/otto">Otto</a>
        <a className="menu-choice" href="/unit4/efficiency/diesel">Diesel</a>
        <a className="menu-choice" href="/unit4/efficiency/brayton">Brayton</a>
        <a className="menu-choice" href="/unit4/efficiency/dual">Dual</a>
      </div>
    );
  }