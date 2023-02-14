'use client';
import React, { useState } from 'react';
export default function DimensionConversionPage() {
  const [title, Title] = useState()
  const [output, Output] = useState()
  function toPlainString(num) {
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function(a,b,c,d,e) {
        return e < 0
          ? b + '0.' + Array(1-e-c.length).join(0) + c + d
          : b + c + d + Array(e-d.length+1).join(0);
      });
  }
  function Clear() {
    Title(); Output()
  }
  function Calculate() {
      let value = document.getElementById('value').value
      let convert = document.getElementById('convert').value
      if (value != '') { 
            Error()
            let value = parseFloat(document.getElementById('value').value)
            if (convert == 'cm_m') { Title(`${value} cm is equivalent to `); Output(`${toPlainString(value/100)} m`) }
            if (convert == 'm_cm') { Title(`${value} m is equivalent to `); Output(`${toPlainString(value*100)} cm`) }
            if (convert == 'cm3_m3') { Title(`${value} cm³ is equivalent to `); Output(`${toPlainString(value/1000000)} m³`) }
            if (convert == 'm3_cm3') { Title(`${value} m³ is equivalent to `); Output(`${toPlainString(value*1000000)} cm³`) }
            if (convert == 'mm3_m3') { Title(`${value} mm³ is equivalent to `); Output(`${toPlainString(value/1000000000)} m³`) }
            if (convert == 'm3_mm3') { Title(`${value} m³ is equivalent to `); Output(`${toPlainString(value*1000000000)} mm³`) }
      }
  }
  return (
    <div className="mainframe">
      <span className="headline">Dimension Conversion</span>
      <select name="convert" id="convert" onChange={Clear}>
        <option value="cm_m">cm → m</option>
        <option value="m_cm">m → cm</option>
        <option value="cm3_m3">cm³ → m³</option>
        <option value="m3_cm3">m³ → cm³</option>
        <option value="mm3_m3">mm³ → m³</option>
        <option value="m3_mm3">m³ → mm³</option>
      </select>
      <input placeholder="Value" name="value" id="value" type="number" step="0.1" />
      <button onClick={Calculate} type="submit" className="button">Calculate</button>
      <span className="output" id='output'>{title}</span>
      <span className="output value">{output}</span>
    </div>
  );
}
