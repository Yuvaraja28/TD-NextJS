'use client';
import React, { useState } from 'react';
export default function OttoPage() {
    const [title, Title] = useState()
    const [output, Output] = useState()
    const [error, Error] = useState()
    function Calculate() {
        const GAMMA = 1.4
        let compression_ratio = document.getElementById('compression_ratio').value
        if (compression_ratio != '') { 
            if (parseFloat(compression_ratio) <= 0) {
                Title(); Output()
                Error('The Practical Application of Otto Cycle Ratio cannot be 0 or less than 0')
            } else {
                Title("Otto Cycle Efficiency Value is")
                Output(`${((1-(1/(Math.pow(parseFloat(compression_ratio),(GAMMA-1)))))*100).toFixed(2)} %`)
                Error()
            }
        }
    }
    return (
        <div className="mainframe">
            <span className="headline">Otto Cycle Efficiency</span>
            <input placeholder="Compression Ratio" name="compression_ratio" id="compression_ratio" type="number" step="0.1" />
            <button onClick={Calculate} type="submit" className="button">Calculate</button>
            <span className="output" id='output'>{title}</span>
            <span className="output value">{output}</span>
            <span className="output value_error">{error}</span>
        </div>
    );
}