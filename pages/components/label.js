import React from 'react'


function Label({children}) {
  return (
    <div>
        <label className="text-[#A48668] text-sm font-bold pb-3" htmlFor="image">{children}</label>
    </div>
  )
}

export default Label