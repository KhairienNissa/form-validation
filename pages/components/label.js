import React from 'react'

function Label({children}) {
  return (
    <div>
        <label className="text-gray-600 text-md pb-3" htmlFor="image">{children}</label>
    </div>
  )
}

export default Label