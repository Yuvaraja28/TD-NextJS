'use client';
export default function BraytonProblemPage() {
    async function Solve() {
        let datas = {}
        let input_array = document.getElementsByClassName("full-problem-input")
        let option_array = document.getElementsByTagName("select")
        for (var i = 0; i < input_array.length; i++) { datas[input_array[i].name] = input_array[i].value }
        for (var i = 0; i < option_array.length; i++) { datas[option_array[i].name] = option_array[i].value }
        let brayton_response = await fetch("/api/brayton", {method: 'POST', body: JSON.stringify(datas)})
        let brayton_datas = await brayton_response.json()
        for (var i = 0; i < input_array.length; i++) { if (brayton_datas[input_array[i].name] != "-") { input_array[i].value = brayton_datas[input_array[i].name] } }
        for (var i = 0; i < option_array.length; i++) { if (brayton_datas[option_array[i].name] != "-") { option_array[i].value = brayton_datas[option_array[i].name] } }
    }
    async function Clear() {
        let input_array = document.getElementsByClassName("full-problem-input")
        for (var i = 0; i < input_array.length; i++) { input_array[i].value = '' }
    }
    function Temperature( { no } ) {
        return ( 
            <div className="full-problem-box-inner">
                <input className='full-problem-input' placeholder={`T${no}`} name={`t${no}`} type="number" step="0.1" />
                <select name={`c_t${no}`}>
                    <option value="k">K</option>
                    <option value="c">°C</option>
                </select>
            </div>
        )
    }
    function Pressure( { no } ) {
        return ( 
            <div className="full-problem-box-inner">
                <input className='full-problem-input' placeholder={`P${no}`} name={`p${no}`} type="number" step="0.1" />            
                <select name={`c_p${no}`}>
                    <option value="kpa">k Pa</option>
                    <option value="mpa">M Pa</option>
                    <option value="bar">Bar</option>
                </select>
            </div>
        )
    }
    function Volume( { no } ) {
        return (
            <div className="full-problem-box-inner">
                <input className='full-problem-input' placeholder={`V${no}`} name={`v${no}`} type="number" step="0.1" />
                <select name={`c_v${no}`}>
                    <option value="m3">m³</option>
                </select>
            </div>
        )
    }
    return (
        <div className="mainframe">
            <span className="headline">Brayton Problem Solver</span>
            <span className="headline headline2">Enter the Known Values</span>
            <div className="full-problem-container-multiple">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Pressure Ratio (r)</span>
                    <input className='full-problem-input' placeholder="Pressure" name="r" type="number" step="0.1" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Efficiency (%)</span>
                    <input className='full-problem-input' placeholder="%" name="efficiency_percent" type="number" step="0.1" />
                </div>
            </div>
            <div className="full-problem-container-multiple">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Temperature</span>
                    <Temperature no="1" />
                    <Temperature no="2" />
                    <Temperature no="3" />
                    <Temperature no="4" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Pressure</span>
                    <Pressure no="1" />
                    <Pressure no="2" />
                    <Pressure no="3" />
                    <Pressure no="4" />
                </div>
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Volume</span>
                    <Volume no="1" />
                    <Volume no="2" />
                    <Volume no="3" />
                    <Volume no="4" />
                </div>
            </div>
            <div className="full-problem-container-multiple">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Heat Supplied (Qs)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="Qs" name="Qs" type="number" step="0.1" />
                        <select name="c_qs">
                            <option value="kj">kJ/kg</option>
                        </select>
                    </div>
                </div>
                <div className='full-problem-box'>
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
            </div>
            <div className="full-problem-container-multiple">
                <div className='full-problem-box'>
                    <span className='full-problem-label'>Mean Effective Pressure (M.E.P)</span>
                    <div className="full-problem-box-inner">
                        <input className='full-problem-input' placeholder="M.E.P" name="mep" type="number" step="0.1" />
                        <select name="c_mep">
                            <option value="kpa">k Pa</option>
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
            </div>
            <div className="full-problem-container-single">
                <div className="full-problem-box-inner">
                    <button onClick={Clear} className="button">Clear</button> &nbsp;
                    <button onClick={Solve} className="button">Solve</button>
                </div>
            </div>
        </div>
    );
}