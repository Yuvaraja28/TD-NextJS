'use client';
import React, { useState } from 'react';
export default function CGPA() {
    const [cgpa, Cgpa] = useState()
    async function Calculate() {
      let datas = []
      let total = 0
      let remainder = 0
      let input_array = document.getElementsByClassName("full-problem-box")
      for (var i = 0; i < input_array.length; i++) {
        const input = input_array[i].getElementsByClassName('full-problem-input')
        datas = [...datas, { gp: parseInt(input.gp.value), cp: parseInt(input.cp.value) }]
      }
      datas.forEach(data => {
        total += (data.gp * data.cp)
        remainder += data.cp
      })
      Cgpa(`Calculated CGPA is ${(total/remainder).toFixed(4)}`)
    }
    async function Clear() {
        let input_array = document.getElementsByClassName("full-problem-input")
        for (var i = 0; i < input_array.length; i++) { input_array[i].value = '' }
    }
    function Subject( { no } ) {
        return (
          <div className='full-problem-box'>
            <span className='full-problem-label'>Subject {no}</span>
            <div className="full-problem-box-inner">
              <input required className='full-problem-input' placeholder="Grade Point" name="gp" type="number" step="0.1" />
              <input required className='full-problem-input' placeholder="Credit Point" name="cp" type="number" step="0.1" />
            </div>
          </div>
        )
    }
    return (
      <div className="mainframe">
        <span className="headline">CGPA Calculator</span>
        <div className="full-problem-container-multiple">
          {[1, 2, 3, 4, 5, 6 ,7, 8, 9].map(no => <Subject key={no} no={no} />)}
        </div>
        <div className="full-problem-container-single">
          <div className="full-problem-box-inner">
              <button onClick={Clear} className="button">Clear</button> &nbsp;
              <button onClick={Calculate} className="button">Calculate</button>
          </div>
          <span className="output value">{cgpa}</span>
        </div>
      </div>
    );
}