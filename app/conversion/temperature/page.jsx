'use client';
import React, { useState } from 'react';
export default function TemperatureConversionPage() {
  const [title, Title] = useState()
  const [output, Output] = useState()
  function Clear() {
    Title(); Output()
  }
  function Calculate() {
      let value = document.getElementById('value').value
      let convert = document.getElementById('convert').value
      if (value != '') { 
            Error()
            let value = parseFloat(document.getElementById('value').value)
            if (convert == 'c_k') { Title(`${value} °C is equivalent to `); Output(`${(value+273.15).toFixed(2)} K`) }
            if (convert == 'k_c') { Title(`${value} K is equivalent to `); Output(`${(value-273.15).toFixed(2)} °C`) }
            if (convert == 'f_c') { Title(`${value} °F is equivalent to `); Output(`${((value-32)*(5/9)).toFixed(2)} °C`) }
            if (convert == 'c_f') { Title(`${value} °C is equivalent to `); Output(`${((value*(5/9))+32).toFixed(2)} °F`) }
            if (convert == 'k_f') { Title(`${value} K is equivalent to `); Output(`${(((value-273.15)*(9/5))+32).toFixed(2)} °F`) }
            if (convert == 'f_k') { Title(`${value} °F is equivalent to `); Output(`${(((value-32)*(5/9))+273.15).toFixed(2)} K`) }
      }
  }
  return (
    <div className="mainframe">
      <span className="headline">Temperature Conversion</span>
      <select name="convert" id="convert" onChange={Clear}>
        <option value="c_k">°C → K</option>
        <option value="k_c">K → °C</option>
        <option value="f_c">°F → °C</option>
        <option value="c_f">°C → °F</option>
        <option value="k_f">K → °F</option>
        <option value="f_k">°F → K</option>
      </select>
      <input placeholder="Value" name="value" id="value" type="number" step="0.1" />
      <button onClick={Calculate} type="submit" className="button">Calculate</button>
      <span className="output" id='output'>{title}</span>
      <span className="output value">{output}</span>
    </div>
  );
}
