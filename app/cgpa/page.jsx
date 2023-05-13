'use client';
import React, { useState } from 'react';
export default function CGPA() {
    const [cgpa, Cgpa] = useState()
    const [subjectCount, setSubjectCount] = useState(9)
    async function Calculate() {
      let datas = []
      let total = 0
      let remainder = 0
      let input_array = document.getElementsByClassName("full-problem-box")
      for (var i = 0; i < input_array.length; i++) {
        const input = input_array[i].getElementsByClassName('full-problem-input')
        if ((input.gp.value !== '') && (input.cp.value !== '')) {
          datas = [...datas, { gp: parseInt(input.gp.value), cp: parseInt(input.cp.value) }]
        }
      }
      datas.forEach(data => {
        total += (data.gp * data.cp)
        remainder += data.cp
      })
      if (!((total == 0) && (remainder == 0))) {
        Cgpa(`Calculated CGPA is ${(total/remainder).toFixed(4)}`)
      }
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
              <input required className='full-problem-input' placeholder="Grade Point" name="gp" type="number" step="1" />
              <input required className='full-problem-input' placeholder="Credit Point" name="cp" type="number" step="1" />
            </div>
          </div>
        )
    }
    return (
      <div className="mainframe">
        <span className="headline">CGPA Calculator</span>
        <input style={{ marginTop: '-0.1em', marginBottom: '0.3em' }} onChange={(s) => {if ((parseInt(s.currentTarget.value) > 0) && (s.currentTarget.value !== '') && (parseInt(s.currentTarget.value) <= 10)) {setSubjectCount(parseInt(s.currentTarget.value))}}} className='full-problem-input' placeholder="Total Subjects" name="subs" type="number" step="1" />
        <div className="full-problem-container-multiple">
          {Array(subjectCount).fill(0).map((e, i)=> i+1).map(no => <Subject key={no} no={no} />)}
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