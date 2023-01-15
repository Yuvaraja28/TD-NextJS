'use client';
import React, { useState } from 'react';
export default function BraytonPage() {
    const [title, Title] = useState()
    const [output, Output] = useState()
    const [error, Error] = useState()
    function Calculate() {
        const GAMMA = 1.4
        let pressure_ratio = document.getElementById('pressure_ratio').value
        if (pressure_ratio != '') { 
            if (parseFloat(pressure_ratio) <= 0) {
                Title(); Output()
                Error('The Practical Application of Brayton Cycle Ratio cannot be 0 or less than 0')
            } else {
                Title("Brayton Cycle Efficiency Value is")
                Output(`${((1-(1/(Math.pow(pressure_ratio,((GAMMA-1)/GAMMA)))))*100).toFixed(2)} %`)
                Error()
            }
        }
    }
    return (
        <div className="mainframe">
            <div>
                <a className="headline head-glow underline" href='/'>Thermodynamics</a> <span className='headline-2 head-glow'>|</span> <a className="headline-2 head-glow underline" href='/unit4'>Unit 4</a>
            </div>
            <a className="headline-2 head-glow underline" href='/unit4/efficiency'>Efficiency Calculator</a>
            <span className="headline-2 head-glow">Brayton Cycle</span>
            <input placeholder="Pressure Ratio" name="pressure_ratio" id="pressure_ratio" type="number" step="0.1" />
            <button onClick={Calculate} type="submit" className="button">Calculate</button>
            <span className="output" id='output'>{title}</span>
            <span className="value">{output}</span>
            <span className="value_error">{error}</span>
       </div>
    );
}