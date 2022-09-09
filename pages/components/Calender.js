import React, {useState} from 'react'

function Calender({setFieldValue}) {
    
  // const [date, setDate] = useState({
  //   Fromdate: new Date().toISOString().slice(0,10),

  //   Todate: new Date().toISOString().slice(0,10)
  // })

  const [FromDate, setFromDate] = useState(
    new Date().toISOString().slice(0,10),
  )
  const [ToDate, setToDate] = useState(
    new Date().toISOString().slice(0,10)
  )

  // console.log(date);
 const FromdateOnchange = (e) => {
  setFromDate(e.target.value)
 
  }

 const TodateOnchange = (e) => {
  setToDate(e.target.value)
  }

   
  return (
    <div>
        <div className='flex w-full'>
            <div className='w-5/12 my-4'>
                <label className='text-md' htmlFor='start-date'>START DATE</label><br></br>
                <input className="border text-sm p-1 w-full" name="start-date" id="start-date" type="date"
                value={FromDate}
                onChange={FromdateOnchange}
                max={ToDate}
                
                />
            </div>
            <div className='w-5/12 my-4'>
                <label className='text-md' htmlFor='end-date'>END DATE</label> <br></br>
                <input className="border text-sm p-1 w-full ml-3" name="end-date" id="end-date" type="date"
                value={ToDate}
                onChange={TodateOnchange}
                min={FromDate}
                
                
                />
            </div>

        </div>
    </div>
  )
}

export default Calender