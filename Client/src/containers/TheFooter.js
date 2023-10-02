import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="mailto:nutrisi1udin@gmail.com" target="_blank" rel="noopener noreferrer">Nurizki</a>
        <span className="ml-1">&copy; nutrisi1udin@gmail.com</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://github.com/nurizkiDin" target="_blank" rel="noopener noreferrer">Booking Dummy Project</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
