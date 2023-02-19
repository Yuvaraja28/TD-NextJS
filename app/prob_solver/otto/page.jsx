'use client';
export default function OttoProblemPage() {
    async function Solve() {
        let datas = {}
        let input_array = document.getElementsByClassName("full-problem-input")
        let option_array = document.getElementsByTagName("select")
        for (var i = 0; i < input_array.length; i++) { datas[input_array[i].name] = input_array[i].value }
        for (var i = 0; i < option_array.length; i++) { datas[option_array[i].name] = option_array[i].value }
        let otto_response = await fetch("/api/otto", {method: 'POST', body: JSON.stringify(datas)})
        let otto_datas = await otto_response.json()
        for (var i = 0; i < input_array.length; i++) { if (otto_datas[input_array[i].name] != "-") { input_array[i].value = otto_datas[input_array[i].name] } }
        for (var i = 0; i < option_array.length; i++) { if (otto_datas[option_array[i].name] != "-") { option_array[i].value = otto_datas[option_array[i].name] } }
    }
    async function Clear() {
        let input_array = document.getElementsByClassName("full-problem-input")
        for (var i = 0; i < input_array.length; i++) { input_array[i].value = '' }
    }
    return (
        <div className="mainframe">
            <span className="headline">Otto Problem Solver</span>
            <span className="headline headline2">Enter the Known Values</span>
            <div className="full-problem-container">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Compression Ratio (r)</span>
                    <input className='full-problem-input' placeholder="Compression Ratio" name="r" type="number" step="0.1" />
                    <br />
                    <span className='full-problem-label'>Efficiency (%)</span>
                    <input className='full-problem-input' placeholder="%" name="efficiency_percent" type="number" step="0.1" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Temperature</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="T1" name="t1" type="number" step="0.1" />
                        <select name="c_t1">
                            <option value="k">K</option>
                            <option value="c">°C</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="T2" name="t2" type="number" step="0.1" />
                        <select name="c_t2">
                            <option value="k">K</option>
                            <option value="c">°C</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="T3" name="t3" type="number" step="0.1" />
                        <select name="c_t3">
                            <option value="k">K</option>
                            <option value="c">°C</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="T4" name="t4" type="number" step="0.1" />
                        <select name="c_t4">
                            <option value="k">K</option>
                            <option value="c">°C</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Pressure</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="P1" name="p1" type="number" step="0.1" />
                        <select name="c_p1">
                            <option value="kpa">k Pa</option>
                            <option value="mpa">M Pa</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="P2" name="p2" type="number" step="0.1" />
                        <select name="c_p2">
                            <option value="kpa">k Pa</option>
                            <option value="mpa">M Pa</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="P3" name="p3" type="number" step="0.1" />
                        <select name="c_p3">
                            <option value="kpa">k Pa</option>
                            <option value="mpa">M Pa</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="P4" name="p4" type="number" step="0.1" />
                        <select name="c_p4">
                            <option value="kpa">k Pa</option>
                            <option value="mpa">M Pa</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Volume</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="V1" name="v1" type="number" step="0.1" />
                        <select name="c_v1">
                            <option value="m3">m³</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="V2" name="v2" type="number" step="0.1" />
                        <select name="c_v2">
                            <option value="m3">m³</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="V3" name="v3" type="number" step="0.1" />
                        <select name="c_v3">
                            <option value="m3">m³</option>
                        </select>
                    </div>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="V4" name="v4" type="number" step="0.1" />
                        <select name="c_v4">
                            <option value="m3">m³</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Mass (M)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="Mass" name="m" type="number" step="0.1" />
                        <select name="c_m">
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Heat Supplied (Qs)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="Qs" name="Qs" type="number" step="0.1" />
                        <select name="c_qs">
                            <option value="kj">kJ/kg</option>
                        </select>
                    </div>
                    <br />
                    <span className='full-problem-label'>Heat Rejected (Qr)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="Qr" name="Qr" type="number" step="0.1" />
                        <select name="c_qr">
                            <option value="kj">kJ/kg</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Workdone (W)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="W.D" name="wd" type="number" step="0.1" />
                        <select name="c_wd">
                            <option value="kj">kJ/kg</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Mean Effective Pressure (M.E.P)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="M.E.P" name="mep" type="number" step="0.1" />
                        <select name="c_mep">
                            <option value="kpa">k Pa</option>
                        </select>
                    </div>
                </div>
                <div className="full-problem-box-inner">
                    <button onClick={Clear} className="button">Clear</button> &nbsp;
                    <button onClick={Solve} className="button">Solve</button>
                </div>
            </div>
        </div>
    );
}