'use client';
import React, { useState } from 'react';
export default function PressureConversionPage() {
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
            if (convert == 'mpa_kpa') { Title(`${value} M Pa is equivalent to `); Output(`${toPlainString(value*1000)} k Pa`) }
            if (convert == 'kpa_atm') { Title(`${value} k Pa is equivalent to `); Output(`${toPlainString(value/101.325)} Atm`) }
            if (convert == 'atm_kpa') { Title(`${value} Atm is equivalent to `); Output(`${toPlainString(value*101.325)} k Pa`) }
            if (convert == 'bar_n') { Title(`${value} Bar is equivalent to `); Output(`${toPlainString(value*100)} k N/m2`) }
            if (convert == 'n_bar') { Title(`${value} k N/m2 is equivalent to `); Output(`${toPlainString(value/100)} Bar`) }
            if (convert == 'mm_kpa') { Title(`${value} mm of Hg is equivalent to `); Output(`${toPlainString(value*133.322)} Pa`) }
            if (convert == 'kpa_mm') { Title(`${value} Pa is equivalent to `); Output(`${toPlainString(value/133.322)} mm of Hg`) }
            if (convert == 'm_kpa') { Title(`${value} m of H2O is equivalent to `); Output(`${toPlainString(value*9806.65)} Pa`) }
            if (convert == 'kpa_m') { Title(`${value} Pa is equivalent to `); Output(`${toPlainString(value/9806.65)} m of H2O`) }
      }
  }
  return (
    <div className="mainframe">
      <div>
          <a className="headline head-glow underline" href='/'>Thermodynamics</a> <span className='headline-2 head-glow'>|</span> <a className="headline-2 head-glow underline" href='/unit1'>Unit 1</a>
      </div>
      <span className="headline-2 head-glow">Pressure Conversion</span>
      <select name="convert" id="convert" onChange={Clear}>
        <option value="kpa_mpa">k Pa → M Pa</option>
        <option value="mpa_kpa">M Pa → k Pa</option>
        <option value="kpa_atm">k Pa → Atm</option>
        <option value="atm_kpa">Atm → k Pa</option>
        <option value="bar_n">Bar → k N/m2</option>
        <option value="n_bar">k N/m2 → Bar</option>
        <option value="mm_kpa">mm of Hg → Pa</option>
        <option value="kpa_mm">Pa → mm of Hg</option>
        <option value="m_kpa">m of H2O → Pa</option>
        <option value="kpa_m">Pa → m of H2O</option>
      </select>
      <input placeholder="Value" name="value" id="value" type="number" step="0.1" />
      <button onClick={Calculate} type="submit" className="button">Calculate</button>
      <span className="output" id='output'>{title}</span>
      <span className="value">{output}</span>
    </div>
  );
}
