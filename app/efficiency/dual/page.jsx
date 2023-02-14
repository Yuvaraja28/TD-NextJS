'use client';
import React, { useState } from 'react';
export default function DualPage() {
    const [title, Title] = useState()
    const [output, Output] = useState()
    const [error, Error] = useState()
    function Calculate() {
        const GAMMA = 1.4
        let compression_ratio = document.getElementById('compression_ratio').value
        let cut_off_ratio = document.getElementById('cut_off_ratio').value
        let pressure_ratio = document.getElementById('pressure_ratio').value
        if (compression_ratio != '') { 
            if ((parseFloat(compression_ratio) <= 0) || (parseFloat(cut_off_ratio) <= 0) || (parseFloat(pressure_ratio) <= 0)) {
                Title(); Output()
                Error('The Practical Application of Dual Cycle Ratio cannot be 0 or less than 0')
            } else {
                Title("Dual Cycle Efficiency Value is")
                Output(`${((1-(((Math.pow(cut_off_ratio,GAMMA)*pressure_ratio)-1)/(Math.pow(compression_ratio,(GAMMA-1))*((pressure_ratio-1)+(GAMMA*pressure_ratio*(cut_off_ratio-1))))))*100).toFixed(2)} %`)
                Error()
            }
        }
    }
    return (
        <div className="mainframe">
            <span className="headline-2 head-glow">Dual Cycle Efficiency</span>
            <input placeholder="Compression Ratio" name="compression_ratio" id="compression_ratio" type="number" step="0.1" />
            <input placeholder="Cut-Off Ratio" name="cut_off_ratio" id="cut_off_ratio" type="number" step="0.1" />
            <input placeholder="Pressure Ratio" name="pressure_ratio" id="pressure_ratio" type="number" step="0.1" />
            <button onClick={Calculate} type="submit" className="button">Calculate</button>
            <span className="output" id='output'>{title}</span>
            <span className="output value">{output}</span>
            <span className="output value_error">{error}</span>
        </div>
    );
}