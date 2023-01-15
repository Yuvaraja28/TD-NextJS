'use client';
export default function OttoProblemPage() {
    return (
        <div className="mainframe">
            <div className='combined-headline'>
                <a className="headline head-glow underline" href='/'>Thermodynamics</a> <span className='headline-2 head-glow'>|</span> <a className="headline-2 head-glow underline" href='/unit4'>Unit 4</a>
            </div>
            <span className="headline-2 head-glow">Otto Cycle Problem</span>
            <br />
            <span className="headline-3">Enter the Known Values</span>
            <br />
            <form action="/unit4/otto_solve">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>R</span>
                    <input className='full-problem-input' placeholder="Ratio" name="r" type="number" step="0.1" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Efficiency</span>
                    <input className='full-problem-input' placeholder="%" name="efficiency" type="number" step="0.1" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>T1</span>
                    <input className='full-problem-input' placeholder="T1" name="t1" type="number" step="0.1" />
                    <select name="c_t1">
                        <option value="k">K</option>
                        <option value="c">°C</option>
                    </select>
                    <span className='full-problem-label'>T2</span>
                    <input className='full-problem-input' placeholder="T2" name="t2" type="number" step="0.1" />
                    <select name="c_t2">
                        <option value="k">K</option>
                        <option value="c">°C</option>
                    </select>
                    <span className='full-problem-label'>T3</span>
                    <input className='full-problem-input' placeholder="T3" name="t3" type="number" step="0.1" />
                    <select name="c_t3">
                        <option value="k">K</option>
                        <option value="c">°C</option>
                    </select>
                    <span className='full-problem-label'>T4</span>
                    <input className='full-problem-input' placeholder="T4" name="t4" type="number" step="0.1" />
                    <select name="c_t4">
                        <option value="k">K</option>
                        <option value="c">°C</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>P1</span>
                    <input className='full-problem-input' placeholder="P1" name="p1" type="number" step="0.1" />
                    <select name="c_p1">
                        <option value="kpa">k Pa</option>
                        <option value="mpa">M Pa</option>
                        <option value="bar">Bar</option>
                    </select>
                    <span className='full-problem-label'>P2</span>
                    <input className='full-problem-input' placeholder="P2" name="p2" type="number" step="0.1" />
                    <select name="c_p2">
                        <option value="kpa">k Pa</option>
                        <option value="mpa">M Pa</option>
                        <option value="bar">Bar</option>
                    </select>
                    <span className='full-problem-label'>P3</span>
                    <input className='full-problem-input' placeholder="P3" name="p3" type="number" step="0.1" />
                    <select name="c_p3">
                        <option value="kpa">k Pa</option>
                        <option value="mpa">M Pa</option>
                        <option value="bar">Bar</option>
                    </select>
                    <span className='full-problem-label'>P4</span>
                    <input className='full-problem-input' placeholder="P4" name="p4" type="number" step="0.1" />
                    <select name="c_p4">
                        <option value="kpa">k Pa</option>
                        <option value="mpa">M Pa</option>
                        <option value="bar">Bar</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>V1</span>
                    <input className='full-problem-input' placeholder="V1" name="v1" type="number" step="0.1" />
                    <select name="c_v1">
                        <option value="m3">m³</option>
                    </select>
                    <span className='full-problem-label'>V2</span>
                    <input className='full-problem-input' placeholder="V2" name="v2" type="number" step="0.1" />
                    <select name="c_v2">
                        <option value="m3">m³</option>
                    </select>
                    <span className='full-problem-label'>V3</span>
                    <input className='full-problem-input' placeholder="V3" name="v3" type="number" step="0.1" />
                    <select name="c_v3">
                        <option value="m3">m³</option>
                    </select>
                    <span className='full-problem-label'>V4</span>
                    <input className='full-problem-input' placeholder="V4" name="v4" type="number" step="0.1" />
                    <select name="c_v4">
                        <option value="m3">m³</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>M</span>
                    <input className='full-problem-input' placeholder="Mass" name="m" type="number" step="0.1" />
                    <select name="c_m">
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Qs</span>
                    <input className='full-problem-input' placeholder="Qs" name="Qs" type="number" step="0.1" />
                    <select name="c_qs">
                        <option value="kj">kJ/kg</option>
                    </select>
                    <span className='full-problem-label'>Qr</span>
                    <input className='full-problem-input' placeholder="Qr" name="Qr" type="number" step="0.1" />
                    <select name="c_qr">
                        <option value="kj">kJ/kg</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>W.D</span>
                    <input className='full-problem-input' placeholder="W.D" name="wd" type="number" step="0.1" />
                    <select name="c_wd">
                        <option value="kj">kJ/kg</option>
                    </select>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>M.E.P</span>
                    <input className='full-problem-input' placeholder="M.E.P" name="mep" type="number" step="0.1" />
                    <select name="c_mep">
                        <option value="kpa">k Pa</option>
                    </select>
                </div>
                <button type="submit" className="button">Solve</button>
            </form>
        </div>
    );
}