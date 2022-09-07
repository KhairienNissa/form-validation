import React from 'react'

function Calender({stateFrom, stateTo, FromDate, ToDate}) {
   
  return (
    <div>
        <div className='flex w-full'>
            <div className='w-5/12 my-4'>
                <label className='text-md' htmlFor='start-date'>START DATE</label><br></br>
                <input className="border text-sm p-1 w-full" name="start-date" id="start-date" type="date"
                value={stateFrom}
                onChange={FromDate}
                max={stateTo}
                />
            </div>
            <div className='w-5/12 my-4'>
                <label className='text-md' htmlFor='end-date'>END DATE</label> <br></br>
                <input className="border text-sm p-1 w-full ml-3" name="end-date" id="end-date" type="date"
                value={stateTo}
                onChange={ToDate}
                min={stateFrom}/>
            </div>

        </div>
    </div>
  )
}

export default Calender