import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>

      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by UCSC G47</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
